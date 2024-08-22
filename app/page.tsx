'use client';
import MapBox from '~/components/map/map-box';
import useMapState from '~/hooks/use-map-state';

export default function HomePage() {
  const { mapContainer } = useMapState();

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-gray-100/50 bg-white bg-clip-border text-gray-700">
      <div className="h-screen w-screen">
        {mapContainer ? <MapBox mapContainer={mapContainer} /> : null}
      </div>
    </div>
  );
}
