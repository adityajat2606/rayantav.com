import Link from "next/link"
import { PageShell } from "@/components/shared/page-shell"
import { L } from "@/components/shared/listing-ui"
import { Button } from "@/components/ui/button"

function titleFromSlug(slug: string) {
  return slug
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ")
}

export default async function DeveloperDocPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const label = titleFromSlug(slug)

  return (
    <PageShell
      title={`${label} · Developers`}
      description="Reference content for this topic will live here as your API and integration guides ship."
      actions={
        <Button asChild variant="outline" className="rounded-full border-[#4B2E76]/25 text-[#4B2E76]">
          <Link href="/developers">All topics</Link>
        </Button>
      }
    >
      <div className={L.card}>
        <p className="text-sm leading-relaxed text-[#4B2E76]/75">
          This is a placeholder page for the <span className="font-semibold text-[#4B2E76]">{slug}</span> topic. Use it to host OpenAPI
          snippets, curl examples, or webhooks when your backend is ready—without changing the global shell.
        </p>
        <p className="mt-4 text-sm text-[#4B2E76]/55">Slug: {slug}</p>
      </div>
    </PageShell>
  )
}
