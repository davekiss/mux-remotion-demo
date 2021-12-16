import React from 'react';
import MuxLogo from '../Elements/MuxLogo';
import { gradients } from './config';
import { Video } from "remotion";
import video from "../static/MuxLogo.webm";

export const Outro: React.FC = () => {
  return (
    <div className="flex items-center justify-center w-full bg-white px-48">
      <div className="py-72 w-full flex items-center justify-center">
        <Video
          src={video}
          style={{ height: 1080 / 2, width: 1920 / 2 }}
        />
      </div>
    </div>
  );
};
