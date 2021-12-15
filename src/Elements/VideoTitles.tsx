import React from 'react';
import Layout from "../components/Layout";

import data from "../data/views_by_title.json";

const Stat = ({ children }: { children: React.ReactNode }) => (
  <div className="flex border-t-2 border-mux-purple py-5 text-3xl">{children}</div>
)

const Value = ({ children }: { children: React.ReactNode }) => (
  <div className="font-normal">{children}</div>
)

const Label = ({ children }: { children: React.ReactNode }) => (
  <div className="text-mux-black flex-1">{children}</div>
)

const Index = ({ children }: { children: React.ReactNode }) => (
  <div className="text-mux-purple mr-8">{children}.</div>
)

export const VideoTitles: React.FC = () => {
  return (
    <Layout bodyClass="bg-mux-lavendar" title="Top 10 videos by viewership" timeframe={data[0].timeframe} >
      <div className="grid grid-cols-2 grid-rows-5 gap-10">
        {data[0].data.map((video_title, i) => (
          <>
            <Stat>
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
