"use client";
import React from "react";
import { FaUsers, FaDoorOpen, FaDollarSign, FaExchangeAlt, FaPlus, FaDownload, FaSearch } from "react-icons/fa";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";
import { motion } from "framer-motion";

const data = [
  { name: "Jan", revenue: 3000, transactions: 100 },
  { name: "Feb", revenue: 4000, transactions: 120 },
  { name: "Mar", revenue: 3500, transactions: 110 },
  { name: "Apr", revenue: 5000, transactions: 150 },
  { name: "May", revenue: 4500, transactions: 140 },
];

const Dashboard = () => {
  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-extrabold text-gray-900">Dashboard</h1>
        <div className="flex space-x-4">
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-blue-700 transition">
            <FaPlus />
            <span>Add New</span>
          </button>
          <button className="bg-green-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-green-700 transition">
            <FaDownload />
            <span>Export Data</span>
          </button>
        </div>
      </div>

      {/* Statistik Cards dengan Animasi */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {[
          { title: "Total Users", value: "1,200", icon: <FaUsers />, color: "bg-blue-500" },
          { title: "Rooms Available", value: "50", icon: <FaDoorOpen />, color: "bg-indigo-500" },
          { title: "Transactions", value: "320", icon: <FaExchangeAlt />, color: "bg-yellow-500" },
          { title: "Revenue", value: "$12,500", icon: <FaDollarSign />, color: "bg-green-500" },
        ].map((stat, index) => (
          <motion.div
            key={index}
            className={`p-6 rounded-lg shadow-lg flex items-center space-x-4 ${stat.color} text-white`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.2 }}
          >
            <div className="text-4xl">{stat.icon}</div>
            <div>
              <h2 className="text-lg font-semibold">{stat.title}</h2>
              <p className="text-2xl font-bold">{stat.value}</p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Grafik */}
      <div className="bg-white p-6 rounded-lg shadow-lg mb-8">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Revenue & Transactions Over Time</h2>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="revenue" stroke="#82ca9d" strokeWidth={2} />
            <Line type="monotone" dataKey="transactions" stroke="#8884d8" strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Recent Transactions */}
      <motion.div className="bg-white p-6 rounded-lg shadow-lg" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-800">Recent Transactions</h2>
          <div className="flex items-center space-x-2">
            <input
              type="text"
              placeholder="Search..."
              className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-blue-500"
            />
            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-blue-700 transition">
              <FaSearch />
              <span>Search</span>
            </button>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-200 text-gray-800">
                <th className="p-4">User</th>
                <th className="p-4">Room</th>
                <th className="p-4">Amount</th>
                <th className="p-4">Status</th>
                <th className="p-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {[
                { user: "John Doe", room: "Deluxe Room", amount: "$200", status: "Completed", color: "text-green-600" },
                { user: "Jane Smith", room: "Standard Room", amount: "$150", status: "Pending", color: "text-yellow-600" },
                { user: "Mike Johnson", room: "Suite", amount: "$500", status: "Cancelled", color: "text-red-600" },
              ].map((transaction, index) => (
                <motion.tr key={index} className="border-t hover:bg-gray-100" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3, delay: index * 0.1 }}>
                  <td className="p-4">{transaction.user}</td>
                  <td className="p-4">{transaction.room}</td>
                  <td className="p-4">{transaction.amount}</td>
                  <td className={`p-4 font-semibold ${transaction.color}`}>{transaction.status}</td>
                  <td className="p-4 space-x-2">
                    <button className="bg-blue-600 text-white px-3 py-1 rounded-lg hover:bg-blue-700 transition">Edit</button>
                    <button className="bg-red-600 text-white px-3 py-1 rounded-lg hover:bg-red-700 transition">Delete</button>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  );
};

export default Dashboard;
