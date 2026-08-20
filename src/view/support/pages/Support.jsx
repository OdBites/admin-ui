import React from "react";
import {
  Grid,
  Card,
  Typography,
  TextField,
  IconButton,
  List,
  ListItemButton,
  ListItemAvatar,
  ListItemText,
  Avatar,
  Badge,
  Box,
  Stack,
  Divider,
  Button,
  CircularProgress,
  Tooltip,
} from "@mui/material";
import {
  Send,
  Search,
  CheckCircle,
  Message,
  SupportAgent,
  Phone,
  Email,
  ArrowBack,
} from "@mui/icons-material";

import { PageHeader } from "../../../sharedComponents";
import { useSupport } from "../hooks";

function Support() {
  const {
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
  } = useSupport();

  return (
    <>
      <PageHeader pageTitle="Customer Support Center" />

      <Grid container spacing={3} sx={{ height: "calc(100vh - 170px)" }}>
        {/* Left Pane - Customer list sidebar */}
        <Grid
          size={{ xs: 12, lg: 3.5 }}
          sx={{
            height: "100%",
            display: { xs: selectedCustomerId ? "none" : "block", lg: "block" },
          }}
        >
          <Card
            sx={{
              height: "100%",
              display: "flex",
              flexDirection: "column",
              p: 2,
              borderRadius: 4,
              border: "1px solid",
              borderColor: "divider",
              boxShadow:
                theme.palette.mode === "light"
                  ? "0 4px 20px rgba(0,0,0,0.02)"
                  : "0 4px 20px rgba(0,0,0,0.15)",
            }}
          >
            {/* Search filter */}
            <TextField
              id="support-search-input"
              fullWidth
              size="small"
              placeholder="Search customers..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              slotProps={{
                input: {
                  startAdornment: (
                    <Search sx={{ mr: 1, color: "text.secondary" }} />
                  ),
                },
              }}
              sx={{ mb: 2 }}
            />

            {/* Quick tabs */}
            <Stack direction="row" spacing={1} sx={{ mb: 2 }}>
              <Button
                id="support-active-tab"
                variant={activeTab === "active" ? "contained" : "outlined"}
                onClick={() => setActiveTab("active")}
                size="small"
                fullWidth
                sx={{
                  borderRadius: "50px",
                  fontSize: "0.8rem",
                  py: 0.6,
                }}
              >
                Active
              </Button>
              <Button
                id="support-resolved-tab"
                variant={activeTab === "resolved" ? "contained" : "outlined"}
                onClick={() => setActiveTab("resolved")}
                size="small"
                fullWidth
                sx={{
                  borderRadius: "50px",
                  fontSize: "0.8rem",
                  py: 0.6,
                }}
              >
                Resolved
              </Button>
            </Stack>

            <Divider />

            {/* Conversations list */}
            <Box sx={{ flexGrow: 1, overflowY: "auto", mt: 2 }}>
              {isSessionsLoading ? (
                <Box display="flex" justifyContent="center" py={4}>
                  <CircularProgress size={24} />
                </Box>
              ) : filteredSessions.length === 0 ? (
                <Box
                  display="flex"
                  flexDirection="column"
                  alignItems="center"
                  py={8}
                  textAlign="center"
                >
                  <SupportAgent
                    sx={{
                      fontSize: 40,
                      color: "text.secondary",
                      opacity: 0.4,
                      mb: 1,
                    }}
                  />
                  <Typography variant="body2" color="text.secondary">
                    No support chats found.
                  </Typography>
                </Box>
              ) : (
                <List disablePadding>
                  {filteredSessions.map((session) => {
                    const cust = session.customer;
                    const isSelected = cust._id === selectedCustomerId;
                    const initials =
                      `${cust.firstName || ""}${cust.lastName || ""}`
                        .split("")
                        .slice(0, 2)
                        .join("")
                        .toUpperCase() || "C";
                    const isPending = session.status === "pending";

                    return (
                      <ListItemButton
                        key={session._id}
                        selected={isSelected}
                        onClick={() => setSelectedCustomerId(cust._id)}
                        sx={{
                          borderRadius: 3,
                          mb: 1,
                          p: 1.5,
                          border: isSelected
                            ? "1px solid"
                            : "1px solid transparent",
                          borderColor: isSelected
                            ? "primary.main"
                            : "transparent",
                          backgroundColor: isSelected
                            ? theme.palette.mode === "light"
                              ? "rgba(255, 153, 51, 0.05)"
                              : "rgba(255, 153, 51, 0.12)"
                            : "transparent",
                        }}
                      >
                        <ListItemAvatar sx={{ minWidth: 48 }}>
                          <Badge
                            badgeContent={session.unreadCount || 0}
                            color="error"
                            invisible={!session.unreadCount}
                          >
                            <Avatar
                              sx={{
                                width: 40,
                                height: 40,
                                fontSize: "0.875rem",
                                fontWeight: 700,
                                backgroundColor: isSelected
                                  ? "primary.main"
                                  : "secondary.main",
                                color: isSelected
                                  ? "primary.contrastText"
                                  : "secondary.contrastText",
                              }}
                            >
                              {initials}
                            </Avatar>
                          </Badge>
                        </ListItemAvatar>
                        <ListItemText
                          primary={
                            <Box
                              display="flex"
                              justifyContent="space-between"
                              alignItems="center"
                              gap={1}
                            >
                              <Typography
                                variant="body2"
                                fontWeight={isSelected ? 700 : 600}
                                noWrap
                                sx={{ flexGrow: 1, minWidth: 0 }}
                              >
                                {cust.firstName} {cust.lastName}
                              </Typography>
                              <Typography
                                variant="caption"
                                color="text.secondary"
                                sx={{ flexShrink: 0 }}
                              >
                                {formatTime(session.lastMessageAt)}
                              </Typography>
                            </Box>
                          }
                          secondary={
                            <Box
                              display="flex"
                              justifyContent="space-between"
                              alignItems="center"
                              mt={0.5}
                              gap={1}
                            >
                              <Typography
                                variant="caption"
                                color="text.secondary"
                                noWrap
                                sx={{
                                  flexGrow: 1,
                                  minWidth: 0,
                                  fontWeight:
                                    isPending || session.unreadCount > 0
                                      ? 700
                                      : 400,
                                  color:
                                    isPending || session.unreadCount > 0
                                      ? "text.primary"
                                      : "text.secondary",
                                }}
                              >
                                {session.lastMessage || "No messages yet"}
                              </Typography>
                              {isPending && (
                                <Box
                                  sx={{
                                    width: 8,
                                    height: 8,
                                    borderRadius: "50%",
                                    backgroundColor: "error.main",
                                    flexShrink: 0,
                                  }}
                                />
                              )}
                            </Box>
                          }
                        />
                      </ListItemButton>
                    );
                  })}
                </List>
              )}
            </Box>
          </Card>
        </Grid>

        {/* Right Pane - Chat content arena */}
        <Grid
          size={{ xs: 12, lg: 8.5 }}
          sx={{
            height: "100%",
            display: { xs: selectedCustomerId ? "block" : "none", lg: "block" },
          }}
        >
          <Card
            sx={{
              height: "100%",
              display: "flex",
              flexDirection: "column",
              borderRadius: 4,
              border: "1px solid",
              borderColor: "divider",
              boxShadow:
                theme.palette.mode === "light"
                  ? "0 4px 20px rgba(0,0,0,0.02)"
                  : "0 4px 20px rgba(0,0,0,0.15)",
              p: 0,
              overflow: "hidden",
            }}
          >
            {selectedCustomerSession ? (
              <>
                {/* Chat Header */}
                <Box
                  sx={{
                    p: 2.5,
                    borderBottom: "1px solid",
                    borderColor: "divider",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    backgroundColor:
                      theme.palette.mode === "light"
                        ? "rgba(0,0,0,0.01)"
                        : "rgba(255,255,255,0.01)",
                  }}
                >
                  <Box
                    display="flex"
                    alignItems="center"
                    gap={2}
                    sx={{ minWidth: 0, mr: 2, flexGrow: 1 }}
                  >
                    <IconButton
                      aria-label="back"
                      onClick={() => setSelectedCustomerId(null)}
                      sx={{
                        display: { xs: "inline-flex", lg: "none" },
                        mr: 0.5,
                        color: "text.primary",
                      }}
                    >
                      <ArrowBack />
                    </IconButton>
                    <Avatar
                      sx={{
                        width: 44,
                        height: 44,
                        fontWeight: 700,
                        backgroundColor: "primary.main",
                        color: "primary.contrastText",
                      }}
                    >
                      {`${selectedCustomerSession.customer.firstName || ""}${selectedCustomerSession.customer.lastName || ""}`
                        .split("")
                        .slice(0, 2)
                        .join("")
                        .toUpperCase() || "C"}
                    </Avatar>
                    <Box sx={{ minWidth: 0 }}>
                      <Typography variant="body1" fontWeight={700} noWrap>
                        {selectedCustomerSession.customer.firstName}{" "}
                        {selectedCustomerSession.customer.lastName}
                      </Typography>
                      <Stack
                        direction={{ xs: "column", sm: "row" }}
                        spacing={{ xs: 0.5, sm: 2 }}
                        sx={{ mt: 0.25 }}
                      >
                        <Box
                          display="flex"
                          alignItems="center"
                          gap={0.5}
                          sx={{ opacity: 0.8, minWidth: 0 }}
                        >
                          <Email
                            sx={{
                              fontSize: 13,
                              color: "text.secondary",
                              flexShrink: 0,
                            }}
                          />
                          <Typography
                            variant="caption"
                            color="text.secondary"
                            noWrap
                            sx={{
                              textOverflow: "ellipsis",
                              overflow: "hidden",
                            }}
                          >
                            {selectedCustomerSession.customer.email}
                          </Typography>
                        </Box>
                        {selectedCustomerSession.customer.phone && (
                          <Box
                            display="flex"
                            alignItems="center"
                            gap={0.5}
                            sx={{ opacity: 0.8, minWidth: 0 }}
                          >
                            <Phone
                              sx={{
                                fontSize: 13,
                                color: "text.secondary",
                                flexShrink: 0,
                              }}
                            />
                            <Typography
                              variant="caption"
                              color="text.secondary"
                              noWrap
                              sx={{
                                textOverflow: "ellipsis",
                                overflow: "hidden",
                              }}
                            >
                              {selectedCustomerSession.customer.phone}
                            </Typography>
                          </Box>
                        )}
                      </Stack>
                    </Box>
                  </Box>

                  {/* Actions (Resolve ticket) */}
                  {selectedCustomerSession.status !== "resolved" &&
                    (isMobile ? (
                      <Tooltip title="Resolve Ticket">
                        <IconButton
                          id="support-resolve-button"
                          color="success"
                          onClick={handleResolve}
                          sx={{
                            border: "1px solid",
                            borderColor: "success.main",
                            backgroundColor: "transparent",
                            color: "success.main",
                            "&:hover": {
                              backgroundColor: "rgba(0,168,107,0.08)",
                            },
                            flexShrink: 0,
                          }}
                        >
                          <CheckCircle />
                        </IconButton>
                      </Tooltip>
                    ) : (
                      <Button
                        id="support-resolve-button"
                        variant="outlined"
                        color="success"
                        size="small"
                        startIcon={<CheckCircle />}
                        onClick={handleResolve}
                        sx={{
                          borderRadius: "50px",
                          fontWeight: 700,
                          px: 2,
                          textTransform: "none",
                          borderColor: "success.main",
                          flexShrink: 0,
                          whiteSpace: "nowrap",
                          "&:hover": {
                            backgroundColor: "rgba(0,168,107,0.08)",
                          },
                        }}
                      >
                        Resolve Ticket
                      </Button>
                    ))}
                </Box>

                {/* Message display board */}
                <Box
                  sx={{
                    flexGrow: 1,
                    overflowY: "auto",
                    p: 3,
                    display: "flex",
                    flexDirection: "column",
                    gap: 2,
                    backgroundColor:
                      theme.palette.mode === "light" ? "#faf9f6" : "#0b0c10",
                  }}
                >
                  {isMessagesLoading && messages.length === 0 ? (
                    <Box
                      display="flex"
                      justifyContent="center"
                      alignItems="center"
                      height="100%"
                    >
                      <CircularProgress size={24} />
                    </Box>
                  ) : messages.length === 0 ? (
                    <Box
                      display="flex"
                      flexDirection="column"
                      alignItems="center"
                      justifyContent="center"
                      height="100%"
                      sx={{ opacity: 0.5 }}
                    >
                      <Message
                        sx={{ fontSize: 40, mb: 1, color: "text.secondary" }}
                      />
                      <Typography variant="body2" color="text.secondary">
                        Send a message to start conversation.
                      </Typography>
                    </Box>
                  ) : (
                    messages.map((msg, index) => {
                      const isAdmin = msg.senderType === "admin";
                      return (
                        <Box
                          key={msg._id || index}
                          sx={{
                            display: "flex",
                            justifyContent: isAdmin ? "flex-end" : "flex-start",
                            width: "100%",
                          }}
                        >
                          <Box
                            sx={{
                              maxWidth: "70%",
                              display: "flex",
                              flexDirection: "column",
                              alignItems: isAdmin ? "flex-end" : "flex-start",
                            }}
                          >
                            <Box
                              sx={{
                                p: 1.5,
                                px: 2,
                                borderRadius: 3,
                                borderTopRightRadius: isAdmin ? 1.5 : 12,
                                borderTopLeftRadius: isAdmin ? 12 : 1.5,
                                backgroundColor: isAdmin
                                  ? "primary.main"
                                  : "background.paper",
                                color: isAdmin
                                  ? "primary.contrastText"
                                  : "text.primary",
                                boxShadow: "0 2px 8px rgba(0,0,0,0.03)",
                                border: "1px solid",
                                borderColor: isAdmin
                                  ? "transparent"
                                  : "divider",
                              }}
                            >
                              <Typography
                                variant="body2"
                                sx={{
                                  whiteSpace: "pre-line",
                                  wordBreak: "break-word",
                                }}
                              >
                                {msg.message}
                              </Typography>
                            </Box>
                            <Typography
                              variant="caption"
                              color="text.secondary"
                              sx={{
                                mt: 0.5,
                                px: 0.5,
                                fontSize: "0.7rem",
                                opacity: 0.8,
                              }}
                            >
                              {formatTime(msg.createdAt)}
                            </Typography>
                          </Box>
                        </Box>
                      );
                    })
                  )}
                  <div ref={messagesEndRef} />
                </Box>

                {/* Input Text Box */}
                <Box
                  component="form"
                  onSubmit={handleSend}
                  sx={{
                    p: 2,
                    borderTop: "1px solid",
                    borderColor: "divider",
                    backgroundColor: "background.paper",
                  }}
                >
                  <Stack direction="row" spacing={1.5} alignItems="center">
                    <TextField
                      id="support-message-input"
                      fullWidth
                      size="small"
                      placeholder="Type your support reply here..."
                      value={messageText}
                      onChange={(e) => setMessageText(e.target.value)}
                      disabled={isSending}
                      autoComplete="off"
                      sx={{
                        "& .MuiOutlinedInput-root": {
                          borderRadius: "50px",
                          paddingLeft: "15px",
                        },
                      }}
                    />
                    <IconButton
                      id="support-send-button"
                      type="submit"
                      color="primary"
                      disabled={!messageText.trim() || isSending}
                      sx={{
                        backgroundColor: "primary.main",
                        color: "primary.contrastText",
                        "&:hover": {
                          backgroundColor: "primary.dark",
                        },
                        "&.Mui-disabled": {
                          backgroundColor: "action.disabledBackground",
                          color: "action.disabled",
                        },
                      }}
                    >
                      <Send sx={{ fontSize: 20 }} />
                    </IconButton>
                  </Stack>
                </Box>
              </>
            ) : (
              <Box
                display="flex"
                flexDirection="column"
                alignItems="center"
                justifyContent="center"
                height="100%"
                p={4}
                textAlign="center"
              >
                <SupportAgent
                  sx={{
                    fontSize: 60,
                    color: "primary.main",
                    mb: 2,
                    opacity: 0.8,
                  }}
                />
                <Typography variant="h6" fontWeight="bold" gutterBottom>
                  Assistance Hub
                </Typography>
                <Typography
                  variant="body2"
                  color="textSecondary"
                  sx={{ maxWidth: 320, mb: 3 }}
                >
                  Select a customer thread from the sidebar panel to view
                  details and start live 2-way support.
                </Typography>
              </Box>
            )}
          </Card>
        </Grid>
      </Grid>
    </>
  );
}

export default Support;
