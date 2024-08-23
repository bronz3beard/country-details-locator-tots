import { Point } from 'geojson';
import { useCallback, useState } from 'react';
import { sanMartinDeLosAndes } from '~/components/map/constants';
import { latLngBounds } from '~/lib/map-box/init-map';
import { countries } from '~/lib/map-box/locations/countries';
import { BuildFeature, MapBox } from '~/lib/map-box/types';
import { normalizeString } from '~/utils/string-utils';

interface Feature extends BuildFeature {}

const bounds = latLngBounds();

const useFeatureList = (mapBox: MapBox | null) => {
  const [featureList, setFeatureList] = useState<Array<Feature>>([]);
  const [originalFeatures] = useState<Array<Feature>>([...countries]);

  const updateFeatureMapZoom = useCallback(
    ({
      features,
      value,
      latLng
    }:
      | { features?: Array<Feature>; value?: string; latLng: [number, number] }
      | { features: Array<Feature>; value: string; latLng?: [number, number] }) => {
      const featureCoords = features?.find((feature) => {
        const title = normalizeString(feature.properties.title ?? '');
        const code = normalizeString(feature.properties.iso ?? '');
        return !value ? false : title === value || code === value;
      });

      if (latLng) {
        mapBox?.fitBounds(bounds.extend(latLng), {
          center: latLng,
          animate: true,
          zoom: 5
        });
      } else if (featureCoords && value) {
        const coordinates = (featureCoords.geometry as unknown as Point).coordinates as unknown as [
          number,
          number
        ];

        mapBox?.fitBounds(bounds.extend(coordinates), {
          center: coordinates,
          animate: true,
          zoom: 5
        });
      } else {
        mapBox?.fitBounds(bounds.extend(sanMartinDeLosAndes), {
          animate: true,
          zoom: 0
        });
      }
    },
    [mapBox]
  );

  const updateFeatureMapFilter = useCallback(
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

  const filterFeatures = useCallback(
    async (filterValue: string) => {
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
      updateFeatureMapFilter(filteredFeatures);
      updateFeatureMapZoom({ features: filteredFeatures, value });
    },
    [originalFeatures, updateFeatureMapFilter, updateFeatureMapZoom]
  );

  return { featureList, filterFeatures };
};

export default useFeatureList;
