import React, { ChangeEventHandler, ReactNode } from 'react';
import classNames from 'classnames';

interface InputProps {
  label: ReactNode;
  id: string;
  type: string;
  value: string;
  onChange: ChangeEventHandler<HTMLInputElement>;
  placeholder: string;
  required?: boolean;
}

function Input({
  label,
  id,
  type,
  value,
  onChange,
  placeholder,
  required = false,
}: InputProps) {
  return (
    <div className={type === 'search' ? 'relative' : 'mb-6'}>
      {type === 'search' ? (
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          🔍
        </div>
      ) : (
        <label
          className="block mb-2 text-sm font-medium text-text-base"
          htmlFor={id}
        >
          {label}
        </label>
      )}

      <input
        type={type}
        id={id}
        className={classNames(
          'border text-sm rounded-lg block w-full p-2.5  bg-inpt-primary border-inpt-bord-primary placeholder-gray-400 text-text-base focus:ring-blue-500 focus:border-blue-500 outline-none',
          { 'pl-10': type === 'search' },
        )}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required={required}
      />
    </div>
  );
}

Input.defaultProps = {
  required: false,
};
export default Input;
