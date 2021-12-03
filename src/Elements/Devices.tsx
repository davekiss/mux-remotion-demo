import React from 'react';
import { useCurrentFrame, useVideoConfig, spring } from 'remotion';
import { gradients } from './config';
import data from "../data/views_by_device.json";
import Layout from "../components/Layout";

const Stat = ({ children }: { children: React.ReactNode }) => (
  <div className="flex items-start border-t border-gray-900 p-4 relative">{children}</div>
)

// Passing index allows us to cascade the measurement animation
const Measure = ({ index, value }: { index: number, value: number }) => {
  const frame = useCurrentFrame();
  const videoConfig = useVideoConfig();

  const width = spring({
    frame: frame - 20 - (index * 8), // delay the starting frame of the animation
    from: 0,
    to: value,
    fps: videoConfig.fps,
    config: {
      damping: 60
    }
  });

  return (
    <div className="absolute inset-0 bg-white" style={{ width: `${width}%` }} />
  )
}

const Value = ({ children }: { children: React.ReactNode }) => (
  <div className="flex-1 z-10 font-sans" style={{ fontSize: `60px` }}>{children}</div>
)

const Label = ({ children }: { children: React.ReactNode }) => (
  <div className="text-gray-500 text-4xl font-mono">{children}</div>
)

export const Devices: React.FC = () => {
  const totalDatasetViews = data[0].data.map(d => d.views).reduce((previousValue, currentValue) => previousValue + currentValue);

  return (
    <Layout background={gradients.yellowGreen} title="Views by device" timeframe={data[0].timeframe} >
      <div className="grid grid-rows-5">
        {data[0].data.map((device, i) => (
          <Stat key={device.value}>
            <Measure index={i} value={(device.views / totalDatasetViews) * 100} />
            <Value>{new Intl.NumberFormat().format(device.views)}</Value>
            <Label>{device.field}</Label>
          </Stat>
        ))}
      </div>
    </Layout>
  );
};
