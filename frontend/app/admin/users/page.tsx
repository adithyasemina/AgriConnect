"use client";

import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { 
  Search, 
  Loader2, 
  ShieldAlert, 
  ShieldCheck, 
  MoreHorizontal,
  User,
  ChevronDown,
  ChevronUp
} from "lucide-react";
import toast from "react-hot-toast";

interface UserData {
  _id: string;
  name: string;
  email: string;
  isAdmin: boolean;
  isBlocked: boolean;
  province?: string;
  district?: string;
}

export default function UsersPage() {
  const [users, setUsers] = useState<UserData[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  
  // State for "See More" toggles
  const [showAllBlocked, setShowAllBlocked] = useState(false);
  const [showAllActive, setShowAllActive] = useState(false);

  const fetchUsers = useCallback(async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;
      const config = { headers: { Authorization: `Bearer ${token}` } };
      const response = await axios.get("http://localhost:5000/users/all", config);
      const filteredUsers = response.data.filter((u: UserData) => !u.isAdmin); 
      setUsers(filteredUsers);
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        toast.error("Failed to fetch user list.");
      }
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const handleBlockToggle = async (id: string) => {
    try {
      const token = localStorage.getItem("token");
      const config = { headers: { Authorization: `Bearer ${token}` } };
      const response = await axios.put(`http://localhost:5000/users/block/${id}`, {}, config);
      toast.success(response.data.message);
      setUsers(prev => prev.map(u => u._id === id ? { ...u, isBlocked: response.data.isBlocked } : u));
    } catch {
      toast.error("Action failed.");
    }
  };

  const filteredList = users.filter(u => 
    u.name?.toLowerCase().includes(searchTerm.toLowerCase()) || 
    u.email?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Split users into two groups
  const blockedUsers = filteredList.filter(u => u.isBlocked);
  const activeUsers = filteredList.filter(u => !u.isBlocked);

  // Helper to render table rows
  const renderTableRows = (data: UserData[], showAll: boolean) => {
    const displayData = showAll ? data : data.slice(0, 5);
    
    return displayData.map((user) => (
      <tr key={user._id} className="hover:bg-slate-50/30 transition-colors">
        <td className="px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center border border-slate-200 text-slate-500">
              <User size={20} />
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-semibold text-slate-900">{user.name}</span>
              <span className="text-xs text-slate-500">@{user.name.toLowerCase().replace(/\s/g, '')}</span>
            </div>
          </div>
        </td>
        <td className="px-6 py-4">
          <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold border ${
            user.isBlocked ? "bg-red-50 text-red-700 border-red-100" : "bg-emerald-50 text-emerald-700 border-emerald-100"
          }`}>
            <span className={`w-1.5 h-1.5 rounded-full ${user.isBlocked ? "bg-red-500" : "bg-emerald-500"}`}></span>
            {user.isBlocked ? "Blocked" : "Active"}
          </span>
        </td>
        <td className="px-6 py-4 text-slate-500 text-sm font-medium">{user.email}</td>
        <td className="px-6 py-4 text-right">
          <div className="flex items-center justify-end gap-2">
            <button 
              onClick={() => handleBlockToggle(user._id)}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-bold transition-all border ${
                user.isBlocked ? "bg-white border-emerald-200 text-emerald-600 hover:bg-emerald-50" : "bg-white border-red-100 text-red-500 hover:bg-red-50"
              }`}
            >
              {user.isBlocked ? <ShieldCheck size={14} /> : <ShieldAlert size={14} />}
              {user.isBlocked ? "Unblock" : "Block"}
            </button>
            <button className="p-1.5 text-slate-400 hover:bg-slate-100 rounded-lg transition-all">
              <MoreHorizontal size={18} />
            </button>
          </div>
        </td>
      </tr>
    ));
  };

  if (loading) {
    return (
      <div className="h-[60vh] flex flex-col justify-center items-center gap-3 text-slate-400 font-medium">
        <Loader2 className="animate-spin text-emerald-500" size={40} />
        <p>Loading system members...</p>
      </div>
    );
  }

  return (
    <div className="space-y-10 max-w-[1600px] mx-auto pb-10">
      
      {/* Header Section with Inline Search */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 px-1">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Team members</h1>
            <span className="px-2.5 py-0.5 rounded-md bg-emerald-100 text-emerald-700 text-xs font-bold">
              {users.length} Total
            </span>
          </div>
          <p className="text-slate-500 text-sm mt-1 font-medium">Manage your team members and their account status.</p>
        </div>

        {/* Search Bar moved to the right of header */}
        <div className="relative w-full lg:w-96 group">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-emerald-500 transition-colors" size={18} />
          <input 
            type="text" 
            placeholder="Search by name or email..." 
            className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl outline-none focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 transition-all text-sm font-medium shadow-sm"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* --- BLOCKED USERS TABLE --- */}
      <section className="space-y-4">
        <div className="flex items-center gap-2 px-1">
          <div className="p-1.5 bg-red-100 rounded-lg text-red-600">
            <ShieldAlert size={18} />
          </div>
          <h2 className="text-lg font-bold text-slate-800">Blocked Accounts</h2>
          <span className="text-slate-400 text-sm font-medium">({blockedUsers.length})</span>
        </div>
        
        <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead className="bg-slate-50/80 border-b border-slate-200 text-xs font-bold text-slate-500 uppercase tracking-widest">
                <tr>
                  <th className="px-6 py-4">Name</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4">Email Address</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {blockedUsers.length > 0 ? (
                  renderTableRows(blockedUsers, showAllBlocked)
                ) : (
                  <tr><td colSpan={4} className="px-6 py-10 text-center text-slate-400 text-sm italic font-medium">No blocked users found.</td></tr>
                )}
              </tbody>
            </table>
          </div>
          {blockedUsers.length > 5 && (
            <button 
              onClick={() => setShowAllBlocked(!showAllBlocked)}
              className="w-full py-3 bg-slate-50/50 hover:bg-slate-50 border-t border-slate-100 flex items-center justify-center gap-2 text-sm font-bold text-slate-600 transition-all"
            >
              {showAllBlocked ? <><ChevronUp size={16}/> Show Less</> : <><ChevronDown size={16}/> See More ({blockedUsers.length - 5} others)</>}
            </button>
          )}
        </div>
      </section>

      {/* --- ACTIVE USERS TABLE --- */}
      <section className="space-y-4">
        <div className="flex items-center gap-2 px-1">
          <div className="p-1.5 bg-emerald-100 rounded-lg text-emerald-600">
            <ShieldCheck size={18} />
          </div>
          <h2 className="text-lg font-bold text-slate-800">Active Accounts</h2>
          <span className="text-slate-400 text-sm font-medium">({activeUsers.length})</span>
        </div>
        
        <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead className="bg-slate-50/80 border-b border-slate-200 text-xs font-bold text-slate-500 uppercase tracking-widest">
                <tr>
                  <th className="px-6 py-4">Name</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4">Email Address</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {activeUsers.length > 0 ? (
                  renderTableRows(activeUsers, showAllActive)
                ) : (
                  <tr><td colSpan={4} className="px-6 py-10 text-center text-slate-400 text-sm italic font-medium">No active users found.</td></tr>
                )}
              </tbody>
            </table>
          </div>
          {activeUsers.length > 5 && (
            <button 
              onClick={() => setShowAllActive(!showAllActive)}
              className="w-full py-3 bg-slate-50/50 hover:bg-slate-50 border-t border-slate-100 flex items-center justify-center gap-2 text-sm font-bold text-slate-600 transition-all"
            >
              {showAllActive ? <><ChevronUp size={16}/> Show Less</> : <><ChevronDown size={16}/> See More ({activeUsers.length - 5} others)</>}
            </button>
          )}
        </div>
      </section>

    </div>
  );
}