import React from 'react';
import { useCurrentFrame, useVideoConfig, spring, interpolate, random } from 'remotion';
import { formatNumber, getCurrentValue } from '../utils';
import data from "../data/overall.json";

import Layout from "../components/Layout";
import Trend from "../components/Trend";
import Play from "../components/icons/Play";

const Stat = ({ children }: { children: React.ReactNode }) => (
  <div className="mb-12 border-t-2 border-mux-pink-darker flex items-start justify-between py-5 px-10 h-72 z-10">{children}</div>
)

const Value = ({ children }: { children: React.ReactNode }) => (
  <div className="font-normal leading-none mb-4 text-mux-black tracking-tight z-10" style={{ fontSize: `140px` }}>{children}</div>
)

const Label = ({ children }: { children: React.ReactNode }) => (
  <div className="font-normal text-mux-black text-lg font-sans tracking-tight">{children}</div>
)

const StyledPlay = ({ x, index }: { x: number; index: number; }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const y = spring({
    frame: frame - (index * 11),
    from: 170,
    to: random(index) * (-500 - -470) + -470,
    fps,
    config: {
      mass: random(index) * (70 - 55) + 55,
      damping: 180,
    }
  });

  const beginFadeIn = 0 + (index * 11)
  const endFadeIn = 40 + (index * 11)
  const beginFadeOut = 45 + (index * 11)
  const endFadeOut = 85 + (index * 11)

  const opacity = interpolate(
    frame,
    [beginFadeIn, endFadeIn, beginFadeOut, endFadeOut],
    [0, 1, 1, 0]
  );

  const rotate = interpolate(frame, [beginFadeIn, endFadeOut], [random(index) * (0.1 - -0.1) + -0.1, random(index + 20) * (0.1 - -0.1) + -0.1])
  const scale = random(index) * (1.1 - 0.75) + 0.75;

  return (
    <div className="absolute right-0 bottom-0 z-0" style={{ transform: `scale(${scale}) translate(${x}px, ${y}px) rotateZ(${rotate}turn)`, opacity }}>
      <Play />
    </div>
  );
}

const PlayBubbles = () => {
  const xVals = [-960, -700, -500, -450, -275, -80, 40]
  const reindex = [6, 4, 1, 7, 2, 5, 3];
  return (
    <>
      {xVals.map((value, index) => <StyledPlay x={value} index={reindex[index]} />)}
    </>
  )
}

export const Overall: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const driver = spring({
    frame,
    fps,
    config: {
      damping: 60,
      mass: 0.4,
      overshootClamping: true
    }
  });

  const totalViews = getCurrentValue(driver, data[0].data.total_views);
  const totalWatchTime = getCurrentValue(driver, data[0].data.total_watch_time);

  return (
    <Layout bodyClass="bg-mux-pink" title="Overall stats" timeframe={data[0].timeframe} >
      <Stat>
        <div>
          <Value>{formatNumber(totalViews)}</Value>
          <Label>Total views</Label>
        </div>
        <Trend border color="pink" pastMonthValue={data[0].data.total_views} previousMonthValue={data[1].data.total_views} />
      </Stat>
      <Stat>
        <div className="z-10">
          <Value>{formatNumber(Math.floor(totalWatchTime / 10000))}</Value>
          <Label>Minutes watched</Label>
        </div>
        <Trend border color="pink" pastMonthValue={data[0].data.total_watch_time} previousMonthValue={data[1].data.total_watch_time} />
      </Stat>

      <PlayBubbles />
    </Layout>
  );
};
