import React from "react";
import { useParams } from "react-router-dom";
import {
  useGetOrderByIdQuery,
  useUpdateOrderStatusMutation,
} from "../../../store/rtkServices/ordersMgmt";
import { handleMutation, toaster } from "../../../utility";
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

const formatAmount = (value) =>
  Number.isFinite(Number(value)) ? Number(value).toFixed(2) : "0.00";

export function useOrderDetails() {
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

  return {
    orderId,
    order,
    isFetching,
    isUpdatingStatus,
    actions,
    deliveryAddress,
    handleStatusUpdate,
    visualizeOrderSummary,
    visualizeTimeline,
    visualizePriceSummary,
    formatAmount,
  };
}
