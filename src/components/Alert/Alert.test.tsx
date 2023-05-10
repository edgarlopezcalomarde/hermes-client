import React from 'react';
import { render, screen } from '@testing-library/react';
import Alert from './Alert';

describe('Alert Component', () => {
  it('renders the correct message text', () => {
    render(<Alert type="info" message="Info message" />);
    expect(screen.getByText('info : Info message')).toBeInTheDocument();
  });

  const alertDict = {
    danger: {
      type: 'danger',
      message: 'Error occurred',
    },
    warning: {
      type: 'warning',
      message: 'Warning message',
    },
    success: {
      type: 'success',
      message: 'success',
    },
    info: {
      type: 'info',
      message: 'Info message',
    },
  };

  it(`renders the component with the class based on the type "${alertDict.danger.type}"`, () => {
    render(
      <Alert type={alertDict.danger.type} message={alertDict.danger.message} />,
    );
    expect(screen.getByTestId('alert')).toHaveClass('text-red-400');
  });

  it(`renders the component with the class based on the type "${alertDict.warning.type}"`, () => {
    render(
      <Alert
        type={alertDict.warning.type}
        message={alertDict.warning.message}
      />,
    );
    expect(screen.getByTestId('alert')).toHaveClass('text-yellow-300');
  });

  it(`renders the component with the class based on the type "${alertDict.success.type}"`, () => {
    render(
      <Alert
        type={alertDict.success.type}
        message={alertDict.success.message}
      />,
    );
    expect(screen.getByTestId('alert')).toHaveClass('text-green-400');
  });

  it(`renders the component with the class based on the type "${alertDict.info.type}"`, () => {
    render(
      <Alert type={alertDict.info.type} message={alertDict.info.message} />,
    );
    expect(screen.getByTestId('alert')).toHaveClass('text-blue-400');
  });
});
