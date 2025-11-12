import React from "react";
import { useParams, Link, Outlet, NavLink } from "react-router-dom";
import useFetch from "../../hooks/useFetch";

export default function HostVanDetail() {
  const { id } = useParams();
  const { data, loading, error } = useFetch(`/api/host/vans/${id}`);

  if (loading) {
    return <div role="status">Loading...</div>;
  }

  if (error) {
    return <div role="alert">Error: {error}</div>;
  }

  const currentVan = data.vans[0];

  return (
    <section>
      <Link to=".." relative="path" className="back-button" aria-label="Back to all vans">
        <span>Back to all vans</span>
      </Link>

      <div className="host-van-detail-layout-container">
        <div className="host-van-detail">
          <img src={currentVan.imageUrl} alt={currentVan.name} />
          <div className="host-van-detail-info-text">
            <span className={`van-type van-type-${currentVan.type}`}>
              {currentVan.type}
            </span>
            <h3>{currentVan.name}</h3>
            <h4>${currentVan.price}/day</h4>
          </div>
        </div>
        <nav
          className="host-van-detail-nav"
          aria-label="Van details navigation"
        >
          <NavLink
            to="."
            end
            className={({ isActive }) => (isActive ? "active-link" : "")}
          >
            Details
          </NavLink>
          <NavLink
            to="pricing"
            className={({ isActive }) => (isActive ? "active-link" : "")}
          >
            Pricing
          </NavLink>
          <NavLink
            to="photos"
            className={({ isActive }) => (isActive ? "active-link" : "")}
          >
            Photos
          </NavLink>
        </nav>
        <Outlet context={{ currentVan }} />
      </div>
    </section>
  );
}
