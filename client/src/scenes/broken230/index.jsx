// Broken230.js
import React from "react";
import BrokenTable from "components/BrokenTable";
import BrokenToolChart from "components/BrokenToolChart";
import { useState } from "react";
import ChartPopup from "components/ChartPopup";
import EachToolChart from "components/EachToolChart";

const Broken230 = () => {
  const [selectedChart, setSelectedChart] = useState(null);
  const handlePopupClose = () => {
    setSelectedChart(null);
  };

  return (
    <div>
    <BrokenToolChart operation="Op230"/>
    <div style={{ marginTop: '20px' }} />
    <BrokenTable operation="Op230" />

    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "10px" }}>
        <EachToolChart operation="Op150" toolNumber={1}  />
        <EachToolChart operation="Op150" toolNumber={3}  />
        <EachToolChart operation="Op150" toolNumber={5}  />
        <EachToolChart operation="Op150" toolNumber={7}  />
        <EachToolChart operation="Op150" toolNumber={9}  />
        {selectedChart && <ChartPopup chartData={selectedChart} onClose={handlePopupClose} />}
      </div>

    <div style={{marginBottom:"100px"}} />
  </div>
    
  )
};

export default Broken230;
