"use client"

import { useState } from "react"
import Image from "next/image"
import { Newspaper } from "lucide-react"
import { PageShell } from "@/components/shared/page-shell"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { useToast } from "@/components/ui/use-toast"
import { L } from "@/components/shared/listing-ui"
import { mockPressAssets, mockPressCoverage } from "@/data/mock-data"

export default function PressPage() {
  const { toast } = useToast()
  const [activeAssetId, setActiveAssetId] = useState<string | null>(null)
  const activeAsset = mockPressAssets.find((asset) => asset.id === activeAssetId)

  return (
    <PageShell
      title="Press & media"
      description="Brand assets, product language, and recent coverage—kept in the same calm purple and cream tone as the public site."
    >
      <section className={`mb-10 ${L.heroBand}`}>
        <div className="flex items-center gap-2 text-[#4B2E76]">
          <Newspaper className="h-5 w-5" />
          <span className="text-xs font-bold uppercase tracking-widest text-[#4B2E76]/60">For journalists</span>
        </div>
        <p className="mt-3 max-w-3xl text-sm leading-7 text-[#4B2E76]/75">
          {`Use the kit for accurate logos and screenshots. When you describe the product, lead with the listing and discovery experience—it is what most visitors see first.`}
        </p>
      </section>

      <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="space-y-4">
          <h2 className="text-lg font-bold text-[#4B2E76]">Press kit</h2>
          {mockPressAssets.map((asset) => (
            <div key={asset.id} className="flex flex-col gap-3 rounded-2xl border border-[#4B2E76]/10 bg-white p-4 shadow-sm sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-sm font-semibold text-[#4B2E76]">{asset.title}</p>
                <p className="text-xs text-[#4B2E76]/60">{asset.description}</p>
              </div>
              <div className="flex flex-wrap items-center gap-2">
                <Badge className="bg-[#4B2E76]/10 text-[#4B2E76] hover:bg-[#4B2E76]/10">{asset.fileType}</Badge>
                <Button size="sm" variant="outline" className="rounded-full border-[#4B2E76]/25" onClick={() => setActiveAssetId(asset.id)}>
                  Preview
                </Button>
                <Button
                  size="sm"
                  className="rounded-full bg-[#4B2E76] hover:bg-[#3d2560]"
                  onClick={() => toast({ title: "Download started", description: `${asset.title} is downloading.` })}
                >
                  Download
                </Button>
              </div>
            </div>
          ))}
        </div>
        <div className="space-y-3">
          <h2 className="text-lg font-bold text-[#4B2E76]">In the news</h2>
          {mockPressCoverage.map((item) => (
            <div key={item.id} className="rounded-2xl border border-[#4B2E76]/8 bg-white/90 p-5 transition hover:border-[#4B2E76]/20">
              <div className="text-[10px] font-bold uppercase tracking-widest text-[#4B2E76]/50">{item.outlet}</div>
              <p className="mt-2 text-sm font-medium text-[#4B2E76]">{item.headline}</p>
              <p className="mt-2 text-xs text-[#4B2E76]/55">{item.date}</p>
            </div>
          ))}
        </div>
      </div>

      <Dialog open={Boolean(activeAsset)} onOpenChange={() => setActiveAssetId(null)}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle className="text-[#4B2E76]">{activeAsset?.title}</DialogTitle>
          </DialogHeader>
          {activeAsset?.previewUrl && (
            <div className="relative aspect-video overflow-hidden rounded-2xl border border-[#4B2E76]/10 bg-[#4B2E76]/5">
              <Image src={activeAsset.previewUrl} alt={activeAsset.title} fill className="object-cover" />
            </div>
          )}
          <p className="text-sm text-[#4B2E76]/70">{activeAsset?.description}</p>
          <DialogFooter>
            <Button variant="outline" className="rounded-full border-[#4B2E76]/25" onClick={() => setActiveAssetId(null)}>
              Close
            </Button>
            <Button
              className="rounded-full bg-[#4B2E76]"
              onClick={() => toast({ title: "Download started", description: `${activeAsset?.title} is downloading.` })}
            >
              Download {activeAsset?.fileType}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </PageShell>
  )
}
