import React, { useState } from 'react';
import { Menu, LogOut, Settings, Bell, Calendar } from 'lucide-react';
import '../../styles/TopNavbar.css';

const TopNavbar = ({ onToggleSidebar }) => {
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);

  const formatDate = (date) => {
    const options = { day: 'numeric', month: 'short', year: 'numeric' };
    return new Date(date).toLocaleDateString('en-GB', options);
  };

  return (
    <div className="top-navbar">
      <div className="navbar-container">
        <div className="navbar-content">
          {/* Left Section */}
          <div className="navbar-left">
            <button
              className="toggle-btn"
              onClick={onToggleSidebar}
            >
              <Menu size={28} />
            </button>
            <h2 className="navbar-title">Dashboard</h2>
          </div>

          {/* Center Section - Date Picker */}
          <div className="navbar-center">
            <Calendar size={20} />
            <div className="date-selector">
              <label htmlFor="date-input">Date:</label>
              <input
                id="date-input"
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="date-input"
              />
            </div>
            <span className="selected-date">{formatDate(selectedDate)}</span>
          </div>

          {/* Right Section */}
          <div className="navbar-right">
            <button
              className="navbar-icon-btn navbar-notification"
            >
              <Bell size={24} />
              <span className="notification-badge">3</span>
            </button>

            <button
              className="navbar-icon-btn"
            >
              <Settings size={24} />
            </button>

            <div className="user-profile">
              <div className="profile-avatar">A</div>
              <div className="profile-info">
                <p className="profile-name">Admin</p>
                <p className="profile-role">Administrator</p>
              </div>
            </div>

            <button className="logout-btn">
              <LogOut size={20} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopNavbar;
