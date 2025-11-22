import { render, screen } from '@testing-library/react';
import { RootLayout } from './RootLayout';

// Mock CSS module
jest.mock('./RootLayout.module.css', () => ({
  container: 'container',
}));

describe('RootLayout', () => {
  it('renders children correctly', () => {
    render(
      <RootLayout>
        <div data-testid="test-content">Test Content</div>
      </RootLayout>
    );
    expect(screen.getByTestId('test-content')).toBeInTheDocument();
    expect(screen.getByText('Test Content')).toBeInTheDocument();
  });
});
