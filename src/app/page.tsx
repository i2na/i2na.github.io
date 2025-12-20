import Link from "next/link";
import { getAllPostMetadata } from "@/lib/posts";

export default function HomePage() {
  const posts = getAllPostMetadata();
  const currentYear = new Date().toLocaleDateString("ko-KR", {
    year: "numeric",
    timeZone: "Asia/Seoul",
  });

  return (
    <div className="min-h-screen flex flex-col bg-[var(--color-bg)]">
      <main className="flex-1 flex items-start justify-center p-6">
        <div className="w-full max-w-3xl">
          <header className="mb-8">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[var(--color-prompt)] font-bold text-base">
                $
              </span>
              <h1 className="text-xl font-normal text-[var(--color-text)]">
                cat /var/log/yena.log
              </h1>
            </div>
            <div className="text-xs text-[var(--color-text-secondary)] leading-relaxed ml-5">
              dev logs & technical writings
            </div>
          </header>

          <section>
            {posts.length === 0 ? (
              <p className="text-base text-[var(--color-text-secondary)] ml-8">
                No entries found.
              </p>
            ) : (
              <div>
                {posts.map((post) => (
                  <article
                    key={post.slug}
                    className="border-t border-[var(--color-border)] first:border-t-0 pt-2 pb-3"
                  >
                    <Link href={`/blog/${post.slug}`} className="block group">
                      <div className="mb-1">
                        <time className="text-[0.65rem] font-mono text-[var(--color-text-secondary)] tracking-wide">
                          {new Date(post.createdAt)
                            .toLocaleDateString("en-US", {
                              year: "numeric",
                              month: "short",
                              day: "2-digit",
                            })
                            .toUpperCase()}
                        </time>
                      </div>
                      <div>
                        <div className="flex items-baseline gap-2">
                          <span className="text-[var(--color-prompt)] text-xs">
                            ›
                          </span>
                          <h2 className="text-base font-medium text-[var(--color-text)] group-hover:text-[var(--color-accent)] transition-colors leading-snug">
                            {post.title}
                          </h2>
                        </div>
                      </div>
                    </Link>
                  </article>
                ))}
              </div>
            )}
          </section>
        </div>
      </main>

      <footer className="py-4 border-t border-[var(--color-border)]">
        <div className="max-w-3xl mx-auto px-6">
          <div className="font-mono text-xs text-[var(--color-text-secondary)] space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-[var(--color-prompt)] font-bold">$</span>
              <span>exit</span>
            </div>
            <p className="ml-4">Connection closed. © {currentYear} yena</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
