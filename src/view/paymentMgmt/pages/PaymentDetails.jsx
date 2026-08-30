import React from "react";
import { Card, Divider, Grid, Stack, Typography } from "@mui/material";

import { PageHeader } from "../../../sharedComponents";

import { usePaymentDetails } from "../hooks";

function PaymentDetails() {
  /*
    Hook Configuration & Destructuring
   */
  const {
    /*
      Theme & Layout
     */
    paymentId,

    /*
      Computed API Data & Memos
     */
    visualizePaymentDetails,
    visualizeCustomerDetails,
    visualizeRefundDetails,
  } = usePaymentDetails();

  return (
    <>
      <PageHeader
        pageTitle={
          <>
            Payment Details -
            <Typography variant="span" color="text.disabled" ml={2}>
              {`#${paymentId}`}
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
