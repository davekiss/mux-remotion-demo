import "./style.css";

import { Composition } from 'remotion';
import { Timeline } from './Timeline';
import { Overall } from './Elements/Overall';
import { Intro } from './Elements/Intro';
import { Outro } from './Elements/Outro';
import { Devices } from './Elements/Devices';
import { Countries } from './Elements/Countries';
import { Browsers } from './Elements/Browsers';
import { VideoTitles } from './Elements/VideoTitles';

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
        defaultProps={{
          titleText: 'Mux Monthly Stats',
          titleColor: 'black',
        }}
      />
      <Composition
        id="Intro"
        component={Intro}
        durationInFrames={180}
        fps={30}
        width={1920}
        height={1080}
      />

      <Composition
        id="Outro"
        component={Outro}
        durationInFrames={180}
        fps={30}
        width={1920}
        height={1080}
      />
      <Composition
        id="Overall"
        component={Overall}
        durationInFrames={180}
        fps={30}
        width={1920}
        height={1080}
      />

      <Composition
        id="Devices"
        component={Devices}
        durationInFrames={180}
        fps={30}
        width={1920}
        height={1080}
      />

      <Composition
        id="Countries"
        component={Countries}
        durationInFrames={180}
        fps={30}
        width={1920}
        height={1080}
      />

      <Composition
        id="Browsers"
        component={Browsers}
        durationInFrames={180}
        fps={30}
        width={1920}
        height={1080}
      />

      <Composition
        id="VideoTitles"
        component={VideoTitles}
        durationInFrames={180}
        fps={30}
        width={1920}
        height={1080}
      />
    </>
  );
};