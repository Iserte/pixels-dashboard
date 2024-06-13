"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Header() {
  const pathname = usePathname();

  return (
    <header className="border-b border-zinc-800 h-16 px-4 top-0 left-0 right-0 bg-zinc-950 relative flex items-center gap-8 z-50">
      <h1 className="text-xl">Pixels Dashboard</h1>
      <span className="border-r border-zinc-6s00 h-full max-h-12 w-1/" />
      <ul className="flex gap-2 h-full items-center">
        <li className={`${pathname === "/accounts" ? "font-bold" : ""}`}>
          <Link href="/accounts" className="">
            Accounts
          </Link>
        </li>

        <span className="border-r border-zinc-600 h-full max-h-4 w-1/" />
        <li className={`${pathname === "/tasks" ? "font-bold" : ""}`}>
          <Link href="/tasks">Tasks</Link>
        </li>

        <span className="border-r border-zinc-600 h-full max-h-4 w-1/" />
        <li className={`${pathname === "/carnival" ? "font-bold" : ""}`}>
          <Link href="/carnival">Carnival</Link>
        </li>

        <span className="border-r border-zinc-600 h-full max-h-4 w-1/" />
        <li className={`${pathname === "/nucyber" ? "font-bold" : ""}`}>
          <Link href="/nucyber">NuCyber</Link>
        </li>

        <span className="border-r border-zinc-600 h-full max-h-4 w-1/" />
        <li className={`${pathname === "/settings" ? "font-bold" : ""}`}>
          <Link href="/settings">Settings</Link>
        </li>
      </ul>
    </header>
  );
}
