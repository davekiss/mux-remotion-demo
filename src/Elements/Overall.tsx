import React from 'react';
import { interpolate, useCurrentFrame, useVideoConfig, spring } from 'remotion';
import { formatNumber } from '../utils';
import data from "../data/overall.json";

import Layout from "../components/Layout";
import Play from "../components/icons/Play";

const Stat = ({ children }: { children: React.ReactNode }) => (
  <div className="mb-12 border-t-2 border-mux-pink-darker grid items-start py-4 h-72" style={{ gridTemplateColumns: "800px 500px 450px" }}>{children}</div>
)

const Value = ({ children }: { children: React.ReactNode }) => (
  <div className="font-normal leading-none " style={{ fontSize: `110px` }}>{children}</div>
)

const Label = ({ children }: { children: React.ReactNode }) => (
  <div className="font-normal text-mux-black text-3xl font-sans">{children}</div>
)

const Trend = ({ previousMonthValue, pastMonthValue }: { previousMonthValue: number; pastMonthValue: number; }) => {
  const frame = useCurrentFrame();
  const videoConfig = useVideoConfig();

  const y = spring({
    frame,
    from: 100,
    to: 0,
    fps: videoConfig.fps,
    config: {
      stiffness: 100,
    },
  });

  const delta = Math.abs(((1 - previousMonthValue / pastMonthValue) * 100)).toFixed(1);
  const isTrendingUp = pastMonthValue > previousMonthValue
  const prefix = isTrendingUp ? "+" : "-"

  return (
    <div className="mt-4 text-2xl px-4 py-2 border border-mux-pink-darker font-mono uppercase" style={{ width: "fit-content", transform: `translateY(${y}px)` }}>
      <span className="text-mux-pink-darkest">{prefix}{delta}% from last month</span>
    </div>
  )
}

const getCurrentValue = (spring: number, endValue: number) => Math.ceil(interpolate(spring, [0, 1], [0, endValue], {
  extrapolateRight: "clamp",
}))

export const Overall: React.FC = () => {
  const frame = useCurrentFrame();

  const { fps } = useVideoConfig();
  const driver = spring({
    frame,
    fps,
    config: {
      damping: 60,
      overshootClamping: true
    }
  });

  const totalViews = getCurrentValue(driver, data[0].data.total_views);
  const totalWatchTime = getCurrentValue(driver, data[0].data.total_watch_time);

  return (
    <Layout bodyClass="bg-mux-pink" title="Overall stats" timeframe={data[0].timeframe} >
      <Stat>
        <Value>{formatNumber(totalViews)}</Value>
        <Label>Total views</Label>
        <Trend pastMonthValue={data[0].data.total_views} previousMonthValue={data[1].data.total_views} />
      </Stat>
      <Stat>
        <Value>{formatNumber(Math.floor(totalWatchTime / 10000))}</Value>
        <Label>Minutes watched</Label>
        <Trend pastMonthValue={data[0].data.total_watch_time} previousMonthValue={data[1].data.total_watch_time} />
      </Stat>
    </Layout>
  );
};
