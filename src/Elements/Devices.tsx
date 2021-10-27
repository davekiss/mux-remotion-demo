import React, { useEffect, useState } from 'react'
import { interpolate, useCurrentFrame, continueRender, delayRender } from 'remotion';
import { COLOR_1 } from './config';
import { format } from 'date-fns'
import useData from "../hooks/useData"

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
  <div className="text-gray-600 text-2xl tracking-wide">{children}</div>
)

export const Devices: React.FC = () => {
  const frame = useCurrentFrame();
  const opacity = interpolate(frame, [0, 30], [0, 1]);
  const [handle] = useState(() => delayRender())

  const { data } = useData({ timeframe: "pastMonth", group_by: "viewer_device_category", limit: 5, order_by: "views" });

  useEffect(() => {
    if (data) {
      continueRender(handle)
    }
  }, [data, handle]);

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
          <div className="grid grid-cols-5">
            {data.data.map(device => (
              <>
                <Stat>
                  <Value>{new Intl.NumberFormat().format(device.views)}</Value>
                  <Label>total views on {device.field}</Label>
                </Stat>
              </>
            ))}
          </div>

          <DateRange>
            From {format(new Date(data.timeframe[0] * 1000), 'MM/dd/yyyy')} to {format(new Date(data.timeframe[1] * 1000), 'MM/dd/yyyy')}
          </DateRange>
        </>
      )}
    </div>
  );
};
