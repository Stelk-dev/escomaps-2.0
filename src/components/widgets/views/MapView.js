import React from "react";
import L from "leaflet";
import { MapContainer, TileLayer, Marker, Popup, Circle } from "react-leaflet";

const MapView = ({ latLng, isPositionPublic }) => {
  const icon = L.icon({
    iconUrl:
      "https://firebasestorage.googleapis.com/v0/b/escomaps.appspot.com/o/marker.png?alt=media&token=869b6754-c280-45ed-a6c8-bfad46f9482b",
    iconSize: [32, 34],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    tooltipAnchor: [18, -28],
  });

  return (
    <MapContainer
      id="map"
      center={latLng}
      zoom={17}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />

      {isPositionPublic ? (
        <Marker position={latLng} icon={icon}>
          <Popup>
            <a
              href={`https://www.google.com/maps?q=${latLng[0]},${latLng[1]}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              Apri posizione su navigatore
            </a>
          </Popup>
        </Marker>
      ) : (
        <Circle
          center={latLng}
          radius={100}
          pathOptions={{ color: "red", fillColor: "red", fillOpacity: 0.5 }}
        >
          <Popup>
            <a
              href={`https://www.google.com/maps?q=${latLng[0] + 0.0003},${
                latLng[1] - 0.0003
              }`}
              target="_blank"
              rel="noopener noreferrer"
            >
              Apri posizione su navigatore
            </a>
          </Popup>
        </Circle>
      )}
    </MapContainer>
  );
};

export default MapView;
