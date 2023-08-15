import React from "react";
import { Box, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useGetAirCheckByOperationQuery } from "state/api";


const AirCheckTable = ({ operation }) => {
  const theme = useTheme();
  const { data, isLoading, isError } = useGetAirCheckByOperationQuery({ operation });

  const columns = [
    {
      field: "date",
      headerName: "Date",
      flex: 1.5,
      valueGetter: (params) => {
        // split date string from timestamp
        const dateString = params.value.split("T")[0];
        return dateString;
      },
    },
    { field: "shift", headerName: "Shift", flex: 1 },
    { field: "machine", headerName: "Machine", flex: 1 },
    { field: "palletNumber", headerName: "Pallet Number", flex: 1 },
    { field: "issue", headerName: "Issue/Comments", flex: 1 },
  ];

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
          rows={(data && data.submissions) || []}
          columns={columns}
          pageSizeOptions={[20,50,100]}
        />
      </Box>
    </Box>
  );
};

export default AirCheckTable;