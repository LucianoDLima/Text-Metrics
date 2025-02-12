import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi, Mock } from 'vitest';
import '@testing-library/jest-dom/vitest';
import userEvent from '@testing-library/user-event';
import { useCheckFilters } from '@features/textMetrics/provider';
import { AreaInformation } from './areaInformation';

vi.mock('@features/textMetrics/provider', () => ({
  useTextMetrics: vi.fn(() => ({ readingTime: '2 min' })),
  useCheckFilters: vi.fn(),
}));

describe('AreaInformation component', () => {
  let toggleSpace: Mock;
  let toggleLimit: Mock;

  beforeEach(() => {
    toggleSpace = vi.fn();
    toggleLimit = vi.fn();

    (useCheckFilters as Mock).mockReturnValue({
      spaceChecked: false,
      limitChecked: false,
      charLimit: '',
      toggleSpace,
      toggleLimit,
      handleCharLimit: vi.fn(),
    });
  });
  it('renders correctly', () => {
    render(<AreaInformation />);

    expect(screen.getByTestId('space-check')).toBeInTheDocument();
    expect(screen.getByTestId('limit-check')).toBeInTheDocument();
    expect(screen.queryByTestId('limit-filter-input')).not.toBeInTheDocument();
  });

  it('calls toggleSpace when "Exclude Spaces" checkbox is clicked', async () => {
    render(<AreaInformation />);

    const spaceCheckbox = screen
      .getByTestId('space-check')
      .querySelector('input') as HTMLInputElement;

    await userEvent.click(spaceCheckbox);

    expect(toggleSpace).toHaveBeenCalledTimes(1);
  });

  it('calls toggleLimit when "Set Character Limit" checkbox is clicked', async () => {
    render(<AreaInformation />);

    const limitCheckbox = screen
      .getByTestId('limit-check')
      .querySelector('input') as HTMLInputElement;

    await userEvent.click(limitCheckbox);

    expect(toggleLimit).toHaveBeenCalledTimes(1);
  });
});
