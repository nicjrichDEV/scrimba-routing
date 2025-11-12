import React from "react";
import { Link, NavLink } from "react-router-dom";

export default function Header() {
  return (
    <header>
      <Link className="site-logo" to="/">
        #VanLife
      </Link>
      <nav aria-label="Main navigation">
        <NavLink
          to="/host"
          end
          className={({ isActive }) => (isActive ? "active-link" : "")}
        >
          Host
        </NavLink>
        <NavLink
          to="/about"
          className={({ isActive }) => (isActive ? "active-link" : "")}
        >
          About
        </NavLink>
        <NavLink
          to="/vans"
          className={({ isActive }) => (isActive ? "active-link" : "")}
        >
          Vans
        </NavLink>
      </nav>
    </header>
  );
}
