import React from 'react';
import { interpolate, useCurrentFrame } from 'remotion';
import { GRAY } from '../Elements/config';
import { format } from 'date-fns';
import MuxLogo from '../Elements/MuxLogo';

const DateRange = ({ children }: { children: React.ReactNode }) => (
  <div style={{ color: GRAY }} className="text-gray-600 text-5xl tracking-wide">{children}</div>
)

const Title = ({ children }: { children: React.ReactNode }) => (
  <h1 className="text-gray-600 text-5xl ml-20 flex-1 font-sans" style={{ color: GRAY }}>{children}</h1>
)

const Layout = ({ background, title, timeframe, children }: { background: string, title?: string, timeframe?: number[], children: React.ReactNode }) => {
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
        <Title>{title}</Title>

        {timeframe && (
          <DateRange>
            {format(new Date(timeframe[0] * 1000), 'MM/dd')} – {format(new Date(timeframe[1] * 1000), 'MM/dd yyyy')}
          </DateRange>
        )}
      </div>
      <div className="p-20" style={{ background }}>
        {children}
      </div>
    </div>
  );
};

export default Layout;