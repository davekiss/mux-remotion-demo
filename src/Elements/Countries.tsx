import React from 'react';
import { gradients } from './config';
import Layout from "../components/Layout";
import data from "../data/unique_viewers_by_country.json";

import MapChart from "../components/MapChart";

export const Countries: React.FC = () => {
  return (
    <Layout background={gradients.softPink} title="Unique viewers by country" timeframe={data[0].timeframe}>
      <MapChart data={data[0].data} />
    </Layout>
  );
};
