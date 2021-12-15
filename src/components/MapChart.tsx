import React from "react";
import {
  ComposableMap,
  Geographies,
  Geography,
  Sphere,
  Graticule
} from "react-simple-maps";

import { interpolateColors, useCurrentFrame } from "remotion";

type StateData = {
  views: number; // number of views in this state
  value: number; // unique viewers in this state
  total_watch_time: number; // seconds watched in this state
  field: string; // State name
}

const geoUrl = "https://cdn.jsdelivr.net/npm/us-atlas@3/states-10m.json";

const MapChart = ({ data }: { data: StateData[] }) => {
  const minUniqueViewers = data.sort((a, b) => a.value - b.value)[0].value;
  const maxUniqueViewers = data.sort((a, b) => b.value - a.value)[0].value;

  // note: you can clamp maxUniqueViewers if your top country is much higher than the rest
  const uniqueViewerRange = [minUniqueViewers, maxUniqueViewers];

  return (
    <ComposableMap
      width={1000}
      height={500}
      projection="geoAlbersUsa"
    >
      {data.length > 0 && (
        <Geographies geography={geoUrl}>
          {({ geographies }) =>
            geographies.map((geo) => {
              // const d = data.find((s) => s.field === geo.properties.name);
              // const val = d?.value || 0;
              // const color = interpolateColors(val, uniqueViewerRange, ["#FFF3C7", "#FB501D"]);

              const d = data.findIndex((s) => s.field === geo.properties.name);
              const val = d + 1 || 50;
              const color = interpolateColors(val, [1, 50], ["#FB501D", "#FFF3C7"]);

              return (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  fill={color}
                  stroke="#FED32F"
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
