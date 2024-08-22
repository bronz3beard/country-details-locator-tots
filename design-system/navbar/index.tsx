import { Suspense } from 'react';
import SearchFilter from '~/components/search-filter';
const { SITE_NAME } = process.env;

export default async function Navbar() {
  return (
    <nav className="relative top-0 flex w-full items-center justify-between p-2">
      <div className="flex w-full items-center">
        <div className="flex w-full md:w-1/3">
          <div className="ml-2 flex-none text-sm font-medium uppercase md:hidden lg:block">
            {SITE_NAME}
          </div>
        </div>
        <div className="hidden justify-center md:flex md:w-1/3">
          <Suspense>
            <SearchFilter />
          </Suspense>
        </div>
        <div className="flex justify-end md:w-1/3"></div>
      </div>
    </nav>
  );
}
