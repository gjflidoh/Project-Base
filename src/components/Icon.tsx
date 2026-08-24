import React from 'react';
import Svg, { Path, Circle, Rect } from 'react-native-svg';

export interface IconProps {
  d?: string;
  paths?: string[];
  size?: number;
  color?: string;
  strokeWidth?: number;
  filled?: boolean;
  viewBox?: string;
}

// Generic stroke-path icon renderer — every icon in the design is given as
// an SVG `d` path (see data/icons.ts + per-screen GLYPH constants), drawn
// with round joins/caps to match the source exactly.
export function Icon({ d, paths, size = 20, color = '#1B1610', strokeWidth = 2, filled = false, viewBox = '0 0 24 24' }: IconProps) {
  const ds = paths ?? (d ? [d] : []);
  return (
    <Svg width={size} height={size} viewBox={viewBox} fill="none">
      {ds.map((p, i) => (
        <Path
          key={i}
          d={p}
          stroke={filled ? 'none' : color}
          fill={filled ? color : 'none'}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      ))}
    </Svg>
  );
}

export function IconSearch({ size = 16, color = '#9A8D7D', strokeWidth = 2.1 }: { size?: number; color?: string; strokeWidth?: number }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Circle cx={11} cy={11} r={7} stroke={color} strokeWidth={strokeWidth} />
      <Path d="m20 20-3.5-3.5" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" />
    </Svg>
  );
}

export function IconBell({ size = 17, color = '#1B1610', strokeWidth = 1.9 }: { size?: number; color?: string; strokeWidth?: number }) {
  return (
    <Icon
      size={size}
      color={color}
      strokeWidth={strokeWidth}
      paths={['M18 8a6 6 0 0 0-12 0c0 7-3 9-3 9h18s-3-2-3-9', 'M10.3 21a1.94 1.94 0 0 0 3.4 0']}
    />
  );
}

export function IconSignal({ size = 17, color = '#1B1610' }: { size?: number; color?: string }) {
  return (
    <Svg width={size} height={(size * 11) / 17} viewBox="0 0 17 11" fill={color}>
      <Rect x={0} y={7} width={3} height={4} rx={1} />
      <Rect x={4.5} y={5} width={3} height={6} rx={1} />
      <Rect x={9} y={2.5} width={3} height={8.5} rx={1} />
      <Rect x={13.5} y={0} width={3} height={11} rx={1} />
    </Svg>
  );
}

export function IconWifi({ size = 15, color = '#1B1610' }: { size?: number; color?: string }) {
  return (
    <Svg width={size} height={(size * 11) / 15} viewBox="0 0 15 11" fill="none">
      <Path d="M1 3.6a9 9 0 0 1 13 0M3.6 6.4a5.5 5.5 0 0 1 7.8 0" stroke={color} strokeWidth={1.6} strokeLinecap="round" />
      <Circle cx={7.5} cy={9.4} r={1.1} fill={color} />
    </Svg>
  );
}

export function IconBattery({ size = 25, color = '#1B1610' }: { size?: number; color?: string }) {
  return (
    <Svg width={size} height={(size * 12) / 25} viewBox="0 0 25 12" fill="none">
      <Rect x={0.5} y={0.5} width={21} height={11} rx={3.5} stroke={color} opacity={0.45} />
      <Rect x={2} y={2} width={18} height={8} rx={2.4} fill={color} />
      <Path d="M23 4.2v3.6c1-.3 1.4-1 1.4-1.8s-.4-1.5-1.4-1.8Z" fill={color} opacity={0.5} />
    </Svg>
  );
}

export default Icon;
