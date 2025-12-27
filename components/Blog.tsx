import React from "react";
import { BlogPost } from "../types";
import { Icons } from "./Icons";

// --- Shared Code: BlogPostItem Component ---
interface BlogPostItemProps {
    post: BlogPost;
    theme: "dark" | "light";
    onClick: () => void;
}

export const BlogPostItem: React.FC<BlogPostItemProps> = ({ post, theme, onClick }) => {
    const isDark = theme === "dark";

    return (
        <div
            onClick={onClick}
            className={`
            group relative flex flex-col md:flex-row gap-4 md:gap-6 p-6 md:p-8 
            transition-all duration-500 cursor-pointer rounded-2xl
            ${
                isDark
                    ? "border-b border-white/10 hover:bg-white/[0.05]"
                    : "bg-white border border-gray-100 hover:border-brand-purple/20 hover:shadow-xl hover:shadow-brand-purple/5"
            }
        `}
        >
            {/* Left Column: Date */}
            <div className="md:w-32 shrink-0 pt-1">
                <span
                    className={`font-mono text-xs md:text-sm transition-colors ${
                        isDark
                            ? "text-white/40 group-hover:text-brand-purple"
                            : "text-gray-400 group-hover:text-brand-purple"
                    }`}
                >
                    {post.date}
                </span>
            </div>

            {/* Middle Column: Content */}
            <div className="flex-1">
                <h3
                    className={`text-xl md:text-2xl font-bold mb-2 md:mb-3 transition-colors ${
                        isDark
                            ? "text-white group-hover:text-brand-purple"
                            : "text-gray-900 group-hover:text-brand-purple"
                    }`}
                >
                    {post.title}
                </h3>
                <p
                    className={`text-sm md:text-base leading-relaxed mb-4 md:mb-6 transition-colors ${
                        isDark ? "text-white/60" : "text-gray-500"
                    }`}
                >
                    {post.excerpt}
                </p>

                <div className="flex flex-wrap gap-2">
                    {post.tags.map((tag) => (
                        <span
                            key={tag}
                            className={`
                            px-2 py-1 md:px-3 md:py-1 rounded-full text-[10px] md:text-xs font-semibold uppercase tracking-wider transition-colors border
                            ${
                                isDark
                                    ? "bg-white/5 text-white/70 border-white/10 group-hover:border-brand-purple/30 group-hover:text-brand-purple"
                                    : "bg-gray-50 text-gray-600 border-gray-100 group-hover:bg-brand-purple/10 group-hover:text-brand-purple group-hover:border-brand-purple/20"
                            }
                        `}
                        >
                            {tag}
                        </span>
                    ))}
                </div>
            </div>

            {/* Right Column: Arrow Action */}
            <div className="flex items-center justify-end md:self-center mt-2 md:mt-0">
                <div
                    className={`
                w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center transition-all duration-300 group-hover:scale-110 shadow-sm
                ${
                    isDark
                        ? "border border-white/10 text-white/30 group-hover:bg-brand-purple group-hover:text-white group-hover:border-transparent"
                        : "border border-gray-100 bg-gray-50 text-gray-400 group-hover:bg-brand-black group-hover:text-white group-hover:border-transparent"
                }
             `}
                >
                    <Icons.ArrowRight className="w-4 h-4 md:w-5 md:h-5 -rotate-45 group-hover:rotate-0 transition-transform duration-300" />
                </div>
            </div>
        </div>
    );
};

// --- Shared Blog List Logic ---
interface BlogListProps {
    posts?: BlogPost[];
    theme?: "dark" | "light";
    onPostClick: (post: BlogPost) => void;
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
        <div
            className={`w-full ${className} ${
                theme === "dark" ? "max-w-6xl mx-auto" : "flex flex-col gap-4"
            }`}
        >
            <div className="flex flex-col gap-4">
                {posts.map((post) => (
                    <BlogPostItem
                        key={post.id}
                        post={post}
                        theme={theme}
                        onClick={() => onPostClick(post)}
                    />
                ))}
            </div>

            {onViewArchive && (
                <div className="mt-8 md:mt-12 flex justify-center">
                    <button
                        onClick={onViewArchive}
                        className="group relative flex items-center gap-3 px-6 py-3 md:px-8 md:py-4 rounded-full border border-white/10 bg-white/5 hover:bg-white hover:text-black hover:border-transparent transition-all duration-500 overflow-hidden"
                    >
                        <span className="relative z-10 text-xs md:text-sm font-mono text-white/80 group-hover:text-black transition-colors">
                            View Full Archive
                        </span>
                        <Icons.ArrowRight className="relative z-10 w-3 h-3 md:w-4 md:h-4 text-white/80 group-hover:text-black group-hover:translate-x-1 transition-all" />
                    </button>
                </div>
            )}
        </div>
    );
};
