import React from "react";
import { NavLink, Outlet } from "react-router-dom";

export default function HostLayout() {
  return (
    <>
      <nav className="host-nav" aria-label="Host dashboard navigation">
        <NavLink
          to="/host"
          end
          className={({ isActive }) => (isActive ? "active-link" : "")}
        >
          Dashboard
        </NavLink>

        <NavLink
          to="/host/income"
          className={({ isActive }) => (isActive ? "active-link" : "")}
        >
          Income
        </NavLink>

        <NavLink
          to="/host/vans"
          className={({ isActive }) => (isActive ? "active-link" : "")}
        >
          Vans
        </NavLink>

        <NavLink
          to="/host/reviews"
          className={({ isActive }) => (isActive ? "active-link" : "")}
        >
          Reviews
        </NavLink>
      </nav>
      <Outlet />
    </>
  );
}
