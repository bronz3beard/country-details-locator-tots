import { CSSProperties } from 'react';

export type InitialMapConfig = {
  lat: number;
  lng: number;
  zoom?: number;
  pitch?: number;
  bearing?: number;
  styles?: CSSProperties;
};
