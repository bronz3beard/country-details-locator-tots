import { ReactNode } from 'react';
import { cn } from '~/utils/style.utils';

type BadgeProps =
  | {
      label?: string;
      children: ReactNode;
      className?: string;
    }
  | {
      label: string;
      children?: ReactNode;
      className?: string;
    };

const Badge = ({ label, children, className }: BadgeProps) => {
  return (
    <span
      className={cn(
        'inline-block select-none rounded-md bg-blue-500 px-2 py-0.5 text-xs font-semibold text-white transition-all duration-150 ease-linear',
        className
      )}
    >
      {label || children}
    </span>
  );
};

export default Badge;
