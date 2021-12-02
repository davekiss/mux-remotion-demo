import React from 'react';
import { interpolate, useCurrentFrame, Img, spring, useVideoConfig } from 'remotion';
import { format } from 'date-fns';
import { gradients } from './config';
import Chrome from '../../node_modules/browser-logos/src/chrome/chrome_256x256.png';
import Firefox from '../../node_modules/browser-logos/src/firefox/firefox_256x256.png';
import Safari from '../../node_modules/browser-logos/src/safari/safari_256x256.png';
import SafariIOS from '../../node_modules/browser-logos/src/safari-ios/safari-ios_256x256.png';
import Edge from '../../node_modules/browser-logos/src/edge/edge_256x256.png';
import Opera from '../../node_modules/browser-logos/src/opera/opera_256x256.png';
import AndroidWebview from '../../node_modules/browser-logos/src/android-webview/android-webview_256x256.png';
import SamsungInternet from '../../node_modules/browser-logos/src/samsung-internet/samsung-internet_256x256.png';

import data from "../data/unique_viewers_by_browser.json"
import { formatNumber } from '../utils';

const DateRange = ({ children }: { children: React.ReactNode }) => (
  <div className="text-gray-600 text-2xl tracking-wide">{children}</div>
)

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
    <div className="relative w-80 h-80 items-center flex justify-center mb-10">
      <svg className="w-80 h-80 absolute" viewBox="0 0 20 20">
        <circle
          r="5" cx="10" cy="10"
          fill="transparent"
          stroke="white"
          strokeWidth="10"
          strokeDasharray={`calc(${m} * 31.42 / 100) 31.42`}
          transform="rotate(-90) translate(-20)" />
        <circle r="9.9" cx="10" cy="10" fill="transparent" stroke="black" strokeWidth=".2" />
      </svg>
      <div className="z-10 flex flex-col items-center justify-center">
        <span className="font-sans font-semibold" style={{ fontSize: "80px" }}>{percentage.toFixed(1)}%</span>
        <span className="font-sans font-normal" style={{ fontSize: "36px" }}>{formatNumber(value)}</span>
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
  "Android Browser": AndroidWebview,
  "Safari Mobile": SafariIOS,
  "Samsung Internet": SamsungInternet,
  "Chrome Mobile": Chrome
}

export const Browsers: React.FC = () => {
  const frame = useCurrentFrame();
  const opacity = interpolate(frame, [0, 30], [0, 1]);
  const totalDatasetViewers = data[0].data.map(d => d.value).reduce((previousValue, currentValue) => previousValue + currentValue);

  return (
    <div
      style={{
        fontFamily: 'Helvetica, Arial',
        position: 'absolute',
        bottom: 10,
        width: '100%',
        opacity,
        background: gradients.blueGreen
      }}
      className="left-0"
    >
      <div className="grid grid-cols-5">
        {data[0].data.map((row, i) => {
          const icon = LOGO_LOOKUP[row.field];
          if (!icon) return;
          return (
            <div key={row.field} className="flex flex-col items-center">
              <Measure index={i} value={row.value} percentage={(row.value / totalDatasetViewers) * 100} />
              {/* <Img src={icon} className="mb-4" /> */}
              <p className="text-2xl font-mono">{row.field}</p>
            </div>
          )
        })}
      </div>

      <DateRange>
        From {format(new Date(data[0].timeframe[0] * 1000), 'MM/dd/yyyy')} to {format(new Date(data[0].timeframe[1] * 1000), 'MM/dd/yyyy')}
      </DateRange>
    </div>
  );
};
