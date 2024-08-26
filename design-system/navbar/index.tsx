import { ComponentProps } from 'react';
import SearchFilter from '~/components/search-filter';

type NavbarProps = ComponentProps<typeof SearchFilter>;

export default function Navbar(props: NavbarProps) {
  return (
    <nav className="relative top-0 flex w-full items-center justify-between bg-gray-900 p-2">
      <div className="flex w-full items-center">
        <div className="hidden w-full md:flex md:w-1/3">
          <div className="ml-2 hidden flex-none text-sm font-medium uppercase md:block">
            Country Explorer
          </div>
        </div>
        <div className="w-full justify-center md:flex md:w-1/3">
          <SearchFilter {...props} />
        </div>
        <div className="flex justify-end md:w-1/3"></div>
      </div>
    </nav>
  );
}
