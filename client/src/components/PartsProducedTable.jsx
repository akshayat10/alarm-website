import React, { useState } from "react";
import { Box, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useGetPartsByOperationQuery } from "state/api";

const PartsProducedTable = ({ operation }) => {
  const theme = useTheme();
  const { data, isLoading, isError } = useGetPartsByOperationQuery({ operation });

  const columns = [
    {
      field: "date",
      headerName: "Date",
      flex: 1,
      valueGetter: (params) => {
        const dateString = params.value.split("T")[0];
        return dateString;
      },
    },
    {
      field: "time",
      headerName: "Time",
      flex: 1,
      valueGetter: (params) => {
        if (params.value) {
          // split hours and minutes from timestamp string
          const [hours, minutes] = params.value.split(":");
          // Convert to 12-hour format and determine AM or PM
          const twelveHourFormat = `${(hours % 12) || 12}:${minutes} ${hours >= 12 ? "PM" : "AM"}`;
          return twelveHourFormat;
        }
      },
    },
    { field: "shift", headerName: "Shift", flex: 1 },
    { field: "operation", headerName: "Operation", flex: 1 },
    { field: "partsProduced", headerName: "Parts Produced", flex: 1 },
  ];

  const filteredRows = (data && data.submissions) ? data.submissions.filter(row => row.partsProduced) : [];

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error fetching data</div>;
  }

  return (
    <Box m="1.5rem 2.5rem">
      <Box
        height="80vh"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: theme.palette.background.alt,
            color: theme.palette.secondary[100],
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: theme.palette.primary.light,
          },
          "& .MuiDataGrid-footerContainer": {
            backgroundColor: theme.palette.background.alt,
            color: theme.palette.secondary[100],
            borderTop: "none",
          },
          "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
            color: `${theme.palette.secondary[200]} !important`,
          },
        }}
      >
        <DataGrid
          loading={isLoading || !data}
          getRowId={(row) => row._id}
          rows={filteredRows}
          columns={columns}
          pageSizeOptions={[20,50,100]}
        />
      </Box>
    </Box>
  );
};

export default PartsProducedTable;