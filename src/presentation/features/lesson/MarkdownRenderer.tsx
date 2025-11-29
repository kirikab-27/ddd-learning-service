'use client';

import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import type { CSSProperties } from 'react';

interface MarkdownRendererProps {
  content: string;
}

export function MarkdownRenderer({ content }: MarkdownRendererProps) {
  return (
    <article className="prose prose-invert prose-slate max-w-none
      prose-headings:font-bold prose-headings:tracking-tight
      prose-h1:text-4xl prose-h1:mb-6 prose-h1:mt-8 prose-h1:pb-3 prose-h1:border-b prose-h1:border-slate-700 prose-h1:text-slate-100
      prose-h2:text-3xl prose-h2:mb-5 prose-h2:mt-10 prose-h2:text-slate-200 prose-h2:border-l-4 prose-h2:border-blue-500 prose-h2:pl-4
      prose-h3:text-2xl prose-h3:mb-4 prose-h3:mt-8 prose-h3:text-slate-300
      prose-h4:text-xl prose-h4:mb-3 prose-h4:mt-6 prose-h4:text-slate-400 prose-h4:font-semibold
      prose-p:text-base prose-p:leading-relaxed prose-p:text-slate-300 prose-p:mb-4
      prose-a:text-blue-400 prose-a:no-underline prose-a:font-medium prose-a:transition-colors hover:prose-a:text-blue-300 hover:prose-a:underline
      prose-strong:text-slate-200 prose-strong:font-bold
      prose-em:text-slate-300 prose-em:italic
      prose-code:bg-slate-800/80 prose-code:text-blue-300 prose-code:px-2 prose-code:py-1 prose-code:rounded prose-code:text-sm prose-code:font-mono prose-code:before:content-none prose-code:after:content-none prose-code:border prose-code:border-slate-700/50
      prose-pre:bg-slate-900/50 prose-pre:border prose-pre:border-slate-700/50 prose-pre:rounded-lg prose-pre:p-0 prose-pre:my-6 prose-pre:shadow-xl
      prose-blockquote:border-l-4 prose-blockquote:border-blue-500 prose-blockquote:bg-slate-800/50 prose-blockquote:rounded-r-lg prose-blockquote:pl-6 prose-blockquote:pr-6 prose-blockquote:py-4 prose-blockquote:my-6 prose-blockquote:italic prose-blockquote:text-slate-300 prose-blockquote:shadow-lg
      prose-ul:my-5 prose-ul:space-y-2 prose-ul:list-disc prose-ul:list-outside prose-ul:pl-6 prose-ul:text-slate-300
      prose-ol:my-5 prose-ol:space-y-2 prose-ol:list-decimal prose-ol:list-outside prose-ol:pl-6 prose-ol:text-slate-300
      prose-li:text-slate-300 prose-li:leading-relaxed prose-li:marker:text-blue-400
      prose-table:w-full prose-table:my-6 prose-table:border-collapse prose-table:rounded-lg prose-table:overflow-hidden prose-table:shadow-lg
      prose-thead:bg-slate-800 prose-thead:text-slate-200
      prose-th:px-4 prose-th:py-3 prose-th:text-left prose-th:font-semibold prose-th:border-b-2 prose-th:border-slate-600 prose-th:text-sm prose-th:uppercase prose-th:tracking-wider
      prose-td:px-4 prose-td:py-3 prose-td:border prose-td:border-slate-700 prose-td:text-slate-300
      prose-tr:transition-colors prose-tbody:hover:prose-tr:bg-slate-800/30
      prose-hr:border-slate-700 prose-hr:my-8">
      <ReactMarkdown
        components={{
          code({ node, className, children, ...props }) {
            const match = /language-(\w+)/.exec(className || '');
            const isInline = !match;
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
              <code className={className} {...props}>
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
