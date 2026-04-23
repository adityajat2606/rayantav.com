import { Activity, CheckCircle2, Server } from "lucide-react"
import { PageShell } from "@/components/shared/page-shell"
import { L } from "@/components/shared/listing-ui"

const services = [
  { name: "Browse & search", status: "Operational" },
  { name: "Listing editor", status: "Operational" },
  { name: "Auth & accounts", status: "Operational" },
  { name: "Media & images", status: "Operational" },
]

const incidents = [
  { date: "Mar 12, 2026", title: "Delayed email digests", status: "Resolved" },
  { date: "Feb 22, 2026", title: "Search index lag (15 min)", status: "Resolved" },
]

export default function StatusPage() {
  return (
    <PageShell
      title="System status"
      description="A simple view of the surfaces visitors and listing owners rely on. Timelines are illustrative for this demo build."
    >
      <div className="mb-8 flex flex-wrap items-center gap-3 rounded-[1.5rem] border border-[#4B2E76]/10 bg-white/90 px-4 py-3 text-sm text-[#4B2E76]/80">
        <Activity className="h-4 w-4 text-[#4B2E76]" />
        <span>All systems operational — no active incidents</span>
      </div>
      <div className="space-y-6">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((service) => (
            <div key={service.name} className={L.card}>
              <div className="mb-2 flex items-center justify-between">
                <Server className="h-5 w-5 text-[#4B2E76]/70" />
                <CheckCircle2 className="h-4 w-4 text-emerald-600" />
              </div>
              <h2 className="text-sm font-bold text-[#4B2E76]">{service.name}</h2>
              <p className="mt-2 text-xs font-medium uppercase tracking-wider text-emerald-700">{service.status}</p>
            </div>
          ))}
        </div>
        <div className={L.card}>
          <h3 className="text-lg font-bold text-[#4B2E76]">Recent incidents</h3>
          <p className="mt-1 text-sm text-[#4B2E76]/65">Short notes when something affected browse, publish, or sign-in.</p>
          <div className="mt-4 space-y-2">
            {incidents.map((incident) => (
              <div
                key={incident.title}
                className="flex flex-col gap-1 rounded-xl border border-[#4B2E76]/8 bg-[#4B2E76]/[0.03] px-4 py-3 sm:flex-row sm:items-center sm:justify-between"
              >
                <div>
                  <div className="text-xs font-medium text-[#4B2E76]/55">{incident.date}</div>
                  <div className="text-sm font-medium text-[#4B2E76]">{incident.title}</div>
                </div>
                <span className="w-fit rounded-full bg-emerald-100 px-2.5 py-0.5 text-xs font-semibold text-emerald-800">{incident.status}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </PageShell>
  )
}
