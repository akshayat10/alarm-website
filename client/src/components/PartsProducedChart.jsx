import React, { useState, useEffect } from "react";
import { Box, useTheme } from "@mui/material";
import { useGetPartsByOperationQuery } from "state/api";
import { ResponsiveBar } from "@nivo/bar";
import Header from "components/Header";

const PartsProducedChart = ({ operation }) => {
  const theme = useTheme();
  const { data, isLoading, isError } = useGetPartsByOperationQuery({ operation });
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    if (data && data.submissions) {
      const shiftCountsByDate = {};

      // today's date
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      // date 8 days ago from today
      const eightDaysAgo = new Date();
      eightDaysAgo.setDate(today.getDate() - 8);
      eightDaysAgo.setHours(0, 0, 0, 0);

      // count parts produced for each shift on each date within the past eight days
      for (let date = new Date(eightDaysAgo); date <= today; date.setDate(date.getDate() + 1)) {
        const dateString = date.toISOString().split("T")[0];
        shiftCountsByDate[dateString] = { date: dateString };
      }

      data.submissions.forEach((submission) => {
        const { date, shift, partsProduced } = submission;
        const submissionDate = new Date(date);
        submissionDate.setUTCHours(0, 0, 0, 0);

        if (submissionDate >= eightDaysAgo && submissionDate <= today) {
          const dateString = submissionDate.toISOString().split("T")[0];

          if (!shiftCountsByDate[dateString][shift]) {
            shiftCountsByDate[dateString][shift] = partsProduced;
          } else {
            shiftCountsByDate[dateString][shift] += partsProduced;
          }
        }
      });

      // Convert data to format of Nivo bar chart
      const formattedChartData = Object.values(shiftCountsByDate)
      .filter((shiftData) => shiftData.date !== eightDaysAgo.toISOString().split("T")[0]) // Exclude the earliest date
      .map((shiftData) => shiftData);

      setChartData(formattedChartData);
    }
  }, [data]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error fetching data</div>;
  }

  return (
    <Box m="1.5rem 2.5rem">
      <Header  subtitle={`Total parts produced for ${operation}`} />
      <div style={{ height: "500px" }}>
    {chartData.length > 0 ? (
      <ResponsiveBar
        data={chartData}
        keys={["Day", "Night", "Afternoon"]}
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
          legend: "Date", 
          legendOffset: 55,
          legendPosition: "middle",
        }}
        axisLeft={{
          legend: "# of parts produced", 
          legendPosition: "middle",
          legendOffset: -50,
        }}
      />
    ) : (
      <div>No data available for the chart.</div>
    )}
  </div>
    </Box>
  );
};

export default PartsProducedChart;






