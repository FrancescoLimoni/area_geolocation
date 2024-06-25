"use client";

import React, { useEffect } from "react";
import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import { LatLngBounds, LatLngTuple } from "leaflet";
import { MarkerData } from "@/types/marker_data";
import { Location } from "@/types/location";

interface MapProps {
  markers: MarkerData[];
  zoom?: number;
  focusOn: Location | null;
}

function MapBoundsAdjuster({
  markers,
  focusOn,
}: {
  markers: MarkerData[];
  focusOn?: MarkerData;
}) {
  const map = useMap();

  useEffect(() => {
    if (focusOn != null) {
      const bounds = new LatLngBounds([focusOn.position]);
      map.fitBounds(bounds, { maxZoom: 16 });
      return;
    }

    if (markers.length > 0) {
      const bounds = new LatLngBounds(markers.map((marker) => marker.position));
      map.fitBounds(bounds);
      return;
    }
  }, [markers, map, focusOn]);

  return null;
}

export default function Map({ markers, zoom = 1 }: MapProps) {
  const podovaCoordinate: LatLngTuple = [45.41167841087254, 11.880258666887952];

  return (
    <MapContainer
      center={podovaCoordinate}
      zoom={zoom}
      scrollWheelZoom={false}
      style={{ height: "100%", width: "100%" }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {markers.map((marker, index) => (
        <Marker key={index} position={marker.position} draggable={false}>
          <Popup>{marker.message}</Popup>
        </Marker>
      ))}
      <MapBoundsAdjuster markers={markers} />
    </MapContainer>
  );
}
