import React from 'react';
import classNames from 'classnames';

interface AlertProps {
  type: 'danger' | 'warning' | 'success' | 'info';
  message: string;
}

function Alert({ type, message }: AlertProps) {
  const alertClass = classNames('p-4 mb-4 text-sm rounded-lg  bg-gray-800', {
    'text-red-400': type === 'danger',
    'text-yellow-300': type === 'warning',
    'text-green-400': type === 'success',
    'text-blue-400': type === 'info',
  });

  return (
    <div className={alertClass}>
      <span>
        {type} : {message}
      </span>
    </div>
  );
}

export default Alert;
