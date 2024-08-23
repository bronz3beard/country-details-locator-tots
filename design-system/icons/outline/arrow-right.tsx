import { IconProps } from '../types';

const ArrowRight = ({ size, color = 'currentColor', className = '', ...rest }: IconProps) => {
  return (
    <svg width={size} height={size} color={color} className={className} {...rest}>
      <path
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1"
        d="M19 12H5m14 0-4 4m4-4-4-4"
      />
    </svg>
  );
};

export default ArrowRight;
