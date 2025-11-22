import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { CourseLayout } from './CourseLayout';

// Mock CSS modules
vi.mock('./CourseLayout.module.css', () => ({
  default: {
    container: 'container',
    body: 'body',
    main: 'main',
    content: 'content',
  },
}));

vi.mock('../components/Header/Header.module.css', () => ({
  default: {
    header: 'header',
    logo: 'logo',
    logoIcon: 'logoIcon',
    logoText: 'logoText',
    nav: 'nav',
  },
}));

vi.mock('../components/Sidebar/Sidebar.module.css', () => ({
  default: {
    sidebar: 'sidebar',
    nav: 'nav',
  },
}));

describe('CourseLayout', () => {
  it('renders children and sidebar correctly', () => {
    render(
      <CourseLayout sidebar={<div data-testid="sidebar">Sidebar</div>}>
        <div data-testid="main-content">Main Content</div>
      </CourseLayout>
    );
    expect(screen.getByTestId('sidebar')).toBeInTheDocument();
    expect(screen.getByTestId('main-content')).toBeInTheDocument();
  });

  it('renders Header component', () => {
    render(
      <CourseLayout sidebar={<div>Sidebar</div>}>
        <div>Content</div>
      </CourseLayout>
    );
    expect(screen.getByText('DDD実践学習')).toBeInTheDocument();
  });

  it('renders main element', () => {
    render(
      <CourseLayout sidebar={<div>Sidebar</div>}>
        <div>Content</div>
      </CourseLayout>
    );
    expect(screen.getByRole('main')).toBeInTheDocument();
  });
});
