import React from 'react';
import Layout from "../components/Layout";
import Measure from "../components/Measure";
import data from "../data/unique_viewers_by_us_state.json";
import { formatNumber } from '../utils';

import MapChart from "../components/MapChart";

export const States: React.FC = () => {
  const maxDatasetValue = data[0].data.slice(0, 5).sort((a, b) => b.value - a.value)[0].value;

  return (
    <Layout bodyClass="bg-mux-yellow" title="Heatmap: top 5 states by overall views" timeframe={data[0].timeframe}>
      <div className="grid" style={{ gridTemplateColumns: "2fr 1fr" }}>
        <MapChart data={data[0].data} />
        <div>
          {data[0].data.slice(0, 5).map((d, i) => {
            return (
              <div key={d.field} className="text-xl pt-5 pb-12 px-5 flex border-t-2 border-mux-yellow-darker relative">
                <Measure index={i} value={(d.value / maxDatasetValue) * 100} />

                <div className="text-mux-yellow-darkest mr-6 z-10">0{i + 1}.</div>
                <div className="flex-1 z-10 tracking-tight">{d.field}</div>
                <div className="z-10 tracking-tight">{formatNumber(d.value)}</div>
              </div>
            )
          })}
        </div>
      </div>
    </Layout>
  );
};
