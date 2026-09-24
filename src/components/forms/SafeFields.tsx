import {
  useCallback,
  type ChangeEvent,
  type InputHTMLAttributes,
  type TextareaHTMLAttributes,
} from 'react';
import {
  emailSafe,
  lettersNumbersOnly,
  numbersOnly,
} from '@/lib/formValidation';

type Mode = 'text' | 'numbers' | 'email';

function sanitize(mode: Mode, value: string) {
  if (mode === 'numbers') return numbersOnly(value);
  if (mode === 'email') return emailSafe(value);
  return lettersNumbersOnly(value);
}

type SafeInputProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'onChange'> & {
  mode?: Mode;
  onChange?: (value: string) => void;
};

export function SafeInput({
  mode = 'text',
  onChange,
  ...props
}: SafeInputProps) {
  const handleChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const next = sanitize(mode, e.target.value);
      e.target.value = next;
      onChange?.(next);
    },
    [mode, onChange],
  );

  return <input {...props} onChange={handleChange} inputMode={mode === 'numbers' ? 'numeric' : props.inputMode} autoComplete={props.autoComplete} />;
}

type SafeTextareaProps = Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, 'onChange'> & {
  mode?: Mode;
  onChange?: (value: string) => void;
};

export function SafeTextarea({
  mode = 'text',
  onChange,
  ...props
}: SafeTextareaProps) {
  const handleChange = useCallback(
    (e: ChangeEvent<HTMLTextAreaElement>) => {
      const next = sanitize(mode, e.target.value);
      e.target.value = next;
      onChange?.(next);
    },
    [mode, onChange],
  );

  return <textarea {...props} onChange={handleChange} />;
}
