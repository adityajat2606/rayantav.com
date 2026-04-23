'use client'

import Link from 'next/link'
import { Plus } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useAuth } from '@/lib/auth-context'

export function ListingsCreateCta() {
  const { isAuthenticated } = useAuth()
  if (!isAuthenticated) return null

  return (
    <Button
      asChild
      className="inline-flex h-11 items-center gap-2 rounded-full bg-[#4B2E76] px-5 text-sm font-semibold text-white shadow-sm hover:bg-[#3d2560]"
    >
      <Link href="/dashboard/listings/new">
        <Plus className="h-4 w-4" />
        Add listing
      </Link>
    </Button>
  )
}
