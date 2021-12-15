import React from 'react';
import Layout from "../components/Layout";
import { format } from 'date-fns';

import data from "../data/views_by_title.json";

export const Intro: React.FC = () => {
  const { timeframe } = data[0];
  return (
    <Layout background="white">
      <div className="border-b border-mux-gray my-20">
        <h1 className="text-mux-black leading-none" style={{ fontSize: "100px" }}>Video stats overview</h1>
        <h2 className="text-mux-gray mb-48" style={{ fontSize: "100px" }}>
          {format(new Date(timeframe[0] * 1000), 'MM/dd')} – {format(new Date(timeframe[1] * 1000), 'MM/dd, yyyy')}
        </h2>
      </div>
      <div>
        <h2 className="font-mono text-mux-gray uppercase text-2xl my-16">Powered by Mux Data</h2>
        <div className="grid grid-cols-5 h-4">
          <div className="bg-mux-pink" />
          <div className="bg-mux-green" />
          <div className="bg-mux-blue" />
          <div className="bg-mux-lavendar" />
          <div className="bg-mux-yellow" />
        </div>
      </div>
    </Layout>
  );
};
