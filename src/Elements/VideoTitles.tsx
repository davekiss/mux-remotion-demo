import React from 'react';
import { gradients } from './config';
import Layout from "../components/Layout";

import data from "../data/views_by_title.json";

const Stat = ({ children }: { children: React.ReactNode }) => (
  <div className="mb-12">{children}</div>
)

const Value = ({ children }: { children: React.ReactNode }) => (
  <div className="font-bold" style={{ fontSize: `60px` }}>{children}</div>
)

const Label = ({ children }: { children: React.ReactNode }) => (
  <div className="text-gray-500 text-4xl">{children}</div>
)

export const VideoTitles: React.FC = () => {
  return (
    <Layout background={gradients.bluePurple} title="Top titles" timeframe={data[0].timeframe} >
      <div className="grid grid-cols-5 gap-20">
        {data[0].data.map(video_title => (
          <>
            <Stat>
              <Value>{new Intl.NumberFormat().format(video_title.views)}</Value>
              <Label>{video_title.field}</Label>
            </Stat>
          </>
        ))}
      </div>
    </Layout>
  );
};
