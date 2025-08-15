import React from "react";
import { type BlocksContent } from "@strapi/blocks-react-renderer";

interface Tag {
  id: number;
  documentId: string;
  name: string;
  slug: string;
}

interface headerImage {
  id: number;
  documentId: string;
  url: string;
}

export interface Blog {
  id: number;
  documentId: string;
  title: string;
  slug: string;
  content: BlocksContent;
  createdAt: string;
  locale: string;
  tags: Tag[];
  headerImage: headerImage;
}

interface BlogListProps {
  blogs: Blog[];
  onBlogClick: (slug: string) => void;
}

const BlogList: React.FC<BlogListProps> = ({ blogs, onBlogClick }) => {
  return (
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {blogs.map((blog, index) => {
        const isEven = index % 2 === 0;

        return (
          <div
            key={blog.id}
            className={`${
              isEven ? "bg-[#EFFBFF]" : "bg-[#FFFDF4]"
            } rounded-2xl shadow-[0_4px_4px_rgba(0,0,0,0.25)] p-3 sm:p-4 flex flex-col justify-between min-h-[220px] sm:min-h-[260px]`}
          >
            <div>
              {blog.headerImage && blog.headerImage.url ? (
                <img src={blog.headerImage.url} alt={blog.title} className="w-full h-28 sm:h-32 object-cover rounded-xl mb-2 sm:mb-3" loading="lazy" />
              ) : (
                <div className="w-full h-28 sm:h-32 bg-gray-200 rounded mb-2 sm:mb-3" />
              )}
              <h3 className="font-bold text-sm sm:text-base mb-1 line-clamp-2">{blog.title}</h3>
            </div>
            <div className="flex items-center justify-between mt-2 flex-wrap gap-2">
              <span className="text-xs text-gray-400 flex flex-col gap-1">
                {blog.tags.map((tag) => (
                  <span key={tag.id} className="text-xs text-gray-400">
                    {tag.name}
                  </span>
                ))}
              </span>
              <button
                className="border-2 sm:border-4 border-[#FFD000] rounded-full px-2 sm:px-3 py-1 text-xs text-gray-700 hover:bg-yellow-100 transition whitespace-nowrap"
                onClick={() => onBlogClick(blog.slug)}
              >
                Read more
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default BlogList;
