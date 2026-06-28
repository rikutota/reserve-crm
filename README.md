# Reserve CRM

小規模サロン向けの予約・顧客・請求管理システムです。

1店舗運営の美容サロンを想定し、予約情報・顧客情報・請求情報・売上情報を一元管理することを目的としています。

## プロジェクト概要

Reserve CRM は、以下のような課題を解決するための業務システムです。

* 予約情報が紙・Excel・LINE・Instagram DMなどに分散している
* 予約の転記漏れや重複予約が発生しやすい
* 顧客情報をすぐに検索できない
* 会計・支払い状況の管理が手作業になっている
* 日次・月次売上の集計に時間がかかる

MVPでは、サロンスタッフがログインし、顧客・予約・請求・売上を管理できる状態を目指します。

## 技術スタック

| 分類        | 技術                           |
| --------- | ---------------------------- |
| フロントエンド   | Next.js / React / TypeScript |
| スタイリング    | Tailwind CSS                 |
| 認証        | Auth.js                      |
| ORM       | Prisma                       |
| DB        | PostgreSQL                   |
| パスワードハッシュ | bcryptjs                     |
| 開発DB      | Docker Compose               |
| パッケージ管理   | pnpm                         |
| CI        | GitHub Actions               |

## 必要なもの

ローカル開発には以下が必要です。

* Node.js
* pnpm
* Docker Desktop
* Git

このプロジェクトでは pnpm を使用します。

## セットアップ手順

### 1. リポジトリをclone

```bash
git clone https://github.com/your-name/reserve-crm.git
cd reserve-crm
```

### 2. 依存関係をインストール

```bash
pnpm install
```

pnpm の build script 承認が必要な場合は、以下を実行します。

```bash
pnpm approve-builds
pnpm install
```

### 3. 環境変数を作成

`.env.example` をコピーして `.env` を作成します。

```bash
cp .env.example .env
```

Windows PowerShell の場合は以下です。

```powershell
Copy-Item .env.example .env
```

`.env` の例です。

```env
DATABASE_URL="postgresql://reserve_crm:reserve_crm_password@localhost:5432/reserve_crm?schema=public"
AUTH_SECRET=""
NEXTAUTH_URL="http://localhost:3000"
SENTRY_DSN=""
```

### 4. AUTH_SECRET を設定

Auth.js で使用する `AUTH_SECRET` を生成します。

```bash
node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"
```

生成された文字列を `.env` の `AUTH_SECRET` に設定します。

```env
AUTH_SECRET="生成された文字列"
```

### 5. PostgreSQLを起動

Docker Desktop を起動してから、以下を実行します。

```bash
docker compose up -d
```

起動確認：

```bash
docker ps
```

`reserve-crm-db` が表示されればOKです。

### 6. Prisma Client を生成

```bash
pnpm prisma generate
```

### 7. DBマイグレーションを実行

```bash
pnpm prisma migrate dev
```

初回セットアップ時にマイグレーション名を指定する場合：

```bash
pnpm prisma migrate dev --name init
```

### 8. seedデータを投入

```bash
pnpm prisma db seed
```

開発用の初期ユーザーが作成されます。

| 項目      | 値                                             |
| ------- | --------------------------------------------- |
| メールアドレス | [owner@example.com](mailto:owner@example.com) |
| パスワード   | password                                      |

### 9. 開発サーバーを起動

```bash
pnpm dev
```

ブラウザで以下にアクセスします。

```text
http://localhost:3000/login
```

## 開発用ログイン情報

```text
メールアドレス: owner@example.com
パスワード: password
```

## よく使うコマンド

### 開発サーバー起動

```bash
pnpm dev
```

### PostgreSQL起動

```bash
docker compose up -d
```

### PostgreSQL停止

```bash
docker compose down
```

### Prisma Studio起動

```bash
pnpm prisma studio
```

### Prisma Client生成

```bash
pnpm prisma generate
```

### Prisma schema検証

```bash
pnpm prisma validate
```

### 型チェック

```bash
pnpm exec tsc --noEmit
```

### ビルド

```bash
pnpm build
```

## ディレクトリ構成

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
    migrations/
    schema.prisma
    seed.ts

  src/
    app/
      api/
      login/
      (protected)/
    components/
    features/
    generated/
    lib/
    server/
    types/

  docker-compose.yml
  prisma.config.ts
  package.json
  README.md
```

## 主な画面

| 画面      | パス           |
| ------- | ------------ |
| ログイン    | `/login`     |
| ダッシュボード | `/dashboard` |

今後、以下の画面を追加予定です。

| 画面     | パス              |
| ------ | --------------- |
| 顧客管理   | `/customers`    |
| 予約管理   | `/reservations` |
| 請求管理   | `/invoices`     |
| 売上管理   | `/sales`        |
| スタッフ管理 | `/staff`        |
| メニュー管理 | `/menus`        |

## MVP対象機能

MVPでは以下を対象とします。

* ログイン / ログアウト
* 認証済みユーザーのみ管理画面へアクセス可能
* スタッフ管理
* メニュー管理
* 顧客管理
* 予約管理
* 予約重複チェック
* 簡易請求管理
* 支払い済み登録
* 日次売上一覧

## MVP対象外

以下はMVPでは対象外です。

* LINE連携
* Instagram DM連携
* Web予約フォーム
* クレジットカード決済
* 請求書PDF出力
* 領収書PDF出力
* 複数店舗対応
* 会計ソフト連携
* 顧客向けマイページ

## Git運用

基本方針は以下です。

```text
main    : 本番想定の安定ブランチ
develop : 開発統合ブランチ
feature : 機能開発ブランチ
docs    : ドキュメント更新ブランチ
chore   : 環境構築・設定変更ブランチ
fix     : 不具合修正ブランチ
```

開発時は `develop` からブランチを作成します。

```bash
git switch develop
git pull origin develop
git switch -c feature/example
```

コミットメッセージは以下の形式にします。

```text
type: 日本語の概要
```

例：

```text
feat: ログイン認証を追加
docs: READMEに環境構築手順を追加
chore: Prismaの初期設定を追加
fix: 未ログイン時のリダイレクト処理を修正
```

## トラブルシューティング

### Dockerに接続できない

以下のようなエラーが出る場合は、Docker Desktop が起動していない可能性があります。

```text
failed to connect to the docker API
```

Docker Desktop を起動してから、再度実行してください。

```bash
docker compose up -d
```

### pnpm の build script が無視される

以下のようなメッセージが出る場合があります。

```text
Ignored build scripts
```

その場合は以下を実行します。

```bash
pnpm approve-builds
pnpm install
```

### Prisma Client が見つからない

以下を実行してください。

```bash
pnpm prisma generate
```

### DBの状態を確認したい

Prisma Studioを使います。

```bash
pnpm prisma studio
```

## 現在の開発状況

現在は Sprint 1 として、以下を実装しています。

* Next.js 初期構築
* Docker Compose による PostgreSQL 起動
* Prisma 初期設定
* seedデータ作成
* Auth.js によるログイン認証
* ダッシュボードの認証保護

今後は、スタッフ管理・メニュー管理・顧客管理・予約管理へ順次進めます。
