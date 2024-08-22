import { ChangeEvent, useEffect, useRef, useState } from 'react';
import Input, { InputProps } from '~/design-system/input';

interface DebounceInputProps extends Omit<InputProps, 'onChange'> {
  onChange: ((value: string) => void) | ((value: string) => Promise<void>);
  debounce?: number;
}

function DebouncedInput({
  value: initialValue,
  onChange,
  debounce = 500,
  ...props
}: DebounceInputProps) {
  const [value, setValue] = useState<string>(initialValue || '');
  const timeoutIdRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    setValue(initialValue || '');
  }, [initialValue]);

  useEffect(() => {
    // Clear any existing timeout before setting a new one
    if (timeoutIdRef.current) {
      clearTimeout(timeoutIdRef.current);
    }

    // Set a new timeout to debounce the onChange call
    timeoutIdRef.current = setTimeout(() => {
      onChange(value);
    }, debounce);

    return () => {
      if (timeoutIdRef.current) {
        clearTimeout(timeoutIdRef.current);
      }
    };
  }, [value, debounce, onChange]);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.currentTarget;
    setValue(value);
  };

  // this is to ensure the setTimeout does not run infinitely if the user leave the input value and interacts with the map
  const handleBlur = () => {
    // Clear the timeout when the input loses focus
    if (timeoutIdRef.current) {
      clearTimeout(timeoutIdRef.current);
      timeoutIdRef.current = null;
    }
  };

  return <Input value={value} onBlur={handleBlur} onChange={handleChange} {...props} />;
}

export default DebouncedInput;
