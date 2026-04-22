import Link from 'next/link'
import { ArrowRight, Building2, ChevronDown, FileText, Image as ImageIcon, LayoutGrid, Tag, User } from 'lucide-react'
import { NavbarShell } from '@/components/shared/navbar-shell'
import { Footer } from '@/components/shared/footer'
import { TaskListClient } from '@/components/tasks/task-list-client'
import { SchemaJsonLd } from '@/components/seo/schema-jsonld'
import { fetchTaskPosts } from '@/lib/task-data'
import { SITE_CONFIG, getTaskConfig, type TaskKey } from '@/lib/site-config'
import { CATEGORY_OPTIONS, normalizeCategory } from '@/lib/categories'
import { taskIntroCopy } from '@/config/site.content'
import { getFactoryState } from '@/design/factory/get-factory-state'
import { TASK_LIST_PAGE_OVERRIDE_ENABLED, TaskListPageOverride } from '@/overrides/task-list-page'

const taskIcons: Record<TaskKey, any> = {
  listing: Building2,
  article: FileText,
  image: ImageIcon,
  profile: User,
  classified: Tag,
  sbm: LayoutGrid,
  social: LayoutGrid,
  pdf: FileText,
  org: Building2,
  comment: FileText,
}

const variantShells = {
  'listing-directory': 'bg-[#F5E6D3]',
  'listing-showcase': 'bg-[#F5E6D3]',
  'article-editorial': 'bg-[radial-gradient(circle_at_top_left,rgba(251,191,36,0.08),transparent_20%),linear-gradient(180deg,#fff8ef_0%,#ffffff_100%)]',
  'article-journal': 'bg-[linear-gradient(180deg,#fffdf9_0%,#f7f1ea_100%)]',
  'image-masonry': 'bg-[linear-gradient(180deg,#09101d_0%,#111c2f_100%)] text-white',
  'image-portfolio': 'bg-[linear-gradient(180deg,#07111f_0%,#13203a_100%)] text-white',
  'profile-creator': 'bg-[linear-gradient(180deg,#0a1120_0%,#101c34_100%)] text-white',
  'profile-business': 'bg-[linear-gradient(180deg,#f6fbff_0%,#ffffff_100%)]',
  'classified-bulletin': 'bg-[linear-gradient(180deg,#edf3e4_0%,#ffffff_100%)]',
  'classified-market': 'bg-[linear-gradient(180deg,#f4f6ef_0%,#ffffff_100%)]',
  'sbm-curation': 'bg-[linear-gradient(180deg,#fff7ee_0%,#ffffff_100%)]',
  'sbm-library': 'bg-[linear-gradient(180deg,#f7f8fc_0%,#ffffff_100%)]',
} as const

export async function TaskListPage({ task, category }: { task: TaskKey; category?: string }) {
  if (TASK_LIST_PAGE_OVERRIDE_ENABLED) {
    return await TaskListPageOverride({ task, category })
  }

  const taskConfig = getTaskConfig(task)
  const posts = await fetchTaskPosts(task, 30)
  const normalizedCategory = category ? normalizeCategory(category) : 'all'
  const intro = taskIntroCopy[task]
  const baseUrl = SITE_CONFIG.baseUrl.replace(/\/$/, '')
  const schemaItems = posts.slice(0, 10).map((post, index) => ({
    '@type': 'ListItem',
    position: index + 1,
    url: `${baseUrl}${taskConfig?.route || '/posts'}/${post.slug}`,
    name: post.title,
  }))
  const { recipe } = getFactoryState()
  const layoutKey = recipe.taskLayouts[task as keyof typeof recipe.taskLayouts] || `${task}-${task === 'listing' ? 'directory' : 'editorial'}`
  const shellClass = variantShells[layoutKey as keyof typeof variantShells] || 'bg-background'
  const Icon = taskIcons[task] || LayoutGrid

  const isDark = ['image-masonry', 'image-portfolio', 'profile-creator'].includes(layoutKey)
  const isListingLayout = layoutKey === 'listing-directory' || layoutKey === 'listing-showcase'
  const ui = isDark
    ? {
        muted: 'text-slate-300',
        panel: 'border border-white/10 bg-white/6',
        soft: 'border border-white/10 bg-white/5',
        input: 'border-white/10 bg-white/6 text-white',
        button: 'bg-white text-slate-950 hover:bg-slate-200',
      }
    : layoutKey.startsWith('article') || layoutKey.startsWith('sbm')
      ? {
          muted: 'text-[#72594a]',
          panel: 'border border-[#dbc6b6] bg-white/90',
          soft: 'border border-[#dbc6b6] bg-[#fff8ef]',
          input: 'border border-[#dbc6b6] bg-white text-[#2f1d16]',
          button: 'bg-[#2f1d16] text-[#fff4e4] hover:bg-[#452920]',
        }
      : isListingLayout
        ? {
            muted: 'text-[#4B2E76]/70',
            panel: 'border border-[#4B2E76]/10 bg-white shadow-[0_20px_50px_rgba(75,46,118,0.08)]',
            soft: 'border border-[#4B2E76]/10 bg-white/90',
            input: 'h-10 rounded-full border border-[#4B2E76]/15 bg-white pl-3 pr-8 text-sm text-[#4B2E76] outline-none',
            button: 'rounded-full bg-[#4B2E76] px-5 text-sm font-semibold text-white hover:bg-[#3d2560]',
          }
        : {
            muted: 'text-slate-600',
            panel: 'border border-slate-200 bg-white',
            soft: 'border border-slate-200 bg-slate-50',
            input: 'border border-slate-200 bg-white text-slate-950',
            button: 'bg-slate-950 text-white hover:bg-slate-800',
          }

  return (
    <div className={`min-h-screen ${shellClass}`}>
      <NavbarShell />
      <main className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        {task === 'listing' ? (
          <SchemaJsonLd
            data={[
              {
                '@context': 'https://schema.org',
                '@type': 'ItemList',
                name: 'Listings',
                itemListElement: schemaItems,
              },
              {
                '@context': 'https://schema.org',
                '@type': 'LocalBusiness',
                name: SITE_CONFIG.name,
                url: `${baseUrl}/listings`,
                areaServed: 'Worldwide',
              },
            ]}
          />
        ) : null}
        {task === 'article' || task === 'classified' ? (
          <SchemaJsonLd
            data={{
              '@context': 'https://schema.org',
              '@type': 'CollectionPage',
              name: `${taskConfig?.label || task} | ${SITE_CONFIG.name}`,
              url: `${baseUrl}${taskConfig?.route || ''}`,
              hasPart: schemaItems,
            }}
          />
        ) : null}

        {layoutKey === 'listing-directory' || layoutKey === 'listing-showcase' ? (
          <section className="mb-10 grid gap-8 font-sans lg:mb-12 lg:grid-cols-[1.05fr_0.95fr] lg:items-end">
            <div className={`rounded-[2rem] p-7 sm:p-8 ${ui.panel}`}>
              <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.22em] text-[#4B2E76]/55">
                <Icon className="h-4 w-4 text-[#4B2E76]" /> {taskConfig?.label || 'Listings'}
              </div>
              <h1 className="mt-4 text-3xl font-bold tracking-[-0.04em] text-[#4B2E76] sm:text-4xl">Most loved listings</h1>
              <p className={`mt-4 max-w-2xl text-sm leading-7 ${ui.muted}`}>
                {taskConfig?.description} Browse a soft grid, compare entries, and open a listing when you want the full story—designed to feel as calm as the home page.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Link href={taskConfig?.route || '#'} className={`inline-flex items-center gap-2 rounded-full border-2 border-[#4B2E76] bg-white px-5 py-3 text-sm font-semibold text-[#4B2E76] transition hover:bg-[#4B2E76] hover:text-white`}>
                  Scroll results <ArrowRight className="h-4 w-4" />
                </Link>
                <Link href="/search" className={`inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm font-semibold text-white ${ui.button}`}>
                  Open search
                </Link>
              </div>
            </div>
            <form
              className={`grid gap-3 rounded-[2rem] p-6 sm:p-7 ${ui.soft}`}
              action={taskConfig?.route || '/listings'}
              method="get"
            >
              <div>
                <label className={`text-[10px] font-bold uppercase tracking-[0.2em] ${ui.muted}`}>Primary filter</label>
                <div className="relative mt-2">
                  <select
                    name="category"
                    defaultValue={normalizedCategory}
                    className={`w-full appearance-none pr-8 ${ui.input}`}
                    aria-label="Category"
                  >
                    <option value="all">All categories</option>
                    {CATEGORY_OPTIONS.map((item) => (
                      <option key={item.slug} value={item.slug}>
                        {item.name}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="pointer-events-none absolute right-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-[#4B2E76]/50" />
                </div>
              </div>
              <button type="submit" className={`h-11 w-full rounded-full text-sm font-semibold ${ui.button}`}>
                Refresh grid
              </button>
            </form>
          </section>
        ) : null}

        {layoutKey === 'article-editorial' || layoutKey === 'article-journal' ? (
          <section className="mb-12 grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
            <div>
              <p className={`text-xs uppercase tracking-[0.3em] ${ui.muted}`}>{taskConfig?.label || task}</p>
              <h1 className="mt-3 max-w-4xl text-5xl font-semibold tracking-[-0.05em] text-foreground">{taskConfig?.description || 'Latest posts'}</h1>
              <p className={`mt-5 max-w-2xl text-sm leading-8 ${ui.muted}`}>This reading surface uses slower pacing, stronger typographic hierarchy, and more breathing room so long-form content feels intentional rather than squeezed into a generic feed.</p>
            </div>
            <div className={`rounded-[2rem] p-6 ${ui.panel}`}>
              <p className={`text-xs font-semibold uppercase tracking-[0.24em] ${ui.muted}`}>Reading note</p>
              <p className={`mt-4 text-sm leading-7 ${ui.muted}`}>Use category filters to jump between topics without collapsing the page into the same repeated card rhythm used by other task types.</p>
              <form className="mt-5 flex items-center gap-3" action={taskConfig?.route || '#'}>
                <select name="category" defaultValue={normalizedCategory} className={`h-11 flex-1 rounded-xl px-3 text-sm ${ui.input}`}>
                  <option value="all">All categories</option>
                  {CATEGORY_OPTIONS.map((item) => (
                    <option key={item.slug} value={item.slug}>{item.name}</option>
                  ))}
                </select>
                <button type="submit" className={`h-11 rounded-xl px-4 text-sm font-medium ${ui.button}`}>Apply</button>
              </form>
            </div>
          </section>
        ) : null}

        {layoutKey === 'image-masonry' || layoutKey === 'image-portfolio' ? (
          <section className="mb-12 grid gap-6 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
            <div>
              <div className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.22em] ${ui.soft}`}>
                <Icon className="h-3.5 w-3.5" /> Visual feed
              </div>
              <h1 className="mt-5 text-5xl font-semibold tracking-[-0.05em]">{taskConfig?.description || 'Latest posts'}</h1>
              <p className={`mt-5 max-w-2xl text-sm leading-8 ${ui.muted}`}>This surface leans into stronger imagery, larger modules, and more expressive spacing so visual content feels materially different from reading and directory pages.</p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className={`min-h-[220px] rounded-[2rem] ${ui.panel}`} />
              <div className={`min-h-[220px] rounded-[2rem] ${ui.soft}`} />
              <div className={`col-span-2 min-h-[120px] rounded-[2rem] ${ui.panel}`} />
            </div>
          </section>
        ) : null}

        {layoutKey === 'profile-creator' || layoutKey === 'profile-business' ? (
          <section className={`mb-12 rounded-[2.2rem] p-8 shadow-[0_24px_70px_rgba(15,23,42,0.1)] ${ui.panel}`}>
            <div className="grid gap-6 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
              <div className={`min-h-[240px] rounded-[2rem] ${ui.soft}`} />
              <div>
                <p className={`text-xs uppercase tracking-[0.3em] ${ui.muted}`}>{taskConfig?.label || task}</p>
                <h1 className="mt-3 text-4xl font-semibold tracking-[-0.05em] text-foreground">Profiles with stronger identity, trust, and reputation cues.</h1>
                <p className={`mt-5 max-w-2xl text-sm leading-8 ${ui.muted}`}>This layout prioritizes the person or business surface first, then lets the feed continue below without borrowing the same visual logic used by articles or listings.</p>
              </div>
            </div>
          </section>
        ) : null}

        {layoutKey === 'classified-bulletin' || layoutKey === 'classified-market' ? (
          <section className="mb-12 grid gap-4 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
            <div className={`rounded-[1.8rem] p-6 ${ui.panel}`}>
              <p className={`text-xs uppercase tracking-[0.3em] ${ui.muted}`}>{taskConfig?.label || task}</p>
              <h1 className="mt-3 text-4xl font-semibold tracking-[-0.05em] text-foreground">Fast-moving notices, offers, and responses in a compact board format.</h1>
            </div>
            <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
              {['Quick to scan', 'Shorter response path', 'Clearer urgency cues'].map((item) => (
                <div key={item} className={`rounded-[1.5rem] p-5 ${ui.soft}`}>
                  <p className="text-sm font-semibold">{item}</p>
                </div>
              ))}
            </div>
          </section>
        ) : null}

        {layoutKey === 'sbm-curation' || layoutKey === 'sbm-library' ? (
          <section className="mb-12 grid gap-6 lg:grid-cols-[1.15fr_0.85fr] lg:items-start">
            <div>
              <p className={`text-xs uppercase tracking-[0.3em] ${ui.muted}`}>{taskConfig?.label || task}</p>
              <h1 className="mt-3 text-4xl font-semibold tracking-[-0.05em] text-foreground">Curated resources arranged more like collections than a generic post feed.</h1>
              <p className={`mt-5 max-w-2xl text-sm leading-8 ${ui.muted}`}>Bookmarks, saved resources, and reference-style items need calmer grouping and lighter metadata. This variant gives them that separation.</p>
            </div>
            <div className={`rounded-[2rem] p-6 ${ui.panel}`}>
              <p className={`text-xs uppercase tracking-[0.24em] ${ui.muted}`}>Collection filter</p>
              <form className="mt-4 flex items-center gap-3" action={taskConfig?.route || '#'}>
                <select name="category" defaultValue={normalizedCategory} className={`h-11 flex-1 rounded-xl px-3 text-sm ${ui.input}`}>
                  <option value="all">All categories</option>
                  {CATEGORY_OPTIONS.map((item) => (
                    <option key={item.slug} value={item.slug}>{item.name}</option>
                  ))}
                </select>
                <button type="submit" className={`h-11 rounded-xl px-4 text-sm font-medium ${ui.button}`}>Apply</button>
              </form>
            </div>
          </section>
        ) : null}

        {isListingLayout ? (
          <section className="mb-8 border-y border-[#4B2E76]/10 bg-white">
            <div className="flex flex-col gap-4 py-3.5 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between sm:gap-6 sm:px-0">
              <form className="flex flex-1 flex-col gap-2 sm:min-w-[320px] sm:flex-row sm:items-end sm:gap-2" action={taskConfig?.route || '/listings'} method="get">
                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#4B2E76] sm:mr-1 sm:pt-2">Filter:</span>
                <div className="grid flex-1 grid-cols-1 gap-2 min-[500px]:grid-cols-3 sm:max-w-3xl">
                  <div className="relative">
                    <span className="text-[9px] font-semibold uppercase tracking-wider text-[#4B2E76]/45">Category</span>
                    <div className="relative mt-1">
                      <select
                        name="category"
                        defaultValue={normalizedCategory}
                        className="h-10 w-full min-w-0 appearance-none rounded-full border border-[#4B2E76]/12 bg-white pl-3 pr-7 text-xs font-medium text-[#4B2E76] outline-none"
                        aria-label="Filter by category"
                      >
                        <option value="all">All</option>
                        {CATEGORY_OPTIONS.map((item) => (
                          <option key={item.slug} value={item.slug}>
                            {item.name}
                          </option>
                        ))}
                      </select>
                      <ChevronDown className="pointer-events-none absolute right-2 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-[#4B2E76]/50" />
                    </div>
                  </div>
                  <div>
                    <span className="text-[9px] font-semibold uppercase tracking-wider text-[#4B2E76]/45">Availability</span>
                    <div className="relative mt-1">
                      <select
                        className="h-10 w-full cursor-not-allowed appearance-none rounded-full border border-[#4B2E76]/10 bg-slate-50/80 pl-3 pr-7 text-xs text-[#4B2E76]/40"
                        disabled
                        title="Narrower filters coming soon"
                        aria-disabled="true"
                      >
                        <option>All hours</option>
                      </select>
                      <ChevronDown className="pointer-events-none absolute right-2 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-[#4B2E76]/30" />
                    </div>
                  </div>
                  <div>
                    <span className="text-[9px] font-semibold uppercase tracking-wider text-[#4B2E76]/45">Type</span>
                    <div className="relative mt-1">
                      <select
                        className="h-10 w-full cursor-not-allowed appearance-none rounded-full border border-[#4B2E76]/10 bg-slate-50/80 pl-3 pr-7 text-xs text-[#4B2E76]/40"
                        disabled
                        title="Extra filters soon"
                        aria-disabled="true"
                      >
                        <option>All types</option>
                      </select>
                      <ChevronDown className="pointer-events-none absolute right-2 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-[#4B2E76]/30" />
                    </div>
                  </div>
                </div>
                <button type="submit" className="h-10 shrink-0 rounded-full border border-[#4B2E76] bg-[#4B2E76] px-4 text-xs font-bold uppercase tracking-wider text-white sm:ml-1">
                  Apply
                </button>
              </form>
              <div className="flex items-center justify-between gap-3 border-t border-[#4B2E76]/5 pt-3 sm:border-0 sm:pt-0">
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#4B2E76]/50">
                  Sort: <span className="text-[#4B2E76]">Featured</span>
                </p>
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#4B2E76]">
                  {posts.length} {posts.length === 1 ? 'result' : 'results'}
                </p>
              </div>
            </div>
          </section>
        ) : null}

        {intro ? (
          <section className={`mb-12 rounded-[2rem] p-6 shadow-[0_18px_50px_rgba(15,23,42,0.06)] sm:p-8 ${isListingLayout ? 'border border-[#4B2E76]/10' : ''} ${ui.panel}`}>
            <h2 className={`text-2xl font-semibold ${isListingLayout ? 'text-[#4B2E76]' : 'text-foreground'}`}>{intro.title}</h2>
            {intro.paragraphs.map((paragraph) => (
              <p key={paragraph.slice(0, 40)} className={`mt-4 text-sm leading-7 ${ui.muted}`}>{paragraph}</p>
            ))}
            <div className="mt-4 flex flex-wrap gap-4 text-sm">
              {intro.links.map((link) => (
                <a key={link.href} href={link.href} className={`font-semibold hover:underline ${isListingLayout ? 'text-[#4B2E76]' : 'text-foreground'}`}>
                  {link.label}
                </a>
              ))}
            </div>
          </section>
        ) : null}

        <TaskListClient task={task} initialPosts={posts} category={normalizedCategory} />
      </main>
      <Footer />
    </div>
  )
}
