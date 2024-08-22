import { VariantProps } from 'class-variance-authority';
import { ButtonHTMLAttributes, forwardRef, ReactNode } from 'react';
import { cn } from '~/utils/style.utils';
import { buttonVariants } from './button-variants';

export interface ButtonAttributes extends ButtonHTMLAttributes<HTMLButtonElement> {
  testId?: string;
  id?: string | undefined;
  text?: string;
  type?: 'submit' | 'reset' | 'button' | undefined;
  name?: string;
  role?: string;
  ariaControls?: string;
  children?: ReactNode;
  dataAttribute?: number | string;
  pciID?: string;
  piiID?: string;
  ariaLabel?: string;
  busyNode?: ReactNode;
  primary?: boolean;
  disabled?: boolean;
  isBusy?: boolean;
  hasPCIPII?: boolean;
  suffix?: ReactNode;
}

export interface ButtonProps extends ButtonAttributes, VariantProps<typeof buttonVariants> {}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      type = 'button',
      isBusy = false,
      busyNode = <span>...</span>,
      disabled,
      text,
      children,
      testId,
      hasPCIPII,
      pciID = 'suppress_flag_pci',
      piiID = 'suppress_flag_pii',
      dataAttribute,
      ariaControls,
      ariaLabel,
      suffix,
      ...props
    }: ButtonProps,
    ref
  ) => {
    // personal credit information means absolutely no data.
    // personally identifiable information, this one is contextual/grey area.
    const privacyId = !pciID ? piiID : pciID;

    return (
      <button
        {...props}
        type={type}
        className={cn(
          buttonVariants({
            variant: disabled || isBusy ? 'disabled' : variant,
            size
          }),
          className
        )}
        ref={ref}
        data-testid={testId}
        aria-controls={ariaControls}
        aria-label={ariaLabel}
        data-attribute={`${dataAttribute ?? ''}${hasPCIPII ? ` ${privacyId}` : ''}`}
      >
        {text || children}
        {suffix ? suffix : null}
        {isBusy && busyNode}
      </button>
    );
  }
);

Button.displayName = 'Button';

export default Button;
