import React from "react";
import { Box, Card, Divider, Grid, Skeleton, Stack } from "@mui/material";

function OrderDetailsSkeleton() {
  return (
    <Stack spacing={3}>
      {/* ── Admin Actions Skeleton ────────────────────────────── */}
      <Card>
        <Skeleton width="20%" height={24} sx={{ mb: 2 }} />
        <Stack direction="row" spacing={2}>
          <Skeleton
            variant="rounded"
            width={140}
            height={36}
            sx={{ borderRadius: "8px" }}
          />
          <Skeleton
            variant="rounded"
            width={130}
            height={36}
            sx={{ borderRadius: "8px" }}
          />
          <Skeleton
            variant="rounded"
            width={120}
            height={36}
            sx={{ borderRadius: "8px" }}
          />
        </Stack>
      </Card>

      {/* ── Customer / Payment / Summary Skeleton ─────────────── */}
      <Card>
        <Grid container spacing={3}>
          {/* Customer */}
          <Grid size={{ xs: 12, sm: 6, lg: 4 }}>
            <Skeleton width="40%" height={16} sx={{ mb: 1 }} />
            <Skeleton width="70%" height={22} sx={{ mb: 0.5 }} />
            <Skeleton width="85%" height={20} sx={{ mb: 0.5 }} />
            <Skeleton width="55%" height={20} />
          </Grid>

          {/* Payment */}
          <Grid size={{ xs: 12, sm: 6, lg: 4 }}>
            <Skeleton width="40%" height={16} sx={{ mb: 1 }} />
            <Skeleton width="65%" height={22} sx={{ mb: 0.5 }} />
            <Skeleton width="75%" height={20} sx={{ mb: 0.5 }} />
            <Skeleton width="60%" height={20} />
          </Grid>

          {/* Summary */}
          <Grid size={{ xs: 12, sm: 6, lg: 4 }}>
            <Skeleton width="45%" height={16} sx={{ mb: 1 }} />
            <Skeleton width="70%" height={20} sx={{ mb: 0.5 }} />
            <Skeleton width="65%" height={20} sx={{ mb: 0.5 }} />
            <Skeleton width="80%" height={20} />
          </Grid>
        </Grid>
      </Card>

      {/* ── Timeline Skeleton ─────────────────────────────────── */}
      <Card>
        <Skeleton width="25%" height={26} sx={{ mb: 1 }} />
        <Divider sx={{ mb: 2 }} />
        <Grid container spacing={2}>
          {[1, 2, 3, 4].map((i) => (
            <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }} key={i}>
              <Skeleton width="50%" height={16} sx={{ mb: 0.5 }} />
              <Skeleton width="75%" height={22} />
            </Grid>
          ))}
        </Grid>
      </Card>

      {/* ── Items Skeleton ────────────────────────────────────── */}
      <Card>
        <Skeleton width="20%" height={26} sx={{ mb: 1 }} />
        <Divider sx={{ mb: 2 }} />
        {[1, 2].map((i) => (
          <Box
            key={i}
            sx={{ display: "flex", alignItems: "center", gap: 2, mb: 2 }}
          >
            <Skeleton
              variant="rounded"
              width={64}
              height={64}
              sx={{ borderRadius: 2, flexShrink: 0 }}
            />
            <Box sx={{ flexGrow: 1 }}>
              <Skeleton width="40%" height={22} sx={{ mb: 0.5 }} />
              <Skeleton width="25%" height={18} />
            </Box>
            <Skeleton width={80} height={22} />
          </Box>
        ))}
      </Card>

      {/* ── Price Summary Skeleton ────────────────────────────── */}
      <Card>
        <Skeleton width="22%" height={26} sx={{ mb: 1 }} />
        <Divider sx={{ mb: 2 }} />
        <Grid container spacing={2}>
          {[1, 2, 3, 4].map((i) => (
            <Grid size={{ xs: 12, sm: 6, md: 4 }} key={i}>
              <Skeleton width="45%" height={16} sx={{ mb: 0.5 }} />
              <Skeleton width="60%" height={22} />
            </Grid>
          ))}
        </Grid>
      </Card>

      {/* ── Delivery Details Skeleton ─────────────────────────── */}
      <Card>
        <Skeleton width="25%" height={26} sx={{ mb: 1 }} />
        <Divider sx={{ my: 2 }} />
        <Skeleton width="65%" height={20} sx={{ mb: 0.5 }} />
        <Skeleton width="45%" height={20} sx={{ mb: 0.5 }} />
        <Skeleton width="30%" height={20} sx={{ mb: 1.5 }} />
        <Skeleton
          variant="rounded"
          width={180}
          height={28}
          sx={{ borderRadius: "12px", mb: 1.5 }}
        />
        <Skeleton width="40%" height={18} sx={{ mb: 0.5 }} />
        <Skeleton width="50%" height={18} />
      </Card>
    </Stack>
  );
}

export default OrderDetailsSkeleton;
