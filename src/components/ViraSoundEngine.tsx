import React from 'react';
import { Audio, Sequence, useVideoConfig } from 'remotion';

export interface ViraSoundEngineProps {
  enableSound?: boolean;
  enableTick?: boolean;
  enableResonance?: boolean;
  enableSettle?: boolean;
  masterVolume?: number;
}

type SoundEffectType = 'tick' | 'resonance' | 'settle';

interface GeneratedSoundAsset {
  dataUri: string;
  durationSec: number;
}

const BASE64_CHARS =
  'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';

const uint8ArrayToBase64 = (bytes: Uint8Array): string => {
  if (typeof globalThis !== 'undefined' && typeof globalThis.btoa === 'function') {
    let binary = '';
    const chunkSize = 0x8000;
    for (let i = 0; i < bytes.length; i += chunkSize) {
      const subarray = bytes.subarray(i, i + chunkSize);
      binary += String.fromCharCode.apply(null, Array.from(subarray));
    }
    return globalThis.btoa(binary);
  }

  let result = '';
  const len = bytes.length;
  for (let i = 0; i < len; i += 3) {
    const b0 = bytes[i];
    const b1 = i + 1 < len ? bytes[i + 1] : 0;
    const b2 = i + 2 < len ? bytes[i + 2] : 0;
    const triplet = (b0 << 16) | (b1 << 8) | b2;

    result += BASE64_CHARS[(triplet >> 18) & 0x3f];
    result += BASE64_CHARS[(triplet >> 12) & 0x3f];
    result += i + 1 < len ? BASE64_CHARS[(triplet >> 6) & 0x3f] : '=';
    result += i + 2 < len ? BASE64_CHARS[triplet & 0x3f] : '=';
  }
  return result;
};

const generateSubtleWavAsset = (
  type: SoundEffectType,
  sampleRate = 44100
): GeneratedSoundAsset => {
  const durationSec =
    type === 'tick' ? 0.1 : type === 'resonance' ? 1.15 : 0.65;
  const numSamples = Math.floor(sampleRate * durationSec);
  const dataByteLength = numSamples * 2;
  const buffer = new ArrayBuffer(44 + dataByteLength);
  const view = new DataView(buffer);

  const writeAscii = (offset: number, text: string): void => {
    for (let i = 0; i < text.length; i++) {
      view.setUint8(offset + i, text.charCodeAt(i));
    }
  };

  writeAscii(0, 'RIFF');
  view.setUint32(4, 36 + dataByteLength, true);
  writeAscii(8, 'WAVE');
  writeAscii(12, 'fmt ');
  view.setUint32(16, 16, true);
  view.setUint16(20, 1, true);
  view.setUint16(22, 1, true);
  view.setUint32(24, sampleRate, true);
  view.setUint32(28, sampleRate * 2, true);
  view.setUint16(32, 2, true);
  view.setUint16(34, 16, true);
  writeAscii(36, 'data');
  view.setUint32(40, dataByteLength, true);

  const fadeOutSamples = Math.max(1, Math.floor(sampleRate * 0.025));

  for (let i = 0; i < numSamples; i++) {
    const t = i / sampleRate;
    let rawSample = 0;

    if (type === 'tick') {
      const attack = Math.min(1, t / 0.003);
      const decay = Math.exp(-t * 68);
      rawSample =
        (Math.sin(2 * Math.PI * 185 * t) * 0.7 +
          Math.sin(2 * Math.PI * 390 * t) * 0.3) *
        attack *
        decay;
    } else if (type === 'resonance') {
      const attack = Math.min(1, t / 0.085);
      const decay = Math.exp(-t * 3.4);
      rawSample =
        (Math.sin(2 * Math.PI * 220 * t) * 0.6 +
          Math.sin(2 * Math.PI * 330 * t) * 0.28 +
          Math.sin(2 * Math.PI * 440 * t) * 0.12) *
        attack *
        decay;
    } else {
      const attack = Math.min(1, t / 0.055);
      const decay = Math.exp(-t * 5.2);
      const instantaneousPhase = 2 * Math.PI * (175 * t - 28 * t * t);
      rawSample = Math.sin(instantaneousPhase) * attack * decay;
    }

    const remaining = numSamples - 1 - i;
    const tailFade =
      remaining < fadeOutSamples ? remaining / fadeOutSamples : 1;

    const clamped = Math.max(-1, Math.min(1, rawSample * tailFade));
    const pcm16 =
      clamped < 0
        ? Math.round(clamped * 0x8000)
        : Math.round(clamped * 0x7fff);
    view.setInt16(44 + i * 2, pcm16, true);
  }

  const base64Data = uint8ArrayToBase64(new Uint8Array(buffer));
  return {
    dataUri: `data:audio/wav;base64,${base64Data}`,
    durationSec,
  };
};

let cachedSoundBank: Record<SoundEffectType, GeneratedSoundAsset> | null = null;

const getSoundBank = (): Record<SoundEffectType, GeneratedSoundAsset> => {
  if (!cachedSoundBank) {
    cachedSoundBank = {
      tick: generateSubtleWavAsset('tick'),
      resonance: generateSubtleWavAsset('resonance'),
      settle: generateSubtleWavAsset('settle'),
    };
  }
  return cachedSoundBank;
};

export const ViraSoundEngine: React.FC<ViraSoundEngineProps> = ({
  enableSound = true,
  enableTick = true,
  enableResonance = true,
  enableSettle = true,
  masterVolume = 0.075,
}) => {
  const { fps } = useVideoConfig();

  if (!enableSound || masterVolume <= 0) {
    return null;
  }

  const soundBank = getSoundBank();
  const safeMasterVolume = Math.max(0, Math.min(0.25, masterVolume));

  const tick1From = Math.round(12.6 * fps);
  const tick2From = Math.round(13.5 * fps);
  const tickDurationFrames = Math.ceil(soundBank.tick.durationSec * fps) + 2;

  const resonanceFrom = Math.round(19.15 * fps);
  const resonanceDurationFrames =
    Math.ceil(soundBank.resonance.durationSec * fps) + 2;

  const settleFrom = Math.round(36.55 * fps);
  const settleDurationFrames =
    Math.ceil(soundBank.settle.durationSec * fps) + 2;

  return (
    <>
      {enableTick && (
        <>
          <Sequence from={tick1From} durationInFrames={tickDurationFrames}>
            <Audio
              src={soundBank.tick.dataUri}
              volume={safeMasterVolume * 0.7}
            />
          </Sequence>
          <Sequence from={tick2From} durationInFrames={tickDurationFrames}>
            <Audio
              src={soundBank.tick.dataUri}
              volume={safeMasterVolume * 0.7}
            />
          </Sequence>
        </>
      )}

      {enableResonance && (
        <Sequence
          from={resonanceFrom}
          durationInFrames={resonanceDurationFrames}
        >
          <Audio src={soundBank.resonance.dataUri} volume={safeMasterVolume} />
        </Sequence>
      )}

      {enableSettle && (
        <Sequence from={settleFrom} durationInFrames={settleDurationFrames}>
          <Audio
            src={soundBank.settle.dataUri}
            volume={safeMasterVolume * 0.85}
          />
        </Sequence>
      )}
    </>
  );
};
