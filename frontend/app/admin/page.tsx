"use client";

import React from "react";
import { motion } from "framer-motion";
import { 
  TrendingUp, 
  Users, 
  CheckCircle, 
  Package, 
  Leaf, 
  ArrowUpRight,
  MoreHorizontal,
  Download
} from "lucide-react";

export default function Dashboard() {
  const stats = [
    { name: "Total Farmers", value: "1,354", change: "+16.5%", Icon: Users, color: "text-blue-600", bg: "bg-blue-50" },
    { name: "Active Bookings", value: "40,523", change: "-0.5%", Icon: CheckCircle, color: "text-emerald-600", bg: "bg-emerald-50" },
    { name: "Revenue", value: "$140,854", change: "+5.2%", Icon: TrendingUp, color: "text-amber-600", bg: "bg-amber-50" },
    { name: "Reports Received", value: "56", change: "+12%", Icon: Package, color: "text-purple-600", bg: "bg-purple-50" },
  ];

  const recentActivities = [
    { id: "F-1021", farmer: "Adithya Semina", province: "Western", status: "Completed", date: "Mar 24, 2026" },
    { id: "F-1022", farmer: "Nethuli Himasha", province: "Southern", status: "Pending", date: "Mar 22, 2026" },
    { id: "F-1023", farmer: "Saman Perera", province: "Central", status: "On Progress", date: "Mar 21, 2026" },
  ];

  return (
    <div className="space-y-6 md:space-y-8 max-w-[1600px] mx-auto">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 px-1">
        <div>
          <h1 className="text-2xl font-semibold text-slate-900">Dashboard Overview</h1>
          <p className="text-slate-500 text-sm mt-1 font-medium">Monitor your farming network and system performance.</p>
        </div>
        <div className="flex gap-3 w-full sm:w-auto">
          <button className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-lg text-sm font-semibold text-slate-700 hover:bg-slate-50 transition-all shadow-sm">
            <Download size={18} className="text-slate-500" />
            Export
          </button>
          <button className="flex-1 sm:flex-none bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg text-sm font-semibold shadow-sm transition-all active:scale-95">
            Generate Report
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        {stats.map((stat, index) => (
          <motion.div 
            initial={{ opacity: 0, y: 10 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ delay: index * 0.1 }}
            key={stat.name} 
            className="bg-white p-5 border border-slate-200 rounded-xl shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex justify-between items-start">
              <div className={`p-2.5 rounded-lg ${stat.bg} ${stat.color}`}>
                <stat.Icon size={22} />
              </div>
              <div className={`flex items-center gap-1 text-xs font-bold ${stat.change.startsWith('+') ? "text-emerald-600" : "text-red-600"}`}>
                {stat.change}
                <ArrowUpRight size={14} />
              </div>
            </div>
            <div className="mt-4">
              <p className="text-slate-500 text-xs font-semibold uppercase tracking-wider">{stat.name}</p>
              <h3 className="text-2xl font-bold text-slate-900 mt-1">{stat.value}</h3>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Main Content: Table & Promo */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
        {/* Recent Activity Table */}
        <div className="lg:col-span-2 bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="p-5 border-b border-slate-200 flex justify-between items-center">
            <h2 className="text-lg font-semibold text-slate-900">Recent Farmer Activity</h2>
            <button className="p-1.5 text-slate-400 hover:bg-slate-50 rounded-lg transition-all">
              <MoreHorizontal size={20} />
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 text-slate-500 text-xs font-semibold uppercase tracking-wider">
                  <th className="px-6 py-4">Farmer ID</th>
                  <th className="px-6 py-4">Farmer Name</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {recentActivities.map((activity) => (
                  <tr key={activity.id} className="hover:bg-slate-50/30 transition-colors group">
                    <td className="px-6 py-4 text-sm font-semibold text-slate-900">{activity.id}</td>
                    <td className="px-6 py-4">
                       <div className="text-sm font-medium text-slate-700">{activity.farmer}</div>
                       <div className="text-xs text-slate-400 font-medium">{activity.province} Province</div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold border ${
                        activity.status === 'Completed' ? "bg-emerald-50 text-emerald-700 border-emerald-100" : 
                        activity.status === 'Pending' ? "bg-amber-50 text-amber-700 border-amber-100" : "bg-blue-50 text-blue-700 border-blue-100"
                      }`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${
                           activity.status === 'Completed' ? "bg-emerald-500" : 
                           activity.status === 'Pending' ? "bg-amber-500" : "bg-blue-500"
                        }`}></span>
                        {activity.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-slate-500 text-xs font-semibold">{activity.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="p-4 border-t border-slate-100 bg-slate-50/30">
             <button className="w-full text-sm font-semibold text-emerald-600 hover:text-emerald-700 transition-colors">
                View all activities
             </button>
          </div>
        </div>

        {/* Upgrade Card */}
        <div className="bg-emerald-900 rounded-xl p-8 text-white relative overflow-hidden shadow-xl flex flex-col justify-between min-h-[350px]">
          <div className="relative z-10">
            <div className="w-12 h-12 bg-white/10 backdrop-blur-md rounded-xl flex items-center justify-center mb-6 border border-white/20">
              <Leaf className="text-emerald-300" size={26} />
            </div>
            <h2 className="text-2xl font-bold mb-3 tracking-tight">Upgrade to Pro</h2>
            <p className="text-emerald-100/80 text-sm font-medium mb-8 leading-relaxed">
              Unlock advanced AI disease diagnostics and historical yield trends for all regions.
            </p>
            <button className="w-full bg-white text-emerald-900 px-6 py-3.5 rounded-lg font-bold text-sm shadow-lg hover:bg-emerald-50 transition-all active:scale-[0.98]">
              Try Pro Version
            </button>
          </div>
          {/* Decorative Pattern */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-800/30 rounded-full -mr-16 -mt-16 blur-3xl"></div>
          <Leaf className="absolute -bottom-12 -right-12 text-white/5 rotate-12 pointer-events-none" size={280} />
        </div>
      </div>
    </div>
  );
}