import "./style.css";

import { Composition } from 'remotion';
import { Timeline } from './Timeline';

export const RemotionVideo: React.FC = () => {
  return (
    <>
      <Composition
        id="Timeline"
        component={Timeline}
        durationInFrames={1180}
        fps={30}
        width={1920}
        height={1080}
      />
    </>
  );
};