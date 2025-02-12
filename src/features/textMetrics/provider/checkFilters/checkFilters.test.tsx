import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom/vitest';
import { CheckFiltersProvider, useCheckFilters } from './checkFilters';
import { ReactNode } from 'react';

describe('CheckFiltersProvider', () => {
  it('provides default values correctly', () => {
    renderWithProvider(<MockComponent />);

    expect(screen.getByTestId('space-checked')).toHaveTextContent('false');
    expect(screen.getByTestId('limit-checked')).toHaveTextContent('false');
    expect(screen.getByTestId('char-limit')).toHaveTextContent('');
  });

  it('toggles spaceChecked state', async () => {
    renderWithProvider(<MockComponent />);

    const checkbox = screen.getByTestId('space-checkbox');

    await userEvent.click(checkbox);

    expect(screen.getByTestId('space-checked')).toHaveTextContent('true');
  });

  it('toggles limitChecked state', async () => {
    renderWithProvider(<MockComponent />);

    const checkbox = screen.getByTestId('limit-checkbox');

    await userEvent.click(checkbox);

    expect(screen.getByTestId('limit-checked')).toHaveTextContent('true');
  });

  it('updates charLimit correctly', async () => {
    renderWithProvider(<MockComponent />);

    const input = screen.getByTestId('char-limit-input');

    await userEvent.type(input, '300');

    expect(screen.getByTestId('char-limit')).toHaveTextContent('300');
  });

  it('removes non-numeric characters from charLimit input', async () => {
    renderWithProvider(<MockComponent />);

    const input = screen.getByTestId('char-limit-input');

    await userEvent.type(input, 'abc300def');

    expect(screen.getByTestId('char-limit')).toHaveTextContent('300');
  });

  it('throws error when useCheckFilters is used outside provider', () => {
    const consoleErrorMock = vi
      .spyOn(console, 'error')
      .mockImplementation(() => {});

    const renderOutsideProvider = () => render(<MockComponent />);

    expect(renderOutsideProvider).toThrow(
      'useCheckFilters must be used within a CheckFiltersProvider'
    );

    consoleErrorMock.mockRestore();
  });
});

function MockComponent() {
  const {
    spaceChecked,
    limitChecked,
    charLimit,
    toggleSpace,
    toggleLimit,
    handleCharLimit,
  } = useCheckFilters();

  return (
    <div>
      <input
        type='checkbox'
        data-testid='space-checkbox'
        checked={spaceChecked}
        onChange={toggleSpace}
      />
      <input
        type='checkbox'
        data-testid='limit-checkbox'
        checked={limitChecked}
        onChange={toggleLimit}
      />
      <input
        type='text'
        data-testid='char-limit-input'
        value={charLimit}
        onChange={handleCharLimit}
      />
      <span data-testid='space-checked'>{String(spaceChecked)}</span>
      <span data-testid='limit-checked'>{String(limitChecked)}</span>
      <span data-testid='char-limit'>{charLimit}</span>
    </div>
  );
}

// Wrapper for Context Consumer
function renderWithProvider(children: ReactNode) {
  return render(<CheckFiltersProvider>{children}</CheckFiltersProvider>);
}
