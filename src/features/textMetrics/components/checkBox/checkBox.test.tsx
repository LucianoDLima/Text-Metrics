import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { CheckBox } from './checkBox';
import { useState } from 'react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom/vitest';

describe('CheckBox Component', () => {
  const mockHandler = vi.fn();
  const checkboxId = 'test-checkbox';

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders checkbox with a label, unchecked and without showing the custom svg check mark', () => {
    render(
      <CheckBox
        id={checkboxId}
        checked={false}
        checkboxHandler={mockHandler}
        label='Test Label'
      />
    );

    const checkbox = screen.getByTestId('check-input');
    const label = screen.getByTestId('check-label');
    const checkIcon = screen.queryByTestId('check-icon');

    expect(checkbox).toBeInTheDocument();
    expect(label).toBeInTheDocument();
    expect(checkbox).not.toBeChecked();
    expect(checkIcon).not.toBeInTheDocument();
  });

  it('should check the checkbox when clicked, showing the custom svg check mark', async () => {
    render(<TestComponent />);

    const checkbox = screen.getByTestId('check-input');

    await userEvent.click(checkbox);

    const checkIcon = screen.queryByTestId('check-icon');

    expect(checkbox).toBeChecked();
    expect(checkIcon).toBeInTheDocument();
  });
});

function TestComponent() {
  const [checked, setChecked] = useState(false);

  return (
    <CheckBox
      id='test'
      checked={checked}
      checkboxHandler={() => setChecked((prev) => !prev)}
      label='Test Label'
    />
  );
}
