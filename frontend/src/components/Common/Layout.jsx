import React, { useState } from 'react';
import Sidebar from './Sidebar';
import TopNavbar from './TopNavbar';
import '../../styles/Layout.css';

const Layout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="layout-container d-flex">
      <Sidebar isOpen={sidebarOpen} onToggleSidebar={toggleSidebar} />
      <div className={`main-content flex-grow-1 d-flex flex-column ${sidebarOpen ? 'sidebar-open' : 'sidebar-closed'}`}>
        <TopNavbar onToggleSidebar={toggleSidebar} />
        <main className="page-content flex-grow-1 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;
