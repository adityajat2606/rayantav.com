import Link from "next/link"
import { Heart, Laptop, Users } from "lucide-react"
import { PageShell } from "@/components/shared/page-shell"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { L } from "@/components/shared/listing-ui"
import { SITE_CONFIG } from "@/lib/site-config"

const roles = [
  { title: "Product Designer", location: "Remote", type: "Full-time", level: "Mid" },
  { title: "Frontend Engineer", location: "New York, NY", type: "Full-time", level: "Senior" },
  { title: "Partner Success", location: "Remote", type: "Full-time", level: "Mid" },
]

const benefits = [
  "Remote-first with flexible hours across zones",
  "Health stipend and annual home-office allowance",
  "Learning budget for conferences and courses",
  "Quarterly in-person design & research weeks",
]

const culture = [
  { icon: Laptop, t: "Craft over churn", b: "We invest in a cohesive listing experience instead of piling on unrelated product modes." },
  { icon: Users, t: "Clear ownership", b: "Small teams, explicit lanes, and direct access to decisions—less theater, more build." },
  { icon: Heart, t: "Respect for readers", b: "If a feature makes browse or search noisier, we rethink it." },
]

export default function CareersPage() {
  return (
    <PageShell
      title="Careers"
      description={`Help shape how people discover and trust listings on ${SITE_CONFIG.name}—a focused directory, not a grab-bag platform.`}
      actions={
        <Button asChild className="rounded-full bg-[#4B2E76] text-white hover:bg-[#3d2560]">
          <Link href="/contact">Get in touch</Link>
        </Button>
      }
    >
      <div className="mb-10 grid gap-4 sm:grid-cols-3">
        {culture.map((c) => {
          const Icon = c.icon
          return (
            <div key={c.t} className={L.card}>
              <Icon className="h-5 w-5 text-[#4B2E76]" />
              <h3 className="mt-3 text-sm font-bold text-[#4B2E76]">{c.t}</h3>
              <p className="mt-2 text-sm text-[#4B2E76]/70">{c.b}</p>
            </div>
          )
        })}
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="space-y-4">
          {roles.map((role) => (
            <div key={role.title} className={L.card}>
              <div className="flex flex-wrap items-center gap-2">
                <Badge className="bg-[#4B2E76]/10 text-[#4B2E76] hover:bg-[#4B2E76]/10">{role.level}</Badge>
                <Badge variant="outline" className="border-[#4B2E76]/25 text-[#4B2E76]">
                  {role.type}
                </Badge>
              </div>
              <h2 className="mt-3 text-lg font-bold text-[#4B2E76]">{role.title}</h2>
              <p className="mt-1 text-sm text-[#4B2E76]/60">{role.location}</p>
              <Button variant="outline" className="mt-4 rounded-full border-[#4B2E76] text-[#4B2E76]" asChild>
                <Link href="/contact">View role</Link>
              </Button>
            </div>
          ))}
        </div>
        <div className={L.card}>
          <h3 className="text-lg font-bold text-[#4B2E76]">Why {SITE_CONFIG.name}</h3>
          <p className="mt-2 text-sm leading-relaxed text-[#4B2E76]/70">
            We are building a directory people enjoy scanning—strong typography, honest cards, and search that does not feel bolted on.
          </p>
          <ul className="mt-4 space-y-2">
            {benefits.map((benefit) => (
              <li key={benefit} className="rounded-xl border border-[#4B2E76]/10 bg-white px-3 py-2.5 text-sm text-[#4B2E76]/80">
                {benefit}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </PageShell>
  )
}
