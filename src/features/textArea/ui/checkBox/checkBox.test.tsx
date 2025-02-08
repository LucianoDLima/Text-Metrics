import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import '@testing-library/jest-dom/vitest';
import { CheckBox } from './checkBox';

describe('CheckBox Component', () => {
  const mockHandler = vi.fn();
  const checkboxId = 'test-checkbox';

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders checkbox with label', () => {
    render(
      <CheckBox
        id={checkboxId}
        checked={false}
        checkboxHandler={mockHandler}
        label='Test Label'
      />
    );

    const checkbox = screen.getByRole('checkbox');
    const label = screen.getByLabelText('Test Label');

    expect(checkbox).toBeInTheDocument();
    expect(label).toBeInTheDocument();
    expect(checkbox).not.toBeChecked();
  });

  it('calls checkboxHandler when clicked', () => {
    render(
      <CheckBox
        id={checkboxId}
        checked={false}
        checkboxHandler={mockHandler}
        label='Test Label'
      />
    );

    const checkbox = screen.getByRole('checkbox');

    fireEvent.click(checkbox);
    expect(mockHandler).toHaveBeenCalledTimes(1);
  });

  it('renders children when checked', () => {
    render(
      <CheckBox
        id={checkboxId}
        checked={true}
        checkboxHandler={mockHandler}
        label='Test Label'
      >
        <div data-testid='checkbox-content'>Extra Content</div>
      </CheckBox>
    );

    expect(screen.getByTestId('checkbox-content')).toBeInTheDocument();
  });

  it('does not render children when unchecked', () => {
    render(
      <CheckBox
        id={checkboxId}
        checked={false}
        checkboxHandler={mockHandler}
        label='Test Label'
      >
        <div data-testid='checkbox-content'>Extra Content</div>
      </CheckBox>
    );

    expect(screen.queryByTestId('checkbox-content')).not.toBeInTheDocument();
  });
});
