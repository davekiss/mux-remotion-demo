import React from 'react';
import { interpolate, useCurrentFrame } from 'remotion';
import { GRAY } from '../clips/config';
import { format } from 'date-fns';
import MuxLogo from '../clips/MuxLogo';

const DateRange = ({ children }: { children: React.ReactNode }) => (
  <div className="text-mux-gray text-5xl tracking-tight">{children}</div>
)

const Title = ({ children }: { children: React.ReactNode }) => (
  <h1 className="text-gray-600 text-5xl ml-20 flex-1 font-sans tracking-tight" style={{ color: GRAY }}>{children}</h1>
)

const Layout = ({ background, bodyClass, title, timeframe, children }: { background?: string, bodyClass?: string, title?: string, timeframe?: number[], children: React.ReactNode }) => {
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
            {format(new Date(timeframe[0] * 1000), 'MMM. dd')} – {format(new Date(timeframe[1] * 1000), 'MMM. dd yyyy')}
          </DateRange>
        )}
      </div>
      <div className={`p-20 ${bodyClass}`} style={{ background }}>
        {children}
      </div>
    </div>
  );
};

export default Layout;