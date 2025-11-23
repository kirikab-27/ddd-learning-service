import { Quiz, Question } from '@/domain/content/models';
import { IQuizRepository } from '@/domain/shared';
import { QuizId, LessonId } from '@/domain/shared';

const sampleQuiz = Quiz.create({
  id: QuizId.create('quiz-lesson-1'),
  lessonId: LessonId.create('lesson-1'),
  title: 'DDD基礎理解度チェック',
  description: 'DDDの基本概念について確認しましょう。',
  questions: [
    Question.create({
      id: 'q1',
      text: 'DDDの主な目的は何ですか？',
      options: [
        { id: 'q1-a', text: 'データベースの最適化', isCorrect: false },
        { id: 'q1-b', text: 'ビジネスドメインの理解を中心に据えた開発', isCorrect: true },
        { id: 'q1-c', text: 'コードの行数を減らすこと', isCorrect: false },
        { id: 'q1-d', text: 'テストカバレッジを100%にすること', isCorrect: false },
      ],
      explanation: 'DDDはビジネスドメインの理解を中心に据えたアプローチです。ドメインエキスパートと開発者が同じ言語で会話し、ビジネスロジックをコードに正確に反映させることを目指します。',
    }),
    Question.create({
      id: 'q2',
      text: 'ユビキタス言語とは何ですか？',
      options: [
        { id: 'q2-a', text: '世界共通のプログラミング言語', isCorrect: false },
        { id: 'q2-b', text: 'チーム全体で共有される、ドメインを表現する共通言語', isCorrect: true },
        { id: 'q2-c', text: '英語でコードを書くこと', isCorrect: false },
        { id: 'q2-d', text: 'コメントを必ず書くこと', isCorrect: false },
      ],
      explanation: 'ユビキタス言語は、開発者とドメインエキスパートが共有する共通言語です。これにより、ビジネス要件の誤解を減らし、コードがビジネスロジックを正確に表現できるようになります。',
    }),
    Question.create({
      id: 'q3',
      text: '境界づけられたコンテキストの目的は何ですか？',
      options: [
        { id: 'q3-a', text: 'コードをファイルごとに分割すること', isCorrect: false },
        { id: 'q3-b', text: 'データベーステーブルを分割すること', isCorrect: false },
        { id: 'q3-c', text: 'ドメインの複雑性を管理可能な範囲に分離すること', isCorrect: true },
        { id: 'q3-d', text: 'APIエンドポイントを制限すること', isCorrect: false },
      ],
      explanation: '境界づけられたコンテキストは、大きなドメインを意味のある境界で分割し、各コンテキスト内でユビキタス言語を一貫して使用できるようにします。',
    }),
  ],
});

const sampleQuiz2 = Quiz.create({
  id: QuizId.create('quiz-lesson-2'),
  lessonId: LessonId.create('lesson-2'),
  title: '値オブジェクト理解度チェック',
  description: '値オブジェクトについて確認しましょう。',
  questions: [
    Question.create({
      id: 'q2-1',
      text: '値オブジェクトの最も重要な特徴はどれですか？',
      options: [
        { id: 'q2-1-a', text: '一意のIDを持つ', isCorrect: false },
        { id: 'q2-1-b', text: '不変である', isCorrect: true },
        { id: 'q2-1-c', text: 'データベースに保存される', isCorrect: false },
        { id: 'q2-1-d', text: 'グローバルにアクセスできる', isCorrect: false },
      ],
      explanation: '値オブジェクトの最も重要な特徴は不変性（Immutability）です。一度作成されたら変更されず、変更が必要な場合は新しいインスタンスを作成します。',
    }),
    Question.create({
      id: 'q2-2',
      text: '値オブジェクトの等価性はどのように判断されますか？',
      options: [
        { id: 'q2-2-a', text: '参照（メモリアドレス）で比較', isCorrect: false },
        { id: 'q2-2-b', text: 'IDで比較', isCorrect: false },
        { id: 'q2-2-c', text: 'すべての属性値で比較', isCorrect: true },
        { id: 'q2-2-d', text: '作成日時で比較', isCorrect: false },
      ],
      explanation: '値オブジェクトはIDを持たず、すべての属性値が等しければ同じとみなされます。これは概念的等価性と呼ばれます。',
    }),
  ],
});

const quizzes: Map<string, Quiz> = new Map([
  ['quiz-lesson-1', sampleQuiz],
  ['quiz-lesson-2', sampleQuiz2],
]);

const quizByLessonId: Map<string, Quiz> = new Map([
  ['lesson-1', sampleQuiz],
  ['lesson-2', sampleQuiz2],
]);

export class InMemoryQuizRepository implements IQuizRepository {
  async findById(id: QuizId): Promise<Quiz | null> {
    return quizzes.get(id.toString()) ?? null;
  }

  async findByLessonId(lessonId: string): Promise<Quiz | null> {
    return quizByLessonId.get(lessonId) ?? null;
  }
}
