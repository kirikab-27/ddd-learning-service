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
// Chapter 3: 境界づけられたコンテキスト
// =============================================================================

// Lesson 3-1: コンテキストとは何か（5問）
const lesson3_1Questions: Question[] = [
  Question.create({
    id: 'q3-1-1',
    text: '境界づけられたコンテキストとは何ですか？',
    options: [
      { id: 'a', text: 'プログラミング言語の境界', isCorrect: false },
      { id: 'b', text: 'モデルとユビキタス言語が一貫して適用される範囲', isCorrect: true },
      { id: 'c', text: 'データベースのスキーマ', isCorrect: false },
      { id: 'd', text: 'ネットワークの境界', isCorrect: false },
    ],
    explanation: '境界づけられたコンテキストは、特定のモデルとユビキタス言語が一貫して適用される明確な境界を持つ領域です。',
  }),
  Question.create({
    id: 'q3-1-2',
    text: '境界が必要な理由として適切でないものは？',
    options: [
      { id: 'a', text: '言語の衝突を防ぐため', isCorrect: false },
      { id: 'b', text: '複雑さを分離するため', isCorrect: false },
      { id: 'c', text: 'コードの行数を減らすため', isCorrect: true },
      { id: 'd', text: 'チームの自律性を確保するため', isCorrect: false },
    ],
    explanation: '境界は言語の衝突防止、複雑さの分離、チームの自律性確保のために必要です。コード行数の削減は目的ではありません。',
  }),
  Question.create({
    id: 'q3-1-3',
    text: 'ECサイトで「商品」が異なる意味を持つコンテキストの例として正しいのは？',
    options: [
      { id: 'a', text: 'カタログ：名前・説明、在庫：SKU・在庫数', isCorrect: true },
      { id: 'b', text: 'すべてのコンテキストで同じ意味', isCorrect: false },
      { id: 'c', text: '商品という概念は1つのコンテキストにのみ存在する', isCorrect: false },
      { id: 'd', text: 'コンテキストごとに異なる商品を扱う', isCorrect: false },
    ],
    explanation: '同じ「商品」でも、カタログでは名前・説明・画像、在庫ではSKU・在庫数・倉庫位置など、コンテキストによって異なる属性が重要になります。',
  }),
  Question.create({
    id: 'q3-1-4',
    text: '境界がない場合に起きる問題は？',
    options: [
      { id: 'a', text: 'クラスが肥大化し責務が不明確になる', isCorrect: true },
      { id: 'b', text: 'コンパイル時間が短くなる', isCorrect: false },
      { id: 'c', text: 'テストが書きやすくなる', isCorrect: false },
      { id: 'd', text: 'チーム間の連携が不要になる', isCorrect: false },
    ],
    explanation: '境界がないとクラスが肥大化し、責務が不明確になり、変更が困難になります。',
  }),
  Question.create({
    id: 'q3-1-5',
    text: 'コンテキスト内でのユビキタス言語について正しいのは？',
    options: [
      { id: 'a', text: 'コンテキストごとに異なる言語を使う', isCorrect: false },
      { id: 'b', text: '同じ言葉は常に同じ意味を持つ', isCorrect: true },
      { id: 'c', text: '技術用語のみを使用する', isCorrect: false },
      { id: 'd', text: '英語で統一する', isCorrect: false },
    ],
    explanation: 'コンテキスト内では、ユビキタス言語により同じ言葉は常に同じ意味で使われます。',
  }),
];

// Lesson 3-2: コンテキストの見つけ方（5問）
const lesson3_2Questions: Question[] = [
  Question.create({
    id: 'q3-2-1',
    text: 'コンテキストを見つけるための分析パターンとして適切でないものは？',
    options: [
      { id: 'a', text: '言語の違いに注目する', isCorrect: false },
      { id: 'b', text: 'ビジネスプロセスの境界を探す', isCorrect: false },
      { id: 'c', text: 'データベースのテーブル数で決める', isCorrect: true },
      { id: 'd', text: 'チーム構造との関連を見る', isCorrect: false },
    ],
    explanation: 'コンテキストは言語の違い、ビジネスプロセスの境界、チーム構造から見つけます。データベースのテーブル数は基準になりません。',
  }),
  Question.create({
    id: 'q3-2-2',
    text: 'コンウェイの法則とは何ですか？',
    options: [
      { id: 'a', text: 'コードの品質は時間とともに低下する法則', isCorrect: false },
      { id: 'b', text: '組織構造がシステム構造に影響を与える法則', isCorrect: true },
      { id: 'c', text: 'バグの数はコード行数に比例する法則', isCorrect: false },
      { id: 'd', text: 'テストカバレッジに関する法則', isCorrect: false },
    ],
    explanation: 'コンウェイの法則は、組織のコミュニケーション構造がシステムの設計に反映されることを示しています。',
  }),
  Question.create({
    id: 'q3-2-3',
    text: 'コンテキストの境界の適切なサイズは？',
    options: [
      { id: 'a', text: 'できるだけ大きくする', isCorrect: false },
      { id: 'b', text: 'できるだけ小さくする', isCorrect: false },
      { id: 'c', text: '独立して開発・デプロイ可能な単位', isCorrect: true },
      { id: 'd', text: 'データベーステーブルごと', isCorrect: false },
    ],
    explanation: 'コンテキストは大きすぎず小さすぎず、独立して開発・デプロイ可能な単位が適切です。',
  }),
  Question.create({
    id: 'q3-2-4',
    text: '境界を決める際に考慮すべきことは？',
    options: [
      { id: 'a', text: 'プログラミング言語の種類', isCorrect: false },
      { id: 'b', text: '変更の頻度とチームの責任範囲', isCorrect: true },
      { id: 'c', text: 'サーバーの台数', isCorrect: false },
      { id: 'd', text: 'ファイルの拡張子', isCorrect: false },
    ],
    explanation: '頻繁に一緒に変更されるものは同じコンテキストに、チームが責任を持てる範囲で境界を決めます。',
  }),
  Question.create({
    id: 'q3-2-5',
    text: 'イベントストーミングでコンテキストを見つける手順として正しいのは？',
    options: [
      { id: 'a', text: 'クラス図を描く → テーブル設計 → API設計', isCorrect: false },
      { id: 'b', text: 'ドメインイベント → コマンド/アクター → 集約 → 境界', isCorrect: true },
      { id: 'c', text: 'UI設計 → DB設計 → バックエンド実装', isCorrect: false },
      { id: 'd', text: 'テスト作成 → 実装 → リファクタリング', isCorrect: false },
    ],
    explanation: 'イベントストーミングでは、まずドメインイベントを洗い出し、コマンドとアクターを追加し、集約を特定してから境界を引きます。',
  }),
];

// Lesson 3-3: コンテキスト間の関係（5問）
const lesson3_3Questions: Question[] = [
  Question.create({
    id: 'q3-3-1',
    text: '上流/下流の関係について正しいのは？',
    options: [
      { id: 'a', text: '下流の変更が上流に影響する', isCorrect: false },
      { id: 'b', text: '上流の変更が下流に影響する', isCorrect: true },
      { id: 'c', text: '相互に影響し合う', isCorrect: false },
      { id: 'd', text: '影響関係はない', isCorrect: false },
    ],
    explanation: '上流コンテキストの変更は下流に影響しますが、下流の変更は上流に影響しません。',
  }),
  Question.create({
    id: 'q3-3-2',
    text: '共有カーネル（Shared Kernel）の使用場面として適切なのは？',
    options: [
      { id: 'a', text: '外部システムとの連携', isCorrect: false },
      { id: 'b', text: '密接に連携するチーム間での共通概念の共有', isCorrect: true },
      { id: 'c', text: 'レガシーシステムの置き換え', isCorrect: false },
      { id: 'd', text: '独立性を重視する場合', isCorrect: false },
    ],
    explanation: '共有カーネルは、密接に連携するチーム間でMoneyやAddressなどの共通概念を共有する場合に使います。',
  }),
  Question.create({
    id: 'q3-3-3',
    text: '腐敗防止層（Anti-Corruption Layer）の目的は？',
    options: [
      { id: 'a', text: 'データベースのセキュリティ強化', isCorrect: false },
      { id: 'b', text: '外部システムの影響から自分のモデルを守る', isCorrect: true },
      { id: 'c', text: 'ネットワーク通信の暗号化', isCorrect: false },
      { id: 'd', text: 'コードの圧縮', isCorrect: false },
    ],
    explanation: '腐敗防止層は、外部システムやレガシーシステムのモデルが自分のモデルに「腐敗」として入り込むのを防ぎます。',
  }),
  Question.create({
    id: 'q3-3-4',
    text: '公開ホストサービス（Open Host Service）はどのような場面で使いますか？',
    options: [
      { id: 'a', text: 'チーム内部での通信', isCorrect: false },
      { id: 'b', text: '複数のコンテキストに同じサービスを提供する場合', isCorrect: true },
      { id: 'c', text: 'データベースの共有', isCorrect: false },
      { id: 'd', text: 'コードの共有', isCorrect: false },
    ],
    explanation: '公開ホストサービスは、明確なAPIを定義して複数の消費者コンテキストにサービスを提供する場合に使います。',
  }),
  Question.create({
    id: 'q3-3-5',
    text: 'コンテキストマップとは何ですか？',
    options: [
      { id: 'a', text: 'データベースのER図', isCorrect: false },
      { id: 'b', text: 'コンテキスト間の関係を図示したもの', isCorrect: true },
      { id: 'c', text: 'クラスの継承関係図', isCorrect: false },
      { id: 'd', text: 'ネットワーク構成図', isCorrect: false },
    ],
    explanation: 'コンテキストマップは、システム内の全コンテキストとその関係（上流/下流、統合パターンなど）を可視化した図です。',
  }),
];

// =============================================================================
// Chapter 4: コンテキストマップ
// =============================================================================

// Lesson 4-1: コンテキストマップとは（5問）
const lesson4_1Questions: Question[] = [
  Question.create({
    id: 'q4-1-1',
    text: 'コンテキストマップとは何ですか？',
    options: [
      { id: 'a', text: 'データベースのER図', isCorrect: false },
      { id: 'b', text: '境界づけられたコンテキスト間の関係を可視化した図', isCorrect: true },
      { id: 'c', text: 'クラスの継承関係図', isCorrect: false },
      { id: 'd', text: 'ネットワーク構成図', isCorrect: false },
    ],
    explanation: 'コンテキストマップは、システム内の全ての境界づけられたコンテキストとその関係を俯瞰的に可視化した図です。',
  }),
  Question.create({
    id: 'q4-1-2',
    text: 'コンテキストマップを作成する主な目的として適切でないものは？',
    options: [
      { id: 'a', text: 'システムの全体像を把握する', isCorrect: false },
      { id: 'b', text: '統合ポイントを明確にする', isCorrect: false },
      { id: 'c', text: 'データベースのパフォーマンスを最適化する', isCorrect: true },
      { id: 'd', text: 'チーム間の関係を可視化する', isCorrect: false },
    ],
    explanation: 'コンテキストマップの目的は全体像の把握、統合ポイントの明確化、チーム関係の可視化です。データベースパフォーマンス最適化は目的ではありません。',
  }),
  Question.create({
    id: 'q4-1-3',
    text: 'コンテキストマップで表現される「上流/下流」の関係について正しいのは？',
    options: [
      { id: 'a', text: '上流はデータを受け取る側', isCorrect: false },
      { id: 'b', text: '上流は影響を与える側、下流は影響を受ける側', isCorrect: true },
      { id: 'c', text: '上流と下流は相互に影響し合う', isCorrect: false },
      { id: 'd', text: '物理的なサーバーの配置を表す', isCorrect: false },
    ],
    explanation: 'コンテキストマップでの上流/下流は依存の方向を示し、上流の変更は下流に影響しますが、逆は成り立ちません。',
  }),
  Question.create({
    id: 'q4-1-4',
    text: 'コンテキストマップに含めるべき情報として適切でないものは？',
    options: [
      { id: 'a', text: '境界づけられたコンテキスト', isCorrect: false },
      { id: 'b', text: 'コンテキスト間の統合パターン', isCorrect: false },
      { id: 'c', text: '各クラスのメソッド一覧', isCorrect: true },
      { id: 'd', text: 'チームの責任範囲', isCorrect: false },
    ],
    explanation: 'コンテキストマップはコンテキスト、統合パターン、チーム責任範囲を表現しますが、クラスの詳細は含めません。',
  }),
  Question.create({
    id: 'q4-1-5',
    text: 'コンテキストマップの作成タイミングとして最も適切なのは？',
    options: [
      { id: 'a', text: 'コーディングが完了した後', isCorrect: false },
      { id: 'b', text: 'プロジェクト初期から作成し、継続的に更新する', isCorrect: true },
      { id: 'c', text: 'リリース直前に一度だけ作成する', isCorrect: false },
      { id: 'd', text: 'テスト工程で作成する', isCorrect: false },
    ],
    explanation: 'コンテキストマップはプロジェクト初期に現状を把握するために作成し、システムの進化に合わせて継続的に更新します。',
  }),
];

// Lesson 4-2: 統合パターン（5問）
const lesson4_2Questions: Question[] = [
  Question.create({
    id: 'q4-2-1',
    text: 'パートナーシップ（Partnership）パターンの特徴は？',
    options: [
      { id: 'a', text: '一方が他方に従う関係', isCorrect: false },
      { id: 'b', text: '2つのチームが対等な関係で協力し、相互に調整する', isCorrect: true },
      { id: 'c', text: '外部システムとの連携に使用する', isCorrect: false },
      { id: 'd', text: '翻訳層を設けて通信する', isCorrect: false },
    ],
    explanation: 'パートナーシップは2つのチームが対等な立場で協力し、インターフェースの変更を相互に調整するパターンです。',
  }),
  Question.create({
    id: 'q4-2-2',
    text: '共有カーネル（Shared Kernel）を使用する際の注意点は？',
    options: [
      { id: 'a', text: 'できるだけ多くの概念を共有する', isCorrect: false },
      { id: 'b', text: '共有部分は最小限に保ち、変更には関係者全員の合意が必要', isCorrect: true },
      { id: 'c', text: '一方のチームだけが変更できる', isCorrect: false },
      { id: 'd', text: '外部ライブラリとして公開する', isCorrect: false },
    ],
    explanation: '共有カーネルは便利ですが、変更時に全チームへの影響があるため、共有部分は最小限に保つべきです。',
  }),
  Question.create({
    id: 'q4-2-3',
    text: '腐敗防止層（Anti-Corruption Layer）を使用すべき場面は？',
    options: [
      { id: 'a', text: '新規システムの開発時', isCorrect: false },
      { id: 'b', text: 'レガシーシステムや外部システムとの連携時', isCorrect: true },
      { id: 'c', text: 'チーム内のコミュニケーション改善', isCorrect: false },
      { id: 'd', text: 'データベース設計時', isCorrect: false },
    ],
    explanation: 'ACLは、レガシーシステムや外部システムの不適切なモデルが自分のモデルに「腐敗」として入り込むのを防ぐために使います。',
  }),
  Question.create({
    id: 'q4-2-4',
    text: '公開ホストサービス（Open Host Service）と公開言語（Published Language）の関係は？',
    options: [
      { id: 'a', text: '全く別の概念で関連がない', isCorrect: false },
      { id: 'b', text: 'OHSがAPIを提供し、PLがそのデータ形式を定義する', isCorrect: true },
      { id: 'c', text: 'PLがOHSの代替手段である', isCorrect: false },
      { id: 'd', text: 'OHSは下流、PLは上流のパターン', isCorrect: false },
    ],
    explanation: 'OHSは明確なAPIを提供し、PLはそのAPIで使用される標準化されたデータ形式（JSON Schema、Protocol Buffersなど）を定義します。',
  }),
  Question.create({
    id: 'q4-2-5',
    text: '順応者（Conformist）パターンを選択する状況として適切なのは？',
    options: [
      { id: 'a', text: '上流チームが協力的で変更に応じてくれる場合', isCorrect: false },
      { id: 'b', text: '上流のモデルに従うことが合理的で、翻訳コストが高い場合', isCorrect: true },
      { id: 'c', text: '自チームのモデルを最優先したい場合', isCorrect: false },
      { id: 'd', text: '外部システムと連携する場合', isCorrect: false },
    ],
    explanation: '順応者は、上流のモデルが十分に良く、独自モデルの構築や翻訳層のコストが見合わない場合に選択します。',
  }),
];

// =============================================================================
// Chapter 5: 値オブジェクト
// =============================================================================

// Lesson 5-1: 値オブジェクトとは（5問）
const lesson5_1Questions: Question[] = [
  Question.create({
    id: 'q5-1-1',
    text: '値オブジェクトの特徴として正しいものはどれですか？',
    options: [
      { id: 'a', text: '一意のIDで識別される', isCorrect: false },
      { id: 'b', text: '可変（ミュータブル）である', isCorrect: false },
      { id: 'c', text: '属性の値によって同一性が決まり、不変である', isCorrect: true },
      { id: 'd', text: '必ずデータベースに永続化される', isCorrect: false },
    ],
    explanation: '値オブジェクトはその属性の値によって同一性が決まります。例えば「1000円」という金額は、別の「1000円」と同じ価値を持ちます。',
  }),
  Question.create({
    id: 'q5-1-2',
    text: '値オブジェクトとエンティティの違いとして正しいのは？',
    options: [
      { id: 'a', text: 'エンティティは値で比較し、値オブジェクトはIDで比較する', isCorrect: false },
      { id: 'b', text: '値オブジェクトは不変で、エンティティは状態が変化しうる', isCorrect: true },
      { id: 'c', text: 'エンティティはプリミティブ型のラッパーである', isCorrect: false },
      { id: 'd', text: '値オブジェクトはデータベースに保存できない', isCorrect: false },
    ],
    explanation: '値オブジェクトは不変で属性の値で比較します。エンティティはIDで識別され、状態が変化することがあります。',
  }),
  Question.create({
    id: 'q5-1-3',
    text: '値オブジェクトを使うべき場面として最も適切なものは？',
    options: [
      { id: 'a', text: 'ユーザーアカウントの管理', isCorrect: false },
      { id: 'b', text: '金額や住所など、計測や定量化を行う場合', isCorrect: true },
      { id: 'c', text: 'データベースのテーブル設計', isCorrect: false },
      { id: 'd', text: 'UIコンポーネントの状態管理', isCorrect: false },
    ],
    explanation: '値オブジェクトは金額、距離、住所など、属性の組み合わせで意味を持つものに適しています。',
  }),
  Question.create({
    id: 'q5-1-4',
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
    id: 'q5-1-5',
    text: '値オブジェクトがドメインロジックを集約するメリットは？',
    options: [
      { id: 'a', text: 'パフォーマンスが向上する', isCorrect: false },
      { id: 'b', text: 'バリデーションの重複を防ぎ、型安全性が向上する', isCorrect: true },
      { id: 'c', text: 'データベースのクエリが高速化する', isCorrect: false },
      { id: 'd', text: 'メモリ使用量が減少する', isCorrect: false },
    ],
    explanation: '値オブジェクトにバリデーションを集約することで、重複を防ぎ、型によって引数の取り違えを防止できます。',
  }),
];

// Lesson 5-2: 値オブジェクトの実装（5問）
const lesson5_2Questions: Question[] = [
  Question.create({
    id: 'q5-2-1',
    text: '値オブジェクトの実装で推奨されるコンストラクタのパターンは？',
    options: [
      { id: 'a', text: 'publicコンストラクタとセッターメソッド', isCorrect: false },
      { id: 'b', text: 'privateコンストラクタとファクトリメソッド（create）', isCorrect: true },
      { id: 'c', text: 'グローバル変数としての定義', isCorrect: false },
      { id: 'd', text: 'シングルトンパターン', isCorrect: false },
    ],
    explanation: 'privateコンストラクタとファクトリメソッドを使うことで、バリデーションを強制し、不正な状態のオブジェクト生成を防ぎます。',
  }),
  Question.create({
    id: 'q5-2-2',
    text: 'TypeScriptで値オブジェクトの不変性を保証する方法は？',
    options: [
      { id: 'a', text: 'letキーワードを使う', isCorrect: false },
      { id: 'b', text: 'readonlyキーワードを使う', isCorrect: true },
      { id: 'c', text: 'varキーワードを使う', isCorrect: false },
      { id: 'd', text: 'publicキーワードを使う', isCorrect: false },
    ],
    explanation: 'readonlyを使うことで、プロパティが初期化後に変更されないことをコンパイラレベルで保証できます。',
  }),
  Question.create({
    id: 'q5-2-3',
    text: '値オブジェクトの演算メソッドの実装で正しいのは？',
    options: [
      { id: 'a', text: '自身の状態を変更して返す', isCorrect: false },
      { id: 'b', text: '新しいインスタンスを生成して返す', isCorrect: true },
      { id: 'c', text: 'voidを返す', isCorrect: false },
      { id: 'd', text: 'プリミティブ値を返す', isCorrect: false },
    ],
    explanation: '値オブジェクトは不変なので、演算結果は新しいインスタンスとして返します。例：money.add(other)は新しいMoneyを返す。',
  }),
  Question.create({
    id: 'q5-2-4',
    text: 'equalsメソッドの実装で考慮すべきことは？',
    options: [
      { id: 'a', text: 'メモリアドレスのみを比較する', isCorrect: false },
      { id: 'b', text: '全ての属性の値を比較し、nullチェックも行う', isCorrect: true },
      { id: 'c', text: 'IDのみを比較する', isCorrect: false },
      { id: 'd', text: '型チェックは不要', isCorrect: false },
    ],
    explanation: 'equalsメソッドでは、nullチェック、型チェック、全属性の値の比較を行う必要があります。',
  }),
  Question.create({
    id: 'q5-2-5',
    text: '値オブジェクトのクラス命名で適切なのは？',
    options: [
      { id: 'a', text: 'IntWrapper, StringWrapper', isCorrect: false },
      { id: 'b', text: 'OrderQuantity, UnitPrice, Email', isCorrect: true },
      { id: 'c', text: 'Data1, Data2, Data3', isCorrect: false },
      { id: 'd', text: 'ValueObject1, ValueObject2', isCorrect: false },
    ],
    explanation: 'ドメイン用語を使い、単一の概念を表す名前を付けます。技術的な命名は避けましょう。',
  }),
];

// Lesson 5-3: 自己検証と不変条件（5問）
const lesson5_3Questions: Question[] = [
  Question.create({
    id: 'q5-3-1',
    text: '自己検証（Self-Validation）の目的は？',
    options: [
      { id: 'a', text: 'パフォーマンスの最適化', isCorrect: false },
      { id: 'b', text: '不正な状態のオブジェクトが存在できないようにする', isCorrect: true },
      { id: 'c', text: 'メモリ使用量の削減', isCorrect: false },
      { id: 'd', text: 'データベースとの同期', isCorrect: false },
    ],
    explanation: '自己検証により、値オブジェクトは生成時に有効性を検証し、不正な状態のオブジェクトの存在を防ぎます。',
  }),
  Question.create({
    id: 'q5-3-2',
    text: '不変条件（Invariant）とは何ですか？',
    options: [
      { id: 'a', text: 'コードの変更禁止ルール', isCorrect: false },
      { id: 'b', text: 'オブジェクトが常に満たすべきビジネスルール', isCorrect: true },
      { id: 'c', text: 'データベースの制約', isCorrect: false },
      { id: 'd', text: 'APIの仕様', isCorrect: false },
    ],
    explanation: '不変条件は、オブジェクトが常に満たすべきルールです。例：Percentageは0〜100の範囲、DateRangeは開始日≦終了日。',
  }),
  Question.create({
    id: 'q5-3-3',
    text: '複数属性間の不変条件の例として正しいのは？',
    options: [
      { id: 'a', text: 'Emailのフォーマットチェック', isCorrect: false },
      { id: 'b', text: 'DateRangeの開始日が終了日以前であること', isCorrect: true },
      { id: 'c', text: 'Ageが整数であること', isCorrect: false },
      { id: 'd', text: 'PhoneNumberが数字のみであること', isCorrect: false },
    ],
    explanation: 'DateRangeの「開始日≦終了日」は2つの属性の関係を検証する不変条件です。単一属性の検証とは異なります。',
  }),
  Question.create({
    id: 'q5-3-4',
    text: 'バリデーションでResult型を使うメリットは？',
    options: [
      { id: 'a', text: 'コードが短くなる', isCorrect: false },
      { id: 'b', text: 'エラーを型安全に扱え、呼び出し側でのハンドリングが明確になる', isCorrect: true },
      { id: 'c', text: '実行速度が向上する', isCorrect: false },
      { id: 'd', text: 'テストが不要になる', isCorrect: false },
    ],
    explanation: 'Result型を使うと、成功/失敗を型で表現でき、呼び出し側で適切にハンドリングすることが強制されます。',
  }),
  Question.create({
    id: 'q5-3-5',
    text: '正規化（Normalization）の例として正しいのは？',
    options: [
      { id: 'a', text: 'メールアドレスを小文字に統一する', isCorrect: true },
      { id: 'b', text: 'データベースのテーブルを分割する', isCorrect: false },
      { id: 'c', text: 'クラスを複数ファイルに分ける', isCorrect: false },
      { id: 'd', text: 'テストケースを整理する', isCorrect: false },
    ],
    explanation: '正規化は、同じ意味の値を統一的に扱うために形式を揃えることです。メールの小文字化、電話番号のハイフン除去などが例です。',
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
  // Chapter 3: 境界づけられたコンテキスト
  Quiz.create({
    id: QuizId.create('quiz-lesson-3-1'),
    lessonId: LessonId.create('lesson-3-1'),
    title: 'コンテキストとは何か - 理解度チェック',
    description: '境界づけられたコンテキストの定義と意味についての理解度を確認するクイズです。',
    questions: lesson3_1Questions,
  }),
  Quiz.create({
    id: QuizId.create('quiz-lesson-3-2'),
    lessonId: LessonId.create('lesson-3-2'),
    title: 'コンテキストの見つけ方 - 理解度チェック',
    description: 'コンテキストの分析パターンと境界の決め方についての理解度を確認するクイズです。',
    questions: lesson3_2Questions,
  }),
  Quiz.create({
    id: QuizId.create('quiz-lesson-3-3'),
    lessonId: LessonId.create('lesson-3-3'),
    title: 'コンテキスト間の関係 - 理解度チェック',
    description: 'コンテキスト間の関係と統合パターンについての理解度を確認するクイズです。',
    questions: lesson3_3Questions,
  }),
  // Chapter 4: コンテキストマップ
  Quiz.create({
    id: QuizId.create('quiz-lesson-4-1'),
    lessonId: LessonId.create('lesson-4-1'),
    title: 'コンテキストマップとは - 理解度チェック',
    description: 'コンテキストマップの定義と目的についての理解度を確認するクイズです。',
    questions: lesson4_1Questions,
  }),
  Quiz.create({
    id: QuizId.create('quiz-lesson-4-2'),
    lessonId: LessonId.create('lesson-4-2'),
    title: '統合パターン - 理解度チェック',
    description: 'コンテキスト間の統合パターンについての理解度を確認するクイズです。',
    questions: lesson4_2Questions,
  }),
  // Chapter 5: 値オブジェクト
  Quiz.create({
    id: QuizId.create('quiz-lesson-5-1'),
    lessonId: LessonId.create('lesson-5-1'),
    title: '値オブジェクトとは - 理解度チェック',
    description: '値オブジェクトの定義と特徴についての理解度を確認するクイズです。',
    questions: lesson5_1Questions,
  }),
  Quiz.create({
    id: QuizId.create('quiz-lesson-5-2'),
    lessonId: LessonId.create('lesson-5-2'),
    title: '値オブジェクトの実装 - 理解度チェック',
    description: '値オブジェクトの実装パターンについての理解度を確認するクイズです。',
    questions: lesson5_2Questions,
  }),
  Quiz.create({
    id: QuizId.create('quiz-lesson-5-3'),
    lessonId: LessonId.create('lesson-5-3'),
    title: '自己検証と不変条件 - 理解度チェック',
    description: '自己検証と不変条件についての理解度を確認するクイズです。',
    questions: lesson5_3Questions,
  }),
];

export function getSampleQuizzes(): Quiz[] {
  return sampleQuizzes;
}
