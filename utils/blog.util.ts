import matter from "gray-matter";
import { Buffer } from "buffer";

// 브라우저에서 Buffer를 전역으로 사용할 수 있도록 설정
if (typeof window !== "undefined" && !window.Buffer) {
    (window as any).Buffer = Buffer;
}

export interface BlogPost {
    slug: string;
    title: string;
    createdAt: string;
    summary: string;
    content: string;
    fileName: string;
}

export interface BlogPostMetadata {
    slug: string;
    title: string;
    createdAt: string;
    summary: string;
    fileName: string;
}

/**
 * 파일명에서 고정된 짧은 slug 생성
 * 파일명을 해시하여 항상 동일한 짧은 문자열 생성
 * @example "01_tandem_id_system.md" → "a3f5k2"
 */
export async function generateSlugFromFileName(fileName: string): Promise<string> {
    // Web Crypto API를 사용하여 브라우저 호환 해시 생성
    const encoder = new TextEncoder();
    const data = encoder.encode(fileName);
    const hashBuffer = await crypto.subtle.digest("SHA-256", data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray.map(b => b.toString(16).padStart(2, "0")).join("");
    return hashHex.substring(0, 6);
}

/**
 * 날짜를 쉬운 형식에서 ISO 형식으로 변환
 * @example
 * - "2025-01-10" → "2025-01-10T00:00:00.000Z"
 * - "2025-01-10 14:30" → "2025-01-10T14:30:00.000Z"
 * - "2025/01/10" → "2025-01-10T00:00:00.000Z"
 */
export function parseDate(dateStr: string): string {
    if (dateStr.includes("T") && dateStr.includes("Z")) {
        return dateStr;
    }

    let normalized = dateStr.replace(/\//g, "-");

    if (normalized.includes(" ")) {
        const [datePart, timePart] = normalized.split(" ");
        return `${datePart}T${timePart}:00.000Z`;
    }

    return `${normalized}T00:00:00.000Z`;
}

/**
 * 컨텐츠에서 요약을 추출합니다.
 * @param content 마크다운 컨텐츠
 * @param maxLength 최대 길이 (기본: 150자)
 */
export function extractSummary(content: string, maxLength: number = 150): string {
    const cleaned = content.replace(/^#+\s+.+$/gm, "").trim();
    const firstParagraph = cleaned.split("\n\n")[0] || cleaned;
    return (
        firstParagraph.substring(0, maxLength) + (firstParagraph.length > maxLength ? "..." : "")
    );
}

/**
 * 날짜를 포맷팅합니다.
 * @param dateStr ISO 날짜 문자열
 * @param locale 로케일 (기본: "en-US")
 */
export function formatDate(
    dateStr: string,
    locale: string = "en-US",
    options?: Intl.DateTimeFormatOptions
): string {
    return new Date(dateStr).toLocaleDateString(locale, {
        year: "numeric",
        month: "short",
        day: "2-digit",
        ...options,
    });
}

/**
 * 모든 마크다운 파일을 읽어서 createdAt 순으로 정렬
 */
export async function getAllPosts(): Promise<BlogPost[]> {
    // Vite의 import.meta.glob을 사용하여 blog 폴더의 모든 .md 파일을 동적으로 import
    // Vite의 import.meta.glob은 프로젝트 루트 기준으로 작동
    // @ts-ignore - Vite의 import.meta.glob 타입
    const modules = import.meta.glob("/blog/*.md", { 
        query: "?raw",
        import: "default",
        eager: true 
    }) as Record<string, string>;

    const posts: BlogPost[] = [];

    for (const [path, content] of Object.entries(modules)) {
        // temp 폴더는 제외
        if (path.includes("/temp/")) {
            continue;
        }

        // 파일명 추출
        const fileName = path.split("/").pop() || "";
        if (!fileName.endsWith(".md")) {
            continue;
        }

        // frontmatter 파싱
        const { data, content: markdownContent } = matter(content);

        const slug = await generateSlugFromFileName(fileName);
        const title = data.title || fileName.replace(/\.md$/, "").replace(/_/g, " ");
        const createdAt = data.createdAt ? parseDate(data.createdAt) : new Date().toISOString();
        const summary = data.summary || data.excerpt || extractSummary(markdownContent);

        posts.push({
            slug,
            title,
            createdAt,
            summary,
            content: markdownContent,
            fileName,
        });
    }

    // createdAt 기준 내림차순 정렬 (최신순)
    posts.sort((a, b) => {
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });

    return posts;
}

/**
 * slug로 특정 포스트를 가져옵니다.
 */
export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
    const posts = await getAllPosts();
    return posts.find((post) => post.slug === slug) || null;
}

/**
 * 리스트용 메타데이터만 반환합니다.
 */
export async function getAllPostMetadata(): Promise<BlogPostMetadata[]> {
    const posts = await getAllPosts();
    return posts.map(({ slug, title, createdAt, summary, fileName }) => ({
        slug,
        title,
        createdAt,
        summary,
        fileName,
    }));
}

/**
 * 모든 포스트 slug를 반환합니다 (동적 라우팅용).
 */
export async function getAllPostSlugs(): Promise<string[]> {
    const posts = await getAllPosts();
    return posts.map((post) => post.slug);
}
