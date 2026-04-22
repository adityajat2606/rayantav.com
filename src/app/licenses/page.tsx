import { PageShell } from "@/components/shared/page-shell"
import { L } from "@/components/shared/listing-ui"

const licenses = [
  { name: "Next.js", description: "MIT License — app framework and routing" },
  { name: "React", description: "MIT License — UI library" },
  { name: "Tailwind CSS", description: "MIT License — utility-first styling" },
  { name: "Lucide", description: "ISC License — icon set" },
  { name: "Recharts", description: "MIT License — dashboard charts" },
  { name: "Framer Motion", description: "MIT License — interface motion" },
]

export default function LicensesPage() {
  return (
    <PageShell
      title="Open source & licenses"
      description="We stand on high-quality open tools. Below are primary dependencies for this product surface (not an exhaustive lockfile export)."
    >
      <div className={L.card}>
        <div className="space-y-3">
          {licenses.map((license) => (
            <div
              key={license.name}
              className="flex flex-col justify-between gap-1 rounded-2xl border border-[#4B2E76]/8 bg-[#4B2E76]/[0.04] p-4 sm:flex-row sm:items-center"
            >
              <h3 className="text-sm font-bold text-[#4B2E76]">{license.name}</h3>
              <p className="text-sm text-[#4B2E76]/70">{license.description}</p>
            </div>
          ))}
        </div>
        <p className="mt-6 text-xs text-[#4B2E76]/50">Full text of each license is available from the respective project repositories.</p>
      </div>
    </PageShell>
  )
}
