import type { Metadata } from "next"
import Link from "next/link"
import { Code2, KeyRound, Webhook } from "lucide-react"
import { PageShell } from "@/components/shared/page-shell"
import { Button } from "@/components/ui/button"
import { L } from "@/components/shared/listing-ui"
import { SITE_CONFIG } from "@/lib/site-config"

export const metadata: Metadata = {
  title: "Developers",
  description: `Build and integrate with ${SITE_CONFIG.name} as a listing-first platform.`,
}

const blocks = [
  {
    icon: KeyRound,
    title: "Authentication",
    text: "Integrate with the same sign-in your users already know. Session handling is designed around secure cookies and local profile storage in this reference implementation—swap in your provider when you connect a real API.",
  },
  {
    icon: Webhook,
    title: "Listings as data",
    text: "Listings, categories, and media are modeled as structured posts. When you add a backend, expose read endpoints for search and write endpoints for dashboard flows without changing the public card layout.",
  },
  {
    icon: Code2,
    title: "Embedding & iFrames",
    text: "Need a listing grid elsewhere? The UI is component-driven—export the same TaskPostCard patterns in an internal app or customer portal for a matching look and feel.",
  },
]

export default function DevelopersPage() {
  return (
    <PageShell
      title="Developers"
      description="How to think about extending the platform—API-shaped, even before you wire a production stack."
    >
      <div className="mb-8 grid gap-4 sm:grid-cols-2">
        <div className={L.heroBand}>
          <p className={L.label}>Integration mindset</p>
          <h2 className="mt-2 text-xl font-bold text-[#4B2E76]">Build on the same surfaces users see</h2>
          <p className="mt-2 text-sm leading-relaxed text-[#4B2E76]/75">
            {SITE_CONFIG.name} is implemented as a Next.js app with clear separation between presentation (cards, search, hero) and data
            (task feeds, local mocks). Your backend can replace the mock layer without re-skinning the product.
          </p>
        </div>
        <div className="flex flex-col justify-center rounded-[2rem] border border-[#4B2E76]/10 bg-white p-6">
          <p className="text-sm font-medium text-[#4B2E76]">Need a hand?</p>
          <p className="mt-2 text-sm text-[#4B2E76]/65">Share your stack and timeline; we can suggest the smallest change set to go live.</p>
          <Button asChild className="mt-4 w-fit rounded-full bg-[#4B2E76]">
            <Link href="/contact">Contact the team</Link>
          </Button>
        </div>
      </div>
      <div className="grid gap-4 md:grid-cols-3">
        {blocks.map((b) => {
          const Icon = b.icon
          return (
            <div key={b.title} className={L.card}>
              <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-2xl bg-[#4B2E76]/10 text-[#4B2E76]">
                <Icon className="h-5 w-5" />
              </div>
              <h3 className="text-base font-bold text-[#4B2E76]">{b.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-[#4B2E76]/70">{b.text}</p>
            </div>
          )
        })}
      </div>
      <div className="mt-8 text-center text-sm text-[#4B2E76]/55">Detailed per-endpoint reference can live here when your API is published.</div>
    </PageShell>
  )
}
