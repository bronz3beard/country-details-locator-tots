import { FC, MouseEvent, ReactNode } from 'react';
import Button from '~/design-system/button';
import OutlineIcon from '~/design-system/icons/outline';
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
        `${isRelativeToParent ? 'fixed' : 'relative'} z-10 w-max overflow-y-auto`,
        className
      )}
    >
      {/* <div className="flex min-h-full items-center justify-center p-4 text-center"> */}
      <div className="relative my-8 transform overflow-hidden rounded-lg border border-gray-100 bg-white text-left transition-all lg:max-w-lg">
        {onClose && (
          <div className="flex w-full justify-end">
            <Button
              size="sm"
              id="DECLINED"
              variant="grow"
              onClick={onClose}
              disabled={!canClose}
              className="py-4 text-gray-600"
              suffix={<OutlineIcon name="close" />}
            />
          </div>
        )}
        {children}
      </div>
      {/* </div> */}
    </div>
  );
};

export default Dialog;
