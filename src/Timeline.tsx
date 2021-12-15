import { interpolate, Sequence, useCurrentFrame, useVideoConfig } from 'remotion';
import { Title } from './Elements/Title';
import { Overall } from './Elements/Overall';
import { Intro } from './Elements/Intro';
import { Outro } from './Elements/Outro';
import { Devices } from './Elements/Devices';
import { Countries } from './Elements/Countries';
import { VideoTitles } from './Elements/VideoTitles';
import { Browsers } from './Elements/Browsers';

export const Timeline: React.FC<{
  titleText: string;
  titleColor: string;
}> = ({ titleText, titleColor }) => {
  const frame = useCurrentFrame();
  const videoConfig = useVideoConfig();

  const opacity = interpolate(
    frame,
    [videoConfig.durationInFrames - 25, videoConfig.durationInFrames - 15],
    [1, 0],
    {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
    }
  );
  const transitionStart = 25;

  return (
    <div style={{ flex: 1, backgroundColor: 'white' }}>
      <div style={{ opacity }}>
        <Sequence from={0} durationInFrames={125}>
          <Intro />
        </Sequence>
        <Sequence from={transitionStart + 100} durationInFrames={180}>
          <Overall />
        </Sequence>
        <Sequence from={transitionStart + 280} durationInFrames={180}>
          <Devices />
        </Sequence>
        <Sequence from={transitionStart + 460} durationInFrames={180}>
          <VideoTitles />
        </Sequence>
        <Sequence from={transitionStart + 640} durationInFrames={180}>
          <Countries />
        </Sequence>
        <Sequence from={transitionStart + 820} durationInFrames={180}>
          <Browsers />
        </Sequence>
        <Sequence from={transitionStart + 1000} durationInFrames={180}>
          <Outro />
        </Sequence>
      </div>
    </div>
  );
};
