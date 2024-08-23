import SearchFilter from '~/components/search-filter';
import { MapBox } from '~/lib/map-box/types';

export default function Navbar({ mapBox }: { mapBox: MapBox | null }) {
  return (
    <nav className="relative top-0 flex w-full items-center justify-between bg-gray-900 p-2">
      <div className="flex w-full items-center">
        <div className="hidden w-full md:flex md:w-1/3">
          <div className="ml-2 hidden flex-none text-sm font-medium uppercase md:block">
            Country Explorer
          </div>
        </div>
        <div className="w-full justify-center md:flex md:w-1/3">
          <SearchFilter mapBox={mapBox} />
        </div>
        <div className="flex justify-end md:w-1/3"></div>
      </div>
    </nav>
  );
}
