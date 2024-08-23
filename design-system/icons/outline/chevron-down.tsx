import { IconProps } from '../types';

const ChevronDown = ({ size, color = 'currentColor', className = '', ...rest }: IconProps) => {
  return (
    <svg width={size} height={size} color={color} className={className} {...rest}>
      <path
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="m8 10 4 4 4-4"
      />
    </svg>
  );
};

export default ChevronDown;
