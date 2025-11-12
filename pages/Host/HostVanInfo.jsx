import React from "react";
import { useOutletContext } from "react-router-dom";
import PropTypes from "prop-types";

export default function HostVanInfo() {
  const { currentVan } = useOutletContext();

  if (!currentVan) {
    return <h2>Loading...</h2>;
  }

  return (
    <section className="host-van-detail-info">
      <h4>
        Name: <span>{currentVan.name}</span>
      </h4>
      <h4>
        Category: <span>{currentVan.type}</span>
      </h4>
      <h4>
        Description: <span>{currentVan.description}</span>
      </h4>
      <h4>
        Visibility: <span>Public</span>
      </h4>
    </section>
  );
}

HostVanInfo.propTypes = {
  currentVan: PropTypes.shape({
    name: PropTypes.string,
    type: PropTypes.string,
    description: PropTypes.string,
    price: PropTypes.number,
    imageUrl: PropTypes.string,
  }),
};
