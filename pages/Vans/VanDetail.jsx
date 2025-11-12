import React from "react";
import { useParams, Link } from "react-router-dom";
import useFetch from "../../hooks/useFetch";

export default function VanDetail() {
  const { id } = useParams();
  const { data, loading, error } = useFetch(`/api/vans/${id}`);

  if (loading) {
    return <div role="status">Loading...</div>;
  }

  if (error) {
    return <div role="alert">Error: {error}</div>;
  }

  const van = data.van;

  return (
    <div className="van-detail-container">
      <div className="van-detail">
        <Link to=".." relative="path" className="back-button" aria-label="Back to all vans">
          <span>Back to all vans</span>
        </Link>
        <img src={van.imageUrl} alt={van.name} />
        <span className={`van-type ${van.type} selected`}>{van.type}</span>
        <h2>{van.name}</h2>
        <p className="van-price">
          <span>${van.price}</span>/day
        </p>
        <p>{van.description}</p>
        <button className="link-button">Rent this van</button>
      </div>
    </div>
  );
}
