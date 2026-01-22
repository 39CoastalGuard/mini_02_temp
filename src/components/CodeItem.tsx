import type { CodePost } from '../App';

interface CodeItemProps {
  post: CodePost;
  onSelectPost: (post: CodePost) => void;
  isSelected: boolean;
}

export function CodeItem({ post, onSelectPost, isSelected }: CodeItemProps) {
  const isSoldOut = !!post.isSoldOut;

  return (
    <div
      onClick={() => !isSoldOut && onSelectPost(post)}
      className={`p-4 transition-all relative border-b border-[#3e3e42] ${
        isSoldOut 
          ? 'bg-[#0f0f10] opacity-50' 
          : isSelected 
            ? 'bg-[#37373d] border-l-4 border-[#007acc] cursor-pointer' 
            : 'hover:bg-[#2a2d2e] border-l-4 border-transparent cursor-pointer'
      }`}
    >
      {/* 구매완료 배지 - 글자 크기에 딱 맞는 작은 회색 네모 */}
      {isSoldOut && (
        <div className="absolute top-4 right-4 bg-[#3e3e42] border border-[#4d4d50] rounded-sm px-1 z-10">
          <span className="text-[#aaaaaa] text-[10px] font-bold leading-tight">
            구매 완료한 코드
          </span>
        </div>
      )}

      {/* 제목 */}
      <h3 className={`font-mono mb-2 truncate ${isSoldOut ? 'text-gray-700' : 'text-white'}`}>
        {post.title}
      </h3>

      {/* 설명 (description이 있을 경우) */}
      {post.description && (
        <p className={`text-sm mb-3 line-clamp-2 ${isSoldOut ? 'text-gray-800' : 'text-gray-400'}`}>
          {post.description}
        </p>
      )}

      {/* 하단 정보 (언어, 가격 등) */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="px-2 py-1 bg-[#333] rounded text-[10px] text-gray-400 font-mono">
            {post.language}
          </span>
        </div>
        <div className={`font-mono text-sm font-bold ${isSoldOut ? 'text-gray-800' : 'text-[#4ec9b0]'}`}>
          {isSoldOut ? 'SOLD OUT' : `${post.price.toLocaleString()}원`}
        </div>
      </div>

      {/* ✅ 코드 미리보기 (첫 줄만 추출해서 보여줌) */}
      <div className={`mt-3 rounded px-3 py-2 border ${
        isSoldOut ? 'bg-[#0a0a0b] border-[#222]' : 'bg-[#1e1e1e] border-[#3e3e42]'
      }`}>
        <code className={`text-xs font-mono line-clamp-1 ${isSoldOut ? 'text-gray-800' : 'text-[#ce9178]'}`}>
          {post.code.split('\n')[0]}...
        </code>
      </div>
    </div>
  );
}