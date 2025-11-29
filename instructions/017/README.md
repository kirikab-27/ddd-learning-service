# Ticket 017: Mermaid図解対応の実装

## 概要

Chapter 1-8の全レッスンでMermaid図解を正しく表示できるようにする。

## 背景

現在、レッスンコンテンツにはMermaidコードブロックが含まれているが、ブラウザでは生のコードとして表示されている。Mermaidライブラリを使って、これらを図として正しくレンダリングする必要がある。

## タスク構成

### Frontend1
- MermaidDiagram.tsx コンポーネント作成
- MarkdownRenderer.tsx の更新（remark-gfm + Mermaid対応）
- package.json の更新（依存関係追加）
- 全レッスンでのMermaid図解表示確認

### Quality
- コンポーネント品質確認
- 全レッスンでのMermaid図解表示確認
- TypeScript型チェック
- テスト実行

## 完了条件

- [ ] MermaidDiagram.tsx が作成されている
- [ ] MarkdownRenderer.tsx が更新されている
- [ ] package.json に mermaid, remark-gfm が追加されている
- [ ] Chapter 1-8の全レッスンでMermaid図解が表示される
- [ ] Ticket 014のMarkdownRenderer改善が維持されている
- [ ] 型エラー: 0件
- [ ] テスト: 新しい失敗なし
- [ ] PRマージ完了

## 参照ドキュメント

- `instructions/017/frontend1.md`: Frontend1 実装詳細
- `instructions/017/quality.md`: Quality レビュー項目
- `stash@{0}`: 参考実装（古いため、直接適用不可）

## 優先度

**HIGH** - ユーザーが現在確認中のため、早急な対応が必要
