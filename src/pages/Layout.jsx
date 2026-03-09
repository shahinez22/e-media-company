import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header"; // غيّري المسار إذا ملف Header.jsx مش في pages

const Layout = () => {
  return (
    <div className="min-h-screen flex flex-col">
      {/* ✅ Navbar / Header */}
      <Header />

      {/* ✅ هنا يتبدل محتوى الصفحات */}
      <main className="flex-1 p-4">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
