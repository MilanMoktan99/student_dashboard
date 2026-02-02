import React, { useState, useRef, useEffect, useContext } from "react";
import { Sun, Moon, Menu, X, LogOut, User } from "lucide-react";
import { Link } from "react-router-dom";
import { ThemeContext } from "../context/ThemeContext";
import { AuthContext } from "../context/AuthContext";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const menuRef = useRef(null);

  const { theme, toggleTheme } = useContext(ThemeContext);
  const { user, logout } = useContext(AuthContext);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setOpen(false);
      }
    };

    if (open) document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [open]);

  return (
    <>
      <nav className="navbar">
        {/* Logo */}
        <Link to="/" className="logo">
          Student<span>Dashboard</span>
        </Link>

        {/* Desktop Links */}
        <ul className="nav-links">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/student">Students</Link></li>
          <li><Link to="/about">About</Link></li>
        </ul>

        {/* Actions */}
        <div className="nav-actions">
          {/* Theme Toggle */}
          <button className="icon-btn" onClick={toggleTheme}>
            {theme === "light" ? <Moon size={20} /> : <Sun size={20} />}
          </button>

          {/* AUTH SECTION */}
          {!user ? (
            <Link to="/login">
              <button className="login-btn">Login</button>
            </Link>
          ) : (
            <div className="profile-box">
              {user.photoURL ? (
                <img
                  src={user.photoURL}
                  alt="profile"
                  className="profile-img"
                />
              ): (
                <User size={24} className="profile-icon" />
              )}
              <button className="logout-btn" onClick={logout}>
                <LogOut size={20} />
              </button>
            </div>
          )}

          {/* Mobile Menu */}
          <button className="menu-icon" onClick={() => setOpen(true)}>
            <Menu size={28} />
          </button>
        </div>
      </nav>

      {open && <div className="overlay" />}

      {/* Mobile Menu */}
      <aside className={`mobile-menu ${open ? "open" : ""}`} ref={menuRef}>
        <button className="close-btn" onClick={() => setOpen(false)}>
          <X size={26} />
        </button>

        <ul className="mobile-links">
          <li><Link to="/" onClick={() => setOpen(false)}>Home</Link></li>
          <li><Link to="/student" onClick={() => setOpen(false)}>Students</Link></li>
          <li><Link to="/about" onClick={() => setOpen(false)}>About</Link></li>
        </ul>

        {!user ? (
          <Link to="/login" onClick={() => setOpen(false)}>
            <button className="login-btn mobile-login">Login</button>
          </Link>
        ) : (
          <button className="login-btn mobile-login" onClick={logout}>
            <div className="logout-mobile"><LogOut size={16} /> Logout</div>
          </button>
        )}
      </aside>
    </>
  );
};

export default Navbar;
