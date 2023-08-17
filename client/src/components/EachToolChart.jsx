import React, { useState, useEffect } from "react";
import { Box, useTheme, Dialog, DialogContent, IconButton } from "@mui/material";
import { ResponsiveBar } from "@nivo/bar";
import { Close } from "@mui/icons-material";
import Header from "components/Header";
import { useGetBrokenToolsByOperationQuery } from "state/api";

const EachToolChart = ({ operation, toolNumber }) => {
  const theme = useTheme();
  const [chartData, setChartData] = useState([]);
  const [machineNames, setMachineNames] = useState([]);

  const { data: airCheckData, isLoading: isLoadingAirCheck, isError: isErrorAirCheck } = useGetBrokenToolsByOperationQuery({
    operation,
  });

  const [isChartModalOpen, setIsChartModalOpen] = useState(false);

const openChartModal = () => {
  setIsChartModalOpen(true);
};

const closeChartModal = () => {
  setIsChartModalOpen(false);
};


  useEffect(() => {
    if (airCheckData && airCheckData.submissions) {
      const machineCountsByDate = {};

      // today's date
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      // date 3 weeks ago from today
      const threeWeeksAgo = new Date();
      threeWeeksAgo.setDate(today.getDate() - 21);
      threeWeeksAgo.setHours(0, 0, 0, 0);

      // only include submissions with specified tool number
      const filteredSubmissions = airCheckData.submissions.filter((submission) => submission.toolNumber == toolNumber);

      // count machines for each date within the past three weeks
      for (let date = new Date(threeWeeksAgo); date <= today; date.setDate(date.getDate() + 1)) {
        const dateString = date.toISOString().split("T")[0];
        machineCountsByDate[dateString] = {};
      }

      filteredSubmissions.forEach((submission) => {
        const { date, machine } = submission;
        const submissionDate = new Date(date);
        submissionDate.setUTCHours(0, 0, 0, 0);

        if (submissionDate >= threeWeeksAgo && submissionDate <= today) {
          const dateString = submissionDate.toISOString().split("T")[0];

          if (!machineCountsByDate[dateString]) {
            machineCountsByDate[dateString] = {};
          }

          if (!machineCountsByDate[dateString][machine]) {
            machineCountsByDate[dateString][machine] = 1;
          } else {
            machineCountsByDate[dateString][machine]++;
          }
        }
      });

      // Convert data to format of Nivo bar chart
      const formattedChartData = Object.keys(machineCountsByDate)
      .filter((dateString) => dateString !== threeWeeksAgo.toISOString().split("T")[0]) // Exclude the earliest date
      .map((dateString) => {
        return {
          date: dateString,
          ...machineCountsByDate[dateString],
        };
      });

      setChartData(formattedChartData);

      // Get array of machine names
      const machineNames = [...new Set(filteredSubmissions.map((submission) => submission.machine))];
      setMachineNames(machineNames);
    }
  }, [airCheckData, operation, toolNumber]);

  if (isLoadingAirCheck) {
    return <div>Loading...</div>;
  }

  if (isErrorAirCheck) {
    return <div>Error fetching data</div>;
  }

  return (
    <Box m="1.5rem 2.5rem">
      <Header  subtitle={`List of broken tools for (Tool Number: ${toolNumber})`} />
      <div style={{ height: "500px", cursor: "pointer" }} onClick={openChartModal}>
      {chartData.length > 0 ? (
        <ResponsiveBar
          data={chartData}
          keys={machineNames}
          indexBy="date"
          margin={{ top: 50, right: 130, bottom: 70, left: 60 }}
          padding={0.3}
          groupMode="grouped"
          colors={{ scheme: "nivo" }}
          theme={{
            axis: {
              domain: {
                line: {
                  stroke: theme.palette.secondary[200],
                },
              },
              legend: {
                text: {
                  fill: theme.palette.secondary[200],
                },
              },
              ticks: {
                line: {
                  stroke: theme.palette.secondary[200],
                  strokeWidth: 1,
                },
                text: {
                  fill: theme.palette.secondary[200],
                },
              },
            },
            legends: {
              text: {
                fill: theme.palette.secondary[200],
              },
            },
            tooltip: {
              container: {
                color: theme.palette.neutral.main,
              },
            },
          }}
          enableLegend={true}
          legends={[
            {
              anchor: "bottom-right",
              direction: "column",
              justify: false,
              translateX: 120,
              translateY: -40,
              itemsSpacing: 5,
              itemWidth: 100,
              itemHeight: 20,
              itemDirection: "left-to-right",
              itemOpacity: 0.85,
              symbolSize: 20,
              symbolShape: "square",
              textColor: "#fff",
              effects: [
                {
                  on: "hover",
                  style: {
                    itemOpacity: 1,
                  },
                },
              ],
            },
          ]}
          axisBottom={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: -35,
            tickValues: [],
            legend: "Date", 
            legendOffset: 55,
            legendPosition: "middle",
          }}
          axisLeft={{
            legend: "# of tools", 
            legendPosition: "middle",
            legendOffset: -50,
          }}
        />
      ) : (
        <div>No data available for the chart.</div>
      )}
    </div>

    {/* modal window for pop up chart */}
    <Dialog
      open={isChartModalOpen}
      onClose={closeChartModal}
      maxWidth="lg"
      fullWidth
    >
      <DialogContent>
        <IconButton
          aria-label="close"
          onClick={closeChartModal}
          sx={{ position: "absolute", top: 10, right: 10 }}
        >
          <Close />
        </IconButton>
        <div style={{ height: "800px" }}>
          <ResponsiveBar
            data={chartData}
            keys={machineNames}
            indexBy="date"
            margin={{ top: 50, right: 130, bottom: 70, left: 60 }}
            padding={0.3}
            groupMode="grouped"
            colors={{ scheme: "nivo" }}
            theme={{
              axis: {
                domain: {
                  line: {
                    stroke: theme.palette.secondary[200],
                  },
                },
                legend: {
                  text: {
                    fill: theme.palette.secondary[200],
                  },
                },
                ticks: {
                  line: {
                    stroke: theme.palette.secondary[200],
                    strokeWidth: 1,
                  },
                  text: {
                    fill: theme.palette.secondary[200],
                  },
                },
              },
              legends: {
                text: {
                  fill: theme.palette.secondary[200],
                },
              },
              tooltip: {
                container: {
                  color: theme.palette.neutral.main,
                },
              },
            }}
            enableLegend={true}
            axisBottom={{
              tickSize: 5,
              tickPadding: 5,
              tickRotation: -35,
              legend: "Date", 
              legendOffset: 55,
              legendPosition: "middle",
            }}
            axisLeft={{
              legend: "# of tools", 
              legendPosition: "middle",
              legendOffset: -50,
            }}
            legends={[
              {
                anchor: "bottom-right",
                direction: "column",
                justify: false,
                translateX: 120,
                translateY: -40,
                itemsSpacing: 5,
                itemWidth: 100,
                itemHeight: 20,
                itemDirection: "left-to-right",
                itemOpacity: 0.85,
                symbolSize: 20,
                symbolShape: "square",
                textColor: "#fff",
                effects: [
                  {
                    on: "hover",
                    style: {
                      itemOpacity: 1,
                    },
                  },
                ],
              },
            ]}
          />
        </div>
      </DialogContent>
    </Dialog>
    </Box>
  );
};

export default EachToolChart;

