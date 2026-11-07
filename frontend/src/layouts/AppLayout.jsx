import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import TopNavbar from './TopNavbar';
import ToastContainer from '../components/ToastContainer';

export default function AppLayout() {
  return (
    <div className="flex h-screen w-screen overflow-hidden bg-[#0B0F19] text-[#F8FAFC]">
      {/* Left Sidebar */}
      <Sidebar />

      {/* Main Content Area */}
      <div className="flex flex-col flex-1 min-w-0 overflow-hidden">
        {/* Top Navbar */}
        <TopNavbar />

        {/* Dynamic Route Content */}
        <main className="flex-1 overflow-y-auto bg-gradient-to-b from-[#0B0F19] via-[#0E1424] to-[#0B0F19] relative">
          <Outlet />
        </main>
      </div>

      {/* Persistent Toast Notifications */}
      <ToastContainer />
    </div>
  );
}
