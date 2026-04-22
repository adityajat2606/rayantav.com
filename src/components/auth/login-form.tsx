'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Sparkles } from 'lucide-react'
import { useAuth } from '@/lib/auth-context'
import { useToast } from '@/components/ui/use-toast'

type Props = {
  actionClass: string
  mutedClass: string
}

export function LoginForm({ actionClass, mutedClass }: Props) {
  const { login, isLoading } = useAuth()
  const { toast } = useToast()
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!email.trim() || !password) {
      toast({ title: 'Missing fields', description: 'Enter your email and password to continue.' })
      return
    }
    try {
      await login(email.trim(), password)
      if (typeof window !== 'undefined') {
        window.localStorage.setItem('rayantav_login_success', '1')
        window.localStorage.setItem('rayantav_login_at', new Date().toISOString())
      }
      toast({ title: 'Signed in', description: 'Your session is saved on this device.' })
      router.push('/dashboard')
    } catch {
      toast({ title: 'Sign in failed', description: 'Check your details and try again.' })
    }
  }

  return (
    <form className="mt-6 grid gap-4" onSubmit={onSubmit}>
      <input
        className="h-12 rounded-xl border border-[#4B2E76]/12 bg-white px-4 text-sm text-[#4B2E76] outline-none ring-[#4B2E76]/20 placeholder:text-[#4B2E76]/40 focus:ring-2"
        placeholder="Email address"
        type="email"
        name="email"
        autoComplete="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        disabled={isLoading}
      />
      <input
        className="h-12 rounded-xl border border-[#4B2E76]/12 bg-white px-4 text-sm text-[#4B2E76] outline-none ring-[#4B2E76]/20 placeholder:text-[#4B2E76]/40 focus:ring-2"
        placeholder="Password"
        type="password"
        name="password"
        autoComplete="current-password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        disabled={isLoading}
      />
      <button
        type="submit"
        disabled={isLoading}
        className={`inline-flex h-12 items-center justify-center rounded-full px-6 text-sm font-semibold transition disabled:opacity-60 ${actionClass}`}
      >
        {isLoading ? 'Signing in…' : 'Sign in'}
      </button>
      <div className={`flex items-center justify-between text-sm ${mutedClass}`}>
        <Link href="/forgot-password" className="hover:underline">
          Forgot password?
        </Link>
        <Link href="/register" className="inline-flex items-center gap-2 font-semibold hover:underline">
          <Sparkles className="h-4 w-4" />
          Create account
        </Link>
      </div>
    </form>
  )
}
