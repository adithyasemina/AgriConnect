"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminDashboard() {
  const router = useRouter();
  const [adminName, setAdminName] = useState("");

  useEffect(() => {
    // LocalStorage එකෙන් user විස්තර ලබා ගැනීම
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const user = JSON.parse(storedUser);
      // Admin කෙනෙක් නෙවෙයි නම් නැවත login එකට යැවීම
      if (!user.isAdmin) {
        router.push("/login");
      } else {
        setAdminName(user.name);
      }
    } else {
      router.push("/login");
    }
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    router.push("/login");
  };

  return (
    <div className="min-h-screen flex bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-green-800 text-white hidden md:block">
        <div className="p-6 text-2xl font-bold border-b border-green-700">
          AgriConnect
        </div>
        <nav className="mt-6">
          <a href="#" className="block py-3 px-6 bg-green-700">Dashboard</a>
          <a href="#" className="block py-3 px-6 hover:bg-green-700 transition">Manage Users</a>
          <a href="#" className="block py-3 px-6 hover:bg-green-700 transition">Orders</a>
          <a href="#" className="block py-3 px-6 hover:bg-green-700 transition">Products</a>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Navbar */}
        <header className="bg-white shadow-sm py-4 px-8 flex justify-between items-center">
          <h2 className="text-xl font-semibold text-gray-800">Admin Dashboard</h2>
          <div className="flex items-center gap-4">
            <span className="text-gray-600 font-medium">Hello, {adminName}!</span>
            <button 
              onClick={handleLogout}
              className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg text-sm transition"
            >
              Logout
            </button>
          </div>
        </header>

        {/* Dashboard Stats */}
        <main className="p-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <p className="text-gray-500 text-sm uppercase font-bold">Total Users</p>
              <h3 className="text-3xl font-bold text-gray-800 mt-2">1,250</h3>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <p className="text-gray-500 text-sm uppercase font-bold">Total Orders</p>
              <h3 className="text-3xl font-bold text-gray-800 mt-2">450</h3>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <p className="text-gray-500 text-sm uppercase font-bold">Revenue</p>
              <h3 className="text-3xl font-bold text-gray-800 mt-2">Rs. 85,000</h3>
            </div>
          </div>

          {/* Recent Activity Section */}
          <div className="mt-10 bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h3 className="text-lg font-bold text-gray-800 mb-4">Recent Activities</h3>
            <div className="space-y-4">
              <p className="text-sm text-gray-600 border-b pb-2">New user registered: **Kamal Silva**</p>
              <p className="text-sm text-gray-600 border-b pb-2">New order received: **#ORD-5542**</p>
              <p className="text-sm text-gray-600 border-b pb-2">Product updated: **Organic Fertilizer**</p>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}