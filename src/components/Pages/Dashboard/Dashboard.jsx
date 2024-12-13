import React from "react";
import { Pie, Line } from "react-chartjs-2";
import {
  Chart,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";
import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  Users,
  Settings,
} from "lucide-react";

// רישום הרכיבים הנדרשים ל-Chart.js
Chart.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  Tooltip,
  Legend
);

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
    labels: [
      "9:00AM",
      "12:00PM",
      "3:00PM",
      "6:00PM",
      "9:00PM",
      "12:00AM",
      "3:00AM",
      "6:00AM",
    ],
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
    <div className="min-h-screen bg-gray-100">
      <aside className="w-full md:w-64 md:absolute md:h-full bg-white shadow-lg md:shadow-xl">
        <div className="p-6">
          <h2 className="text-2xl font-bold text-gray-800">Dashboard</h2>
        </div>
        <nav className="px-4 flex md:block overflow-x-auto">
          <ul className="flex md:block space-x-4 md:space-x-0 md:space-y-2 p-2">
            <li>
              <button className="flex items-center px-4 py-3 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors whitespace-nowrap">
                <LayoutDashboard className="w-5 h-5 mr-3" />
                Overview
              </button>
            </li>
            <li>
              <button className="flex items-center px-4 py-3 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors whitespace-nowrap">
                <Package className="w-5 h-5 mr-3" />
                Products
              </button>
            </li>
            <li>
              <button className="flex items-center px-4 py-3 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors whitespace-nowrap">
                <ShoppingCart className="w-5 h-5 mr-3" />
                Orders
              </button>
            </li>
            <li>
              <button className="flex items-center px-4 py-3 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors whitespace-nowrap">
                <Users className="w-5 h-5 mr-3" />
                Customers
              </button>
            </li>
            <li>
              <button className="flex items-center px-4 py-3 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors whitespace-nowrap">
                <Settings className="w-5 h-5 mr-3" />
                Settings
              </button>
            </li>
          </ul>
        </nav>
      </aside>
      <main className="md:ml-64 p-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h5 className="text-gray-500 text-sm font-medium mb-2">
              Total Products
            </h5>
            <p className="text-3xl font-bold text-gray-800">50</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h5 className="text-gray-500 text-sm font-medium mb-2">
              Total Sales
            </h5>
            <p className="text-3xl font-bold text-gray-800">120</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h5 className="text-gray-500 text-sm font-medium mb-2">
              Total Purchases
            </h5>
            <p className="text-3xl font-bold text-gray-800">75</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-10">
          <div className="bg-white p-6 rounded-lg xs:h-[400px] sm:h-[500px] md:h-[600px] shadow-md mb-10">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              Users Behavior
            </h3>
            <Line
              data={lineData}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                  y: {
                    beginAtZero: true,
                  },
                },
              }}
            />
            <p className="text-sm text-gray-500 sm:mt-4">Updated 3 minutes ago</p>
          </div>
          <div className="bg-white p-6 rounded-lg xs:h-[400px] sm:h-[500px] md:h-[600px] shadow-md  justify-center space-x-[-20px] mb-8">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              Email Statistics
            </h3>

            <Pie
              data={pieData}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                  legend: {
                    position: "top",
                    fullSize: false,
                    align: "center",
                    labels: {
                      boxHeight: "15",
                    },
                  },
                },
                radius: "70%",
              }}
            />
            <p className="text-sm text-gray-500 sm:mt-3">
              Campaign sent 2 days ago
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Dashboard;
