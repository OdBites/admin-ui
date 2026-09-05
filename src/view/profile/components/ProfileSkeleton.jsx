import React from "react";
import { Box, Card, Divider, Grid, Skeleton, Stack } from "@mui/material";

function ProfileSkeleton() {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: { xs: "column", lg: "row" },
        gap: 4,
        alignItems: "flex-start",
      }}
    >
      {/* ── Left Profile Avatar Card Skeleton ─────────────────── */}
      <Card sx={{ width: { xs: "100%", lg: 350 } }}>
        <Stack spacing={2} alignItems="center">
          <Skeleton
            variant="circular"
            width={120}
            height={120}
            sx={{ my: 1 }}
          />
          <Skeleton width="60%" height={32} />
          <Skeleton
            variant="rounded"
            width={140}
            height={32}
            sx={{ borderRadius: "8px" }}
          />
          <Box sx={{ width: "100%", pt: 1 }}>
            <Skeleton width="30%" height={16} sx={{ mb: 1 }} />
            <Skeleton width="90%" height={20} sx={{ mb: 0.5 }} />
            <Skeleton width="70%" height={20} />
          </Box>
        </Stack>
      </Card>

      {/* ── Right Account Info Form Card Skeleton ─────────────── */}
      <Card sx={{ flex: 1, width: "100%" }}>
        <Skeleton width="35%" height={32} sx={{ mb: 1 }} />
        <Divider sx={{ my: 1.5 }} />

        <Grid container spacing={2}>
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
          <Grid size={12} mt={1}>
            <Skeleton
              variant="rounded"
              width={120}
              height={38}
              sx={{ borderRadius: "8px" }}
            />
          </Grid>
        </Grid>
      </Card>
    </Box>
  );
}

export default ProfileSkeleton;
