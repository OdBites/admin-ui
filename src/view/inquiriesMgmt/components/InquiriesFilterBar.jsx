import React from "react";
import PropTypes from "prop-types";
import {
  Box,
  Tabs,
  Tab,
  TextField,
  InputAdornment,
  Chip,
  Stack,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import {
  Search,
  Schedule,
  MarkEmailRead,
  CheckCircle,
  Mail,
} from "@mui/icons-material";

export default function InquiriesFilterBar({
  status,
  onStatusChange,
  search,
  onSearchChange,
  stats,
}) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Box
      sx={{
        p: 2,
        pt: 0,
        display: "flex",
        flexDirection: { xs: "column", md: "row" },
        justifyContent: "space-between",
        alignItems: { xs: "stretch", md: "center" },
        gap: 2,
        borderBottom: "1px solid",
        borderColor: "divider",
      }}
    >
      {/* Status Filter Tabs */}
      <Tabs
        value={status}
        onChange={(_, val) => onStatusChange(val)}
        variant={isMobile ? "scrollable" : "standard"}
        scrollButtons="auto"
        sx={{
          minHeight: 44,
          "& .MuiTab-root": {
            minHeight: 44,
            py: 0.5,
            px: 1.5,
            textTransform: "none",
            fontWeight: 700,
            fontSize: "0.875rem",
          },
        }}
      >
        <Tab
          value="all"
          label={
            <Stack direction="row" spacing={0.75} alignItems="center">
              <Mail sx={{ fontSize: 18 }} />
              <span>All Inquiries</span>
              <Chip
                size="small"
                label={stats?.totalCount || 0}
                sx={{ height: 20, fontSize: "0.75rem", fontWeight: 700 }}
              />
            </Stack>
          }
        />
        <Tab
          value="new"
          label={
            <Stack direction="row" spacing={0.75} alignItems="center">
              <Schedule sx={{ fontSize: 18 }} color="error" />
              <span>New</span>
              <Chip
                size="small"
                color="error"
                label={stats?.newCount || 0}
                sx={{ height: 20, fontSize: "0.75rem", fontWeight: 700 }}
              />
            </Stack>
          }
        />
        <Tab
          value="contacted"
          label={
            <Stack direction="row" spacing={0.75} alignItems="center">
              <MarkEmailRead sx={{ fontSize: 18 }} color="warning" />
              <span>Contacted</span>
              <Chip
                size="small"
                color="warning"
                label={stats?.contactedCount || 0}
                sx={{ height: 20, fontSize: "0.75rem", fontWeight: 700 }}
              />
            </Stack>
          }
        />
        <Tab
          value="resolved"
          label={
            <Stack direction="row" spacing={0.75} alignItems="center">
              <CheckCircle sx={{ fontSize: 18 }} color="success" />
              <span>Resolved</span>
              <Chip
                size="small"
                color="success"
                label={stats?.resolvedCount || 0}
                sx={{ height: 20, fontSize: "0.75rem", fontWeight: 700 }}
              />
            </Stack>
          }
        />
      </Tabs>

      {/* Search Input */}
      <TextField
        size="small"
        placeholder="Search by name, email, phone, subject..."
        value={search}
        onChange={(e) => onSearchChange(e.target.value)}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Search color="action" fontSize="small" />
            </InputAdornment>
          ),
        }}
        sx={{
          minWidth: { xs: "100%", md: 320 },
          "& .MuiOutlinedInput-root": {
            borderRadius: 2.5,
          },
        }}
      />
    </Box>
  );
}

InquiriesFilterBar.propTypes = {
  status: PropTypes.string.isRequired,
  onStatusChange: PropTypes.func.isRequired,
  search: PropTypes.string.isRequired,
  onSearchChange: PropTypes.func.isRequired,
  stats: PropTypes.object,
};
