import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MarkdownRenderer } from './MarkdownRenderer';

describe('MarkdownRenderer', () => {
  it('renders heading', () => {
    render(<MarkdownRenderer content="# Hello World" />);
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Hello World');
  });

  it('renders paragraph', () => {
    render(<MarkdownRenderer content="This is a paragraph." />);
    expect(screen.getByText('This is a paragraph.')).toBeInTheDocument();
  });

  it('renders list items', () => {
    const content = `- Item 1
- Item 2
- Item 3`;
    render(<MarkdownRenderer content={content} />);
    expect(screen.getByText('Item 1')).toBeInTheDocument();
    expect(screen.getByText('Item 2')).toBeInTheDocument();
    expect(screen.getByText('Item 3')).toBeInTheDocument();
  });

  it('renders inline code', () => {
    render(<MarkdownRenderer content="Use `const` for constants." />);
    expect(screen.getByText('const')).toBeInTheDocument();
  });

  it('renders strong text', () => {
    render(<MarkdownRenderer content="**Bold text**" />);
    expect(screen.getByText('Bold text')).toBeInTheDocument();
  });

  it('renders code block', () => {
    const code = `\`\`\`typescript
const x = 1;
\`\`\``;
    render(<MarkdownRenderer content={code} />);
    expect(screen.getByText(/const/)).toBeInTheDocument();
  });

  it('renders multiple headings', () => {
    const content = `# H1

## H2

### H3`;
    render(<MarkdownRenderer content={content} />);
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('H1');
    expect(screen.getByRole('heading', { level: 2 })).toHaveTextContent('H2');
    expect(screen.getByRole('heading', { level: 3 })).toHaveTextContent('H3');
  });
});
