import  { useEffect, useState } from "react";
import axios from "axios";
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { dashboardStatsApi } from "../services/DashboardApi";

const Dashboard = () => {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await dashboardStatsApi()
        setStats(res.data);
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      }
    };
    fetchStats();
  }, []);

  if (!stats) return <p className="text-center mt-10">Loading Dashboard...</p>;

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];
  const pieData = Object.keys(stats.leadsByStatus).map((status) => ({
    name: status,
    value: stats.leadsByStatus[status],
  }));

  return (
    <div className="p-6">
      {/* Header */}
      <h1 className="text-2xl font-bold mb-6">📊 Dashboard</h1>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white shadow rounded-xl p-4 text-center">
          <h2 className="text-lg font-semibold">Total Customers</h2>
          <p className="text-2xl font-bold text-blue-600">{stats.totalCustomers}</p>
        </div>
        <div className="bg-white shadow rounded-xl p-4 text-center">
          <h2 className="text-lg font-semibold">Total Leads</h2>
          <p className="text-2xl font-bold text-green-600">{stats.totalLeads}</p>
        </div>
        <div className="bg-white shadow rounded-xl p-4 text-center">
          <h2 className="text-lg font-semibold">Total Revenue</h2>
          <p className="text-2xl font-bold text-yellow-600">₹{stats.totalRevenue}</p>
        </div>
        <div className="bg-white shadow rounded-xl p-4 text-center">
          <h2 className="text-lg font-semibold">Converted Leads</h2>
          <p className="text-2xl font-bold text-purple-600">
            {stats.leadsByStatus.Converted || 0}
          </p>
        </div>
      </div>

      {/* Pie Chart */}
      <div className="bg-white shadow rounded-xl p-6 mt-6">
        <h2 className="text-xl font-semibold mb-4">Leads by Status</h2>
        <div className="w-full h-72">
          <ResponsiveContainer>
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                outerRadius={100}
                dataKey="value"
                label
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
