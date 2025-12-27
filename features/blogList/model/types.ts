import type { BlogPostMetadata } from "@/entities/blog/model/types";
import { formatDate } from "@/shared/lib/date";

export interface BlogPostDisplay extends BlogPostMetadata {
    date: string;
    tags: string[];
}

export function convertToDisplayPost(metadata: BlogPostMetadata): BlogPostDisplay {
    return {
        ...metadata,
        date: formatDate(metadata.createdAt, "ko-KR", {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
        })
            .replace(/\./g, ".")
            .replace(/\s/g, ""),
        tags: ["Technical"],
    };
}
