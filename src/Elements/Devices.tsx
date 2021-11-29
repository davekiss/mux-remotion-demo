import React from 'react'
import { interpolate, useCurrentFrame } from 'remotion';
import { GRAY } from './config';
import { format } from 'date-fns'
import data from "../data/views_by_device.json"
import MuxLogo from './MuxLogo';

const Stat = ({ children }: { children: React.ReactNode }) => (
  <div className="mb-12">{children}</div>
)

const Value = ({ children }: { children: React.ReactNode }) => (
  <div className="font-bold" style={{ fontSize: `60px` }}>{children}</div>
)

const Label = ({ children }: { children: React.ReactNode }) => (
  <div className="font-semibold text-gray-500 text-5xl uppercase">{children}</div>
)

const DateRange = ({ children }: { children: React.ReactNode }) => (
  <div style={{ color: GRAY }} className="text-gray-600 text-5xl tracking-wide">{children}</div>
)

const Title = ({ children }: { children: React.ReactNode }) => (
  <h1 className="text-gray-600 text-5xl ml-20 flex-1" style={{ color: GRAY, fontFamily: "Akkurat,Helvetica Neue,Helvetica,Arial,sans-serif" }}>{children}</h1>
)

export const Devices: React.FC = () => {
  const frame = useCurrentFrame();
  const opacity = interpolate(frame, [0, 30], [0, 1]);

  return (
    <div
      style={{
        opacity,
        gridTemplateRows: "20% 80%"
      }}
      className="absolute inset-0 grid"
    >
      <div className="p-20 flex items-center">
        <MuxLogo />
        <Title>Views by device</Title>

        <DateRange>
          {format(new Date(data[0].timeframe[0] * 1000), 'MM/dd')} – {format(new Date(data[0].timeframe[1] * 1000), 'MM/dd yyyy')}
        </DateRange>
      </div>
      <div className="grid grid-cols-5">
        {data[0].data.map(device => (
          <>
            <Stat>
              <Value>{new Intl.NumberFormat().format(device.views)}</Value>
              <Label>total views on {device.field}</Label>
            </Stat>
          </>
        ))}
      </div>


    </div>
  );
};
