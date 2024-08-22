import { ChangeEvent, useEffect, useState } from 'react';
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

  useEffect(() => {
    setValue(initialValue || '');
  }, [initialValue]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      onChange(value);
    }, debounce);

    return () => clearTimeout(timeout);
  }, [value, debounce, onChange]);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.currentTarget;
    setValue(value);
  };
  return <Input value={value} onChange={handleChange} {...props} />;
}

export default DebouncedInput;
