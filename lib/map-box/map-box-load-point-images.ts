import { BuildFeature, FeatureType, LayerFeatureSource, MapBox } from './types';

type LoadPointImages = {
  source: LayerFeatureSource;
  iconImage: string;
  iconPath: string;
  features: Array<BuildFeature>;
  mapboxGL: MapBox;
  type: FeatureType;
  updateLayer?: boolean;
};

export const mapBoxLoadPointImages = ({
  source,
  iconImage,
  iconPath,
  features,
  mapboxGL,
  type,
  updateLayer = false
}: LoadPointImages) => {
  if (updateLayer) {
    mapboxGL.setFilter(source, ['all', ['==', 'icon-image', iconImage]]);
  } else {
    if (iconPath) {
      mapboxGL.loadImage(iconPath, (error, image) => {
        if (error) {
          throw error;
        }
        if (iconImage && mapboxGL.hasImage(iconImage)) {
          mapboxGL.removeImage(iconImage);
        }
        if (iconImage && !mapboxGL.hasImage(iconImage)) {
          if (image) {
            mapboxGL.addImage(iconImage, image);
          }
        }

        // Add a GeoJSON source with 2 points
        mapboxGL.addSource(source, {
          type: 'geojson',
          data: {
            type: 'FeatureCollection',
            features
          }
        });

        // Add a symbol layer
        mapboxGL.addLayer({
          id: source,
          type,
          source,
          layout: {
            ...(iconPath && { 'icon-image': iconImage }),
            // get the title name from the source's "title" property
            'text-field': ['get', 'title'], // text to use for title
            'text-font': ['Inter Regular', 'Open Sans Semibold', 'Arial Unicode MS Bold'],
            'text-size': 16,
            'text-offset': [0, 0.5], // text spacing and location from point icon
            'text-anchor': 'top' // text location relative to point icon
          },
          paint: {
            'text-color': '#000000'
          }
        });

        mapboxGL.on('mouseover', source, (_event) => {
          if (source === 'Countries') {
            mapboxGL.getCanvas().style.cursor = 'pointer';
          }
        });

        mapboxGL.on('click', source, (event) => {
          if (source === 'Countries') {
            console.log('🚀 ~ mapboxGL.on ~ source:', source, event);
          }
          // const coordinates = event.features[0].geometry.coordinates.slice();
          // popup.setLngLat(coordinates).setHTML(event.features[0].properties.title).addTo(mapboxGL);
        });
      });
    }
  }
};
