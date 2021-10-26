import { useEffect, useState } from 'react'
import { interpolate, useCurrentFrame, continueRender, delayRender } from 'remotion';
import { COLOR_1 } from './config';

export const Stats: React.FC = () => {
  const frame = useCurrentFrame();

  const [data, setData] = useState(null)
  const [handle] = useState(() => delayRender())

  const fetchData = async () => {
    const headers = new Headers();
    const username = "";
    const password = ""
    headers.set('Authorization', 'Basic ' + btoa(username + ":" + password));

    const response = await fetch('https://api.mux.com/data/v1/metrics/views/insights', { headers })
    const json = await response.json()
    setData(json)

    continueRender(handle)
  }

  useEffect(() => {
    fetchData()
  }, []);

  return (
    <div
      style={{
        fontFamily: 'Helvetica, Arial',
        fontSize: 40,
        textAlign: 'center',
        position: 'absolute',
        bottom: 140,
        width: '100%',
      }}
    >

      <div>
        {data ? (
          <div>This video has data from an API! {JSON.stringify(data)}</div>
        ) : null}
      </div>
    </div>
  );
};





export const MyVideo = () => {

}
