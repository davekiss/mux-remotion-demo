import { interpolate, Sequence, useCurrentFrame, useVideoConfig } from 'remotion';
import { Logo } from './HelloWorld/Logo';
import { Subtitle } from './HelloWorld/Subtitle';
import { Title } from './HelloWorld/Title';
import { Stats } from './HelloWorld/Stats';

export const HelloWorld: React.FC<{
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
				<Sequence from={0} durationInFrames={videoConfig.durationInFrames}>
					<Logo transitionStart={transitionStart} />
				</Sequence>
				<Sequence from={transitionStart + 10}>
					<Title titleText={titleText} titleColor={titleColor} />
				</Sequence>
				<Sequence from={transitionStart + 50}>
					<Subtitle />
				</Sequence>
				<Sequence from={transitionStart + 60}>
					<Stats />
				</Sequence>
			</div>
		</div>
	);
};
