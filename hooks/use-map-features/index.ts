import { ChangeEvent, useCallback, useState } from 'react';
import { mapFeatures } from '~/lib/map-box/constants';
import { countries } from '~/lib/map-box/locations/countries';
import { BuildFeature, MapBox } from '~/lib/map-box/types';
import { normalizeString } from '~/utils/string-utils';

interface Feature extends BuildFeature {}

const useFeatureList = (mapBox: MapBox | null) => {
  const [featureList, setFeatureList] = useState<Array<Feature>>([]);

  const inputFeatureFilter = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const value = normalizeString(event.currentTarget.value ?? '');
      const mapboxGL = mapBox;

      if (mapboxGL) {
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
          mapFeatures.forEach((feature) => {
            // remove features filter
            if (value === '') {
              mapboxGL.setFilter(feature.source, null);
            } else {
              mapboxGL.setFilter(
                feature.source,
                [
                  'match',
                  ['get', 'title'],
                  filtered.map((item) => {
                    return item.properties.title;
                  })
                ],
                {
                  validate: true,
                  isInitialLoad: false
                }
              );
            }
          });
        }

        // Populate the sidebar with filtered results
        setFeatureList(filtered);
      }
    },
    [featureList, mapBox]
  );

  return { featureList, inputFeatureFilter };
};

export default useFeatureList;
