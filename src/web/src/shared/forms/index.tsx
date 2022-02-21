import './index.scss';

import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Control, Controller, FieldPath } from 'react-hook-form';

type FormTextInputControlProps<T> = {
  type: 'text' | 'password',
  label: string,
  placeholder?: string,
  autoComplete?: "on" | "off",
  control: Control<T, any>,
  name: FieldPath<T>
}

type TextInputControlProps = {
  type: 'text' | 'password' | 'search',
  label: string,
  placeholder?: string,
  autoComplete?: "on" | "off",
  name?: string,
  error?: string,
  value: string,
  onChange: (...event: any[]) => void,
  onBlur?: () => void,
}

export function FormTextInputControl<T>({ name, type, label, placeholder, control, autoComplete = "off" }: FormTextInputControlProps<T>) {
  return <>
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState, formState }) => {
        const { name, value, onChange, onBlur } = field;

        return TextInputControl(
          {
            label, type, placeholder,
            value: value as unknown as string,
            name, onChange, onBlur, autoComplete,
            error: (formState.isSubmitted || fieldState.isTouched) && fieldState.error?.message
          }
        )
      }}
    />
  </>;
}

export function TextInputControl({
  label, type, placeholder, value, name, onChange, onBlur, error, autoComplete = "off"
}: TextInputControlProps) {
  const [id] = useState(uuidv4());

  return <div className="form-field">
    <label className="form-field__label" htmlFor={id}>{label}</label>
    <input className="form-field__control"
      type={type}
      id={id}
      placeholder={placeholder}
      value={value as string}
      name={name}
      onChange={onChange}
      onBlur={onBlur}
      autoComplete={autoComplete} />
    {error != null && <small className="form-field__feedback">{error}</small>}
  </div>;
}

