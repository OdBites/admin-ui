import React from "react";
import { Box, Card, Grid, Skeleton, Stack } from "@mui/material";

function DashboardSkeleton() {
  return (
    <Stack spacing={4}>
      {/* ── 1. Summary Cards Skeleton (3 Cards) ──────────────── */}
      <Grid container spacing={3}>
        {/* Card 1: Revenue Skeleton */}
        <Grid size={{ xs: 12, sm: 6, lg: 4 }}>
          <Card
            sx={{
              p: 3,
              borderRadius: 4,
              height: 190,
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            <Box display="flex" alignItems="center" gap={2}>
              <Skeleton
                variant="rounded"
                width={56}
                height={56}
                sx={{ borderRadius: "16px", flexShrink: 0 }}
              />
              <Box sx={{ flex: 1 }}>
                <Skeleton width="50%" height={18} />
                <Skeleton width="65%" height={36} sx={{ mt: 0.5 }} />
              </Box>
            </Box>
            <Skeleton width="100%" height={1} sx={{ my: 1 }} />
            <Box display="flex" gap={2}>
              <Skeleton width="45%" height={18} />
              <Skeleton width="45%" height={18} />
            </Box>
          </Card>
        </Grid>

        {/* Card 2: Order Volume Skeleton */}
        <Grid size={{ xs: 12, sm: 6, lg: 4 }}>
          <Card
            sx={{
              p: 3,
              borderRadius: 4,
              height: 190,
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            <Box display="flex" alignItems="center" gap={2}>
              <Skeleton
                variant="rounded"
                width={56}
                height={56}
                sx={{ borderRadius: "16px", flexShrink: 0 }}
              />
              <Box sx={{ flex: 1 }}>
                <Skeleton width="50%" height={18} />
                <Skeleton width="40%" height={36} sx={{ mt: 0.5 }} />
              </Box>
            </Box>
            <Skeleton width="100%" height={1} sx={{ my: 1 }} />
            <Grid container spacing={0.5}>
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <Grid size={{ xs: 6 }} key={i}>
                  <Skeleton width="80%" height={14} />
                </Grid>
              ))}
            </Grid>
          </Card>
        </Grid>

        {/* Card 3: Dishes & Menu Skeleton */}
        <Grid size={{ xs: 12, sm: 6, lg: 4 }}>
          <Card
            sx={{
              p: 3,
              borderRadius: 4,
              height: 190,
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            <Box display="flex" alignItems="center" gap={2}>
              <Skeleton
                variant="rounded"
                width={56}
                height={56}
                sx={{ borderRadius: "16px", flexShrink: 0 }}
              />
              <Box sx={{ flex: 1 }}>
                <Skeleton width="50%" height={18} />
                <Skeleton width="35%" height={36} sx={{ mt: 0.5 }} />
              </Box>
            </Box>
            <Skeleton width="100%" height={1} sx={{ my: 1 }} />
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
            >
              <Skeleton width="30%" height={18} />
              <Skeleton
                variant="rounded"
                width={80}
                height={20}
                sx={{ borderRadius: "6px" }}
              />
            </Box>
          </Card>
        </Grid>
      </Grid>

      {/* ── 2. Analytics Charts Skeleton (Area & Donut) ───────── */}
      <Grid container spacing={3}>
        <Grid size={{ xs: 12, lg: 7 }}>
          <Card sx={{ p: 3, borderRadius: 4, height: 380 }}>
            <Skeleton width="45%" height={28} sx={{ mb: 2 }} />
            <Skeleton
              variant="rounded"
              width="100%"
              height={290}
              sx={{ borderRadius: 2 }}
            />
          </Card>
        </Grid>
        <Grid size={{ xs: 12, lg: 5 }}>
          <Card sx={{ p: 3, borderRadius: 4, height: 380 }}>
            <Skeleton width="55%" height={28} sx={{ mb: 3 }} />
            <Box
              display="flex"
              alignItems="center"
              justifyContent="center"
              height={270}
              gap={3}
            >
              <Box sx={{ flex: 1 }}>
                {[1, 2, 3, 4, 5].map((i) => (
                  <Skeleton key={i} width="85%" height={22} sx={{ mb: 1.5 }} />
                ))}
              </Box>
              <Skeleton
                variant="circular"
                width={170}
                height={170}
                sx={{ flexShrink: 0 }}
              />
            </Box>
          </Card>
        </Grid>
      </Grid>

      {/* ── 3. Recent Activity Tables Skeleton ─────────────────── */}
      <Grid container spacing={3}>
        {[0, 1].map((i) => (
          <Grid size={{ xs: 12, lg: 6 }} key={i}>
            <Card sx={{ p: 3, borderRadius: 4 }}>
              <Skeleton width="35%" height={28} sx={{ mb: 2 }} />
              {/* Header */}
              <Skeleton
                variant="rounded"
                width="100%"
                height={36}
                sx={{ borderRadius: "8px", mb: 1.5 }}
              />
              {/* Rows */}
              {[1, 2, 3, 4].map((j) => (
                <Skeleton
                  key={j}
                  variant="rounded"
                  width="100%"
                  height={32}
                  sx={{ borderRadius: "6px", mb: 1 }}
                />
              ))}
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* ── 4. Management Shortcuts Skeleton ──────────────────── */}
      <Box>
        <Skeleton width="25%" height={28} sx={{ mb: 2 }} />
        <Grid container spacing={3}>
          {[1, 2, 3].map((i) => (
            <Grid size={{ xs: 12, sm: 4 }} key={i}>
              <Card
                sx={{
                  p: 3.5,
                  borderRadius: 4,
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  minHeight: 240,
                }}
              >
                <Box>
                  <Skeleton
                    variant="rounded"
                    width={56}
                    height={56}
                    sx={{ borderRadius: "16px", mb: 2.5 }}
                  />
                  <Skeleton width="50%" height={24} sx={{ mb: 1 }} />
                  <Skeleton width="90%" height={16} sx={{ mb: 0.5 }} />
                  <Skeleton width="75%" height={16} sx={{ mb: 2.5 }} />
                </Box>
                <Skeleton
                  variant="rounded"
                  width="100%"
                  height={42}
                  sx={{ borderRadius: "50px" }}
                />
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Stack>
  );
}

export default DashboardSkeleton;
