import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';
import { getPostBySlug, formatDate } from '../utils/blog.util';
import { BlogPost as BlogPostType } from '../utils/blog.util';
import { Icons } from '../components/Icons';
import 'highlight.js/styles/github-dark.css';

export const BlogPostPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [post, setPost] = useState<BlogPostType | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadPost = async () => {
      if (!slug) {
        setLoading(false);
        return;
      }

      try {
        const postData = await getPostBySlug(slug);
        if (!postData) {
          navigate('/blog');
          return;
        }
        setPost(postData);
      } catch (error) {
        console.error('Failed to load post:', error);
        navigate('/blog');
      } finally {
        setLoading(false);
      }
    };

    loadPost();
  }, [slug, navigate]);

  const handleBack = () => {
    navigate('/blog');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white pt-20 md:pt-24 pb-12 px-4 md:px-6 flex items-center justify-center">
        <div className="text-gray-500">Loading...</div>
      </div>
    );
  }

  if (!post) {
    return null;
  }

  return (
    <div className="min-h-screen bg-white pt-20 md:pt-24 pb-12 px-4 md:px-6">
      <div className="max-w-3xl mx-auto">
        <button
          onClick={handleBack}
          className="group flex items-center gap-2 text-gray-500 hover:text-black mb-8 md:mb-12 transition-colors"
        >
          <div className="p-2 rounded-full bg-gray-100 group-hover:bg-brand-purple group-hover:text-white transition-colors">
            <Icons.ArrowRight className="w-4 h-4 rotate-180" />
          </div>
          <span className="font-mono text-xs md:text-sm">Back to Archive</span>
        </button>

        <article className="prose prose-base md:prose-lg max-w-none font-sans">
          <div className="mb-8 md:mb-10 border-b border-gray-200 pb-8 md:pb-10">
            <div className="flex gap-4 mb-4 md:mb-6">
              <span className="px-3 py-1 rounded-full text-[10px] md:text-xs font-mono border border-brand-purple/30 text-brand-purple bg-brand-purple/10">
                Technical
              </span>
            </div>
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-4 md:mb-6 text-gray-900 leading-tight">
              {post.title}
            </h1>
            <div className="flex items-center gap-4 text-gray-500 font-mono text-xs md:text-sm">
              <span>{formatDate(post.createdAt, 'ko-KR', {
                year: 'numeric',
                month: '2-digit',
                day: '2-digit',
              }).replace(/\./g, '.').replace(/\s/g, '')}</span>
              <span>•</span>
              <span>읽는 시간 5분</span>
            </div>
          </div>

          <div className="markdown-content">
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              rehypePlugins={[rehypeHighlight]}
              components={{
                a: ({ node, ...props }) => (
                  <a {...props} target="_blank" rel="noopener noreferrer" className="text-brand-purple hover:underline" />
                ),
                h1: ({ node, ...props }) => (
                  <h1 {...props} className="text-3xl md:text-5xl font-bold mb-6 md:mb-8 mt-4 text-gray-900 leading-tight" />
                ),
                h2: ({ node, ...props }) => (
                  <h2 {...props} className="text-xl md:text-3xl font-bold mb-3 md:mb-4 mt-6 md:mt-8 text-brand-purple" />
                ),
                h3: ({ node, ...props }) => (
                  <h3 {...props} className="text-lg md:text-2xl font-bold mb-2 md:mb-3 mt-4 md:mt-6 text-gray-800" />
                ),
                p: ({ node, ...props }) => (
                  <p {...props} className="text-base md:text-lg text-gray-700 leading-relaxed mb-4" />
                ),
                ul: ({ node, ...props }) => (
                  <ul {...props} className="list-disc ml-6 mb-4 space-y-2" />
                ),
                ol: ({ node, ...props }) => (
                  <ol {...props} className="list-decimal ml-6 mb-4 space-y-2" />
                ),
                li: ({ node, ...props }) => (
                  <li {...props} className="text-base md:text-lg text-gray-700" />
                ),
                blockquote: ({ node, ...props }) => (
                  <blockquote
                    {...props}
                    className="border-l-4 border-brand-green pl-4 italic text-gray-600 my-6 md:my-8 text-base md:text-lg bg-gray-50 p-4 rounded-r-lg"
                  />
                ),
                code: ({ node, className, ...props }: any) => {
                  const isInline = !className;
                  return isInline ? (
                    <code
                      {...props}
                      className="bg-gray-100 text-brand-purple px-1.5 py-0.5 rounded text-sm font-mono"
                    />
                  ) : (
                    <code {...props} className={className} />
                  );
                },
                pre: ({ node, ...props }) => (
                  <pre
                    {...props}
                    className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto mb-4"
                  />
                ),
                table: ({ node, ...props }) => (
                  <div className="overflow-x-auto mb-4">
                    <table {...props} className="min-w-full border-collapse border border-gray-300" />
                  </div>
                ),
                th: ({ node, ...props }) => (
                  <th {...props} className="border border-gray-300 px-4 py-2 bg-gray-100 font-bold text-left" />
                ),
                td: ({ node, ...props }) => (
                  <td {...props} className="border border-gray-300 px-4 py-2" />
                ),
              }}
            >
              {post.content}
            </ReactMarkdown>
          </div>
        </article>

        <div className="mt-16 md:mt-20 pt-10 border-t border-gray-200 flex flex-col md:flex-row justify-between items-center text-gray-400 text-xs md:text-sm font-mono gap-4">
          <span>Thank you for reading.</span>
          <div className="flex gap-4">
            <Icons.Twitter className="w-5 h-5 hover:text-black cursor-pointer transition-colors" />
            <Icons.Linkedin className="w-5 h-5 hover:text-black cursor-pointer transition-colors" />
          </div>
        </div>
      </div>
    </div>
  );
};

