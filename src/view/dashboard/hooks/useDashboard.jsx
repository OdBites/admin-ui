import React, { useMemo } from "react";
import { Avatar, Box, Typography, useTheme } from "@mui/material";

import { useFetchDashboardDataQuery } from "../../../store/rtkServices/dashboard";
import { orderColumns, userColumns } from "../../../data/dashboard";

export function useDashboard() {
  /*
    Hooks & Theme Configuration
   */
  const theme = useTheme();
  const [timeframe, setTimeframe] = React.useState("lifetime");

  /*
    Redux API Queries & Mutations (RTK Query)
   */
  const {
    data: dashboardData,
    isLoading,
    isFetching,
  } = useFetchDashboardDataQuery({ timeframe });
  const {
    summary = {},
    chartData: { salesOverview = [], productDemandAnalytics = [] } = {},
    tables: { recentOrders = [], newUsers = [] } = {},
  } = dashboardData || {};

  /*
    Computed Values & Memos (State Aggregates)
   */
  // Custom cell renders for Recent Orders
  const customOrderColumns = useMemo(() => {
    return orderColumns.map((col) => {
      if (col.id === "id") {
        return {
          ...col,
          render: (val) => (
            <Typography
              variant="body2"
              fontFamily="monospace"
              fontWeight={700}
              sx={{
                color: "primary.main",
                background:
                  theme.palette.mode === "light"
                    ? "rgba(214,140,94,0.06)"
                    : "rgba(214,140,94,0.15)",
                px: 1.2,
                py: 0.4,
                borderRadius: 1.5,
                display: "inline-block",
                fontSize: "0.8rem",
                border: "1px solid",
                borderColor:
                  theme.palette.mode === "light"
                    ? "rgba(214,140,94,0.15)"
                    : "rgba(214,140,94,0.3)",
              }}
            >
              {val}
            </Typography>
          ),
        };
      }
      if (col.id === "customerName") {
        return {
          ...col,
          render: (val) => {
            const initials = val
              ? val
                  .split(" ")
                  .map((n) => n[0])
                  .join("")
                  .toUpperCase()
                  .slice(0, 2)
              : "C";
            return (
              <Box display="flex" alignItems="center" gap={1.5}>
                <Avatar
                  sx={{
                    width: 30,
                    height: 30,
                    fontSize: "0.75rem",
                    fontWeight: 700,
                    backgroundColor: "secondary.main",
                    color: "secondary.contrastText",
                  }}
                >
                  {initials}
                </Avatar>
                <Typography variant="body2" fontWeight={500}>
                  {val}
                </Typography>
              </Box>
            );
          },
        };
      }
      if (col.id === "totalAmount") {
        return {
          ...col,
          render: (val) => (
            <Typography variant="body2" fontWeight={700} color="text.primary">
              ₹
              {Number(val).toLocaleString("en-IN", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </Typography>
          ),
        };
      }
      return col;
    });
  }, [theme.palette.mode]);

  // Custom cell renders for Newly Registered Users
  const customUserColumns = useMemo(() => {
    return userColumns.map((col) => {
      if (col.id === "id") {
        return {
          ...col,
          render: (val) => (
            <Typography
              variant="body2"
              fontFamily="monospace"
              sx={{
                color: "text.secondary",
                fontSize: "0.75rem",
                opacity: 0.8,
              }}
            >
              {val ? `#...${val.slice(-6)}` : "-"}
            </Typography>
          ),
        };
      }
      if (col.id === "name") {
        return {
          ...col,
          render: (val) => {
            const initials = val
              ? val
                  .split(" ")
                  .map((n) => n[0])
                  .join("")
                  .toUpperCase()
                  .slice(0, 2)
              : "U";
            return (
              <Box display="flex" alignItems="center" gap={1.5}>
                <Avatar
                  sx={{
                    width: 30,
                    height: 30,
                    fontSize: "0.75rem",
                    fontWeight: 700,
                    backgroundColor: "primary.main",
                    color: "primary.contrastText",
                  }}
                >
                  {initials}
                </Avatar>
                <Typography variant="body2" fontWeight={500}>
                  {val}
                </Typography>
              </Box>
            );
          },
        };
      }
      if (col.id === "email") {
        return {
          ...col,
          render: (val) => (
            <Typography
              variant="body2"
              sx={{
                color: "text.secondary",
                fontSize: "0.825rem",
                textOverflow: "ellipsis",
                overflow: "hidden",
                whiteSpace: "nowrap",
                maxWidth: 180,
              }}
              title={val}
            >
              {val}
            </Typography>
          ),
        };
      }
      return col;
    });
  }, []);

  return {
    theme,
    timeframe,
    setTimeframe,
    summary,
    salesOverview,
    productDemandAnalytics,
    recentOrders,
    newUsers,
    isLoading,
    isFetching,
    customOrderColumns,
    customUserColumns,
  };
}
