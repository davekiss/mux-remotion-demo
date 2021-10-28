import React, { useEffect, useState } from 'react'
import { interpolate, useCurrentFrame, continueRender, delayRender } from 'remotion';
import { COLOR_1 } from './config';
import { format } from 'date-fns'
import useData, { OverallResponse } from "../hooks/useData"

const Stat = ({ children }: { children: React.ReactNode }) => (
  <div className="mb-12">{children}</div>
)

const Value = ({ children }: { children: React.ReactNode }) => (
  <div className="font-bold" style={{ fontSize: `120px` }}>{children}</div>
)

const Label = ({ children }: { children: React.ReactNode }) => (
  <div className="font-semibold text-gray-500 text-5xl uppercase">{children}</div>
)

const DateRange = ({ children }: { children: React.ReactNode }) => (
  <div className="text-gray-600 text-2xl tracking-wide">{children}</div>
)

export const Stats: React.FC = () => {
  const frame = useCurrentFrame();
  const opacity = interpolate(frame, [0, 30], [0, 1]);
  const [handle] = useState(() => delayRender())

  const results = useData<OverallResponse>({
    type: "overall",
  });

  useEffect(() => {
    if (results) {
      continueRender(handle)
    }
  }, [results, handle]);

  return (
    <div
      style={{
        fontFamily: 'Helvetica, Arial',
        position: 'absolute',
        bottom: 140,
        width: '100%',
        color: COLOR_1,
        opacity
      }}
      className="left-10"
    >
      {results && (
        <>
          <Stat>
            <Value>{new Intl.NumberFormat().format(results[0].data.total_views)}</Value>
            <Label>total views</Label>
          </Stat>
          <Stat>
            <Value>{new Intl.NumberFormat().format(results[0].data.total_watch_time)}</Value>
            <Label>seconds of video watched</Label>
          </Stat>
          <DateRange>
            From {format(new Date(results[0].timeframe[0] * 1000), 'MM/dd/yyyy')} to {format(new Date(results[0].timeframe[1] * 1000), 'MM/dd/yyyy')}
          </DateRange>
        </>
      )}
    </div>
  );
};
