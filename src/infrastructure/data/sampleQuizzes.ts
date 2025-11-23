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

// =============================================================================
// Chapter 2: ユビキタス言語
// =============================================================================

// Lesson 2-1: ユビキタス言語とは（5問）
const lesson2_1Questions: Question[] = [
  Question.create({
    id: 'q2-1-1',
    text: 'ユビキタス言語とは何ですか？',
    options: [
      { id: 'a', text: 'プログラミング言語の一種', isCorrect: false },
      { id: 'b', text: 'チーム全員が使う共通のドメイン言語', isCorrect: true },
      { id: 'c', text: '英語のこと', isCorrect: false },
      { id: 'd', text: 'データベース設計用語', isCorrect: false },
    ],
    explanation: 'ユビキタス言語は、ドメインエキスパートと開発者が共通で使うドメイン固有の言語です。',
  }),
  Question.create({
    id: 'q2-1-2',
    text: 'ユビキタス言語がない場合に起きる問題として適切でないものは？',
    options: [
      { id: 'a', text: 'コミュニケーションエラー', isCorrect: false },
      { id: 'b', text: '実装ミス', isCorrect: false },
      { id: 'c', text: 'コンパイルエラー', isCorrect: true },
      { id: 'd', text: 'ドキュメントとコードの乖離', isCorrect: false },
    ],
    explanation: 'ユビキタス言語がないと、コミュニケーションエラー、実装ミス、乖離が生じますが、コンパイルエラーは言語の問題ではありません。',
  }),
  Question.create({
    id: 'q2-1-3',
    text: 'ユビキタス言語の特徴として正しくないものは？',
    options: [
      { id: 'a', text: 'ドメイン固有である', isCorrect: false },
      { id: 'b', text: '一度決めたら変更しない', isCorrect: true },
      { id: 'c', text: 'コードに反映される', isCorrect: false },
      { id: 'd', text: '進化する', isCorrect: false },
    ],
    explanation: 'ユビキタス言語はビジネスの理解が深まるにつれて進化します。固定されたものではありません。',
  }),
  Question.create({
    id: 'q2-1-4',
    text: 'ユビキタス言語を使用するべき人として含まれないのは？',
    options: [
      { id: 'a', text: 'ドメインエキスパート', isCorrect: false },
      { id: 'b', text: '開発者', isCorrect: false },
      { id: 'c', text: 'プロジェクトマネージャー', isCorrect: false },
      { id: 'd', text: '競合他社の社員', isCorrect: true },
    ],
    explanation: 'ユビキタス言語はプロジェクトに関わる全員（ドメインエキスパート、開発者、PM、QAなど）が使います。',
  }),
  Question.create({
    id: 'q2-1-5',
    text: 'ドキュメントとコードの乖離とはどういう状態ですか？',
    options: [
      { id: 'a', text: 'ドキュメントが多すぎる状態', isCorrect: false },
      { id: 'b', text: '仕様書の用語とコードの命名が異なる状態', isCorrect: true },
      { id: 'c', text: 'コードにコメントがない状態', isCorrect: false },
      { id: 'd', text: 'テストがない状態', isCorrect: false },
    ],
    explanation: '仕様書では「ユーザー」と書いてあるのに、コードではUser、Customer、Accountなどが混在している状態が乖離の例です。',
  }),
];

// Lesson 2-2: チームで共通言語を作る（5問）
const lesson2_2Questions: Question[] = [
  Question.create({
    id: 'q2-2-1',
    text: '用語集に含めるべき項目として適切でないものは？',
    options: [
      { id: 'a', text: '用語の定義', isCorrect: false },
      { id: 'b', text: '同義語', isCorrect: false },
      { id: 'c', text: '担当者の名前', isCorrect: true },
      { id: 'd', text: 'コードでの表現', isCorrect: false },
    ],
    explanation: '用語集には用語、定義、同義語、反例、コード表現を含めます。担当者の名前は用語集の項目ではありません。',
  }),
  Question.create({
    id: 'q2-2-2',
    text: '用語集の管理方法として推奨されるのは？',
    options: [
      { id: 'a', text: '紙に印刷して保管する', isCorrect: false },
      { id: 'b', text: 'Gitでバージョン管理する', isCorrect: true },
      { id: 'c', text: '口頭で伝える', isCorrect: false },
      { id: 'd', text: '一人だけが管理する', isCorrect: false },
    ],
    explanation: '用語集はGitでバージョン管理し、変更履歴を追跡することが推奨されます。',
  }),
  Question.create({
    id: 'q2-2-3',
    text: 'ホワイトボードセッションで重要なことは？',
    options: [
      { id: 'a', text: 'きれいな図を描くこと', isCorrect: false },
      { id: 'b', text: '図を描きながら対話し、認識を合わせること', isCorrect: true },
      { id: 'c', text: 'できるだけ短時間で終わらせること', isCorrect: false },
      { id: 'd', text: '開発者だけで行うこと', isCorrect: false },
    ],
    explanation: 'ホワイトボードセッションでは、きれいな図より、対話を通じて認識を合わせることが重要です。',
  }),
  Question.create({
    id: 'q2-2-4',
    text: '「商品」という曖昧な表現を洗練する例として適切なのは？',
    options: [
      { id: 'a', text: 'ProductA、ProductB、ProductCに分ける', isCorrect: false },
      { id: 'b', text: 'Product（カタログ）、OrderItem（注文明細）、InventoryItem（在庫）に分ける', isCorrect: true },
      { id: 'c', text: '商品1、商品2、商品3に分ける', isCorrect: false },
      { id: 'd', text: 'すべてItemに統一する', isCorrect: false },
    ],
    explanation: '曖昧な「商品」を、用途に応じてProduct、OrderItem、InventoryItemなど明確な概念に分けます。',
  }),
  Question.create({
    id: 'q2-2-5',
    text: 'コンテキストの明確化が必要な理由は？',
    options: [
      { id: 'a', text: 'コードを短くするため', isCorrect: false },
      { id: 'b', text: '同じ言葉でもコンテキストによって意味が異なるため', isCorrect: true },
      { id: 'c', text: 'データベースを正規化するため', isCorrect: false },
      { id: 'd', text: 'テストを書きやすくするため', isCorrect: false },
    ],
    explanation: '「顧客」という言葉も、営業、配送、請求の各コンテキストで異なる意味を持つことがあります。',
  }),
];

// Lesson 2-3: コードに反映する（5問）
const lesson2_3Questions: Question[] = [
  Question.create({
    id: 'q2-3-1',
    text: 'クラス名の命名として適切なのは？',
    options: [
      { id: 'a', text: 'OrderData', isCorrect: false },
      { id: 'b', text: 'Order', isCorrect: true },
      { id: 'c', text: 'OrderManager', isCorrect: false },
      { id: 'd', text: 'OrderInfo', isCorrect: false },
    ],
    explanation: 'ドメインの概念をそのままクラス名にします。Data、Manager、Infoなどの接尾辞は避けます。',
  }),
  Question.create({
    id: 'q2-3-2',
    text: 'メソッド名として適切なのは？',
    options: [
      { id: 'a', text: 'setStatus()', isCorrect: false },
      { id: 'b', text: 'process()', isCorrect: false },
      { id: 'c', text: 'confirm()', isCorrect: true },
      { id: 'd', text: 'update()', isCorrect: false },
    ],
    explanation: 'ビジネスアクション（確定する→confirm）をそのままメソッド名にします。技術的な名前は避けます。',
  }),
  Question.create({
    id: 'q2-3-3',
    text: 'ユビキタス言語が反映されていないコードの特徴は？',
    options: [
      { id: 'a', text: 'マジックナンバーを使用している', isCorrect: true },
      { id: 'b', text: 'テストが書かれている', isCorrect: false },
      { id: 'c', text: 'TypeScriptで書かれている', isCorrect: false },
      { id: 'd', text: 'クラスが分割されている', isCorrect: false },
    ],
    explanation: 'status = 1 のようなマジックナンバーは、ビジネスの意味が分からない悪い例です。',
  }),
  Question.create({
    id: 'q2-3-4',
    text: 'リファクタリングの正しい進め方は？',
    options: [
      { id: 'a', text: '一度に全ての命名を変更する', isCorrect: false },
      { id: 'b', text: 'テストを書き、段階的に命名を変更する', isCorrect: true },
      { id: 'c', text: 'ドキュメントだけ更新する', isCorrect: false },
      { id: 'd', text: 'コメントで補足する', isCorrect: false },
    ],
    explanation: 'リファクタリングはテストで動作を保証しながら、小さな変更を積み重ねて進めます。',
  }),
  Question.create({
    id: 'q2-3-5',
    text: 'ドメイン用語をコードに反映するメリットとして正しいのは？',
    options: [
      { id: 'a', text: 'コンパイルが速くなる', isCorrect: false },
      { id: 'b', text: 'コードの可読性と保守性が向上する', isCorrect: true },
      { id: 'c', text: 'メモリ使用量が減る', isCorrect: false },
      { id: 'd', text: 'ファイルサイズが小さくなる', isCorrect: false },
    ],
    explanation: 'ユビキタス言語をコードに反映することで、コードがビジネスの言葉で書かれ、可読性と保守性が向上します。',
  }),
];

// =============================================================================
// Chapter 5: 値オブジェクト
// =============================================================================

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
  // Chapter 2: ユビキタス言語
  Quiz.create({
    id: QuizId.create('quiz-lesson-2-1'),
    lessonId: LessonId.create('lesson-2-1'),
    title: 'ユビキタス言語とは - 理解度チェック',
    description: 'ユビキタス言語の定義と特徴についての理解度を確認するクイズです。',
    questions: lesson2_1Questions,
  }),
  Quiz.create({
    id: QuizId.create('quiz-lesson-2-2'),
    lessonId: LessonId.create('lesson-2-2'),
    title: 'チームで共通言語を作る - 理解度チェック',
    description: '用語集の作成とモデリングワークショップについての理解度を確認するクイズです。',
    questions: lesson2_2Questions,
  }),
  Quiz.create({
    id: QuizId.create('quiz-lesson-2-3'),
    lessonId: LessonId.create('lesson-2-3'),
    title: 'コードに反映する - 理解度チェック',
    description: 'ユビキタス言語をコードに反映する方法についての理解度を確認するクイズです。',
    questions: lesson2_3Questions,
  }),
  // Chapter 5: 値オブジェクト
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
