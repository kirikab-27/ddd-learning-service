import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Sidebar } from './Sidebar';

// Mock CSS module
vi.mock('./Sidebar.module.css', () => ({
  default: {
    sidebar: 'sidebar',
    nav: 'nav',
  },
}));

describe('Sidebar', () => {
  it('renders children correctly', () => {
    render(
      <Sidebar>
        <div data-testid="sidebar-content">Sidebar Content</div>
      </Sidebar>
    );
    expect(screen.getByTestId('sidebar-content')).toBeInTheDocument();
    expect(screen.getByText('Sidebar Content')).toBeInTheDocument();
  });

  it('renders aside element', () => {
    render(<Sidebar><div>Content</div></Sidebar>);
    expect(screen.getByRole('complementary')).toBeInTheDocument();
  });

  it('renders navigation element', () => {
    render(<Sidebar><div>Content</div></Sidebar>);
    expect(screen.getByRole('navigation')).toBeInTheDocument();
  });
});
