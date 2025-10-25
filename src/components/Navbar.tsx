"use client";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { useEffect, useState } from "react";

export default function Navbar() {
  const { data: session, status } = useSession();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <header className="z-40 sticky top-0 w-full bg-black/70 border-b border-[#153826] backdrop-blur">
      <div className="flex items-center justify-between mx-auto px-6 py-4 max-w-6xl md:px-8">
        <Link href="/" className="text-2xl font-semibold">BinSight</Link>
        <nav className="flex items-center gap-5 text-sm">
          <Link href="/" className="text-white/90 transition-colors cursor-pointer hover:text-white">Home</Link>
          <Link href="/classify" className="text-neutral-300 transition-colors cursor-pointer hover:text-white">Classify</Link>
          <Link href="/smartbins" className="text-neutral-300 transition-colors cursor-pointer hover:text-white">SmartBins</Link>
          <Link href="/rewards" className="text-neutral-300 transition-colors cursor-pointer hover:text-white">Rewards</Link>
          <Link href="/leaderboard" className="text-neutral-300 transition-colors cursor-pointer hover:text-white">Leaderboard</Link>
          <Link href="/dashboard" className="text-neutral-300 transition-colors cursor-pointer hover:text-white">Dashboard</Link>
        </nav>

        <div className="flex items-center">
          {!isClient ? (
            <div className="flex items-center gap-2 px-3 py-1.5 text-sm text-white rounded-md">
              <span className="relative inline-flex items-center gap-2 px-3 py-1.5 rounded-md">
                <span className="absolute inset-0 bg-[#0e2a1d] rounded-md -z-10" />
                <span className="absolute inset-0 rounded-md -z-20 ring-1 ring-[#1b3a29]" />
                Loading...
              </span>
            </div>
          ) : status === "loading" ? (
            <div className="flex items-center gap-2 px-3 py-1.5 text-sm text-white rounded-md">
              <span className="relative inline-flex items-center gap-2 px-3 py-1.5 rounded-md">
                <span className="absolute inset-0 bg-[#0e2a1d] rounded-md -z-10" />
                <span className="absolute inset-0 rounded-md -z-20 ring-1 ring-[#1b3a29]" />
                Loading...
              </span>
            </div>
          ) : session ? (
            <div className="flex items-center gap-3">
              <div
                aria-label={`User ${session.user.username || session.user.email}`}
                className="flex items-center justify-center h-8 w-8 text-white/90 bg-[#0e2a1d] rounded-full ring-1 ring-[#1b3a29]"
                title={session.user.username || session.user.email}
              >
                {(session.user.username || session.user.email)?.charAt(0).toUpperCase()}
              </div>
              <button 
                onClick={() => signOut()} 
                className="text-neutral-300 text-sm transition-colors cursor-pointer hover:text-white"
              >
                Logout
              </button>
            </div>
          ) : (
            <Link
              href="/auth/login"
              className="inline-flex items-center gap-2 px-3 py-1.5 text-sm text-white rounded-md"
            >
              <span className="relative inline-flex items-center gap-2 px-3 py-1.5 rounded-md">
                <span className="absolute inset-0 bg-[#0e2a1d] rounded-md -z-10" />
                <span className="absolute inset-0 rounded-md -z-20 ring-1 ring-[#1b3a29]" />
                Login
              </span>
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}