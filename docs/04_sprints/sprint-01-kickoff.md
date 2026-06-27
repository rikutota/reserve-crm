# Sprint 1 キックオフ

## 1. スプリント名

Sprint 1：認証・基本レイアウト

## 2. スプリントゴール

ユーザーがメールアドレスとパスワードでログインし、認証済み状態で管理画面にアクセスできる状態を作る。

未ログイン状態では、管理画面へアクセスできないようにする。

---

## 3. Sprint 1 の目的

Sprint 1 では、Reserve CRM のアプリケーション基盤を構築する。

このスプリントでは、顧客管理、予約管理、請求管理などの業務機能にはまだ着手しない。

まずは、以下の基盤を整える。

* Next.js アプリケーションの初期構築
* TypeScript 環境
* Tailwind CSS
* shadcn/ui
* PostgreSQL
* Prisma
* Auth.js
* Docker Compose
* GitHub Actions
* README
* 管理画面の基本レイアウト
* ログイン・ログアウト
* 未ログインアクセス制御

---

## 4. Sprint 1 対象Issue

| Issue ID  | 種別    | タイトル                                 | 優先度    |
| --------- | ----- | ------------------------------------ | ------ |
| BL-001    | Story | ユーザーとしてログインしたい                       | Must   |
| BL-002    | Story | ユーザーとしてログアウトしたい                      | Must   |
| BL-003    | Story | 未ログイン状態で管理画面へアクセスできないようにしたい          | Must   |
| BL-004    | Task  | 認証方式を決定する                            | Must   |
| CHORE-001 | Chore | Next.js プロジェクトを初期構築する                | Must   |
| CHORE-002 | Chore | Tailwind CSS / shadcn/ui を導入する       | Must   |
| CHORE-003 | Chore | Prisma / PostgreSQL の初期設定を行う         | Must   |
| CHORE-004 | Chore | Docker Compose でローカルDBを起動できるようにする    | Must   |
| CHORE-005 | Chore | Lint / Formatter / TypeScript 設定を整える | Should |
| CHORE-006 | CI    | GitHub Actions の初期CIを作成する            | Should |
| DOC-001   | Doc   | README に開発環境構築手順を記載する                | Should |

---

## 5. Sprint 1 の作業順

## Step 1：リポジトリ作成

GitHub上に以下のリポジトリを作成する。

```text
reserve-crm
```

作成後、ローカルにcloneする。

---

## Step 2：Next.js アプリ初期構築

Next.js、TypeScript、App Router、Tailwind CSS を有効にしてプロジェクトを作成する。

---

## Step 3：docs構成作成

以下のディレクトリを作成する。

```text
docs/
  01_project/
  02_requirements/
  03_design/
  04_sprints/
  05_test/
  06_release/
```

Sprint 0 で作成したドキュメントを配置する。

---

## Step 4：Docker Compose 作成

ローカル開発用の PostgreSQL を Docker Compose で起動できるようにする。

---

## Step 5：Prisma 初期設定

Prisma を導入し、PostgreSQL へ接続できる状態にする。

最初は以下のテーブルから定義する。

* stores
* users

---

## Step 6：seed作成

開発用の初期ユーザーを作成する。

例：

```text
owner@example.com
password
```

実際のパスワードはハッシュ化して保存する。

---

## Step 7：ログイン画面作成

`/login` にログイン画面を作成する。

入力項目は以下とする。

* メールアドレス
* パスワード

---

## Step 8：ダッシュボード作成

`/dashboard` にログイン後の管理画面を作成する。

Sprint 1 では実データ連携は行わず、プレースホルダー表示とする。

---

## Step 9：未ログインアクセス制御

未ログイン状態で `/dashboard` にアクセスした場合、`/login` にリダイレクトする。

---

## Step 10：CI初期設定

Pull Request 時に以下を実行する。

* lint
* typecheck
* test
* build

---

## 6. Sprint 1 の完了条件

Sprint 1 は以下を満たしたら完了とする。

* Next.js アプリが起動する
* PostgreSQL が Docker Compose で起動する
* Prisma でDB接続できる
* stores / users テーブルが作成されている
* seedで初期ユーザーを作成できる
* `/login` が表示される
* 正しい認証情報でログインできる
* ログイン後 `/dashboard` に遷移する
* ログアウトできる
* 未ログイン状態で `/dashboard` にアクセスできない
* 管理画面の基本レイアウトがある
* README に環境構築手順がある
* CIが実行される

---

## 7. Sprint 1 デモ内容

Sprint 1 レビューでは、以下をデモする。

1. アプリを起動する
2. ログイン画面を表示する
3. 誤った認証情報でログインし、エラーを確認する
4. 正しい認証情報でログインする
5. ダッシュボードへ遷移する
6. サイドバーとヘッダーを確認する
7. ログアウトする
8. ログアウト後、ダッシュボードへ直接アクセスできないことを確認する

---

## 8. Sprint 1 の対象外

以下はSprint 1では実装しない。

* スタッフ管理
* メニュー管理
* 顧客管理
* 予約管理
* 請求管理
* 売上集計
* 詳細な権限管理
* パスワードリセット
* メール認証
* 二要素認証
* 外部ログイン
