import React from 'react';
import {
  AbsoluteFill,
  OffthreadVideo,
  Sequence,
  useCurrentFrame,
  useVideoConfig,
  spring,
  interpolate,
  Easing,
  staticFile,
} from 'remotion';

const fontFamily = '"IRANYekan", "IRANYekanX", "Vazirmatn", Tahoma, sans-serif';

const EditorialCutWrapper: React.FC<{
  durationInFrames: number;
  bg: string;
  children: React.ReactNode;
}> = ({ durationInFrames, bg, children }) => {
  const frame = useCurrentFrame();
  const lastFrame = Math.max(1, durationInFrames - 1);

  const opacity = interpolate(
    frame,
    [0, 5, Math.max(6, lastFrame - 5), lastFrame],
    [0, 1, 1, 0],
    {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
      easing: Easing.bezier(0.33, 1, 0.68, 1),
    }
  );

  const cameraScale = interpolate(frame, [0, lastFrame], [1.03, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <AbsoluteFill
      style={{
        backgroundColor: bg,
        opacity,
        direction: 'rtl',
        fontFamily,
        overflow: 'hidden',
      }}
    >
      <AbsoluteFill
        style={{
          transform: `scale(${cameraScale})`,
          padding: '240px 100px',
          boxSizing: 'border-box',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        {children}
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

const Interlude1CrowdFlow: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const streamShift = interpolate(frame, [0, 59], [140, -180], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const goldPathDraw = interpolate(frame, [6, 38], [900, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.out(Easing.cubic),
  });

  const line1Spring = spring({ frame: frame - 4, fps, config: { damping: 16, stiffness: 120 } });
  const line2Spring = spring({ frame: frame - 18, fps, config: { damping: 15, stiffness: 120 } });
  const lanes = [360, 520, 680, 1240, 1400, 1560];

  return (
    <EditorialCutWrapper durationInFrames={60} bg="#0B0C0E">
      <AbsoluteFill style={{ pointerEvents: 'none' }}>
        {lanes.map((y, index) => {
          const xOffset = streamShift * (index % 2 === 0 ? 1 : 0.7);
          return (
            <svg
              key={y}
              width="1080"
              height="40"
              viewBox="0 0 1080 40"
              style={{
                position: 'absolute',
                top: y,
                left: 0,
                opacity: 0.16,
                transform: `translateX(${xOffset}px)`,
              }}
            >
              <line x1="1200" y1="20" x2="-120" y2="20" stroke="#8A94A6" strokeWidth="2" strokeDasharray="18 28" />
              <polyline points="240,10 222,20 240,30" fill="none" stroke="#8A94A6" strokeWidth="2.5" />
              <polyline points="680,10 662,20 680,30" fill="none" stroke="#8A94A6" strokeWidth="2.5" />
            </svg>
          );
        })}
        <svg width="1080" height="1920" viewBox="0 0 1080 1920" style={{ position: 'absolute', top: 0, left: 0 }}>
          <path
            d="M 960 1120 C 740 1120, 620 960, 140 960"
            fill="none"
            stroke="#D4AF37"
            strokeWidth="5"
            strokeLinecap="round"
            strokeDasharray="900"
            strokeDashoffset={goldPathDraw}
          />
          <polyline
            points="175,938 135,960 175,982"
            fill="none"
            stroke="#D4AF37"
            strokeWidth="5"
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{
              opacity: interpolate(frame, [30, 38], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }),
            }}
          />
        </svg>
      </AbsoluteFill>

      <div style={{ width: '100%', textAlign: 'right', zIndex: 2 }}>
        <div
          style={{
            opacity: line1Spring,
            transform: `translateY(${interpolate(line1Spring, [0, 1], [28, 0])}px)`,
            fontSize: 54,
            fontWeight: 700,
            color: '#A6B0C0',
            lineHeight: 1.55,
            paddingBottom: 8,
          }}
        >
          همه دارن این‌وری میرن
        </div>
        <div
          style={{
            opacity: line2Spring,
            transform: `translateY(${interpolate(line2Spring, [0, 1], [28, 0])}px)`,
            fontSize: 72,
            fontWeight: 900,
            color: '#F5EFE6',
            lineHeight: 1.55,
            paddingBottom: 12,
          }}
        >
          ما هم گفتیم <span style={{ color: '#D4AF37' }}>بریم.</span>
        </div>
      </div>
    </EditorialCutWrapper>
  );
};

const Interlude2VitrineCycle: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const morningEmphasis = interpolate(
    frame,
    [0, 5, 17, 22, 41, 46, 58, 63],
    [0.3, 1, 1, 0.28, 0.28, 1, 1, 0.28],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
  );

  const nightEmphasis = interpolate(
    frame,
    [0, 18, 23, 38, 43, 60, 65, 83],
    [0.28, 0.28, 1, 1, 0.28, 0.28, 1, 1],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
  );

  const dialRotation = interpolate(frame, [0, 83], [0, 360], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.inOut(Easing.cubic),
  });

  const centerScale = spring({ frame, fps, config: { damping: 15, stiffness: 120 } });

  return (
    <EditorialCutWrapper durationInFrames={84} bg="#0A0B0E">
      <AbsoluteFill style={{ flexDirection: 'column' }}>
        <div
          style={{
            flex: 1,
            backgroundColor: '#F3EFE6',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            padding: '120px 100px 60px',
          }}
        >
          <div
            style={{
              opacity: morningEmphasis,
              transform: `scale(${interpolate(morningEmphasis, [0.28, 1], [0.94, 1.02])})`,
              textAlign: 'center',
            }}
          >
            <svg width="120" height="120" viewBox="0 0 120 120" style={{ marginBottom: 20 }}>
              <circle cx="60" cy="26" r="12" fill="none" stroke="#B89028" strokeWidth="3" />
              <path d="M 36 96 L 46 54 L 74 54 L 84 96 Z" fill="none" stroke="#161615" strokeWidth="3" strokeLinejoin="round" />
              <path d="M 47 60 Q 60 78 73 60" fill="none" stroke="#B89028" strokeWidth="3" />
            </svg>
            <div style={{ fontSize: 68, fontWeight: 900, color: '#161615', lineHeight: 1.5, paddingBottom: 8 }}>
              صبح بچین
            </div>
          </div>
        </div>

        <div
          style={{
            flex: 1,
            backgroundColor: '#0A0B0E',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            padding: '60px 100px 120px',
          }}
        >
          <div
            style={{
              opacity: nightEmphasis,
              transform: `scale(${interpolate(nightEmphasis, [0.28, 1], [0.94, 1.02])})`,
              textAlign: 'center',
            }}
          >
            <svg width="120" height="120" viewBox="0 0 120 120" style={{ marginBottom: 20 }}>
              <rect x="32" y="34" width="56" height="56" rx="8" fill="none" stroke="#F3EFE6" strokeWidth="3" />
              <circle cx="60" cy="62" r="12" fill="none" stroke="#D4AF37" strokeWidth="3" />
              <line x1="60" y1="44" x2="60" y2="50" stroke="#D4AF37" strokeWidth="3" />
              <line x1="60" y1="74" x2="60" y2="80" stroke="#D4AF37" strokeWidth="3" />
            </svg>
            <div style={{ fontSize: 68, fontWeight: 900, color: '#F3EFE6', lineHeight: 1.5, paddingBottom: 8 }}>
              شب جمع کن
            </div>
          </div>
        </div>
      </AbsoluteFill>

      <AbsoluteFill style={{ justifyContent: 'center', alignItems: 'center', pointerEvents: 'none' }}>
        <div style={{ width: '100%', height: 2, backgroundColor: 'rgba(212, 175, 55, 0.45)', position: 'absolute' }} />
        <div
          style={{
            width: 124,
            height: 124,
            borderRadius: '50%',
            backgroundColor: '#121318',
            border: '2px solid #D4AF37',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            transform: `scale(${centerScale}) rotate(${dialRotation}deg)`,
          }}
        >
          <svg width="64" height="64" viewBox="0 0 64 64">
            <path d="M 14 32 A 18 18 0 1 1 46 44" fill="none" stroke="#D4AF37" strokeWidth="3.5" strokeLinecap="round" />
            <polyline points="46,35 48,46 37,45" fill="none" stroke="#D4AF37" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      </AbsoluteFill>
    </EditorialCutWrapper>
  );
};

const Interlude3BvlgariLineArt: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const outerStroke = interpolate(frame, [2, 42], [1100, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.out(Easing.cubic),
  });

  const innerLinksOpacity = interpolate(frame, [14, 36], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const textReveal = spring({ frame: frame - 12, fps, config: { damping: 16, stiffness: 110 } });
  const linkAngles = Array.from({ length: 12 }, (_, i) => i * 30);

  return (
    <EditorialCutWrapper durationInFrames={60} bg="#090807">
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', width: '100%' }}>
        <svg width="520" height="520" viewBox="0 0 520 520" style={{ marginBottom: 48 }}>
          <line x1="60" y1="260" x2="460" y2="260" stroke="rgba(212, 175, 55, 0.16)" strokeWidth="1" />
          <line x1="260" y1="60" x2="260" y2="460" stroke="rgba(212, 175, 55, 0.16)" strokeWidth="1" />
          <ellipse
            cx="260"
            cy="260"
            rx="175"
            ry="145"
            fill="none"
            stroke="#D4AF37"
            strokeWidth="3"
            strokeDasharray="1100"
            strokeDashoffset={outerStroke}
          />
          <ellipse
            cx="260"
            cy="260"
            rx="132"
            ry="106"
            fill="none"
            stroke="#C59B27"
            strokeWidth="2"
            strokeDasharray="1100"
            strokeDashoffset={outerStroke}
          />
          <g style={{ opacity: innerLinksOpacity }}>
            {linkAngles.map((deg) => {
              const rad = (deg * Math.PI) / 180;
              return (
                <line
                  key={deg}
                  x1={260 + Math.cos(rad) * 132}
                  y1={260 + Math.sin(rad) * 106}
                  x2={260 + Math.cos(rad) * 175}
                  y2={260 + Math.sin(rad) * 145}
                  stroke="rgba(245, 208, 97, 0.65)"
                  strokeWidth="2"
                />
              );
            })}
            <rect x="418" y="242" width="28" height="36" rx="4" fill="#090807" stroke="#F5D061" strokeWidth="2.5" />
            <line x1="425" y1="260" x2="439" y2="260" stroke="#F5D061" strokeWidth="2.5" />
          </g>
        </svg>

        <div
          style={{
            opacity: textReveal,
            transform: `translateY(${interpolate(textReveal, [0, 1], [20, 0])}px)`,
            textAlign: 'center',
          }}
        >
          <div style={{ fontSize: 30, fontWeight: 500, color: '#9E8C62', lineHeight: 1.5, marginBottom: 8 }}>
            گرون‌ترین هدیه
          </div>
          <div style={{ fontSize: 62, fontWeight: 800, color: '#F5EFE6', lineHeight: 1.55, paddingBottom: 10 }}>
            دستبند بولگاری
          </div>
        </div>
      </div>
    </EditorialCutWrapper>
  );
};

const Interlude4PriceBreakdown: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const stackEnter = spring({ frame: frame - 3, fps, config: { damping: 16, stiffness: 120 } });
  const strikeProgress = interpolate(frame, [26, 48], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.out(Easing.cubic),
  });
  const rawGoldFocus = spring({ frame: frame - 50, fps, config: { damping: 14, stiffness: 110 } });
  const markupOpacity = interpolate(strikeProgress, [0, 1], [1, 0.25]);

  return (
    <EditorialCutWrapper durationInFrames={90} bg="#0C0E12">
      <div style={{ width: '100%', maxWidth: 860 }}>
        <div
          style={{
            opacity: stackEnter * markupOpacity,
            transform: `translateY(${interpolate(stackEnter, [0, 1], [24, 0])}px)`,
            borderBottom: '1px solid rgba(255,255,255,0.12)',
            padding: '28px 12px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            position: 'relative',
          }}
        >
          <span style={{ fontSize: 48, fontWeight: 700, color: '#C9D1D9', lineHeight: 1.5, paddingBottom: 6 }}>
            سود طلافروش
          </span>
          <span style={{ fontSize: 42, fontWeight: 800, color: '#E06C75', lineHeight: 1.5 }}>۰٪</span>
          <div
            style={{
              position: 'absolute',
              right: 0,
              left: 0,
              top: '52%',
              height: 4,
              backgroundColor: '#E06C75',
              transform: `scaleX(${strikeProgress})`,
              transformOrigin: 'right',
            }}
          />
        </div>

        <div
          style={{
            opacity: stackEnter * markupOpacity,
            transform: `translateY(${interpolate(stackEnter, [0, 1], [24, 0])}px)`,
            borderBottom: '1px solid rgba(255,255,255,0.12)',
            padding: '28px 12px',
            marginBottom: 44,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            position: 'relative',
          }}
        >
          <span style={{ fontSize: 48, fontWeight: 700, color: '#C9D1D9', lineHeight: 1.5, paddingBottom: 6 }}>
            اجرت ساخت
          </span>
          <span style={{ fontSize: 42, fontWeight: 800, color: '#E06C75', lineHeight: 1.5 }}>۰٪</span>
          <div
            style={{
              position: 'absolute',
              right: 0,
              left: 0,
              top: '52%',
              height: 4,
              backgroundColor: '#E06C75',
              transform: `scaleX(${strikeProgress})`,
              transformOrigin: 'right',
            }}
          />
        </div>

        <div
          style={{
            opacity: stackEnter,
            transform: `scale(${interpolate(rawGoldFocus, [0, 1], [0.97, 1.03])})`,
            padding: '36px 40px',
            borderRadius: 20,
            border: '2px solid #D4AF37',
            backgroundColor: 'rgba(212, 175, 55, 0.08)',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <span style={{ fontSize: 58, fontWeight: 900, color: '#F5EFE6', lineHeight: 1.55, paddingBottom: 8 }}>
            قیمت طلای آب‌شده
          </span>
          <svg width="52" height="52" viewBox="0 0 52 52">
            <circle cx="26" cy="26" r="22" fill="none" stroke="#D4AF37" strokeWidth="3" />
            <polyline points="16,27 23,34 37,19" fill="none" stroke="#D4AF37" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      </div>
    </EditorialCutWrapper>
  );
};

const Interlude5EditorialEndCard: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const textEnter = spring({ frame: frame - 2, fps, config: { damping: 15, stiffness: 130 } });
  const lineDraw = interpolate(frame, [4, 28], [140, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.out(Easing.cubic),
  });

  return (
    <EditorialCutWrapper durationInFrames={41} bg="#F3EFE6">
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
          width: '100%',
          opacity: textEnter,
          transform: `translateY(${interpolate(textEnter, [0, 1], [24, 0])}px)`,
        }}
      >
        <div style={{ fontSize: 34, fontWeight: 700, color: '#9A7820', lineHeight: 1.5, marginBottom: 12 }}>
          راز ناگفته طلافروش‌ها؟
        </div>
        <div style={{ fontSize: 66, fontWeight: 900, color: '#141413', lineHeight: 1.55, paddingBottom: 12, marginBottom: 28 }}>
          توی کامنت‌ها بگین
        </div>
        <svg width="48" height="150" viewBox="0 0 48 150">
          <line
            x1="24"
            y1="6"
            x2="24"
            y2="132"
            stroke="#141413"
            strokeWidth="3.5"
            strokeLinecap="round"
            strokeDasharray="140"
            strokeDashoffset={lineDraw}
          />
          <polyline points="10,118 24,136 38,118" fill="none" stroke="#B89028" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
    </EditorialCutWrapper>
  );
};

export const GoldInterviewEdit: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: '#000000' }}>
      <OffthreadVideo src={staticFile('input.mp4')} />
      <Sequence from={96} durationInFrames={60}><Interlude1CrowdFlow /></Sequence>
      <Sequence from={375} durationInFrames={84}><Interlude2VitrineCycle /></Sequence>
      <Sequence from={570} durationInFrames={60}><Interlude3BvlgariLineArt /></Sequence>
      <Sequence from={885} durationInFrames={90}><Interlude4PriceBreakdown /></Sequence>
      <Sequence from={1134} durationInFrames={41}><Interlude5EditorialEndCard /></Sequence>
    </AbsoluteFill>
  );
};

