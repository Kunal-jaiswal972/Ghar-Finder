import { Link } from "react-router-dom";
import { Marker, Popup } from "react-leaflet";

const Pin = ({ listing }) => {
  return (
    <Marker position={[listing.latitude, listing.longitude]}>
      <Popup>
        <div className="flex items-center gap-2">
          <img src={listing.images[0]} alt={listing.title} />
          <div className="flex flex-col">
            <Link to={`/${listing.id}`}>{listing.title}</Link>
            <b>$ {listing.price}</b>
          </div>
        </div>
      </Popup>
    </Marker>
  );
};

export default Pin;
