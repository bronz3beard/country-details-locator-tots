import { IconProps } from '../types';

const Search = ({ size, color = 'currentColor', className = '', ...rest }: IconProps) => {
  return (
    <svg width={size} height={size} color={color} className={className} {...rest}>
      <path
        stroke="currentColor"
        strokeLinejoin="round"
        strokeLinecap="round"
        strokeWidth="1"
        d="m21 21-3.5-3.5M17 10a7 7 0 1 1-14 0 7 7 0 0 1 14 0Z"
      />
    </svg>
  );
};

export default Search;
