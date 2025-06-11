import React from "react";
import {
  Box,
  Card,
  Divider,
  Grid,
  Stack,
  Typography,
  Chip,
} from "@mui/material";
import { useParams } from "react-router-dom";

import { PageHeader } from "../../../sharedComponents";
import { demoPaymentDetails } from "../../../data/paymentMgmt";
import { useGetDataById } from "../../../lib/hooks";

function PaymentDetails() {
  const { paymentId } = useParams();
  const payment = useGetDataById({
    data: demoPaymentDetails,
    targetField: "id",
    id: paymentId,
  });

  const statusColor = {
    Success: "success",
    Failed: "error",
    Pending: "warning",
  };

  // Flatten customer address for easy display
  const customerAddress = payment.customer?.address
    ? `${payment.customer.address.line1}, ${payment.customer.address.line2}, ${payment.customer.address.city}, ${payment.customer.address.state} - ${payment.customer.address.postalCode}, ${payment.customer.address.country}`
    : "N/A";

  const visualizePaymentDetails = {
    "Payment ID": payment.id,
    "Order ID": payment.orderId,
    Status: (
      <Chip
        label={payment.status}
        color={statusColor[payment.status] || "default"}
        variant="outlined"
        size="small"
      />
    ),
    Amount: `₹ ${payment.amount.toFixed(2)} ${payment.currency}`,
    "Payment Method": payment.method,
    "Payment Gateway": payment.paymentGateway,
    "Transaction ID": payment.transactionId,
    "Paid At": payment.paidAt,
    Notes: payment.notes,
  };

  const visualizeCustomerDetails = {
    Name: payment.customer?.name,
    Phone: payment.customer?.phone,
    Email: payment.customer?.email,
    Address: customerAddress,
  };

  const visualizeRefundDetails = {
    "Is Refunded": payment.refund?.isRefunded ? "Yes" : "No",
    "Refund Amount": `₹ ${payment.refund?.refundAmount.toFixed(2) || 0}`,
    "Refunded At": payment.refund?.refundedAt,
  };

  return (
    <>
      <PageHeader
        pageTitle={
          <>
            Payment Details -
            <Typography variant="span" color="text.disabled" ml={2}>
              {`#${payment.id}`}
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
                <Typography variant="body1">{value || "N/A"}</Typography>
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
