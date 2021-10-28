import { interpolate, Sequence, useCurrentFrame, useVideoConfig } from 'remotion';
import MuxLogo from './Elements/MuxLogo';
import { Title } from './Elements/Title';
import { Stats } from './Elements/Stats';
import { Devices } from './Elements/Devices';
import { Countries } from './Elements/Countries';
import { VideoTitles } from './Elements/VideoTitles';

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
          <div className="flex items-center justify-center w-full">
            <MuxLogo transitionStart={transitionStart} />
          </div>
        </Sequence>
        <Sequence from={transitionStart + 10} durationInFrames={90}>
          <Title titleText={titleText} titleColor={titleColor} />
        </Sequence>
        <Sequence from={transitionStart + 100} durationInFrames={180}>
          <Stats />
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
      </div>
    </div>
  );
};
