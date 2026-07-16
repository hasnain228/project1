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

    // Basic Validation Checks
    if (!email.includes('@')) {
      setError('Please enter a valid email address.')
      return
    }
    if (password.length < 6) {
      setError('Password must be at least 6 characters.')
      return
    }

    setIsLoading(true)

    // Simulate an authentication request latency
    setTimeout(() => {
      setIsLoading(false)
      setSuccess(true)
    }, 1000)
  }

  // Reactive view once successfully authenticated
  if (success) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center bg-gray-50 p-6">
        <div className="w-full max-w-md rounded-lg bg-white p-8 shadow-md text-center border border-gray-150">
          <h1 className="text-2xl font-bold text-green-600 mb-2">Login Successful!</h1>
          <p className="text-gray-600">Welcome back, <strong>{email}</strong></p>
          <button 
            onClick={() => { setSuccess(false); setEmail(''); setPassword(''); }} 
            className="mt-6 text-sm text-blue-600 hover:underline"
          >
            Sign out
          </button>
        </div>
      </main>
    )
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gray-50 p-6">
      <div className="w-full max-w-md rounded-lg bg-white p-8 shadow-md border border-gray-150">
        <h1 className="text-2xl font-bold text-gray-900 mb-6 text-center">Sign In</h1>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <div className="rounded bg-red-50 p-3 text-sm text-red-600" role="alert">
              {error}
            </div>
          )}

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email Address</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 block w-full rounded border border-gray-300 p-2 text-black focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none"
              placeholder="you@example.com"
              required
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 block w-full rounded border border-gray-300 p-2 text-black focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none"
              placeholder="••••••••"
              required
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full rounded bg-blue-600 p-2 font-semibold text-white transition hover:bg-blue-700 disabled:bg-blue-400"
          >
            {isLoading ? 'Signing In...' : 'Sign In'}
          </button>
        </form>
      </div>
    </main>
  )
}