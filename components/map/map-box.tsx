'use client';

import { mapConfig } from './constants';
import useInitialMap from './use-init-map';

const MapBox = () => {
  const { mapContainer } = useInitialMap(mapConfig);

  return mapContainer ? (
    <div
      style={{
        ...mapConfig.styles,
        height: '100%',
        width: '100%',
        position: 'relative'
      }}
      ref={mapContainer}
    />
  ) : null;
};

export default MapBox;
