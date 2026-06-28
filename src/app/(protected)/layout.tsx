import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { logoutAction } from "@/features/auth/actions";

export default async function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  if (!session?.user) {
    redirect("/login");
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="border-b bg-white">
        <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-6">
          <div className="font-bold">Reserve CRM</div>

          <div className="flex items-center gap-4 text-sm">
            <span>
              {session.user.name} / {session.user.role}
            </span>

            <form action={logoutAction}>
              <button type="submit" className="rounded-md border px-3 py-1.5">
                ログアウト
              </button>
            </form>
          </div>
        </div>
      </header>

      <div className="mx-auto grid max-w-6xl grid-cols-[220px_1fr] gap-6 px-6 py-6">
        <aside className="rounded-lg border bg-white p-4">
          <nav className="space-y-2 text-sm">
            <a className="block rounded-md px-3 py-2 hover:bg-gray-100" href="/dashboard">
              ダッシュボード
            </a>
            <a className="block rounded-md px-3 py-2 text-gray-500" href="/customers">
              顧客管理
            </a>
            <a className="block rounded-md px-3 py-2 text-gray-500" href="/reservations">
              予約管理
            </a>
            <a className="block rounded-md px-3 py-2 text-gray-500" href="/invoices">
              請求管理
            </a>
            <a className="block rounded-md px-3 py-2 text-gray-500" href="/sales">
              売上管理
            </a>
          </nav>
        </aside>

        <main>{children}</main>
      </div>
    </div>
  );
}
