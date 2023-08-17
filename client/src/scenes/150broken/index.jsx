import React from "react";
import BrokenTable from "components/BrokenTable";
import BrokenToolChart from "components/BrokenToolChart";
import EachToolChart from "components/EachToolChart";
import ChartPopup from "components/ChartPopup";
import { useState } from "react";

const Broken150 = () => {
  const [selectedChart, setSelectedChart] = useState(null);

  const handlePopupClose = () => {
    setSelectedChart(null);
  };

  return (
    <div>
    <BrokenToolChart operation="Op150" />
    <div style={{ marginTop: '20px' }} />
    <BrokenTable operation="Op150" />

    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "10px" }}>
        <EachToolChart operation="Op150" toolNumber={17}  />
        <EachToolChart operation="Op150" toolNumber={11}  />
        <EachToolChart operation="Op150" toolNumber={12}  />
        <EachToolChart operation="Op150" toolNumber={1}  />
        {selectedChart && <ChartPopup chartData={selectedChart} onClose={handlePopupClose} />}
      </div>
    <div style={{marginBottom:"100px"}} />
  </div>
    
  )
};

export default Broken150;

