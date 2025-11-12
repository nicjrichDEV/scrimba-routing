import React from "react";
import { Link } from "react-router-dom";
import useFetch from "../../hooks/useFetch";

export default function HostVans() {
  const { data, loading, error } = useFetch("/api/host/vans");

  if (loading) {
    return <div role="status">Loading...</div>;
  }

  if (error) {
    return <div role="alert">Error: {error}</div>;
  }

  const vans = data.vans;
  const hostVansEls = vans.map((van) => (
    <Link
      to={van.id}
      key={van.id}
      className="host-van-link-wrapper"
    >
      <div className="host-van-single">
        <img src={van.imageUrl} alt={`Photo of ${van.name}`} />
        <div className="host-van-info">
          <h3>{van.name}</h3>
          <p>${van.price}/day</p>
        </div>
      </div>
    </Link>
  ));

  return (
    <section>
      <h1 className="host-vans-title">Your listed vans</h1>
      <div className="host-vans-list">
        <section>{hostVansEls}</section>
      </div>
    </section>
  );
}
