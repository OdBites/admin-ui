import React from "react";
import { Box, Card, Divider, Grid, Skeleton, Stack } from "@mui/material";

function UserDetailsSkeleton() {
  return (
    <Stack spacing={3}>
      {/* ── Top Profile Card ─────────────────────────────────────── */}
      <Card>
        <Box sx={{ display: "flex", alignItems: "center", columnGap: 4 }}>
          <Skeleton
            variant="circular"
            width={100}
            height={100}
            sx={{ flexShrink: 0 }}
          />
          <Box sx={{ flex: 1 }}>
            <Skeleton width="40%" height={32} sx={{ mb: 1 }} />
            <Skeleton width="25%" height={20} sx={{ mb: 0.5 }} />
            <Skeleton width="20%" height={20} />
          </Box>
        </Box>
      </Card>

      {/* ── User Information Card ───────────────────────────────── */}
      <Card>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Skeleton width="30%" height={30} />
          <Skeleton
            variant="rounded"
            width={70}
            height={32}
            sx={{ borderRadius: "8px" }}
          />
        </Box>
        <Divider sx={{ my: 2 }} />

        <Grid container spacing={{ xs: 2, sm: 3, md: 4 }}>
          {[1, 2, 3, 4, 5, 6].map((item) => (
            <Grid key={item} size={{ xs: 12, sm: 6, md: 4 }}>
              <Skeleton width="45%" height={16} sx={{ mb: 0.5 }} />
              <Skeleton width="70%" height={24} />
            </Grid>
          ))}
        </Grid>
      </Card>

      {/* ── Saved Addresses Card ─────────────────────────────────── */}
      <Card>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Skeleton width="25%" height={30} />
          <Skeleton
            variant="rounded"
            width={90}
            height={24}
            sx={{ borderRadius: "12px" }}
          />
        </Box>
        <Divider sx={{ my: 2 }} />

        <Grid container spacing={{ xs: 2, sm: 3 }}>
          {[1, 2].map((item) => (
            <Grid key={item} size={{ xs: 12, sm: 6, md: 4 }}>
              <Box
                sx={(theme) => ({
                  border: `1px solid ${theme.palette.divider}`,
                  borderRadius: 2,
                  p: 2,
                })}
              >
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 1,
                    mb: 1.5,
                  }}
                >
                  <Skeleton variant="circular" width={20} height={20} />
                  <Skeleton width="40%" height={20} />
                  <Skeleton
                    variant="rounded"
                    width={55}
                    height={20}
                    sx={{ ml: "auto", borderRadius: "10px" }}
                  />
                </Box>
                <Skeleton width="90%" height={16} sx={{ mb: 0.5 }} />
                <Skeleton width="75%" height={16} sx={{ mb: 0.5 }} />
                <Skeleton width="50%" height={16} sx={{ mb: 1.5 }} />
                <Skeleton
                  variant="rounded"
                  width="60%"
                  height={24}
                  sx={{ borderRadius: "12px" }}
                />
              </Box>
            </Grid>
          ))}
        </Grid>
      </Card>
    </Stack>
  );
}

export default UserDetailsSkeleton;
