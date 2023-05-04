import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import Input from './Input';

describe('Input Component', () => {
  const props = {
    label: 'Test Input Label',
    id: 'test-input',
    type: 'text',
    value: '',
    onChange: jest.fn(),
    placeholder: 'Test Input Placeholder',
    required: true,
  };

  it('renders the label', () => {
    render(<Input {...props} />);
    expect(screen.getByLabelText('Test Input Label')).toBeInTheDocument();
  });

  it('renders the input with the correct placeholder', () => {
    render(<Input {...props} />);
    expect(
      screen.getByPlaceholderText('Test Input Placeholder'),
    ).toBeInTheDocument();
  });

  it('calls onChange when input value changes', () => {
    render(<Input {...props} />);
    const input = screen.getByLabelText('Test Input Label');
    fireEvent.change(input, { target: { value: 'Test Input Value' } });
    expect(props.onChange).toHaveBeenCalledTimes(1);
  });

  it('renders a search input with search icon when type is search', () => {
    const searchProps = { ...props, type: 'search' };
    render(<Input {...searchProps} />);
    expect(screen.getByText('🔍')).toBeInTheDocument();
  });
});
