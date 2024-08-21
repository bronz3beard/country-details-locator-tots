import { CSSProperties } from 'react';
import { LayerFeatureSource } from '~/lib/map-box/types';

export type InitialMapConfig = {
  lat: number;
  lng: number;
  source: LayerFeatureSource;
  zoom?: number;
  pitch?: number;
  bearing?: number;
  coordinates?: [number, number];
  styles?: CSSProperties;
};
