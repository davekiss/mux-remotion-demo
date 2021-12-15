import React from 'react';
import { useCurrentFrame, useVideoConfig, spring, interpolate } from 'remotion';
import { gradients } from './config';
import data from "../data/views_by_device.json";
import Layout from "../components/Layout";
import Measure from "../components/Measure";

import Tablet from '../components/icons/Tablet';
import Desktop from '../components/icons/Desktop';
import Tv from '../components/icons/Tv';
import Phone from '../components/icons/Mobile';

const DEVICE_LOOKUP = {
  phone: Phone,
  tv: Tv,
  desktop: Desktop,
  tablet: Tablet
}

const Stat = ({ index, children }: { index: number, children: React.ReactNode }) => {
  const frame = useCurrentFrame();
  const videoConfig = useVideoConfig();

  const offset = spring({
    frame: frame - 10 - (index * 8), // delay the starting frame of the animation
    from: -100,
    to: 0,
    fps: videoConfig.fps,
    config: {
      damping: 60
    }
  });

  const opacity = interpolate(frame, [10 + (index * 8), 20 + (index * 8)], [0, 1]);

  return (
    <div className="flex items-center border-t-2 border-mux-green-darker p-4 relative" style={{ transform: `translateY(${offset}px)`, opacity }}>{children}</div>
  )
}

const Value = ({ children }: { children: React.ReactNode }) => (
  <div className="flex-1 z-10 font-sans" style={{ fontSize: `100px` }}>{children}</div>
)

const Label = ({ children }: { children: React.ReactNode }) => (
  <div className="text-mux-black text-4xl font-sans capitalize">{children}</div>
)

export const Devices: React.FC = () => {
  const totalDatasetViews = data[0].data.map(d => d.views).reduce((previousValue, currentValue) => previousValue + currentValue);

  return (
    <Layout background={gradients.yellowGreen} title="Views by device" timeframe={data[0].timeframe} >
      <div className="grid grid-rows-5">
        {data[0].data.map((device, i) => {
          const Icon = DEVICE_LOOKUP[device.field]

          return (
            <Stat key={device.value} index={i}>
              <div className="z-10 w-20 mr-20">
                <Icon />
              </div>
              <Measure index={i} value={(device.views / totalDatasetViews) * 100} />
              <Value>{new Intl.NumberFormat().format(device.views)}</Value>
              <Label>{device.field}</Label>
            </Stat>
          )
        })}
      </div>
    </Layout>
  );
};
