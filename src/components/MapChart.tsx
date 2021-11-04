import React from "react";
import {
  ComposableMap,
  Geographies,
  Geography,
  Sphere,
  Graticule
} from "react-simple-maps";

import { interpolateColors, useCurrentFrame } from "remotion";

type CountryData = {
  views: number; // number of views in this country
  value: number; // unique viewers in this country
  total_watch_time: number; // seconds watched in this country
  field: string; // ISO 2 Country Code
}

const geoUrl =
  "https://raw.githubusercontent.com/zcreativelabs/react-simple-maps/master/topojson-maps/world-110m.json";

const MapChart = ({ data }: { data: CountryData[] }) => {
  const minUniqueViewers = data.sort((a, b) => a.value - b.value)[0].value;
  const maxUniqueViewers = data.sort((a, b) => b.value - a.value)[0].value;

  // note: you can clamp maxUniqueViewers if your top country is much higher than the rest
  const uniqueViewerRange = [minUniqueViewers, maxUniqueViewers];

  return (
    <ComposableMap
      width={1000}
      height={600}
      projectionConfig={{
        rotate: [-10, 0, 0],
        scale: 147
      }}
    >
      <Sphere id="map" fill="transparent" stroke="#f4f4f4" strokeWidth={0.5} />
      <Graticule stroke="#f4f4f4" strokeWidth={0.5} />

      {data.length > 0 && (
        <Geographies geography={geoUrl}>
          {({ geographies }) =>
            geographies.map((geo) => {
              const d = data.find((s) => s.field === geo.properties.ISO_A2);
              const val = d?.value || 0;
              const color = interpolateColors(val, uniqueViewerRange, ["#e8e8e8", "#fb2491"]);

              return (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  fill={color}
                />
              );
            })
          }
        </Geographies>
      )}
    </ComposableMap>
  );
};

export default MapChart;
