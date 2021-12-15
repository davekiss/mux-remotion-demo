import React from 'react';
import Layout from "../components/Layout";
import Measure from "../components/Measure";
import data from "../data/unique_viewers_by_us_state.json";
import { formatNumber } from '../utils';

import MapChart from "../components/MapChart";

export const States: React.FC = () => {
  const totalDatasetValue = data[0].data.slice(0, 5).map(d => d.value).reduce((previousValue, currentValue) => previousValue + currentValue);

  return (
    <Layout bodyClass="bg-mux-yellow" title="Heatmap: top 5 states by overall views" timeframe={data[0].timeframe}>
      <div className="grid" style={{ gridTemplateColumns: "2fr 1fr" }}>
        <MapChart data={data[0].data} />
        <div>
          {data[0].data.slice(0, 5).map((d, i) => {
            return (
              <div className="text-4xl pt-5 pb-20 flex border-t-2 border-mux-yellow-darker relative">
                <Measure index={i} value={(d.value / totalDatasetValue) * 100} />

                <div className="text-mux-yellow-darkest mr-6 z-10">0{i + 1}.</div>
                <div className="flex-1 z-10">{d.field}</div>
                <div className="z-10">{formatNumber(d.value)}</div>
              </div>
            )
          })}
        </div>
      </div>

    </Layout>
  );
};
