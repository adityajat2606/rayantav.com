import type { LucideIcon } from 'lucide-react'
import { Bookmark, Building2, FileText, Image as ImageIcon } from 'lucide-react'
import { NavbarShell } from '@/components/shared/navbar-shell'
import { Footer } from '@/components/shared/footer'
import { getFactoryState } from '@/design/factory/get-factory-state'
import { getProductKind } from '@/design/factory/get-product-kind'
import { REGISTER_PAGE_OVERRIDE_ENABLED, RegisterPageOverride } from '@/overrides/register-page'
import { RegisterForm } from '@/components/auth/register-form'

type RegisterConfig = {
  shell: string
  panel: string
  side: string
  muted: string
  action: string
  icon: LucideIcon
  title: string
  body: string
  formLabelClass: string
  bulletClass: string
  bullets: string[]
}

function getRegisterConfig(kind: ReturnType<typeof getProductKind>): RegisterConfig {
  if (kind === 'directory') {
    return {
      shell: 'bg-[#F5E6D3] text-[#2d1b45]',
      panel: 'border border-[#4B2E76]/10 bg-white shadow-[0_20px_50px_rgba(75,46,118,0.08)]',
      side: 'border border-[#4B2E76]/10 bg-white/80',
      muted: 'text-[#4B2E76]/70',
      action: 'bg-[#4B2E76] text-white hover:bg-[#3d2560]',
      icon: Building2,
      title: 'Create your listing account',
      body: 'Post and manage listings, keep contact details current, and return to a dashboard that matches the public site experience.',
      formLabelClass: 'text-[#4B2E76]/55',
      bulletClass: 'rounded-[1.5rem] border border-[#4B2E76]/10 bg-white/50 px-4 py-4 text-sm text-[#4B2E76]/90',
      bullets: [
        'Listing-first tools without extra product clutter',
        'Sign in once; your session stays on this device',
        'Match the public purple & cream design language',
      ],
    }
  }
  if (kind === 'editorial') {
    return {
      shell: 'bg-[#fbf6ee] text-[#241711]',
      panel: 'border border-[#dcc8b7] bg-[#fffdfa]',
      side: 'border border-[#e6d6c8] bg-[#fff4e8]',
      muted: 'text-[#6e5547]',
      action: 'bg-[#241711] text-[#fff1e2] hover:bg-[#3a241b]',
      icon: FileText,
      title: 'Start your contributor workspace',
      body: 'Create a profile for essays, issue drafts, editorial review, and publication scheduling.',
      formLabelClass: 'opacity-70',
      bulletClass: 'rounded-[1.5rem] border border-current/10 px-4 py-4 text-sm',
      bullets: ['Editorial workflow aligned to the publication', 'Review and scheduling without a generic admin shell', 'Reader-first layout preserved across surfaces'],
    }
  }
  if (kind === 'visual') {
    return {
      shell: 'bg-[#07101f] text-white',
      panel: 'border border-white/10 bg-white/6',
      side: 'border border-white/10 bg-white/5',
      muted: 'text-slate-300',
      action: 'bg-[#8df0c8] text-[#07111f] hover:bg-[#77dfb8]',
      icon: ImageIcon,
      title: 'Set up your creator profile',
      body: 'Launch a visual-first account with gallery publishing, identity surfaces, and profile-led discovery.',
      formLabelClass: 'opacity-70',
      bulletClass: 'rounded-[1.5rem] border border-white/10 px-4 py-4 text-sm',
      bullets: ['Gallery-like publishing surfaces', 'Creator identity without a washed-out dashboard', 'Motion and contrast tuned for visual work'],
    }
  }
  return {
    shell: 'bg-[#f7f1ea] text-[#261811]',
    panel: 'border border-[#ddcdbd] bg-[#fffaf4]',
    side: 'border border-[#e8dbce] bg-[#f3e8db]',
    muted: 'text-[#71574a]',
    action: 'bg-[#5b2b3b] text-[#fff0f5] hover:bg-[#74364b]',
    icon: Bookmark,
    title: 'Create a curator account',
    body: 'Build shelves, save references, and connect collections to your profile without a generic feed setup.',
    formLabelClass: 'opacity-70',
    bulletClass: 'rounded-[1.5rem] border border-current/10 px-4 py-4 text-sm',
    bullets: ['Curated collections and saved boards', 'Calmer metadata than a generic feed', 'Return visits without noisy defaults'],
  }
}

export default function RegisterPage() {
  if (REGISTER_PAGE_OVERRIDE_ENABLED) {
    return <RegisterPageOverride />
  }

  const { recipe } = getFactoryState()
  const productKind = getProductKind(recipe)
  const config = getRegisterConfig(productKind)
  const Icon = config.icon

  return (
    <div className={`min-h-screen ${config.shell}`}>
      <NavbarShell />
      <main className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <section className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-stretch">
          <div className={`rounded-[2rem] p-8 ${config.side}`}>
            <Icon className="h-8 w-8" />
            <h1 className="mt-5 text-4xl font-semibold tracking-[-0.05em]">{config.title}</h1>
            <p className={`mt-5 text-sm leading-8 ${config.muted}`}>{config.body}</p>
            <div className="mt-8 grid gap-4">
              {config.bullets.map((item) => (
                <div key={item} className={config.bulletClass}>
                  {item}
                </div>
              ))}
            </div>
          </div>

          <div className={`rounded-[2rem] p-8 ${config.panel}`}>
            <p className={`text-xs font-semibold uppercase tracking-[0.24em] ${config.formLabelClass}`}>Create account</p>
            <RegisterForm actionClass={config.action} mutedClass={config.muted} useLuxuryInputs={productKind === 'directory'} />
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
