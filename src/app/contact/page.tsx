import { Building2, FileText, Image as ImageIcon, Mail, MapPin, Phone, Sparkles, Bookmark } from 'lucide-react'
import { NavbarShell } from '@/components/shared/navbar-shell'
import { Footer } from '@/components/shared/footer'
import { SITE_CONFIG } from '@/lib/site-config'
import { getFactoryState } from '@/design/factory/get-factory-state'
import { getProductKind } from '@/design/factory/get-product-kind'
import { CONTACT_PAGE_OVERRIDE_ENABLED, ContactPageOverride } from '@/overrides/contact-page'

function getTone(kind: ReturnType<typeof getProductKind>) {
  if (kind === 'directory') {
    return {
      shell: 'bg-[#F5E6D3] text-[#2d1b45]',
      panel: 'border border-[#4B2E76]/10 bg-white shadow-[0_20px_50px_rgba(75,46,118,0.08)]',
      soft: 'border border-[#4B2E76]/10 bg-white/80',
      muted: 'text-[#4B2E76]/70',
      action: 'rounded-full bg-[#4B2E76] text-white hover:bg-[#3d2560]',
    }
  }
  if (kind === 'editorial') {
    return {
      shell: 'bg-[#fbf6ee] text-[#241711]',
      panel: 'border border-[#dcc8b7] bg-[#fffdfa]',
      soft: 'border border-[#e6d6c8] bg-[#fff4e8]',
      muted: 'text-[#6e5547]',
      action: 'bg-[#241711] text-[#fff1e2] hover:bg-[#3a241b]',
    }
  }
  if (kind === 'visual') {
    return {
      shell: 'bg-[#07101f] text-white',
      panel: 'border border-white/10 bg-white/6',
      soft: 'border border-white/10 bg-white/5',
      muted: 'text-slate-300',
      action: 'bg-[#8df0c8] text-[#07111f] hover:bg-[#77dfb8]',
    }
  }
  return {
    shell: 'bg-[#f7f1ea] text-[#261811]',
    panel: 'border border-[#ddcdbd] bg-[#fffaf4]',
    soft: 'border border-[#e8dbce] bg-[#f3e8db]',
    muted: 'text-[#71574a]',
    action: 'bg-[#5b2b3b] text-[#fff0f5] hover:bg-[#74364b]',
  }
}

export default function ContactPage() {
  if (CONTACT_PAGE_OVERRIDE_ENABLED) {
    return <ContactPageOverride />
  }

  const { recipe } = getFactoryState()
  const productKind = getProductKind(recipe)
  const tone = getTone(productKind)
  const contactEmail = process.env.NEXT_PUBLIC_CONTACT_EMAIL || 'support@rayantav.com'
  const lanes =
    productKind === 'directory'
      ? [
          { icon: Building2, title: 'Listings & verification', body: 'Help with new listings, category placement, and keeping business details accurate and up to date.' },
          { icon: Phone, title: 'Partnerships', body: 'Bulk onboarding, co-marketing, and ways to feature trusted partners in the directory.' },
          { icon: MapPin, title: 'Coverage & regions', body: 'Ask about expanding categories, new cities, or niche verticals in the catalog.' },
        ]
      : productKind === 'editorial'
        ? [
            { icon: FileText, title: 'Editorial submissions', body: 'Pitch essays, columns, and long-form ideas that fit the publication.' },
            { icon: Mail, title: 'Newsletter partnerships', body: 'Coordinate sponsorships, collaborations, and issue-level campaigns.' },
            { icon: Sparkles, title: 'Contributor support', body: 'Get help with voice, formatting, and publication workflow questions.' },
          ]
        : productKind === 'visual'
          ? [
              { icon: ImageIcon, title: 'Creator collaborations', body: 'Discuss gallery launches, creator features, and visual campaigns.' },
              { icon: Sparkles, title: 'Licensing and use', body: 'Reach out about usage rights, commercial requests, and visual partnerships.' },
              { icon: Mail, title: 'Media kits', body: 'Request creator decks, editorial support, or visual feature placement.' },
            ]
          : [
              { icon: Bookmark, title: 'Collection submissions', body: 'Suggest resources, boards, and links that deserve a place in the library.' },
              { icon: Mail, title: 'Resource partnerships', body: 'Coordinate curation projects, reference pages, and link programs.' },
              { icon: Sparkles, title: 'Curator support', body: 'Need help organizing shelves, collections, or profile-connected boards?' },
            ]

  return (
    <div className={`min-h-screen ${tone.shell}`}>
      <NavbarShell />
      <main className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <section className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#4B2E76]/50">Contact {SITE_CONFIG.name}</p>
            <h1 className="mt-4 text-4xl font-bold tracking-[-0.05em] text-[#4B2E76] sm:text-5xl">Let us help with listings, partnerships, or the catalog.</h1>
            <p className={`mt-5 max-w-2xl text-sm leading-8 ${tone.muted}`}>
              Share a bit of context - what you are listing, where you are based, and what a good outcome looks like. We read every message and route
              it to the right person instead of a generic queue.
            </p>
            <div className="mt-8 space-y-4">
              {lanes.map((lane) => (
                <div key={lane.title} className={`rounded-[1.6rem] p-5 ${tone.soft}`}>
                  <lane.icon className="h-5 w-5" />
                  <h2 className="mt-3 text-xl font-semibold">{lane.title}</h2>
                  <p className={`mt-2 text-sm leading-7 ${tone.muted}`}>{lane.body}</p>
                </div>
              ))}
            </div>
          </div>

          <div className={`rounded-[2rem] p-7 ${tone.panel}`}>
            <h2 className="text-2xl font-bold text-[#4B2E76]">Send a message</h2>
            <p className="mt-1 text-sm text-[#4B2E76]/60">Demo form - connects to your own backend when you wire it in.</p>
            <div className="mt-5">
              <a
                href={`mailto:${contactEmail}`}
                className={`inline-flex h-11 items-center justify-center rounded-full px-5 text-sm font-semibold ${tone.action}`}
              >
                Email us at {contactEmail}
              </a>
            </div>
            <form className="mt-6 grid gap-4">
              <input
                className="h-12 rounded-xl border border-[#4B2E76]/12 bg-white px-4 text-sm text-[#4B2E76] placeholder:text-[#4B2E76]/40"
                placeholder="Your name"
              />
              <input
                className="h-12 rounded-xl border border-[#4B2E76]/12 bg-white px-4 text-sm text-[#4B2E76] placeholder:text-[#4B2E76]/40"
                placeholder="Email address"
                type="email"
              />
              <input
                className="h-12 rounded-xl border border-[#4B2E76]/12 bg-white px-4 text-sm text-[#4B2E76] placeholder:text-[#4B2E76]/40"
                placeholder="Topic (e.g. New listing, Partnership)"
              />
              <textarea
                className="min-h-[180px] rounded-2xl border border-[#4B2E76]/12 bg-white px-4 py-3 text-sm text-[#4B2E76] placeholder:text-[#4B2E76]/40"
                placeholder="Context, links, and the outcome you are hoping for."
              />
              <button type="submit" className={`inline-flex h-12 items-center justify-center px-6 text-sm font-semibold ${tone.action}`}>
                Send message
              </button>
            </form>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
