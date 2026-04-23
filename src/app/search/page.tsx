import Link from "next/link";
import { PageShell } from "@/components/shared/page-shell";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Sparkles } from "lucide-react";
import { L } from "@/components/shared/listing-ui";
import { fetchSiteFeed } from "@/lib/site-connector";
import { buildPostUrl, getPostTaskKey } from "@/lib/task-data";
import { getMockPostsForTask } from "@/lib/mock-posts";
import { SITE_CONFIG } from "@/lib/site-config";
import { TaskPostCard } from "@/components/shared/task-post-card";

export const revalidate = 3;

const matchText = (value: string, query: string) => value.toLowerCase().includes(query);

const stripHtml = (value: string) => value.replace(/<[^>]*>/g, " ");

const compactText = (value: unknown) => {
  if (typeof value !== "string") return "";
  return stripHtml(value).replace(/\s+/g, " ").trim().toLowerCase();
};

export default async function SearchPage({
  searchParams,
}: {
  searchParams?: Promise<{ q?: string; category?: string; task?: string; master?: string }>;
}) {
  const resolved = (await searchParams) || {};
  const query = (resolved.q || "").trim();
  const normalized = query.toLowerCase();
  const category = (resolved.category || "").trim().toLowerCase();
  const task = (resolved.task || "").trim().toLowerCase();
  const useMaster = resolved.master !== "0";
  const feed = await fetchSiteFeed(
    useMaster ? 1000 : 300,
    useMaster ? { fresh: true, category: category || undefined, task: task || undefined } : undefined
  );
  const posts = feed?.posts?.length
    ? feed.posts
    : useMaster
      ? []
      : SITE_CONFIG.tasks.flatMap((t) => getMockPostsForTask(t.key));

  const filtered = posts.filter((post) => {
    const content = post.content && typeof post.content === "object" ? post.content : {};
    const typeText = compactText((content as { type?: string }).type);
    if (typeText === "comment") return false;
    const description = compactText((content as { description?: string }).description);
    const body = compactText((content as { body?: string }).body);
    const excerpt = compactText((content as { excerpt?: string }).excerpt);
    const categoryText = compactText((content as { category?: string }).category);
    const tags = Array.isArray(post.tags) ? post.tags.join(" ") : "";
    const tagsText = compactText(tags);
    const derivedCategory = categoryText || tagsText;
    if (category && !derivedCategory.includes(category)) return false;
    if (task && typeText && typeText !== task) return false;
    if (!normalized.length) return true;
    return (
      matchText(compactText(post.title || ""), normalized) ||
      matchText(compactText(post.summary || ""), normalized) ||
      matchText(description, normalized) ||
      matchText(body, normalized) ||
      matchText(excerpt, normalized) ||
      matchText(tagsText, normalized)
    );
  });

  const results = normalized.length > 0 ? filtered : filtered.slice(0, 24);

  return (
    <PageShell
      title="Search the catalog"
      description={
        query
          ? `Showing matches for “${query}” across categories and listing types.`
          : "Search titles, descriptions, and tags—then open a card to read the full entry."
      }
      actions={
        <form action="/search" className="flex w-full flex-col gap-2 sm:w-auto sm:flex-row">
          <input type="hidden" name="master" value="1" />
          {category ? <input type="hidden" name="category" value={category} /> : null}
          {task ? <input type="hidden" name="task" value={task} /> : null}
          <div className="relative w-full sm:w-80">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#4B2E76]/40" />
            <Input
              name="q"
              defaultValue={query}
              placeholder="Try a service, place, or keyword…"
              className="h-11 rounded-full border-[#4B2E76]/15 pl-9"
            />
          </div>
          <Button type="submit" className="h-11 rounded-full bg-[#4B2E76] text-white hover:bg-[#3d2560]">
            Search
          </Button>
        </form>
      }
    >
      <section className={`mb-10 ${L.heroBand}`}>
        <div className="flex flex-wrap items-center gap-2 text-[#4B2E76]">
          <Sparkles className="h-4 w-4" />
          <span className="text-xs font-semibold uppercase tracking-widest text-[#4B2E76]/70">Tip</span>
        </div>
        <p className="mt-3 max-w-3xl text-sm leading-7 text-[#4B2E76]/75">
          Use specific words from a listing (neighborhood, service name, or category). Filter down from the main{" "}
          <Link href="/listings" className="font-semibold text-[#4B2E76] underline decoration-[#4B2E76]/30">
            Listings
          </Link>{" "}
          page if you want a guided grid first.
        </p>
      </section>

      {results.length ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {results.map((post) => {
            const t = getPostTaskKey(post);
            const href = t ? buildPostUrl(t, post.slug) : `/posts/${post.slug}`;
            return <TaskPostCard key={post.id} post={post} href={href} taskKey={t} />;
          })}
        </div>
      ) : (
        <div className="rounded-2xl border border-dashed border-[#4B2E76]/25 bg-white/60 px-6 py-14 text-center">
          <p className="text-lg font-semibold text-[#4B2E76]">No matches yet</p>
          <p className="mt-2 text-sm text-[#4B2E76]/65">
            Broaden your terms or browse the full listings grid to explore what is live.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-2">
            <Button asChild variant="outline" className="rounded-full border-[#4B2E76]/25 text-[#4B2E76]">
              <Link href="/listings">View all listings</Link>
            </Button>
            <Button asChild className="rounded-full bg-[#4B2E76] hover:bg-[#3d2560]">
              <Link href="/contact">Ask the team</Link>
            </Button>
          </div>
        </div>
      )}
    </PageShell>
  );
}
