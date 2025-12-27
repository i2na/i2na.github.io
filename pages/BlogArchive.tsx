import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BlogPostMetadata, getAllPostMetadata, formatDate } from '../utils/blog.util';
import { BlogList } from '../components/Blog';
import { Icons } from '../components/Icons';

export const BlogArchive: React.FC = () => {
  const navigate = useNavigate();
  const [posts, setPosts] = useState<BlogPostMetadata[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadPosts = async () => {
      try {
        const allPosts = await getAllPostMetadata();
        setPosts(allPosts);
      } catch (error) {
        console.error('Failed to load posts:', error);
      } finally {
        setLoading(false);
      }
    };

    loadPosts();
  }, []);

  const handlePostClick = (post: BlogPostMetadata) => {
    navigate(`/blog/${post.slug}`);
  };

  const handleBack = () => {
    navigate('/');
  };

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
      <div className="min-h-screen bg-white pt-20 md:pt-24 pb-12 px-4 md:px-6 flex items-center justify-center">
        <div className="text-gray-500">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white pt-20 md:pt-24 pb-12 px-4 md:px-6">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="flex flex-col gap-4 mb-10 md:mb-16">
          <div className="flex items-center gap-2 mb-2 md:mb-4">
            <button
              onClick={handleBack}
              className="p-2 rounded-full hover:bg-gray-100 transition-colors group"
            >
              <Icons.ArrowRight className="w-5 h-5 rotate-180 text-gray-500 group-hover:text-black" />
            </button>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-gray-900">Archive</h1>
          <p className="text-gray-500 text-base md:text-lg">Thoughts on Structure, Reliability, and Clarity.</p>
        </div>

        {/* Use Shared BlogList with 'light' theme */}
        <BlogList
          posts={blogPosts}
          theme="light"
          onPostClick={(post) => {
            const metadata = posts.find((p) => p.slug === post.id);
            if (metadata) {
              handlePostClick(metadata);
            }
          }}
        />
      </div>
    </div>
  );
};

