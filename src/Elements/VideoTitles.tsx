import React from 'react';
import Layout from "../components/Layout";
import Measure from "../components/Measure";
import { formatNumber } from '../utils';

import data from "../data/views_by_title.json";

const Stat = ({ children }: { children: React.ReactNode }) => (
  <div className="flex border-t-2 border-mux-purple pt-5 px-4 text-4xl relative h-36">{children}</div>
)

const Value = ({ children }: { children: React.ReactNode }) => (
  <div className="font-normal z-10 tracking-tight">{children}</div>
)

const Label = ({ children }: { children: React.ReactNode }) => (
  <div className="text-mux-black flex-1 z-10 mr-10 tracking-tight">{children}</div>
)

const Index = ({ children }: { children: React.ReactNode }) => (
  <div className="text-mux-purple mr-8 z-10 w-10">{children}.</div>
)

export const VideoTitles: React.FC = () => {
  // const totalDatasetViews = data[0].data.map(d => d.views).reduce((previousValue, currentValue) => previousValue + currentValue);
  const maxDatasetViews = data[0].data.sort((a, b) => b.views - a.views)[0].views;

  return (
    <Layout bodyClass="bg-mux-lavendar" title="Top 10 videos by viewership" timeframe={data[0].timeframe} >
      <div className="grid grid-cols-2 gap-x-10">
        <div>
          {data[0].data.slice(0, 5).map((video_title, i) => (
            <>
              <Stat>
                <Measure index={i} value={(video_title.views / maxDatasetViews) * 100} />
                <Index>{i + 1}</Index>
                <Label>{video_title.field}</Label>
                <Value>{formatNumber(video_title.views)}</Value>
              </Stat>
            </>
          ))}
        </div>
        <div>
          {data[0].data.slice(5, 10).map((video_title, i) => (
            <>
              <Stat>
                <Measure index={i + 5} value={(video_title.views / maxDatasetViews) * 100} />
                <Index>{i + 6}</Index>
                <Label>{video_title.field}</Label>
                <Value>{formatNumber(video_title.views)}</Value>
              </Stat>
            </>
          ))}
        </div>

      </div>
    </Layout>
  );
};
