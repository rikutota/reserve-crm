"use client";

import { useActionState } from "react";
import { loginAction } from "@/features/auth/actions";

export function LoginForm() {
  const [errorMessage, formAction, isPending] = useActionState(loginAction, null);

  return (
    <form action={formAction} className="w-full max-w-sm space-y-4 rounded-lg border bg-white p-6 shadow-sm">
      <div>
        <h1 className="text-2xl font-bold">Reserve CRM</h1>
        <p className="mt-1 text-sm text-gray-500">サロン管理画面にログインします。</p>
      </div>

      <div className="space-y-2">
        <label htmlFor="email" className="text-sm font-medium">
          メールアドレス
        </label>
        <input
          id="email"
          name="email"
          type="email"
          defaultValue="owner@example.com"
          required
          className="w-full rounded-md border px-3 py-2 text-sm"
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="password" className="text-sm font-medium">
          パスワード
        </label>
        <input
          id="password"
          name="password"
          type="password"
          defaultValue="password"
          required
          className="w-full rounded-md border px-3 py-2 text-sm"
        />
      </div>

      {errorMessage ? (
        <p className="rounded-md bg-red-50 px-3 py-2 text-sm text-red-600">
          {errorMessage}
        </p>
      ) : null}

      <button
        type="submit"
        disabled={isPending}
        className="w-full rounded-md bg-black px-4 py-2 text-sm font-medium text-white disabled:opacity-60"
      >
        {isPending ? "ログイン中..." : "ログイン"}
      </button>

      <p className="text-xs text-gray-500">
        開発用アカウント: owner@example.com / password
      </p>
    </form>
  );
}
