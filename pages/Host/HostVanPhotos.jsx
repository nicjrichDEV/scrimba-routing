import React from "react";
import { useOutletContext } from "react-router-dom";
import PropTypes from "prop-types";

export default function HostVanPhotos() {
  const { currentVan } = useOutletContext();

  if (!currentVan) {
    return <h2>Loading...</h2>;
  }

  return (
    <img
      src={currentVan.imageUrl}
      alt={`Photo of ${currentVan.name}`}
      className="host-van-detail-image"
    />
  );
}

HostVanPhotos.propTypes = {
  currentVan: PropTypes.shape({
    imageUrl: PropTypes.string,
    name: PropTypes.string,
  }),
};
