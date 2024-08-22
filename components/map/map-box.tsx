'use client';

import { MutableRefObject } from 'react';
import { mapConfig } from './constants';

const MapBox = ({ mapContainer }: { mapContainer: MutableRefObject<HTMLDivElement | null> }) => {
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
