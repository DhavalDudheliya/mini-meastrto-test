import { Search } from "lucide-react";
import React from "react";

interface BlogSearchProps {
  value: string;
  onChange: (v: string) => void;
}

const BlogSearch: React.FC<BlogSearchProps> = ({ value, onChange }) => (
  <div className="flex justify-center mb-6 sm:mb-8 px-2">
    <div className="relative w-full max-w-md">
      <input
        type="text"
        placeholder="Search"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full border-2 border-[#FF77C3] rounded-full px-4 sm:px-6 py-2 focus:outline-none focus:ring-2 focus:ring-pink-300 text-sm"
      />
      <span className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center text-gray-400">
        <Search className="w-5 h-5"/>
      </span>
    </div>
  </div>
);

export default BlogSearch;
