'use client';

import React from 'react';
import Link from 'next/link';
import { signIn } from 'next-auth/react';

export default function SignupPage() {
  const [username, setUsername] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [showPassword, setShowPassword] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const [success, setSuccess] = React.useState<string | null>(null);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    if (!username.trim() || !email.trim() || !password) {
      setError('Please fill in all fields.');
      return;
    }
    if (!/^\S+@\S+\.\S+$/.test(email)) {
      setError('Please enter a valid email address.');
      return;
    }
    if (password.length < 8) {
      setError('Password must be at least 8 characters.');
      return;
    }

    setLoading(true);
    try {
      const res = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, email, password }),
      });
      if (!res.ok) {
        throw new Error('Something went wrong.');
      }
       if (res.status === 200) {                
                const result = await signIn('credentials', {
                    email,
                    password,
                    callbackUrl: "/dashboard",
                    redirect: false
                });
                
                if (result?.ok) {
                    window.location.href = "/classify";
                } else {
                    setError("Sign in after registration failed");
                }
            }      

      setSuccess('Account created. You can sign in now.');
      setUsername('');
      setEmail('');
      setPassword('');
    } catch (err) {
      setError(err instanceof Error ? err.message || 'Something went wrong.' : 'Something went wrong.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="overflow-hidden relative min-h-screen text-white bg-black bg-grid bg-noise">
      <section className="relative flex flex-col items-center justify-center mx-auto px-6 max-w-6xl min-h-[100svh] text-center hero-spotlight md:px-8">
        {/* decorative gradient ring */}
        <div
          className="absolute left-1/2 h-[24rem] w-[24rem] rounded-full blur-3xl pointer-events-none -top-24 -translate-x-1/2"
          style={{ background: 'radial-gradient(closest-side, rgba(22,163,74,0.15), transparent)' }}
        />

        <div className="w-full max-w-md text-left">
          <header className="mb-6 text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1 text-xs text-neutral-300 bg-[#07100c]/70 rounded-full border-[#1b3a29] border">
              <span className="h-1.5 w-1.5 rounded-full" style={{ background: '#16a34a' }} />
              Create your BinSight account
            </div>
            <h1 className="mt-4 text-3xl font-semibold tracking-tight md:text-4xl">
              Sign up
            </h1>
            <p className="mt-2 text-sm text-neutral-300">
              Minimal, fast, and privacy‑friendly.
            </p>
          </header>

          <form onSubmit={onSubmit} noValidate className="p-5 rounded-lg glass">
            <div className="grid gap-4">
              <div>
                <label htmlFor="username" className="block mb-1 text-sm text-neutral-200">
                  Username
                </label>
                <input
                  id="username"
                  name="username"
                  type="text"
                  placeholder="username"
                  autoComplete="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                  minLength={3}
                  className="px-3 placeholder:text-neutral-500 h-11 w-full text-white bg-[#07100c]/70 rounded-lg border-[#1b3a29] border focus:outline-none focus:ring-2 focus:ring-emerald-600/50"
                />
              </div>

              <div>
                <label htmlFor="email" className="block mb-1 text-sm text-neutral-200">
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="you@example.com"
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="px-3 placeholder:text-neutral-500 h-11 w-full text-white bg-[#07100c]/70 rounded-lg border-[#1b3a29] border focus:outline-none focus:ring-2 focus:ring-emerald-600/50"
                />
              </div>

              <div>
                <label htmlFor="password" className="block mb-1 text-sm text-neutral-200">
                  Password
                </label>
                <div className="relative">
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="••••••••"
                    autoComplete="new-password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    minLength={8}
                    className="px-3 pr-24 placeholder:text-neutral-500 h-11 w-full text-white bg-[#07100c]/70 rounded-lg border-[#1b3a29] border focus:outline-none focus:ring-2 focus:ring-emerald-600/50"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((s) => !s)}
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                    className="absolute right-2 top-1/2 px-2 h-8 text-xs bg-[#0e2a1d]/60 rounded-md border-[#1b3a29] transition-colors -translate-y-1/2 border hover:bg-[#0e2a1d]/80"
                  >
                    {showPassword ? 'Hide' : 'Show'}
                  </button>
                </div>
              </div>

              {error ? (
                <p role="alert" className="text-sm text-red-400">
                  {error}
                </p>
              ) : null}
              {success ? (
                <p role="status" className="text-sm text-emerald-400">
                  {success}
                </p>
              ) : null}

              <button
                type="submit"
                disabled={loading}
                className="relative inline-flex items-center justify-center gap-2 h-11 w-full font-medium text-white rounded-lg group disabled:opacity-80 disabled:cursor-not-allowed"
              >
                <span className="absolute inset-0 bg-[#0e2a1d] rounded-lg -z-10" />
                <span className="absolute inset-0 bg-gradient-to-b from-emerald-700/60 to-emerald-700/30 rounded-lg opacity-0 transition-opacity -z-10 group-hover:opacity-100" />
                <span className="absolute inset-0 rounded-lg -z-20 ring-1 ring-[#1b3a29]" />
                {loading ? 'Creating account…' : 'Create account'}
              </button>
            </div>
          </form>

          <p className="mt-4 text-center text-sm text-neutral-300">
            Already have an account?{' '}
            <Link href="/auth/login" className="text-accent-gradient font-medium">
              Sign in
            </Link>
          </p>
        </div>
      </section>

      <footer className="px-6 py-10 text-center text-xs text-neutral-400 md:px-8">
        © BinSight 2025
      </footer>
    </main>
  );
}