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
} from "@mui/icons-material";
import { useParams } from "react-router-dom";

import { PageHeader } from "../../../sharedComponents";
import {
  useGetOrderByIdQuery,
  useUpdateOrderStatusMutation,
} from "../../../store/rtkServices/ordersMgmt";
import { handleMutation, toaster } from "../../../utility";

const getAvailableActions = (status) => {
  switch (status) {
    case "Pending":
    case "Ordered":
      return ["Accept", "Cancel"];
    case "Accepted":
      return ["MarkPreparing", "Cancel"];
    case "Preparing":
      return ["MarkShipped", "Cancel"];
    case "Shipped":
    case "OutForDelivery":
      return ["MarkDelivered", "Return"];
    case "Delivered":
      return ["Return"];
    case "Returned":
    case "Cancelled":
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
    nextStatus: "Accepted",
  },
  MarkPreparing: {
    label: "Mark Preparing",
    icon: <Done />,
    variant: "contained",
    color: "primary",
    nextStatus: "Preparing",
  },
  Cancel: {
    label: "Cancel Order",
    icon: <Cancel />,
    variant: "outlined",
    color: "error",
    nextStatus: "Cancelled",
  },
  MarkShipped: {
    label: "Mark as Shipped",
    icon: <LocalShipping />,
    variant: "contained",
    color: "primary",
    nextStatus: "Shipped",
  },
  MarkDelivered: {
    label: "Mark as Delivered",
    icon: <Done />,
    variant: "contained",
    color: "success",
    nextStatus: "Delivered",
  },
  Return: {
    label: "Mark as Returned",
    icon: <Replay />,
    variant: "outlined",
    color: "secondary",
    nextStatus: "Returned",
  },
};

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

const formatAmount = (value) =>
  Number.isFinite(Number(value)) ? Number(value).toFixed(2) : "0.00";

function OrderDetails() {
  const { orderId } = useParams();

  const { data: order = {}, isFetching } = useGetOrderByIdQuery(orderId);
  const [updateOrderStatus, { isLoading: isUpdatingStatus }] =
    useUpdateOrderStatusMutation();

  const actions = getAvailableActions(order?.status);
  const priceSummary = order?.priceSummary || {};
  const deliveryAddress = order?.delivery?.address || {};

  const handleStatusUpdate = async (status) => {
    await handleMutation({
      mutationFn: updateOrderStatus,
      payload: { id: orderId, status },
      onSuccess: (data) => {
        toaster.success(data?.message || "Order status updated successfully");
      },
    });
  };

  const visualizeOrderSummary = {
    "Order ID": order?.orderId,
    Status: (
      <Chip
        label={order?.status || "N/A"}
        color={statusColor[order?.status] || "default"}
        variant="outlined"
        size="small"
      />
    ),
    "Ordered On": order?.orderDate,
    "Placed At": order?.timeline?.placedAt,
    "Shipped At": order?.timeline?.shippedAt,
    "Delivered At": order?.timeline?.deliveredAt,
    "Cancelled At": order?.timeline?.cancelledAt,
    "Returned At": order?.timeline?.returnedAt,
  };

  const visualizePriceSummary = {
    Subtotal: formatAmount(priceSummary.subTotal),
    Discount: formatAmount(priceSummary.discount),
    Tax: formatAmount(priceSummary.tax),
    Delivery: formatAmount(priceSummary.deliveryFee),
    "Grand Total": formatAmount(priceSummary.grandTotal || order?.totalAmount),
  };

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
            Order Items
          </Typography>
          <Divider sx={{ mb: 2 }} />
          {(order?.items || []).map((item) => (
            <Box
              key={item.productId || item.name}
              sx={{ display: "flex", alignItems: "center", gap: 2, mb: 2 }}
            >
              <Avatar
                src={item.image}
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
          <Divider sx={{ mb: 2 }} />
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
