import { useEffect, useRef, useState } from "react";
import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  ZoomControl,
  Polyline,
} from "react-leaflet";

import { initialZoomLvl } from "@/config/config";

//!TODO: add a universal handler with toast for env variables in dev mode!!
const openStreetMapUrl = import.meta.env.VITE_REACT_APP_OPENSTREET_MAP_URL;
const attribution = import.meta.env.VITE_REACT_APP_ATTRIBUTION;

const Map = () => {
  const mapRef = useRef();

  return (
    <div className="w-full h-screen relative">
      <MapContainer
        center={[25.612677, 85.158875]}
        zoom={initialZoomLvl}
        zoomControl={false}
        ref={mapRef}
      >
        <TileLayer url={openStreetMapUrl} attribution={attribution} />
        <ZoomControl position="topright" />
      </MapContainer>
    </div>
  );
};

export default Map;
