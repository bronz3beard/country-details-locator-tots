import { IconProps } from '../types';

const OutlineChevronLeft = ({
  size,
  color = 'currentColor',
  className = '',
  ...rest
}: IconProps) => {
  return (
    <svg width={size} height={size} color={color} className={className} {...rest}>
      <path
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1"
        d="m14 8-4 4 4 4"
      />
    </svg>
  );
};

export default OutlineChevronLeft;
