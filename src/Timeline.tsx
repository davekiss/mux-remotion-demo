import { interpolate, Series, useCurrentFrame, useVideoConfig } from 'remotion';
import { Overall } from './clips/2-Overall';
import { Intro } from './clips/1-Intro';
import { Outro } from './clips/7-Outro';
import { Devices } from './clips/3-Devices';
import { States } from './clips/5-States';
import { VideoTitles } from './clips/4-VideoTitles';
import { Browsers } from './clips/6-Browsers';
import { Audio } from "remotion";
import audio from "./static/audio.mp3";

export const Timeline: React.FC = () => {
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

  return (
    <div style={{ flex: 1, backgroundColor: 'white' }}>
      <div style={{ opacity }}>
        <Series>
          <Series.Sequence name="Intro" durationInFrames={180}>
            <Intro />
          </Series.Sequence>
          <Series.Sequence name="Overall" durationInFrames={180}>
            <Overall />
          </Series.Sequence>
          <Series.Sequence name="Devices" durationInFrames={180}>
            <Devices />
          </Series.Sequence>
          <Series.Sequence name="Top10Titles" durationInFrames={180}>
            <VideoTitles />
          </Series.Sequence>
          <Series.Sequence name="States" durationInFrames={180}>
            <States />
          </Series.Sequence>
          <Series.Sequence name="Browsers" durationInFrames={180}>
            <Browsers />
          </Series.Sequence>
          <Series.Sequence name="Outro" durationInFrames={180}>
            <Outro />
          </Series.Sequence>
        </Series>
      </div>
      <Audio src={audio} />
    </div>
  );
};
