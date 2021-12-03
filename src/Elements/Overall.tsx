import React from 'react';
import { interpolate, useCurrentFrame, useVideoConfig, spring } from 'remotion';
import { gradients } from './config';
import { formatNumber } from '../utils';
import data from "../data/overall.json";

import Layout from "../components/Layout";
import TrendingUp from '../components/icons/TrendingUp';
import TrendingDown from '../components/icons/TrendingDown';

const Stat = ({ children }: { children: React.ReactNode }) => (
  <div className="mb-12">{children}</div>
)

const Value = ({ children }: { children: React.ReactNode }) => (
  <div className="font-bold" style={{ fontSize: `120px` }}>{children}</div>
)

const Label = ({ children }: { children: React.ReactNode }) => (
  <div className="font-semibold text-gray-500 text-5xl font-mono">{children}</div>
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

  const delta = ((1 - previousMonthValue / pastMonthValue) * 100).toFixed(1);
  const isTrendingUp = pastMonthValue > previousMonthValue
  const ChartIcon = isTrendingUp ? TrendingUp : TrendingDown

  return (
    <div className={`text-white inline-flex text-3xl px-4 py-2 items-center ${isTrendingUp ? "bg-green-700" : "bg-red-700"}`} style={{ transform: `translateY(${y}px)` }}>
      <ChartIcon /> <span className="ml-4">{delta}% from {formatNumber(previousMonthValue)}</span>
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
    <Layout background={gradients.softPink} title="Overall stats" timeframe={data[0].timeframe} >
      <Stat>
        <Value>{formatNumber(totalViews)}</Value>
        <Label>total views</Label>
        <Trend pastMonthValue={data[0].data.total_views} previousMonthValue={data[1].data.total_views} />
      </Stat>
      <Stat>
        <Value>{formatNumber(totalWatchTime)}</Value>
        <Label>seconds of video watched</Label>
      </Stat>
    </Layout>
  );
};
