import React from 'react';
import { render, screen } from '@testing-library/react';
import Welcome from './Welcome';

describe('Welcome component', () => {
  it('should render the welcome message', () => {
    render(<Welcome />);
    const welcomeMessage = screen.getByText(/Bienvenido a Hermes/i);
    expect(welcomeMessage).toBeInTheDocument();
  });
});
