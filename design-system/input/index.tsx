import {
  ChangeEvent,
  HTMLInputAutoCompleteAttribute,
  InputHTMLAttributes,
  KeyboardEvent,
  ReactNode,
  forwardRef
} from 'react';
import { cn } from '~/utils/style.utils';

export interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'onChange'> {
  id: string;
  name: string;
  className?: string;
  disabled?: boolean;
  placeholder?: string;
  role: string;
  type?: string;
  value?: string;
  ariaLabel: string;
  hasPCIPII?: boolean;
  dataAttribute?: number | string;
  pciID?: string;
  piiID?: string;
  required?: boolean;
  autoFocus?: boolean;
  autoComplete?: HTMLInputAutoCompleteAttribute;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  onKeyDown?: (event: KeyboardEvent<HTMLInputElement>) => void;
  endAdornment?: ReactNode;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      disabled = false,
      className,
      dataAttribute,
      type = 'text',
      ariaLabel,
      required,
      hasPCIPII,
      piiID,
      pciID,
      autoFocus = false,
      autoComplete = '',
      endAdornment,
      ...props
    }: InputProps,
    ref
  ) => {
    // personal credit information means absolutely no data.
    // personally identifiable information, this one is contextual/grey area.
    const privacyId = !pciID ? piiID : pciID;
    return (
      <div className="relative w-full md:w-auto">
        <input
          ref={ref}
          type={type}
          disabled={disabled}
          autoFocus={autoFocus}
          className={cn(
            'block w-full appearance-none rounded-md border p-2 text-base text-black hover:border-blue-500 focus:outline-none',
            className
          )}
          aria-label={ariaLabel}
          aria-required={required}
          autoComplete={autoComplete}
          data-attribute={`${dataAttribute}${hasPCIPII ? ` ${privacyId}` : ''}`}
          {...props}
        />
        {endAdornment ? (
          <span className="absolute right-3 top-1/2 -translate-y-1/2"> {endAdornment} </span>
        ) : null}
      </div>
    );
  }
);

Input.displayName = 'Input';

export default Input;

export type InputTypes =
  | 'button'
  | 'checkbox'
  | 'color'
  | 'date'
  | 'datetime-local'
  | 'email'
  | 'file'
  | 'hidden'
  | 'image'
  | 'month'
  | 'number'
  | 'password'
  | 'radio'
  | 'range'
  | 'reset'
  | 'search'
  | 'submit'
  | 'tel'
  | 'text'
  | 'time'
  | 'url'
  | 'week';
