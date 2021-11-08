import React from 'react';
import { interpolate, useCurrentFrame } from 'remotion';
import { format } from 'date-fns';
import Chrome from '../../node_modules/browser-logos/src/chrome/chrome_256x256.png';
import Firefox from '../../node_modules/browser-logos/src/firefox/firefox_256x256.png';
import Safari from '../../node_modules/browser-logos/src/safari/safari_256x256.png';
import SafariIOS from '../../node_modules/browser-logos/src/safari-ios/safari-ios_256x256.png';
import Edge from '../../node_modules/browser-logos/src/edge/edge_256x256.png';
import Opera from '../../node_modules/browser-logos/src/opera/opera_256x256.png';
import AndroidWebview from '../../node_modules/browser-logos/src/android-webview/android-webview_256x256.png';
import SamsungInternet from '../../node_modules/browser-logos/src/samsung-internet/samsung-internet_256x256.png';
import { Img } from "remotion";

import data from "../data/unique_viewers_by_browser.json"

const DateRange = ({ children }: { children: React.ReactNode }) => (
  <div className="text-gray-600 text-2xl tracking-wide">{children}</div>
)

const LOGO_LOOKUP = {
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

  return (
    <div
      style={{
        fontFamily: 'Helvetica, Arial',
        position: 'absolute',
        bottom: 10,
        width: '100%',
        opacity
      }}
      className="left-0"
    >

      <div className="grid grid-cols-5">
        {data[0].data.map(row => {
          const icon = LOGO_LOOKUP[row.field];
          if (!icon) return;
          return (
            <div key={row.field}>
              <Img src={icon} className="mb-4" />
              <p className="text-2xl">{row.field}</p>
              <p className="text-2xl">{row.value} unique viewers</p>
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
