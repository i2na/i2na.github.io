import fs from "fs";
import path from "path";
import matter from "gray-matter";
import crypto from "crypto";
import { Post, PostMetadata } from "@/types/post";

const BLOG_DIR = path.join(process.cwd(), "blog");

/**
 * 파일명에서 고정된 짧은 slug 생성
 * 파일명을 해시하여 항상 동일한 짧은 문자열 생성
 * 예: "01_tandem_id_system.md" → "a3f5k2"
 */
function generateSlugFromFileName(fileName: string): string {
  // 파일명 기반 해시 생성 (항상 동일한 결과)
  const hash = crypto.createHash("sha256").update(fileName).digest("hex");
  // 앞 6자리만 사용하여 짧은 slug 생성
  return hash.substring(0, 6);
}

/**
 * 날짜를 쉬운 형식에서 ISO 형식으로 변환
 * 지원 형식:
 * - "2025-01-10" → "2025-01-10T00:00:00.000Z"
 * - "2025-01-10 14:30" → "2025-01-10T14:30:00.000Z"
 * - "2025/01/10" → "2025-01-10T00:00:00.000Z"
 * - ISO 형식은 그대로 통과
 */
function parseDate(dateStr: string): string {
  // 이미 ISO 형식이면 그대로 반환
  if (dateStr.includes("T") && dateStr.includes("Z")) {
    return dateStr;
  }
  
  // "/" → "-" 변환
  let normalized = dateStr.replace(/\//g, "-");
  
  // 시간 포함 여부 확인
  if (normalized.includes(" ")) {
    const [datePart, timePart] = normalized.split(" ");
    return `${datePart}T${timePart}:00.000Z`;
  }
  
  // 날짜만 있는 경우
  return `${normalized}T00:00:00.000Z`;
}

/**
 * 모든 마크다운 파일을 읽어서 createdAt 순으로 정렬
 * temp 폴더는 제외
 */
export function getAllPosts(): Post[] {
  if (!fs.existsSync(BLOG_DIR)) {
    return [];
  }

  const fileNames = fs
    .readdirSync(BLOG_DIR)
    .filter((fileName) => {
      // .md 파일만, temp 폴더와 디렉토리 제외
      const fullPath = path.join(BLOG_DIR, fileName);
      const isFile = fs.statSync(fullPath).isFile();
      return isFile && fileName.endsWith(".md");
    });

  const posts: Post[] = fileNames.map((fileName) => {
    const filePath = path.join(BLOG_DIR, fileName);
    const fileContents = fs.readFileSync(filePath, "utf8");
    const { data, content } = matter(fileContents);

    // 파일명 기반으로 고정된 짧은 slug 생성
    const slug = generateSlugFromFileName(fileName);
    
    // 제목이 없으면 파일명에서 생성
    const title = data.title || fileName.replace(/\.md$/, "").replace(/_/g, " ");
    
    // createdAt 파싱 (쉬운 형식 지원)
    const createdAt = data.createdAt ? parseDate(data.createdAt) : new Date().toISOString();
    
    // summary: frontmatter > 첫 150자
    const summary = data.summary || data.excerpt || extractSummary(content);

    return {
      slug,
      title,
      createdAt,
      summary,
      content,
      fileName,
    };
  });

  // createdAt 기준 내림차순 정렬 (최신순)
  posts.sort((a, b) => {
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
  });

  return posts;
}

/**
 * slug로 특정 포스트를 가져옵니다.
 */
export function getPostBySlug(slug: string): Post | null {
  const posts = getAllPosts();
  return posts.find((post) => post.slug === slug) || null;
}

/**
 * 리스트용 메타데이터만 반환합니다.
 */
export function getAllPostMetadata(): PostMetadata[] {
  const posts = getAllPosts();
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
export function getAllPostSlugs(): string[] {
  const posts = getAllPosts();
  return posts.map((post) => post.slug);
}

/**
 * 컨텐츠에서 요약을 추출합니다.
 */
function extractSummary(content: string): string {
  // 제목(#으로 시작) 제거
  const cleaned = content.replace(/^#+\s+.+$/gm, "").trim();
  
  // 첫 단락 추출
  const firstParagraph = cleaned.split("\n\n")[0] || cleaned;
  
  // 150자로 제한
  return firstParagraph.substring(0, 150) + (firstParagraph.length > 150 ? "..." : "");
}