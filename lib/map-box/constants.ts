import { countries } from './locations/countries';
import { FeatureItem } from './types';

export const mapFeatures: Array<FeatureItem> = [
  {
    source: 'Countries',
    iconImage: 'countries-marker',
    iconPath: '/assets/map-icons/map-pin.png',
    features: [...countries],
    type: 'symbol'
  }
];
