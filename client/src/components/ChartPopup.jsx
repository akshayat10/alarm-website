import React from "react";
import { Dialog, DialogTitle, DialogContent, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { ResponsiveBar } from "@nivo/bar";

const ChartPopup = ({ chartData, onClose }) => {
  return (
    <Dialog open={true} onClose={onClose} fullWidth maxWidth="md">
      <DialogTitle>
        Chart Popup
        <IconButton edge="end" color="inherit" onClick={onClose} aria-label="close">
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent dividers>
        <div style={{ height: "500px" }}>
          <ResponsiveBar
            data={chartData}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ChartPopup;
