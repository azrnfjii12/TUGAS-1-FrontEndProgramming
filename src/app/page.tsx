"use client";

import React from "react";
import { FaUsers, FaDoorOpen, FaDollarSign, FaExchangeAlt } from "react-icons/fa";

const Dashboard = () => {
  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <h1 className="text-3xl font-extrabold mb-6 text-gray-900">Dashboard</h1>

      {/* Statistik Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { title: "Total Users", value: "1,200", icon: <FaUsers />, color: "text-blue-600" },
          { title: "Rooms Available", value: "50", icon: <FaDoorOpen />, color: "text-indigo-600" },
          { title: "Transactions", value: "320", icon: <FaExchangeAlt />, color: "text-yellow-600" },
          { title: "Revenue", value: "$12,500", icon: <FaDollarSign />, color: "text-green-600" },
        ].map((stat, index) => (
          <div key={index} className="bg-white p-6 rounded-lg shadow-lg flex items-center space-x-4">
            <div className={`text-4xl ${stat.color}`}>{stat.icon}</div>
            <div>
              <h2 className="text-lg font-semibold text-gray-700">{stat.title}</h2>
              <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Transactions */}
      <div className="mt-8 bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Recent Transactions</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-200 text-gray-800">
                <th className="p-4">User</th>
                <th className="p-4">Room</th>
                <th className="p-4">Amount</th>
                <th className="p-4">Status</th>
              </tr>
            </thead>
            <tbody>
              {[
                { user: "John Doe", room: "Deluxe Room", amount: "$200", status: "Completed", color: "text-green-600" },
                { user: "Jane Smith", room: "Standard Room", amount: "$150", status: "Pending", color: "text-yellow-600" },
                { user: "Mike Johnson", room: "Suite", amount: "$500", status: "Cancelled", color: "text-red-600" },
              ].map((transaction, index) => (
                <tr key={index} className="border-t hover:bg-gray-100">
                  <td className="p-4">{transaction.user}</td>
                  <td className="p-4">{transaction.room}</td>
                  <td className="p-4">{transaction.amount}</td>
                  <td className={`p-4 font-semibold ${transaction.color}`}>{transaction.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
