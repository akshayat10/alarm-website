import React, { useState } from "react";
import BrokenTable from "components/BrokenTable";
import BrokenToolChart from "components/BrokenToolChart";
import EachToolChart from "components/EachToolChart";
import ChartPopup from "components/ChartPopup";


const Broken220 = () => {
  const [selectedChart, setSelectedChart] = useState(null);

  const handlePopupClose = () => {
    setSelectedChart(null);
  };

  return (
    <div>
      <BrokenToolChart operation="Op220" />
      <div style={{ marginTop: "20px" }} />
      <BrokenTable operation="Op220" />

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "10px" }}>
        <EachToolChart operation="Op220" toolNumber={1}  />
        <EachToolChart operation="Op220" toolNumber={4}  />
        <EachToolChart operation="Op220" toolNumber={15}  />
        {selectedChart && <ChartPopup chartData={selectedChart} onClose={handlePopupClose} />}
      </div>
      <div style={{ marginBottom: "100px" }} />
    </div>
  );
};

export default Broken220;

