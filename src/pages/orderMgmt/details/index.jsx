import React from "react";
import {
  Box,
  Button,
  Card,
  Divider,
  Grid,
  Stack,
  Typography,
  Avatar,
  Chip,
} from "@mui/material";
import {
  LocalShipping,
  Done,
  Replay,
  Cancel,
  Payments,
} from "@mui/icons-material";
import { useParams } from "react-router-dom";
import { PageHeader } from "../../../sharedComponents";
import { demoOrderDetails } from "../../../data/ordersMgmt";
import { useGetDataById } from "../../../lib/hooks";

const getAvailableActions = (status) => {
  switch (status) {
    case "Ordered":
      return ["Accept", "Cancel"];
    case "Accepted":
      return ["Cancel"];
    case "Preparing":
      return ["MarkShipped", "Cancel"];
    case "Shipped":
      return ["MarkDelivered", "Return", "Refund"];
    case "OutForDelivery":
      return ["MarkDelivered", "Return"];
    case "Delivered":
      return ["Refund", "Return"];
    case "Returned":
    case "Cancelled":
      return [];
    default:
      return [];
  }
};

const actionMap = {
  Accept: {
    label: "Accept Order",
    icon: <Done />,
    variant: "contained",
    color: "primary",
  },
  Cancel: {
    label: "Cancel Order",
    icon: <Cancel />,
    variant: "outlined",
    color: "error",
  },
  MarkShipped: {
    label: "Mark as Shipped",
    icon: <LocalShipping />,
    variant: "contained",
    color: "primary",
  },
  MarkDelivered: {
    label: "Mark as Delivered",
    icon: <Done />,
    variant: "contained",
    color: "success",
  },
  Return: {
    label: "Mark as Returned",
    icon: <Replay />,
    variant: "outlined",
    color: "secondary",
  },
  Refund: {
    label: "Refund",
    icon: <Payments />,
    variant: "outlined",
    color: "warning",
  },
};

function OrderDetails() {
  const { orderId } = useParams();
  const order = useGetDataById({
    data: demoOrderDetails,
    targetField: "orderId",
    id: orderId,
  });

  const statusColor = {
    Ordered: "info",
    Accepted: "primary",
    Preparing: "warning",
    Shipped: "warning",
    OutForDelivery: "secondary",
    Delivered: "success",
    Returned: "error",
    Cancelled: "error",
    Pending: "warning",
  };

  const actions = getAvailableActions(order.status);

  const visualizeOrderSummary = {
    "Order ID": order.orderId,
    Status: (
      <Chip
        label={order.status}
        color={statusColor[order.status] || "default"}
        variant="outlined"
        size="small"
      />
    ),
    "Ordered On": order.orderDate,
    "Placed At": order.timeline?.placedAt,
    "Shipped At": order.timeline?.shippedAt,
    "Delivered At": order.timeline?.deliveredAt,
    "Cancelled At": order.timeline?.cancelledAt,
    "Returned At": order.timeline?.returnedAt,
  };

  const visualizePriceSummary = {
    Subtotal: order.priceSummary.subTotal,
    Discount: order.priceSummary.discount,
    Tax: order.priceSummary.tax,
    Delivery: order.priceSummary.deliveryFee,
    "Grand Total": order.priceSummary.grandTotal.toFixed(2),
  };

  return (
    <>
      <PageHeader
        pageTitle={
          <>
            Order Details -
            <Typography
              variant="span"
              color="text.disabled"
              ml={2}
            >{`#${order.orderId}`}</Typography>
          </>
        }
        hideExportBtn
        showBackBtn
      />

      <Stack spacing={3}>
        {/* Admin Actions */}
        {actions.length > 0 && (
          <Card>
            <Typography variant="h6" gutterBottom>
              Admin Actions
            </Typography>
            <Stack direction="row" spacing={2} flexWrap="wrap">
              {actions.map((action) => {
                const { label, icon, variant, color } = actionMap[action];
                return (
                  <Button
                    key={action}
                    variant={variant}
                    color={color}
                    startIcon={icon}
                    onClick={() => alert(`${label} clicked`)}
                  >
                    {label}
                  </Button>
                );
              })}
            </Stack>
          </Card>
        )}

        {/* Customer & Payment Info */}
        <Card>
          <Grid container spacing={3}>
            <Grid size={{ xs: 12, sm: 6, lg: 4 }}>
              <Typography
                variant="body2"
                color="text.secondary"
                gutterBottom={3}
              >
                Customer
              </Typography>
              <Typography variant="body1">{order.customer.name}</Typography>
              <Typography variant="body1">{order.customer.email}</Typography>
              <Typography variant="body1">{order.customer.phone}</Typography>
            </Grid>

            <Grid size={{ xs: 12, sm: 6, lg: 4 }}>
              <Typography
                variant="body2"
                color="text.secondary"
                gutterBottom={3}
              >
                Payment
              </Typography>
              <Typography variant="body1">
                {order.payment.method} ({order.payment.status})
              </Typography>
              <Typography variant="body1">
                Txn: {order.payment.transactionId}
              </Typography>
              <Typography variant="body1">
                Paid At: {order.payment.paidAt}
              </Typography>
            </Grid>

            <Grid size={{ xs: 12, sm: 6, lg: 4 }}>
              <Typography
                variant="body2"
                color="text.secondary"
                gutterBottom={3}
              >
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

        {/* Order Items */}
        <Card>
          <Typography variant="h6" gutterBottom>
            Order Items
          </Typography>
          <Divider sx={{ mb: 2 }} />
          {order.items.map((item) => (
            <Box
              key={item.productId}
              sx={{ display: "flex", alignItems: "center", gap: 2, mb: 2 }}
            >
              <Avatar
                src={item.image}
                variant="rounded"
                sx={{ width: 64, height: 64 }}
              />
              <Box sx={{ flexGrow: 1 }}>
                <Typography>{item.name}</Typography>
                <Typography variant="body2" color="text.secondary">
                  Qty: {item.quantity} × ₹{item.unitPrice}
                </Typography>
              </Box>
              <Typography fontWeight={600}>₹{item.total.toFixed(2)}</Typography>
            </Box>
          ))}
        </Card>

        {/* Price Summary */}
        <Card>
          <Typography variant="h6" gutterBottom>
            Price Summary
          </Typography>
          <Divider sx={{ mb: 2 }} />
          <Grid container spacing={2}>
            {Object.entries(visualizePriceSummary).map(([label, value]) => (
              <Grid size={{ xs: 12, sm: 6, md: 4 }} key={label}>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  gutterBottom={3}
                >
                  {label}
                </Typography>
                <Typography variant="body1">₹{value || "N/A"}</Typography>
              </Grid>
            ))}
          </Grid>
        </Card>

        {/* Delivery Info */}
        <Card>
          <Typography variant="h6" gutterBottom>
            Delivery Details
          </Typography>
          <Divider sx={{ mb: 2 }} />
          <Typography>
            {order.delivery.address.line1}, {order.delivery.address.line2}
          </Typography>
          <Typography>
            {order.delivery.address.city}, {order.delivery.address.state} -{" "}
            {order.delivery.address.postalCode}
          </Typography>
          <Typography>{order.delivery.address.country}</Typography>
          <Typography color="text.secondary" mt={1}>
            Method: {order.delivery.method}
          </Typography>
          <Typography color="text.secondary">
            Instructions: {order.delivery.instructions}
          </Typography>
        </Card>

        {/* Notes */}
        <Card>
          <Typography variant="h6" gutterBottom>
            Notes
          </Typography>
          <Divider sx={{ mb: 2 }} />
          <Typography variant="body2" mb={1}>
            <strong>Customer:</strong> {order.notes.customer}
          </Typography>
          <Typography variant="body2">
            <strong>Admin:</strong> {order.notes.admin}
          </Typography>
        </Card>
      </Stack>
    </>
  );
}

export default OrderDetails;
