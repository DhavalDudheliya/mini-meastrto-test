import React from "react";

export interface Tag {
  id: number;
  documentId: string;
  name: string;
  slug: string;
}

interface TagListProps {
  tags: Tag[];
  selectedTag?: string;
  onTagClick: (slug: string) => void;
}

const TagList: React.FC<TagListProps> = ({ tags, selectedTag, onTagClick }) => {
  return (
    <div className="bg-[#E5F6FF] rounded-2xl p-4 sm:p-6 min-w-[180px] sm:min-w-[220px] md:min-w-[240px] shadow-[0_4px_4px_rgba(0,0,0,0.25)]">
      <h3 className="font-bold text-base sm:text-lg mb-3 sm:mb-4 text-center">KEY TAGS</h3>
      <div className="flex flex-col gap-2 sm:gap-3">
        {tags.map((tag) => (
          <button
            key={tag.id}
            className={`rounded-xl py-2 px-3 sm:px-4 text-xs sm:text-sm border border-transparent hover:border-blue-300 transition text-left ${
              selectedTag === tag.slug ? "bg-blue-200 font-bold" : "bg-white"
            }`}
            onClick={() => onTagClick(tag.slug)}
          >
            {tag.name}
          </button>
        ))}
      </div>
    </div>
  );
};

export default TagList;
