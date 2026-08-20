import React, { useState, useEffect, useRef, useMemo } from "react";
import { useTheme, useMediaQuery } from "@mui/material";
import {
  useFetchSupportSessionsQuery,
  useFetchChatMessagesQuery,
  useSendMessageMutation,
  useResolveSessionMutation,
} from "../../../store/rtkServices/support";
import { io } from "socket.io-client";
import { cookies } from "OdBitesMfUI/utility";
import { VITE_APP_API_URL } from "../../../config/env";

export function useSupport() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("lg"));

  // State variables
  const [selectedCustomerId, setSelectedCustomerId] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [messageText, setMessageText] = useState("");
  const [activeTab, setActiveTab] = useState("active"); // "active" | "resolved"

  // Refs
  const messagesEndRef = useRef(null);

  // RTK Query endpoints
  const {
    data: sessions = [],
    isLoading: isSessionsLoading,
    refetch: refetchSessions,
  } = useFetchSupportSessionsQuery(null, {
    refetchOnFocus: false,
    refetchOnReconnect: false,
    refetchOnMountOrArgChange: 30, // cache for 30s to prevent strict mode duplicate mounts
  });

  const {
    data: messages = [],
    isLoading: isMessagesLoading,
    refetch: refetchMessages,
  } = useFetchChatMessagesQuery(selectedCustomerId, {
    skip: !selectedCustomerId,
    refetchOnFocus: false,
    refetchOnReconnect: false,
    refetchOnMountOrArgChange: 30,
  });

  // Keep latest refetch functions in refs to prevent socket hook recreation churn
  const refetchSessionsRef = useRef(refetchSessions);
  const refetchMessagesRef = useRef(refetchMessages);

  useEffect(() => {
    refetchSessionsRef.current = refetchSessions;
  }, [refetchSessions]);

  useEffect(() => {
    refetchMessagesRef.current = refetchMessages;
  }, [refetchMessages]);

  // Debounced refetch helpers to prevent duplicate API calls from rapid event updates
  const debouncedRefetchSessions = useMemo(() => {
    let timer;
    return () => {
      clearTimeout(timer);
      timer = setTimeout(() => {
        refetchSessionsRef.current();
      }, 150);
    };
  }, []); // Empty dependency array -> stable reference

  const debouncedRefetchMessages = useMemo(() => {
    let timer;
    return () => {
      clearTimeout(timer);
      timer = setTimeout(() => {
        refetchMessagesRef.current();
      }, 150);
    };
  }, []); // Empty dependency array -> stable reference

  // Socket state and connections
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const token = cookies.getCookie("admin_auth_token");
    if (!token) return;

    if (globalThis.adminSocket) {
      globalThis.adminSocket.disconnect();
    }

    const socketServerUrl = VITE_APP_API_URL.replace("/api", "");
    const socketInstance = io(socketServerUrl, {
      auth: { token },
      transports: ["websocket", "polling"],
    });

    globalThis.adminSocket = socketInstance;

    socketInstance.on("connect", () => {
      console.log("Admin support socket connected");
    });

    socketInstance.on("message", (msg) => {
      debouncedRefetchMessages();
    });

    socketInstance.on("session_updated", (session) => {
      debouncedRefetchSessions();
    });

    socketInstance.on("session_resolved", () => {
      debouncedRefetchMessages();
      debouncedRefetchSessions();
    });

    setSocket(socketInstance);

    return () => {
      socketInstance.disconnect();
      if (globalThis.adminSocket === socketInstance) {
        globalThis.adminSocket = null;
      }
    };
  }, []); // Empty dependency array -> connect once on page mount

  // Handle joining customer rooms dynamically
  useEffect(() => {
    if (!socket || !selectedCustomerId) return;

    socket.emit("join_customer_room", selectedCustomerId);

    return () => {
      socket.emit("leave_customer_room", selectedCustomerId);
    };
  }, [socket, selectedCustomerId]);

  const [sendMessage, { isLoading: isSending }] = useSendMessageMutation();
  const [resolveSession] = useResolveSessionMutation();

  // Find currently selected customer details from active sessions list
  const selectedCustomerSession = useMemo(() => {
    return sessions.find((s) => s.customer?._id === selectedCustomerId);
  }, [sessions, selectedCustomerId]);

  // Scroll to bottom on new messages
  const scrollToBottom = (behavior = "smooth") => {
    messagesEndRef.current?.scrollIntoView({ behavior });
  };

  useEffect(() => {
    if (messages.length > 0) {
      scrollToBottom("smooth");
    }
  }, [messages]);

  // Filter sessions based on search query and active tab
  const filteredSessions = useMemo(() => {
    return sessions.filter((s) => {
      if (!s.customer) return false;
      const fullName =
        `${s.customer.firstName || ""} ${s.customer.lastName || ""}`.toLowerCase();
      const email = (s.customer.email || "").toLowerCase();
      const matchesSearch =
        fullName.includes(searchQuery.toLowerCase()) ||
        email.includes(searchQuery.toLowerCase());

      const sessionStatus = s.status || "active";
      if (activeTab === "resolved") {
        return matchesSearch && sessionStatus === "resolved";
      } else {
        // "active" includes active and pending status
        return matchesSearch && sessionStatus !== "resolved";
      }
    });
  }, [sessions, searchQuery, activeTab]);

  // Select first chat session by default if none selected (only on desktop)
  useEffect(() => {
    if (!isMobile && !selectedCustomerId && filteredSessions.length > 0) {
      setSelectedCustomerId(filteredSessions[0].customer?._id);
    }
  }, [filteredSessions, selectedCustomerId, isMobile]);

  // Send message handler
  const handleSend = async (e) => {
    if (e) e.preventDefault();
    if (!messageText.trim() || !selectedCustomerId || isSending) return;

    try {
      await sendMessage({
        customerId: selectedCustomerId,
        message: messageText.trim(),
      }).unwrap();
      setMessageText("");
      setTimeout(() => scrollToBottom("smooth"), 100);
    } catch (err) {
      console.error("Failed to send message:", err);
    }
  };

  // Mark ticket as resolved
  const handleResolve = async () => {
    if (!selectedCustomerId) return;
    try {
      await resolveSession(selectedCustomerId).unwrap();
    } catch (err) {
      console.error("Failed to resolve session:", err);
    }
  };

  // Helper to format timestamps
  const formatTime = (dateStr) => {
    if (!dateStr) return "";
    const date = new Date(dateStr);
    return date.toLocaleTimeString("en-IN", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  };

  return {
    theme,
    isMobile,
    selectedCustomerId,
    setSelectedCustomerId,
    searchQuery,
    setSearchQuery,
    messageText,
    setMessageText,
    activeTab,
    setActiveTab,
    messagesEndRef,
    isSessionsLoading,
    isMessagesLoading,
    messages,
    isSending,
    selectedCustomerSession,
    filteredSessions,
    handleSend,
    handleResolve,
    formatTime,
  };
}
