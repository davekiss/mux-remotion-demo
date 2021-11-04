import React from 'react'
import { interpolate, useCurrentFrame } from 'remotion';
import { COLOR_1 } from './config';
import { format } from 'date-fns'
import data from "../data/unique_viewers_by_country.json"

import MapChart from "../components/MapChart"

const DateRange = ({ children }: { children: React.ReactNode }) => (
  <div className="text-gray-600 text-2xl tracking-wide">{children}</div>
)

export const Countries: React.FC = () => {
  const frame = useCurrentFrame();
  const opacity = interpolate(frame, [0, 30], [0, 1]);

  return (
    <div
      style={{
        fontFamily: 'Helvetica, Arial',
        position: 'absolute',
        bottom: 10,
        width: '100%',
        color: COLOR_1,
        opacity
      }}
      className="left-10"
    >
      <MapChart data={data[0].data} />

      <DateRange>
        From {format(new Date(data[0].timeframe[0] * 1000), 'MM/dd/yyyy')} to {format(new Date(data[0].timeframe[1] * 1000), 'MM/dd/yyyy')}
      </DateRange>

    </div>
  );
};
