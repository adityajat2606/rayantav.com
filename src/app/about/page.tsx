import Link from 'next/link'
import { Compass, HeartHandshake, Sparkles, Target } from 'lucide-react'
import { PageShell } from '@/components/shared/page-shell'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { L } from '@/components/shared/listing-ui'
import { mockTeamMembers } from '@/data/mock-data'
import { SITE_CONFIG } from '@/lib/site-config'

const stats = [
  { value: '8.6k+', label: 'Listings shared' },
  { value: '12k+', label: 'Creators & teams' },
  { value: '180k+', label: 'Saves & signals' },
]

const pillars = [
  {
    icon: Target,
    title: 'Clarity over noise',
    text: 'Every card is built so the title, category, and proof points read in one pass—no mixed feeds or mystery formats.',
  },
  {
    icon: HeartHandshake,
    title: 'Trust in the open',
    text: 'We favour honest descriptions, obvious contact paths, and consistent review cues so visitors can decide quickly.',
  },
  {
    icon: Compass,
    title: 'Discovery that scales',
    text: 'Search, filters, and the browse grid work together: start broad, then narrow without losing your place.',
  },
]

export default function AboutPage() {
  return (
    <PageShell
      title={`About ${SITE_CONFIG.name}`}
      description="A listing-first platform for people who want to compare, shortlist, and act—without wading through unrelated content types."
      actions={
        <>
          <Button asChild className="rounded-full border-2 border-[#4B2E76] bg-white text-[#4B2E76] hover:bg-[#4B2E76] hover:text-white">
            <Link href="/listings">Browse listings</Link>
          </Button>
          <Button asChild className="rounded-full bg-[#4B2E76] text-white hover:bg-[#3d2560]">
            <Link href="/contact">Talk to us</Link>
          </Button>
        </>
      }
    >
      <div className="space-y-12">
        <section className={L.heroBand}>
          <p className={L.label}>Our story</p>
          <h2 className="mt-3 text-2xl font-bold tracking-[-0.04em] text-[#4B2E76] sm:text-3xl">
            Built for the moment someone opens ten tabs and still cannot choose.
          </h2>
          <p className="mt-4 max-w-3xl text-sm leading-8 text-[#4B2E76]/75">
            {SITE_CONFIG.name} started as a simple idea: one calm surface for discoverable entries—services, places, and structured pages—so
            visitors spend less time decoding the interface and more time on the decision. We keep the public experience listing-led, with
            account tools tucked behind a dashboard that matches the same purple and cream language.
          </p>
        </section>

        <div className="grid gap-4 sm:grid-cols-3">
          {stats.map((s) => (
            <div key={s.label} className={L.cardInner}>
              <p className="text-2xl font-bold text-[#4B2E76]">{s.value}</p>
              <p className="mt-1 text-xs font-medium text-[#4B2E76]/55">{s.label}</p>
            </div>
          ))}
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {pillars.map((p) => {
            const Icon = p.icon
            return (
              <div key={p.title} className={L.card}>
                <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-2xl bg-[#4B2E76]/10 text-[#4B2E76]">
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className={L.h3}>{p.title}</h3>
                <p className="mt-2 text-sm leading-7 text-[#4B2E76]/70">{p.text}</p>
              </div>
            )
          })}
        </div>

        <section className={L.card}>
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className={L.label}>People behind the product</p>
              <h2 className="mt-2 text-2xl font-bold text-[#4B2E76]">Team & contributors</h2>
              <p className="mt-2 max-w-2xl text-sm text-[#4B2E76]/70">
                A small group of designers, engineers, and community folks who care about legible metadata and fast paths to contact.
              </p>
            </div>
            <Button asChild variant="outline" className="rounded-full border-[#4B2E76]/25 text-[#4B2E76]">
              <Link href="/team">Open directory</Link>
            </Button>
          </div>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {mockTeamMembers.map((member) => (
              <div key={member.id} className="flex flex-col rounded-2xl border border-[#4B2E76]/8 bg-white/80 p-4 transition hover:border-[#4B2E76]/20">
                <div className="flex items-center gap-3">
                  <Avatar className="h-12 w-12 border border-[#4B2E76]/10">
                    <AvatarImage src={member.avatar} alt={member.name} />
                    <AvatarFallback className="bg-[#4B2E76]/10 text-[#4B2E76]">{member.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-sm font-semibold text-[#4B2E76]">{member.name}</p>
                    <p className="text-xs text-[#4B2E76]/55">{member.role}</p>
                  </div>
                </div>
                <p className="mt-3 text-sm leading-relaxed text-[#4B2E76]/70">{member.bio}</p>
                <p className="mt-2 text-xs text-[#4B2E76]/45">{member.location}</p>
              </div>
            ))}
          </div>
        </section>

        <div className="flex flex-wrap items-center justify-between gap-4 rounded-[2rem] border border-dashed border-[#4B2E76]/20 bg-[#4B2E76]/[0.03] px-6 py-8">
          <div className="flex items-start gap-3">
            <Sparkles className="mt-0.5 h-5 w-5 shrink-0 text-[#4B2E76]" />
            <div>
              <p className="font-semibold text-[#4B2E76]">Ready to list or explore?</p>
              <p className="mt-1 text-sm text-[#4B2E76]/70">Start from the grid, or open a conversation with the team for partnerships.</p>
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            <Link href="/register" className={L.ctaOutline}>
              Create account
            </Link>
            <Link href="/search" className={L.cta}>
              Search
            </Link>
          </div>
        </div>
      </div>
    </PageShell>
  )
}
