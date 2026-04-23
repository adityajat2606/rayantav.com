import Link from 'next/link'
import { BookOpen, ListOrdered, MessageCircle } from 'lucide-react'
import { PageShell } from '@/components/shared/page-shell'
import { Button } from '@/components/ui/button'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { L } from '@/components/shared/listing-ui'

const listingFaqs = [
  {
    id: 'faq-l-1',
    question: 'How do I publish a listing?',
    answer: 'Create an account, open Dashboard → New listing, and fill in title, category, photos, and contact options. Save as draft until you are ready to go live.',
  },
  {
    id: 'faq-l-2',
    question: 'Why is my listing not in search?',
    answer: 'Search looks at title, description, and tags. Make sure you have added a short description and the right category. It can take a few minutes for new content to appear in results.',
  },
  {
    id: 'faq-l-3',
    question: 'How do I report incorrect information?',
    answer: 'Use Contact and choose the listing topic, or report from the listing detail page when that action is available. Include a link to the entry.',
  },
] as const

const topics = [
  {
    icon: ListOrdered,
    title: 'Your first listing',
    text: 'Add photos, a clear title, and the basics: category, service area, and how people should contact you. Save as draft, then publish when you are ready.',
  },
  {
    icon: BookOpen,
    title: 'Search & filters',
    text: 'From the Listings page, use category and availability filters. On Search, combine keywords with tags in titles and descriptions for the best match.',
  },
  {
    icon: MessageCircle,
    title: 'Account & saved items',
    text: 'Sign in to sync saves across sessions on this device. For dashboard work—edits, drafts, and performance—use the account menu.',
  },
]

export default function HelpPage() {
  return (
    <PageShell
      title="Help center"
      description="Practical answers for browsing, listing, and managing your presence—without a maze of product lanes."
      actions={
        <Button asChild className="rounded-full bg-[#4B2E76] text-white hover:bg-[#3d2560]">
          <Link href="/contact">Contact support</Link>
        </Button>
      }
    >
      <div className="space-y-10">
        <section className="grid gap-4 md:grid-cols-3">
          {topics.map((t) => {
            const Icon = t.icon
            return (
              <div key={t.title} className={L.card}>
                <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-2xl bg-[#4B2E76]/10 text-[#4B2E76]">
                  <Icon className="h-5 w-5" />
                </div>
                <h2 className="text-lg font-bold text-[#4B2E76]">{t.title}</h2>
                <p className="mt-2 text-sm leading-relaxed text-[#4B2E76]/70">{t.text}</p>
              </div>
            )
          })}
        </section>

        <div className="grid gap-8 lg:grid-cols-[1fr_1.15fr]">
          <div className="flex flex-col justify-center rounded-[2rem] border border-dashed border-[#4B2E76]/20 bg-[#4B2E76]/[0.04] p-8">
            <p className={L.label}>Still stuck?</p>
            <h3 className="mt-2 text-xl font-bold text-[#4B2E76]">We answer listing questions first.</h3>
            <p className="mt-3 text-sm text-[#4B2E76]/70">
              If something looks wrong in the grid or a detail will not save, include a link or screenshot in your message so we can reproduce
              it quickly.
            </p>
            <Button asChild variant="outline" className="mt-6 w-fit rounded-full border-[#4B2E76] text-[#4B2E76]">
              <Link href="/contact">Open contact form</Link>
            </Button>
          </div>
          <div className={L.card}>
            <h3 className="text-lg font-bold text-[#4B2E76]">Frequently asked</h3>
            <Accordion type="single" collapsible className="mt-4">
              {listingFaqs.map((faq) => (
                <AccordionItem key={faq.id} value={faq.id} className="border-[#4B2E76]/10">
                  <AccordionTrigger className="text-left text-sm font-medium text-[#4B2E76] hover:no-underline">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-sm leading-relaxed text-[#4B2E76]/70">{faq.answer}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </div>
    </PageShell>
  )
}
