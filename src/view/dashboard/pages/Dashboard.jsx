import React from "react";
import { Box, Stack, Typography } from "@mui/material";

import { PageHeader } from "../../../sharedComponents";
import {
  AnalyticsCharts,
  ManagementShortcuts,
  RecentActivityTables,
  SummaryCards,
} from "../components";

import { useDashboard } from "../hooks";

function Dashboard() {
  /*
    Hook Configuration & Destructuring
   */
  const {
    /*
      Theme & Layout
     */
    theme,

    /*
      Computed API Data & Memos
     */
    summary,
    salesOverview,
    productDemandAnalytics,
    recentOrders,
    newUsers,
    customOrderColumns,
    customUserColumns,

    /*
      RTK Query API State Indicators
     */
    isLoading,
  } = useDashboard();

  return (
    <>
      <PageHeader pageTitle="Dashboard" hideExportBtn />
      {isLoading ? (
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          minHeight="400px"
        >
          <Typography color="text.secondary">
            Loading dashboard analytics...
          </Typography>
        </Box>
      ) : (
        <Stack spacing={4}>
          {/* Top Summary Metric Cards */}
          <SummaryCards theme={theme} summary={summary} />

          {/* Analytics Charts */}
          <AnalyticsCharts
            theme={theme}
            salesOverview={salesOverview}
            productDemandAnalytics={productDemandAnalytics}
          />

          {/* Recent Orders and Users Tables */}
          <RecentActivityTables
            theme={theme}
            isLoading={isLoading}
            customOrderColumns={customOrderColumns}
            recentOrders={recentOrders}
            customUserColumns={customUserColumns}
            newUsers={newUsers}
          />

          {/* Quick Actions / Shortcuts */}
          <ManagementShortcuts theme={theme} />
        </Stack>
      )}
    </>
  );
}

export default Dashboard;
