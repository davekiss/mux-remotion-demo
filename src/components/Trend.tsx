import React from 'react';
import { useCurrentFrame, useVideoConfig, spring } from 'remotion';

const Trend = ({ border = false, color, previousMonthValue, pastMonthValue }: { border: boolean; color: string; previousMonthValue: number; pastMonthValue: number; }) => {
  const frame = useCurrentFrame();
  const videoConfig = useVideoConfig();

  const y = spring({
    frame,
    from: 100,
    to: 0,
    fps: videoConfig.fps,
    config: {
      stiffness: 100,
    },
  });

  const delta = Math.abs(((1 - pastMonthValue / previousMonthValue) * 100)).toFixed(1);
  const isTrendingUp = pastMonthValue > previousMonthValue
  const prefix = isTrendingUp ? "+" : "-"

  return (
    <div className={`mt-4 text-3xl px-4 py-3 rounded-lg ${border ? "border" : ""} border-mux-${color}-darker font-mono uppercase`} style={{ width: "fit-content", transform: `translateY(${y}px)` }}>
      <span className={`text-mux-${color}-darkest`}>{prefix}{delta}% from last month</span>
    </div>
  )
}

export default Trend;