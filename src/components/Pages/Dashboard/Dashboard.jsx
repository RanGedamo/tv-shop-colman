import React from "react";
import { Pie, Line } from "react-chartjs-2";
import { Chart, CategoryScale, LinearScale, PointElement, LineElement, ArcElement, Tooltip, Legend } from "chart.js";
import "./Dashboard.css";

// רישום הרכיבים הנדרשים ל-Chart.js
Chart.register(CategoryScale, LinearScale, PointElement, LineElement, ArcElement, Tooltip, Legend);

function Dashboard() {
  // נתונים לגרף ה-Pie
  const pieData = {
    labels: ["Open", "Bounce", "Unsubscribe"],
    datasets: [
      {
        data: [53, 36, 11],
        backgroundColor: ["#36A2EB", "#FF6384", "#FFCE56"],
        hoverBackgroundColor: ["#36A2EB", "#FF6384", "#FFCE56"],
      },
    ],
  };

  // נתונים לגרף ה-Line
  const lineData = {
    labels: ["9:00AM", "12:00PM", "3:00PM", "6:00PM", "9:00PM", "12:00AM", "3:00AM", "6:00AM"],
    datasets: [
      {
        label: "Open",
        data: [100, 200, 300, 400, 500, 600, 700, 800],
        borderColor: "#36A2EB",
        backgroundColor: "rgba(54, 162, 235, 0.2)",
        Filler: true,
      },
      {
        label: "Click",
        data: [50, 150, 250, 350, 450, 550, 650, 750],
        borderColor: "#FF6384",
        backgroundColor: "rgba(255, 99, 132, 0.2)",
        Filler: true,
      },
      {
        label: "Click Second Time",
        data: [30, 100, 200, 300, 400, 500, 600, 700],
        borderColor: "#FFCE56",
        backgroundColor: "rgba(255, 206, 86, 0.2)",
        Filler: true,
      },
    ],
  };

  return (
    <div className="dashboard">
      <div className="dashboard-cards">
        <div className="card">
          <h5>Total Products</h5>
          <p>50</p>
        </div>
        <div className="card">
          <h5>Total Sales</h5>
          <p>120</p>
        </div>
        <div className="card">
          <h5>Total Purchases</h5>
          <p>75</p>
        </div>
      </div>

      <div className="dashboard-grid">
        {/* Line Chart */}
        <div className="chart-container">
          <h3>Users Behavior</h3>
          <Line data={lineData} />
          <p className="chart-footer">Updated 3 minutes ago</p>
        </div>

        {/* Pie Chart */}
        <div className="chart-container">
          <h3>Email Statistics</h3>
          <Pie data={pieData} />
          <p className="chart-footer">Campaign sent 2 days ago</p>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
