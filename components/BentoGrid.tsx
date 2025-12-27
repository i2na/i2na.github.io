import React, { useEffect, useState } from 'react';
import { BlogPostMetadata, getAllPostMetadata, formatDate } from '../utils/blog.util';
import { BlogList } from './Blog';

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
        // 최신 4개만 표시
        setPosts(allPosts.slice(0, 4));
      } catch (error) {
        console.error('Failed to load posts:', error);
      } finally {
        setLoading(false);
      }
    };

    loadPosts();
  }, []);

  // BlogPost 형식으로 변환
  const blogPosts = posts.map((post) => ({
    id: post.slug,
    title: post.title,
    excerpt: post.summary,
    date: formatDate(post.createdAt, 'ko-KR', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    }).replace(/\./g, '.').replace(/\s/g, ''),
    readTime: '읽는 시간 5분',
    tags: ['Technical'],
    content: '',
  }));

  if (loading) {
    return (
      <div className="w-full max-w-5xl mx-auto px-4">
        <div className="text-white/50 text-center py-8">Loading...</div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-5xl mx-auto px-4">
      {/* 
        Uses the shared BlogList in 'dark' mode for the landing page.
      */}
      <BlogList 
        posts={blogPosts}
        onPostClick={(post) => onPostClick(post.id)} 
        onViewArchive={onViewArchive} 
        theme="dark"
      />
    </div>
  );
};