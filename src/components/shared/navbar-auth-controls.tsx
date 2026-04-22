'use client'

import Link from 'next/link'
import { LogOut } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { useAuth } from '@/lib/auth-context'

export function NavbarAuthControls() {
  const { user, logout } = useAuth()

  return (
    <div className="flex items-center gap-1.5 sm:gap-2">
      <Link
        href="/dashboard"
        className="flex shrink-0 items-center rounded-full border border-[#4B2E76]/15 p-0.5 ring-offset-2 transition hover:ring-2 hover:ring-[#4B2E76]/20"
        title="Dashboard"
        aria-label="Open dashboard"
      >
        <Avatar className="h-8 w-8 border border-[#4B2E76]/10 sm:h-9 sm:w-9">
          <AvatarImage src={user?.avatar} alt={user?.name} />
          <AvatarFallback className="bg-[#4B2E76]/10 text-sm text-[#4B2E76]">{user?.name?.charAt(0)}</AvatarFallback>
        </Avatar>
      </Link>

      <Button
        type="button"
        variant="outline"
        size="sm"
        onClick={() => logout()}
        className="h-9 rounded-full border-[#4B2E76] px-2.5 text-xs font-semibold text-[#4B2E76] hover:bg-[#4B2E76] hover:text-white sm:px-3"
        aria-label="Sign out"
      >
        <LogOut className="h-3.5 w-3.5 sm:mr-1" />
        <span className="hidden sm:inline">Sign out</span>
      </Button>
    </div>
  )
}
