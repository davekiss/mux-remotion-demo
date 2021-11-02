import React from 'react'
import { interpolate, useCurrentFrame, useVideoConfig, spring } from 'remotion';
import { COLOR_1 } from './config';
import { format } from 'date-fns'
import data from "../data/overall.json"

import TrendingUp from '../components/icons/TrendingUp';
import TrendingDown from '../components/icons/TrendingDown';

const Stat = ({ children }: { children: React.ReactNode }) => (
  <div className="mb-12">{children}</div>
)

const Value = ({ children }: { children: React.ReactNode }) => (
  <div className="font-bold" style={{ fontSize: `120px` }}>{children}</div>
)

const Label = ({ children }: { children: React.ReactNode }) => (
  <div className="font-semibold text-gray-500 text-5xl uppercase">{children}</div>
)

const DateRange = ({ children }: { children: React.ReactNode }) => (
  <div className="text-gray-600 text-2xl tracking-wide">{children}</div>
)

const formatNumber = (i: number) => new Intl.NumberFormat().format(i)

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
    <div className={`text-3xl flex items-center ${isTrendingUp ? "text-green-700" : "text-red-700"}`} style={{ transform: `translateY(${y}px)` }}>
      <ChartIcon /> <span className="ml-4">{delta}% from {formatNumber(previousMonthValue)}</span>
    </div>
  )
}

export const Stats: React.FC = () => {
  const frame = useCurrentFrame();
  const opacity = interpolate(frame, [0, 30], [0, 1]);

  const { fps } = useVideoConfig();
  const driver = spring({
    frame,
    fps,
    config: {
      damping: 40,
      stiffness: 70,
      overshootClamping: true
    }
  });

  const totalViews = Math.ceil(interpolate(driver, [0, 1], [0, data[0].data.total_views], {
    extrapolateRight: "clamp",
  }))

  const totalWatchTime = Math.ceil(interpolate(driver, [0, 1], [0, data[0].data.total_watch_time], {
    extrapolateRight: "clamp",
  }))

  return (
    <div
      style={{
        fontFamily: 'Helvetica, Arial',
        position: 'absolute',
        bottom: 140,
        width: '100%',
        color: COLOR_1,
        opacity
      }}
      className="left-10"
    >
      <Stat>
        <Value>{formatNumber(totalViews)}</Value>
        <Label>total views</Label>
        <Trend pastMonthValue={data[0].data.total_views} previousMonthValue={data[1].data.total_views} />
      </Stat>
      <Stat>
        <Value>{formatNumber(totalWatchTime)}</Value>
        <Label>seconds of video watched</Label>
      </Stat>
      <DateRange>
        From {format(new Date(data[0].timeframe[0] * 1000), 'MM/dd/yyyy')} to {format(new Date(data[0].timeframe[1] * 1000), 'MM/dd/yyyy')}
      </DateRange>
    </div>
  );
};
