
import React from "react";
import { Line, Bar, Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  TimeScale,
} from "chart.js";
//import "chartjs-adapter-date-fns";
import styled from "styled-components";
import { rawData } from "./data";
import { format, parseISO, isValid } from "date-fns";

// Register the necessary components with Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  TimeScale // Register the TimeScale
);

// Styled-components for dashboard layout
const DashboardContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 20px;
  padding: 20px;
`;

const ChartContainer = styled.div`
  background: #fff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const PieChartWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const PieChartContainer = styled.div`
  max-width: 400px; /* Adjust the max width as needed */
`;

function App() {
  // Processing data for charts
  const processData = (data) => {
    const alertCounts = {};
    const srcIpCounts = {};
    const destPortCounts = {};

    data.forEach((entry) => {
      // Parse and format time consistently
      let time;
      if (isValid(new Date(entry.timestamp))) {
        time = format(new Date(entry.timestamp), "HH:mm:ss");
      } else {
        console.error(`Invalid date: ${entry.timestamp}`);
        time = "Invalid Time";
      }

      if (time !== "Invalid Time") {
        alertCounts[time] = (alertCounts[time] || 0) + 1;
      }
      srcIpCounts[entry.src_ip] = (srcIpCounts[entry.src_ip] || 0) + 1;
      destPortCounts[entry.dest_port] =
        (destPortCounts[entry.dest_port] || 0) + 1;
    });
    // console.log(alertCounts);
    return { alertCounts, srcIpCounts, destPortCounts };
  };

  const { alertCounts, srcIpCounts, destPortCounts } = processData(rawData);
  console.log(Object.keys(alertCounts), ":", Object.values(alertCounts));
  const alertsOverTime = {
    labels: ["03:50:09", "03:50:10", "03:50:11", "03:51:01", "03:52:18"],
    datasets: [
      {
        label: "Alerts Over Time",
        data: [1, 5, 1, 3, 2],
        borderColor: "rgb(53, 162, 235)",
        backgroundColor: "rgba(53, 162, 235, 0.5)",
      },
    ],
  };

  const alertsBySrcIp = {
    labels: Object.keys(srcIpCounts),
    datasets: [
      {
        label: "Alerts by Source IP",
        data: Object.values(srcIpCounts),
        backgroundColor: "rgba(153, 102, 255, 0.2)",
        borderColor: "rgba(153, 102, 255, 1)",
        borderWidth: 1,
      },
    ],
  };

  const alertsByDestPort = {
    labels: Object.keys(destPortCounts),
    datasets: [
      {
        data: Object.values(destPortCounts),
        backgroundColor: [
          "#FF6384",
          "#36A2EB",
          "#FFCE56",
          "#4BC0C0",
          "#9966FF",
          "#FF9F40",
        ],
      },
    ],
  };

  const lineOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Chart.js Line Chart",
      },
    },
  };

  const pieOptions = {
    plugins: {
      legend: {
        position: "left",
        align: "start",
        labels: {
          boxWidth: 20,
          padding: 20,
          pointStyle: "circle",
        },
      },
    },
  };

  return (
    <DashboardContainer>
      <ChartContainer>
        <h2>Alerts Over Time</h2>
        <Line options={lineOptions} data={alertsOverTime} />
      </ChartContainer>
      <ChartContainer>
        <h2>Alerts by Source IP</h2>
        <Bar data={alertsBySrcIp} />
      </ChartContainer>
      <ChartContainer>
        <h2>Alerts by Destination Port</h2>
        <PieChartWrapper>
          <PieChartContainer>
            <Pie data={alertsByDestPort} options={pieOptions} />
          </PieChartContainer>
        </PieChartWrapper>
      </ChartContainer>
    </DashboardContainer>
  );
}

export default App;