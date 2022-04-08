import React from "react";
import { useSelector } from "react-redux";
import {
  Map,
  TileLayer,
  GeoJSON,
  Marker,
  CircleMarker,
  Circle,
  Tooltip,
} from "react-leaflet";
import { latLngBounds } from "leaflet";
import "./map.css";
const MapContainer = () => {
  const { geoJSONData } = useSelector((state) => state);
  const defaultBounds = [
    [44.745197, 33.367692],
    [33.862273, 45.209966],
  ];
  return (
    <>
      <Map
        className="simpleMap"
        bounds={
          geoJSONData
            ? latLngBounds([
                [geoJSONData.bbox[1], geoJSONData.bbox[0]],
                [geoJSONData.bbox[3], geoJSONData.bbox[2]],
              ])
            : latLngBounds(defaultBounds)
        }
        boundsOptions={{ padding: [50, 50] }}
        zoom={10}
        key={
          geoJSONData
            ? geoJSONData.features[0].geometry.coordinates[0][1] +
              geoJSONData.features[0].geometry.coordinates[0][0]
            : 0
        }
      >
        <TileLayer
          attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {geoJSONData && (
          <>
            <GeoJSON
              attribution="DeliveryTrack365"
              data={geoJSONData}
              key={Math.random()}
            />
            <Marker
              position={[
                geoJSONData.features[0].geometry.coordinates[0][1],
                geoJSONData.features[0].geometry.coordinates[0][0],
              ]}
            ></Marker>
            <Marker
              position={[
                geoJSONData.features[0].geometry.coordinates[
                  geoJSONData.features[0].geometry.coordinates.length - 1
                ][1],
                geoJSONData.features[0].geometry.coordinates[
                  geoJSONData.features[0].geometry.coordinates.length - 1
                ][0],
              ]}
            ></Marker>
          </>
        )}
      </Map>
    </>
  );
};

export default MapContainer;
