import { useCallback, useState } from 'react';
import { countries } from '~/lib/map-box/locations/countries';
import { BuildFeature } from '~/lib/map-box/types';
import { normalizeString } from '~/utils/string-utils';

interface Feature extends BuildFeature {}

const useFeatureList = () => {
  const [featureList, setFeatureList] = useState<Array<Feature>>([]);

  const inputFeatureFilter = useCallback(
    (filterValue: string) => {
      const value = normalizeString(filterValue ?? '');

      const features: Array<Feature> = featureList?.length > 0 ? featureList : [...countries];

      // Filter visible features that match the input value.
      const filtered: Array<Feature> = [];

      features.forEach((feature) => {
        const title = normalizeString(feature.properties.title ?? '');

        if (title.includes(value)) {
          filtered.push(feature);
        }
      });

      // Set the filter to populate features into the layer.
      if (filtered.length) {
        setFeatureList(filtered);
      }
      // TODO:: dynamically update map pins
    },
    [featureList]
  );

  return { featureList, inputFeatureFilter };
};

export default useFeatureList;
