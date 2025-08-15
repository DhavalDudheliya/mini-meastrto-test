import React from "react";
import { type BlocksContent } from "@strapi/blocks-react-renderer";
import BlockRendererClient from "./BlockRendererClient";
import { ChevronLeft } from "lucide-react";
import Image from "next/image";

interface Tag {
  id: number;
  documentId: string;
  name: string;
  slug: string;
}

interface HeaderImage {
  id: number;
  documentId: string;
  url: string;
}

export interface BlogDetailProps {
  title: string;
  content: BlocksContent;
  headerImage?: HeaderImage;
  tags?: Tag[];
}

const BlogPageDetail: React.FC<BlogDetailProps> = ({ title, content, headerImage, tags }) => {
  return (
    <div className="max-w-5xl mx-auto py-6 px-4 pt-[80px]">
      <button
        onClick={() => history.back()}
        className="mb-6 bg-[#FF77C3] rounded-full w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center text-xl font-bold shadow hover:bg-pink-400 transition"
        aria-label="Go back"
      >
        <ChevronLeft />
      </button>
      <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-6 break-words leading-tight">{title}</h1>
      <div className="flex items-center justify-center mb-8 sm:mb-12 max-w-3xl w-full mx-auto relative">
        <div className="hidden sm:block absolute top-0 -left-10 sm:-left-16 rotate-180 z-0">
          <Image src="/images/circles1.svg" alt="Blog sidebar" width={80} height={80} className="w-16 h-16 sm:w-20 sm:h-20 object-cover" />
        </div>
        {headerImage && headerImage.url ? (
          <img
            src={headerImage.url}
            alt={title}
            className="w-full max-w-xs sm:max-w-md md:max-w-lg lg:max-w-2xl h-48 sm:h-56 md:h-72 lg:h-96 object-cover rounded-2xl shadow-lg z-10"
          />
        ) : (
          <div className="w-full max-w-xs sm:max-w-md md:max-w-lg lg:max-w-2xl h-48 sm:h-56 md:h-72 lg:h-96 bg-gray-200 rounded-2xl shadow-lg z-10" />
        )}
      </div>
      <div className="prose prose-sm md:prose-base max-w-none mb-8 text-gray-800 break-words">
        <BlockRendererClient content={content} />
      </div>
      {tags && tags.length > 0 && (
        <div className="flex gap-2 mt-6 flex-wrap relative items-center justify-center sm:justify-start">
          <div className="hidden sm:block absolute bottom-0 -right-10 sm:-right-16 rotate-[30deg] z-0">
            <Image src="/images/circles1.svg" alt="Blog sidebar" width={80} height={80} className="w-16 h-16 sm:w-20 sm:h-20 object-cover" />
          </div>
          {tags.map((tag) => (
            <span key={tag.id} className="bg-[#FF77C3] text-white rounded-lg px-3 sm:px-4 py-1 text-sm sm:text-base font-semibold shadow z-10">
              {tag.name}
            </span>
          ))}
        </div>
      )}
    </div>
  );
};

export default BlogPageDetail;
