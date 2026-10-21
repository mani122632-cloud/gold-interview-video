import React from 'react';
import {
  AbsoluteFill,
  Composition,
  OffthreadVideo,
  registerRoot,
  staticFile,
} from 'remotion';
import { ViraGoldBranding } from './components/ViraGoldBranding';
import { ViraSoundEngine } from './components/ViraSoundEngine';

export interface ViraInterviewPreviewProps {
  enableSound?: boolean;
  masterVolume?: number;
}

export const ViraInterviewPreview: React.FC<
  Record<string, unknown> & ViraInterviewPreviewProps
> = ({ enableSound = true, masterVolume = 0.075 }) => {
  return (
    <AbsoluteFill style={{ backgroundColor: '#000000' }}>
      <OffthreadVideo
        src={staticFile('input.mp4')}
        volume={1}
        muted={false}
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
        }}
      />
      <ViraGoldBranding />
      <ViraSoundEngine
        enableSound={enableSound}
        masterVolume={masterVolume}
      />
    </AbsoluteFill>
  );
};

export const ViraPreviewRoot: React.FC = () => {
  return (
    <Composition
      id="ViraGoldPreview"
      component={ViraInterviewPreview}
      durationInFrames={1175}
      fps={30}
      width={720}
      height={1280}
      defaultProps={{
        enableSound: true,
        masterVolume: 0.075,
      }}
    />
  );
};

registerRoot(ViraPreviewRoot);
