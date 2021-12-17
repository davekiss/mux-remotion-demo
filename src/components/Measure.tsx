import { useCurrentFrame, useVideoConfig, spring } from 'remotion';

// Passing index allows us to cascade the measurement animation
const Measure = ({ index, value }: { index: number, value: number }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const width = spring({
    frame: frame - 20 - (index * 8), // delay the starting frame of the animation
    from: 0,
    to: value,
    fps,
    config: {
      damping: 60
    }
  });

  return (
    <div className="absolute inset-0 bg-white" style={{ width: `${width}%` }} />
  )
}

export default Measure;