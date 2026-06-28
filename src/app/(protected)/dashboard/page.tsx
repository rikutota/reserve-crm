import { auth } from "@/auth";

export default async function DashboardPage() {
  const session = await auth();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">ダッシュボード</h1>
        <p className="mt-1 text-sm text-gray-500">
          ログイン中: {session?.user?.name}
        </p>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <section className="rounded-lg border bg-white p-4">
          <h2 className="text-sm font-medium text-gray-500">今日の予約</h2>
          <p className="mt-2 text-3xl font-bold">0件</p>
        </section>

        <section className="rounded-lg border bg-white p-4">
          <h2 className="text-sm font-medium text-gray-500">未払い</h2>
          <p className="mt-2 text-3xl font-bold">0件</p>
        </section>

        <section className="rounded-lg border bg-white p-4">
          <h2 className="text-sm font-medium text-gray-500">本日の売上</h2>
          <p className="mt-2 text-3xl font-bold">¥0</p>
        </section>
      </div>

      <section className="rounded-lg border bg-white p-4">
        <h2 className="font-bold">Sprint 1</h2>
        <p className="mt-2 text-sm text-gray-600">
          認証済みユーザーのみ閲覧できる管理画面です。
        </p>
      </section>
    </div>
  );
}
