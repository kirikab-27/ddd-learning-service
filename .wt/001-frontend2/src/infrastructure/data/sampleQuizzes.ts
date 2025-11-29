import { Quiz } from '@/domain/content/models/Quiz';
import { Question } from '@/domain/content/models/Question';
import { QuizId, LessonId } from '@/domain/shared';

// Lesson 1-1: なぜDDDが必要なのか（5問）
const lesson1_1Questions: Question[] = [
  Question.create({
    id: 'q1-1-1',
    text: 'DDDが解決しようとする主な課題は何ですか？',
    options: [
      { id: 'a', text: 'UIのデザイン問題', isCorrect: false },
      { id: 'b', text: 'データベースの性能問題', isCorrect: false },
      { id: 'c', text: '複雑なビジネスロジックの管理', isCorrect: true },
      { id: 'd', text: 'ネットワーク通信の最適化', isCorrect: false },
    ],
    explanation: 'DDDは複雑なビジネスドメインを扱うソフトウェアの設計手法です。ビジネスロジックの複雑さを整理し、管理しやすくすることを目的としています。',
  }),
  Question.create({
    id: 'q1-1-2',
    text: '「スパゲッティコード」が生まれる主な原因は何ですか？',
    options: [
      { id: 'a', text: 'プログラミング言語の選択ミス', isCorrect: false },
      { id: 'b', text: 'ビジネスルールが適切に整理されていないこと', isCorrect: true },
      { id: 'c', text: 'ハードウェアの性能不足', isCorrect: false },
      { id: 'd', text: 'テストの不足', isCorrect: false },
    ],
    explanation: 'ビジネスルールが散在し、適切に整理されていないと、条件分岐が複雑に絡み合った「スパゲッティコード」が生まれます。',
  }),
  Question.create({
    id: 'q1-1-3',
    text: '技術とビジネスの乖離が引き起こす問題として最も適切なものは？',
    options: [
      { id: 'a', text: 'コンパイルエラーが増える', isCorrect: false },
      { id: 'b', text: 'コミュニケーションエラーや実装ミス', isCorrect: true },
      { id: 'c', text: 'サーバーの負荷が増大する', isCorrect: false },
      { id: 'd', text: 'セキュリティリスクが高まる', isCorrect: false },
    ],
    explanation: '開発者とビジネス側で使う言葉が異なると、要件の誤解や実装ミスにつながります。DDDはこの問題を「ユビキタス言語」で解決します。',
  }),
  Question.create({
    id: 'q1-1-4',
    text: 'DDDの3つの柱に含まれないものはどれですか？',
    options: [
      { id: 'a', text: 'ユビキタス言語', isCorrect: false },
      { id: 'b', text: 'モデル駆動設計', isCorrect: false },
      { id: 'c', text: 'テスト駆動開発', isCorrect: true },
      { id: 'd', text: '境界づけられたコンテキスト', isCorrect: false },
    ],
    explanation: 'DDDの3つの柱は「ユビキタス言語」「モデル駆動設計」「境界づけられたコンテキスト」です。テスト駆動開発（TDD）は別の開発手法です。',
  }),
  Question.create({
    id: 'q1-1-5',
    text: 'DDDを採用するメリットとして正しくないものは？',
    options: [
      { id: 'a', text: 'ビジネスと技術の共通理解が生まれる', isCorrect: false },
      { id: 'b', text: '変更に強い設計ができる', isCorrect: false },
      { id: 'c', text: '開発速度が必ず2倍になる', isCorrect: true },
      { id: 'd', text: 'チームコミュニケーションが改善する', isCorrect: false },
    ],
    explanation: 'DDDは共通理解、変更への強さ、コミュニケーション改善をもたらしますが、開発速度が必ず2倍になるという保証はありません。',
  }),
];

// Lesson 1-2: ドメインエキスパートとの協業（5問）
const lesson1_2Questions: Question[] = [
  Question.create({
    id: 'q1-2-1',
    text: 'ドメインエキスパートとは誰のことですか？',
    options: [
      { id: 'a', text: 'プロジェクトマネージャーのこと', isCorrect: false },
      { id: 'b', text: 'ビジネスドメインについて深い知識を持つ人', isCorrect: true },
      { id: 'c', text: 'シニアエンジニアのこと', isCorrect: false },
      { id: 'd', text: 'データベース管理者のこと', isCorrect: false },
    ],
    explanation: 'ドメインエキスパートは肩書きではなく、ビジネスドメインについて深い知識を持つ人のことです。営業担当者やカスタマーサポートなども含まれます。',
  }),
  Question.create({
    id: 'q1-2-2',
    text: '開発者だけでは把握できないものとして適切でないものは？',
    options: [
      { id: 'a', text: '暗黙のビジネスルール', isCorrect: false },
      { id: 'b', text: 'プログラミング言語の文法', isCorrect: true },
      { id: 'c', text: '例外的なビジネスケース', isCorrect: false },
      { id: 'd', text: 'ルールの優先度', isCorrect: false },
    ],
    explanation: 'プログラミング言語の文法は開発者が把握できますが、暗黙のルール、例外ケース、優先度などはドメインエキスパートとの協業なしには把握できません。',
  }),
  Question.create({
    id: 'q1-2-3',
    text: 'イベントストーミングで最初に書く付箋の内容は？',
    options: [
      { id: 'a', text: 'データベースのテーブル名', isCorrect: false },
      { id: 'b', text: 'ビジネスで起きるイベント', isCorrect: true },
      { id: 'c', text: 'クラス名', isCorrect: false },
      { id: 'd', text: 'API エンドポイント', isCorrect: false },
    ],
    explanation: 'イベントストーミングでは、まず「注文が確定された」「支払いが完了した」などのビジネスイベントをオレンジ色の付箋に書きます。',
  }),
  Question.create({
    id: 'q1-2-4',
    text: 'ホワイトボードセッションで重要なポイントは？',
    options: [
      { id: 'a', text: 'きれいな図を描くこと', isCorrect: false },
      { id: 'b', text: '図を描きながら会話し、深掘りすること', isCorrect: true },
      { id: 'c', text: 'できるだけ短時間で終わらせること', isCorrect: false },
      { id: 'd', text: '開発者だけで行うこと', isCorrect: false },
    ],
    explanation: 'ホワイトボードセッションでは、図を描きながら「それは具体的にどういうことですか？」と深掘りし、ドメインエキスパートと認識を合わせることが重要です。',
  }),
  Question.create({
    id: 'q1-2-5',
    text: 'ユビキタス言語の用語集について正しいものは？',
    options: [
      { id: 'a', text: '英語で書く必要がある', isCorrect: false },
      { id: 'b', text: '開発者だけが参照する', isCorrect: false },
      { id: 'c', text: '用語をそのままコードに反映させる', isCorrect: true },
      { id: 'd', text: '一度作ったら変更してはいけない', isCorrect: false },
    ],
    explanation: 'ユビキタス言語の用語集に定義した言葉は、そのままメソッド名やクラス名として使用します。これにより、コードがビジネスの言葉で書かれます。',
  }),
];

// Lesson 1-3: ドメインモデルの役割（5問）
const lesson1_3Questions: Question[] = [
  Question.create({
    id: 'q1-3-1',
    text: 'モデルとは何ですか？',
    options: [
      { id: 'a', text: '現実世界の完全なコピー', isCorrect: false },
      { id: 'b', text: '現実世界を目的に応じて簡略化した表現', isCorrect: true },
      { id: 'c', text: 'データベースのテーブル設計', isCorrect: false },
      { id: 'd', text: 'UIのデザイン案', isCorrect: false },
    ],
    explanation: 'モデルは現実世界の完全なコピーではなく、目的に応じて必要な部分を抽出し簡略化した表現です。地図や組織図もモデルの例です。',
  }),
  Question.create({
    id: 'q1-3-2',
    text: 'ドメインモデルの目的として適切でないものは？',
    options: [
      { id: 'a', text: '複雑さの整理', isCorrect: false },
      { id: 'b', text: 'コミュニケーションの基盤', isCorrect: false },
      { id: 'c', text: 'データベースの高速化', isCorrect: true },
      { id: 'd', text: '設計の指針', isCorrect: false },
    ],
    explanation: 'ドメインモデルの目的は、複雑さの整理、コミュニケーションの基盤、設計の指針です。データベースの高速化は直接の目的ではありません。',
  }),
  Question.create({
    id: 'q1-3-3',
    text: 'ドメインモデルを表現する方法として含まれないものは？',
    options: [
      { id: 'a', text: 'UML図', isCorrect: false },
      { id: 'b', text: 'コード', isCorrect: false },
      { id: 'c', text: '用語集', isCorrect: false },
      { id: 'd', text: 'ガントチャート', isCorrect: true },
    ],
    explanation: 'ドメインモデルはUML図、コード、用語集で表現できます。ガントチャートはプロジェクトのスケジュール管理に使うもので、ドメインモデルの表現方法ではありません。',
  }),
  Question.create({
    id: 'q1-3-4',
    text: 'コードでドメインモデルを表現するメリットは？',
    options: [
      { id: 'a', text: '誰でも読みやすい', isCorrect: false },
      { id: 'b', text: '最も正確で実行可能', isCorrect: true },
      { id: 'c', text: 'メンテナンスが不要', isCorrect: false },
      { id: 'd', text: '変更されることがない', isCorrect: false },
    ],
    explanation: 'コードはドメインモデルの最も正確な表現であり、実際に実行できます。ただし、非エンジニアには読みにくいという注意点もあります。',
  }),
  Question.create({
    id: 'q1-3-5',
    text: 'ドメインモデルについて正しい記述は？',
    options: [
      { id: 'a', text: '一度作ったら変更すべきでない', isCorrect: false },
      { id: 'b', text: '継続的に改善されるべきもの', isCorrect: true },
      { id: 'c', text: '開発の最後に作成する', isCorrect: false },
      { id: 'd', text: 'UIの設計が完了してから作る', isCorrect: false },
    ],
    explanation: 'ドメインモデルはビジネスの理解が深まるにつれて進化します。「最初のモデルは間違っている。重要なのは改善し続けること」というEric Evansの言葉があります。',
  }),
];

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
  // Chapter 1: ドメインとは何か
  Quiz.create({
    id: QuizId.create('quiz-lesson-1-1'),
    lessonId: LessonId.create('lesson-1-1'),
    title: 'なぜDDDが必要なのか - 理解度チェック',
    description: 'DDDの必要性とメリットについての理解度を確認するクイズです。',
    questions: lesson1_1Questions,
  }),
  Quiz.create({
    id: QuizId.create('quiz-lesson-1-2'),
    lessonId: LessonId.create('lesson-1-2'),
    title: 'ドメインエキスパートとの協業 - 理解度チェック',
    description: 'ドメインエキスパートとの協業方法についての理解度を確認するクイズです。',
    questions: lesson1_2Questions,
  }),
  Quiz.create({
    id: QuizId.create('quiz-lesson-1-3'),
    lessonId: LessonId.create('lesson-1-3'),
    title: 'ドメインモデルの役割 - 理解度チェック',
    description: 'ドメインモデルの役割と表現方法についての理解度を確認するクイズです。',
    questions: lesson1_3Questions,
  }),
  // 既存のクイズ
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
