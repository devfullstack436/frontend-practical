import { MAP_URL } from "../../constants";
import "../Map/map.scss";

const Map = ({ address, name }) => {
  const { city, country, house, street, zipCode, latitude, longitude } =
    address || {};
  const addr = [house, street, city?.name + zipCode + country?.name];

  return (
    <div className="map-container">
      <h6>Address</h6>
      <p>{addr?.join(" , ")}</p>
      <div>
        <iframe
          className="responsive-iframe"
          title={name}
          width="400"
          height="320"
          style={{ border: "0" }}
          loading="lazy"
          allowFullScreen
          referrerPolicy="no-referrer-when-downgrade"
          src={`https://www.google.com/maps/embed/v1/place?key=${
            process.env.REACT_APP_MAP_API || MAP_URL
          }
    &q=${latitude},${longitude}`}
        />
      </div>
    </div>
  );
};
export default Map;
