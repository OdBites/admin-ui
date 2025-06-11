import React, { useState } from "react";
import { Grid, Card, Typography, Button, Box, Stack } from "@mui/material";
import {
  AddShoppingCart,
  AttachMoney,
  People,
  ShowChart,
} from "@mui/icons-material";

import { ChartVisualizer, DataTable, PageHeader } from "../../sharedComponents";
import {
  orderColumns,
  orderRows,
  productDemand,
  salesData,
  userColumns,
  userRows,
} from "../../data/dashboard";

function Dashboard() {
  // Pagination State
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const metrics = [
    {
      title: "Total Sales",
      value: "$25,000",
      icon: <ShowChart sx={{ fontSize: 40, color: "#1976D2" }} />,
    },
    {
      title: "Orders",
      value: "1,200",
      icon: <AddShoppingCart sx={{ fontSize: 40, color: "#D32F2F" }} />,
    },
    {
      title: "Users",
      value: "5,000",
      icon: <People sx={{ fontSize: 40, color: "#388E3C" }} />,
    },
    {
      title: "Revenue",
      value: "$8,500",
      icon: <AttachMoney sx={{ fontSize: 40, color: "#FFA000" }} />,
    },
  ];
  const handleChangePage = (_, newPage) => setPage(newPage);
  const handleChangeRowsPerPage = (event) =>
    setRowsPerPage(parseInt(event.target.value, 10));

  return (
    <>
      <PageHeader pageTitle="Dashboard" />
      <Stack spacing={3}>
        {/* Top Cards */}
        <Grid container spacing={3}>
          {metrics.map((metric, index) => (
            <Grid item size={{ xs: 12, sm: 6, md: 3 }} key={index + 1}>
              <Card
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  transition: "transform 0.3s ",
                  "&:hover": { transform: "scale(1.03)" },
                  height: 120,
                }}
              >
                {metric.icon}
                <Box textAlign="right">
                  <Typography variant="body2" color="textSecondary">
                    {metric.title}
                  </Typography>
                  <Typography variant="h6" fontWeight="bold">
                    {metric.value}
                  </Typography>
                </Box>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* Chart */}
        <Grid container spacing={3}>
          <Grid size={{ xs: 12, md: 6 }}>
            <Card>
              <Typography variant="h6" fontWeight="bold" mb={2}>
                Sales Overview
              </Typography>
              <ChartVisualizer
                type="line"
                data={salesData}
                dataKeyX="name"
                dataKeyY="sales"
              />
            </Card>
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <Card>
              <Typography variant="h6" fontWeight="bold" mb={2}>
                Product Demand Analytics
              </Typography>
              <ChartVisualizer
                type="bar"
                data={productDemand}
                dataKeyX="name"
                dataKeyY="demand"
              />
            </Card>
          </Grid>
        </Grid>

        {/*  Table */}
        <Grid container spacing={3}>
          <Grid size={{ xs: 12, md: 6 }}>
            <Card>
              <Typography variant="h6" fontWeight="bold" mb={2}>
                Recent Orders
              </Typography>
              <DataTable
                columns={orderColumns}
                rows={orderRows}
                handleChangeRowsPerPage={handleChangeRowsPerPage}
                handleChangePage={handleChangePage}
                page={page}
                rowsPerPage={rowsPerPage}
                totalItem={orderRows.length}
              />
            </Card>
          </Grid>

          {/* Newly Registered Users */}
          <Grid size={{ xs: 12, md: 6 }}>
            <Card>
              <Typography variant="h6" fontWeight="bold" mb={2}>
                Newly Registered Users
              </Typography>
              <DataTable
                columns={userColumns}
                rows={userRows}
                handleChangeRowsPerPage={handleChangeRowsPerPage}
                handleChangePage={handleChangePage}
                page={page}
                rowsPerPage={rowsPerPage}
                totalItem={userRows.length}
              />
            </Card>
          </Grid>
        </Grid>

        {/* Quick Actions */}
        <Grid container spacing={3}>
          <Grid size={{ xs: 12, sm: 4 }}>
            <Button
              variant="contained"
              color="primary"
              fullWidth
              sx={{ borderRadius: 2, fontSize: 16 }}
            >
              ➕ Add Product
            </Button>
          </Grid>
          <Grid size={{ xs: 12, sm: 4 }}>
            <Button
              variant="contained"
              color="secondary"
              fullWidth
              sx={{ borderRadius: 2, fontSize: 16 }}
            >
              🛍️ Manage Users
            </Button>
          </Grid>
          <Grid size={{ xs: 12, sm: 4 }}>
            <Button
              variant="contained"
              color="success"
              fullWidth
              sx={{ borderRadius: 2, fontSize: 16 }}
            >
              📊 View Reports
            </Button>
          </Grid>
        </Grid>
      </Stack>
    </>
  );
}

export default Dashboard;
