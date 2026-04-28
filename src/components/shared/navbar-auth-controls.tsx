'use client'

import Link from 'next/link'
import { LogOut } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useAuth } from '@/lib/auth-context'

export function NavbarAuthControls() {
  const { logout } = useAuth()

  return (
    <div className="flex items-center gap-1.5 sm:gap-2">
      <Button
        type="button"
        variant="outline"
        size="sm"
        onClick={() => logout()}
        className="h-9 rounded-full border-[#4B2E76] px-2.5 text-xs font-semibold text-[#4B2E76] hover:bg-[#4B2E76] hover:text-white sm:px-3"
        aria-label="Sign out"
      >
        <LogOut className="mr-1 h-3.5 w-3.5" />
        <span>Sign out</span>
      </Button>
    </div>
  )
}
