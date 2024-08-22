'use client';
import { useEffect, useRef, useState } from 'react';

import initMap, { InitMapOptions } from '~/lib/map-box/init-map';
import { MapBox } from '~/lib/map-box/types';
import { InitialMapConfig } from './types';

const useInitialMap = ({ lat, lng, zoom, pitch, bearing }: InitialMapConfig) => {
  const [mapBox, setMapBox] = useState<MapBox | null>(null);

  const mapContainer = useRef<HTMLDivElement | null>(null);

  useEffect(
    function initialiseMapBox() {
      const map = mapContainer.current;

      if (mapContainer.current) {
        // Ensure the map container is empty before initializing the map
        mapContainer.current.innerHTML = '';
        const mapbox = initMap({
          map: mapContainer,
          lat,
          lng,
          zoom,
          pitch,
          bearing
        } satisfies InitMapOptions);

        setMapBox(mapbox);

        return () => {
          mapbox.remove();
        };
      }

      if (map) {
        map.style.width = '100%';
        return; // initialize map only once
      }
    },
    [lat, lng, zoom, pitch, bearing]
  );

  return {
    mapBox,
    mapContainer
  };
};

export default useInitialMap;
