import React from 'react';
import { render, screen } from '@testing-library/react';
import Alert from './Alert';

describe('Alert component', () => {
  it('renders an alert with danger type', () => {
    render(<Alert type="danger" message="Danger alert" />);
    const alert = screen.getByText(/Danger alert/i);
    expect(alert).toHaveClass('text-red-400');
  });

  it('renders an alert with warning type', () => {
    render(<Alert type="warning" message="Warning alert" />);
    const alert = screen.getByText(/Warning alert/i);
    expect(alert).toHaveClass('text-yellow-300');
  });

  it('renders an alert with success type', () => {
    render(<Alert type="success" message="Success alert" />);
    const alert = screen.getByText(/Success alert/i);
    expect(alert).toHaveClass('text-green-400');
  });

  it('renders an alert with info type', () => {
    render(<Alert type="info" message="Info alert" />);
    const alert = screen.getByText(/Info alert/i);
    expect(alert).toHaveClass('text-blue-400');
  });
});
