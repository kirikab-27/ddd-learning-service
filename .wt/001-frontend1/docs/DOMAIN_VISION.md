# Project Vision: DDD Learning Service

## 1. Core Mission
**「実務レベルのDDD（ドメイン駆動設計）を、小さな実践を通じて体得する」**
既にWeb開発の基礎（Next.js/TS）があるエンジニアに対し、書籍だけでは掴みにくい「設計の実装への落とし込み方」を提供する。

## 2. Architectural Style
本プロジェクト自体がDDDの教材であるため、以下のアーキテクチャを厳格に遵守する。
* **Framework:** Next.js (App Router)
* **Architecture:** オニオンアーキテクチャ / レイヤードアーキテクチャ
* **Separation:**
    * `domain/`: 純粋なTypeScript。外部依存なし。ビジネスロジックの核心。
    * `application/`: ユースケース。ドメインとインフラの調整役。
    * `infrastructure/`: 実装詳細（DB, API）。ドメインに依存する（DIP）。
    * `presentation/`: UIコンポーネント。ロジックを持たない。

## 3. Scope & Constraints (v1 MVP)

### ✅ DO (やるべきこと)
* **戦略的設計の学習:** 境界づけられたコンテキスト、ユビキタス言語の理解。
* **戦術的設計の実装:** Entity, ValueObject, Repository, Specificationパターンの実装。
* **ローカル完結:** コンテンツはJSON、保存はLocalStorage。セットアップの手間を最小化。
* **例外ベースのエラー処理:** 学習のノイズを減らすため、Result型ではなく `throw Error` を採用。

### 🚫 DO NOT (やらないこと)
* **複雑なバックエンド:** v1ではサーバーサイドDB（Postgres等）や認証機能は作らない。
* **過剰な抽象化:** DDDの原則は守るが、必要以上のジェネリクスやメタプログラミングは避ける（可読性優先）。
* **リッチすぎるUI:** デザインはシンプルに。学習コンテンツとコードが見やすければ良い。

## 4. Ubiquitous Language (Top Concepts)

| Term | Definition |
|------|------------|
| **Course** | 学習の最上位単位。例:「DDD実践コース」 |
| **Chapter** | コースの構成単位。例:「第1部 戦略的設計」 |
| **Lesson** | 学習の最小単位。Markdownコンテンツとコード例を含む。 |
| **Quiz** | レッスン末尾の理解度確認問題（0..1の関係）。 |
| **Progress** | ユーザーごとの学習進捗。完了したレッスンやクイズ結果を保持。 |
| **Unlock** | 前のレッスン完了などの条件を満たし、学習可能になること。 |

## 5. Quality Standards
* **Domain Purity:** ドメイン層で `next/*` や `react` を import したら即リジェクト。
* **Type Safety:** `any` 禁止。Strict mode準拠。
* **Testing:** ドメインロジック（Entity/Specification）のユニットテストを最優先。
