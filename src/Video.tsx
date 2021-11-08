import "./style.css";

import { Composition } from 'remotion';
import { Timeline } from './Timeline';
import { Title } from './Elements/Title';
import { Overall } from './Elements/Overall';
import { Devices } from './Elements/Devices';
import { Countries } from './Elements/Countries';

export const RemotionVideo: React.FC = () => {
  return (
    <>
      <Composition
        id="Timeline"
        component={Timeline}
        durationInFrames={1000}
        fps={30}
        width={1920}
        height={1080}
        defaultProps={{
          titleText: 'Mux Monthly Stats',
          titleColor: 'black',
        }}
      />

      <Composition
        id="Title"
        component={Title}
        durationInFrames={100}
        fps={30}
        width={1920}
        height={1080}
        defaultProps={{
          titleText: 'Welcome to Remotion',
          titleColor: 'black',
        }}
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
    </>
  );
};