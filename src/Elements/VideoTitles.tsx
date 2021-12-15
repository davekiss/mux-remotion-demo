import React from 'react';
import Layout from "../components/Layout";
import Measure from "../components/Measure";

import data from "../data/views_by_title.json";

const Stat = ({ children }: { children: React.ReactNode }) => (
  <div className="flex border-t-2 border-mux-purple pt-5 pb-12 px-4 text-3xl relative">{children}</div>
)

const Value = ({ children }: { children: React.ReactNode }) => (
  <div className="font-normal">{children}</div>
)

const Label = ({ children }: { children: React.ReactNode }) => (
  <div className="text-mux-black flex-1 z-10">{children}</div>
)

const Index = ({ children }: { children: React.ReactNode }) => (
  <div className="text-mux-purple mr-8 z-10">{children}.</div>
)

export const VideoTitles: React.FC = () => {
  const totalDatasetViews = data[0].data.map(d => d.views).reduce((previousValue, currentValue) => previousValue + currentValue);

  return (
    <Layout bodyClass="bg-mux-lavendar" title="Top 10 videos by viewership" timeframe={data[0].timeframe} >
      <div className="grid grid-cols-2 grid-rows-5">
        {data[0].data.map((video_title, i) => (
          <>
            <Stat>
              <Measure index={i} value={(video_title.views / totalDatasetViews) * 100} />
              <Index>{i + 1}</Index>
              <Label>{video_title.field}</Label>
              <Value>{new Intl.NumberFormat().format(video_title.views)}</Value>
            </Stat>
          </>
        ))}
      </div>
    </Layout>
  );
};
