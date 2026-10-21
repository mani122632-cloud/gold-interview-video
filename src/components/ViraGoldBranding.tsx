import React from 'react';
import {
  AbsoluteFill,
  Easing,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from 'remotion';

export const VIRA_COLORS = {
  burgundy: '#4B0E1B',
  burgundyDeep: '#2A060E',
  ivory: '#EDE0C6',
  ivorySoft: '#F2E6CE',
  roseBronze: '#B8997E',
  mutedStone: '#A69D93',
} as const;

const FONT_FA =
  "'Peyda', 'PeydaWeb', 'Vazirmatn', 'Yekan Bakh', 'Tahoma', sans-serif";
const FONT_EN = "'Cormorant Garamond', 'Cinzel', Georgia, serif";

const Card: React.FC<{
  children: React.ReactNode;
  style?: React.CSSProperties;
}> = ({ children, style }) => (
  <div
    style={{
      background: `linear-gradient(135deg, ${VIRA_COLORS.burgundy}F5, ${VIRA_COLORS.burgundyDeep}FA)`,
      border: `1px solid ${VIRA_COLORS.ivory}55`,
      borderRadius: '18px 5px 18px 5px',
      padding: '14px 24px',
      boxShadow: '0 14px 34px rgba(0,0,0,0.4)',
      color: VIRA_COLORS.ivory,
      textAlign: 'center',
      ...style,
    }}
  >
    {children}
  </div>
);

const Scene: React.FC<{
  start: number;
  end: number;
  children: React.ReactNode;
  position?: React.CSSProperties;
}> = ({ start, end, children, position }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const from = Math.round(start * fps);
  const to = Math.round(end * fps);

  if (frame < from || frame > to) return null;

  const enter = spring({
    frame: frame - from,
    fps,
    config: { damping: 200, stiffness: 85, mass: 1.15 },
  });

  const exit = interpolate(frame, [to - 14, to], [1, 0], {
    easing: Easing.bezier(0.33, 1, 0.68, 1),
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const opacity = Math.min(1, enter, exit);

  return (
    <div
      style={{
        position: 'absolute',
        opacity,
        filter: `blur(${(1 - opacity) * 4}px)`,
        transform: `translateY(${(1 - opacity) * 14}px)`,
        ...position,
      }}
    >
      {children}
    </div>
  );
};

export const ViraGoldBranding: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const cycle = interpolate(
    frame,
    [Math.round(11.2 * fps), Math.round(12.6 * fps), Math.round(13.4 * fps), Math.round(14.1 * fps)],
    [0, 0, 1, 0],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
  );

  const finalReveal = interpolate(frame, [Math.round(36.4 * fps), Math.round(37.2 * fps)], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <AbsoluteFill style={{ pointerEvents: 'none', direction: 'rtl' }}>
      <Scene start={2.7} end={5.15} position={{ top: '9.5%', left: '6.5%' }}>
        <Card style={{ minWidth: 264, textAlign: 'right' }}>
          <div style={{ fontFamily: FONT_FA, fontSize: 12, color: VIRA_COLORS.roseBronze, marginBottom: 5 }}>
            مسیر ورود به حرفه طلافروشی
          </div>
          <div style={{ fontFamily: FONT_FA, fontSize: 21, fontWeight: 700 }}>
            هم‌مسیر با موج بازار
          </div>
          <div style={{ marginTop: 8, height: 2, background: VIRA_COLORS.ivory, width: '90%' }} />
        </Card>
      </Scene>

      <Scene start={11} end={14.9} position={{ top: '9%', left: '50%', transform: 'translateX(-50%)' }}>
        <Card style={{ borderRadius: 38, display: 'flex', alignItems: 'center', gap: 20, minWidth: 336 }}>
          <span style={{ fontFamily: FONT_FA, fontSize: 19, fontWeight: 700, opacity: 1 - cycle * 0.55 }}>
            صبح بچین
          </span>
          <span style={{ color: VIRA_COLORS.roseBronze }}>⟷</span>
          <span style={{ fontFamily: FONT_FA, fontSize: 19, fontWeight: 700, opacity: 0.45 + cycle * 0.55 }}>
            شب جمع کن
          </span>
        </Card>
      </Scene>

      <Scene start={18.6} end={21.15} position={{ top: '9%', left: '6.5%' }}>
        <Card style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <svg width="116" height="74" viewBox="0 0 180 116" fill="none">
            <defs>
              <linearGradient id="viraCuffGold" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#8C6B48" />
                <stop offset="35%" stopColor="#F2E6CE" />
                <stop offset="65%" stopColor="#B8997E" />
                <stop offset="100%" stopColor="#6E5032" />
              </linearGradient>
            </defs>
            <ellipse cx="90" cy="52" rx="66" ry="25" fill="#2A060E" stroke="url(#viraCuffGold)" strokeWidth="8" />
            <path d="M24 52 C24 82 156 82 156 52 L156 67 C156 98 24 98 24 67 Z" fill="url(#viraCuffGold)" />
            <ellipse cx="90" cy="52" rx="66" ry="25" stroke="#EDE0C6" strokeWidth="2" />
          </svg>
          <div>
            <div style={{ direction: 'ltr', fontFamily: FONT_EN, fontSize: 11, letterSpacing: '0.15em', color: VIRA_COLORS.roseBronze }}>
              CONCEPTUAL HIGH JEWELRY
            </div>
            <div style={{ fontFamily: FONT_FA, fontSize: 23, fontWeight: 700, marginTop: 4 }}>
              دستبند بولگاری
            </div>
            <div style={{ fontFamily: FONT_FA, fontSize: 12, color: VIRA_COLORS.mutedStone }}>
              تصویر مفهومی هدیه لوکس طلا
            </div>
          </div>
        </Card>
      </Scene>

      <Scene start={28.6} end={32.25} position={{ top: '9%', left: '50%', transform: 'translateX(-50%)' }}>
        <Card style={{ minWidth: 316, minHeight: 62, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <div style={{ fontFamily: FONT_FA, fontSize: 20, fontWeight: 700 }}>
            {frame < Math.round(31.4 * fps) ? 'فروش طلا بدون سود و اجرت' : 'محاسبه روی قیمت آبشده'}
          </div>
        </Card>
      </Scene>

      <Scene start={36.4} end={39.05} position={{ top: '36.5%', left: '6.5%' }}>
        <Card style={{ minWidth: 208, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <svg width="128" height="72" viewBox="0 0 260 145" fill="none" style={{ opacity: finalReveal }}>
            <defs>
              <linearGradient id="viraLogoGold" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#F2E6CE" />
                <stop offset="65%" stopColor="#EDE0C6" />
                <stop offset="100%" stopColor="#B8997E" />
              </linearGradient>
            </defs>
            <path d="M118 22 C162 34 205 49 236 62 L222 68 C192 54 156 39 118 22Z" fill="url(#viraLogoGold)" />
            <path d="M236 62 C188 86 126 96 86 76 C68 67 56 50 52 34 C63 52 82 65 108 69 C146 75 190 66 222 54Z" fill="url(#viraLogoGold)" />
            <path d="M198 76 C144 104 84 106 48 83 C31 72 21 54 17 34 C29 56 52 74 84 80 C124 87 164 81 198 69Z" fill="url(#viraLogoGold)" />
            <path d="M244 74 C236 69 224 72 208 80 C154 110 86 122 34 100 C18 93 9 82 12 75 C15 69 24 73 38 80 C84 101 148 94 202 67 C222 57 238 58 246 66 C249 69 247 73 244 74Z" fill="url(#viraLogoGold)" />
          </svg>
          <div style={{ fontFamily: FONT_EN, fontSize: 18, letterSpacing: '0.12em', direction: 'ltr' }}>
            vira.goldstore
          </div>
          <div style={{ width: '84%', height: 1, background: `${VIRA_COLORS.ivory}55`, margin: '10px 0' }} />
          <div style={{ fontFamily: FONT_FA, fontSize: 15, fontWeight: 700 }}>
            پاسخ طلافروش‌ها در کامنت ↓
          </div>
        </Card>
      </Scene>
    </AbsoluteFill>
  );
};
