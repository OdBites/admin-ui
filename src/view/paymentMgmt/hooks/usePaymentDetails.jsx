import React from "react";
import { useParams } from "react-router-dom";
import { useGetPaymentByIdQuery } from "../../../store/rtkServices/paymentsMgmt";
import { StatusChip } from "OdBitesMfUI/sharedComp";

export function usePaymentDetails() {
  const { paymentId } = useParams();

  // // rtk query
  const { data: paymentDetailsData = {}, isFetching } =
    useGetPaymentByIdQuery(paymentId);

  // Flatten customer address for easy display
  const customerAddress = paymentDetailsData?.customer?.address
    ? `${paymentDetailsData?.customer.address.line1}, ${paymentDetailsData?.customer.address.line2}, ${paymentDetailsData?.customer.address.city}, ${paymentDetailsData?.customer.address.state} - ${paymentDetailsData?.customer.address.postalCode}, ${paymentDetailsData?.customer.address.country}`
    : "N/A";

  const visualizePaymentDetails = {
    "Payment ID": paymentDetailsData?.id,
    "Order ID": paymentDetailsData?.orderId,
    Status: (
      <StatusChip status={paymentDetailsData?.status} variant="outlined" />
    ),
    Amount: `₹ ${paymentDetailsData?.amount?.toFixed(2)} ${
      paymentDetailsData?.currency
    }`,
    "Payment Method": paymentDetailsData?.method,
    "Payment Gateway": paymentDetailsData?.paymentGateway,
    "Transaction ID": paymentDetailsData?.transactionId,
    "Paid At": paymentDetailsData?.paidAt,
    Notes: paymentDetailsData?.notes,
  };

  const visualizeCustomerDetails = {
    Name: paymentDetailsData?.customer?.name,
    Phone: paymentDetailsData?.customer?.phone,
    Email: paymentDetailsData?.customer?.email,
    Address: customerAddress,
  };

  const visualizeRefundDetails = {
    "Is Refunded": paymentDetailsData?.refund?.isRefunded ? "Yes" : "No",
    "Refund Amount": `₹ ${
      paymentDetailsData?.refund?.refundAmount?.toFixed(2) || "0.00"
    }`,
    "Refunded At": paymentDetailsData?.refund?.refundedAt,
  };

  return {
    paymentId,
    isFetching,
    paymentDetailsData,
    visualizePaymentDetails,
    visualizeCustomerDetails,
    visualizeRefundDetails,
  };
}
