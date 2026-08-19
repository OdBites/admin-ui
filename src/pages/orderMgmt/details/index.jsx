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
import { LocalShipping, Done, Replay, Cancel } from "@mui/icons-material";
import { useParams } from "react-router-dom";

import { PageHeader } from "../../../sharedComponents";
import {
  useGetOrderByIdQuery,
  useUpdateOrderStatusMutation,
} from "../../../store/rtkServices/ordersMgmt";
import { handleMutation, toaster } from "../../../utility";
import { VITE_APP_ASSETS_PATH } from "../../../config/env";
import { StatusChip } from "OdBitesMfUI/sharedComp";

const getAvailableActions = (status) => {
  switch (status) {
    case "pending":
    case "ordered":
      return ["Accept", "Cancel"];
    case "accepted":
      return ["MarkPreparing", "Cancel"];
    case "preparing":
      return ["MarkOutForDelivery", "Cancel"];
    case "shipped":
      return ["MarkOutForDelivery", "Return"];
    case "outForDelivery":
      return ["MarkDelivered", "Return"];
    case "delivered":
      return ["Return"];
    case "returned":
    case "cancelled":
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
    Status: <StatusChip status={order?.status} />,
    "Ordered On": order?.orderDate,
  };

  const visualizeTimeline = {
    "Placed At": order?.timeline?.placedAt,
    "Accepted At": order?.timeline?.acceptedAt,
    "Preparing At": order?.timeline?.preparingAt,
    ...(order?.timeline?.shippedAt
      ? { "Shipped At": order?.timeline?.shippedAt }
      : {}),
    "Out For Delivery At": order?.timeline?.outForDeliveryAt,
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
