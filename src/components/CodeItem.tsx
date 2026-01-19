import type { CodePost } from '../App';

interface CodeItemProps {
  post: CodePost;
  onSelectPost: (post: CodePost) => void;
  isSelected: boolean;
}

export function CodeItem({ post, onSelectPost, isSelected }: CodeItemProps) {
  return (
    <div
      onClick={() => onSelectPost(post)}
      className={`p-4 cursor-pointer transition-colors ${
        isSelected 
          ? 'bg-[#37373d] border-l-4 border-[#007acc]' 
          : 'hover:bg-[#2a2d2e] border-l-4 border-transparent'
      }`}
    >
      {/* 제목 */}
      <h3 className="text-white font-mono mb-2 truncate">
        {post.title}
      </h3>

      {/* 설명 */}
      {post.description && (
        <p className="text-sm text-gray-400 mb-3 line-clamp-2">
          {post.description}
        </p>
      )}

      {/* 하단 정보 */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="px-2 py-1 bg-[#3e3e42] rounded text-xs font-mono text-gray-300">
            {post.language}
          </span>
          <span className="text-xs text-gray-500 font-mono">
            {post.createdAt}
          </span>
        </div>
        <div className="text-[#4ec9b0] font-mono">
          {post.price.toLocaleString()}원
        </div>
      </div>

      {/* 코드 미리보기 (첫 줄만) */}
      <div className="mt-3 bg-[#1e1e1e] rounded px-3 py-2 border border-[#3e3e42]">
        <code className="text-xs font-mono text-[#ce9178] line-clamp-1">
          {post.code.split('\n')[0]}...
        </code>
      </div>
    </div>
  );
}
