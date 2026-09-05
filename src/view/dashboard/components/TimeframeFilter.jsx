import React from "react";
import PropTypes from "prop-types";
import {
  Box,
  FormControl,
  Select,
  MenuItem,
  ListItemIcon,
  ListItemText,
  useTheme,
  alpha,
} from "@mui/material";
import {
  CalendarToday,
  DateRange,
  History,
  Today,
  ViewWeek,
  QueryBuilder,
} from "@mui/icons-material";

const TIMEFRAME_OPTIONS = [
  { value: "lifetime", label: "Life Time", icon: <History fontSize="small" /> },
  {
    value: "last1Year",
    label: "Last 1 Year",
    icon: <DateRange fontSize="small" />,
  },
  {
    value: "last6Months",
    label: "Last 6 Months",
    icon: <CalendarToday fontSize="small" />,
  },
  {
    value: "last3Months",
    label: "Last 3 Months",
    icon: <CalendarToday fontSize="small" />,
  },
  {
    value: "lastWeek",
    label: "Last Week",
    icon: <ViewWeek fontSize="small" />,
  },
  {
    value: "yesterday",
    label: "Yesterday",
    icon: <QueryBuilder fontSize="small" />,
  },
  { value: "today", label: "Today", icon: <Today fontSize="small" /> },
];

function TimeframeFilter({ value, onChange }) {
  const theme = useTheme();

  return (
    <Box sx={{ display: "flex", alignItems: "center" }}>
      <FormControl size="small" sx={{ minWidth: 170 }}>
        <Select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          displayEmpty
          sx={{
            borderRadius: "12px",
            backgroundColor: theme.palette.background.paper,
            border: `1px solid ${alpha(theme.palette.primary.main, theme.palette.mode === "light" ? 0.2 : 0.3)}`,
            fontSize: "0.875rem",
            fontWeight: 600,
            "& .MuiSelect-select": {
              py: 1,
              px: 1.5,
              display: "flex",
              alignItems: "center",
              gap: 1,
            },
            "&:hover": {
              borderColor: "primary.main",
            },
            "&.Mui-focused": {
              borderColor: "primary.main",
              boxShadow: `0 0 0 2px ${alpha(theme.palette.primary.main, 0.25)}`,
            },
          }}
          MenuProps={{
            PaperProps: {
              sx: {
                borderRadius: "14px",
                mt: 1,
                boxShadow: theme.shadows[4] || "0 10px 30px rgba(0,0,0,0.15)",
                border: `1px solid ${theme.palette.divider}`,
              },
            },
          }}
        >
          {TIMEFRAME_OPTIONS.map((opt) => (
            <MenuItem
              key={opt.value}
              value={opt.value}
              sx={{
                fontSize: "0.875rem",
                fontWeight: value === opt.value ? 700 : 500,
                borderRadius: "8px",
                mx: 0.5,
                my: 0.2,
                "&.Mui-selected": {
                  backgroundColor: alpha(theme.palette.primary.main, 0.12),
                  color: "primary.main",
                  "&:hover": {
                    backgroundColor: alpha(theme.palette.primary.main, 0.2),
                  },
                },
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 28,
                  color:
                    value === opt.value ? "primary.main" : "text.secondary",
                }}
              >
                {opt.icon}
              </ListItemIcon>
              <ListItemText
                primary={opt.label}
                primaryTypographyProps={{
                  fontSize: "0.875rem",
                  fontWeight: value === opt.value ? 700 : 500,
                }}
              />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
}

TimeframeFilter.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  isFetching: PropTypes.bool,
};

export default TimeframeFilter;
