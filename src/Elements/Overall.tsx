import React from 'react';
import { useCurrentFrame, useVideoConfig, spring } from 'remotion';
import { formatNumber, getCurrentValue } from '../utils';
import data from "../data/overall.json";

import Layout from "../components/Layout";
import Trend from "../components/Trend";
import Play from "../components/icons/Play";

const Stat = ({ children }: { children: React.ReactNode }) => (
  <div className="mb-12 border-t-2 border-mux-pink-darker flex items-start justify-between py-5 px-10 h-72">{children}</div>
)

const Value = ({ children }: { children: React.ReactNode }) => (
  <div className="font-normal leading-none mb-4 text-mux-black tracking-tight" style={{ fontSize: `110px` }}>{children}</div>
)

const Label = ({ children }: { children: React.ReactNode }) => (
  <div className="font-normal text-mux-black text-5xl font-sans tracking-tight">{children}</div>
)

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
        <div>
          <Value>{formatNumber(totalViews)}</Value>
          <Label>Total views</Label>
        </div>
        <Trend border color="pink" pastMonthValue={data[0].data.total_views} previousMonthValue={data[1].data.total_views} />
      </Stat>
      <Stat>
        <div>
          <Value>{formatNumber(Math.floor(totalWatchTime / 10000))}</Value>
          <Label>Minutes watched</Label>
        </div>
        <Trend border color="pink" pastMonthValue={data[0].data.total_watch_time} previousMonthValue={data[1].data.total_watch_time} />
      </Stat>
    </Layout>
  );
};
