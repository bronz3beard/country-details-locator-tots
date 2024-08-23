import dynamic from 'next/dynamic';
import { cn } from '~/utils/style.utils';
import { IconProps, SVGIconProps } from '../types';

const SolidIcon = ({ name, size = 20, color = 'currentColor', className, ...rest }: IconProps) => {
  const IconComponent = dynamic<SVGIconProps>(() => import(`./${name}.tsx`));

  return (
    <IconComponent
      width={size}
      height={size}
      color={color}
      aria-hidden="true"
      fill="currentColor"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      className={cn('relative', className)}
      {...rest}
    />
  );
};

export default SolidIcon;
