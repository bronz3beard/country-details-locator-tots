import { IconProps } from '../types';

const ChevronRight = ({ size, color = 'currentColor', className = '', ...rest }: IconProps) => {
  return (
    <svg width={size} height={size} color={color} className={className} {...rest}>
      <path
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1"
        d="m10 16 4-4-4-4"
      />
    </svg>
  );
};

export default ChevronRight;
