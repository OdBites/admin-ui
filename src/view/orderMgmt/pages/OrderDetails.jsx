import React from "react";
import {
  Avatar,
  Box,
  Card,
  Divider,
  Grid,
  Stack,
  Typography,
} from "@mui/material";
import { Cancel, Done, LocalShipping, Replay } from "@mui/icons-material";

import { Button } from "OdBitesMfUI/sharedComp";

import { PageHeader } from "../../../sharedComponents";

import { VITE_APP_ASSETS_PATH } from "../../../config/env";
import { useOrderDetails } from "../hooks";

const actionMap = {
  Accept: {
    label: "Accept Order",
    icon: <Done />,
    variant: "contained",
    color: "primary",
    nextStatus: "accepted",
  },
  MarkPreparing: {
    label: "Mark Preparing",
    icon: <Done />,
    variant: "contained",
    color: "primary",
    nextStatus: "preparing",
  },
  Cancel: {
    label: "Cancel Order",
    icon: <Cancel />,
    variant: "contained",
    color: "error",
    nextStatus: "cancelled",
  },
  MarkShipped: {
    label: "Mark as Shipped",
    icon: <LocalShipping />,
    variant: "contained",
    color: "primary",
    nextStatus: "shipped",
  },
  MarkOutForDelivery: {
    label: "Mark Out for Delivery",
    icon: <LocalShipping />,
    variant: "contained",
    color: "primary",
    nextStatus: "outForDelivery",
  },
  MarkDelivered: {
    label: "Mark as Delivered",
    icon: <Done />,
    variant: "contained",
    color: "success",
    nextStatus: "delivered",
  },
  Return: {
    label: "Mark as Returned",
    icon: <Replay />,
    variant: "contained",
    color: "secondary",
    nextStatus: "returned",
  },
};

function OrderDetails() {
  /*
    Hook Configuration & Destructuring
   */
  const {
    /*
      Theme & Layout
     */
    orderId,

    /*
      Computed API Data & Memos
     */
    order,
    actions,
    deliveryAddress,
    visualizeOrderSummary,
    visualizeTimeline,
    visualizePriceSummary,

    /*
      RTK Query API State Indicators
     */
    isFetching,
    isUpdatingStatus,

    /*
      Event Handler Callbacks
     */
    handleStatusUpdate,

    /*
      Presentation Helpers
     */
    formatAmount,
  } = useOrderDetails();

  return (
    <>
      <PageHeader
        pageTitle={
          <>
            Order Details -
            <Typography component="span" color="text.disabled" ml={2}>
              {`#${order?.orderId || orderId}`}
            </Typography>
          </>
        }
        hideExportBtn
        showBackBtn
      />

      <Stack spacing={3}>
        {actions.length > 0 && (
          <Card>
            <Typography variant="h6" gutterBottom>
              Admin Actions
            </Typography>
            <Stack direction="row" spacing={2} flexWrap="wrap">
              {actions.map((action) => {
                const { label, icon, variant, color, nextStatus } =
                  actionMap[action];
                return (
                  <Button
                    key={action}
                    variant={variant}
                    color={color}
                    startIcon={icon}
                    disabled={isFetching || isUpdatingStatus}
                    onClick={() => handleStatusUpdate(nextStatus)}
                  >
                    {label}
                  </Button>
                );
              })}
            </Stack>
          </Card>
        )}

        <Card>
          <Grid container spacing={3}>
            <Grid size={{ xs: 12, sm: 6, lg: 4 }}>
              <Typography variant="body2" color="text.secondary" gutterBottom>
                Customer
              </Typography>
              <Typography variant="body1">
                {order?.customer?.name || "N/A"}
              </Typography>
              <Typography variant="body1">
                {order?.customer?.email || "N/A"}
              </Typography>
              <Typography variant="body1">
                {order?.customer?.phone || "N/A"}
              </Typography>
            </Grid>

            <Grid size={{ xs: 12, sm: 6, lg: 4 }}>
              <Typography variant="body2" color="text.secondary" gutterBottom>
                Payment
              </Typography>
              <Typography variant="body1">
                {order?.payment?.method || "N/A"} (
                {order?.payment?.status || "N/A"})
              </Typography>
              <Typography variant="body1">
                Txn: {order?.payment?.transactionId || "N/A"}
              </Typography>
              <Typography variant="body1">
                Paid At: {order?.payment?.paidAt || "N/A"}
              </Typography>
            </Grid>

            <Grid size={{ xs: 12, sm: 6, lg: 4 }}>
              <Typography variant="body2" color="text.secondary" gutterBottom>
                Order Summary
              </Typography>
              {Object.entries(visualizeOrderSummary).map(([label, value]) => (
                <Typography key={label} variant="body1">
                  <strong>{label}:</strong> {value || "N/A"}
                </Typography>
              ))}
            </Grid>
          </Grid>
        </Card>

        <Card>
          <Typography variant="h6" gutterBottom>
            Order Timeline
          </Typography>
          <Divider sx={{ mb: 2 }} />
          <Grid container spacing={2}>
            {Object.entries(visualizeTimeline).map(([label, value]) => (
              <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }} key={label}>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  {label}
                </Typography>
                <Typography variant="body1">{value || "N/A"}</Typography>
              </Grid>
            ))}
          </Grid>
        </Card>

        <Card>
          <Typography variant="h6" gutterBottom>
            Order Items
          </Typography>
          <Divider sx={{ mb: 2 }} />
          {(order?.items || []).map((item) => (
            <Box
              key={item.productId || item.name}
              sx={{ display: "flex", alignItems: "center", gap: 2, mb: 2 }}
            >
              <Avatar
                src={
                  item.image
                    ? `${VITE_APP_ASSETS_PATH}/uploads/products/${item.image}`
                    : undefined
                }
                variant="rounded"
                sx={{ width: 64, height: 64 }}
              />
              <Box sx={{ flexGrow: 1 }}>
                <Typography>{item.name || "N/A"}</Typography>
                <Typography variant="body2" color="text.secondary">
                  Qty: {item.quantity || 0} x INR {formatAmount(item.unitPrice)}
                </Typography>
              </Box>
              <Typography fontWeight={600}>
                INR {formatAmount(item.total)}
              </Typography>
            </Box>
          ))}
        </Card>

        <Card>
          <Typography variant="h6" gutterBottom>
            Price Summary
          </Typography>
          <Divider sx={{ mb: 2 }} />
          <Grid container spacing={2}>
            {Object.entries(visualizePriceSummary).map(([label, value]) => (
              <Grid size={{ xs: 12, sm: 6, md: 4 }} key={label}>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  {label}
                </Typography>
                <Typography variant="body1">INR {value}</Typography>
              </Grid>
            ))}
          </Grid>
        </Card>

        <Card>
          <Typography variant="h6" gutterBottom>
            Delivery Details
          </Typography>
          <Divider sx={{ my: 2 }} />
          <Typography>
            {[deliveryAddress.line1, deliveryAddress.line2]
              .filter(Boolean)
              .join(", ") || "N/A"}
          </Typography>
          <Typography>
            {[deliveryAddress.city, deliveryAddress.state]
              .filter(Boolean)
              .join(", ")}
            {deliveryAddress.postalCode
              ? ` - ${deliveryAddress.postalCode}`
              : ""}
          </Typography>
          <Typography>{deliveryAddress.country || "N/A"}</Typography>
          <Typography color="text.secondary" mt={1}>
            Method: {order?.delivery?.method || "N/A"}
          </Typography>
          <Typography color="text.secondary">
            Instructions: {order?.delivery?.instructions || "N/A"}
          </Typography>
        </Card>

        <Card>
          <Typography variant="h6" gutterBottom>
            Notes
          </Typography>
          <Divider sx={{ mb: 2 }} />
          <Typography variant="body2" mb={1}>
            <strong>Customer:</strong> {order?.notes?.customer || "N/A"}
          </Typography>
          <Typography variant="body2">
            <strong>Admin:</strong> {order?.notes?.admin || "N/A"}
          </Typography>
        </Card>
      </Stack>
    </>
  );
}

export default OrderDetails;
