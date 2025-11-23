import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Slate base - matching existing CSS variables
        'bg-primary': '#0f172a',
        'bg-secondary': '#1e293b',
        'bg-tertiary': '#334155',
        'text-primary': '#f8fafc',
        'text-secondary': '#94a3b8',
        'text-muted': '#64748b',
        'accent': '#38bdf8',
        'accent-hover': '#7dd3fc',
        'primary': '#3b82f6',
        'primary-hover': '#60a5fa',
        'success': '#4ade80',
        'success-hover': '#86efac',
        'border': '#334155',
      },
      spacing: {
        'header': '60px',
        'sidebar': '280px',
      },
      maxWidth: {
        'content': '800px',
      },
    },
  },
  plugins: [],
};

export default config;
