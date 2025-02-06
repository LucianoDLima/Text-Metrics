import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import '@testing-library/jest-dom/vitest';
import { ExceedError } from './exceedError';

describe('ExceedError component', () => {
  it('renders with the correct character amount', () => {
    const charAmount = 100;
    const exceedAmount = 10;

    render(
      <ExceedError
        charAmount={charAmount}
        exceedAmount={exceedAmount}
      />
    );

    const errorElement = screen.getByTestId('exceed-error');

    expect(errorElement).toBeInTheDocument();
    expect(errorElement).toHaveTextContent(
      `Limit reached! Your text exceeds ${charAmount} characters. (${exceedAmount})`
    );
  });

  it('renders the InfoIcon', () => {
    const charAmount = 150;
    const exceedAmount = 10;

    render(
      <ExceedError
        charAmount={charAmount}
        exceedAmount={exceedAmount}
      />
    );

    expect(screen.getByTestId('exceed-error-icon')).toBeInTheDocument();
  });
});
