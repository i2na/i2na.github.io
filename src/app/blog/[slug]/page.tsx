import { notFound } from "next/navigation";
import Link from "next/link";
import { getPostBySlug, getAllPostSlugs } from "@/lib/posts";
import MarkdownRenderer from "@/components/MarkdownRenderer";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const slugs = getAllPostSlugs();
  return slugs.map((slug) => ({
    slug,
  }));
}

export default async function BlogPost({ params }: PageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const currentYear = new Date().toLocaleDateString("ko-KR", {
    year: "numeric",
    timeZone: "Asia/Seoul",
  });

  return (
    <div className="min-h-screen flex flex-col bg-[var(--color-bg)]">
      <main className="flex-1 flex items-start justify-center p-6">
        <div className="w-full max-w-3xl">
          <nav className="mb-8">
            <Link
              href="/"
              className="text-sm font-mono inline-flex items-center gap-2 text-[var(--color-text-secondary)] hover:text-[var(--color-accent)] transition-colors"
            >
              <span className="font-bold">$</span>
              <span>cd ..</span>
            </Link>
          </nav>

          <article>
            <header className="mb-4 pb-4 border-b border-[var(--color-border)]">
              <div className="flex items-center gap-3 mb-3">
                <time className="text-xs font-mono text-[var(--color-text-secondary)] tracking-wide">
                  [
                  {new Date(post.createdAt)
                    .toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "short",
                      day: "2-digit",
                    })
                    .toUpperCase()}
                  ]
                </time>
                <span className="text-[var(--color-prompt)] text-xs font-semibold">
                  LOG
                </span>
              </div>
              <h1 className="text-3xl font-medium leading-tight text-[var(--color-text)]">
                {post.title}
              </h1>
            </header>

            <div className="markdown-content">
              <MarkdownRenderer content={post.content} />
            </div>
          </article>
        </div>
      </main>

      <footer className="py-4 border-t border-[var(--color-border)]">
        <div className="max-w-3xl mx-auto px-6">
          <div className="font-mono text-xs text-[var(--color-text-secondary)] space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-[var(--color-prompt)] font-bold">$</span>
              <span>exit</span>
            </div>
            <p className="ml-5">Connection closed. © {currentYear} yena</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
