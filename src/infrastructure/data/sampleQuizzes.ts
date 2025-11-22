import { Quiz } from '@/domain/content/models/Quiz';
import { Question } from '@/domain/content/models/Question';
import { QuizId, LessonId } from '@/domain/shared';

// DDD基礎理解クイズ（レッスン1用、5問）
const dddBasicsQuestions: Question[] = [
  Question.create({
    id: 'q1',
    text: 'DDDの主な目的は何ですか？',
    options: [
      { id: 'a', text: 'コードを短く書くこと', isCorrect: false },
      { id: 'b', text: 'ビジネスドメインの理解を中心に据えた設計', isCorrect: true },
      { id: 'c', text: 'データベース設計を最適化すること', isCorrect: false },
      { id: 'd', text: 'UIを美しくすること', isCorrect: false },
    ],
    explanation: 'DDDはビジネスドメインの理解を中心に据え、ドメインエキスパートと開発者が共通言語で会話することを重視します。',
  }),
  Question.create({
    id: 'q2',
    text: 'DDDにおける「ユビキタス言語」とは何ですか？',
    options: [
      { id: 'a', text: 'プログラミング言語のこと', isCorrect: false },
      { id: 'b', text: '英語のような国際共通語', isCorrect: false },
      { id: 'c', text: 'ドメインエキスパートと開発者が共有する共通の用語体系', isCorrect: true },
      { id: 'd', text: 'データベースのクエリ言語', isCorrect: false },
    ],
    explanation: 'ユビキタス言語は、ドメインエキスパートと開発者の間でドメインについて議論する際に使われる共通の言葉です。コードにも同じ用語を使用します。',
  }),
  Question.create({
    id: 'q3',
    text: 'DDDにおける「エンティティ」の特徴として正しいものはどれですか？',
    options: [
      { id: 'a', text: '属性の値のみで識別される', isCorrect: false },
      { id: 'b', text: '一意の識別子（ID）を持ち、ライフサイクルを通じて同一性を保つ', isCorrect: true },
      { id: 'c', text: '状態を持たない純粋な関数の集まり', isCorrect: false },
      { id: 'd', text: 'データベースのテーブルと1対1で対応する', isCorrect: false },
    ],
    explanation: 'エンティティは一意の識別子を持ち、その属性が変化しても同一のオブジェクトとして扱われます。例えば、ユーザーの名前が変わっても同じユーザーです。',
  }),
  Question.create({
    id: 'q4',
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
    id: 'q5',
    text: 'DDDにおける「集約」の役割として最も適切なものはどれですか？',
    options: [
      { id: 'a', text: 'UIコンポーネントをグループ化する', isCorrect: false },
      { id: 'b', text: 'データの整合性を保つための境界を定義し、トランザクションの単位となる', isCorrect: true },
      { id: 'c', text: 'データベースのインデックスを最適化する', isCorrect: false },
      { id: 'd', text: 'ネットワーク通信を効率化する', isCorrect: false },
    ],
    explanation: '集約は関連するエンティティと値オブジェクトをグループ化し、データの整合性を保証する境界を定義します。集約ルートを通じてのみアクセスされます。',
  }),
];

export const sampleQuizzes: Quiz[] = [
  Quiz.create({
    id: QuizId.create('quiz-lesson-1'),
    lessonId: LessonId.create('lesson-1'),
    title: 'DDDの基礎理解チェック',
    description: 'DDDの基本概念についての理解度を確認するクイズです。',
    questions: dddBasicsQuestions,
  }),
];

export function getSampleQuizzes(): Quiz[] {
  return sampleQuizzes;
}
