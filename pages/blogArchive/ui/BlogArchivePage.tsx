import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAllPostMetadata } from "@/entities/blog/api";
import { BlogList } from "@/features/blogList/ui/BlogList";
import { convertToDisplayPost, type BlogPostDisplay } from "@/features/blogList/model/types";
import { Icons } from "@/shared/ui/icons";
import type { BlogPostMetadata } from "@/entities/blog/model/types";
import styles from "./BlogArchivePage.module.scss";

export const BlogArchivePage: React.FC = () => {
    const navigate = useNavigate();
    const [posts, setPosts] = useState<BlogPostMetadata[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadPosts = async () => {
            try {
                const allPosts = await getAllPostMetadata();
                setPosts(allPosts);
            } catch (error) {
                console.error("Failed to load posts:", error);
            } finally {
                setLoading(false);
            }
        };

        loadPosts();
    }, []);

    const handlePostClick = (post: BlogPostDisplay) => {
        navigate(`/blog/${post.slug}`);
    };

    const handleBack = () => {
        navigate("/");
    };

    const displayPosts = posts.map(convertToDisplayPost);

    if (loading) {
        return (
            <div className={styles.loading}>
                <div>Loading...</div>
            </div>
        );
    }

    return (
        <div className={styles.blogArchivePage}>
            <div className={styles.container}>
                <div className={styles.header}>
                    <div className={styles.backButton}>
                        <button onClick={handleBack}>
                            <Icons.ArrowRight />
                        </button>
                    </div>
                    <h1 className={styles.title}>Archive</h1>
                    <p className={styles.subtitle}>
                        Thoughts on Structure, Reliability, and Clarity.
                    </p>
                </div>

                <BlogList posts={displayPosts} theme="light" onPostClick={handlePostClick} />
            </div>
        </div>
    );
};
