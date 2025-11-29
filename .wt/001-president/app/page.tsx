export default function Home() {
  return (
    <main style={{ padding: '2rem', fontFamily: 'system-ui, sans-serif' }}>
      <h1>DDD Learning Service</h1>
      <p>DDDの開発手法を実践的に学べるサービス</p>

      <section style={{ marginTop: '2rem' }}>
        <h2>コンセプト</h2>
        <blockquote style={{ borderLeft: '4px solid #ccc', paddingLeft: '1rem', margin: '1rem 0' }}>
          「DDDを学ぶサービス自体がDDDで設計されている」
          <br />
          ソースコードが教材になる。実践と理論が一体化。
        </blockquote>
      </section>

      <section style={{ marginTop: '2rem' }}>
        <h2>学習コンテンツ（予定）</h2>
        <ul>
          <li>値オブジェクト - 不変性と型安全性</li>
          <li>エンティティ - IDとライフサイクル</li>
          <li>集約 - 整合性境界</li>
          <li>リポジトリ - データ永続化の抽象化</li>
          <li>ドメインサービス - エンティティに属さない操作</li>
          <li>Specification - 複雑な条件判定</li>
        </ul>
      </section>

      <section style={{ marginTop: '2rem' }}>
        <h2>アーキテクチャ</h2>
        <p>Clean Architecture + DDD 4層構造</p>
        <pre style={{ background: '#f5f5f5', padding: '1rem', borderRadius: '4px' }}>
{`Presentation → Application → Domain ← Infrastructure
                    ↓
              Domain層は他に依存しない`}
        </pre>
      </section>
    </main>
  );
}
