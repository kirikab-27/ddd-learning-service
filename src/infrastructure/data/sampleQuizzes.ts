import { Quiz } from '@/domain/content/models/Quiz';
import { Question } from '@/domain/content/models/Question';
import { QuizId, LessonId } from '@/domain/shared';

// 値オブジェクト理解クイズ（lesson-5-1用）
const valueObjectQuestions: Question[] = [
  Question.create({
    id: 'q1',
    text: 'DDDにおける「値オブジェクト」の特徴として正しいものはどれですか？',
    options: [
      { id: 'a', text: '一意のIDで識別される', isCorrect: false },
      { id: 'b', text: '可変（ミュータブル）である', isCorrect: false },
      { id: 'c', text: '属性の値によって同一性が決まり、不変（イミュータブル）である', isCorrect: true },
      { id: 'd', text: '必ずデータベースに永続化される', isCorrect: false },
    ],
    explanation: '値オブジェクトはその属性の値によって同一性が決まります。例えば「1000円」という金額は、別の「1000円」と同じ価値を持ちます。',
  }),
  Question.create({
    id: 'q2',
    text: '値オブジェクトを使うべき場面として最も適切なものはどれですか？',
    options: [
      { id: 'a', text: 'ユーザーアカウントの管理', isCorrect: false },
      { id: 'b', text: '金額や住所など、計測や定量化を行う場合', isCorrect: true },
      { id: 'c', text: 'データベースのテーブル設計', isCorrect: false },
      { id: 'd', text: 'UIコンポーネントの状態管理', isCorrect: false },
    ],
    explanation: '値オブジェクトは金額、距離、住所など、属性の組み合わせで意味を持つものに適しています。',
  }),
  Question.create({
    id: 'q3',
    text: '値オブジェクトの等価性について正しい説明はどれですか？',
    options: [
      { id: 'a', text: 'メモリアドレスで比較する', isCorrect: false },
      { id: 'b', text: '一意のIDで比較する', isCorrect: false },
      { id: 'c', text: '全ての属性の値で比較する', isCorrect: true },
      { id: 'd', text: '作成日時で比較する', isCorrect: false },
    ],
    explanation: '値オブジェクトは全ての属性の値が等しければ等価とみなされます。Money(1000, "JPY")とMoney(1000, "JPY")は同じです。',
  }),
  Question.create({
    id: 'q4',
    text: '値オブジェクトが不変である理由として最も適切なものはどれですか？',
    options: [
      { id: 'a', text: 'メモリ使用量を削減するため', isCorrect: false },
      { id: 'b', text: 'データベースへの書き込みを減らすため', isCorrect: false },
      { id: 'c', text: '副作用を防ぎ、コードの予測可能性を高めるため', isCorrect: true },
      { id: 'd', text: 'パフォーマンスを向上させるため', isCorrect: false },
    ],
    explanation: '不変性により、オブジェクトが予期せず変更されることを防ぎ、コードの理解と保守が容易になります。',
  }),
  Question.create({
    id: 'q5',
    text: '値オブジェクトの実装で推奨されるパターンはどれですか？',
    options: [
      { id: 'a', text: 'publicコンストラクタとセッターメソッド', isCorrect: false },
      { id: 'b', text: 'privateコンストラクタとファクトリメソッド（create）', isCorrect: true },
      { id: 'c', text: 'グローバル変数としての定義', isCorrect: false },
      { id: 'd', text: 'シングルトンパターン', isCorrect: false },
    ],
    explanation: 'privateコンストラクタとファクトリメソッドを使うことで、バリデーションを強制し、不正な状態のオブジェクト生成を防ぎます。',
  }),
];

export const sampleQuizzes: Quiz[] = [
  Quiz.create({
    id: QuizId.create('quiz-lesson-5-1'),
    lessonId: LessonId.create('lesson-5-1'),
    title: '値オブジェクトの理解チェック',
    description: '値オブジェクトの特徴と実装パターンについての理解度を確認するクイズです。',
    questions: valueObjectQuestions,
  }),
];

export function getSampleQuizzes(): Quiz[] {
  return sampleQuizzes;
}
