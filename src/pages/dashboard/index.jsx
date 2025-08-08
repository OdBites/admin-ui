import React, { useMemo, useState } from "react";
import { Grid, Card, Typography, Button, Box, Stack } from "@mui/material";
import {
  AddShoppingCart,
  AttachMoney,
  Cancel,
  HourglassEmpty,
  Inventory,
  LocalDining,
  LocalShipping,
  Warning,
} from "@mui/icons-material";

import { ChartVisualizer, DataTable, PageHeader } from "../../sharedComponents";
import { orderColumns, userColumns } from "../../data/dashboard";
import { useFetchDashboardDataQuery } from "../../store/rtkServices/dashboard";

function Dashboard() {
  // // RTK Query
  const { data: dashboardData, isLoading } = useFetchDashboardDataQuery();
  const {
    summary = {},
    chartData: { salesOverview = [], productDemandAnalytics = [] } = {},
    tables: { recentOrders = [], newUsers = [] } = {},
  } = dashboardData || {};

  const metrics = useMemo(
    () => [
      {
        title: "Total Orders",
        value: summary.totalOrders || 0,
        icon: <AddShoppingCart sx={{ fontSize: 40, color: "#1976D2" }} />,
      },
      {
        title: "Revenue",
        value: summary.revenue || "₹0.00",
        icon: <AttachMoney sx={{ fontSize: 40, color: "#43A047" }} />,
      },
      {
        title: "Pending Orders",
        value: summary.pendingOrders || 0,
        icon: <HourglassEmpty sx={{ fontSize: 40, color: "#FB8C00" }} />,
      },
      {
        title: "Delivered Orders",
        value: summary.deliveredOrders || 0,
        icon: <LocalShipping sx={{ fontSize: 40, color: "#388E3C" }} />,
      },
      {
        title: "Cancelled Orders",
        value: summary.cancelledOrders || 0,
        icon: <Cancel sx={{ fontSize: 40, color: "#E53935" }} />,
      },
      {
        title: "Total Products",
        value: summary.totalProducts || 0,
        icon: <Inventory sx={{ fontSize: 40, color: "#5E35B1" }} />,
      },
      {
        title: "Out of Stock",
        value: summary.outOfStock || 0,
        icon: <Warning sx={{ fontSize: 40, color: "#F44336" }} />,
      },
    ],
    [summary, isLoading]
  );

  return (
    <>
      <PageHeader pageTitle="Dashboard" />
      {isLoading ? (
        <LocalDining />
      ) : (
        <Stack spacing={3}>
          {/* Top Cards */}
          <Grid container spacing={3}>
            {metrics.map((metric, index) => (
              <Grid size={{ xs: 12, sm: 6, lg: 4, xl: 3 }} key={index + 1}>
                <Card
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    transition: "transform 0.3s ",
                    "&:hover": { transform: "scale(1.03)" },
                    height: 120,
                  }}
                >
                  {metric.icon}
                  <Box textAlign="right">
                    <Typography variant="body2" color="textSecondary">
                      {metric.title}
                    </Typography>
                    <Typography variant="h6" fontWeight="bold">
                      {metric.value}
                    </Typography>
                  </Box>
                </Card>
              </Grid>
            ))}
          </Grid>

          {/* Chart */}
          <Grid container spacing={3}>
            <Grid size={{ xs: 12, md: 6 }}>
              <Card>
                <Typography variant="h6" fontWeight="bold" mb={2}>
                  Sales Overview
                </Typography>
                <ChartVisualizer
                  type="line"
                  data={salesOverview}
                  dataKeyX="month"
                  dataKeyY="revenue"
                />
              </Card>
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <Card>
                <Typography variant="h6" fontWeight="bold" mb={2}>
                  Product Demand Analytics
                </Typography>
                <ChartVisualizer
                  type="bar"
                  data={productDemandAnalytics}
                  dataKeyX="name"
                  dataKeyY="quantitySold"
                />
              </Card>
            </Grid>
          </Grid>

          {/*  Table */}
          <Grid container spacing={3}>
            <Grid size={{ xs: 12, md: 6 }}>
              <Card>
                <Typography variant="h6" fontWeight="bold" mb={2}>
                  Recent Orders
                </Typography>
                <DataTable
                  columns={orderColumns}
                  rows={recentOrders}
                  hidePagination
                  isLoading={isLoading}
                />
              </Card>
            </Grid>

            {/* Newly Registered Users */}
            <Grid size={{ xs: 12, md: 6 }}>
              <Card>
                <Typography variant="h6" fontWeight="bold" mb={2}>
                  Newly Registered Users
                </Typography>
                <DataTable
                  columns={userColumns}
                  rows={newUsers}
                  hidePagination
                  isLoading={isLoading}
                />
              </Card>
            </Grid>
          </Grid>

          {/* Quick Actions */}
          <Grid container spacing={3}>
            <Grid size={{ xs: 12, sm: 4 }}>
              <Button
                variant="contained"
                color="primary"
                fullWidth
                sx={{ borderRadius: 2, fontSize: 16 }}
              >
                ➕ Add Product
              </Button>
            </Grid>
            <Grid size={{ xs: 12, sm: 4 }}>
              <Button
                variant="contained"
                color="secondary"
                fullWidth
                sx={{ borderRadius: 2, fontSize: 16 }}
              >
                🛍️ Manage Users
              </Button>
            </Grid>
            <Grid size={{ xs: 12, sm: 4 }}>
              <Button
                variant="contained"
                color="success"
                fullWidth
                sx={{ borderRadius: 2, fontSize: 16 }}
              >
                📊 View Reports
              </Button>
            </Grid>
          </Grid>
        </Stack>
      )}
    </>
  );
}

export default Dashboard;
