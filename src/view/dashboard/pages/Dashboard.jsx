import React from "react";
import {
  Grid,
  Card,
  Typography,
  Box,
  Stack,
  Divider,
  Chip,
} from "@mui/material";
import { Button } from "OdBitesMfUI/sharedComp";
import {
  AddShoppingCart,
  AttachMoney,
  Cancel,
  CheckCircle,
  DeliveryDining,
  Group,
  Inventory,
  LocalDining,
  NotificationImportant,
  Replay,
} from "@mui/icons-material";
import { NavLink } from "react-router-dom";

import {
  ChartVisualizer,
  DataTable,
  PageHeader,
} from "../../../sharedComponents";
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
          {/* Top Cards */}
          <Grid container spacing={3}>
            {/* Card 1: Revenue */}
            <Grid size={{ xs: 12, sm: 6, lg: 4 }}>
              <Card
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  p: 3,
                  borderRadius: 4,
                  height: 190,
                  justifyContent: "space-between",
                  transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                  background:
                    theme.palette.mode === "light"
                      ? "linear-gradient(135deg, rgba(76, 175, 80, 0.05) 0%, rgba(76, 175, 80, 0.01) 100%)"
                      : "linear-gradient(135deg, rgba(76, 175, 80, 0.12) 0%, rgba(76, 175, 80, 0.02) 100%)",
                  border:
                    "1px solid " +
                    (theme.palette.mode === "light"
                      ? "rgba(76, 175, 80, 0.15)"
                      : "rgba(76, 175, 80, 0.25)"),
                  boxShadow:
                    theme.palette.mode === "light"
                      ? "0 4px 20px rgba(76, 175, 80, 0.05)"
                      : "0 4px 20px rgba(0, 0, 0, 0.15)",
                  "&:hover": {
                    transform: "translateY(-6px)",
                    boxShadow: "0 12px 32px rgba(76, 175, 80, 0.18)",
                  },
                }}
              >
                <Box display="flex" alignItems="center">
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      p: 1.5,
                      borderRadius: "16px",
                      backgroundColor:
                        theme.palette.mode === "light"
                          ? "rgba(76, 175, 80, 0.08)"
                          : "rgba(76, 175, 80, 0.18)",
                      color: "#4CAF50",
                      mr: 2,
                    }}
                  >
                    <AttachMoney sx={{ fontSize: 32 }} />
                  </Box>
                  <Box>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      fontWeight={600}
                    >
                      Total Revenue
                    </Typography>
                    <Typography
                      variant="h4"
                      fontWeight={800}
                      sx={{ color: "text.primary", mt: 0.5 }}
                    >
                      {summary.revenue
                        ? summary.revenue.replace("INR", "₹")
                        : "₹0.00"}
                    </Typography>
                  </Box>
                </Box>
                <Box>
                  <Typography
                    variant="caption"
                    color="text.secondary"
                    sx={{ opacity: 0.8 }}
                  >
                    Net earnings from successful customer transactions.
                  </Typography>
                </Box>
              </Card>
            </Grid>

            {/* Card 2: Orders Summary */}
            <Grid size={{ xs: 12, sm: 6, lg: 4 }}>
              <Card
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  p: 3,
                  borderRadius: 4,
                  height: 190,
                  justifyContent: "space-between",
                  transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                  background:
                    theme.palette.mode === "light"
                      ? "linear-gradient(135deg, rgba(214, 140, 94, 0.05) 0%, rgba(214, 140, 94, 0.01) 100%)"
                      : "linear-gradient(135deg, rgba(214, 140, 94, 0.12) 0%, rgba(214, 140, 94, 0.02) 100%)",
                  border:
                    "1px solid " +
                    (theme.palette.mode === "light"
                      ? "rgba(214, 140, 94, 0.15)"
                      : "rgba(214, 140, 94, 0.25)"),
                  boxShadow:
                    theme.palette.mode === "light"
                      ? "0 4px 20px rgba(214, 140, 94, 0.05)"
                      : "0 4px 20px rgba(0, 0, 0, 0.15)",
                  "&:hover": {
                    transform: "translateY(-6px)",
                    boxShadow: "0 12px 32px rgba(214, 140, 94, 0.18)",
                  },
                }}
              >
                <Box display="flex" alignItems="center">
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      p: 1.5,
                      borderRadius: "16px",
                      backgroundColor:
                        theme.palette.mode === "light"
                          ? "rgba(214, 140, 94, 0.08)"
                          : "rgba(214, 140, 94, 0.18)",
                      color: "primary.main",
                      mr: 2,
                    }}
                  >
                    <AddShoppingCart sx={{ fontSize: 32 }} />
                  </Box>
                  <Box>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      fontWeight={600}
                    >
                      Order Volume
                    </Typography>
                    <Typography
                      variant="h4"
                      fontWeight={800}
                      sx={{ color: "text.primary", mt: 0.5 }}
                    >
                      {summary.totalOrders || 0}
                    </Typography>
                  </Box>
                </Box>

                <Divider sx={{ my: 1 }} />

                <Grid container spacing={0.5}>
                  {[
                    {
                      icon: <NotificationImportant sx={{ fontSize: 13 }} />,
                      color: "#fb8c00",
                      label: "New",
                      value: summary.pendingAcceptance || 0,
                    },
                    {
                      icon: <LocalDining sx={{ fontSize: 13 }} />,
                      color: "#f4511e",
                      label: "Cooking",
                      value: summary.processing || 0,
                    },
                    {
                      icon: <DeliveryDining sx={{ fontSize: 13 }} />,
                      color: "#00897b",
                      label: "On the way",
                      value: summary.outForDelivery || 0,
                    },
                    {
                      icon: <CheckCircle sx={{ fontSize: 13 }} />,
                      color: "#2e7d32",
                      label: "Delivered",
                      value: summary.deliveredOrders || 0,
                    },
                    {
                      icon: <Replay sx={{ fontSize: 13 }} />,
                      color: "#7c4dff",
                      label: "Returned",
                      value: summary.returnedOrders || 0,
                    },
                    {
                      icon: <Cancel sx={{ fontSize: 13 }} />,
                      color: "#e53935",
                      label: "Cancelled",
                      value: summary.cancelledOrders || 0,
                    },
                  ].map(({ icon, color, label, value }) => (
                    <Grid size={{ xs: 6 }} key={label}>
                      <Box display="flex" alignItems="center" gap={0.5}>
                        <Box
                          sx={{ color, display: "flex", alignItems: "center" }}
                        >
                          {icon}
                        </Box>
                        <Typography
                          variant="caption"
                          color="text.secondary"
                          lineHeight={1.8}
                          fontSize="0.75rem"
                        >
                          {label}:{" "}
                          <Box
                            component="span"
                            fontWeight={700}
                            sx={{ color: "text.primary" }}
                          >
                            {value}
                          </Box>
                        </Typography>
                      </Box>
                    </Grid>
                  ))}
                </Grid>
              </Card>
            </Grid>

            {/* Card 3: Inventory */}
            <Grid size={{ xs: 12, sm: 6, lg: 4 }}>
              <Card
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  p: 3,
                  borderRadius: 4,
                  height: 190,
                  justifyContent: "space-between",
                  transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                  background:
                    theme.palette.mode === "light"
                      ? "linear-gradient(135deg, rgba(93, 99, 69, 0.05) 0%, rgba(93, 99, 69, 0.01) 100%)"
                      : "linear-gradient(135deg, rgba(93, 99, 69, 0.12) 0%, rgba(93, 99, 69, 0.02) 100%)",
                  border:
                    "1px solid " +
                    (theme.palette.mode === "light"
                      ? "rgba(93, 99, 69, 0.15)"
                      : "rgba(93, 99, 69, 0.25)"),
                  boxShadow:
                    theme.palette.mode === "light"
                      ? "0 4px 20px rgba(93, 99, 69, 0.05)"
                      : "0 4px 20px rgba(0, 0, 0, 0.15)",
                  "&:hover": {
                    transform: "translateY(-6px)",
                    boxShadow: "0 12px 32px rgba(93, 99, 69, 0.18)",
                  },
                }}
              >
                <Box display="flex" alignItems="center">
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      p: 1.5,
                      borderRadius: "16px",
                      backgroundColor:
                        theme.palette.mode === "light"
                          ? "rgba(93, 99, 69, 0.08)"
                          : "rgba(93, 99, 69, 0.18)",
                      color: "secondary.main",
                      mr: 2,
                    }}
                  >
                    <Inventory sx={{ fontSize: 32 }} />
                  </Box>
                  <Box>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      fontWeight={600}
                    >
                      Dishes & Menu
                    </Typography>
                    <Typography
                      variant="h4"
                      fontWeight={800}
                      sx={{ color: "text.primary", mt: 0.5 }}
                    >
                      {summary.totalProducts || 0}
                    </Typography>
                  </Box>
                </Box>

                <Divider sx={{ my: 1 }} />

                <Box
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <Typography
                    variant="caption"
                    color="text.secondary"
                    fontSize="0.75rem"
                  >
                    Active:{" "}
                    <strong>
                      {Math.max(
                        (summary.totalProducts || 0) -
                          (summary.outOfStock || 0),
                        0
                      )}
                    </strong>
                  </Typography>
                  <Chip
                    size="small"
                    label={
                      summary.outOfStock > 0
                        ? `Out of Stock: ${summary.outOfStock}`
                        : "All In Stock"
                    }
                    color={summary.outOfStock > 0 ? "error" : "success"}
                    sx={{
                      fontSize: "0.7rem",
                      height: 20,
                      borderRadius: "6px",
                      fontWeight: 700,
                    }}
                  />
                </Box>
              </Card>
            </Grid>
          </Grid>

          {/* Chart */}
          <Grid container spacing={3}>
            {/* Sales Overview Area Chart */}
            <Grid size={{ xs: 12, lg: 7 }}>
              <Card
                sx={{
                  p: 3,
                  borderRadius: 4,
                  boxShadow:
                    theme.palette.mode === "light"
                      ? "0 4px 20px rgba(0,0,0,0.02)"
                      : "0 4px 20px rgba(0,0,0,0.1)",
                  border: "1px solid " + theme.palette.divider,
                  transition: "all 0.3s ease",
                  "&:hover": {
                    boxShadow:
                      theme.palette.mode === "light"
                        ? "0 10px 30px rgba(0,0,0,0.06)"
                        : "0 10px 30px rgba(0,0,0,0.2)",
                  },
                }}
              >
                <Typography variant="h6" fontWeight="bold" mb={2}>
                  Sales Overview (Monthly Revenue)
                </Typography>
                <ChartVisualizer
                  type="area"
                  data={salesOverview}
                  dataKeyX="month"
                  dataKeyY="revenue"
                />
              </Card>
            </Grid>

            {/* Donut Chart */}
            <Grid size={{ xs: 12, lg: 5 }}>
              <Card
                sx={{
                  p: 3,
                  borderRadius: 4,
                  boxShadow:
                    theme.palette.mode === "light"
                      ? "0 4px 20px rgba(0,0,0,0.02)"
                      : "0 4px 20px rgba(0,0,0,0.1)",
                  border: "1px solid " + theme.palette.divider,
                  transition: "all 0.3s ease",
                  "&:hover": {
                    boxShadow:
                      theme.palette.mode === "light"
                        ? "0 10px 30px rgba(0,0,0,0.06)"
                        : "0 10px 30px rgba(0,0,0,0.2)",
                  },
                }}
              >
                <Typography variant="h6" fontWeight="bold" mb={2}>
                  Product Demand Analytics
                </Typography>
                <ChartVisualizer
                  type="pie"
                  data={productDemandAnalytics}
                  dataKeyX="name"
                  dataKeyY="quantitySold"
                />
              </Card>
            </Grid>
          </Grid>

          {/*  Table */}
          <Grid container spacing={3}>
            {/* Recent Orders */}
            <Grid size={{ xs: 12, lg: 6 }}>
              <Card
                sx={{
                  p: 3,
                  borderRadius: 4,
                  boxShadow:
                    theme.palette.mode === "light"
                      ? "0 4px 20px rgba(0,0,0,0.02)"
                      : "0 4px 20px rgba(0,0,0,0.1)",
                  border: "1px solid " + theme.palette.divider,
                }}
              >
                <Typography variant="h6" fontWeight="bold" mb={2}>
                  Recent Orders
                </Typography>
                <DataTable
                  columns={customOrderColumns}
                  rows={recentOrders}
                  hidePagination
                  isLoading={isLoading}
                  maxHeight="330px"
                  minHeight="auto"
                  sx={{
                    background: "transparent",
                    boxShadow: "none",
                  }}
                />
              </Card>
            </Grid>

            {/* Newly Registered Users */}
            <Grid size={{ xs: 12, lg: 6 }}>
              <Card
                sx={{
                  p: 3,
                  borderRadius: 4,
                  boxShadow:
                    theme.palette.mode === "light"
                      ? "0 4px 20px rgba(0,0,0,0.02)"
                      : "0 4px 20px rgba(0,0,0,0.1)",
                  border: "1px solid " + theme.palette.divider,
                }}
              >
                <Typography variant="h6" fontWeight="bold" mb={2}>
                  Newly Registered Users
                </Typography>
                <DataTable
                  columns={customUserColumns}
                  rows={newUsers}
                  hidePagination
                  isLoading={isLoading}
                  maxHeight="330px"
                  minHeight="auto"
                  sx={{
                    background: "transparent",
                    boxShadow: "none",
                  }}
                />
              </Card>
            </Grid>
          </Grid>

          {/* Quick Actions */}
          <Box>
            <Typography variant="h6" fontWeight="bold" mb={2}>
              Quick Management Shortcuts
            </Typography>
            <Grid container spacing={3}>
              {/* Shortcut 1 */}
              <Grid size={{ xs: 12, sm: 4 }}>
                <Card
                  sx={{
                    p: 3.5,
                    borderRadius: 4,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "flex-start",
                    height: "100%",
                    justifyContent: "space-between",
                    transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                    background:
                      theme.palette.mode === "light"
                        ? "linear-gradient(135deg, rgba(214, 140, 94, 0.03) 0%, rgba(214, 140, 94, 0.005) 100%)"
                        : "linear-gradient(135deg, rgba(214, 140, 94, 0.08) 0%, rgba(214, 140, 94, 0.015) 100%)",
                    border:
                      "1px solid " +
                      (theme.palette.mode === "light"
                        ? "rgba(214, 140, 94, 0.12)"
                        : "rgba(214, 140, 94, 0.2)"),
                    "&:hover": {
                      transform: "translateY(-6px)",
                      boxShadow: "0 12px 30px rgba(214, 140, 94, 0.12)",
                    },
                  }}
                >
                  <Box>
                    <Box
                      sx={{
                        p: 1.5,
                        borderRadius: "16px",
                        backgroundColor:
                          theme.palette.mode === "light"
                            ? "rgba(214, 140, 94, 0.08)"
                            : "rgba(214, 140, 94, 0.18)",
                        color: "primary.main",
                        display: "inline-flex",
                        mb: 2.5,
                      }}
                    >
                      <LocalDining sx={{ fontSize: 32 }} />
                    </Box>
                    <Typography variant="h6" fontWeight="bold" gutterBottom>
                      List New Dish
                    </Typography>
                    <Typography
                      variant="body2"
                      color="textSecondary"
                      mb={3}
                      sx={{ opacity: 0.8, lineHeight: 1.6 }}
                    >
                      Add new items to the menu, adjust regular and offer
                      pricing, assign categories and cuisine types.
                    </Typography>
                  </Box>
                  <Button
                    variant="contained"
                    component={NavLink}
                    to="/dish-management/add-dish"
                    fullWidth
                    sx={{
                      borderRadius: "50px",
                      py: 1.2,
                      fontWeight: 700,
                      boxShadow: "0 4px 14px rgba(214,140,94,0.3)",
                      "&:hover": {
                        boxShadow: "0 6px 20px rgba(214,140,94,0.5)",
                      },
                    }}
                  >
                    Add Dish
                  </Button>
                </Card>
              </Grid>

              {/* Shortcut 2 */}
              <Grid size={{ xs: 12, sm: 4 }}>
                <Card
                  sx={{
                    p: 3.5,
                    borderRadius: 4,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "flex-start",
                    height: "100%",
                    justifyContent: "space-between",
                    transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                    background:
                      theme.palette.mode === "light"
                        ? "linear-gradient(135deg, rgba(93, 99, 69, 0.03) 0%, rgba(93, 99, 69, 0.005) 100%)"
                        : "linear-gradient(135deg, rgba(93, 99, 69, 0.08) 0%, rgba(93, 99, 69, 0.015) 100%)",
                    border:
                      "1px solid " +
                      (theme.palette.mode === "light"
                        ? "rgba(93, 99, 69, 0.12)"
                        : "rgba(93, 99, 69, 0.2)"),
                    "&:hover": {
                      transform: "translateY(-6px)",
                      boxShadow: "0 12px 30px rgba(93, 99, 69, 0.12)",
                    },
                  }}
                >
                  <Box>
                    <Box
                      sx={{
                        p: 1.5,
                        borderRadius: "16px",
                        backgroundColor:
                          theme.palette.mode === "light"
                            ? "rgba(93, 99, 69, 0.08)"
                            : "rgba(93, 99, 69, 0.18)",
                        color: "secondary.main",
                        display: "inline-flex",
                        mb: 2.5,
                      }}
                    >
                      <Inventory sx={{ fontSize: 32 }} />
                    </Box>
                    <Typography variant="h6" fontWeight="bold" gutterBottom>
                      Order Dispatcher
                    </Typography>
                    <Typography
                      variant="body2"
                      color="textSecondary"
                      mb={3}
                      sx={{ opacity: 0.8, lineHeight: 1.6 }}
                    >
                      Monitor live customer orders, update delivery timeline
                      tracking, and dispatch orders to riders.
                    </Typography>
                  </Box>
                  <Button
                    variant="contained"
                    color="secondary"
                    component={NavLink}
                    to="/order-management"
                    fullWidth
                    sx={{
                      borderRadius: "50px",
                      py: 1.2,
                      fontWeight: 700,
                      boxShadow: "0 4px 14px rgba(93,99,69,0.3)",
                      "&:hover": {
                        boxShadow: "0 6px 20px rgba(93,99,69,0.5)",
                      },
                    }}
                  >
                    View Orders
                  </Button>
                </Card>
              </Grid>

              {/* Shortcut 3 */}
              <Grid size={{ xs: 12, sm: 4 }}>
                <Card
                  sx={{
                    p: 3.5,
                    borderRadius: 4,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "flex-start",
                    height: "100%",
                    justifyContent: "space-between",
                    transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                    background:
                      theme.palette.mode === "light"
                        ? "linear-gradient(135deg, rgba(76, 175, 80, 0.02) 0%, rgba(76, 175, 80, 0.005) 100%)"
                        : "linear-gradient(135deg, rgba(76, 175, 80, 0.08) 0%, rgba(76, 175, 80, 0.015) 100%)",
                    border:
                      "1px solid " +
                      (theme.palette.mode === "light"
                        ? "rgba(76, 175, 80, 0.12)"
                        : "rgba(76, 175, 80, 0.2)"),
                    "&:hover": {
                      transform: "translateY(-6px)",
                      boxShadow: "0 12px 30px rgba(76, 175, 80, 0.12)",
                    },
                  }}
                >
                  <Box>
                    <Box
                      sx={{
                        p: 1.5,
                        borderRadius: "16px",
                        backgroundColor:
                          theme.palette.mode === "light"
                            ? "rgba(76, 175, 80, 0.08)"
                            : "rgba(76, 175, 80, 0.18)",
                        color: "#4CAF50",
                        display: "inline-flex",
                        mb: 2.5,
                      }}
                    >
                      <Group sx={{ fontSize: 32 }} />
                    </Box>
                    <Typography variant="h6" fontWeight="bold" gutterBottom>
                      User Directory
                    </Typography>
                    <Typography
                      variant="body2"
                      color="textSecondary"
                      mb={3}
                      sx={{ opacity: 0.8, lineHeight: 1.6 }}
                    >
                      Browse registered customers, inspect account stats, review
                      total expenditures, and manage verification status.
                    </Typography>
                  </Box>
                  <Button
                    variant="contained"
                    color="success"
                    component={NavLink}
                    to="/user-management"
                    fullWidth
                    sx={{
                      borderRadius: "50px",
                      py: 1.2,
                      fontWeight: 700,
                      backgroundColor: "#4CAF50",
                      color: "#fff",
                      boxShadow: "0 4px 14px rgba(76,175,80,0.3)",
                      "&:hover": {
                        backgroundColor: "#43A047",
                        boxShadow: "0 6px 20px rgba(76,175,80,0.5)",
                      },
                    }}
                  >
                    Manage Users
                  </Button>
                </Card>
              </Grid>
            </Grid>
          </Box>
        </Stack>
      )}
    </>
  );
}

export default Dashboard;
