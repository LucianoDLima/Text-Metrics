import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import '@testing-library/jest-dom/vitest';
import { CharLimitInput } from './charLimitInput';

describe('Character limit component', () => {
  const mockCountWords = vi.fn();

  it('renders without crashing', () => {
    render(
      <CharLimitInput
        charLimit=''
        handleCharLimit={mockCountWords}
      />
    );

    expect(screen.getByTestId('limit-filter-input')).toBeInTheDocument();
    expect(screen.getByTestId('limit-filter-label')).toHaveClass('screen-reader');
  });
});
