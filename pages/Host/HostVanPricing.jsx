import React from "react";
import { useOutletContext } from "react-router-dom";
import PropTypes from "prop-types";

export default function HostVanPricing() {
  const { currentVan } = useOutletContext();

  if (!currentVan) {
    return <h2>Loading...</h2>;
  }

  return (
    <h3 className="host-van-price">
      ${currentVan.price}
      <span>/day</span>
    </h3>
  );
}

HostVanPricing.propTypes = {
  currentVan: PropTypes.shape({
    price: PropTypes.number,
  }),
};
