import { PageShell } from "@/components/shared/page-shell"
import { L } from "@/components/shared/listing-ui"
import { SITE_CONFIG } from "@/lib/site-config"

const sections = [
  {
    title: "What we collect",
    body: "Account information (name, email), content you submit with listings, usage data needed to run the product (e.g. pages viewed, rough location from IP for abuse prevention), and communications you send us.",
  },
  {
    title: "How we use data",
    body: `To provide ${SITE_CONFIG.name}, improve search and recommendations, keep the service secure, communicate about your account, and meet legal obligations. We do not sell your personal data.`,
  },
  {
    title: "Sharing",
    body: "We use infrastructure providers to host the app and deliver media. We may share information when required by law or to protect rights and safety. Aggregated, non-identifying statistics may be published.",
  },
  {
    title: "Retention & deletion",
    body: "We keep data as long as your account is active or as needed for the purposes above. You can request deletion of your account subject to legal holds or legitimate business needs (e.g. fraud prevention).",
  },
  {
    title: "Your choices",
    body: "Update profile information in account settings, opt out of non-essential email where offered, and contact us to exercise access or deletion rights depending on your region.",
  },
]

export default function PrivacyPage() {
  return (
    <PageShell
      title="Privacy policy"
      description="How we handle information on the listing platform—in plain language."
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
      </div>
    </PageShell>
  )
}
