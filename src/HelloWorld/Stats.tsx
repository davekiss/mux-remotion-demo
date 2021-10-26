import { useEffect, useState, useCallback } from 'react'
import { interpolate, useCurrentFrame, continueRender, delayRender } from 'remotion';
import { COLOR_1 } from './config';
import useTimeframes from "../hooks/useTimeframes"

type OverallViewsResponse = {
  data: { total_watch_time: number; total_views: number; }
  timeframe: number[];
}

export const Stats: React.FC = () => {
  const frame = useCurrentFrame();
  const opacity = interpolate(frame, [0, 30], [0, 1]);
  const timeframes = useTimeframes();

  const [data, setData] = useState<OverallViewsResponse | null>(null)
  const [handle] = useState(() => delayRender())

  const fetchData = useCallback(async () => {
    const headers = new Headers();
    const username = process.env.MUX_PUBLIC_KEY;
    const password = process.env.MUX_SECRET_KEY;
    headers.set('Authorization', 'Basic ' + btoa(username + ":" + password));

    const response = await fetch(`https://api.mux.com/data/v1/metrics/views/overall?timeframe[]=${timeframes.pastMonth[0]}&timeframe[]=${timeframes.pastMonth[1]}`, { headers })
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
        fontSize: 90,
        textAlign: 'center',
        position: 'absolute',
        bottom: 140,
        width: '100%',
        color: COLOR_1,
        opacity
      }}
    >

      {data && (
        <>
          <div>{new Intl.NumberFormat().format(data.data.total_views)} total views</div>
          <div>From {new Date(data.timeframe[0] * 1000).toISOString()} to {new Date(data.timeframe[1] * 1000).toISOString()}</div>
        </>
      )}
    </div>
  );
};
