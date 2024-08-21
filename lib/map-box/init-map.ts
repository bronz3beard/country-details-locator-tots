import mapboxgl, { LngLatBounds, MapOptions } from 'mapbox-gl';
import { MutableRefObject } from 'react';

import { InitialMapConfig } from '~/components/map/types';
import { mapFeatures } from './constants';
import { mapBoxLoadPointImages } from './map-box-load-point-images';
import { MapBox } from './types';
const MAP_BOX_API_KEY = process.env.MAP_BOX_TOKEN;
mapboxgl.accessToken = MAP_BOX_API_KEY as unknown as string;

export const latLngBounds = () => new LngLatBounds();

export interface InitMapOptions extends InitialMapConfig {
  map: MutableRefObject<HTMLDivElement | null>;
}

const initMap = ({
  map,
  lat,
  lng,
  source,
  zoom = 3,
  pitch = 5,
  bearing = 360,
  coordinates
}: InitMapOptions): MapBox => {
  const mapboxGL = new mapboxgl.Map({
    container: map.current as unknown as HTMLElement, // container ID
    center: [lng, lat], // starting position [lng, lat]
    zoom, // starting zoom
    maxZoom: 5,
    minZoom: 1,
    style: 'mapbox://styles/mapbox/streets-v12',
    pitch, // camera angle
    bearing, // camera direction measured clockwise as an angle from true north
    boxZoom: false,
    doubleClickZoom: false
  } satisfies MapOptions);

  mapboxGL.on('load', function () {
    mapFeatures.forEach(({ source, iconImage, iconPath, features, type }) => {
      mapBoxLoadPointImages({
        source,
        iconImage,
        iconPath,
        features,
        mapboxGL,
        type
      });
    });

    // Set the default atmosphere style
    mapboxGL.setFog({
      range: [0, 20]
      //   // 'horizon-blend': 0,
      //   // color: 'white',
      //   // 'high-color': '#add8e6',
      //   // 'space-color': '#d8f2ff',
      //   // 'star-intensity': 0, // 0.0,
    });
  });

  // mapboxGL.scrollZoom.disable();

  return mapboxGL;
};

export default initMap;
