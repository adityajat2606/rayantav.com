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
  /** Purple/cream inputs matching the listing site; off uses neutral “current” borders. */
  useLuxuryInputs?: boolean
}

const luxuryInput =
  'h-12 rounded-xl border border-[#4B2E76]/12 bg-white px-4 text-sm text-[#4B2E76] outline-none ring-[#4B2E76]/20 placeholder:text-[#4B2E76]/40 focus:ring-2'
const neutralInput = 'h-12 rounded-xl border border-current/10 bg-transparent px-4 text-sm'

export function RegisterForm({ actionClass, mutedClass, useLuxuryInputs = true }: Props) {
  const { signup, isLoading } = useAuth()
  const { toast } = useToast()
  const router = useRouter()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [note, setNote] = useState('')

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!name.trim() || !email.trim() || !password) {
      toast({ title: 'Missing fields', description: 'Name, email, and password are required.' })
      return
    }
    try {
      await signup(name.trim(), email.trim(), password)
      if (typeof window !== 'undefined') {
        window.localStorage.setItem('rayantav_register_success', '1')
        window.localStorage.setItem('rayantav_register_at', new Date().toISOString())
      }
      toast({ title: 'Account created', description: 'You are signed in on this device.' })
      router.push('/dashboard')
    } catch {
      toast({ title: 'Could not register', description: 'Try again in a moment.' })
    }
  }

  const ic = useLuxuryInputs ? luxuryInput : neutralInput

  return (
    <form className="mt-6 grid gap-4" onSubmit={onSubmit}>
      <input
        className={ic}
        placeholder="Full name"
        name="name"
        autoComplete="name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        disabled={isLoading}
      />
      <input
        className={ic}
        placeholder="Email address"
        type="email"
        name="email"
        autoComplete="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        disabled={isLoading}
      />
      <input
        className={ic}
        placeholder="Password"
        type="password"
        name="password"
        autoComplete="new-password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        disabled={isLoading}
      />
      <input
        className={ic}
        placeholder="What are you listing? (optional)"
        name="note"
        value={note}
        onChange={(e) => setNote(e.target.value)}
        disabled={isLoading}
      />
      <button
        type="submit"
        disabled={isLoading}
        className={`inline-flex h-12 items-center justify-center rounded-full px-6 text-sm font-semibold transition disabled:opacity-60 ${actionClass}`}
      >
        {isLoading ? 'Creating…' : 'Create account'}
      </button>
      <div className={`flex items-center justify-between text-sm ${mutedClass}`}>
        <span>Already have an account?</span>
        <Link href="/login" className="inline-flex items-center gap-2 font-semibold hover:underline">
          <Sparkles className="h-4 w-4" />
          Sign in
        </Link>
      </div>
    </form>
  )
}
