import { render, screen, fireEvent } from '@testing-library/react';
import { vi, describe, expect } from 'vitest';
import { TextMetricsProvider, useTextMetrics } from './textMetrics';
import '@testing-library/jest-dom/vitest';

describe('TextMetricsProvider', () => {
  vi.mock('../checkFilters/checkFilters', () => ({
    useCheckFilters: () => ({ spaceChecked: false }),
  }));

  it('should render initial context values', () => {
    render(
      <TextMetricsProvider>
        <MockComponent />
      </TextMetricsProvider>
    );

    expect(screen.getByText(/Word Count:/)).toHaveTextContent('0');
    expect(screen.getByText(/Sentence Count:/)).toHaveTextContent('0');
    expect(screen.getByText(/Reading Time:/)).toHaveTextContent('0');
    expect(screen.getByText(/Letter Count:/)).toHaveTextContent('0');
  });

  it('should update metrics when typing in the textarea', () => {
    render(
      <TextMetricsProvider>
        <MockComponent />
      </TextMetricsProvider>
    );

    const textArea = screen.getByRole('textbox');
    fireEvent.change(textArea, {
      target: { value: 'Hello world! I am here.' },
    });

    expect(screen.getByText(/Word Count:/)).toHaveTextContent('5');
    expect(screen.getByText(/Sentence Count:/)).toHaveTextContent('2');
    expect(screen.getByText(/Letter Count:/)).toHaveTextContent('23');
    expect(screen.getByText(/Reading Time:/)).toHaveTextContent('<1');
  });

  it('throws error when useTextMetrics is used outside provider', () => {
    const consoleErrorMock = vi
      .spyOn(console, 'error')
      .mockImplementation(() => {});

    const renderOutsideProvider = () => render(<MockComponent />);

    expect(renderOutsideProvider).toThrow(
      'useTextMetrics must be used within a TextMetricsProvider'
    );

    consoleErrorMock.mockRestore();
  });
});

// Mock component to access context
function MockComponent() {
  const { wordCount, sentenceCount, letterCount, readingTime, countWords } =
    useTextMetrics();

  return (
    <div>
      <div>Word Count: {wordCount}</div>
      <div>Sentence Count: {sentenceCount}</div>
      <div>Letter Count: {letterCount.letters}</div>
      <div>Reading Time: {readingTime}</div>
      <textarea onChange={(e) => countWords(e)} />
    </div>
  );
}
