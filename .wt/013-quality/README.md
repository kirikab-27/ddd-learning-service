# DDD Learning Service

DDDの開発手法を実践的に学べるサービス

## コンセプト

> **「DDDを学ぶサービス自体がDDDで設計されている」**
>
> ソースコードが教材になる。実践と理論が一体化。

## 技術スタック

- **フレームワーク**: Next.js 15 (App Router)
- **言語**: TypeScript
- **アーキテクチャ**: Clean Architecture + DDD
- **開発手法**: Claude Multi-Agent Framework

## ディレクトリ構造

```
ddd-learning-service/
├── app/                    # Presentation層
├── src/
│   ├── domain/            # ドメイン層
│   ├── application/       # アプリケーション層
│   └── infrastructure/    # インフラストラクチャ層
├── .wt/                   # マルチエージェントフレームワーク
└── docs/                  # ドキュメント
```

## セットアップ

```bash
# 依存関係のインストール
npm install

# 開発サーバー起動
npm run dev

# ビルド
npm run build

# テスト
npm test
```

## ドキュメント

- [アーキテクチャガイド](./docs/ARCHITECTURE.md)
- [知見引き継ぎ](./docs/KNOWLEDGE_TRANSFER.md)

## 主要機能（予定）

1. **概念学習モジュール**: 値オブジェクト、エンティティ、集約などの解説
2. **インタラクティブモデリング演習**: ドラッグ&ドロップでDDD設計を学ぶ
3. **コードレビュー機能**: AIがDDD観点でフィードバック
4. **実プロジェクト閲覧**: 本サービス自体のソースコードが教材

## マルチエージェント開発

本プロジェクトはClaude Multi-Agent Frameworkを使用して開発します。

- **President**: 品質管理・最終承認
- **Boss1**: タスク分解・統合
- **Workers**: 実装担当（Backend1-3, Frontend1-3, Quality）

詳細は `.wt/001-president/PROTOCOL.md` を参照。

## ライセンス

Private
