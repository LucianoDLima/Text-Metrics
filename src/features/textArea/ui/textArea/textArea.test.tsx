import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, Mock } from 'vitest';
import '@testing-library/jest-dom/vitest';
import { useCheckFilters, useTextMetrics } from '@features/textArea/provider';
import { TextArea } from './textArea';

vi.mock('@features/textArea/provider', () => ({
  useTextMetrics: vi.fn(),
  useCheckFilters: vi.fn(),
}));

vi.mock('../exceedError/exceedError', () => ({
  ExceedError: () => <div data-testid='exceed-error'>Limit reached!</div>,
}));

vi.mock('../areaInformation/areaInformation', () => ({
  AreaInformation: () => <div data-testid='area-information'>Info</div>,
}));

describe('TextArea Component', () => {
  const mockCountWords = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();

    (useTextMetrics as Mock).mockReturnValue({
      countWords: mockCountWords,
      letterCount: { letters: 0 },
    });

    (useCheckFilters as Mock).mockReturnValue({
      charLimit: null,
      limitChecked: false,
    });
  });

  it('renders without crashing', () => {
    render(<TextArea />);
    expect(screen.getByTestId('text-area-input')).toBeInTheDocument();
    expect(screen.getByTestId('area-information')).toBeInTheDocument();
  });

  it('calls countWords when typing', () => {
    render(<TextArea />);
    const textArea = screen.getByTestId('text-area-input');

    fireEvent.change(textArea, { target: { value: 'Hello' } });

    expect(mockCountWords).toHaveBeenCalled();
  });

  it('shows ExceedError when character limit is exceeded', () => {
    (useTextMetrics as Mock).mockReturnValue({
      countWords: mockCountWords,
      letterCount: { letters: 25 },
    });
    (useCheckFilters as Mock).mockReturnValue({
      charLimit: 20,
      limitChecked: true,
    });

    render(<TextArea />);

    expect(screen.getByTestId('exceed-error')).toBeInTheDocument();
  });

  it('does not show ExceedError when under the character limit', () => {
    (useTextMetrics as Mock).mockReturnValue({
      countWords: mockCountWords,
      letterCount: { letters: 15 },
    });
    (useCheckFilters as Mock).mockReturnValue({
      charLimit: 20,
      limitChecked: true,
    });

    render(<TextArea />);

    expect(screen.queryByTestId('exceed-error')).not.toBeInTheDocument();
  });
});
