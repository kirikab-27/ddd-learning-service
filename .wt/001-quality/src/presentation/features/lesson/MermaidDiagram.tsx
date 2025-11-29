'use client';

import { useEffect, useRef, useState } from 'react';
import mermaid from 'mermaid';

interface MermaidDiagramProps {
  chart: string;
}

export function MermaidDiagram({ chart }: MermaidDiagramProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [svg, setSvg] = useState<string>('');
  const [error, setError] = useState<string>('');

  useEffect(() => {
    // Initialize mermaid with dark theme configuration
    mermaid.initialize({
      startOnLoad: false,
      theme: 'dark',
      themeVariables: {
        darkMode: true,
        background: '#1e293b', // slate-800
        primaryColor: '#3b82f6', // blue-500
        primaryTextColor: '#e2e8f0', // slate-200
        primaryBorderColor: '#475569', // slate-600
        lineColor: '#64748b', // slate-500
        secondaryColor: '#1e40af', // blue-800
        tertiaryColor: '#0f172a', // slate-900
        fontSize: '14px',
      },
      flowchart: {
        useMaxWidth: true,
        htmlLabels: true,
        curve: 'basis',
      },
      sequence: {
        useMaxWidth: true,
        diagramMarginX: 50,
        diagramMarginY: 10,
        actorMargin: 50,
        width: 150,
        height: 65,
        boxMargin: 10,
        boxTextMargin: 5,
        noteMargin: 10,
        messageMargin: 35,
      },
      class: {
        useMaxWidth: true,
      },
      state: {
        useMaxWidth: true,
      },
      er: {
        useMaxWidth: true,
      },
      gantt: {
        useMaxWidth: true,
      },
    });

    const renderDiagram = async () => {
      if (!ref.current) return;

      try {
        // Generate unique ID for this diagram
        const id = `mermaid-${Math.random().toString(36).substring(7)}`;

        // Render the diagram
        const { svg: renderedSvg } = await mermaid.render(id, chart);
        setSvg(renderedSvg);
        setError('');
      } catch (err) {
        console.error('Mermaid rendering error:', err);
        setError(err instanceof Error ? err.message : 'Failed to render diagram');
      }
    };

    renderDiagram();
  }, [chart]);

  if (error) {
    return (
      <div className="my-6 p-4 bg-red-900/20 border border-red-700/50 rounded-lg">
        <p className="text-red-400 text-sm font-mono">
          Failed to render Mermaid diagram: {error}
        </p>
        <details className="mt-2">
          <summary className="text-red-300 text-xs cursor-pointer hover:text-red-200">
            Show diagram source
          </summary>
          <pre className="mt-2 p-2 bg-slate-900 rounded text-xs text-slate-300 overflow-x-auto">
            {chart}
          </pre>
        </details>
      </div>
    );
  }

  return (
    <div
      ref={ref}
      className="my-6 flex justify-center items-center bg-slate-900/50 rounded-lg p-6 border border-slate-700/50 shadow-xl overflow-x-auto"
      dangerouslySetInnerHTML={{ __html: svg }}
    />
  );
}
