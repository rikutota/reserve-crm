# 認証設計

## 1. 目的

Reserve CRM のMVPにおいて、店舗スタッフがメールアドレスとパスワードでログインし、認証済みユーザーのみ管理画面へアクセスできる状態を実現する。

## 2. 認証方式

MVPでは以下の方式を採用する。

- Auth.js
- Credentials認証
- JWTセッション
- bcryptjs によるパスワードハッシュ照合
- 独自の users テーブルによるユーザー管理

## 3. 対象ユーザー

MVPでログイン対象となるユーザーは以下とする。

| role | 説明 |
|---|---|
| owner | 店舗オーナー。全機能を操作できる想定。 |
| staff | 店舗スタッフ。予約・顧客・請求を操作できる想定。 |

Sprint 1では owner / staff の詳細な画面権限制御は実装せず、ログイン済みかどうかによるアクセス制御を優先する。

## 4. 使用テーブル

認証には users テーブルを使用する。

```text
users
  id
  storeId
  name
  email
  passwordHash
  role
  isActive
  createdAt
  updatedAt
  deletedAt