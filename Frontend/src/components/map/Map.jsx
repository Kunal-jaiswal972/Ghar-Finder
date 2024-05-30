import { useEffect, useRef, useState } from "react";
import { MapContainer, TileLayer, ZoomControl } from "react-leaflet";

import { initialZoomLvl } from "@/config/config";
import Pin from "@/components/map/Pin";
import { cn } from "@/lib/utils";

//!TODO: add a universal handler with toast for env variables in dev mode!!
const openStreetMapUrl = import.meta.env.VITE_REACT_APP_OPENSTREET_MAP_URL;
const attribution = import.meta.env.VITE_REACT_APP_ATTRIBUTION;

const Map = ({ data, height }) => {
  const mapRef = useRef();

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

        <ZoomControl position="topright" />
      </MapContainer>
    </div>
  );
};

export default Map;
