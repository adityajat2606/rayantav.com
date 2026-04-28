import Link from 'next/link'
import { ArrowRight, Globe, Mail, MapPin, Phone, Tag } from 'lucide-react'
import { ContentImage } from '@/components/shared/content-image'
import { SchemaJsonLd } from '@/components/seo/schema-jsonld'
import { TaskPostCard } from '@/components/shared/task-post-card'
import type { SitePost } from '@/lib/site-connector'
import type { TaskKey } from '@/lib/site-config'

const htmlToText = (value?: string | null) =>
  (value || '')
    .replace(/<style[^>]*>[\s\S]*?<\/style>/gi, ' ')
    .replace(/<script[^>]*>[\s\S]*?<\/script>/gi, ' ')
    .replace(/<\/?[^>]+>/g, ' ')
    .replace(/&nbsp;/gi, ' ')
    .replace(/&amp;/gi, '&')
    .replace(/&lt;/gi, '<')
    .replace(/&gt;/gi, '>')
    .replace(/&quot;/gi, '"')
    .replace(/&#39;/gi, "'")
    .replace(/\s+/g, ' ')
    .trim()

export function DirectoryTaskDetailPage({
  task,
  taskLabel,
  taskRoute,
  post,
  description,
  category,
  images,
  mapEmbedUrl,
  related,
}: {
  task: TaskKey
  taskLabel: string
  taskRoute: string
  post: SitePost
  description: string
  category: string
  images: string[]
  mapEmbedUrl: string | null
  related: SitePost[]
}) {
  const content = post.content && typeof post.content === 'object' ? (post.content as Record<string, unknown>) : {}
  const location = typeof content.address === 'string' ? content.address : typeof content.location === 'string' ? content.location : ''
  const website = typeof content.website === 'string' ? content.website : ''
  const phone = typeof content.phone === 'string' ? content.phone : ''
  const email = typeof content.email === 'string' ? content.email : ''
  const highlights = Array.isArray(content.highlights) ? content.highlights.filter((item): item is string => typeof item === 'string') : []
  const heroImage = images[0]
  const readableDescription = htmlToText(description) || 'Details coming soon.'

  const schemaPayload = {
    '@context': 'https://schema.org',
    '@type': task === 'profile' ? 'Organization' : 'LocalBusiness',
    name: post.title,
    description,
    image: heroImage,
    url: `${taskRoute}/${post.slug}`,
    address: location || undefined,
    telephone: phone || undefined,
    email: email || undefined,
  }

  return (
    <div className="min-h-screen bg-[#f3f3f3] text-[#3a3a3a]">
      <SchemaJsonLd data={schemaPayload} />
      <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
        <Link href={taskRoute} className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-[#6b6b6b] hover:text-[#2d2d2d]">
          Back to {taskLabel}
        </Link>

        <section className="rounded-3xl border border-[#d9d9d9] bg-[#f3f3f3] p-6 sm:p-8">
          <div className="grid gap-7 lg:grid-cols-[220px_1fr] lg:items-start">
            <div className="mx-auto h-[190px] w-[190px] overflow-hidden rounded-full border border-[#cfcfcf] bg-[#d9d9d9]">
              <div className="relative h-full w-full">
                <ContentImage src={heroImage} alt={post.title} fill className="object-cover" />
              </div>
            </div>

            <div>
              <h1 className="text-4xl font-semibold tracking-[-0.02em] text-[#2f2f2f]">{post.title}</h1>
              <div className="mt-3 h-px w-44 bg-[#cfcfcf]" />

              <div className="mt-4 grid gap-2 text-base text-[#505050] sm:text-lg">
                {phone ? (
                  <div className="flex items-start gap-3">
                    <Phone className="mt-0.5 h-4 w-4 text-[#7d7d7d]" />
                    <span>{phone}</span>
                  </div>
                ) : null}
                {location ? (
                  <div className="flex items-start gap-3">
                    <MapPin className="mt-0.5 h-4 w-4 text-[#7d7d7d]" />
                    <span>{location}</span>
                  </div>
                ) : null}
                {website ? (
                  <div className="flex items-start gap-3">
                    <Globe className="mt-0.5 h-4 w-4 text-[#7d7d7d]" />
                    <a href={website} target="_blank" rel="noreferrer" className="break-all text-[#4f6f92] hover:text-[#2f4c6c]">
                      {website}
                    </a>
                  </div>
                ) : null}
                {email ? (
                  <div className="flex items-start gap-3">
                    <Mail className="mt-0.5 h-4 w-4 text-[#7d7d7d]" />
                    <span>{email}</span>
                  </div>
                ) : null}
              </div>

              <div className="mt-4 h-px w-28 bg-[#cfcfcf]" />
              <div className="mt-4">
                {website ? (
                  <a href={website} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-sm uppercase tracking-[0.12em] text-[#6d7f8f] hover:text-[#4f6172]">
                    Claim now <ArrowRight className="h-4 w-4" />
                  </a>
                ) : (
                  <Link href={taskRoute} className="inline-flex items-center gap-2 text-sm uppercase tracking-[0.12em] text-[#6d7f8f] hover:text-[#4f6172]">
                    Claim now <ArrowRight className="h-4 w-4" />
                  </Link>
                )}
              </div>
            </div>
          </div>

          <div className="mt-7">
            <p className="text-[22px] leading-10 text-[#454545]">{readableDescription}</p>
            {highlights.length ? (
              <div className="mt-6 grid gap-3 md:grid-cols-2">
                {highlights.slice(0, 4).map((item) => (
                  <div key={item} className="rounded-xl border border-[#d7d7d7] bg-[#efefef] px-4 py-3 text-sm text-[#5a5a5a]">
                    {item}
                  </div>
                ))}
              </div>
            ) : null}
          </div>

          <div className="mt-8 overflow-hidden border border-[#cbcbcb] bg-[#e9e9e9]">
            {mapEmbedUrl ? (
              <iframe
                src={mapEmbedUrl}
                title={`${post.title} map`}
                className="h-[420px] w-full border-0"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            ) : (
              <div className="flex h-[420px] items-center justify-center text-sm text-[#747474]">Map preview unavailable for this listing.</div>
            )}
          </div>
        </section>

        {related.length ? (
          <section className="mt-14">
            <div className="flex items-end justify-between gap-4 border-b border-[#d7d7d7] pb-6">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#737373]">Related surfaces</p>
                <h2 className="mt-3 text-3xl font-semibold tracking-[-0.04em] text-[#2f2f2f]">Keep browsing nearby matches.</h2>
              </div>
              <span className="inline-flex items-center gap-2 rounded-full border border-[#d7d7d7] bg-white px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-[#6f6f6f]">
                <Tag className="h-3.5 w-3.5" /> {category || taskLabel}
              </span>
            </div>
            <div className="mt-8 grid gap-6 lg:grid-cols-3">
              {related.map((item) => (
                <TaskPostCard key={item.id} post={item} href={`${taskRoute}/${item.slug}`} taskKey={task} />
              ))}
            </div>
          </section>
        ) : null}
      </main>
    </div>
  )
}
