'use client';

interface QuestionResultDetail {
  questionId: string;
  questionText: string;
  isCorrect: boolean;
  selectedOptionText: string;
  correctOptionText: string;
  explanation: string;
}

interface QuizResultProps {
  score: number;
  isPassed: boolean;
  results: QuestionResultDetail[];
  onRetry: () => void;
  onBack: () => void;
}

export function QuizResult({
  score,
  isPassed,
  results,
  onRetry,
  onBack,
}: QuizResultProps) {
  const correctCount = results.filter(r => r.isCorrect).length;

  return (
    <div className="p-6 max-w-3xl mx-auto max-sm:p-4" data-testid="quiz-result">
      <div className="flex justify-center mb-8">
        <div className={`p-8 rounded-2xl text-center min-w-[200px] max-sm:p-6 max-sm:min-w-[160px] ${
          isPassed
            ? 'bg-gradient-to-br from-green-400/10 to-green-400/5 border-2 border-green-400'
            : 'bg-gradient-to-br from-red-400/10 to-red-400/5 border-2 border-red-400'
        }`}>
          <div className="text-sm text-slate-400 mb-1">スコア</div>
          <div className="text-5xl font-bold text-slate-50 leading-none mb-2 max-sm:text-4xl">{score}%</div>
          <div className="text-sm text-slate-400 mb-2">
            {correctCount} / {results.length} 問正解
          </div>
          <div className={`text-xl font-semibold ${isPassed ? 'text-green-400' : 'text-red-400'}`}>
            {isPassed ? '合格' : '不合格'}
          </div>
        </div>
      </div>

      <div className="mb-8">
        <h2 className="text-xl font-semibold text-slate-50 mb-6">回答結果</h2>
        <div className="flex flex-col gap-4">
          {results.map((result, index) => (
            <div
              key={result.questionId}
              className={`p-6 bg-slate-800 rounded-xl border-l-4 ${
                result.isCorrect ? 'border-l-green-400' : 'border-l-red-400'
              }`}
            >
              <div className="flex justify-between items-center mb-2">
                <span className="font-semibold text-slate-400">問{index + 1}</span>
                <span className={`px-2 py-1 rounded text-xs font-semibold ${
                  result.isCorrect
                    ? 'bg-green-400/20 text-green-400'
                    : 'bg-red-400/20 text-red-400'
                }`}>
                  {result.isCorrect ? '正解' : '不正解'}
                </span>
              </div>
              <p className="text-base text-slate-50 mb-4 leading-relaxed">{result.questionText}</p>

              <div className="mb-4">
                <div className="flex gap-2 mb-1">
                  <span className="text-sm text-slate-400 min-w-[100px]">あなたの回答:</span>
                  <span className={`text-sm ${!result.isCorrect ? 'text-red-400 line-through' : 'text-slate-50'}`}>
                    {result.selectedOptionText}
                  </span>
                </div>
                {!result.isCorrect && (
                  <div className="flex gap-2 mb-1">
                    <span className="text-sm text-slate-400 min-w-[100px]">正解:</span>
                    <span className="text-sm text-green-400 font-medium">
                      {result.correctOptionText}
                    </span>
                  </div>
                )}
              </div>

              <div className="bg-slate-700 p-4 rounded-lg">
                <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">解説:</span>
                <p className="text-sm text-slate-400 leading-relaxed mt-1">{result.explanation}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex gap-4 justify-center max-sm:flex-col">
        <button
          type="button"
          onClick={onRetry}
          className="px-8 py-4 bg-blue-600 text-white border-none rounded-lg text-base font-medium cursor-pointer transition-colors hover:bg-blue-500 max-sm:w-full"
        >
          もう一度挑戦
        </button>
        <button
          type="button"
          onClick={onBack}
          className="px-8 py-4 bg-transparent text-slate-400 border border-slate-700 rounded-lg text-base font-medium cursor-pointer transition-all hover:bg-slate-800 hover:text-slate-50 max-sm:w-full"
        >
          レッスンに戻る
        </button>
      </div>
    </div>
  );
}
