import React from "react";
import { Card, Divider, Grid, Skeleton, Stack } from "@mui/material";

function PaymentDetailsSkeleton() {
  return (
    <Stack spacing={3}>
      {/* ── Payment Information Skeleton ───────────────────────── */}
      <Card>
        <Skeleton width="30%" height={28} sx={{ mb: 1 }} />
        <Divider sx={{ my: 2 }} />
        <Grid container spacing={{ xs: 2, sm: 3, md: 4 }}>
          {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((i) => (
            <Grid key={i} size={{ xs: 12, sm: 6, md: 4 }}>
              <Skeleton width="40%" height={16} sx={{ mb: 0.5 }} />
              <Skeleton width="65%" height={22} />
            </Grid>
          ))}
        </Grid>
      </Card>

      {/* ── Customer Information Skeleton ──────────────────────── */}
      <Card>
        <Skeleton width="30%" height={28} sx={{ mb: 1 }} />
        <Divider sx={{ my: 2 }} />
        <Grid container spacing={{ xs: 2, sm: 3, md: 4 }}>
          {[1, 2, 3, 4].map((i) => (
            <Grid key={i} size={{ xs: 12, sm: 6, md: 4 }}>
              <Skeleton width="40%" height={16} sx={{ mb: 0.5 }} />
              <Skeleton width="75%" height={22} />
            </Grid>
          ))}
        </Grid>
      </Card>

      {/* ── Refund Information Skeleton ────────────────────────── */}
      <Card>
        <Skeleton width="28%" height={28} sx={{ mb: 1 }} />
        <Divider sx={{ my: 2 }} />
        <Grid container spacing={{ xs: 2, sm: 3, md: 4 }}>
          {[1, 2, 3].map((i) => (
            <Grid key={i} size={{ xs: 12, sm: 6, md: 4 }}>
              <Skeleton width="40%" height={16} sx={{ mb: 0.5 }} />
              <Skeleton width="50%" height={22} />
            </Grid>
          ))}
        </Grid>
      </Card>
    </Stack>
  );
}

export default PaymentDetailsSkeleton;
