import { useRef } from "react";
import { useLocation } from "react-router-dom";
import { MapContainer, TileLayer, ZoomControl } from "react-leaflet";

import { Maximize } from "lucide-react";
import { initialZoomLvl } from "@/config/config";
import { cn } from "@/lib/utils";

import Pin from "@/components/map/Pin";
import Modal from "@/components/modal/Modal";

import useModal from "@/store/ModalStore";

const openStreetMapUrl = import.meta.env.VITE_REACT_APP_OPENSTREET_MAP_URL;
const attribution = import.meta.env.VITE_REACT_APP_ATTRIBUTION;

const Map = ({ data, height }) => {
  const mapRef = useRef();
  const openModal = useModal((state) => state.openModal);
  const location = useLocation();

  const isListingPage = /^\/listings\/[^/]+$/.test(location.pathname);
  const modalMapHeight = isListingPage ? "h-[500px]" : "h-[500px]";

  return (
    <div className={cn("w-full h-full relative z-10", height)}>
      <MapContainer
        center={
          data.length === 1
            ? [data[0].latitude, data[0].longitude]
            : [51.5074, -0.1278]
        }
        zoom={initialZoomLvl}
        zoomControl={false}
        ref={mapRef}
      >
        <TileLayer url={openStreetMapUrl} attribution={attribution} />

        {data.map((item) => (
          <Pin listing={item} key={item.id} />
        ))}

        <ZoomControl position="bottomright" />
      </MapContainer>

      <Maximize
        className="absolute right-2 top-2 p-1 bg-white rounded-lg cursor-pointer z-[999]"
        onClick={() => openModal("mini-map")}
      />
      <Modal id="mini-map">
        <div
          className={cn("w-full rounded-md overflow-hidden", modalMapHeight)}
        >
          <MapContainer
            center={
              data.length === 1
                ? [data[0].latitude, data[0].longitude]
                : [51.5074, -0.1278]
            }
            zoom={initialZoomLvl}
            zoomControl={false}
            ref={mapRef}
          >
            <TileLayer url={openStreetMapUrl} attribution={attribution} />

            {data.map((item) => (
              <Pin listing={item} key={item.id} />
            ))}

            <ZoomControl position="bottomright" />
          </MapContainer>
        </div>
      </Modal>
    </div>
  );
};

export default Map;
