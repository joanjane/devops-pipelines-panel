import { PropsWithChildren, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Control, Controller, FieldPath } from 'react-hook-form';

type InputControlProps<T> = {
  type: 'text' | 'password',
  label: string,
  placeholder?: string,
  control: Control<T, any>,
  name: FieldPath<T>
}

export function InputControl<T>({ name, type, label, placeholder, control }: PropsWithChildren<InputControlProps<T>>) {
  const [id] = useState(uuidv4());

  return <>
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState, formState }) => {
        const { name, value, onChange, onBlur } = field;
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
            autoComplete="off"
          />
          {
            (formState.isSubmitted || fieldState.isTouched) && fieldState.error?.message &&
            <small className="form-field__feedback">{fieldState.error.message}</small>
          }
        </div>
      }}
    />
  </>;
}

