import { IconProps } from '../types';

const ArrowLeft = ({ size, color = 'currentColor', className = '', ...rest }: IconProps) => {
  return (
    <svg width={size} height={size} color={color} className={className} {...rest}>
      <path
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1"
        d="M5 12h14M5 12l4-4m-4 4 4 4"
      />
    </svg>
  );
};

export default ArrowLeft;
