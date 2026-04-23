import { PageShell } from "@/components/shared/page-shell"
import { L } from "@/components/shared/listing-ui"

const sections = [
  {
    title: "Essential",
    body: "Required for sign-in, session security, load balancing, and CSRF protection. The site cannot function without these.",
  },
  {
    title: "Preferences",
    body: "Remember choices such as light theme, locale, and UI toggles you explicitly set. You can clear these from the browser at any time.",
  },
  {
    title: "Analytics",
    body: "Optional usage metrics to understand which flows work (e.g. search to listing). Where used, we favor aggregated data and keep retention limited.",
  },
]

export default function CookiesPage() {
  return (
    <PageShell
      title="Cookie policy"
      description="What cookies and similar storage we use, and how you can control them."
    >
      <div className={L.card}>
        <p className="text-xs font-medium text-[#4B2E76]/50">Last updated: April 22, 2026</p>
        <div className="mt-6 space-y-4">
          {sections.map((section) => (
            <div key={section.title} className="rounded-2xl border border-[#4B2E76]/8 bg-[#4B2E76]/[0.04] p-5">
              <h3 className="text-sm font-bold text-[#4B2E76]">{section.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-[#4B2E76]/75">{section.body}</p>
            </div>
          ))}
        </div>
        <p className="mt-6 text-sm text-[#4B2E76]/60">
          Most browsers let you block or delete cookies. Note that blocking essential cookies may break sign-in and core features.
        </p>
      </div>
    </PageShell>
  )
}
