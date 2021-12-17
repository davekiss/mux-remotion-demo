import React from "react";
import {
  ComposableMap,
  Geographies,
  Geography
} from "react-simple-maps";

import { interpolateColors } from "remotion";

type StateData = {
  views: number; // number of views in this state
  value: number; // unique viewers in this state
  total_watch_time: number; // seconds watched in this state
  field: string; // State name
}

const geoUrl = "https://cdn.jsdelivr.net/npm/us-atlas@3/states-10m.json";

const MapChart = ({ data }: { data: StateData[] }) => {
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
