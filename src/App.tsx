import { useState } from "react";
import { CodeList } from "./components/CodeList";
import { CodeForm } from "./components/CodeForm";

export interface CodePost {
  id: number;
  title: string;
  price: number;
  code: string;
  description: string;
  language: string;
  createdAt: string;
}

export default function App() {
  const [posts, setPosts] = useState<CodePost[]>([
    {
      id: 1,
      title: "React 투두리스트 컴포넌트",
      price: 15000,
      code: "function TodoList() {\n const [todos, setTodos] = useState([]);\n return <div>...</div>\n}",
      description: "깔끔한 투두리스트 컴포넌트입니다",
      language: "JavaScript",
      createdAt: "2시간 전",
    },
  ]);

  const [selectedPost, setSelectedPost] = useState<CodePost | null>(posts[0]);
  const [showForm, setShowForm] = useState(false);
  const [editMode, setEditMode] = useState(false);

  const handleSelectPost = (post: CodePost) => {
    setSelectedPost(post);
  };

  const handleAddPost = (newPost: Omit<CodePost, "id" | "createdAt">) => {
    const post: CodePost = {
      ...newPost,
      id: Math.max(...posts.map((p) => p.id)) + 1,
      createdAt: "방금 전",
    };
    setPosts([post, ...posts]);
    setSelectedPost(post);
    setShowForm(false);
  };

  const handleEditPost = (updatedPost: Omit<CodePost, "id" | "createdAt">) => {
    if (!selectedPost) return;

    const post: CodePost = {
      ...updatedPost,
      id: selectedPost.id,
      createdAt: selectedPost.createdAt,
    };

    setPosts(posts.map((p) => (p.id === post.id ? post : p)));
    setSelectedPost(post);
    setShowForm(false);
    setEditMode(false);
  };

  const handleDeletePost = () => {
    if (!selectedPost) return;
    setPosts(posts.filter((p) => p.id !== selectedPost.id));
    setSelectedPost(null);
    window.alert(`"${selectedPost.title}"가 삭제되었습니다 🗑️`);
  };

  const handleBuy = () => {
    if (selectedPost) {
      window.alert(`"${selectedPost.title}" 구매가 완료되었습니다! 🎉`);
    }
  };

  return (
    <div className="min-h-screen bg-[#1e1e1e] text-gray-300 flex flex-col">
      {/* 헤더 */}
      <header className="bg-[#2d2d30] border-b border-[#3e3e42] px-6 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="text-2xl">💻</div>
            <h1 className="text-xl text-white font-mono">코드 마켓</h1>
            <span className="text-sm text-gray-500 ml-2">
              - 개발자들의 코드 거래소
            </span>
          </div>
          <button
            onClick={() => {
              setShowForm(true);
              setEditMode(false);
            }}
            className="bg-[#0e639c] hover:bg-[#1177bb] text-white px-4 py-2 rounded font-mono transition-colors flex items-center gap-2"
          >
            <span>➕</span>
            <span>코드 올리기</span>
          </button>
        </div>
      </header>

      {/* 메인 컨텐츠 */}
      <div className="flex-1 flex overflow-hidden">
        {/* 왼쪽 사이드바 - 목록 */}
        <div className="w-96 bg-[#252526] border-r border-[#3e3e42] flex flex-col">
          <div className="p-4 border-b border-[#3e3e42]">
            <h2 className="text-sm font-mono text-gray-400">📋 코드 목록</h2>
          </div>
          <div className="flex-1 overflow-y-auto">
            <CodeList
              posts={posts}
              onSelectPost={handleSelectPost}
              selectedPostId={selectedPost?.id || null}
            />
          </div>
        </div>

        {/* 중앙 - 상세 보기 */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {selectedPost ? (
            <div className="flex-1 flex flex-col">
              <div className="bg-[#2d2d30] border-b border-[#3e3e42] px-6 py-3 flex items-center justify-between">
                <h2 className="text-lg font-mono text-white">
                  {selectedPost.title}
                </h2>
                <button
                  onClick={() => setSelectedPost(null)}
                  className="text-gray-400 hover:text-white px-3 py-1 rounded hover:bg-[#3e3e42]"
                >
                  ✕
                </button>
              </div>
              <div className="flex-1 overflow-y-auto p-6">
                <div className="max-w-4xl">
                  {/* 가격 및 정보 */}
                  <div className="bg-[#2d2d30] rounded-lg p-6 mb-6 border border-[#3e3e42]">
                    <div className="flex items-center justify-between mb-4">
                      <div className="text-3xl font-mono text-[#4ec9b0]">
                        {selectedPost.price.toLocaleString()}원
                      </div>
                      <div className="text-sm text-gray-500">
                        {selectedPost.createdAt}
                      </div>
                    </div>
                    <div className="flex items-center gap-2 mb-2">
                      <span className="px-3 py-1 bg-[#3e3e42] rounded text-sm font-mono">
                        {selectedPost.language}
                      </span>
                    </div>
                    <p className="text-gray-300 mt-4">
                      {selectedPost.description}
                    </p>
                  </div>

                  {/* 코드 블록 */}
                  <div className="mb-4">
                    <div className="text-sm text-gray-500 mb-2 font-mono">
                      코드 미리보기:
                    </div>
                    <div className="bg-[#1e1e1e] rounded-lg border border-[#3e3e42] overflow-hidden">
                      <div className="bg-[#2d2d30] px-4 py-2 border-b border-[#3e3e42] text-xs text-gray-400 font-mono">
                        {selectedPost.language.toLowerCase()}.code
                      </div>
                      <pre className="p-4 overflow-x-auto">
                        <code className="text-sm font-mono text-[#ce9178]">
                          {selectedPost.code}
                        </code>
                      </pre>
                    </div>
                  </div>

                  {/* 버튼들 */}
                  <div className="flex gap-3">
                    <button
                      onClick={handleBuy}
                      className="flex-1 bg-[#0e639c] hover:bg-[#1177bb] text-white py-3 rounded-lg font-mono transition-colors"
                    >
                      구매하기
                    </button>
                    <button
                      onClick={() => {
                        setShowForm(true);
                        setEditMode(true);
                      }}
                      className="bg-[#3e3e42] hover:bg-[#555] text-white px-4 py-3 rounded-lg font-mono"
                    >
                      수정하기
                    </button>
                    <button
                      onClick={handleDeletePost}
                      className="bg-red-600 hover:bg-red-700 text-white px-4 py-3 rounded-lg font-mono"
                    >
                      삭제하기
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex-1 flex items-center justify-center text-gray-500 font-mono">
              코드를 선택해주세요
            </div>
          )}
        </div>
      </div>

      {/* 푸터 */}
      <footer className="bg-[#007acc] px-6 py-2 text-sm font-mono text-white flex items-center justify-between">
        <div>총 {posts.length}개의 코드</div>
        <div>VSCode Market Theme</div>
      </footer>

      {/* 코드 올리기/수정 폼 모달 */}
      {showForm && (
        <CodeForm
          onClose={() => {
            setShowForm(false);
            setEditMode(false);
          }}
          onSubmit={editMode ? handleEditPost : handleAddPost}
          initialData={editMode ? selectedPost : undefined}
        />
      )}
    </div>
  );
}
