import React from "react";
import { Grid, Drawer } from "@mui/material";
import { PageHeader } from "../../../sharedComponents";
import { useSupport } from "../hooks";
import {
  CustomerProfilePanel,
  SidebarSessionsList,
  ChatWindow,
} from "../components";

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
    infoOpen,
    setInfoOpen,
    messagesEndRef,
    isSessionsLoading,
    isMessagesLoading,
    isSending,
    messages,
    recentOrders,
    linkedOrder,
    linkedOrderId,
    selectedCustomerSession,
    filteredSessions,
    handleSend,
    handleResolve,
    handleSelectOrder,
    formatTime,
    formatAmount,
    formatDate,
    formatStatus,
  } = useSupport();

  return (
    <>
      <PageHeader pageTitle="Customer Support Center" hideExportBtn />

      <Grid container spacing={3} sx={{ height: "calc(100vh - 170px)" }}>
        {/* Left Pane - Customer list sidebar */}
        <Grid
          size={{ xs: 12, lg: 3.5 }}
          sx={{
            height: "100%",
            display: { xs: selectedCustomerId ? "none" : "block", lg: "block" },
          }}
        >
          <SidebarSessionsList
            theme={theme}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            isSessionsLoading={isSessionsLoading}
            filteredSessions={filteredSessions}
            selectedCustomerId={selectedCustomerId}
            setSelectedCustomerId={setSelectedCustomerId}
            formatTime={formatTime}
          />
        </Grid>

        {/* Right Pane - Chat content arena */}
        <Grid
          size={{ xs: 12, lg: 8.5 }}
          sx={{
            height: "100%",
            display: { xs: selectedCustomerId ? "block" : "none", lg: "block" },
          }}
        >
          <ChatWindow
            theme={theme}
            selectedCustomerSession={selectedCustomerSession}
            setSelectedCustomerId={setSelectedCustomerId}
            isMobile={isMobile}
            infoOpen={infoOpen}
            setInfoOpen={setInfoOpen}
            handleResolve={handleResolve}
            isMessagesLoading={isMessagesLoading}
            messages={messages}
            formatTime={formatTime}
            messagesEndRef={messagesEndRef}
            messageText={messageText}
            setMessageText={setMessageText}
            isSending={isSending}
            handleSend={handleSend}
          />
        </Grid>
      </Grid>

      {/* Customer Profile & Orders Drawer Panel */}
      <Drawer
        anchor="right"
        open={infoOpen}
        onClose={() => setInfoOpen(false)}
        sx={{
          "& .MuiDrawer-paper": {
            width: 320,
            boxSizing: "border-box",
          },
        }}
      >
        <CustomerProfilePanel
          theme={theme}
          selectedCustomerSession={selectedCustomerSession}
          setInfoOpen={setInfoOpen}
          linkedOrder={linkedOrder}
          linkedOrderId={linkedOrderId}
          recentOrders={recentOrders}
          formatAmount={formatAmount}
          formatStatus={formatStatus}
          formatDate={formatDate}
          handleSelectOrder={handleSelectOrder}
        />
      </Drawer>
    </>
  );
}

export default Support;
