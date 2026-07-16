'use client'

import React, { useState } from 'react'

export default function Page() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (!email.includes('@')) {
      setError('Please enter a valid email address.')
      return
    }
    if (password.length < 6) {
      setError('Password must be at least 6 characters.')
      return
    }

    setIsLoading(true)

    // Simulate authentication lag
    setTimeout(() => {
      setIsLoading(false)
      setSuccess(true)
    }, 1200)
  }

  if (success) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center bg-[#0B0F19] text-white p-6 relative overflow-hidden">
        {/* Glow Effects */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-indigo-500/20 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl" />

        <div className="w-full max-w-md rounded-2xl border border-emerald-500/30 bg-slate-900/80 backdrop-blur-xl p-8 shadow-2xl text-center z-10 animate-fade-in">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500/10 mb-6 border border-emerald-500/20">
            <svg className="h-8 w-8 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h1 className="text-3xl font-extrabold text-white tracking-tight mb-2">Login Successful!</h1>
          <p className="text-slate-400 mb-6">
            Welcome back, <strong className="text-indigo-400">{email}</strong>
          </p>
          <button 
            onClick={() => { setSuccess(false); setEmail(''); setPassword(''); }} 
            className="text-sm font-semibold text-indigo-400 hover:text-indigo-300 transition hover:underline"
          >
            Sign out
          </button>
        </div>
      </main>
    )
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-[#0B0F19] text-white p-6 relative overflow-hidden">
      {/* Decorative Glow Elements */}
      <div className="absolute -top-40 -left-40 w-96 h-96 bg-indigo-600/30 rounded-full blur-[100px]" />
      <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-pink-600/20 rounded-full blur-[100px]" />

      <div className="w-full max-w-md rounded-2xl border border-slate-800 bg-slate-900/60 backdrop-blur-xl p-8 shadow-2xl z-10">
        <div className="flex flex-col items-center mb-8">
          {/* Logo Badge */}
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-tr from-indigo-500 to-purple-600 shadow-lg shadow-indigo-500/30 mb-4">
            <span className="text-xl font-bold text-white">N</span>
          </div>
          <h1 className="text-3xl font-extrabold text-white tracking-tight">Sign In</h1>
          <p className="text-sm text-slate-400 mt-1">Access your DevSecOps portal</p>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-5">
          {error && (
            <div className="rounded-xl border border-red-500/20 bg-red-500/10 p-4 text-sm text-red-400" role="alert">
              {error}
            </div>
          )}

          <div>
            <label htmlFor="email" className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 block w-full rounded-xl border border-slate-800 bg-slate-950/80 p-3 text-white placeholder-slate-600 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 focus:outline-none transition"
              placeholder="you@example.com"
              required
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 block w-full rounded-xl border border-slate-800 bg-slate-950/80 p-3 text-white placeholder-slate-600 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 focus:outline-none transition"
              placeholder="••••••••"
              required
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full mt-4 flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 p-3 font-semibold text-white transition hover:from-indigo-600 hover:to-purple-700 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-slate-950 disabled:from-indigo-500/50 disabled:to-purple-600/50 cursor-pointer"
          >
            {isLoading ? (
              <>
                <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                <span>Signing In...</span>
              </>
            ) : (
              'Sign In'
            )}
          </button>
        </form>
      </div>
    </main>
  )
}