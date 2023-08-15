import React from 'react';
import PartsProducedChart from 'components/PartsProducedChart';
import PartsProducedTable from 'components/PartsProducedTable';
import Header from 'components/Header';
import { Box } from '@mui/material';

const Dashboard = () => {
  return (
    <Box m="1.5rem 2.5rem">
      <Header title="Parts Produced" />
      <Box
        mt="20px"
        display="grid"
        gridTemplateColumns="repeat(2, 1fr)"
        gap="20px"
        justifyContent="space-between"
        rowGap="20px"
        columnGap="1.33%"
        sx={{
          "& > div": { gridColumn: "span 1" },
        }}
      >
        <PartsProducedChart operation="Op150" />
        <PartsProducedChart operation="Op230" />
        <PartsProducedTable operation="Op150" />
        <PartsProducedTable operation="Op230" />

        <div style={{marginBottom:"50px"}} />
      </Box>
    </Box>
  );
};

export default Dashboard;









