# Ticket 004: Frontend3 - トップページ実装

## 技術スタック（必須）
- **スタイリング: Tailwind CSS** （CSS Modules使用禁止）
- 参照: docs/REQUIREMENTS.md

## 担当ファイル
- `app/page.tsx` - トップページの完全実装

## 要件（docs/REQUIREMENTS.md より）

トップページには以下を含む:
1. **サービス紹介セクション** - DDD Learning Serviceの説明
2. **コース一覧へのCTAボタン** - 「学習を始める」ボタン
3. **前提知識ガイドへのリンク** - TypeScript/Next.js知識の案内
4. **レスポンシブデザイン** - モバイル対応

## 実装例

```tsx
'use client';

import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Hero Section */}
      <section className="max-w-4xl mx-auto px-4 py-20 text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
          DDD Learning Service
        </h1>
        <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
          ドメイン駆動設計（DDD）を実践的に学ぶための
          インタラクティブな学習プラットフォーム
        </p>
        <Link
          href="/courses/ddd-introduction"
          className="inline-block px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-lg transition-colors text-lg"
        >
          学習を始める
        </Link>
      </section>

      {/* Features Section */}
      <section className="max-w-6xl mx-auto px-4 py-16">
        <h2 className="text-2xl font-bold text-center text-gray-900 mb-12">
          このコースで学べること
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          <FeatureCard
            title="DDDの基礎概念"
            description="エンティティ、値オブジェクト、集約などのDDDの基本的なビルディングブロックを学びます。"
          />
          <FeatureCard
            title="実践的なコード例"
            description="TypeScriptを使った実際のコード例で、DDDパターンの実装方法を理解します。"
          />
          <FeatureCard
            title="クイズで理解度確認"
            description="各レッスン後のクイズで、学んだ内容の理解度を確認できます。"
          />
        </div>
      </section>

      {/* Prerequisites Section */}
      <section className="bg-gray-50 py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            前提知識
          </h2>
          <p className="text-gray-600 mb-8">
            このコースを最大限活用するために、以下の知識があると良いでしょう：
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <PrerequisiteBadge text="TypeScript基礎" />
            <PrerequisiteBadge text="オブジェクト指向プログラミング" />
            <PrerequisiteBadge text="Webアプリケーション開発経験" />
          </div>
          <p className="mt-8 text-sm text-gray-500">
            ※ 完全な初心者の方でも、基礎から丁寧に解説していますのでご安心ください。
          </p>
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-4xl mx-auto px-4 py-20 text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          今すぐ始めましょう
        </h2>
        <p className="text-gray-600 mb-8">
          無料でDDDの基礎を学び、設計スキルを向上させましょう。
        </p>
        <Link
          href="/courses/ddd-introduction"
          className="inline-block px-8 py-4 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg shadow-lg transition-colors"
        >
          コース一覧を見る
        </Link>
      </section>
    </div>
  );
}

function FeatureCard({ title, description }: { title: string; description: string }) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-lg font-semibold text-gray-900 mb-3">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
}

function PrerequisiteBadge({ text }: { text: string }) {
  return (
    <span className="px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
      {text}
    </span>
  );
}
```

## Definition of Done
- [ ] トップページがTailwind CSSで実装されている
- [ ] サービス紹介セクションがある
- [ ] コース一覧へのCTAボタンがある（リンク先: `/courses/ddd-introduction`）
- [ ] 前提知識ガイドセクションがある
- [ ] レスポンシブデザイン（モバイル対応）
- [ ] TypeScriptエラーがない
- [ ] PRを作成し、Boss1に報告

## 報告方法
完了後、以下をBoss1に送信:
```
./scripts/agent-send.sh boss "[Frontend3完了] Ticket 004 - トップページ実装完了。PR #XX を作成しました。"
```
