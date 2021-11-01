import React, { useEffect, useState } from 'react'
import { interpolate, useCurrentFrame, continueRender, delayRender, useVideoConfig, spring } from 'remotion';
import { COLOR_1 } from './config';
import { format } from 'date-fns'
import useData, { OverallResponse } from "../hooks/useData"

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
  const [handle] = useState(() => delayRender())

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

  const results = useData<OverallResponse>({
    type: "overall",
  });


  useEffect(() => {
    if (results) {
      continueRender(handle)
    }
  }, [results, handle]);

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
      {results && (
        <>
          <Stat>
            <Value>{formatNumber(results[0].data.total_views)}</Value>
            <Label>total views</Label>
            <Trend pastMonthValue={results[0].data.total_views} previousMonthValue={results[1].data.total_views} />
          </Stat>
          <Stat>
            <Value>{formatNumber(results[0].data.total_watch_time)}</Value>
            <Label>seconds of video watched</Label>
          </Stat>
          <DateRange>
            From {format(new Date(results[0].timeframe[0] * 1000), 'MM/dd/yyyy')} to {format(new Date(results[0].timeframe[1] * 1000), 'MM/dd/yyyy')}
          </DateRange>
        </>
      )}
    </div>
  );
};
