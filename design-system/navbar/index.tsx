'use client';

import SearchFilter from '~/components/search-filter';
import useMapState from '~/hooks/use-map-state';

export default function Navbar() {
  const { mapBox } = useMapState();

  return (
    <nav className="relative top-0 flex w-full items-center justify-between bg-gray-900 p-2">
      <div className="flex w-full items-center">
        <div className="flex w-full md:w-1/3">
          <div className="ml-2 flex-none text-sm font-medium uppercase md:hidden lg:block">
            Country Explorer
          </div>
        </div>
        <div className="hidden justify-center md:flex md:w-1/3">
          {mapBox ? <SearchFilter mapBox={mapBox} /> : null}
        </div>
        <div className="flex justify-end md:w-1/3"></div>
      </div>
    </nav>
  );
}
