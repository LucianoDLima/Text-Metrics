import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, Mock } from 'vitest';
import '@testing-library/jest-dom/vitest';
import { useCheckFilters, useTextMetrics } from '@features/textArea/provider';
import { AreaInformation } from './areaInformation';

vi.mock('@features/textArea/provider', () => ({
  useCheckFilters: vi.fn(),
  useTextMetrics: vi.fn(),
}));

describe('AreaInformation Component', () => {
  const mockToggleSpace = vi.fn();
  const mockToggleLimit = vi.fn();
  const mockHandleCharLimit = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();

    (useCheckFilters as Mock).mockReturnValue({
      spaceChecked: false,
      limitChecked: false,
      charLimit: '',
      toggleSpace: mockToggleSpace,
      toggleLimit: mockToggleLimit,
      handleCharLimit: mockHandleCharLimit,
    });

    (useTextMetrics as Mock).mockReturnValue({
      readingTime: '2',
    });
  });

  it('renders checkboxes and labels correctly', () => {
    render(<AreaInformation />);

    expect(screen.getByLabelText('Exclude Spaces')).toBeInTheDocument();
    expect(screen.getByLabelText('Set Charater Limit')).toBeInTheDocument();
  });

  it('calls toggleSpace when space checkbox is clicked', () => {
    render(<AreaInformation />);

    const spaceCheck = screen.getByLabelText('Exclude Spaces');
    fireEvent.click(spaceCheck);

    expect(mockToggleSpace).toHaveBeenCalledTimes(1);
  });

  it('calls toggleLimit when limit checkbox is clicked', () => {
    render(<AreaInformation />);

    const limitCheck = screen.getByLabelText('Set Charater Limit');
    fireEvent.click(limitCheck);

    expect(mockToggleLimit).toHaveBeenCalledTimes(1);
  });

  it('renders character limit input when limit checkbox is checked', () => {
    (useCheckFilters as Mock).mockReturnValue({
      spaceChecked: false,
      limitChecked: true,
      charLimit: '10',
      toggleSpace: mockToggleSpace,
      toggleLimit: mockToggleLimit,
      handleCharLimit: mockHandleCharLimit,
    });

    render(<AreaInformation />);

    const limitInput = screen.getByTestId('limit-filter-input');
    expect(limitInput).toBeInTheDocument();
  });

  it('updates character limit input value correctly', () => {
    (useCheckFilters as Mock).mockReturnValue({
      spaceChecked: false,
      limitChecked: true,
      charLimit: '10',
      toggleSpace: mockToggleSpace,
      toggleLimit: mockToggleLimit,
      handleCharLimit: mockHandleCharLimit,
    });

    render(<AreaInformation />);

    const input = screen.getByLabelText('Type the character limit');
    fireEvent.change(input, { target: { value: '50' } });

    expect(mockHandleCharLimit).toHaveBeenCalledTimes(1);
  });

  it('displays approximate reading time correctly', () => {
    render(<AreaInformation />);
    expect(
      screen.getByText('Approx. reading time: 2 minutes')
    ).toBeInTheDocument();
  });
});
