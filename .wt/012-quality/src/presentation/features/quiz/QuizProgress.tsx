'use client';

interface QuizProgressProps {
  current: number;
  total: number;
}

export function QuizProgress({ current, total }: QuizProgressProps) {
  const percentage = Math.round((current / total) * 100);

  return (
    <div className="px-6 py-4 bg-slate-800 border-b border-slate-700 max-sm:px-4 max-sm:py-3" data-testid="quiz-progress">
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm text-slate-400">
          問題 <span className="font-semibold text-slate-50">{current}</span> / {total}
        </span>
        <span className="text-sm text-slate-500" aria-hidden="true">
          {percentage}%
        </span>
      </div>
      <div
        className="h-2 bg-slate-700 rounded overflow-hidden"
        role="progressbar"
        aria-valuenow={current}
        aria-valuemin={1}
        aria-valuemax={total}
        aria-label={`${total}問中${current}問目`}
      >
        <div
          className="h-full bg-blue-600 rounded transition-all duration-300"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}
