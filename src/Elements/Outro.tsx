import React from 'react';
import MuxLogo from '../Elements/MuxLogo';
import { gradients } from './config';

export const Outro: React.FC = () => {
  return (
    <div className="flex items-center justify-center w-full bg-white px-48">
      <div className="py-72 w-full flex items-center justify-center" style={{ background: gradients.softPink }}>
        <MuxLogo />
      </div>
    </div>
  );
};
