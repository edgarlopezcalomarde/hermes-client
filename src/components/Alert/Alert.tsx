import React from 'react';

interface AlertProps {
  type: string;
  message: string;
}

function Alert({ type, message }: AlertProps) {
  return (
    <div className={`alert alert-${type}`}>
      <span>{message}</span>
    </div>
  );
}

export default Alert;
