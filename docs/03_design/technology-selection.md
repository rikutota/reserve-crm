# 技術スタック選定

## 1. 目的

本ドキュメントは、Reserve CRM のMVP開発で採用する技術スタックを定義することを目的とする。

本プロジェクトでは、小規模サロン向けの予約・顧客・請求管理システムを、個人開発でありながら実務システムに近い形で構築する。

技術選定では、以下を重視する。

* 個人で開発・運用しやすいこと
* TypeScript を中心に型安全に開発できること
* 予約、顧客、請求などの業務ロジックを表現しやすいこと
* テスト、CI/CD、デプロイ、監視まで実務的に整備できること
* ポートフォリオとして技術選定理由を説明しやすいこと

---

## 2. 採用技術一覧

| 領域       | 採用技術                                    |
| -------- | --------------------------------------- |
| フロントエンド  | Next.js / React / TypeScript            |
| バックエンド   | Next.js Server Actions / Route Handlers |
| UI       | Tailwind CSS / shadcn/ui                |
| フォーム     | React Hook Form                         |
| バリデーション  | Zod                                     |
| データベース   | PostgreSQL                              |
| ORM      | Prisma                                  |
| 認証       | Auth.js                                 |
| 単体テスト    | Vitest                                  |
| UIテスト    | React Testing Library                   |
| E2Eテスト   | Playwright                              |
| 開発環境     | Docker / Docker Compose                 |
| パッケージ管理  | pnpm                                    |
| CI       | GitHub Actions                          |
| デプロイ     | Vercel                                  |
| DBホスティング | Neon または Supabase                       |
| エラー監視    | Sentry                                  |
| バージョン管理  | Git / GitHub                            |
| ドキュメント   | Markdown / Mermaid                      |

---

## 3. フロントエンド

## 3.1 Next.js

### 採用理由

Reserve CRM では、画面表示、認証、API、サーバーサイド処理を1つのプロジェクトで扱いたい。

Next.js を採用することで、フロントエンドとバックエンドを分離しすぎず、個人開発でも一貫した構成で開発できる。

### 採用方針

* App Router を使用する
* TypeScript を使用する
* 管理画面中心のWebアプリとして構築する
* 基本的な画面遷移は Next.js のルーティングに従う
* サーバー側処理は Server Actions または Route Handlers で実装する

### 主な用途

* ログイン画面
* ダッシュボード
* 顧客管理画面
* 予約管理画面
* 請求管理画面
* 売上管理画面

---

## 3.2 React

### 採用理由

Next.js のUI実装基盤として React を使用する。

顧客登録フォーム、予約登録フォーム、一覧画面、詳細画面など、状態を持つ画面をコンポーネントとして整理しやすい。

### 採用方針

* 画面単位ではなく、業務部品単位でコンポーネント化する
* 登録フォームと編集フォームは可能な限り共通化する
* 複雑な状態管理ライブラリはMVPでは導入しない

### コンポーネント例

* CustomerForm
* ReservationForm
* InvoiceStatusBadge
* StaffSelect
* MenuSelect
* SalesSummaryCard

---

## 3.3 TypeScript

### 採用理由

予約、請求、支払いステータスなど、業務システムではデータ型の不整合が不具合につながりやすい。

TypeScript を採用することで、画面、API、DBアクセス周辺の型を明確にし、実装時のミスを減らす。

### 採用方針

* `any` の使用は原則避ける
* enum または union type でステータスを表現する
* Prisma の型を活用する
* APIレスポンスやフォーム入力の型を定義する

---

# 4. UI・スタイリング

## 4.1 Tailwind CSS

### 採用理由

管理画面では、一覧、フォーム、カード、ボタンなどのUIを素早く構築する必要がある。

Tailwind CSS を採用することで、CSSファイルを増やしすぎず、コンポーネント単位でスタイルを管理しやすくする。

### 採用方針

* ユーティリティクラスを中心にスタイリングする
* 複雑なデザインよりも、業務で使いやすい画面を優先する
* 余白、文字サイズーネント単位でスタイルを管理しやすくする。

### 採用方針

* ユーティリティクラス、テーブル表示の一貫性を保つ

---

## 4.2 shadcn/ui

### 採用理由

予約・顧客・請求管理システムでは、フォーム、ダイアログ、テーブル、タブ、ドロップダウンなどのUI部品が多く必要になる。

shadcn/ui を利用することで、アクセシビリティを意識したUI部品をベースにしつつ、必要に応じてプロジェクト側でカスタマイズできる。

### 採用方針

* Button、Input、Dialog、Select、Table、Card などを利用する
* UI部品はプロジェクト内に取り込み、必要に応じて調整する
* デザインの派手さよりも、業務操作の分かりやすさを優先する

---

# 5. フォーム・バリデーション

## 5.1 React Hook Form

### 採用理由

顧客登録、予約登録、請求作成など、MVPではフォーム画面が多い。

React Hook Form を採用し、フォーム状態、入力値、エラー表示を管理する。

### 採用方針

* 登録画面と編集画面でフォーム定義を共通化する
* 入力エラーは各項目の近くに表示する
* 送信中状態を管理し、二重送信を防ぐ

---

## 5.2 Zod

### 採用理由

フォーム入力とサーバー側処理の両方で、同じルールに基づいてバリデーションしたい。

Zod を採用することで、入力値の検証ルールを明示し、型推論も活用する。

### 採用方針

* 顧客登録スキーマ
* スタッフ登録スキーマ
* メニュー登録スキーマ
* 予約登録スキーマ
* 請求作成スキーマ

を定義する。

### バリデーション例

* 顧客名は必須
* 電話番号は最大文字数を制限する
* メニュー料金は0以上
* メニュー所要時間は1分以上
* 予約開始日時は必須
* 支払い方法は定義済みの値のみ許可する

---

# 6. バックエンド

## 6.1 Next.js Server Actions / Route Handlers

### 採用理由

MVPでは、Next.js の中で画面とサーバー処理をまとめて実装する。

認証、DB更新、予約重複チェック、請求作成、売上集計などの処理を、Next.js のサーバー側で実装する。

### 採用方針

* 画面から直接呼び出す更新処理は Server Actions を中心にする
* 外部公開や明確なAPI境界が必要な処理は Route Handlers を使用する
* 業務ロジックは server action に直書きせず、service 層に分離する

### ディレクトリ例

```text
src/
  app/
  components/
  features/
  lib/
  server/
    services/
    repositories/
    validators/
```

---

## 6.2 Service / Repository パターン

### 採用理由

予約重複チェックや請求金額計算などの業務ロジックを、画面やAPIから分離するため。

### 採用方針

* DBアクセスは repository に集約する
* 業務ルールは service に集約する
* UIから直接 Prisma を呼ばない
* テストしやすい単位で関数を分割する

### 例

```text
server/
  services/
    reservation-service.ts
    invoice-service.ts
    sales-service.ts
  repositories/
    reservation-repository.ts
    customer-repository.ts
    invoice-repository.ts
```

---

# 7. データベース・ORM

## 7.1 PostgreSQL

### 採用理由

予約、顧客、請求、支払い、売上などの業務データは、リレーションを持つ構造になる。

PostgreSQL を採用し、RDBとしてデータ整合性を保ちやすい構成にする。

### 採用方針

* 主キーは UUID を使用する
* 主要テーブルに `store_id` を持たせる
* 論理削除用に `deleted_at` を持たせる
* 金額は integer で管理する
* 日時は UTC で保存する

---

## 7.2 Prisma

### 採用理由

TypeScript と PostgreSQL を組み合わせて開発するため、型安全なDBアクセスができる Prisma を採用する。

スキーマ定義、マイグレーション、Prisma Client によるDB操作を利用する。

### 採用方針

* `schema.prisma` を中心にデータモデルを管理する
* Prisma Migrate でDB変更履歴を管理する
* Prisma Client を repository 層から呼び出す
* DBスキーマとアプリケーション型のズレを減らす

---

# 8. 認証・認可

## 8.1 Auth.js

### 採用理由

Next.js で認証機能を実装するため、Auth.js を採用する。

MVPでは、メールアドレスとパスワードによるログインを想定する。

### 採用方針

* Credentials Provider を使用する
* パスワードはハッシュ化して保存する
* セッション情報からログインユーザーを識別する
* ユーザーの role をもとに認可制御を行う

### MVPで実装する認証機能

* ログイン
* ログアウト
* セッション管理
* 未ログインアクセス制御

### MVPで実装しない認証機能

* メール認証
* パスワードリセット
* 二要素認証
* Googleログイン
* LINEログイン

---

## 8.2 認可

### 採用理由

オーナーとスタッフでは、利用できる画面や操作を分ける必要がある。

### 採用方針

* role は `owner` と `staff` を定義する
* オーナーは全機能を利用できる
* スタッフはスタッフ管理、売上管理など一部機能を利用できない
* 画面表示だけでなく、サーバー側でも権限チェックを行う

---

# 9. テスト

## 9.1 Vitest

### 採用理由

予約重複判定、請求金額計算、売上集計などの業務ロジックを自動テストで守るため。

### 採用方針

* service 層の単体テストを中心にする
* 予約重複判定は必ずテストする
* 請求金額計算は必ずテストする
* 売上集計はテスト対象にする

### テスト対象例

* 予約重複判定
* 営業時間チェック
* 請求金額計算
* 支払い済み判定
* 日次売上集計

---

## 9.2 React Testing Library

### 採用理由

フォームや画面コンポーネントが、ユーザー操作に対して期待通りに動くことを確認するため。

### 採用方針

* UIの実装詳細ではなく、ユーザー視点の表示や操作をテストする
* 顧客登録フォーム
* 予約登録フォーム
* エラー表示
* ボタンの活性・非活性

を中心にテストする。

---

## 9.3 Playwright

### 採用理由

MVPの主要業務フローを、ブラウザ上で通し確認するため。

### 採用方針

以下のE2Eシナリオを作成する。

```text
ログイン
↓
顧客登録
↓
予約登録
↓
来店済みに変更
↓
請求作成
↓
支払い済み登録
↓
日次売上に反映される
```

### MVPで必須のE2Eテスト

* ログインできる
* 顧客を登録できる
* 予約を登録できる
* 重複予約がエラーになる
* 請求を作成できる
* 支払い済みにできる
* 売上に反映される

---

# 10. 開発環境

## 10.1 Docker / Docker Compose

### 採用理由

ローカル開発環境を再現しやすくするため。

特に PostgreSQL をローカルで起動し、開発者が同じ環境でDBを扱えるようにする。

### 採用方針

* PostgreSQL を Docker Compose で起動する
* アプリケーションはローカルNode.jsで起動する
* 必要に応じて、将来的にアプリケーション本体もコンテナ化する

### 想定構成

```text
docker-compose.yml
  - postgres
```

---

## 10.2 pnpm

### 採用理由

依存パッケージの管理を高速かつ効率的に行うため。

### 採用方針

* パッケージ管理は pnpm に統一する
* `package-lock.json` や `yarn.lock` は使用しない
* CIでも pnpm を使用する

---

# 11. CI/CD

## 11.1 GitHub Actions

### 採用理由

Pull Request 作成時に、Lint、型チェック、テストを自動実行するため。

手元では動くが本番で壊れる、という状態を防ぐ。

### 採用方針

Pull Request 時に以下を実行する。

* install
* lint
* typecheck
* unit test
* build

MVP後半では、必要に応じて E2E test も追加する。

### 想定ワークフロー

```text
Pull Request
↓
GitHub Actions
↓
Lint
↓
Type Check
↓
Unit Test
↓
Build
↓
Merge可能
```

---

## 11.2 Vercel

### 採用理由

Next.js アプリを簡単にデプロイし、Pull Request ごとにプレビュー環境を確認できるようにするため。

### 採用方針

* `main` ブランチを本番想定環境に紐づける
* Pull Request ごとに Preview Deployment を作成する
* 環境変数は Vercel の管理画面で設定する
* DB接続情報や認証シークレットはリポジトリに含めない

---

# 12. DBホスティング

## 12.1 Neon または Supabase

### 採用理由

PostgreSQL をクラウド上で利用するため。

個人開発では、DBサーバーを自前で構築・運用するよりも、マネージドなPostgreSQLサービスを利用する方が現実的である。

### 候補

| 候補       | 特徴                                                   |
| -------- | ---------------------------------------------------- |
| Neon     | Serverless PostgreSQL として Next.js / Vercel と組み合わせやすい |
| Supabase | PostgreSQL に加え、管理画面や認証などの周辺機能も提供される                  |

### 採用方針

MVPでは、以下のどちらかを採用する。

第一候補：

```text
Neon
```

理由：

* PostgreSQLとして扱いやすい
* Vercelとの組み合わせを説明しやすい
* Prismaとの構成を組みやすい

代替候補：

```text
Supabase
```

理由：

* 管理画面が分かりやすい
* SQL確認やデータ確認がしやすい
* 将来的に認証やストレージを利用する余地がある

---

# 13. 監視・ログ

## 13.1 Sentry

### 採用理由

本番想定環境で発生したエラーを検知し、原因調査をしやすくするため。

### 採用方針

* フロントエンドの例外を記録する
* サーバー側の例外を記録する
* 本番想定環境のみ有効化する
* 個人情報を送信しないよう注意する

---

## 13.2 アプリケーションログ

### 採用理由

予約作成、予約変更、請求作成、支払い済み登録など、業務上重要な操作を追跡するため。

### 採用方針

* 操作ログは `audit_logs` テーブルに記録する
* 重要操作のみを対象にする
* 操作者、操作日時、対象、操作内容を記録する

---

# 14. ドキュメント

## 14.1 Markdown

### 採用理由

GitHub上で管理しやすく、Pull Request で変更履歴を追いやすいため。

### 採用方針

* 要件、設計、スプリント記録は `docs/` 配下に配置する
* 実装に合わせて継続的に更新する
* 古くなったドキュメントは放置せず、更新または廃止する

---

## 14.2 Mermaid

### 採用理由

ER図や画面遷移図をテキストで管理するため。

### 採用方針

* ER図
* 画面遷移図
* 業務フロー図

に使用する。

---

# 15. 採用しない技術

## 15.1 NestJS

### 採用しない理由

本格的なバックエンド設計には向いているが、MVP段階ではフロントエンドとバックエンドを分けることで開発量が増える。

今回は個人開発で作り切ることを優先し、Next.js 内でサーバー処理まで扱う。

---

## 15.2 Ruby on Rails

### 採用しない理由

業務システム開発には非常に向いているが、今回は TypeScript を中心にフロントエンドからバックエンドまで一貫して開発する方針とする。

---

## 15.3 Laravel

### 採用しない理由

業務システム開発には向いているが、今回は Next.js / TypeScript を中心にポートフォリオとして見せる方針とする。

---

## 15.4 Firebase

### 採用しない理由

認証やリアルタイムDBを素早く構築できる一方で、予約、請求、売上のようなリレーショナルな業務データには PostgreSQL の方が扱いやすいと判断する。

---

## 15.5 MongoDB

### 採用しない理由

柔軟なドキュメント構造は魅力だが、本プロジェクトでは顧客、予約、請求、支払いの関係性が明確であり、RDBの方が適している。

---

# 16. 初期ディレクトリ構成案

```text
reserve-crm/
  docs/
    01_project/
    02_requirements/
    03_design/
    04_sprints/
    05_test/
    06_release/

  prisma/
    schema.prisma
    migrations/
    seed.ts

  src/
    app/
      login/
      dashboard/
      customers/
      reservations/
      invoices/
      sales/
      settings/

    components/
      ui/
      layout/
      forms/

    features/
      customers/
      reservations/
      invoices/
      sales/
      staff/
      menus/

    lib/
      auth/
      prisma/
      utils/

    server/
      services/
      repositories/
      validators/

    tests/
      unit/
      e2e/

  public/

  docker-compose.yml
  package.json
  pnpm-lock.yaml
  README.md
```

---

# 17. 環境構成

## 17.1 ローカル環境

| 項目  | 内容                  |
| --- | ------------------- |
| アプリ | Next.js             |
| DB  | Docker上のPostgreSQL  |
| ORM | Prisma              |
| 認証  | Auth.js             |
| テスト | Vitest / Playwright |

---

## 17.2 ステージング環境

| 項目  | 内容                        |
| --- | ------------------------- |
| アプリ | Vercel Preview Deployment |
| DB  | Neon または Supabase         |
| 用途  | スプリントレビュー、受入確認            |

---

## 17.3 本番想定環境

| 項目  | 内容                           |
| --- | ---------------------------- |
| アプリ | Vercel Production Deployment |
| DB  | Neon または Supabase            |
| 監視  | Sentry                       |
| 用途  | MVPリリース、ポートフォリオ公開            |

---

# 18. セキュリティ方針

MVPでは、以下を最低限のセキュリティ方針とする。

* パスワードを平文保存しない
* 認証済みユーザーのみ管理画面にアクセスできる
* role による権限チェックを行う
* サーバー側でも認可チェックを行う
* 環境変数をリポジトリに含めない
* 個人情報をログに出力しない
* 本番想定環境ではHTTPSを使用する

---

# 19. 技術的リスク

| リスク              | 内容                            | 対策                   |
| ---------------- | ----------------------------- | -------------------- |
| 認証実装が複雑化する       | Auth.js と独自ユーザー管理の接続で迷う可能性がある | Sprint 1で早めに検証する     |
| 予約重複チェックに抜け漏れが出る | 時間帯の重複条件はバグになりやすい             | 単体テストを必須にする          |
| Prisma設計変更が多発する  | 初期ER設計が甘いとマイグレーションが増える        | Sprint 0でデータモデルを整理する |
| 権限チェック漏れ         | 画面側だけの制御だと不十分                 | サーバー側でもroleを確認する     |
| E2Eテストが不安定になる    | UI変更でテストが壊れやすい                | 主要フローに絞って作成する        |
| 外部サービス依存         | VercelやDBサービスに依存する            | ローカルDocker環境を残す      |

---

# 20. 最終決定

Reserve CRM のMVPでは、以下の技術スタックを正式採用する。

```text
Next.js
TypeScript
React
Tailwind CSS
shadcn/ui
React Hook Form
Zod
PostgreSQL
Prisma
Auth.js
Vitest
React Testing Library
Playwright
Docker
GitHub Actions
Vercel
Neon または Supabase
Sentry
```

この構成により、個人開発でも実装しやすく、実務システムとして必要な認証、DB設計、テスト、CI/CD、デプロイ、監視まで一通り経験できる。
