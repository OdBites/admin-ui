import React from "react";
import { Grid, Card, CardContent, Skeleton, Stack, Box } from "@mui/material";

export default function InquiriesSkeleton() {
  return (
    <Stack spacing={3}>
      {/* Stat Cards Skeleton */}
      <Grid container spacing={2}>
        {[1, 2, 3, 4].map((item) => (
          <Grid size={{ xs: 12, sm: 6, md: 3 }} key={item}>
            <Card sx={{ p: 1.5, borderRadius: 3 }}>
              <CardContent sx={{ p: 1.5, "&:last-child": { pb: 1.5 } }}>
                <Stack spacing={1}>
                  <Skeleton variant="text" width="50%" height={20} />
                  <Skeleton
                    variant="rectangular"
                    width="40%"
                    height={32}
                    sx={{ borderRadius: 1 }}
                  />
                </Stack>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Table Card Skeleton */}
      <Card sx={{ p: 2.5, borderRadius: 3 }}>
        <Stack spacing={2}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Skeleton
              variant="rectangular"
              width={240}
              height={40}
              sx={{ borderRadius: 2 }}
            />
            <Skeleton
              variant="rectangular"
              width={320}
              height={40}
              sx={{ borderRadius: 2 }}
            />
          </Box>
          {[1, 2, 3, 4, 5].map((row) => (
            <Skeleton
              key={row}
              variant="rectangular"
              height={54}
              sx={{ borderRadius: 1.5 }}
            />
          ))}
        </Stack>
      </Card>
    </Stack>
  );
}
