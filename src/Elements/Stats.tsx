import React, { useEffect, useState, useCallback } from 'react'
import { interpolate, useCurrentFrame, continueRender, delayRender } from 'remotion';
import { COLOR_1 } from './config';
import useTimeframes from "../hooks/useTimeframes"
import { format } from 'date-fns'

type OverallViewsResponse = {
  data: { total_watch_time: number; total_views: number; }
  timeframe: number[];
}

type TimeframeRange = "pastMonth" | "previousMonth"

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
  const timeframes = useTimeframes();

  const [data, setData] = useState<OverallViewsResponse | null>(null)
  const [handle] = useState(() => delayRender())

  const getTimeframe = (range: TimeframeRange) => {
    const timeframe = timeframes[range];
    return `timeframe[]=${timeframe[0]}&timeframe[]=${timeframe[1]}`;
  }

  const fetchData = useCallback(async () => {
    const headers = new Headers();
    const username = process.env.MUX_PUBLIC_KEY;
    const password = process.env.MUX_SECRET_KEY;
    headers.set('Authorization', 'Basic ' + btoa(username + ":" + password));

    const response = await fetch(`https://api.mux.com/data/v1/metrics/views/overall?${getTimeframe('pastMonth')}`, { headers })
    const json = await response.json() as OverallViewsResponse
    setData(json)
    continueRender(handle)
  }, [handle])


  useEffect(() => {
    fetchData()
  }, [fetchData]);

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

      {data && (
        <>
          <Stat>
            <Value>{new Intl.NumberFormat().format(data.data.total_views)}</Value>
            <Label>total views</Label>
          </Stat>
          <Stat>
            <Value>{new Intl.NumberFormat().format(data.data.total_watch_time)}</Value>
            <Label>seconds of video watched</Label>
          </Stat>
          <DateRange>
            From {format(new Date(data.timeframe[0] * 1000), 'MM/dd/yyyy')} to {format(new Date(data.timeframe[1] * 1000), 'MM/dd/yyyy')}
          </DateRange>
        </>
      )}
    </div>
  );
};
