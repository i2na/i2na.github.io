import React from "react";
import { Icons } from "@/shared/ui/icons";
import { BlogPostItem } from "./BlogPostItem";
import type { BlogPostDisplay } from "../model/types";
import styles from "./BlogList.module.scss";
import cn from "classnames";

interface BlogListProps {
    posts?: BlogPostDisplay[];
    theme?: "dark" | "light";
    onPostClick: (post: BlogPostDisplay) => void;
    className?: string;
    onViewArchive?: () => void;
}

export const BlogList: React.FC<BlogListProps> = ({
    posts = [],
    theme = "dark",
    onPostClick,
    className,
    onViewArchive,
}) => {
    return (
        <div className={cn(styles.blogList, styles[theme], className)}>
            <div className={styles.postsContainer}>
                {posts.map((post) => (
                    <BlogPostItem
                        key={post.slug}
                        post={post}
                        theme={theme}
                        onClick={() => onPostClick(post)}
                    />
                ))}
            </div>

            {onViewArchive && (
                <div className={styles.archiveButton}>
                    <button onClick={onViewArchive}>
                        <span>View Full Archive</span>
                        <Icons.ArrowRight />
                    </button>
                </div>
            )}
        </div>
    );
};
