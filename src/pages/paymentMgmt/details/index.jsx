import React from "react";
import { Card, Divider, Grid, Stack, Typography } from "@mui/material";
import { useParams } from "react-router-dom";

import { PageHeader } from "../../../sharedComponents";
import { useGetPaymentByIdQuery } from "../../../store/rtkServices/paymentsMgmt";
import { StatusChip } from "OdBitesMfUI/sharedComp";

function PaymentDetails() {
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
      paymentDetailsData?.refund?.refundAmount.toFixed(2) || 0
    }`,
    "Refunded At": paymentDetailsData?.refund?.refundedAt,
  };

  return (
    <>
      <PageHeader
        pageTitle={
          <>
            Payment Details -
            <Typography variant="span" color="text.disabled" ml={2}>
              {`#${paymentDetailsData?._id}`}
            </Typography>
          </>
        }
        hideExportBtn
        showBackBtn
      />
      <Stack spacing={3}>
        {/* Payment Info */}
        <Card>
          <Typography variant="h5" fontWeight="bold" gutterBottom>
            Payment Information
          </Typography>
          <Divider sx={{ my: 2 }} />
          <Grid container spacing={{ xs: 2, sm: 3, md: 4 }}>
            {Object.entries(visualizePaymentDetails).map(([label, value]) => (
              <Grid key={label} size={{ xs: 12, sm: 6, md: 4 }}>
                <Typography variant="body2" color="text.disabled" gutterBottom>
                  {label}
                </Typography>
                <Typography variant="body1">{value || "N/A"}</Typography>
              </Grid>
            ))}
          </Grid>
        </Card>

        {/* Customer Info */}
        <Card>
          <Typography variant="h5" fontWeight="bold" gutterBottom>
            Customer Information
          </Typography>
          <Divider sx={{ my: 2 }} />
          <Grid container spacing={{ xs: 2, sm: 3, md: 4 }}>
            {Object.entries(visualizeCustomerDetails).map(([label, value]) => (
              <Grid key={label} size={{ xs: 12, sm: 6, md: 4 }}>
                <Typography variant="body2" color="text.disabled" gutterBottom>
                  {label}
                </Typography>
                <Typography variant="body1" sx={{ wordBreak: "break-word" }}>
                  {value || "N/A"}
                </Typography>
              </Grid>
            ))}
          </Grid>
        </Card>

        {/* Refund Info */}
        <Card>
          <Typography variant="h5" fontWeight="bold" gutterBottom>
            Refund Information
          </Typography>
          <Divider sx={{ my: 2 }} />
          <Grid container spacing={{ xs: 2, sm: 3, md: 4 }}>
            {Object.entries(visualizeRefundDetails).map(([label, value]) => (
              <Grid key={label} size={{ xs: 12, sm: 6, md: 4 }}>
                <Typography variant="body2" color="text.disabled" gutterBottom>
                  {label}
                </Typography>
                <Typography variant="body1">{value || "N/A"}</Typography>
              </Grid>
            ))}
          </Grid>
        </Card>
      </Stack>
    </>
  );
}

export default PaymentDetails;
