import React from 'react';
import { useCurrentFrame, Img, spring, useVideoConfig } from 'remotion';
import Layout from "../components/Layout";

import Chrome from '../../node_modules/browser-logos/src/chrome/chrome_256x256.png';
import Firefox from '../../node_modules/browser-logos/src/firefox/firefox_256x256.png';
import Safari from '../../node_modules/browser-logos/src/safari/safari_256x256.png';
import Edge from '../../node_modules/browser-logos/src/edge/edge_256x256.png';
import Opera from '../../node_modules/browser-logos/src/opera/opera_256x256.png';

import data from "../data/unique_viewers_by_browser.json"
import { formatNumber } from '../utils';

// Passing index allows us to cascade the measurement animation
const Measure = ({ index, value, percentage }: { index: number, value: number, percentage: number }) => {
  const frame = useCurrentFrame();
  const videoConfig = useVideoConfig();

  const m = spring({
    frame: frame - 10 - (index * 3), // delay the starting frame of the animation
    from: 0,
    to: percentage,
    fps: videoConfig.fps
  });

  return (
    <div className="relative w-72 h-72 items-center flex justify-center mb-32">
      <svg className="w-72 h-72 absolute" viewBox="0 0 20 20">
        <circle
          r="5" cx="10" cy="10"
          fill="transparent"
          stroke="white"
          strokeWidth="10"
          strokeDasharray={`calc(${m} * 31.42 / 100) 31.42`}
          transform="rotate(-90) translate(-20)" />
      </svg>
      <div className="z-10 flex flex-col items-center justify-center">
        <span className="font-sans font-normal" style={{ fontSize: "80px" }}>{percentage.toFixed(1)}%</span>
        <span className="font-sans font-normal" style={{ fontSize: "36px" }}>{formatNumber(value)} views</span>
      </div>
    </div>
  )
}

const LOGO_LOOKUP: Record<string, string> = {
  Chrome,
  Safari,
  Opera,
  Edge,
  Firefox,
}

export const Browsers: React.FC = () => {
  const totalDatasetViewers = data[0].data.map(d => d.value).reduce((previousValue, currentValue) => previousValue + currentValue);

  return (
    <Layout bodyClass="bg-mux-blue" title="Top 5 browsers by views" timeframe={data[0].timeframe}>
      <div className="grid grid-cols-5">
        {data[0].data.map((row, i) => {
          const icon = LOGO_LOOKUP[row.field];
          if (!icon) return;
          return (
            <div key={row.field} className={`flex flex-col items-center ${i < 4 ? "border-r-2 border-mux-blue-darker" : ""}`}>
              <Measure index={i} value={row.value} percentage={(row.value / totalDatasetViewers) * 100} />

              <div className="w-32 h-32 bg-white p-5 rounded-lg mb-10">
                <Img src={icon} className="mb-4" />
              </div>

              <p className="text-4xl text-mux-black font-sans mb-16">{row.field}</p>
            </div>
          )
        })}
      </div>
    </Layout>
  );
};
