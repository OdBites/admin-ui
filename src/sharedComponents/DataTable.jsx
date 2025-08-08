import React from "react";
import PropTypes from "prop-types";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Skeleton,
  useTheme,
} from "@mui/material";
import { RenderIf, NoData } from "SpiseBowlMfUI/helpers";

const DataTable = ({
  columns = [],
  rows = [],
  handleChangeRowsPerPage,
  handleChangePage,
  page = 0,
  rowsPerPage = 10,
  totalItem = 0,
  isLoading = false,
  hidePagination = false,
}) => {
  const theme = useTheme();

  return (
    <TableContainer
      component={Paper}
      sx={{
        position: "relative",
        // height: "60vh",
        background: theme.palette.background.default,
        // borderRadius: theme.shape.borderRadius,
        boxShadow: theme.shadows[3],
        maxWidth: {
          xs: `calc(100vw - 2rem)`,
          md: `calc(100vw - (270px + 7rem))`,
        },
        maxHeight: "60vh",
        minHeight: "50vh",
      }}
    >
      <Table stickyHeader>
        <TableHead>
          <TableRow>
            {columns.map((column) => (
              <TableCell
                key={column.id}
                sx={{
                  width: column.maxWidth,
                  textAlign: column.align || "left",
                  backgroundColor: theme.palette.primary.main,
                  fontWeight: column.fontWeight || "bold",
                  textTransform: "capitalize",
                  color: theme.palette.primary.contrastText,
                  minWidth: column.minWidth || 150,
                }}
              >
                {column.label}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {/* Show NoData when no rows & not loading */}
          <RenderIf render={!isLoading && rows.length === 0}>
            <NoData />
          </RenderIf>

          {/* Show Skeleton Loader when loading */}
          {isLoading
            ? [...new Array(4)].map((_, index) => (
                <TableRow key={index + 1}>
                  {columns.map((col) => (
                    <TableCell key={col.id} sx={{ width: col.maxWidth }}>
                      <Skeleton variant="rectangular" height={20} />
                    </TableCell>
                  ))}
                </TableRow>
              ))
            : rows.map((row, rowIndex) => (
                <TableRow key={rowIndex + 1}>
                  {columns.map((col) => (
                    <TableCell
                      key={col.id}
                      sx={{
                        width: col.maxWidth,
                        textAlign: col.align || "left",
                        textTransform: col.textTransform || "none",
                      }}
                    >
                      {row[col.id] || "-N/A-"}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
        </TableBody>
      </Table>

      {/* Pagination */}
      {rows.length > 0 && !hidePagination ? (
        <TablePagination
          sx={{
            backgroundColor: theme.palette.background.paper,
            position: "sticky",
            top: "100%",
            left: 0,
          }}
          component="div"
          count={totalItem}
          page={page}
          onPageChange={handleChangePage}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          rowsPerPageOptions={[5, 15, 30, 50]}
        />
      ) : (
        ""
      )}
    </TableContainer>
  );
};

/** ✅ Add PropTypes for type checking */
DataTable.propTypes = {
  columns: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired, // Unique ID for the column
      label: PropTypes.string.isRequired, // Column header label
      align: PropTypes.oneOf(["left", "right", "center"]), // Alignment of text
      maxWidth: PropTypes.oneOfType([PropTypes.number, PropTypes.string]), // Max width of column
      fontWeight: PropTypes.oneOfType([PropTypes.number, PropTypes.string]), // Font weight (bold, normal, etc.)
      textTransform: PropTypes.string, // Text transformation (capitalize, uppercase, etc.)
    })
  ).isRequired,
  rows: PropTypes.arrayOf(PropTypes.object).isRequired, // Rows should be an array of objects
  handleChangeRowsPerPage: PropTypes.func.isRequired, // Function for changing rows per page
  handleChangePage: PropTypes.func.isRequired, // Function for changing page
  page: PropTypes.number, // Current page index
  rowsPerPage: PropTypes.number, // Number of rows per page
  totalItem: PropTypes.number, // Total number of items
  isLoading: PropTypes.bool, // Loading state
  hidePagination: PropTypes.bool, // Whether to hide pagination
};

export default DataTable;
