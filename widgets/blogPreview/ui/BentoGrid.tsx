import React, { useEffect, useState } from "react";
import { getAllPostMetadata } from "@/entities/blog/api";
import { BlogList } from "@/features/blogList/ui/BlogList";
import { convertToDisplayPost } from "@/features/blogList/model/types";
import type { BlogPostMetadata } from "@/entities/blog/model/types";
import styles from "./BentoGrid.module.scss";

interface BentoGridProps {
    onPostClick: (slug: string) => void;
    onViewArchive: () => void;
}

export const BentoGrid: React.FC<BentoGridProps> = ({ onPostClick, onViewArchive }) => {
    const [posts, setPosts] = useState<BlogPostMetadata[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadPosts = async () => {
            try {
                const allPosts = await getAllPostMetadata();
                setPosts(allPosts.slice(0, 4));
            } catch (error) {
                console.error("Failed to load posts:", error);
            } finally {
                setLoading(false);
            }
        };

        loadPosts();
    }, []);

    const displayPosts = posts.map(convertToDisplayPost);

    if (loading) {
        return (
            <div className={styles.bentoGrid}>
                <div className={styles.loading}>Loading...</div>
            </div>
        );
    }

    return (
        <div className={styles.bentoGrid}>
            <BlogList
                posts={displayPosts}
                onPostClick={(post) => onPostClick(post.slug)}
                onViewArchive={onViewArchive}
                theme="dark"
            />
        </div>
    );
};
