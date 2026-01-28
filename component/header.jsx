import { useState } from "react";
import "../styles/header.css";

export function Header() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="header">
      <div className="search-section">
          <input
            type="text"
            className="search"
            placeholder="..."
          />

          <button className="srch-btn">
            <img src="/icons/search.svg" alt="search" />
          </button>
      </div>

      <div className="nav-icon">
        <button id="notif-btn">
          <img src="/icons/notif.svg" alt="notif" />
        </button>

        <div className="profile-wrapper">
          <button
            id="profile-btn"
            onClick={() => setOpen(!open)}
          >
            <img src="/icons/profile.svg" alt="profile" />
          </button>

          {open && (
            <div className="dropdown">
              <div className="dropdown-item">Profile</div>
              <div className="dropdown-item">Mode</div>
              <div className="dropdown-item">Log Out</div>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
