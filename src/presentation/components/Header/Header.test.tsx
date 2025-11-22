import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Header } from './Header';

// Mock CSS module
vi.mock('./Header.module.css', () => ({
  default: {
    header: 'header',
    logo: 'logo',
    logoIcon: 'logoIcon',
    logoText: 'logoText',
    nav: 'nav',
  },
}));

describe('Header', () => {
  it('renders with default title', () => {
    render(<Header />);
    expect(screen.getByText('DDD実践学習')).toBeInTheDocument();
  });

  it('renders with custom title', () => {
    render(<Header title="Custom Title" />);
    expect(screen.getByText('Custom Title')).toBeInTheDocument();
  });

  it('renders logo icon', () => {
    render(<Header />);
    expect(screen.getByText('📚')).toBeInTheDocument();
  });

  it('renders header element', () => {
    render(<Header />);
    expect(screen.getByRole('banner')).toBeInTheDocument();
  });

  it('renders navigation element', () => {
    render(<Header />);
    expect(screen.getByRole('navigation')).toBeInTheDocument();
  });
});
