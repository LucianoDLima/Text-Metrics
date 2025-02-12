import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Hero } from './hero';
import '@testing-library/jest-dom/vitest';

describe('Hero component', () => {
  it('should render the hero title', () => {
    render(<Hero />);

    const heroTitle = screen.getByTestId('hero-title');

    expect(heroTitle).toBeInTheDocument();
    expect(heroTitle).toHaveTextContent('Analyze your text in real-time.');
  });
});
