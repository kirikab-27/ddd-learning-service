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

// =============================================================================
// Chapter 6: エンティティ
// =============================================================================

// Lesson 6-1: エンティティとは（5問）
const lesson6_1Questions: Question[] = [
  Question.create({
    id: 'q6-1-1',
    text: 'エンティティの最も重要な特徴は何ですか？',
    options: [
      { id: 'a', text: '不変であること', isCorrect: false },
      { id: 'b', text: '一意の識別子による同一性を持つこと', isCorrect: true },
      { id: 'c', text: '全ての属性が必須であること', isCorrect: false },
      { id: 'd', text: 'データベースに必ず永続化されること', isCorrect: false },
    ],
    explanation: 'エンティティはライフサイクルを通じて一貫した同一性を持ちます。IDで識別され、属性が変わっても同じエンティティとして扱われます。',
  }),
  Question.create({
    id: 'q6-1-2',
    text: '日常の例で、エンティティとして適切なものはどれですか？',
    options: [
      { id: 'a', text: '1000円という金額', isCorrect: false },
      { id: 'b', text: '銀行口座（口座番号で識別、残高は変わる）', isCorrect: true },
      { id: 'c', text: '郵便番号', isCorrect: false },
      { id: 'd', text: 'RGB(255, 0, 0)という色', isCorrect: false },
    ],
    explanation: '銀行口座は口座番号で識別され、残高や名義人情報が変わっても同じ口座として扱われます。これがエンティティの典型例です。',
  }),
  Question.create({
    id: 'q6-1-3',
    text: 'エンティティと値オブジェクトの比較として正しいのは？',
    options: [
      { id: 'a', text: 'エンティティは値で識別され、値オブジェクトはIDで識別される', isCorrect: false },
      { id: 'b', text: 'エンティティはIDで識別され、値オブジェクトは全属性で識別される', isCorrect: true },
      { id: 'c', text: 'エンティティは不変で、値オブジェクトは変更可能', isCorrect: false },
      { id: 'd', text: 'エンティティはプリミティブ型、値オブジェクトはオブジェクト型', isCorrect: false },
    ],
    explanation: 'エンティティはIDで識別され変更可能、値オブジェクトは全属性の値で識別され不変です。',
  }),
  Question.create({
    id: 'q6-1-4',
    text: 'エンティティの同一性を検証するequalsメソッドで比較すべきものは？',
    options: [
      { id: 'a', text: '全ての属性の値', isCorrect: false },
      { id: 'b', text: 'IDのみ', isCorrect: true },
      { id: 'c', text: 'メモリアドレス', isCorrect: false },
      { id: 'd', text: '作成日時', isCorrect: false },
    ],
    explanation: 'エンティティのequalsメソッドでは、IDのみを比較します。属性が変わってもIDが同じなら同一のエンティティです。',
  }),
  Question.create({
    id: 'q6-1-5',
    text: 'エンティティで状態が変化する例として適切なのは？',
    options: [
      { id: 'a', text: '注文の状態が「下書き」から「確定」に変わる', isCorrect: true },
      { id: 'b', text: '1000円が2000円になる', isCorrect: false },
      { id: 'c', text: '郵便番号100-0001が100-0002になる', isCorrect: false },
      { id: 'd', text: 'true が false になる', isCorrect: false },
    ],
    explanation: '注文エンティティは注文番号で識別され、状態（下書き→確定→配送中）が時間とともに変化します。これがエンティティの変更可能性の典型例です。',
  }),
];

// Lesson 6-2: ライフサイクルと同一性（5問）
const lesson6_2Questions: Question[] = [
  Question.create({
    id: 'q6-2-1',
    text: 'エンティティのライフサイクルの4つのフェーズに含まれないものは？',
    options: [
      { id: 'a', text: '生成（create）', isCorrect: false },
      { id: 'b', text: '取得（retrieve）', isCorrect: false },
      { id: 'c', text: '変更（update）', isCorrect: false },
      { id: 'd', text: '複製（clone）', isCorrect: true },
    ],
    explanation: 'エンティティのライフサイクルは「生成→取得→変更→削除」の4つのフェーズです。複製は通常のライフサイクルには含まれません。',
  }),
  Question.create({
    id: 'q6-2-2',
    text: 'UUID/GUIDをIDとして使用するメリットは？',
    options: [
      { id: 'a', text: 'URLに使いやすい', isCorrect: false },
      { id: 'b', text: '衝突の心配がなく、分散システムに適している', isCorrect: true },
      { id: 'c', text: '見た目が分かりやすい', isCorrect: false },
      { id: 'd', text: 'データベースのインデックスが高速', isCorrect: false },
    ],
    explanation: 'UUIDは事実上一意であるため、複数のサーバーやクライアントで独立してIDを生成しても衝突しません。分散システムに最適です。',
  }),
  Question.create({
    id: 'q6-2-3',
    text: '連番（Auto Increment）IDのデメリットとして正しいのは？',
    options: [
      { id: 'a', text: 'データベースのパフォーマンスが悪い', isCorrect: false },
      { id: 'b', text: '分散システムには不向きで、IDが推測可能', isCorrect: true },
      { id: 'c', text: 'メモリ使用量が多い', isCorrect: false },
      { id: 'd', text: '実装が複雑', isCorrect: false },
    ],
    explanation: '連番IDは単一データベースで採番するため分散システムには不向きです。また、1, 2, 3...と推測可能なため、セキュリティ上の懸念もあります。',
  }),
  Question.create({
    id: 'q6-2-4',
    text: '自然キー（Natural Key）の例として適切なのは？',
    options: [
      { id: 'a', text: 'UUID', isCorrect: false },
      { id: 'b', text: 'メールアドレスや社員番号', isCorrect: true },
      { id: 'c', text: 'ランダムな文字列', isCorrect: false },
      { id: 'd', text: 'タイムスタンプ', isCorrect: false },
    ],
    explanation: '自然キーは、ビジネス上意味のある値をIDとして使います。メールアドレス、社員番号、注文番号などが例です。',
  }),
  Question.create({
    id: 'q6-2-5',
    text: '楽観的ロック（Optimistic Locking）で使用されるものは？',
    options: [
      { id: 'a', text: 'パスワード', isCorrect: false },
      { id: 'b', text: 'バージョン番号やタイムスタンプ', isCorrect: true },
      { id: 'c', text: 'IPアドレス', isCorrect: false },
      { id: 'd', text: 'セッションID', isCorrect: false },
    ],
    explanation: '楽観的ロックでは、バージョン番号を持ち、更新時にバージョンをチェックすることで競合を検出します。競合時はエラーを返します。',
  }),
];

// Lesson 6-3: エンティティと値オブジェクトの違い（5問）
const lesson6_3Questions: Question[] = [
  Question.create({
    id: 'q6-3-1',
    text: 'エンティティの可変性について正しい説明はどれですか？',
    options: [
      { id: 'a', text: 'エンティティは常に不変である', isCorrect: false },
      { id: 'b', text: 'エンティティは変更可能（Mutable）で、状態が変化しうる', isCorrect: true },
      { id: 'c', text: 'エンティティの全属性が常に変更可能', isCorrect: false },
      { id: 'd', text: 'エンティティは一度作成したら削除できない', isCorrect: false },
    ],
    explanation: 'エンティティは変更可能で、状態が時間とともに変化します。ただし、IDは通常不変です。',
  }),
  Question.create({
    id: 'q6-3-2',
    text: '値オブジェクトの比較方法として正しいのは？',
    options: [
      { id: 'a', text: 'IDで比較する', isCorrect: false },
      { id: 'b', text: '全属性の値で比較する', isCorrect: true },
      { id: 'c', text: 'メモリアドレスで比較する', isCorrect: false },
      { id: 'd', text: '作成日時で比較する', isCorrect: false },
    ],
    explanation: '値オブジェクトは全属性の値が等しければ等価とみなされます。Money(1000, "JPY")とMoney(1000, "JPY")は同じです。',
  }),
  Question.create({
    id: 'q6-3-3',
    text: '「追跡する必要があるか？」という判断基準で、エンティティとして扱うべきものは？',
    options: [
      { id: 'a', text: '住所', isCorrect: false },
      { id: 'b', text: '顧客（契約状態や購入履歴を追跡）', isCorrect: true },
      { id: 'c', text: '金額', isCorrect: false },
      { id: 'd', text: '色', isCorrect: false },
    ],
    explanation: '顧客は契約状態や購入履歴を追跡する必要があるため、エンティティとして扱います。住所や金額は追跡不要なので値オブジェクトです。',
  }),
  Question.create({
    id: 'q6-3-4',
    text: 'エンティティと値オブジェクトの判断で誤っているものは？',
    options: [
      { id: 'a', text: '時間とともに変化するならエンティティの可能性が高い', isCorrect: false },
      { id: 'b', text: '交換可能なら値オブジェクトの可能性が高い', isCorrect: false },
      { id: 'c', text: 'データベースに保存するものは必ずエンティティ', isCorrect: true },
      { id: 'd', text: '同一性が重要ならエンティティの可能性が高い', isCorrect: false },
    ],
    explanation: 'データベースへの保存有無は判断基準ではありません。値オブジェクトもエンティティの一部として保存されることがあります。',
  }),
  Question.create({
    id: 'q6-3-5',
    text: 'エンティティが持つライフサイクルとして正しいのは？',
    options: [
      { id: 'a', text: '生成のみ', isCorrect: false },
      { id: 'b', text: '作成→変更→削除の一連の流れを持つ', isCorrect: true },
      { id: 'c', text: '削除できない', isCorrect: false },
      { id: 'd', text: '常に読み取り専用', isCorrect: false },
    ],
    explanation: 'エンティティは作成、取得、変更、削除のライフサイクルを持ちます。値オブジェクトは生成のみです。',
  }),
];

// =============================================================================
// Chapter 7: ドメインサービス
// =============================================================================

// Lesson 7-1: ドメインサービスとは（5問）
const lesson7_1Questions: Question[] = [
  Question.create({
    id: 'q7-1-1',
    text: 'ドメインサービスの最も重要な特徴は何ですか？',
    options: [
      { id: 'a', text: '状態を持つ', isCorrect: false },
      { id: 'b', text: 'ステートレス（状態を持たない）', isCorrect: true },
      { id: 'c', text: 'データベースに永続化される', isCorrect: false },
      { id: 'd', text: '必ずシングルトンである', isCorrect: false },
    ],
    explanation: 'ドメインサービスはステートレスで、必要な情報はすべて引数で受け取ります。状態を持たないため、複数の操作で再利用しやすい設計です。',
  }),
  Question.create({
    id: 'q7-1-2',
    text: 'ドメインサービスを使うべき場面として適切なものはどれですか？',
    options: [
      { id: 'a', text: '単一エンティティの状態変更', isCorrect: false },
      { id: 'b', text: '複数オブジェクトをまたぐ操作', isCorrect: true },
      { id: 'c', text: 'メール送信などの技術的処理', isCorrect: false },
      { id: 'd', text: '値オブジェクトの計算', isCorrect: false },
    ],
    explanation: 'ドメインサービスは、送金のように複数のエンティティをまたぐ操作や、どのオブジェクトにも自然に属さないドメインロジックを表現するために使います。',
  }),
  Question.create({
    id: 'q7-1-3',
    text: 'ドメインサービスとインフラストラクチャサービスの違いは？',
    options: [
      { id: 'a', text: 'ドメインサービスは技術的処理、インフラはビジネスルール', isCorrect: false },
      { id: 'b', text: 'ドメインサービスはビジネスルール、インフラは技術的処理', isCorrect: true },
      { id: 'c', text: '両方とも技術的処理', isCorrect: false },
      { id: 'd', text: '違いはない', isCorrect: false },
    ],
    explanation: 'ドメインサービスはビジネスルールを表現し、インフラストラクチャサービスはメール送信やファイルI/Oなどの技術的処理を担当します。',
  }),
  Question.create({
    id: 'q7-1-4',
    text: 'ドメインサービスの命名として適切なものはどれですか？',
    options: [
      { id: 'a', text: 'AccountManager', isCorrect: false },
      { id: 'b', text: 'MoneyTransferService', isCorrect: true },
      { id: 'c', text: 'OrderHelper', isCorrect: false },
      { id: 'd', text: 'ProductUtil', isCorrect: false },
    ],
    explanation: 'ドメインサービスは操作を表す名前（TransferService、PricingServiceなど）にします。Manager、Helper、Utilなどの技術的な名前は避けます。',
  }),
  Question.create({
    id: 'q7-1-5',
    text: 'ドメインサービスが必要になる典型的なケースは？',
    options: [
      { id: 'a', text: '送金：送金元と送金先の両方のAccountを操作', isCorrect: true },
      { id: 'b', text: '注文の確定：注文自身の状態変更', isCorrect: false },
      { id: 'c', text: '金額の加算：Moneyの計算', isCorrect: false },
      { id: 'd', text: 'データベース接続', isCorrect: false },
    ],
    explanation: '送金のように、どちらのAccountのメソッドにすべきか判断できない操作は、ドメインサービスが適しています。単一オブジェクトの操作はエンティティのメソッドにします。',
  }),
];

// Lesson 7-2: ドメインサービスの実装（5問）
const lesson7_2Questions: Question[] = [
  Question.create({
    id: 'q7-2-1',
    text: 'ドメインサービスの実装として正しいのはどれですか？',
    options: [
      { id: 'a', text: 'フィールドで状態を保持する', isCorrect: false },
      { id: 'b', text: 'すべての情報を引数で受け取る', isCorrect: true },
      { id: 'c', text: 'グローバル変数を使う', isCorrect: false },
      { id: 'd', text: 'シングルトンパターンを必ず使う', isCorrect: false },
    ],
    explanation: 'ドメインサービスはステートレスなので、必要な情報はすべてメソッドの引数で受け取ります。フィールドで状態を保持しません。',
  }),
  Question.create({
    id: 'q7-2-2',
    text: 'ドメインサービスが他のサービスに依存する場合、どうすべきですか？',
    options: [
      { id: 'a', text: 'グローバル変数で参照する', isCorrect: false },
      { id: 'b', text: 'コンストラクタで注入する', isCorrect: true },
      { id: 'c', text: 'staticメソッドで取得する', isCorrect: false },
      { id: 'd', text: '依存してはいけない', isCorrect: false },
    ],
    explanation: 'ドメインサービスが他のサービスやリポジトリに依存する場合、コンストラクタで依存性を注入します。これにより、テストしやすく保守性の高い設計になります。',
  }),
  Question.create({
    id: 'q7-2-3',
    text: 'ドメインサービスの命名で避けるべきパターンは？',
    options: [
      { id: 'a', text: 'PricingService', isCorrect: false },
      { id: 'b', text: 'MoneyTransferService', isCorrect: false },
      { id: 'c', text: 'OrderHelper', isCorrect: true },
      { id: 'd', text: 'InventoryAllocationService', isCorrect: false },
    ],
    explanation: 'Helper、Manager、Utilなどの技術的な名前は避けます。操作を明確に表す名前（〜Service、〜Calculator）を使います。',
  }),
  Question.create({
    id: 'q7-2-4',
    text: 'ドメインサービスがリポジトリに依存する場合、どこに配置すべきですか？',
    options: [
      { id: 'a', text: 'インフラストラクチャ層', isCorrect: false },
      { id: 'b', text: 'ドメイン層（リポジトリのインターフェースはドメイン層）', isCorrect: true },
      { id: 'c', text: 'プレゼンテーション層', isCorrect: false },
      { id: 'd', text: 'データベース層', isCorrect: false },
    ],
    explanation: 'ドメインサービスはドメイン層に配置します。リポジトリのインターフェースもドメイン層で定義され、実装のみがインフラストラクチャ層にあります。',
  }),
  Question.create({
    id: 'q7-2-5',
    text: 'ドメインサービスのテストで重要なことは？',
    options: [
      { id: 'a', text: 'データベースに接続してテストする', isCorrect: false },
      { id: 'b', text: 'ステートレスなのでテストしやすい', isCorrect: true },
      { id: 'c', text: 'テストは不要', isCorrect: false },
      { id: 'd', text: '必ずモックを使う', isCorrect: false },
    ],
    explanation: 'ドメインサービスはステートレスで副作用がないため、テストしやすい設計です。必要に応じて依存をモック化できます。',
  }),
];

// Lesson 7-3: エンティティ・値オブジェクトとの使い分け（5問）
const lesson7_3Questions: Question[] = [
  Question.create({
    id: 'q7-3-1',
    text: 'ロジックを配置する優先順位として正しいのは？',
    options: [
      { id: 'a', text: 'ドメインサービス → エンティティ → 値オブジェクト', isCorrect: false },
      { id: 'b', text: 'エンティティ/値オブジェクト → ドメインサービス', isCorrect: true },
      { id: 'c', text: 'すべてドメインサービス', isCorrect: false },
      { id: 'd', text: 'すべてエンティティ', isCorrect: false },
    ],
    explanation: 'まずエンティティや値オブジェクトに配置できるか検討し、どうしても属さないロジックのみドメインサービスにします。ドメインサービスは最後の手段です。',
  }),
  Question.create({
    id: 'q7-3-2',
    text: '貧血ドメインモデル（Anemic Domain Model）とは何ですか？',
    options: [
      { id: 'a', text: 'エンティティが適切にロジックを持つ状態', isCorrect: false },
      { id: 'b', text: 'エンティティがデータのみで、ロジックがすべてサービスにある状態', isCorrect: true },
      { id: 'c', text: 'ドメインサービスを使わない状態', isCorrect: false },
      { id: 'd', text: '値オブジェクトを使わない状態', isCorrect: false },
    ],
    explanation: '貧血ドメインモデルは、エンティティがデータの入れ物になり、すべてのロジックがサービスに配置されている悪いパターンです。',
  }),
  Question.create({
    id: 'q7-3-3',
    text: 'Order.confirm()メソッドはどこに配置すべきですか？',
    options: [
      { id: 'a', text: 'OrderServiceクラス', isCorrect: false },
      { id: 'b', text: 'Orderエンティティ', isCorrect: true },
      { id: 'c', text: 'OrderRepositoryクラス', isCorrect: false },
      { id: 'd', text: 'ConfirmationServiceクラス', isCorrect: false },
    ],
    explanation: '注文の確定は注文自身の状態変更なので、Orderエンティティのメソッドとして実装すべきです。単一オブジェクトの責務はそのオブジェクト自身に配置します。',
  }),
  Question.create({
    id: 'q7-3-4',
    text: 'Money.add()メソッドはどこに配置すべきですか？',
    options: [
      { id: 'a', text: 'MoneyCalculationServiceクラス', isCorrect: false },
      { id: 'b', text: 'Money値オブジェクト', isCorrect: true },
      { id: 'c', text: 'Accountエンティティ', isCorrect: false },
      { id: 'd', text: 'MathUtilクラス', isCorrect: false },
    ],
    explanation: '金額の計算はMoney値オブジェクト自身の責務です。値の操作はその値オブジェクトのメソッドとして実装します。',
  }),
  Question.create({
    id: 'q7-3-5',
    text: 'リッチドメインモデル（Rich Domain Model）の特徴は？',
    options: [
      { id: 'a', text: 'すべてのロジックがサービスにある', isCorrect: false },
      { id: 'b', text: 'エンティティがデータと振る舞いをともに持つ', isCorrect: true },
      { id: 'c', text: 'ドメインサービスを使わない', isCorrect: false },
      { id: 'd', text: 'エンティティはデータのみを持つ', isCorrect: false },
    ],
    explanation: 'リッチドメインモデルでは、エンティティがデータと振る舞いをともに持ちます。ドメインサービスは本当に必要な場合のみ使用します。',
  }),
];

// =============================================================================
// Chapter 8: 集約
// =============================================================================

// Lesson 8-1: 集約とは（5問）
const lesson8_1Questions: Question[] = [
  Question.create({
    id: 'q8-1-1',
    text: '集約が定義する最も重要な境界は何ですか？',
    options: [
      { id: 'a', text: 'クラスの境界', isCorrect: false },
      { id: 'b', text: 'トランザクション整合性の境界', isCorrect: true },
      { id: 'c', text: 'データベーステーブルの境界', isCorrect: false },
      { id: 'd', text: 'プログラミング言語の境界', isCorrect: false },
    ],
    explanation: '集約は、トランザクションで一貫性を保証する境界を定義します。集約内のオブジェクトは1つのトランザクションで変更され、常に整合性が保たれます。',
  }),
  Question.create({
    id: 'q8-1-2',
    text: '不変条件（Invariants）とは何ですか？',
    options: [
      { id: 'a', text: '変更されないフィールド', isCorrect: false },
      { id: 'b', text: '常に満たすべきビジネスルール', isCorrect: true },
      { id: 'c', text: 'データベースの制約', isCorrect: false },
      { id: 'd', text: 'final修飾子のついた変数', isCorrect: false },
    ],
    explanation: '不変条件は、集約が常に満たすべきビジネスルールです。例: 「注文の合計金額は明細の合計と一致する」。集約ルートがこれを保護します。',
  }),
  Question.create({
    id: 'q8-1-3',
    text: '1つのトランザクションで変更できる集約の数は？',
    options: [
      { id: 'a', text: '制限なし', isCorrect: false },
      { id: 'b', text: '1つのみ（原則として）', isCorrect: true },
      { id: 'c', text: '最大3つまで', isCorrect: false },
      { id: 'd', text: '同じタイプなら複数可', isCorrect: false },
    ],
    explanation: '原則として、1つのトランザクションで変更するのは1つの集約のみです。複数の集約をまたぐ変更は、結果整合性やイベント駆動で対応します。',
  }),
  Question.create({
    id: 'q8-1-4',
    text: '集約の構成要素として正しいものはどれですか？',
    options: [
      { id: 'a', text: '集約ルート、リポジトリ、サービス', isCorrect: false },
      { id: 'b', text: '集約ルート、内部エンティティ、値オブジェクト', isCorrect: true },
      { id: 'c', text: 'エンティティのみ', isCorrect: false },
      { id: 'd', text: 'データベーステーブル', isCorrect: false },
    ],
    explanation: '集約は、集約ルート（エントリポイント）、内部エンティティ、値オブジェクトで構成されます。リポジトリやサービスは集約の外部です。',
  }),
  Question.create({
    id: 'q8-1-5',
    text: 'Order集約に OrderItem を含める理由は？',
    options: [
      { id: 'a', text: 'データベースの外部キー制約があるから', isCorrect: false },
      { id: 'b', text: '常に一緒に整合性を保つ必要があるから', isCorrect: true },
      { id: 'c', text: 'クラス設計が簡単になるから', isCorrect: false },
      { id: 'd', text: 'パフォーマンスが良いから', isCorrect: false },
    ],
    explanation: 'OrderItemはOrderと常に一緒に整合性を保つ必要があります（合計金額 = 明細の和など）。そのため、同じ集約に含めて1トランザクションで変更します。',
  }),
];

// Lesson 8-2: 集約ルート（5問）
const lesson8_2Questions: Question[] = [
  Question.create({
    id: 'q8-2-1',
    text: '集約ルートの最も重要な責務は何ですか？',
    options: [
      { id: 'a', text: 'データベースアクセス', isCorrect: false },
      { id: 'b', text: '外部アクセスの制御と不変条件の保護', isCorrect: true },
      { id: 'c', text: 'UI表示', isCorrect: false },
      { id: 'd', text: 'ログ出力', isCorrect: false },
    ],
    explanation: '集約ルートは、外部からのアクセスを制御し、集約全体の不変条件を保護する責務を持ちます。すべての操作は集約ルート経由で行われます。',
  }),
  Question.create({
    id: 'q8-2-2',
    text: '内部エンティティ（OrderItemなど）への外部からの直接アクセスは？',
    options: [
      { id: 'a', text: '推奨される', isCorrect: false },
      { id: 'b', text: '禁止（集約ルート経由のみ）', isCorrect: true },
      { id: 'c', text: '読み取りのみ可', isCorrect: false },
      { id: 'd', text: '場合による', isCorrect: false },
    ],
    explanation: '内部エンティティへの直接アクセスは禁止です。すべての操作は集約ルート経由で行い、集約ルートが不変条件を保護します。',
  }),
  Question.create({
    id: 'q8-2-3',
    text: '内部エンティティのリストを外部に公開する適切な方法は？',
    options: [
      { id: 'a', text: 'public items: OrderItem[] で公開', isCorrect: false },
      { id: 'b', text: 'readonly items: readonly OrderItem[] でコピーを返す', isCorrect: true },
      { id: 'c', text: '公開しない', isCorrect: false },
      { id: 'd', text: 'getter/setterで公開', isCorrect: false },
    ],
    explanation: '読み取り専用（readonly）でコピーを返すことで、外部からの直接変更を防ぎます。変更は集約ルートのメソッド（addItem、removeItemなど）経由で行います。',
  }),
  Question.create({
    id: 'q8-2-4',
    text: 'リポジトリが扱うべき単位は？',
    options: [
      { id: 'a', text: '個別のエンティティ', isCorrect: false },
      { id: 'b', text: '集約ルート（集約全体）', isCorrect: true },
      { id: 'c', text: 'テーブル単位', isCorrect: false },
      { id: 'd', text: '値オブジェクト', isCorrect: false },
    ],
    explanation: 'リポジトリは集約ルート（集約全体）を単位として、取得・保存します。内部エンティティを個別に操作してはいけません。',
  }),
  Question.create({
    id: 'q8-2-5',
    text: '集約のファクトリーメソッドを private コンストラクタと組み合わせる理由は？',
    options: [
      { id: 'a', text: 'パフォーマンスの最適化', isCorrect: false },
      { id: 'b', text: '不変条件を満たした状態でのみ生成を許可するため', isCorrect: true },
      { id: 'c', text: 'コードの行数を減らすため', isCorrect: false },
      { id: 'd', text: 'データベース接続を制御するため', isCorrect: false },
    ],
    explanation: 'privateコンストラクタとファクトリーメソッドの組み合わせにより、集約が常に不変条件を満たした状態で生成されることを保証できます。',
  }),
];

// Lesson 8-3: 集約の設計ガイドライン（5問）
const lesson8_3Questions: Question[] = [
  Question.create({
    id: 'q8-3-1',
    text: '集約設計で最も推奨されるサイズは？',
    options: [
      { id: 'a', text: 'できるだけ大きく（すべての関連を含める）', isCorrect: false },
      { id: 'b', text: 'できるだけ小さく（必要最小限）', isCorrect: true },
      { id: 'c', text: '中くらい', isCorrect: false },
      { id: 'd', text: 'サイズは関係ない', isCorrect: false },
    ],
    explanation: '集約は小さく保つことが推奨されます。大きな集約は、パフォーマンス問題、ロック競合、保守性の低下を引き起こします。',
  }),
  Question.create({
    id: 'q8-3-2',
    text: '他の集約を参照する適切な方法は？',
    options: [
      { id: 'a', text: 'オブジェクト参照（Customer customer）', isCorrect: false },
      { id: 'b', text: 'ID参照（CustomerId customerId）', isCorrect: true },
      { id: 'c', text: 'データベース外部キー', isCorrect: false },
      { id: 'd', text: '参照しない', isCorrect: false },
    ],
    explanation: '他の集約はIDで参照します。オブジェクト参照すると、複数の集約が1トランザクションに含まれ、独立性が失われます。',
  }),
  Question.create({
    id: 'q8-3-3',
    text: 'トランザクション整合性と結果整合性の違いは？',
    options: [
      { id: 'a', text: 'トランザクション整合性は即座、結果整合性は最終的', isCorrect: true },
      { id: 'b', text: 'トランザクション整合性は遅い、結果整合性は速い', isCorrect: false },
      { id: 'c', text: '違いはない', isCorrect: false },
      { id: 'd', text: 'トランザクション整合性はRDBMS、結果整合性はNoSQL', isCorrect: false },
    ],
    explanation: 'トランザクション整合性（集約内）は操作完了時に即座に整合が取れます。結果整合性（集約間）は最終的に整合が取れれば良いとする考え方です。',
  }),
  Question.create({
    id: 'q8-3-4',
    text: '集約間の連携に適した手法は？',
    options: [
      { id: 'a', text: '直接メソッド呼び出し', isCorrect: false },
      { id: 'b', text: 'ドメインイベント', isCorrect: true },
      { id: 'c', text: 'グローバル変数', isCorrect: false },
      { id: 'd', text: 'データベーストリガー', isCorrect: false },
    ],
    explanation: '集約間の連携にはドメインイベントが適しています。イベント駆動により、集約を疎結合に保ちながら連携できます。',
  }),
  Question.create({
    id: 'q8-3-5',
    text: '大きな集約の問題点として正しいものは？',
    options: [
      { id: 'a', text: 'メモリ効率が良い', isCorrect: false },
      { id: 'b', text: 'ロック競合が発生しやすく、同時実行性が低い', isCorrect: true },
      { id: 'c', text: 'シンプルで理解しやすい', isCorrect: false },
      { id: 'd', text: 'パフォーマンスが向上する', isCorrect: false },
    ],
    explanation: '大きな集約は、トランザクションが重くなり、ロック競合が発生しやすく、同時実行性が低下します。また複雑で保守が困難になります。',
  }),
];

// =============================================================================
// Chapter 9: リポジトリ
// =============================================================================

// Lesson 9-1: リポジトリとは（5問）
const lesson9_1Questions: Question[] = [
  Question.create({
    id: 'q9-1-1',
    text: 'リポジトリパターンの主な目的は何ですか？',
    options: [
      { id: 'a', text: 'データベースのパフォーマンスを向上させる', isCorrect: false },
      { id: 'b', text: 'ドメインオブジェクトの永続化と取得を抽象化する', isCorrect: true },
      { id: 'c', text: 'UIコンポーネントを管理する', isCorrect: false },
      { id: 'd', text: 'ネットワーク通信を最適化する', isCorrect: false },
    ],
    explanation: 'リポジトリパターンは、ドメインオブジェクトの永続化と取得を抽象化し、ドメイン層がインフラストラクチャの詳細から独立できるようにします。',
  }),
  Question.create({
    id: 'q9-1-2',
    text: 'リポジトリがコレクション指向と呼ばれる理由は？',
    options: [
      { id: 'a', text: 'データを配列で管理するから', isCorrect: false },
      { id: 'b', text: 'メモリ上のコレクションのようなインターフェースを提供するから', isCorrect: true },
      { id: 'c', text: 'List型を使用するから', isCorrect: false },
      { id: 'd', text: 'キャッシュ機能を持つから', isCorrect: false },
    ],
    explanation: 'リポジトリは、あたかもメモリ上のコレクションのように、save/find/removeなどのシンプルなメソッドでドメインオブジェクトを操作できるインターフェースを提供します。',
  }),
  Question.create({
    id: 'q9-1-3',
    text: 'DAOとRepositoryの主な違いとして正しいものは？',
    options: [
      { id: 'a', text: 'DAOはテーブル中心、Repositoryは集約中心', isCorrect: true },
      { id: 'b', text: 'DAOはJavaのみ、Repositoryはどの言語でも使える', isCorrect: false },
      { id: 'c', text: 'DAOは読み取り専用、Repositoryは書き込みもできる', isCorrect: false },
      { id: 'd', text: '違いはなく同じもの', isCorrect: false },
    ],
    explanation: 'DAOはデータベーステーブルごとに作成され、insert/update/deleteなどのメソッドを持ちます。一方、Repositoryは集約単位で作成され、save/find/removeなどドメイン用語を使ったメソッドを持ちます。',
  }),
  Question.create({
    id: 'q9-1-4',
    text: 'リポジトリと集約の関係について正しいものは？',
    options: [
      { id: 'a', text: '1つのテーブルに1つのリポジトリ', isCorrect: false },
      { id: 'b', text: '1つの集約ルートに1つのリポジトリ', isCorrect: true },
      { id: 'c', text: 'すべてのエンティティに1つずつリポジトリ', isCorrect: false },
      { id: 'd', text: 'アプリケーション全体で1つのリポジトリ', isCorrect: false },
    ],
    explanation: 'リポジトリは集約ルート単位で作成します。集約内の内部エンティティ（例: OrderItem）専用のリポジトリは作りません。これにより集約の整合性が保たれます。',
  }),
  Question.create({
    id: 'q9-1-5',
    text: 'リポジトリによる抽象化のメリットとして適切でないものは？',
    options: [
      { id: 'a', text: 'ドメイン層がインフラストラクチャから独立する', isCorrect: false },
      { id: 'b', text: 'モックを使ったテストが容易になる', isCorrect: false },
      { id: 'c', text: 'SQLのパフォーマンスが必ず向上する', isCorrect: true },
      { id: 'd', text: 'データベース変更の影響を局所化できる', isCorrect: false },
    ],
    explanation: 'リポジトリは抽象化によりテスト容易性や保守性を向上させますが、SQLのパフォーマンスが必ず向上するわけではありません。パフォーマンスは実装次第です。',
  }),
];

// Lesson 9-2: リポジトリの実装パターン（5問）
const lesson9_2Questions: Question[] = [
  Question.create({
    id: 'q9-2-1',
    text: 'リポジトリのインターフェースはどの層に配置すべきですか？',
    options: [
      { id: 'a', text: 'Infrastructure層', isCorrect: false },
      { id: 'b', text: 'Domain層', isCorrect: true },
      { id: 'c', text: 'Presentation層', isCorrect: false },
      { id: 'd', text: 'Application層', isCorrect: false },
    ],
    explanation: 'リポジトリのインターフェースはDomain層に配置し、具体的な実装はInfrastructure層に配置します。これにより依存性逆転の原則が実現されます。',
  }),
  Question.create({
    id: 'q9-2-2',
    text: 'コレクション指向リポジトリの特徴として正しいものは？',
    options: [
      { id: 'a', text: '変更を自動的にトラッキングする', isCorrect: false },
      { id: 'b', text: '明示的にsaveメソッドを呼び出す必要がある', isCorrect: true },
      { id: 'c', text: 'findメソッドだけを持つ', isCorrect: false },
      { id: 'd', text: 'ORMの機能に依存する', isCorrect: false },
    ],
    explanation: 'コレクション指向リポジトリでは、オブジェクトを変更した後、明示的にsave()メソッドを呼び出して永続化します。変更の自動追跡は永続化指向の特徴です。',
  }),
  Question.create({
    id: 'q9-2-3',
    text: 'リポジトリのsaveメソッドで集約を保存する際の重要な原則は？',
    options: [
      { id: 'a', text: '集約ルートのみ保存し、内部エンティティは別途保存', isCorrect: false },
      { id: 'b', text: '集約全体を1つのトランザクションで保存', isCorrect: true },
      { id: 'c', text: '変更された部分だけを保存', isCorrect: false },
      { id: 'd', text: '非同期で保存', isCorrect: false },
    ],
    explanation: 'リポジトリは集約全体を1つのトランザクション内で保存します。これにより集約の不変条件が常に保たれます。トランザクション境界=集約境界という原則です。',
  }),
  Question.create({
    id: 'q9-2-4',
    text: '永続化指向リポジトリの問題点として正しいものは？',
    options: [
      { id: 'a', text: 'メモリ使用量が多い', isCorrect: false },
      { id: 'b', text: '変更が保存されるタイミングが不明確', isCorrect: true },
      { id: 'c', text: 'コードが長くなる', isCorrect: false },
      { id: 'd', text: 'データベース接続が不安定', isCorrect: false },
    ],
    explanation: '永続化指向リポジトリでは、ORMが変更を自動追跡するため、いつ保存されるかが不明確になり、トランザクション境界も曖昧になります。これはテストも困難にします。',
  }),
  Question.create({
    id: 'q9-2-5',
    text: '依存性注入を使ってリポジトリを注入する利点として適切でないものは？',
    options: [
      { id: 'a', text: 'テスト時にモック実装に差し替えられる', isCorrect: false },
      { id: 'b', text: 'インターフェースと実装を分離できる', isCorrect: false },
      { id: 'c', text: 'データベース接続が高速化される', isCorrect: true },
      { id: 'd', text: '実装の切り替えが容易になる', isCorrect: false },
    ],
    explanation: '依存性注入の利点は、テスト容易性、疎結合、実装の切り替えやすさです。データベース接続の速度には直接影響しません。',
  }),
];

// Lesson 9-3: リポジトリ設計のベストプラクティス（5問）
const lesson9_3Questions: Question[] = [
  Question.create({
    id: 'q9-3-1',
    text: 'リポジトリのクエリメソッド命名として推奨されるものは？',
    options: [
      { id: 'a', text: 'findBySql(sql: string)', isCorrect: false },
      { id: 'b', text: 'findByCondition(condition: object)', isCorrect: false },
      { id: 'c', text: 'findByCustomerId(customerId: CustomerId)', isCorrect: true },
      { id: 'd', text: 'query(params: any)', isCorrect: false },
    ],
    explanation: 'リポジトリのメソッド名はドメイン用語を使い、意図を明確にすべきです。findByCustomerIdは検索条件が明確で、ドメイン知識を表現しています。',
  }),
  Question.create({
    id: 'q9-3-2',
    text: '仕様パターン（Specification Pattern）の主な目的は？',
    options: [
      { id: 'a', text: 'データベーススキーマを定義する', isCorrect: false },
      { id: 'b', text: '複雑な検索条件をオブジェクトで表現する', isCorrect: true },
      { id: 'c', text: 'パフォーマンスを最適化する', isCorrect: false },
      { id: 'd', text: 'セキュリティを強化する', isCorrect: false },
    ],
    explanation: '仕様パターンは、複雑な検索条件をオブジェクトとして表現し、and/or/notで組み合わせられるようにします。これによりドメインロジックとして検索条件を扱えます。',
  }),
  Question.create({
    id: 'q9-3-3',
    text: 'リポジトリのアンチパターンとして正しいものは？',
    options: [
      { id: 'a', text: 'findByIdメソッドを持つ', isCorrect: false },
      { id: 'b', text: 'リポジトリ内でビジネスロジックを実装する', isCorrect: true },
      { id: 'c', text: 'Promiseを返す', isCorrect: false },
      { id: 'd', text: 'トランザクションを使う', isCorrect: false },
    ],
    explanation: 'リポジトリは永続化のみを担当すべきです。ビジネスロジックはドメインモデルまたはドメインサービスに配置します。リポジトリにビジネスルールを入れると責務が混在します。',
  }),
  Question.create({
    id: 'q9-3-4',
    text: 'N+1問題を回避するための適切な方法は？',
    options: [
      { id: 'a', text: '集約内のエンティティを別々のクエリで取得する', isCorrect: false },
      { id: 'b', text: '集約全体を1クエリで取得する（eager loading）', isCorrect: true },
      { id: 'c', text: 'キャッシュを使う', isCorrect: false },
      { id: 'd', text: 'クエリを非同期実行する', isCorrect: false },
    ],
    explanation: 'N+1問題を回避するには、集約全体を1つのクエリで取得します（eager loading）。例えばPrismaのincludeオプションを使って、OrderとOrderItemsを同時に取得します。',
  }),
  Question.create({
    id: 'q9-3-5',
    text: 'リポジトリのテスト容易性を高める方法として最も適切なものは？',
    options: [
      { id: 'a', text: 'すべてのテストで実際のデータベースを使う', isCorrect: false },
      { id: 'b', text: 'InMemory実装を作成してテストで使う', isCorrect: true },
      { id: 'c', text: 'リポジトリをテストしない', isCorrect: false },
      { id: 'd', text: 'モックライブラリを使わない', isCorrect: false },
    ],
    explanation: 'リポジトリインターフェースのInMemory実装を作成すれば、データベースなしで高速にテストできます。IOrderRepositoryを実装したInMemoryOrderRepositoryを用意します。',
  }),
];

// Lesson 10-1: ファクトリとは（5問）
const lesson10_1Questions: Question[] = [
  Question.create({
    id: 'q10-1-1',
    text: 'ファクトリパターンの主な目的は何ですか？',
    options: [
      { id: 'a', text: 'データベースへの接続を管理する', isCorrect: false },
      { id: 'b', text: 'オブジェクトの生成という複雑な処理を専門に扱う', isCorrect: true },
      { id: 'c', text: 'オブジェクトの永続化を担当する', isCorrect: false },
      { id: 'd', text: 'UIコンポーネントを生成する', isCorrect: false },
    ],
    explanation: 'ファクトリは「オブジェクトの生成」という複雑で時々ダーティな仕事を専門に引き受けるクラスです。これにより生成ロジックとビジネスロジックを分離できます。',
  }),
  Question.create({
    id: 'q10-1-2',
    text: '「道具を作ることと道具を使うことは全く別の知識である」という原則が示唆することは？',
    options: [
      { id: 'a', text: 'すべてのクラスにファクトリを作るべき', isCorrect: false },
      { id: 'b', text: 'オブジェクトの生成と利用は異なる責務である', isCorrect: true },
      { id: 'c', text: 'コンストラクタは使うべきではない', isCorrect: false },
      { id: 'd', text: 'テストは不要である', isCorrect: false },
    ],
    explanation: 'この原則は、オブジェクトを「使う」知識と「作る」知識は別物であり、生成の複雑さを隠蔽してクリーンに分離すべきということを示しています。',
  }),
  Question.create({
    id: 'q10-1-3',
    text: 'コンストラクタにデータベース接続ロジックを書く問題点として適切でないものは？',
    options: [
      { id: 'a', text: '単一責任の原則に違反する', isCorrect: false },
      { id: 'b', text: 'テストが困難になる', isCorrect: false },
      { id: 'c', text: 'コードの行数が増える', isCorrect: true },
      { id: 'd', text: 'ドメインモデルにインフラ依存が混入する', isCorrect: false },
    ],
    explanation: 'コンストラクタにDB接続を書く問題は、責務の混在、テスト困難、インフラ依存の混入です。コード行数が増えること自体は本質的な問題ではありません。',
  }),
  Question.create({
    id: 'q10-1-4',
    text: 'ファクトリをテスト容易にするための方法として正しいものは？',
    options: [
      { id: 'a', text: 'ファクトリを使わずに直接newする', isCorrect: false },
      { id: 'b', text: 'インターフェースを定義し、InMemory実装に差し替える', isCorrect: true },
      { id: 'c', text: 'すべてのテストでデータベースを使う', isCorrect: false },
      { id: 'd', text: 'ファクトリをstaticメソッドにする', isCorrect: false },
    ],
    explanation: 'IUserFactoryのようなインターフェースを定義し、テスト時にはInMemoryUserFactoryに差し替えることで、データベースなしで高速なテストが可能になります。',
  }),
  Question.create({
    id: 'q10-1-5',
    text: 'ファクトリとリポジトリの責務の違いとして正しいものは？',
    options: [
      { id: 'a', text: 'ファクトリは永続化、リポジトリは生成', isCorrect: false },
      { id: 'b', text: 'ファクトリは新規生成、リポジトリは永続化・取得', isCorrect: true },
      { id: 'c', text: '両者は同じ責務を持つ', isCorrect: false },
      { id: 'd', text: 'ファクトリは検索、リポジトリは削除', isCorrect: false },
    ],
    explanation: 'ファクトリは新しいオブジェクトの生成を担当し、リポジトリは既存オブジェクトの永続化と取得を担当します。例えるなら、ファクトリは工場、リポジトリは倉庫です。',
  }),
];

// Lesson 10-2: ファクトリの実装パターン（5問）
const lesson10_2Questions: Question[] = [
  Question.create({
    id: 'q10-2-1',
    text: 'コンストラクタ（static createメソッド）で十分なケースはどれですか？',
    options: [
      { id: 'a', text: '外部APIへのアクセスが必要な場合', isCorrect: false },
      { id: 'b', text: 'シンプルな値オブジェクトでバリデーションのみ行う場合', isCorrect: true },
      { id: 'c', text: 'データベースからIDを採番する場合', isCorrect: false },
      { id: 'd', text: '複数のサービスを組み合わせる場合', isCorrect: false },
    ],
    explanation: 'Moneyのようなシンプルな値オブジェクトで、バリデーションのみ行う場合は、クラス内のstatic createメソッドで十分です。外部依存がある場合はファクトリを検討します。',
  }),
  Question.create({
    id: 'q10-2-2',
    text: '集約のファクトリ（集約ルートが子エンティティを生成する）のメリットは？',
    options: [
      { id: 'a', text: 'コードの行数が減る', isCorrect: false },
      { id: 'b', text: '集約の不変条件を確実に守れる', isCorrect: true },
      { id: 'c', text: 'パフォーマンスが向上する', isCorrect: false },
      { id: 'd', text: 'テストが不要になる', isCorrect: false },
    ],
    explanation: 'Order.addItem()のように集約ルートが子エンティティを生成すると、不変条件（例: 明細は100件まで）を確実にチェックでき、外部から直接OrderItemを作られることを防げます。',
  }),
  Question.create({
    id: 'q10-2-3',
    text: 'ファクトリメソッド（User.createCircle()）のユースケースとして適切なものは？',
    options: [
      { id: 'a', text: 'Userのprivateな情報を使って別オブジェクトを生成したい', isCorrect: true },
      { id: 'b', text: '大量のUserを一括生成したい', isCorrect: false },
      { id: 'c', text: 'Userをデータベースに保存したい', isCorrect: false },
      { id: 'd', text: 'Userを削除したい', isCorrect: false },
    ],
    explanation: 'User.createCircle()のようなファクトリメソッドは、Userのprivate IDを外部に公開せずにCircleを生成できます。ゲッターでIDを公開したくない場合に有効です。',
  }),
  Question.create({
    id: 'q10-2-4',
    text: 'ファクトリ導入を検討すべきサインとして正しいものは？',
    options: [
      { id: 'a', text: 'クラスのメソッドが3つ以上ある', isCorrect: false },
      { id: 'b', text: 'コンストラクタ内で他のオブジェクトをnewしている', isCorrect: true },
      { id: 'c', text: 'クラスがインターフェースを実装している', isCorrect: false },
      { id: 'd', text: 'クラス名が長い', isCorrect: false },
    ],
    explanation: 'コンストラクタの中で他のオブジェクト（例: DatabaseIdGenerator）を生成している場合、それはファクトリに分離すべきサインです。生成の複雑さが混入しています。',
  }),
  Question.create({
    id: 'q10-2-5',
    text: 'データベースの自動採番（INSERT後にIDが決まる）の問題点は？',
    options: [
      { id: 'a', text: 'パフォーマンスが悪い', isCorrect: false },
      { id: 'b', text: '保存前のエンティティがIDなしの不安定な状態になる', isCorrect: true },
      { id: 'c', text: 'トランザクションが使えない', isCorrect: false },
      { id: 'd', text: 'テーブル設計が複雑になる', isCorrect: false },
    ],
    explanation: 'DB自動採番では、保存前のエンティティはIDがnullの不安定な状態になります。また、IDのセッターを公開する必要があり、意図しない変更のリスクが生まれます。',
  }),
];

// Lesson 11-1: 仕様パターンとは（5問）
const lesson11_1Questions: Question[] = [
  Question.create({
    id: 'q11-1-1',
    text: '仕様パターンの主な目的は何ですか？',
    options: [
      { id: 'a', text: 'データベースのクエリを最適化する', isCorrect: false },
      { id: 'b', text: '複雑なビジネスルールの判定ロジックを独立したオブジェクトにカプセル化する', isCorrect: true },
      { id: 'c', text: 'UIコンポーネントを生成する', isCorrect: false },
      { id: 'd', text: 'オブジェクトの永続化を管理する', isCorrect: false },
    ],
    explanation: '仕様パターンは、あるオブジェクトが特定の条件を満たすかどうかを評価することだけを責務とした、独立したオブジェクトを作るパターンです。',
  }),
  Question.create({
    id: 'q11-1-2',
    text: 'ドメインロジックをアプリケーションサービスに書く問題点は？',
    options: [
      { id: 'a', text: 'コードの行数が増える', isCorrect: false },
      { id: 'b', text: 'ドメインの重要なルールがアプリケーション層に漏洩する', isCorrect: true },
      { id: 'c', text: 'パフォーマンスが悪化する', isCorrect: false },
      { id: 'd', text: 'コンパイルエラーが発生する', isCorrect: false },
    ],
    explanation: 'ドメインロジックをアプリケーションサービスに書くと、ビジネスルールが散らばり、同じ判定が必要な場所で重複コードが生まれます。時間が経つと条件分岐だらけの「神メソッド」になりがちです。',
  }),
  Question.create({
    id: 'q11-1-3',
    text: 'エンティティにリポジトリを渡す設計の問題点は？',
    options: [
      { id: 'a', text: 'メモリ使用量が増える', isCorrect: false },
      { id: 'b', text: 'ドメインモデルの純粋性が失われ、テストが複雑になる', isCorrect: true },
      { id: 'c', text: 'コードが短くなりすぎる', isCorrect: false },
      { id: 'd', text: '型エラーが発生する', isCorrect: false },
    ],
    explanation: 'エンティティにリポジトリを渡すと、ドメインモデルにインフラの都合（DB接続など）が入り込み、純粋性が失われます。テストにはモックが必要になり、複雑化します。',
  }),
  Question.create({
    id: 'q11-1-4',
    text: '仕様パターンの中心となるメソッドの名前は？',
    options: [
      { id: 'a', text: 'execute()', isCorrect: false },
      { id: 'b', text: 'validate()', isCorrect: false },
      { id: 'c', text: 'isSatisfiedBy()', isCorrect: true },
      { id: 'd', text: 'check()', isCorrect: false },
    ],
    explanation: 'isSatisfiedBy()は仕様パターンの標準的なメソッド名で、「この候補がこの仕様を満たすか？」という意図を明確に表現します。',
  }),
  Question.create({
    id: 'q11-1-5',
    text: '仕様パターンを使うべきケースとして適切でないものは？',
    options: [
      { id: 'a', text: '複雑な判定ロジックがある場合', isCorrect: false },
      { id: 'b', text: '判定に外部リソースへのアクセスが必要な場合', isCorrect: false },
      { id: 'c', text: 'シンプルな単一条件の判定の場合', isCorrect: true },
      { id: 'd', text: '同じ判定を複数の場所で使う場合', isCorrect: false },
    ],
    explanation: 'シンプルな単一条件（例: メンバー数 >= 30）は、エンティティのメソッドで十分です。仕様パターンは複雑なルールや外部依存がある場合に有効です。',
  }),
];

// Lesson 11-2: 仕様の実装と合成（5問）
const lesson11_2Questions: Question[] = [
  Question.create({
    id: 'q11-2-1',
    text: 'CompositeSpecificationクラスが提供するメソッドとして正しいものは？',
    options: [
      { id: 'a', text: 'save(), load(), delete()', isCorrect: false },
      { id: 'b', text: 'and(), or(), not()', isCorrect: true },
      { id: 'c', text: 'create(), update(), remove()', isCorrect: false },
      { id: 'd', text: 'get(), set(), clear()', isCorrect: false },
    ],
    explanation: 'CompositeSpecificationはand(), or(), not()メソッドを提供し、複数の仕様を論理演算で組み合わせることを可能にします。',
  }),
  Question.create({
    id: 'q11-2-2',
    text: '「プレミアム会員 OR VIP会員」という条件を仕様で表現する方法は？',
    options: [
      { id: 'a', text: 'premiumSpec.and(vipSpec)', isCorrect: false },
      { id: 'b', text: 'premiumSpec.or(vipSpec)', isCorrect: true },
      { id: 'c', text: 'premiumSpec.not(vipSpec)', isCorrect: false },
      { id: 'd', text: 'premiumSpec.xor(vipSpec)', isCorrect: false },
    ],
    explanation: 'or()メソッドを使うと、どちらかの仕様を満たす場合にtrueを返す合成仕様を作成できます。',
  }),
  Question.create({
    id: 'q11-2-3',
    text: '仕様をリポジトリの検索条件として使う際の問題点は？',
    options: [
      { id: 'a', text: 'コードが複雑になる', isCorrect: false },
      { id: 'b', text: '素朴に実装すると全件取得してフィルタリングするためパフォーマンスが悪い', isCorrect: true },
      { id: 'c', text: 'インターフェースが増える', isCorrect: false },
      { id: 'd', text: 'テストが書けなくなる', isCorrect: false },
    ],
    explanation: 'findBySpecification()を素朴に実装すると、全データをメモリに読み込んでからフィルタリングすることになり、大量データでは深刻なパフォーマンス問題になります。',
  }),
  Question.create({
    id: 'q11-2-4',
    text: '仕様パターンのパフォーマンス問題を解決するアプローチとして適切なものは？',
    options: [
      { id: 'a', text: '仕様パターンを使わない', isCorrect: false },
      { id: 'b', text: 'CQRS（読み取り専用の最適化クエリ）を導入する', isCorrect: true },
      { id: 'c', text: 'データベースを使わない', isCorrect: false },
      { id: 'd', text: '全てのデータをキャッシュする', isCorrect: false },
    ],
    explanation: 'CQRS（Command Query Responsibility Segregation）では、読み取り処理に最適化された専用クエリを用意し、パフォーマンスを確保しながらドメインモデルの純粋性を保ちます。',
  }),
  Question.create({
    id: 'q11-2-5',
    text: 'ファーストクラスコレクションと仕様パターンを組み合わせるメリットは？',
    options: [
      { id: 'a', text: 'コードの行数が減る', isCorrect: false },
      { id: 'b', text: '仕様クラスがリポジトリに依存せず純粋な判定機になる', isCorrect: true },
      { id: 'c', text: 'パフォーマンスが向上する', isCorrect: false },
      { id: 'd', text: 'データベース接続が不要になる', isCorrect: false },
    ],
    explanation: 'ファーストクラスコレクションに必要な情報を詰めて仕様に渡すと、仕様クラスは外部への問い合わせが不要になり、純粋な判定機としてテストも容易になります。',
  }),
];

// Lesson 12-1: レイヤードアーキテクチャとは（5問）
const lesson12_1Questions: Question[] = [
  Question.create({
    id: 'q12-1-1',
    text: 'DDDにおいてアーキテクチャが果たすべき最も重要な役割は何ですか？',
    options: [
      { id: 'a', text: 'UIを美しくする', isCorrect: false },
      { id: 'b', text: 'データベースを高速化する', isCorrect: false },
      { id: 'c', text: 'ドメインモデルを隔離し、防衛する', isCorrect: true },
      { id: 'd', text: 'コードの行数を減らす', isCorrect: false },
    ],
    explanation: 'DDDにおいてアーキテクチャの最も重要な役割は、ドメインモデルをUIやデータベースといったソフトウェア固有の事情から隔離し、防衛することです。',
  }),
  Question.create({
    id: 'q12-1-2',
    text: '「利口なUI」アンチパターンの問題点として正しいものは？',
    options: [
      { id: 'a', text: 'UIが美しくなりすぎる', isCorrect: false },
      { id: 'b', text: 'ビジネスロジックがUIに分散し、仕様変更に弱くなる', isCorrect: true },
      { id: 'c', text: 'サーバー負荷が高くなる', isCorrect: false },
      { id: 'd', text: 'テストが速くなりすぎる', isCorrect: false },
    ],
    explanation: '利口なUIでは、ビジネスロジックが複数の画面に分散するため、仕様変更時に複数箇所を修正する必要があり、修正漏れというバグの温床になります。',
  }),
  Question.create({
    id: 'q12-1-3',
    text: 'レイヤードアーキテクチャの依存関係ルールとして正しいものは？',
    options: [
      { id: 'a', text: 'すべての層が自由に依存できる', isCorrect: false },
      { id: 'b', text: '下から上への一方通行', isCorrect: false },
      { id: 'c', text: '上から下への一方通行', isCorrect: true },
      { id: 'd', text: '水平方向にのみ依存できる', isCorrect: false },
    ],
    explanation: 'レイヤードアーキテクチャでは、依存の方向は原則として上から下への一方通行です。プレゼンテーション → アプリケーション → ドメイン → インフラの順に依存します。',
  }),
  Question.create({
    id: 'q12-1-4',
    text: 'ドメイン層が守るべき原則として正しいものは？',
    options: [
      { id: 'a', text: 'データベースに直接アクセスする', isCorrect: false },
      { id: 'b', text: 'UIの都合を知っている', isCorrect: false },
      { id: 'c', text: '他の層の都合を知らない（最も純粋）', isCorrect: true },
      { id: 'd', text: 'すべての層に依存する', isCorrect: false },
    ],
    explanation: 'ドメイン層は他の層の都合を知らない「最も純粋」な層でなければなりません。UIの表示形式やデータベースの保存方法は知らずに、ビジネスロジックだけを表現します。',
  }),
  Question.create({
    id: 'q12-1-5',
    text: 'アーキテクチャがもたらす利点として「一度に多くのことを考えなくて済む」とはどういう意味ですか？',
    options: [
      { id: 'a', text: 'コードの量が減る', isCorrect: false },
      { id: 'b', text: '関心事が分離され、今考えるべきことが明確になる', isCorrect: true },
      { id: 'c', text: '自動でコードが生成される', isCorrect: false },
      { id: 'd', text: 'ドキュメントを読まなくて済む', isCorrect: false },
    ],
    explanation: 'アーキテクチャにより関心事が分離されると、例えばUIの色を考えるときは割引計算を忘れられ、ビジネスロジック実装時はDB保存方法を考えなくて済みます。',
  }),
];

// Lesson 12-2: DDDにおける4層構造（5問）
const lesson12_2Questions: Question[] = [
  Question.create({
    id: 'q12-2-1',
    text: 'アプリケーション層の役割として正しいものは？',
    options: [
      { id: 'a', text: 'ビジネスルールを定義する', isCorrect: false },
      { id: 'b', text: 'ユースケースの調整役（オーケストラの指揮者）', isCorrect: true },
      { id: 'c', text: 'データベースに直接アクセスする', isCorrect: false },
      { id: 'd', text: 'UIのレイアウトを決める', isCorrect: false },
    ],
    explanation: 'アプリケーション層は指揮者のように、ドメインオブジェクトを調整してユースケースを実現します。ビジネスルール自体はドメイン層に任せ、処理の流れを管理します。',
  }),
  Question.create({
    id: 'q12-2-2',
    text: 'プレゼンテーション層がドメインオブジェクトを直接扱わず、DTOを使う理由は？',
    options: [
      { id: 'a', text: 'DTOの方が処理が速い', isCorrect: false },
      { id: 'b', text: 'ドメインの純粋性を保ち、表示用データと分離するため', isCorrect: true },
      { id: 'c', text: 'DTOの方がコード量が少ない', isCorrect: false },
      { id: 'd', text: 'データベースがDTOしか受け付けない', isCorrect: false },
    ],
    explanation: 'DTOを使うことで、ドメインモデルが表示の都合に汚染されることを防ぎ、プレゼンテーション層とドメイン層を明確に分離できます。',
  }),
  Question.create({
    id: 'q12-2-3',
    text: '依存性逆転の原則（DIP）がもたらすメリットとして正しいものは？',
    options: [
      { id: 'a', text: 'コードの実行速度が上がる', isCorrect: false },
      { id: 'b', text: 'テスト時にモック実装に差し替えやすくなる', isCorrect: true },
      { id: 'c', text: 'データベース接続が不要になる', isCorrect: false },
      { id: 'd', text: 'UIのデザインが向上する', isCorrect: false },
    ],
    explanation: 'DIPにより、ドメイン層で定義したインターフェースを使うと、テスト時にモック実装に簡単に差し替えられ、データベースなしで高速にテストできます。',
  }),
  Question.create({
    id: 'q12-2-4',
    text: 'インフラストラクチャ層の責務として正しいものは？',
    options: [
      { id: 'a', text: 'ビジネスルールの実装', isCorrect: false },
      { id: 'b', text: 'ユーザー入力の検証', isCorrect: false },
      { id: 'c', text: 'データベースや外部APIとの技術的詳細の実装', isCorrect: true },
      { id: 'd', text: 'ユースケースの調整', isCorrect: false },
    ],
    explanation: 'インフラストラクチャ層は、データベース接続、外部API連携、ORMの使用など、技術的詳細の実装を担当します。ドメイン層のインターフェースを実装します。',
  }),
  Question.create({
    id: 'q12-2-5',
    text: 'アプリケーション層でビジネスルール（例: 名前は3文字以上）を実装することの問題点は？',
    options: [
      { id: 'a', text: 'コードが長くなる', isCorrect: false },
      { id: 'b', text: 'ビジネスルールがドメイン層から漏れ出し、重複や不整合が起きやすくなる', isCorrect: true },
      { id: 'c', text: '実行速度が遅くなる', isCorrect: false },
      { id: 'd', text: 'データベースに保存できなくなる', isCorrect: false },
    ],
    explanation: 'ビジネスルールをアプリケーション層に書くと、ドメインの知識が外部に漏れ、複数のユースケースで同じルールを重複実装したり、ルールの不整合が起きやすくなります。',
  }),
];

// Lesson 13-1: クリーンアーキテクチャとは（5問）
const lesson13_1Questions: Question[] = [
  Question.create({
    id: 'q13-1-1',
    text: 'クリーンアーキテクチャを提唱したのは誰ですか？',
    options: [
      { id: 'a', text: 'Martin Fowler', isCorrect: false },
      { id: 'b', text: 'Eric Evans', isCorrect: false },
      { id: 'c', text: 'Robert C. Martin（Uncle Bob）', isCorrect: true },
      { id: 'd', text: 'Kent Beck', isCorrect: false },
    ],
    explanation: 'クリーンアーキテクチャは2012年にRobert C. Martin（通称Uncle Bob）によって提唱されました。Hexagonal ArchitectureやOnion Architectureの影響を受けています。',
  }),
  Question.create({
    id: 'q13-1-2',
    text: 'クリーンアーキテクチャの同心円構造で、最も内側に位置するのは何ですか？',
    options: [
      { id: 'a', text: 'Use Cases', isCorrect: false },
      { id: 'b', text: 'Interface Adapters', isCorrect: false },
      { id: 'c', text: 'Frameworks & Drivers', isCorrect: false },
      { id: 'd', text: 'Entities', isCorrect: true },
    ],
    explanation: 'クリーンアーキテクチャでは、Entities（エンティティ）が最も内側に位置し、ビジネスルールの核心を表現します。外側に向かってUse Cases、Interface Adapters、Frameworks & Driversと続きます。',
  }),
  Question.create({
    id: 'q13-1-3',
    text: 'クリーンアーキテクチャの依存関係のルールとして正しいものは？',
    options: [
      { id: 'a', text: '内側から外側への一方通行', isCorrect: false },
      { id: 'b', text: '外側から内側への一方通行', isCorrect: true },
      { id: 'c', text: '双方向の依存が許可される', isCorrect: false },
      { id: 'd', text: '隣接する層のみ依存可能', isCorrect: false },
    ],
    explanation: 'クリーンアーキテクチャでは、依存関係は外側から内側への一方通行です。内側の層は外側の層について何も知らないというルールを厳守します。',
  }),
  Question.create({
    id: 'q13-1-4',
    text: 'Uncle Bobが「フレームワークは詳細である」と主張する理由として正しいものは？',
    options: [
      { id: 'a', text: 'フレームワークは学習が難しいから', isCorrect: false },
      { id: 'b', text: 'フレームワークは交換可能であり、ビジネスロジックは知らなくてよいから', isCorrect: true },
      { id: 'c', text: 'フレームワークは処理が遅いから', isCorrect: false },
      { id: 'd', text: 'フレームワークは無料だから', isCorrect: false },
    ],
    explanation: 'フレームワーク、データベース、Webは「詳細」であり、交換可能です。ビジネスロジックはこれらの詳細を知らなくてよく、独立して存在すべきです。',
  }),
  Question.create({
    id: 'q13-1-5',
    text: 'クリーンアーキテクチャがテスタビリティを重視する理由として正しいものは？',
    options: [
      { id: 'a', text: 'テストコードが少なくて済むから', isCorrect: false },
      { id: 'b', text: 'インターフェースによる依存注入でモックに差し替えやすいから', isCorrect: true },
      { id: 'c', text: 'テストフレームワークが不要だから', isCorrect: false },
      { id: 'd', text: 'テストが自動生成されるから', isCorrect: false },
    ],
    explanation: 'クリーンアーキテクチャではインターフェースを介して依存するため、テスト時にモック実装に簡単に差し替えられます。これによりデータベースやネットワークなしで高速にテストできます。',
  }),
];

// Lesson 13-2: 依存性逆転の原則（DIP）（5問）
const lesson13_2Questions: Question[] = [
  Question.create({
    id: 'q13-2-1',
    text: '依存性逆転の原則（DIP）の定義として正しいものは？',
    options: [
      { id: 'a', text: '高レベルモジュールは低レベルモジュールに直接依存すべき', isCorrect: false },
      { id: 'b', text: '高レベルモジュールも低レベルモジュールも抽象（インターフェース）に依存すべき', isCorrect: true },
      { id: 'c', text: '低レベルモジュールは高レベルモジュールに依存すべき', isCorrect: false },
      { id: 'd', text: 'すべてのモジュールは具体的な実装に依存すべき', isCorrect: false },
    ],
    explanation: 'DIPでは、高レベルモジュールも低レベルモジュールも抽象（インターフェース）に依存すべきです。具体的な実装ではなく、抽象に依存することで疎結合を実現します。',
  }),
  Question.create({
    id: 'q13-2-2',
    text: '高レベルモジュールが低レベルモジュールに直接依存する場合の問題点は？',
    options: [
      { id: 'a', text: 'コンパイルが遅くなる', isCorrect: false },
      { id: 'b', text: 'テスト困難、変更困難、再利用困難になる', isCorrect: true },
      { id: 'c', text: 'メモリ使用量が増える', isCorrect: false },
      { id: 'd', text: 'セキュリティが低下する', isCorrect: false },
    ],
    explanation: '直接依存すると、テスト時に実際のデータベース接続が必要になり、実装を変更するにはコード修正が必要で、他のプロジェクトで再利用できなくなります。',
  }),
  Question.create({
    id: 'q13-2-3',
    text: 'DIコンテナの主な役割として正しいものは？',
    options: [
      { id: 'a', text: 'データベースへの接続を管理する', isCorrect: false },
      { id: 'b', text: 'オブジェクトの生成と依存関係の解決を自動化する', isCorrect: true },
      { id: 'c', text: 'UIコンポーネントを生成する', isCorrect: false },
      { id: 'd', text: 'ログを記録する', isCorrect: false },
    ],
    explanation: 'DIコンテナは、オブジェクトの生成と依存関係の解決を自動化します。登録されたファクトリに基づいて、必要な依存関係を注入してオブジェクトを生成します。',
  }),
  Question.create({
    id: 'q13-2-4',
    text: 'コンストラクタインジェクションの利点として正しいものは？',
    options: [
      { id: 'a', text: '依存関係を後から変更できる', isCorrect: false },
      { id: 'b', text: '依存関係が明確で、不変性を保証できる', isCorrect: true },
      { id: 'c', text: 'コードが短くなる', isCorrect: false },
      { id: 'd', text: '実行速度が向上する', isCorrect: false },
    ],
    explanation: 'コンストラクタインジェクションでは、オブジェクト生成時に必要な依存関係が明確になり、生成後は変更されないため不変性が保証されます。',
  }),
  Question.create({
    id: 'q13-2-5',
    text: 'DIPを適用した場合、リポジトリのインターフェースはどこに配置すべきですか？',
    options: [
      { id: 'a', text: 'Infrastructure層', isCorrect: false },
      { id: 'b', text: 'Presentation層', isCorrect: false },
      { id: 'c', text: 'Domain層', isCorrect: true },
      { id: 'd', text: 'Application層', isCorrect: false },
    ],
    explanation: 'リポジトリのインターフェースはDomain層に配置します。これにより、ドメイン層が技術的詳細（Infrastructure層）に依存せず、依存関係が逆転します。',
  }),
];

// Lesson 13-3: ユースケース層の実装（5問）
const lesson13_3Questions: Question[] = [
  Question.create({
    id: 'q13-3-1',
    text: 'ユースケース（Interactor）の主な責務は何ですか？',
    options: [
      { id: 'a', text: 'UIの表示を制御する', isCorrect: false },
      { id: 'b', text: 'アプリケーション固有のビジネスロジックをカプセル化する', isCorrect: true },
      { id: 'c', text: 'データベースに直接アクセスする', isCorrect: false },
      { id: 'd', text: 'HTTPリクエストを処理する', isCorrect: false },
    ],
    explanation: 'ユースケースは、アプリケーション固有のビジネスロジックをカプセル化します。入力を受け取り、ドメインオブジェクトを操作し、永続化を依頼し、出力を返します。',
  }),
  Question.create({
    id: 'q13-3-2',
    text: 'EntityとUse Caseの違いとして正しいものは？',
    options: [
      { id: 'a', text: 'Entityはアプリケーション固有、Use Caseは普遍的なビジネスルール', isCorrect: false },
      { id: 'b', text: 'Entityは普遍的なビジネスルール、Use Caseはアプリケーション固有のルール', isCorrect: true },
      { id: 'c', text: 'どちらも同じ責務を持つ', isCorrect: false },
      { id: 'd', text: 'Entityはデータベース、Use CaseはAPI', isCorrect: false },
    ],
    explanation: 'Entityは普遍的なビジネスルール（例：注文は0個以上の商品を持つ）を持ち、Use Caseはアプリケーション固有のルール（例：ユーザー登録時にメール送信）を持ちます。',
  }),
  Question.create({
    id: 'q13-3-3',
    text: 'DTOを使う主な理由として正しいものは？',
    options: [
      { id: 'a', text: '処理速度を向上させるため', isCorrect: false },
      { id: 'b', text: 'ドメインオブジェクトを外部に漏らさないため', isCorrect: true },
      { id: 'c', text: 'データベースのスキーマを定義するため', isCorrect: false },
      { id: 'd', text: 'コード量を減らすため', isCorrect: false },
    ],
    explanation: 'DTOを使うことで、ドメインオブジェクトを外部に漏らさず、必要なデータだけを選別し、入出力の形式を自由に設計できます。',
  }),
  Question.create({
    id: 'q13-3-4',
    text: 'Input BoundaryとOutput Boundaryの役割として正しいものは？',
    options: [
      { id: 'a', text: 'データベースとの境界を定義する', isCorrect: false },
      { id: 'b', text: 'ユースケースと外部（Controller/Presenter）との明確なインターフェースを定義する', isCorrect: true },
      { id: 'c', text: 'UIコンポーネントの境界を定義する', isCorrect: false },
      { id: 'd', text: 'ネットワーク通信の境界を定義する', isCorrect: false },
    ],
    explanation: 'Input BoundaryとOutput Boundaryは、ユースケースと外部（Controller、Presenter）との明確なインターフェースを定義します。これにより外部の変更からユースケースを保護します。',
  }),
  Question.create({
    id: 'q13-3-5',
    text: 'ユースケースの命名規則として推奨されるパターンは？',
    options: [
      { id: 'a', text: '名詞のみ（例：User）', isCorrect: false },
      { id: 'b', text: '動詞 + 名詞 + UseCase（例：RegisterUserUseCase）', isCorrect: true },
      { id: 'c', text: '名詞 + Manager（例：UserManager）', isCorrect: false },
      { id: 'd', text: 'Service + 名詞（例：ServiceUser）', isCorrect: false },
    ],
    explanation: 'ユースケースは「動詞 + 名詞 + UseCase」のパターンで命名するのが推奨されます。例：RegisterUserUseCase、GetCourseUseCase、CreateOrderUseCaseなど。',
  }),
];

// =============================================================================
// Chapter 14: ヘキサゴナルアーキテクチャ
// =============================================================================

// Lesson 14-1: ヘキサゴナルアーキテクチャとは（5問）
const lesson14_1Questions: Question[] = [
  Question.create({
    id: 'q14-1-1',
    text: 'ヘキサゴナルアーキテクチャを提唱した人物と年代として正しいものは？',
    options: [
      { id: 'a', text: 'Robert C. Martin、2012年', isCorrect: false },
      { id: 'b', text: 'Alistair Cockburn、2005年', isCorrect: true },
      { id: 'c', text: 'Eric Evans、2003年', isCorrect: false },
      { id: 'd', text: 'Martin Fowler、2000年', isCorrect: false },
    ],
    explanation: 'ヘキサゴナルアーキテクチャは2005年にAlistair Cockburnによって提唱されました。Ports and Adaptersアーキテクチャとも呼ばれます。',
  }),
  Question.create({
    id: 'q14-1-2',
    text: '六角形（Hexagon）という形が表現しているものは何ですか？',
    options: [
      { id: 'a', text: '6つの固定されたポート', isCorrect: false },
      { id: 'b', text: '任意の数のポートを持てることと対称性', isCorrect: true },
      { id: 'c', text: '6つのレイヤー', isCorrect: false },
      { id: 'd', text: '6つのコンポーネント', isCorrect: false },
    ],
    explanation: '六角形は「6つのポート」を意味するのではなく、任意の数のポートを持てることと、内側と外側の対称的な関係を視覚的に表現しています。',
  }),
  Question.create({
    id: 'q14-1-3',
    text: 'ヘキサゴナルアーキテクチャの「内側」に配置されるものは？',
    options: [
      { id: 'a', text: 'データベース、外部API', isCorrect: false },
      { id: 'b', text: 'Webフレームワーク、UI', isCorrect: false },
      { id: 'c', text: 'ドメインロジック、ユースケース', isCorrect: true },
      { id: 'd', text: 'ファイルシステム、メッセージキュー', isCorrect: false },
    ],
    explanation: '内側（Application Core）には、技術に依存しない純粋なビジネスロジックであるドメインロジックとユースケースが配置されます。',
  }),
  Question.create({
    id: 'q14-1-4',
    text: 'ゲーム機の例えで「ゲーム機本体」に相当するのは？',
    options: [
      { id: 'a', text: 'アダプター', isCorrect: false },
      { id: 'b', text: 'ポート', isCorrect: false },
      { id: 'c', text: 'Application Core（ビジネスロジック）', isCorrect: true },
      { id: 'd', text: 'データベース', isCorrect: false },
    ],
    explanation: 'ゲーム機本体はApplication Core（ビジネスロジック）に相当します。どのコントローラーやディスプレイが接続されているか知らずに、純粋なゲームロジックを実行します。',
  }),
  Question.create({
    id: 'q14-1-5',
    text: 'ヘキサゴナルアーキテクチャとクリーンアーキテクチャの関係として正しいものは？',
    options: [
      { id: 'a', text: '全く異なる目的を持つ独立したアーキテクチャ', isCorrect: false },
      { id: 'b', text: 'クリーンはヘキサゴナルの考え方を継承・発展させたもの', isCorrect: true },
      { id: 'c', text: 'ヘキサゴナルはクリーンを継承・発展させたもの', isCorrect: false },
      { id: 'd', text: '同時に同じ人物が提唱した', isCorrect: false },
    ],
    explanation: 'クリーンアーキテクチャ（2012年、Robert C. Martin）はヘキサゴナルアーキテクチャ（2005年、Alistair Cockburn）の考え方を継承・発展させたものです。どちらも「ビジネスロジックを技術から隔離する」という同じ目標を持ちます。',
  }),
];

// Lesson 14-2: ポートとアダプターの実装（5問）
const lesson14_2Questions: Question[] = [
  Question.create({
    id: 'q14-2-1',
    text: '駆動ポート（Driving Port）の役割として正しいものは？',
    options: [
      { id: 'a', text: 'データベースにアクセスする', isCorrect: false },
      { id: 'b', text: '外部からアプリケーションを駆動するためのインターフェース', isCorrect: true },
      { id: 'c', text: 'ログを出力する', isCorrect: false },
      { id: 'd', text: 'メール送信を行う', isCorrect: false },
    ],
    explanation: '駆動ポート（Driving Port / Primary Port）は、外部からアプリケーションを駆動するためのインターフェースです。UseCase Interfaceがその典型例です。',
  }),
  Question.create({
    id: 'q14-2-2',
    text: '被駆動ポート（Driven Port）の例として正しいものは？',
    options: [
      { id: 'a', text: 'Controller', isCorrect: false },
      { id: 'b', text: 'UseCase Interface', isCorrect: false },
      { id: 'c', text: 'Repository Interface、EmailService Interface', isCorrect: true },
      { id: 'd', text: 'CLI', isCorrect: false },
    ],
    explanation: '被駆動ポート（Driven Port / Secondary Port）は、アプリケーションから外部リソースにアクセスするためのインターフェースです。Repository InterfaceやEmailService Interfaceがその例です。',
  }),
  Question.create({
    id: 'q14-2-3',
    text: 'プライマリアダプター（Primary Adapter）の役割として正しいものは？',
    options: [
      { id: 'a', text: 'データベースに保存する', isCorrect: false },
      { id: 'b', text: '外部からの入力をアプリケーションが理解できる形式に変換する', isCorrect: true },
      { id: 'c', text: 'メールを送信する', isCorrect: false },
      { id: 'd', text: 'ファイルを読み書きする', isCorrect: false },
    ],
    explanation: 'プライマリアダプター（Primary Adapter / Driving Adapter）は、外部からの入力（HTTPリクエスト、コマンドライン引数など）をアプリケーションが理解できる形式（UseCase Input）に変換します。Controllerがその典型例です。',
  }),
  Question.create({
    id: 'q14-2-4',
    text: 'セカンダリアダプター（Secondary Adapter）の例として正しいものは？',
    options: [
      { id: 'a', text: 'Web Controller、CLI', isCorrect: false },
      { id: 'b', text: 'PostgresUserRepository、SendGridEmailService', isCorrect: true },
      { id: 'c', text: 'UseCase Implementation', isCorrect: false },
      { id: 'd', text: 'Domain Model', isCorrect: false },
    ],
    explanation: 'セカンダリアダプター（Secondary Adapter / Driven Adapter）は、被駆動ポートの具体的な実装です。PostgresUserRepository（データベース）やSendGridEmailService（メール送信）などがその例です。',
  }),
  Question.create({
    id: 'q14-2-5',
    text: 'テスト時にアダプターを差し替えることの利点として正しいものは？',
    options: [
      { id: 'a', text: 'コード量が減る', isCorrect: false },
      { id: 'b', text: '本番データを使ってテストできる', isCorrect: false },
      { id: 'c', text: '高速で独立したテストが可能になる', isCorrect: true },
      { id: 'd', text: 'テストコードが不要になる', isCorrect: false },
    ],
    explanation: 'テスト時にインメモリリポジトリやモックサービスに差し替えることで、データベースや外部サービスに依存しない、高速で独立したテストが可能になります。',
  }),
];

// =============================================================================
// Chapter 15: CQRS/イベントソーシング
// =============================================================================

// Lesson 15-1: CQRSとは（5問）
const lesson15_1Questions: Question[] = [
  Question.create({
    id: 'q15-1-1',
    text: 'CQRSの正式名称は何ですか？',
    options: [
      { id: 'a', text: 'Command Query Responsibility Segregation', isCorrect: true },
      { id: 'b', text: 'Command Query Response System', isCorrect: false },
      { id: 'c', text: 'Create Query Read Separation', isCorrect: false },
      { id: 'd', text: 'Command Query Resource Service', isCorrect: false },
    ],
    explanation: 'CQRSは「Command Query Responsibility Segregation」の略で、読み取り（Query）と書き込み（Command）の責務を分離するアーキテクチャパターンです。',
  }),
  Question.create({
    id: 'q15-1-2',
    text: 'CQS原則を提唱した人物は誰ですか？',
    options: [
      { id: 'a', text: 'Greg Young', isCorrect: false },
      { id: 'b', text: 'Bertrand Meyer', isCorrect: true },
      { id: 'c', text: 'Eric Evans', isCorrect: false },
      { id: 'd', text: 'Robert C. Martin', isCorrect: false },
    ],
    explanation: 'CQS原則（Command Query Separation）はBertrand Meyerによって提唱されました。CQRSはこのCQS原則をアーキテクチャレベルに発展させたものです。',
  }),
  Question.create({
    id: 'q15-1-3',
    text: 'CQRSで読み取りと書き込みを分離する主な理由として正しいものは？',
    options: [
      { id: 'a', text: 'セキュリティを向上させるため', isCorrect: false },
      { id: 'b', text: 'コード量を減らすため', isCorrect: false },
      { id: 'c', text: 'スケーラビリティ、最適化、複雑さの管理のため', isCorrect: true },
      { id: 'd', text: 'データベースのライセンスコストを削減するため', isCorrect: false },
    ],
    explanation: 'CQRSは、読み取りと書き込みで異なるスケール要件への対応、それぞれに最適なデータモデルの使用、ビジネスロジックの複雑さの分離を目的としています。',
  }),
  Question.create({
    id: 'q15-1-4',
    text: 'CQS原則において、Commandメソッドの特徴として正しいものは？',
    options: [
      { id: 'a', text: '値を返し、状態を変更しない', isCorrect: false },
      { id: 'b', text: '状態を変更し、戻り値を持たない', isCorrect: true },
      { id: 'c', text: '値を返し、状態も変更する', isCorrect: false },
      { id: 'd', text: '何もしない', isCorrect: false },
    ],
    explanation: 'CQS原則において、Commandは状態を変更する操作で、戻り値を持ちません。一方、Queryは状態を返すが変更しません。',
  }),
  Question.create({
    id: 'q15-1-5',
    text: 'CQRSの実装レベルで「Level 3: データストア分離」の特徴は？',
    options: [
      { id: 'a', text: '同じDB、同じモデルでコードレベルで分離', isCorrect: false },
      { id: 'b', text: '同じDB、異なるモデルで分離', isCorrect: false },
      { id: 'c', text: '異なるDBで完全分離', isCorrect: true },
      { id: 'd', text: 'データベースを使わない', isCorrect: false },
    ],
    explanation: 'Level 3では、書き込み用と読み取り用で異なるデータベースを使用し、完全に分離します。これにより最高のスケーラビリティと最適化が可能になります。',
  }),
];

// Lesson 15-2: イベントソーシングとは（5問）
const lesson15_2Questions: Question[] = [
  Question.create({
    id: 'q15-2-1',
    text: 'イベントソーシングの基本的な考え方として正しいものは？',
    options: [
      { id: 'a', text: '現在の状態のみを保存する', isCorrect: false },
      { id: 'b', text: '状態ではなくイベント（状態変化）を保存する', isCorrect: true },
      { id: 'c', text: 'イベントを一時的に保存してすぐ削除する', isCorrect: false },
      { id: 'd', text: '状態とイベントの両方を同時に保存する', isCorrect: false },
    ],
    explanation: 'イベントソーシングでは、アプリケーションの状態を現在の状態ではなく、状態変化のイベント履歴として保存します。状態はイベントから導出されます。',
  }),
  Question.create({
    id: 'q15-2-2',
    text: 'イベントソーシングにおける「リプレイ」とは何ですか？',
    options: [
      { id: 'a', text: 'イベントを削除すること', isCorrect: false },
      { id: 'b', text: 'イベントを順番に適用して状態を再構築すること', isCorrect: true },
      { id: 'c', text: 'イベントをコピーすること', isCorrect: false },
      { id: 'd', text: 'イベントを別のシステムに送信すること', isCorrect: false },
    ],
    explanation: 'リプレイは、保存されたイベントを順番に適用することで、任意の時点の状態を再構築する操作です。これにより「時間旅行」が可能になります。',
  }),
  Question.create({
    id: 'q15-2-3',
    text: 'スナップショットの目的として正しいものは？',
    options: [
      { id: 'a', text: 'イベントを削除するため', isCorrect: false },
      { id: 'b', text: '大量のイベントの再構築を最適化するため', isCorrect: true },
      { id: 'c', text: 'セキュリティを向上させるため', isCorrect: false },
      { id: 'd', text: 'データベース容量を削減するため', isCorrect: false },
    ],
    explanation: 'スナップショットは、ある時点の状態を保存しておくことで、大量のイベントを毎回すべてリプレイする必要をなくし、再構築を最適化します。',
  }),
  Question.create({
    id: 'q15-2-4',
    text: 'イベントソーシングとイベント駆動アーキテクチャ（EDA）の違いとして正しいものは？',
    options: [
      { id: 'a', text: '両者は同じものである', isCorrect: false },
      { id: 'b', text: 'ESではイベントが真実の源、EDAではイベントは通知手段', isCorrect: true },
      { id: 'c', text: 'EDAではイベントが真実の源、ESではイベントは通知手段', isCorrect: false },
      { id: 'd', text: 'ESはデータベースを使わない', isCorrect: false },
    ],
    explanation: 'イベントソーシングではイベントが真実の源（Source of Truth）であり、状態はイベントから導出されます。EDAではイベントはコンポーネント間の通知手段で、状態は別途保存されます。',
  }),
  Question.create({
    id: 'q15-2-5',
    text: 'イベントソーシングのメリットとして正しいものは？',
    options: [
      { id: 'a', text: 'シンプルで学習コストが低い', isCorrect: false },
      { id: 'b', text: '完全な監査ログと任意時点の状態再構築が可能', isCorrect: true },
      { id: 'c', text: 'ストレージコストが低い', isCorrect: false },
      { id: 'd', text: 'クエリが簡単', isCorrect: false },
    ],
    explanation: 'イベントソーシングの主なメリットは、完全な監査ログ（いつ誰が何をしたか追跡可能）と、任意の時点の状態を再構築できる「時間旅行」機能です。',
  }),
];

// Lesson 15-3: CQRS/ESの実装パターン（5問）
const lesson15_3Questions: Question[] = [
  Question.create({
    id: 'q15-3-1',
    text: 'コマンドハンドラの主な役割は何ですか？',
    options: [
      { id: 'a', text: 'データを読み取って返す', isCorrect: false },
      { id: 'b', text: 'コマンド（意図）を受け取り、集約を操作する', isCorrect: true },
      { id: 'c', text: 'UIを描画する', isCorrect: false },
      { id: 'd', text: 'データベースのスキーマを管理する', isCorrect: false },
    ],
    explanation: 'コマンドハンドラは、システムに対する意図（Intent）を表現するコマンドを受け取り、ドメインの集約を操作してビジネスロジックを実行します。',
  }),
  Question.create({
    id: 'q15-3-2',
    text: 'Read Model（プロジェクション）の特徴として正しいものは？',
    options: [
      { id: 'a', text: 'ビジネスルールを含む', isCorrect: false },
      { id: 'b', text: '読み取りに最適化された非正規化されたデータ', isCorrect: true },
      { id: 'c', text: '書き込み操作を行う', isCorrect: false },
      { id: 'd', text: 'イベントを発行する', isCorrect: false },
    ],
    explanation: 'Read Model（プロジェクション）は、クエリに最適化された非正規化されたデータ構造です。画面表示に必要な情報が事前に結合されています。',
  }),
  Question.create({
    id: 'q15-3-3',
    text: 'Eventual Consistency（結果整合性）とは何ですか？',
    options: [
      { id: 'a', text: 'データが常に即座に整合している状態', isCorrect: false },
      { id: 'b', text: '書き込み後、読み取り側にすぐ反映されない可能性がある状態', isCorrect: true },
      { id: 'c', text: 'データが永久に整合しない状態', isCorrect: false },
      { id: 'd', text: 'トランザクションを使わない状態', isCorrect: false },
    ],
    explanation: 'Eventual Consistency（結果整合性）は、Command側で変更が保存された後、Query側のRead Modelに反映されるまでに時間差が生じる可能性がある状態です。最終的には整合します。',
  }),
  Question.create({
    id: 'q15-3-4',
    text: 'CQRS/ESとDDDの集約の関係として正しいものは？',
    options: [
      { id: 'a', text: '全く関係がない', isCorrect: false },
      { id: 'b', text: '集約の境界 = イベントストリームの境界として相性が良い', isCorrect: true },
      { id: 'c', text: 'CQRS/ESを使うと集約は不要になる', isCorrect: false },
      { id: 'd', text: '集約はCommand側でのみ使用される', isCorrect: false },
    ],
    explanation: 'CQRS/ESはDDDの集約と非常に相性が良く、集約の境界がイベントストリームの境界と一致します。集約がイベントを発行し、状態をイベントから再構築します。',
  }),
  Question.create({
    id: 'q15-3-5',
    text: 'CQRS/ESを避けるべきケースとして正しいものは？',
    options: [
      { id: 'a', text: '複雑なドメインロジックがある場合', isCorrect: false },
      { id: 'b', text: '監査要件が厳しい場合', isCorrect: false },
      { id: 'c', text: 'シンプルなCRUDアプリケーションの場合', isCorrect: true },
      { id: 'd', text: '高いスケーラビリティが必要な場合', isCorrect: false },
    ],
    explanation: 'CQRS/ESはシンプルなCRUDアプリケーションにはオーバーエンジニアリングになります。複雑さの増加に見合うメリットがないため、避けるべきです。',
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
  // Chapter 6: エンティティ
  Quiz.create({
    id: QuizId.create('quiz-lesson-6-1'),
    lessonId: LessonId.create('lesson-6-1'),
    title: 'エンティティとは - 理解度チェック',
    description: 'エンティティの定義と特徴についての理解度を確認するクイズです。',
    questions: lesson6_1Questions,
  }),
  Quiz.create({
    id: QuizId.create('quiz-lesson-6-2'),
    lessonId: LessonId.create('lesson-6-2'),
    title: 'ライフサイクルと同一性 - 理解度チェック',
    description: 'エンティティのライフサイクルとID生成戦略についての理解度を確認するクイズです。',
    questions: lesson6_2Questions,
  }),
  Quiz.create({
    id: QuizId.create('quiz-lesson-6-3'),
    lessonId: LessonId.create('lesson-6-3'),
    title: 'エンティティと値オブジェクトの違い - 理解度チェック',
    description: 'エンティティと値オブジェクトの違いと判断基準についての理解度を確認するクイズです。',
    questions: lesson6_3Questions,
  }),
  // Chapter 7: ドメインサービス
  Quiz.create({
    id: QuizId.create('quiz-lesson-7-1'),
    lessonId: LessonId.create('lesson-7-1'),
    title: 'ドメインサービスとは - 理解度チェック',
    description: 'ドメインサービスの定義と特徴についての理解度を確認するクイズです。',
    questions: lesson7_1Questions,
  }),
  Quiz.create({
    id: QuizId.create('quiz-lesson-7-2'),
    lessonId: LessonId.create('lesson-7-2'),
    title: 'ドメインサービスの実装 - 理解度チェック',
    description: 'ドメインサービスの実装パターンについての理解度を確認するクイズです。',
    questions: lesson7_2Questions,
  }),
  Quiz.create({
    id: QuizId.create('quiz-lesson-7-3'),
    lessonId: LessonId.create('lesson-7-3'),
    title: 'エンティティ・値オブジェクトとの使い分け - 理解度チェック',
    description: 'ロジック配置の判断基準についての理解度を確認するクイズです。',
    questions: lesson7_3Questions,
  }),
  // Chapter 8: 集約
  Quiz.create({
    id: QuizId.create('quiz-lesson-8-1'),
    lessonId: LessonId.create('lesson-8-1'),
    title: '集約とは - 理解度チェック',
    description: '集約の定義、整合性の境界、不変条件についての理解度を確認するクイズです。',
    questions: lesson8_1Questions,
  }),
  Quiz.create({
    id: QuizId.create('quiz-lesson-8-2'),
    lessonId: LessonId.create('lesson-8-2'),
    title: '集約ルート - 理解度チェック',
    description: '集約ルートの役割と実装パターンについての理解度を確認するクイズです。',
    questions: lesson8_2Questions,
  }),
  Quiz.create({
    id: QuizId.create('quiz-lesson-8-3'),
    lessonId: LessonId.create('lesson-8-3'),
    title: '集約の設計ガイドライン - 理解度チェック',
    description: '集約の設計原則と判断基準についての理解度を確認するクイズです。',
    questions: lesson8_3Questions,
  }),
  // Chapter 9: リポジトリ
  Quiz.create({
    id: QuizId.create('quiz-lesson-9-1'),
    lessonId: LessonId.create('lesson-9-1'),
    title: 'リポジトリとは - 理解度チェック',
    description: 'リポジトリパターンの目的、責務、DAOとの違いについての理解度を確認するクイズです。',
    questions: lesson9_1Questions,
  }),
  Quiz.create({
    id: QuizId.create('quiz-lesson-9-2'),
    lessonId: LessonId.create('lesson-9-2'),
    title: 'リポジトリの実装パターン - 理解度チェック',
    description: 'リポジトリの実装方法、層の分離、トランザクション管理についての理解度を確認するクイズです。',
    questions: lesson9_2Questions,
  }),
  Quiz.create({
    id: QuizId.create('quiz-lesson-9-3'),
    lessonId: LessonId.create('lesson-9-3'),
    title: 'リポジトリ設計のベストプラクティス - 理解度チェック',
    description: 'クエリメソッド設計、仕様パターン、アンチパターンについての理解度を確認するクイズです。',
    questions: lesson9_3Questions,
  }),
  // Chapter 10: ファクトリ
  Quiz.create({
    id: QuizId.create('quiz-lesson-10-1'),
    lessonId: LessonId.create('lesson-10-1'),
    title: 'ファクトリとは - 理解度チェック',
    description: 'ファクトリパターンの目的、責務分離、テスト容易性についての理解度を確認するクイズです。',
    questions: lesson10_1Questions,
  }),
  Quiz.create({
    id: QuizId.create('quiz-lesson-10-2'),
    lessonId: LessonId.create('lesson-10-2'),
    title: 'ファクトリの実装パターン - 理解度チェック',
    description: 'ファクトリの実装パターン、使い分け、判断基準についての理解度を確認するクイズです。',
    questions: lesson10_2Questions,
  }),
  // Chapter 11: 仕様パターン
  Quiz.create({
    id: QuizId.create('quiz-lesson-11-1'),
    lessonId: LessonId.create('lesson-11-1'),
    title: '仕様パターンとは - 理解度チェック',
    description: '仕様パターンの目的、責務分離、isSatisfiedByメソッドについての理解度を確認するクイズです。',
    questions: lesson11_1Questions,
  }),
  Quiz.create({
    id: QuizId.create('quiz-lesson-11-2'),
    lessonId: LessonId.create('lesson-11-2'),
    title: '仕様の実装と合成 - 理解度チェック',
    description: '仕様の実装、AND/OR/NOT合成、パフォーマンスとのトレードオフについての理解度を確認するクイズです。',
    questions: lesson11_2Questions,
  }),
  // Chapter 12: レイヤードアーキテクチャ
  Quiz.create({
    id: QuizId.create('quiz-lesson-12-1'),
    lessonId: LessonId.create('lesson-12-1'),
    title: 'レイヤードアーキテクチャとは - 理解度チェック',
    description: 'アーキテクチャの目的、利口なUIアンチパターン、依存関係のルールについての理解度を確認するクイズです。',
    questions: lesson12_1Questions,
  }),
  Quiz.create({
    id: QuizId.create('quiz-lesson-12-2'),
    lessonId: LessonId.create('lesson-12-2'),
    title: 'DDDにおける4層構造 - 理解度チェック',
    description: '4層構造の責務、DIP、本プロジェクトの構造についての理解度を確認するクイズです。',
    questions: lesson12_2Questions,
  }),
  // Chapter 13: クリーンアーキテクチャ
  Quiz.create({
    id: QuizId.create('quiz-lesson-13-1'),
    lessonId: LessonId.create('lesson-13-1'),
    title: 'クリーンアーキテクチャとは - 理解度チェック',
    description: '同心円構造、依存関係のルール、フレームワーク非依存についての理解度を確認するクイズです。',
    questions: lesson13_1Questions,
  }),
  Quiz.create({
    id: QuizId.create('quiz-lesson-13-2'),
    lessonId: LessonId.create('lesson-13-2'),
    title: '依存性逆転の原則（DIP） - 理解度チェック',
    description: 'DIPの定義、インターフェースによる解決、DIコンテナについての理解度を確認するクイズです。',
    questions: lesson13_2Questions,
  }),
  Quiz.create({
    id: QuizId.create('quiz-lesson-13-3'),
    lessonId: LessonId.create('lesson-13-3'),
    title: 'ユースケース層の実装 - 理解度チェック',
    description: 'ユースケースの責務、境界、DTO、テストについての理解度を確認するクイズです。',
    questions: lesson13_3Questions,
  }),
  // Chapter 14: ヘキサゴナルアーキテクチャ
  Quiz.create({
    id: QuizId.create('quiz-lesson-14-1'),
    lessonId: LessonId.create('lesson-14-1'),
    title: 'ヘキサゴナルアーキテクチャとは - 理解度チェック',
    description: 'Ports and Adapters、内側と外側の分離、クリーンアーキテクチャとの比較についての理解度を確認するクイズです。',
    questions: lesson14_1Questions,
  }),
  Quiz.create({
    id: QuizId.create('quiz-lesson-14-2'),
    lessonId: LessonId.create('lesson-14-2'),
    title: 'ポートとアダプターの実装 - 理解度チェック',
    description: '駆動ポート/被駆動ポート、プライマリ/セカンダリアダプター、テスト容易性についての理解度を確認するクイズです。',
    questions: lesson14_2Questions,
  }),
  // Chapter 15: CQRS/イベントソーシング
  Quiz.create({
    id: QuizId.create('quiz-lesson-15-1'),
    lessonId: LessonId.create('lesson-15-1'),
    title: 'CQRSとは - 理解度チェック',
    description: 'CQRS、CQS原則、読み書き分離の理由、実装レベルについての理解度を確認するクイズです。',
    questions: lesson15_1Questions,
  }),
  Quiz.create({
    id: QuizId.create('quiz-lesson-15-2'),
    lessonId: LessonId.create('lesson-15-2'),
    title: 'イベントソーシングとは - 理解度チェック',
    description: 'イベントソーシング、リプレイ、スナップショット、EDAとの違いについての理解度を確認するクイズです。',
    questions: lesson15_2Questions,
  }),
  Quiz.create({
    id: QuizId.create('quiz-lesson-15-3'),
    lessonId: LessonId.create('lesson-15-3'),
    title: 'CQRS/ESの実装パターン - 理解度チェック',
    description: 'コマンド/クエリハンドラ、プロジェクション、結果整合性、DDDとの組み合わせについての理解度を確認するクイズです。',
    questions: lesson15_3Questions,
  }),
];

export function getSampleQuizzes(): Quiz[] {
  return sampleQuizzes;
}
