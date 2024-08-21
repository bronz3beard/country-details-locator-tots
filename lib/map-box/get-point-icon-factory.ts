import { BuildFeature, FactoryArgs } from './types';

export const getPointIconFactory = ({
  title,
  coordinates,
  locationType,
  iso
}: FactoryArgs): BuildFeature => {
  return {
    type: 'Feature',
    properties: {
      title,
      locationType,
      iso
    },
    geometry: {
      coordinates,
      type: 'Point'
    }
  };
};
