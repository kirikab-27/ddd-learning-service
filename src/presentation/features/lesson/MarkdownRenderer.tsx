'use client';

import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import type { CSSProperties } from 'react';
import { MermaidDiagram } from './MermaidDiagram';

interface MarkdownRendererProps {
  content: string;
}

export function MarkdownRenderer({ content }: MarkdownRendererProps) {
  return (
    <article className="prose prose-invert prose-slate max-w-none">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          h1: () => null, // Hide H1 as it is displayed in the header
          h2: ({ node, ...props }) => (
            <h2 className="text-3xl font-bold mt-16 mb-6 pb-2 border-b border-slate-700 text-slate-200" {...props} />
          ),
          h3: ({ node, ...props }) => (
            <h3 className="text-2xl font-bold mt-10 mb-4 text-slate-300" {...props} />
          ),
          h4: ({ node, ...props }) => (
            <h4 className="text-xl font-semibold mt-8 mb-3 text-slate-400" {...props} />
          ),
          p: ({ node, ...props }) => (
            <p className="text-base leading-loose text-slate-300 mb-6 tracking-wide" {...props} />
          ),
          ul: ({ node, ...props }) => (
            <ul className="list-disc list-outside pl-6 mb-6 space-y-2 text-slate-300" {...props} />
          ),
          ol: ({ node, ...props }) => (
            <ol className="list-decimal list-outside pl-6 mb-6 space-y-2 text-slate-300" {...props} />
          ),
          li: ({ node, ...props }) => (
            <li className="leading-loose" {...props} />
          ),
          blockquote: ({ node, ...props }) => (
            <blockquote className="border-l-4 border-blue-500 pl-4 py-2 my-6 italic text-slate-300 bg-slate-800/50 rounded-r" {...props} />
          ),
          table: ({ node, ...props }) => (
            <div className="overflow-x-auto my-8 rounded-lg shadow-lg">
              <table className="w-full border-collapse" {...props} />
            </div>
          ),
          thead: ({ node, ...props }) => (
            <thead className="bg-slate-800 text-slate-200" {...props} />
          ),
          th: ({ node, ...props }) => (
            <th className="px-4 py-3 text-left font-semibold border-b-2 border-slate-600 text-sm uppercase tracking-wider" {...props} />
          ),
          td: ({ node, ...props }) => (
            <td className="px-4 py-3 border border-slate-700 text-slate-300" {...props} />
          ),
          a: ({ node, ...props }) => (
            <a className="text-blue-400 no-underline font-medium transition-colors hover:text-blue-300 hover:underline" {...props} />
          ),
          strong: ({ node, ...props }) => (
            <strong className="text-slate-200 font-bold" {...props} />
          ),
          em: ({ node, ...props }) => (
            <em className="text-slate-300 italic" {...props} />
          ),
          hr: ({ node, ...props }) => (
            <hr className="border-slate-700 my-10" {...props} />
          ),
          code({ node, className, children, ...props }) {
            const match = /language-(\w+)/.exec(className || '');
            const isInline = !match;
            const language = match ? match[1] : '';

            // Handle Mermaid diagrams
            if (!isInline && language === 'mermaid') {
              return <MermaidDiagram chart={String(children).replace(/\n$/, '')} />;
            }

            return !isInline && match ? (
              <div className="relative rounded-lg overflow-hidden my-6 shadow-xl border border-slate-700/50">
                <div className="bg-slate-800 px-4 py-2 border-b border-slate-700/50">
                  <span className="text-xs font-mono text-slate-400 uppercase tracking-wider">{match[1]}</span>
                </div>
                <div className="bg-slate-900/50 p-4">
                  <SyntaxHighlighter
                    style={oneDark as { [key: string]: CSSProperties }}
                    language={match[1]}
                    PreTag="div"
                    customStyle={{
                      margin: 0,
                      padding: 0,
                      background: 'transparent',
                      fontSize: '0.875rem',
                      lineHeight: '1.7',
                    }}
                    codeTagProps={{
                      style: {
                        fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace',
                      }
                    }}
                  >
                    {String(children).replace(/\n$/, '')}
                  </SyntaxHighlighter>
                </div>
              </div>
            ) : (
              <code className="bg-slate-800/80 text-blue-300 px-2 py-1 rounded text-sm font-mono border border-slate-700/50" {...props}>
                {children}
              </code>
            );
          },
        }}
      >
        {content}
      </ReactMarkdown>
    </article>
  );
}
