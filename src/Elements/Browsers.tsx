import React from 'react';
import { interpolate, useCurrentFrame } from 'remotion';
import { format } from 'date-fns';
import Chrome from '../../node_modules/browser-logos/src/chrome/chrome_256x256.png';
import Firefox from '../../node_modules/browser-logos/src/firefox/firefox_256x256.png';
import Safari from '../../node_modules/browser-logos/src/safari/safari_256x256.png';
import SafariIOS from '../../node_modules/browser-logos/src/safari-ios/safari-ios_256x256.png';
import Edge from '../../node_modules/browser-logos/src/edge/edge_256x256.png';
import Opera from '../../node_modules/browser-logos/src/opera/opera_256x256.png';
import { Img } from "remotion";

import data from "../data/unique_viewers_by_browser.json"

const DateRange = ({ children }: { children: React.ReactNode }) => (
  <div className="text-gray-600 text-2xl tracking-wide">{children}</div>
)

export const Browsers: React.FC = () => {
  const frame = useCurrentFrame();
  const opacity = interpolate(frame, [0, 30], [0, 1]);

  return (
    <div
      style={{
        fontFamily: 'Helvetica, Arial',
        position: 'absolute',
        bottom: 10,
        width: '100%',
        opacity
      }}
      className="left-10"
    >
      <Img src={Chrome} />
      <Img src={Firefox} />
      <Img src={Safari} />
      <Img src={Edge} />
      <Img src={Opera} />
      <Img src={SafariIOS} />

      <DateRange>
        From {format(new Date(data[0].timeframe[0] * 1000), 'MM/dd/yyyy')} to {format(new Date(data[0].timeframe[1] * 1000), 'MM/dd/yyyy')}
      </DateRange>

    </div>
  );
};
