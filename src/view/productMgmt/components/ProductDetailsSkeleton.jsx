import React from "react";
import { Box, Card, Divider, Grid, Skeleton, Stack } from "@mui/material";

function ProductDetailsSkeleton() {
  return (
    <Stack spacing={3}>
      {/* ── Dish Image & Basic Info Skeleton ──────────────────── */}
      <Card>
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", lg: "row" },
            gap: 4,
          }}
        >
          {/* Image Gallery Box Skeleton */}
          <Box sx={{ width: { xs: "100%", lg: 400 }, order: { xs: 2, lg: 1 } }}>
            <Skeleton
              variant="rounded"
              width="100%"
              height={280}
              sx={{ borderRadius: 3, mb: 1.5 }}
            />
            <Box display="flex" gap={1}>
              {[1, 2, 3].map((i) => (
                <Skeleton
                  key={i}
                  variant="rounded"
                  width={60}
                  height={60}
                  sx={{ borderRadius: 2 }}
                />
              ))}
            </Box>
          </Box>

          {/* Details Info Skeleton */}
          <Box sx={{ flex: 1, order: { xs: 1, lg: 2 } }}>
            <Skeleton width="60%" height={36} sx={{ mb: 1.5 }} />
            <Skeleton width="90%" height={20} sx={{ mb: 0.8 }} />
            <Skeleton width="80%" height={20} sx={{ mb: 0.8 }} />
            <Skeleton width="45%" height={20} sx={{ mb: 2 }} />
            <Skeleton width="40%" height={22} />
          </Box>
        </Box>
      </Card>

      {/* ── Dish Metadata Skeleton ────────────────────────────── */}
      <Card>
        <Skeleton width="25%" height={26} sx={{ mb: 1 }} />
        <Divider sx={{ my: 2 }} />
        <Grid container spacing={{ xs: 2, sm: 3, md: 4 }}>
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <Grid size={{ xs: 12, sm: 6, md: 4 }} key={i}>
              <Skeleton width="50%" height={16} sx={{ mb: 0.5 }} />
              <Skeleton width="70%" height={22} />
            </Grid>
          ))}
        </Grid>
      </Card>
    </Stack>
  );
}

export default ProductDetailsSkeleton;
