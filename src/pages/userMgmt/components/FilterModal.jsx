import React, { memo } from "react";
import {
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Box,
} from "@mui/material";
import PropTypes from "prop-types";
import { FilterWrapper } from "SpiseBowlMfUI/sharedComp";
import { droDownOptions } from "../../../constant";

function FilterModal({ filters, setFilters }) {
  const {
    status = "",
    order = "",
    dateInterval = "",
    fromDate = "",
    toDate = "",
  } = filters;
  return (
    <FilterWrapper>
      <Grid
        container
        spacing={2}
        fullWidth
        sx={{
          minWidth: {
            xs: "calc(100vw - 60px)",
            md: "calc(100vw - (270px + 60px))",
          },
        }}
      >
        <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
          <FormControl fullWidth>
            <InputLabel id="status-select-label">Status</InputLabel>
            <Select
              value={status}
              labelId="status-select-label"
              label="Status"
              onChange={(e) => setFilters({ status: e.target.value })}
            >
              {droDownOptions.userMgmt.status.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
          <FormControl fullWidth>
            <InputLabel id="order-select-label">Orders</InputLabel>
            <Select
              value={order}
              labelId="order-select-label"
              label="Orders"
              onChange={(e) => setFilters({ order: e.target.value })}
            >
              {droDownOptions.userMgmt.orders.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
          <FormControl fullWidth>
            <InputLabel id="date-interval-label">Join Date Interval</InputLabel>
            <Select
              value={dateInterval}
              labelId="date-interval-label"
              label="Join Date Interval"
              onChange={(e) => {
                setFilters({
                  dateInterval: e.target.value,
                  fromDate: "",
                  toDate: "",
                });
              }}
              disabled={Boolean(fromDate || toDate)}
            >
              {droDownOptions.userMgmt.dateInterval.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
          <TextField
            fullWidth
            label="From Date"
            type="date"
            value={fromDate}
            onChange={(e) => {
              setFilters({ fromDate: e.target.value, dateInterval: "" });
            }}
            disabled={Boolean(dateInterval)}
            slotProps={{ inputLabel: { shrink: true } }}
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
          <TextField
            fullWidth
            label="To Date"
            type="date"
            value={toDate}
            onChange={(e) => {
              setFilters({ toDate: e.target.value, dateInterval: "" });
            }}
            disabled={Boolean(dateInterval)}
            slotProps={{ inputLabel: { shrink: true } }}
          />
        </Grid>
      </Grid>
    </FilterWrapper>
  );
}

// props validation
FilterModal.propTypes = {
  filters: PropTypes.shape({
    status: PropTypes.string,
    order: PropTypes.string,
    dateInterval: PropTypes.string,
    fromDate: PropTypes.string,
    toDate: PropTypes.string,
  }),
  setFilters: PropTypes.func.isRequired,
};

export default memo(FilterModal);
