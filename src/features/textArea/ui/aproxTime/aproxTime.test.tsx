import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { AproxTime } from './aproxTime';
import '@testing-library/jest-dom/vitest';

describe('AproxTime component', () => {
  it('renders with "0" minute', () => {
    render(<AproxTime readingTime='0' />);

    expect(screen.getByTestId('aprox-time')).toHaveTextContent(
      /Approx. reading time: 0 minutes$/
    );
  });

  it('renders with "<1" minute', () => {
    render(<AproxTime readingTime='<1' />);

    expect(screen.getByTestId('aprox-time')).toHaveTextContent(
      /Approx. reading time: <1 minute$/
    );
  });

  it('renders with "1" minute', () => {
    render(<AproxTime readingTime='1' />);

    expect(screen.getByTestId('aprox-time')).toHaveTextContent(
      /Approx. reading time: 1 minute$/
    );
  });

  it('renders with "2" minutes', () => {
    render(<AproxTime readingTime='2' />);

    expect(screen.getByTestId('aprox-time')).toHaveTextContent(
      /Approx. reading time: 2 minutes$/
    );
  });

  it('renders with "5" minutes', () => {
    render(<AproxTime readingTime='5' />);

    expect(screen.getByTestId('aprox-time')).toHaveTextContent(
      /Approx. reading time: 5 minutes$/
    );
  });
});
