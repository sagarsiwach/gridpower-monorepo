import { useState } from "react";
import type { MetaFunction } from "react-router";
import { Link } from "react-router";
import {
  Button,
  SectionLabel,
  SectionDivider,
  DotGrid,
  EmptyState,
} from "@gridpower/ui";

export const meta: MetaFunction = () => [
  { title: "Blog — GridPower" },
  {
    name: "description",
    content:
      "Technical writing from the GridPower team. Specs, deployments, and open energy infrastructure.",
  },
  { property: "og:title", content: "Blog — GridPower" },
  {
    property: "og:description",
    content:
      "Technical writing from the GridPower team. Specs, deployments, and open energy infrastructure.",
  },
  { property: "og:url", content: "/blog" },
  { property: "og:image", content: "/og-default.svg" },
  { name: "twitter:card", content: "summary_large_image" },
];

const categories = ["All", "Energy", "Charging", "Platform", "Deployments"];

type Category = (typeof categories)[number];

// Placeholder post list (all "Coming soon") — kept for category scaffold parity with prototype
const upcomingPosts = [
  {
    cat: "Energy",
    title:
      "Why residential storage is the missing link in India's solar story",
  },
  {
    cat: "Charging",
    title: "OCPP 2.0.1: what operators need to know before buying hardware",
  },
  {
    cat: "Platform",
    title:
      "GridOS architecture: how we built one API for three hardware categories",
  },
  {
    cat: "Deployments",
    title: "GIDC Verna: our first commercial charging deployment",
  },
  {
    cat: "Energy",
    title: "LFP vs NMC: which chemistry makes sense for Indian conditions",
  },
  {
    cat: "Charging",
    title: "Destination charging ROI: a real-world model for hoteliers",
  },
];

export default function BlogIndexPage() {
  const [activeCategory, setActiveCategory] = useState<Category>("All");

  const filtered =
    activeCategory === "All"
      ? upcomingPosts
      : upcomingPosts.filter((p) => p.cat === activeCategory);

  return (
    <div className="bg-background text-foreground">
      {/* ── Hero ─────────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-sand-1 pb-14 pt-18">
        <DotGrid className="absolute inset-0" color="var(--sand-5)" />
        <div className="relative mx-auto max-w-7xl px-6">
          <SectionLabel className="mb-4">BLOG</SectionLabel>
          <h1 className="font-heading text-display tracking-tight text-sand-12 leading-[1.05] mb-3">
            GridPower Field Notes.
          </h1>
          <p className="text-lg text-sand-11">
            Technical writing from the team. No fluff — specs, deployments, and
            open energy infrastructure.
          </p>
        </div>
      </section>

      <SectionDivider />

      {/* ── Category nav + posts ──────────────────────────────── */}
      <section className="bg-sand-1 py-12 pb-24">
        <div className="mx-auto max-w-7xl px-6">
          {/* Category filter */}
          <div className="flex flex-wrap gap-2 mb-10">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={[
                  "rounded-full border px-4 py-1.5 text-sm transition-all",
                  activeCategory === cat
                    ? "border-sand-12 bg-sand-12 text-sand-1"
                    : "border-sand-6 bg-transparent text-sand-11 hover:border-sand-8",
                ].join(" ")}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Empty state — no posts published yet */}
          <div className="rounded-xl border border-sand-6 bg-sand-2 py-24">
            <EmptyState
              title="First post coming soon — Q2 2026"
              description={`Technical writing from the GridPower team on ${
                activeCategory === "All"
                  ? "energy storage, EV charging, and open infrastructure"
                  : activeCategory.toLowerCase()
              }. Check back in Q2 2026.`}
              icon={
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
                  <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
                </svg>
              }
            />
          </div>

          {/* Upcoming topics — visible teaser */}
          {filtered.length > 0 && (
            <div className="mt-16">
              <SectionLabel variant="neutral" className="mb-6 text-sand-8">
                UPCOMING ARTICLES
              </SectionLabel>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {filtered.map((post) => (
                  <div
                    key={post.title}
                    className="rounded-xl border border-sand-6 bg-sand-1 overflow-hidden opacity-60"
                  >
                    {/* Placeholder cover */}
                    <div className="relative h-36 bg-sand-3 flex items-center justify-center overflow-hidden">
                      <DotGrid
                        className="absolute inset-0"
                        color="var(--sand-5)"
                       
                      />
                      <span className="relative font-mono text-[9px] uppercase tracking-[0.08em] text-sand-8">
                        {post.cat} · COVER
                      </span>
                    </div>
                    <div className="px-6 py-5">
                      <span className="inline-block rounded-full border border-sand-5 bg-sand-3 px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-[0.06em] text-grid-red mb-3">
                        {post.cat}
                      </span>
                      <p className="font-heading text-sm font-semibold text-sand-12 leading-snug mb-4">
                        {post.title}
                      </p>
                      <p className="font-mono text-[10px] tracking-wide text-sand-8">
                        Coming soon · — read
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Newsletter CTA */}
          <div className="mt-20 rounded-xl bg-sand-12 px-8 py-12 relative overflow-hidden text-center">
            <DotGrid
              className="absolute inset-0"
              color="rgba(58,57,55,0.55)"
             
            />
            <div className="relative">
              <SectionLabel variant="neutral" className="mb-4">
                STAY UPDATED
              </SectionLabel>
              <h2 className="font-heading text-h1 font-semibold text-dark-12 tracking-tight mb-3">
                Get notified when we publish.
              </h2>
              <p className="text-base text-dark-11 mb-8 max-w-md mx-auto">
                Energy storage, EV charging, and open infrastructure — straight
                to your inbox. No spam.
              </p>
              <Button asChild variant="secondary">
                <Link to="/signup">Join the waitlist</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
