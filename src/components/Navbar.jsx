import React, { useState, useRef, useEffect, useContext } from "react";
import { Sun, Moon, Menu, X } from "lucide-react";
import { Link } from "react-router-dom";
import { ThemeContext } from "../context/ThemeContext";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const menuRef = useRef(null);

  const { theme, toggleTheme } = useContext(ThemeContext);

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setOpen(false);
      }
    };

    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [open]);

  return (
    <>
      <nav className="navbar">
        {/* Logo */}
        <Link to="/" className="logo">
          Student<span>Dashboard</span>
        </Link>

        {/* Desktop Nav Links */}
        <ul className="nav-links">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/student">Students</Link></li>
          <li><Link to="/about">About</Link></li>
        </ul>

        {/* Actions (desktop + mobile) */}
        <div className="nav-actions">
          {/* Theme Toggle */}
          <button className="icon-btn" onClick={toggleTheme} aria-label="Toggle theme">
            {theme === "light" ? <Moon size={20} /> : <Sun size={20} />}
          </button>

          {/* Login (desktop only) */}
          <Link to='/login'><button className="login-btn">Login</button></Link>

          {/* Hamburger (mobile only) */}
          <button
            className="menu-icon"
            onClick={() => setOpen(true)}
            aria-label="Open menu"
          >
            <Menu size={28} color="grey" />
          </button>
        </div>
      </nav>

      {/* Blur Overlay */}
      {open && <div className="overlay" />}

      {/* Mobile Slide Menu */}
      <aside className={`mobile-menu ${open ? "open" : ""}`} ref={menuRef}>
        <button
          className="close-btn"
          onClick={() => setOpen(false)}
          aria-label="Close menu"
        >
          <X size={26} />
        </button>

        <ul className="mobile-links">
          <li><Link to="/" onClick={() => setOpen(false)}>Home</Link></li>
          <li><Link to="/student" onClick={() => setOpen(false)}>Students</Link></li>
          <li><Link to="/about" onClick={() => setOpen(false)}>About</Link></li>
        </ul>

        <Link to='/login' onClick={() => setOpen(false)}><button className="login-btn mobile-login">Login</button></Link>
      </aside>
    </>
  );
};

export default Navbar;
