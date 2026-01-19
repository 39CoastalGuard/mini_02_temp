import { CodeItem } from './CodeItem';
import type { CodePost } from '../App';

interface CodeListProps {
  posts: CodePost[];
  onSelectPost: (post: CodePost) => void;
  selectedPostId: number | null;
}

export function CodeList({ posts, onSelectPost, selectedPostId }: CodeListProps) {
  return (
    <div className="divide-y divide-[#3e3e42]">
      {posts.length === 0 ? (
        <div className="p-8 text-center text-gray-500 font-mono text-sm">
          등록된 코드가 없습니다
        </div>
      ) : (
        posts.map((post) => (
          <CodeItem
            key={post.id}
            post={post}
            onSelectPost={onSelectPost}
            isSelected={post.id === selectedPostId}
          />
        ))
      )}
    </div>
  );
}
