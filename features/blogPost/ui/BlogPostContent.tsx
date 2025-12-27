import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import { formatDate } from "@/shared/lib/date";
import type { BlogPost } from "@/entities/blog/model/types";
import { Icons } from "@/shared/ui/icons";
import styles from "./BlogPostContent.module.scss";
import "highlight.js/styles/github-dark.css";

interface BlogPostContentProps {
    post: BlogPost;
    onBack: () => void;
}

export const BlogPostContent: React.FC<BlogPostContentProps> = ({ post, onBack }) => {
    return (
        <div className={styles.blogPostContent}>
            <div className={styles.container}>
                <button onClick={onBack} className={styles.backButton}>
                    <div className={styles.iconWrapper}>
                        <Icons.ArrowRight />
                    </div>
                    <span className={styles.backText}>Back to Archive</span>
                </button>

                <article className={styles.article}>
                    <div className={styles.header}>
                        <div className={styles.tag}>
                            <span>Technical</span>
                        </div>
                        <h1 className={styles.title}>{post.title}</h1>
                        <div className={styles.meta}>
                            <span>
                                {formatDate(post.createdAt, "ko-KR", {
                                    year: "numeric",
                                    month: "2-digit",
                                    day: "2-digit",
                                })
                                    .replace(/\./g, ".")
                                    .replace(/\s/g, "")}
                            </span>
                            <span>•</span>
                            <span>읽는 시간 5분</span>
                        </div>
                    </div>

                    <div className={styles.markdownContent}>
                        <ReactMarkdown
                            remarkPlugins={[remarkGfm]}
                            rehypePlugins={[rehypeHighlight]}
                            components={{
                                a: ({ node, ...props }) => (
                                    <a {...props} target="_blank" rel="noopener noreferrer" />
                                ),
                                table: ({ node, ...props }) => (
                                    <div className={styles.tableWrapper}>
                                        <table {...props} />
                                    </div>
                                ),
                            }}
                        >
                            {post.content}
                        </ReactMarkdown>
                    </div>
                </article>

                <div className={styles.footer}>
                    <span>Thank you for reading.</span>
                    <div className={styles.socialLinks}>
                        <Icons.Twitter />
                        <Icons.Linkedin />
                    </div>
                </div>
            </div>
        </div>
    );
};
