import { PageShell } from "@/components/shared/page-shell"
import { L } from "@/components/shared/listing-ui"
import { SITE_CONFIG } from "@/lib/site-config"

const sections = [
  {
    title: "Using the service",
    body: `By using ${SITE_CONFIG.name}, you agree to these terms. The site is a listing and discovery surface: you are responsible for the accuracy of what you publish and for following applicable laws where you operate.`,
  },
  {
    title: "Accounts & security",
    body: "Keep login credentials private. Notify us if you suspect unauthorized access. We may suspend accounts that abuse the platform, attempt to disrupt service, or mislead visitors.",
  },
  {
    title: "Content & listings",
    body: "You retain rights to your content. You grant us a license to host, display, and distribute it as needed to run the service (for example, showing your listing in search and sharing metadata with CDNs).",
  },
  {
    title: "Acceptable use",
    body: "No harassment, illegal goods or services, malware, or attempts to scrape or overload systems. We may remove content or restrict access to protect users and the integrity of the directory.",
  },
  {
    title: "Disclaimers",
    body: "The service is provided as available. We do not guarantee uninterrupted availability and are not liable for indirect or consequential damages to the extent permitted by law.",
  },
]

export default function TermsPage() {
  return (
    <PageShell
      title="Terms of service"
      description={`Rules for using ${SITE_CONFIG.name} as a visitor, lister, or partner.`}
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
