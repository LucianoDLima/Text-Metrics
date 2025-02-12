import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, Mock } from 'vitest';
import '@testing-library/jest-dom/vitest';
import {
  useCheckFilters,
  useTextMetrics,
} from '@features/textMetrics/provider';
import { TextArea } from './textArea';

vi.mock('@features/textMetrics/provider', () => ({
  useTextMetrics: vi.fn(() => ({
    countWords: vi.fn(),
    letterCount: 0,
  })),

  useCheckFilters: vi.fn(() => ({
    charLimit: null,
    limitChecked: false,
  })),
}));

describe('TextArea Component', () => {
  const mockCountWords = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();

    (useTextMetrics as Mock).mockReturnValue({
      countWords: mockCountWords,
      letterCount: 0,
    });

    (useCheckFilters as Mock).mockReturnValue({
      charLimit: null,
      limitChecked: false,
    });
  });

  it('renders text area, but not the error message', () => {
    render(<TextArea />);

    expect(screen.getByTestId('text-area-input')).toBeInTheDocument();
    expect(screen.queryByTestId('exceed-error')).not.toBeInTheDocument();
  });

  it('calls countWords function when typing', () => {
    render(<TextArea />);

    const textArea = screen.getByTestId('text-area-input');

    fireEvent.change(textArea, { target: { value: 'Hello' } });

    expect(mockCountWords).toHaveBeenCalled();
    expect(textArea).toHaveValue('Hello');
  });

  it('shows exceed error message when character limit is exceeded', () => {
    (useTextMetrics as Mock).mockReturnValue({
      countWords: mockCountWords,
      letterCount: 25,
    });
    (useCheckFilters as Mock).mockReturnValue({
      charLimit: 20,
      limitChecked: true,
    });

    render(<TextArea />);

    expect(screen.getByTestId('exceed-error')).toBeInTheDocument();
  });

  it('does not show exceed error message when under the character limit', () => {
    (useTextMetrics as Mock).mockReturnValue({
      countWords: mockCountWords,
      letterCount: 15,
    });
    (useCheckFilters as Mock).mockReturnValue({
      charLimit: 20,
      limitChecked: true,
    });

    render(<TextArea />);

    expect(screen.queryByTestId('exceed-error')).not.toBeInTheDocument();
  });

  it('does not show exceed error message when over the character limit but limit checkbox is toggled off', () => {
    (useTextMetrics as Mock).mockReturnValue({
      countWords: mockCountWords,
      letterCount: 25,
    });
    (useCheckFilters as Mock).mockReturnValue({
      charLimit: 20,
      limitChecked: false,
    });

    render(<TextArea />);

    expect(screen.queryByTestId('exceed-error')).not.toBeInTheDocument();
  });
});
