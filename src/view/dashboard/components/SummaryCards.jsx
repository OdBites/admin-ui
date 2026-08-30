import React from "react";
import { Grid, Card, Typography, Box, Divider, Chip } from "@mui/material";
import {
  AddShoppingCart,
  AttachMoney,
  Cancel,
  CheckCircle,
  DeliveryDining,
  Inventory,
  LocalDining,
  NotificationImportant,
  Replay,
} from "@mui/icons-material";
import PropTypes from "prop-types";

function SummaryCards({ theme, summary }) {
  return (
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
                  <Box sx={{ color, display: "flex", alignItems: "center" }}>
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
                  (summary.totalProducts || 0) - (summary.outOfStock || 0),
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
  );
}

SummaryCards.propTypes = {
  theme: PropTypes.object.isRequired,
  summary: PropTypes.object.isRequired,
};

export default SummaryCards;
