import React from 'react';
import Layout from "../components/Layout";
import { format } from 'date-fns';
import { interpolate, useCurrentFrame, Easing } from "remotion";
import data from "../data/views_by_title.json";

export const Intro: React.FC = () => {
  const { timeframe } = data[0];
  const frame = useCurrentFrame();
  const titleOpacity = interpolate(frame, [5, 25], [0, 1]);
  const subtitleOpacity = interpolate(frame, [30, 50], [0, 1]);
  const titleY = interpolate(frame, [5, 25], [50, 0], { extrapolateRight: "clamp", easing: Easing.out(Easing.ease) });
  const subtitleY = interpolate(frame, [30, 50], [50, 0], { extrapolateRight: "clamp", easing: Easing.out(Easing.ease) });

  return (
    <Layout background="white">
      <div className="border-b border-mux-gray mt-20 pb-8">
        <h1 className="text-mux-black leading-none tracking-tight text-3xl" style={{ opacity: titleOpacity, transform: `translateY(${titleY}px)` }}>Video stats overview</h1>
        <h2 className="text-mux-gray mb-48 tracking-tight text-3xl" style={{ opacity: subtitleOpacity, transform: `translateY(${subtitleY}px)` }}>
          {format(new Date(timeframe[0] * 1000), 'MMM. dd')} – {format(new Date(timeframe[1] * 1000), 'MMM. dd, yyyy')}
        </h2>
      </div>
      <div>
        <h2 className="font-mono text-mux-gray uppercase text-base my-14 tracking-widest">Powered by Mux Data</h2>
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
