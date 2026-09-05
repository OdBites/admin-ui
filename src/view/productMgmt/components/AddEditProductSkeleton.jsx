import React from "react";
import { Card, Grid, Skeleton, Stack } from "@mui/material";

function AddEditProductSkeleton() {
  return (
    <Stack spacing={3}>
      {/* ── Stepper Skeleton Card ─────────────────────────────── */}
      <Card sx={{ p: 2.5 }}>
        <Grid container spacing={2} justifyContent="space-between">
          {[1, 2, 3].map((i) => (
            <Grid
              key={i}
              size={{ xs: 4 }}
              display="flex"
              alignItems="center"
              gap={1.5}
            >
              <Skeleton variant="circular" width={28} height={28} />
              <Skeleton width="60%" height={20} />
            </Grid>
          ))}
        </Grid>
      </Card>

      {/* ── Form Fields Skeleton Card ─────────────────────────── */}
      <Card sx={{ p: 3 }}>
        <Grid container spacing={3}>
          <Grid size={{ xs: 12, sm: 6 }}>
            <Skeleton
              variant="rounded"
              height={54}
              sx={{ borderRadius: "10px" }}
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }}>
            <Skeleton
              variant="rounded"
              height={54}
              sx={{ borderRadius: "10px" }}
            />
          </Grid>
          <Grid size={12}>
            <Skeleton
              variant="rounded"
              height={100}
              sx={{ borderRadius: "10px" }}
            />
          </Grid>
          <Grid size={12} display="flex" justifyContent="space-between" mt={2}>
            <Skeleton
              variant="rounded"
              width={100}
              height={38}
              sx={{ borderRadius: "8px" }}
            />
            <Skeleton
              variant="rounded"
              width={100}
              height={38}
              sx={{ borderRadius: "8px" }}
            />
          </Grid>
        </Grid>
      </Card>
    </Stack>
  );
}

export default AddEditProductSkeleton;
