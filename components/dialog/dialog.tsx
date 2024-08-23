import { FC, MouseEvent, ReactNode } from 'react';
import Button from '~/design-system/button';
import { cn } from '~/utils/style.utils';

export interface DialogProps {
  canClose?: boolean;
  children: ReactNode;
  isRelativeToParent?: boolean;
  onClose?: (event: MouseEvent<HTMLButtonElement>) => void;
  className?: string;
}

const Dialog: FC<DialogProps> = ({
  canClose = true,
  children,
  isRelativeToParent = true,
  onClose,
  className
}: DialogProps) => {
  return (
    <div
      className={cn(
        className,
        `${isRelativeToParent ? 'fixed' : 'relative'} z-10 w-max overflow-y-auto`
      )}
    >
      <div className="flex min-h-full items-center justify-center p-4 text-center">
        <div className="relative my-8 w-full transform overflow-hidden rounded-lg border border-gray-100 bg-white text-left shadow-2xl transition-all lg:max-w-lg">
          {onClose && (
            <div className="flex w-full justify-end">
              <Button
                text="Close"
                onClick={onClose}
                disabled={!canClose}
                className="mr-2 mt-2 h-8"
              />
            </div>
          )}
          {children}
        </div>
      </div>
    </div>
  );
};

export default Dialog;
