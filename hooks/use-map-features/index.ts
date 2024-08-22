import { Point } from 'geojson';
import { useCallback, useState } from 'react';
import { sanMartinDeLosAndes } from '~/components/map/constants';
import { latLngBounds } from '~/lib/map-box/init-map';
import { countries } from '~/lib/map-box/locations/countries';
import { BuildFeature, MapBox } from '~/lib/map-box/types';
import { normalizeString } from '~/utils/string-utils';

interface Feature extends BuildFeature {}

const bounds = latLngBounds();

const useFeatureList = (mapBox: MapBox) => {
  const [featureList, setFeatureList] = useState<Array<Feature>>([]);
  const [originalFeatures] = useState<Array<Feature>>([...countries]);

  const updateMapZoom = useCallback(
    (features: Array<Feature>, value: string) => {
      const featureCoords = features.find((feature) => {
        const title = normalizeString(feature.properties.title ?? '');
        const code = normalizeString(feature.properties.iso ?? '');
        return title.includes(value) || code.includes(value);
      });

      if (featureCoords && value) {
        mapBox?.fitBounds(
          bounds.extend(
            (featureCoords.geometry as unknown as Point).coordinates as unknown as [number, number]
          ),
          {
            center: (featureCoords.geometry as unknown as Point).coordinates as unknown as [
              number,
              number
            ],
            animate: true,
            maxZoom: 20
          }
        );
      } else {
        mapBox?.fitBounds(bounds.extend(sanMartinDeLosAndes), {
          animate: true,
          maxZoom: 0
        });
      }
    },
    [mapBox]
  );

  const updateMapFilter = useCallback(
    (features: Array<Feature>) => {
      if (mapBox && features.length) {
        mapBox.setFilter('Countries', [
          'match',
          ['get', 'title'],
          features.map((feature) => feature.properties.title),
          true,
          false
        ]);
      } else if (mapBox) {
        // Reset to show all features if no filter is applied
        mapBox.setFilter('Countries', null);
      }
    },
    [mapBox]
  );

  const inputFeatureFilter = useCallback(
    (filterValue: string) => {
      const value = normalizeString(filterValue ?? '');
      let filteredFeatures: Array<Feature> = originalFeatures;

      if (value) {
        filteredFeatures = originalFeatures.filter((feature) => {
          const title = normalizeString(feature.properties.title ?? '');
          const code = normalizeString(feature.properties.iso ?? '');
          return title.includes(value) || code.includes(value);
        });
      }

      setFeatureList(filteredFeatures);
      updateMapFilter(filteredFeatures);
      updateMapZoom(filteredFeatures, value);
    },
    [originalFeatures, updateMapFilter, updateMapZoom]
  );

  // useEffect(() => {
  //   // Initialize the feature list on mount
  //   // setFeatureList(originalFeatures);
  //   updateMapFilter(originalFeatures);
  // }, [originalFeatures, updateMapFilter]);

  return { featureList, inputFeatureFilter };
};

export default useFeatureList;
