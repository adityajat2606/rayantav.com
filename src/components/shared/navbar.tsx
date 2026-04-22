'use client'

import { useMemo, useState } from 'react'
import dynamic from 'next/dynamic'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Search, Menu, X, User, FileText, Building2, LayoutGrid, Tag, Image as ImageIcon, ChevronRight, Sparkles, MapPin, Plus, Heart, ShoppingBag, Globe, ChevronDown } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useAuth } from '@/lib/auth-context'
import { SITE_CONFIG, type TaskKey } from '@/lib/site-config'
import { cn } from '@/lib/utils'
import { siteContent } from '@/config/site.content'
import { getFactoryState } from '@/design/factory/get-factory-state'
import { NAVBAR_OVERRIDE_ENABLED, NavbarOverride } from '@/overrides/navbar'

const NavbarAuthControls = dynamic(() => import('@/components/shared/navbar-auth-controls').then((mod) => mod.NavbarAuthControls), {
  ssr: false,
  loading: () => null,
})

const taskIcons: Record<TaskKey, any> = {
  article: FileText,
  listing: Building2,
  sbm: LayoutGrid,
  classified: Tag,
  image: ImageIcon,
  profile: User,
  social: LayoutGrid,
  pdf: FileText,
  org: Building2,
  comment: FileText,
}

const variantClasses = {
  'compact-bar': {
    shell: 'border-b border-slate-200/80 bg-white/88 text-slate-950 backdrop-blur-xl',
    logo: 'rounded-2xl border border-slate-200 bg-white shadow-sm',
    active: 'bg-slate-950 text-white',
    idle: 'text-slate-600 hover:bg-slate-100 hover:text-slate-950',
    cta: 'rounded-full bg-slate-950 text-white hover:bg-slate-800',
    mobile: 'border-t border-slate-200/70 bg-white/95',
  },
  'editorial-bar': {
    shell: 'border-b border-[#d7c4b3] bg-[#fff7ee]/90 text-[#2f1d16] backdrop-blur-xl',
    logo: 'rounded-full border border-[#dbc6b6] bg-white shadow-sm',
    active: 'bg-[#2f1d16] text-[#fff4e4]',
    idle: 'text-[#72594a] hover:bg-[#f2e5d4] hover:text-[#2f1d16]',
    cta: 'rounded-full bg-[#2f1d16] text-[#fff4e4] hover:bg-[#452920]',
    mobile: 'border-t border-[#dbc6b6] bg-[#fff7ee]',
  },
  'floating-bar': {
    shell: 'border-b border-transparent bg-transparent text-white',
    logo: 'rounded-[1.35rem] border border-white/12 bg-white/8 shadow-[0_16px_48px_rgba(15,23,42,0.22)] backdrop-blur',
    active: 'bg-[#8df0c8] text-[#07111f]',
    idle: 'text-slate-200 hover:bg-white/10 hover:text-white',
    cta: 'rounded-full bg-[#8df0c8] text-[#07111f] hover:bg-[#77dfb8]',
    mobile: 'border-t border-white/10 bg-[#09101d]/96',
  },
  'utility-bar': {
    shell: 'border-b border-[#d7deca] bg-[#f4f6ef]/94 text-[#1f2617] backdrop-blur-xl',
    logo: 'rounded-xl border border-[#d7deca] bg-white shadow-sm',
    active: 'bg-[#1f2617] text-[#edf5dc]',
    idle: 'text-[#56604b] hover:bg-[#e7edd9] hover:text-[#1f2617]',
    cta: 'rounded-lg bg-[#1f2617] text-[#edf5dc] hover:bg-[#2f3a24]',
    mobile: 'border-t border-[#d7deca] bg-[#f4f6ef]',
  },
} as const

const listingLuxury = {
  top: 'bg-[#4B2E76] text-white',
  shell: 'border-b border-[#4B2E76]/10 bg-[#F5E6D3] text-[#2d1b45]',
  pill: 'rounded-full border border-[#4B2E76]/12 bg-white/90 shadow-[0_8px_40px_rgba(75,46,118,0.08)] backdrop-blur',
  nav: 'text-sm font-medium text-[#4B2E76]/80 hover:text-[#4B2E76] transition-colors',
  navActive: 'text-[#4B2E76] font-semibold',
  mobile: 'border-t border-[#4B2E76]/10 bg-[#F5E6D3]',
} as const

const directoryNavStatic = [
  { name: 'Home', href: '/' },
  { name: 'Listings', href: '/listings' },
  { name: 'About', href: '/about' },
  { name: 'Search', href: '/search' },
  { name: 'Updates', href: '/press' },
] as const

export function Navbar() {
  if (NAVBAR_OVERRIDE_ENABLED) {
    return <NavbarOverride />
  }

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const pathname = usePathname()
  const { isAuthenticated } = useAuth()
  const { recipe } = getFactoryState()

  const navigation = useMemo(() => SITE_CONFIG.tasks.filter((task) => task.enabled && task.key !== 'profile'), [])
  const primaryNavigation = navigation.slice(0, 5)
  const mobileNavigation = navigation.map((task) => ({
    name: task.label,
    href: task.route,
    icon: taskIcons[task.key] || LayoutGrid,
  }))
  const primaryTask = SITE_CONFIG.tasks.find((task) => task.key === recipe.primaryTask && task.enabled) || primaryNavigation[0]
  const isDirectoryProduct = recipe.homeLayout === 'listing-home' || recipe.homeLayout === 'classified-home'

  if (isDirectoryProduct) {
    return (
      <header className="sticky top-0 z-50 w-full">
        <div className={listingLuxury.top}>
        <div className="mx-auto flex max-w-7xl items-center justify-center gap-3 px-4 py-2.5 text-[11px] font-medium uppercase tracking-[0.2em] sm:justify-between sm:text-xs">
          <span className="text-center sm:pl-8 sm:text-left">Free browsing · Curated listings · Updated often</span>
          <span className="hidden items-center gap-1.5 sm:inline-flex">
            <Globe className="h-3.5 w-3.5" />
            ENG
            <ChevronDown className="h-3.5 w-3.5 opacity-80" />
          </span>
        </div>
        </div>
        <div className={listingLuxury.shell}>
          <nav className="mx-auto max-w-7xl px-4 pb-3 pt-3 sm:px-6 lg:px-8">
            <div className={cn('grid grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] items-center gap-2 px-3 py-2 sm:gap-3 sm:px-5', listingLuxury.pill)}>
              <div className="flex min-w-0 items-center gap-2">
                <Button variant="ghost" size="icon" className="rounded-full text-[#4B2E76] hover:bg-[#4B2E76]/10 lg:hidden" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} aria-label="Menu">
                  {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                </Button>
                <div className="hidden min-w-0 items-center gap-4 overflow-x-auto lg:flex xl:gap-5">
                  {directoryNavStatic.map((item) => {
                    const isActive = item.href === '/' ? pathname === '/' : pathname.startsWith(item.href)
                    return (
                      <Link key={item.href} href={item.href} className={cn('whitespace-nowrap', isActive ? listingLuxury.navActive : listingLuxury.nav)}>
                        {item.name}
                      </Link>
                    )
                  })}
                </div>
              </div>
              <Link href="/" className="group flex max-w-[min(100%,12rem)] min-w-0 items-center justify-center gap-2 justify-self-center sm:max-w-none sm:gap-2.5">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-2xl bg-[#4B2E76]/8 p-1.5 ring-1 ring-[#4B2E76]/10 sm:h-10 sm:w-10">
                  <img src="/favicon.png?v=20260401" alt="" width="40" height="40" className="h-full w-full object-contain" />
                </span>
                <span className="min-w-0">
                  <span className="block truncate font-semibold leading-tight tracking-[-0.04em] text-[#4B2E76] sm:text-lg">{SITE_CONFIG.name}</span>
                  <span className="mt-0.5 block truncate text-[8px] font-semibold uppercase tracking-[0.18em] text-[#4B2E76]/50 sm:text-[9px]">{siteContent.navbar.tagline}</span>
                </span>
              </Link>
              <div className="flex min-w-0 items-center justify-end gap-0.5 sm:gap-1">
                <Button variant="ghost" size="icon" className="rounded-full text-[#4B2E76] hover:bg-[#4B2E76]/10" asChild>
                  <Link href="/search" aria-label="Search">
                    <Search className="h-5 w-5" />
                  </Link>
                </Button>
                <Button variant="ghost" size="icon" className="hidden rounded-full text-[#4B2E76] hover:bg-[#4B2E76]/10 sm:inline-flex" asChild>
                  <Link href="/dashboard/saved" aria-label="Saved">
                    <Heart className="h-5 w-5" />
                  </Link>
                </Button>
                {isAuthenticated ? (
                  <NavbarAuthControls />
                ) : (
                  <>
                    <Button variant="ghost" size="icon" className="hidden rounded-full text-[#4B2E76] hover:bg-[#4B2E76]/10 md:inline-flex" asChild>
                      <Link href="/login" aria-label="Account">
                        <User className="h-5 w-5" />
                      </Link>
                    </Button>
                    <Button variant="ghost" size="icon" className="relative rounded-full text-[#4B2E76] hover:bg-[#4B2E76]/10" asChild>
                      <Link href="/dashboard" aria-label="My dashboard">
                        <ShoppingBag className="h-5 w-5" />
                        <span className="absolute -right-0.5 -top-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-[#4B2E76] px-1 text-[9px] font-bold text-white">0</span>
                      </Link>
                    </Button>
                    <Button size="sm" asChild className="ml-0.5 hidden h-9 rounded-full border border-[#4B2E76] bg-white px-3 text-xs font-semibold text-[#4B2E76] shadow-none hover:bg-[#4B2E76] hover:text-white sm:inline-flex">
                      <Link href="/login">Sign in</Link>
                    </Button>
                  </>
                )}
              </div>
            </div>
          </nav>
        </div>

        {isMobileMenuOpen && (
          <div className={listingLuxury.mobile}>
            <div className="mx-auto max-w-7xl space-y-1.5 px-4 py-4 sm:px-6">
              <div className="mb-2 flex items-center gap-2 rounded-2xl border border-[#4B2E76]/12 bg-white/90 px-4 py-3 text-sm text-[#4B2E76]/80">
                <MapPin className="h-4 w-4 shrink-0" />
                <span>Find services, places, and trusted listings</span>
              </div>
              {directoryNavStatic.map((item) => {
                const isActive = item.href === '/' ? pathname === '/' : pathname.startsWith(item.href)
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={cn('flex items-center rounded-2xl px-4 py-3.5 text-sm font-semibold transition-colors', isActive ? 'bg-[#4B2E76] text-white' : 'text-[#4B2E76] hover:bg-white/60')}
                  >
                    {item.name}
                  </Link>
                )
              })}
              {primaryTask ? (
                <Link
                  href={primaryTask.route}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="mt-2 flex items-center gap-2 rounded-2xl border border-[#4B2E76]/15 bg-white/80 px-4 py-3.5 text-sm font-semibold text-[#4B2E76]"
                >
                  <Building2 className="h-5 w-5" />
                  {primaryTask.label}
                </Link>
              ) : null}
            </div>
          </div>
        )}
      </header>
    )
  }

  const style = variantClasses[recipe.navbar]
  const isFloating = recipe.navbar === 'floating-bar'
  const isEditorial = recipe.navbar === 'editorial-bar'
  const isUtility = recipe.navbar === 'utility-bar'

  return (
    <header className={cn('sticky top-0 z-50 w-full', style.shell)}>
      <nav className={cn('mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 sm:px-6 lg:px-8', isFloating ? 'h-24 pt-4' : 'h-20')}>
        <div className="flex min-w-0 flex-1 items-center gap-4 lg:gap-7">
          <Link href="/" className="flex shrink-0 items-center gap-3 whitespace-nowrap pr-2">
            <div className={cn('flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden p-1.5', style.logo)}>
              <img src="/favicon.png?v=20260401" alt={`${SITE_CONFIG.name} logo`} width="48" height="48" className="h-full w-full object-contain" />
            </div>
            <div className="min-w-0 hidden sm:block">
              <span className="block truncate text-xl font-semibold">{SITE_CONFIG.name}</span>
              <span className="hidden text-[10px] uppercase tracking-[0.28em] opacity-70 sm:block">{siteContent.navbar.tagline}</span>
            </div>
          </Link>

          {isEditorial ? (
            <div className="hidden min-w-0 flex-1 items-center gap-4 xl:flex">
              <div className="h-px flex-1 bg-[#d8c8bb]" />
              {primaryNavigation.map((task) => {
                const isActive = pathname.startsWith(task.route)
                return (
                  <Link key={task.key} href={task.route} className={cn('text-sm font-semibold uppercase tracking-[0.18em] transition-colors', isActive ? 'text-[#2f1d16]' : 'text-[#7b6254] hover:text-[#2f1d16]')}>
                    {task.label}
                  </Link>
                )
              })}
              <div className="h-px flex-1 bg-[#d8c8bb]" />
            </div>
          ) : isFloating ? (
            <div className="hidden min-w-0 flex-1 items-center gap-2 xl:flex">
              {primaryNavigation.map((task) => {
                const Icon = taskIcons[task.key] || LayoutGrid
                const isActive = pathname.startsWith(task.route)
                return (
                  <Link key={task.key} href={task.route} className={cn('flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold transition-colors', isActive ? style.active : style.idle)}>
                    <Icon className="h-4 w-4" />
                    <span>{task.label}</span>
                  </Link>
                )
              })}
            </div>
          ) : isUtility ? (
            <div className="hidden min-w-0 flex-1 items-center gap-2 xl:flex">
              {primaryNavigation.map((task) => {
                const isActive = pathname.startsWith(task.route)
                return (
                  <Link key={task.key} href={task.route} className={cn('rounded-lg px-3 py-2 text-sm font-semibold transition-colors', isActive ? style.active : style.idle)}>
                    {task.label}
                  </Link>
                )
              })}
            </div>
          ) : (
            <div className="hidden min-w-0 flex-1 items-center gap-1 overflow-hidden xl:flex">
              {primaryNavigation.map((task) => {
                const Icon = taskIcons[task.key] || LayoutGrid
                const isActive = pathname.startsWith(task.route)
                return (
                  <Link key={task.key} href={task.route} className={cn('flex items-center gap-2 rounded-full px-3 py-2 text-sm font-semibold transition-colors whitespace-nowrap', isActive ? style.active : style.idle)}>
                    <Icon className="h-4 w-4" />
                    <span>{task.label}</span>
                  </Link>
                )
              })}
            </div>
          )}
        </div>

        <div className="flex shrink-0 items-center gap-2 sm:gap-3">
          {primaryTask && (recipe.navbar === 'utility-bar' || recipe.navbar === 'floating-bar') ? (
            <Link href={primaryTask.route} className="hidden items-center gap-2 rounded-full border border-current/10 px-3 py-2 text-xs font-semibold uppercase tracking-[0.16em] opacity-80 md:inline-flex">
              <Sparkles className="h-3.5 w-3.5" />
              {primaryTask.label}
            </Link>
          ) : null}

          <Button variant="ghost" size="icon" asChild className="hidden rounded-full md:flex">
            <Link href="/search">
              <Search className="h-5 w-5" />
              <span className="sr-only">Search</span>
            </Link>
          </Button>

          {isAuthenticated ? (
            <NavbarAuthControls />
          ) : (
            <div className="hidden items-center gap-2 md:flex">
              <Button variant="ghost" size="sm" asChild className="rounded-full px-4">
                <Link href="/login">Sign In</Link>
              </Button>
              <Button size="sm" asChild className={style.cta}>
                <Link href="/register">{isEditorial ? 'Subscribe' : isUtility ? 'Post Now' : 'Get Started'}</Link>
              </Button>
            </div>
          )}

          <Button variant="ghost" size="icon" className="rounded-full lg:hidden" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
            {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </nav>

      {isFloating && primaryTask ? (
        <div className="mx-auto hidden max-w-7xl px-4 pb-3 sm:px-6 lg:block lg:px-8">
          <Link href={primaryTask.route} className="inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/8 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-slate-200 backdrop-blur hover:bg-white/12">
            Featured surface
            <span>{primaryTask.label}</span>
            <ChevronRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      ) : null}

      {isMobileMenuOpen && (
        <div className={style.mobile}>
          <div className="space-y-2 px-4 py-4">
            <Link href="/search" onClick={() => setIsMobileMenuOpen(false)} className="mb-3 flex items-center gap-3 rounded-2xl border border-border bg-card px-4 py-3 text-sm font-semibold text-muted-foreground">
              <Search className="h-4 w-4" />
              Search the site
            </Link>
            {mobileNavigation.map((item) => {
              const isActive = pathname.startsWith(item.href)
              return (
                <Link key={item.name} href={item.href} onClick={() => setIsMobileMenuOpen(false)} className={cn('flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-semibold transition-colors', isActive ? style.active : style.idle)}>
                  <item.icon className="h-5 w-5" />
                  {item.name}
                </Link>
              )
            })}
          </div>
        </div>
      )}
    </header>
  )
}
