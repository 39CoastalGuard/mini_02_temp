import type { CodePost } from "../App";

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
          ? "bg-[#37373d] border-l-4 border-[#007acc]"
          : "hover:bg-[#2a2d2e] border-l-4 border-transparent"
      }`}
    >
      {/* 제목 */}
      <h3 className="text-white font-mono mb-2 truncate">{post.title}</h3>

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

      {/* 코드 미리보기 전체 컨테이너: 높이를 100px로 고정 */}
      <div className="mt-3 bg-[#1e1e1e] rounded px-3 pt-2 pb-1 border border-[#3e3e42] relative h-[100px] overflow-hidden group">
        {/* 1. 실제 코드 영역: 상위 2줄만 추출 */}
        <pre className="text-[11px] font-mono text-[#ce9178]/70 leading-[1.5] whitespace-pre-wrap overflow-hidden">
          <code>
            {post.code.split("\n").slice(0, 2).join("\n")}
            {"\n"}
            {post.code.split("\n").length > 2 && "..."}
          </code>
        </pre>

        {/* 2. 가림막 + 안내 문구: 하단에 고정 */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#1e1e1e] via-[#1e1e1e]/80 to-transparent flex flex-col items-center justify-end pb-2">
          {/* 점 세개 표시 */}
          <div className="text-gray-600 tracking-widest text-[10px] mb-1 font-bold">
            . . .
          </div>

          {/* 안내 문구 (핑크 포인트나 파란색 중 선택) */}
          <div className="bg-[#1e1e1e] px-2 py-0.5 rounded-full border border-[#007acc]/30 shadow-lg">
            <span className="text-[9px] text-[#007acc] font-bold">
              결제 후 확인 가능
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
