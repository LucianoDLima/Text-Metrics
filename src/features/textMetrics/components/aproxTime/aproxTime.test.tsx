import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { AproxTime } from './aproxTime';
import '@testing-library/jest-dom/vitest';

describe('AproxTime component', () => {
  it('renders with minutes on plural at 0', () => {
    render(<AproxTime readingTime={0} />);

    expect(screen.getByTestId('aprox-time')).toHaveTextContent(
      /Approx. reading time: 0 minutes$/
    );
  });

  it('renders with minutes on singular at less than one', () => {
    render(<AproxTime readingTime={0.1} />);

    expect(screen.getByTestId('aprox-time')).toHaveTextContent(
      /Approx. reading time: <1 minute$/
    );
  });

  it('renders with minutes on singular at exactly 1', () => {
    render(<AproxTime readingTime={1} />);

    expect(screen.getByTestId('aprox-time')).toHaveTextContent(
      /Approx. reading time: 1 minute$/
    );
  });

  it('renders with minutes on plural at any number over 1', () => {
    render(<AproxTime readingTime={7} />);

    expect(screen.getByTestId('aprox-time')).toHaveTextContent(
      /Approx. reading time: 7 minutes$/
    );
  });
});
