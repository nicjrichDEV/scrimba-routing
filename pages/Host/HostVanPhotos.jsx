import { useOutletContext } from "react-router-dom";

const HostVanPhotos = () => {
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
};

export default HostVanPhotos;
