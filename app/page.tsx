import MapBox from '~/components/map/map-box';

export default async function HomePage() {
  return (
    <div className="flex h-screen w-screen overflow-hidden bg-gray-100/50 bg-white bg-clip-border text-gray-700">
      <div className="h-screen w-screen">
        <MapBox />
      </div>
    </div>
  );
}
