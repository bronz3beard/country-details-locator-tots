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

        // if (iconPath) {
        //   const popup = new mapboxGL.Popup({
        //     closeButton: false,
        //     closeOnClick: false
        //     // className: 'text-black'
        //   });

        //   mapboxGL.on('mouseover', source, (_event) => {
        //     mapboxGL.getCanvas().style.cursor = 'pointer';

        //     // const coordinates = event.features[0].geometry.coordinates.slice();
        //     // popup.setLngLat(coordinates).setHTML(event.features[0].properties.title).addTo(mapboxGL);
        //   });

        //   let isStatusOnline = true;
        //   window.addEventListener('online', () => (isStatusOnline = true));
        //   window.addEventListener('offline', () => (isStatusOnline = false));

        //   mapboxGL.on('click', source, async (event) => {
        //     const coordinates = event.features?.[0].geometry.coordinates.slice();
        //     const lat = event.lngLat.lat || coordinates[1];
        //     const lng = event.lngLat.lng || coordinates[0];

        //     if (isStatusOnline) {
        //       window.removeEventListener('online', () => (isStatusOnline = true));
        //       window.removeEventListener('offline', () => (isStatusOnline = false));
        //     }
        //     window.open(
        //       `https://www.google.com/maps/dir//P.${encodeURIComponent(
        //         features[0].properties.title
        //       )}/@${lat},${lng},17z`,
        //       '_blank'
        //     );
        //   });

        //   mapboxGL.on('mouseleave', source, () => {
        //     mapboxGL.getCanvas().style.cursor = '';
        //     popup.remove();
        //   });
        // }
      });
    }
  }
};
