import { useState } from "react";
import { CodeList } from "./components/CodeList";
import { CodeForm } from "./components/CodeForm";

// 1. 인터페이스에 isSoldOut 추가
export interface CodePost {
  id: number;
  title: string;
  price: number;
  code: string;
  description: string;
  language: string;
  createdAt: string;
  isSoldOut?: boolean; // 👈 추가
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
      isSoldOut: false, // 👈 기본값
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
      id: posts.length > 0 ? Math.max(...posts.map((p) => p.id)) + 1 : 1,
      createdAt: "방금 전",
      isSoldOut: false, // 👈 신규 등록 시 판매 중 상태로 고정
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
      isSoldOut: selectedPost.isSoldOut, // 기존 상태 유지
    };

    setPosts(posts.map((p) => (p.id === post.id ? post : p)));
    setSelectedPost(post);
    setShowForm(false);
    setEditMode(false);
  };

  const handleDeletePost = () => {
    if (!selectedPost) return;
    const ok = window.confirm(`"${selectedPost.title}"를 정말 삭제하시겠습니까?`);
    if (!ok) return;
    setPosts(posts.filter((p) => p.id !== selectedPost.id));
    setSelectedPost(null);
    window.alert(`"${selectedPost.title}"가 삭제되었습니다 🗑️`);
  };

  // 2. [핵심 수정] 구매 시 실제 데이터 상태 변경
  const handleBuy = () => {
    if (selectedPost) {
      if (selectedPost.isSoldOut) {
        window.alert("이미 구매가 완료된 상품입니다.");
        return;
      }
      
      const ok = window.confirm(`"${selectedPost.title}"를 구매하시겠습니까?`);
      if (!ok) return;

      // 전체 목록 업데이트
      const updatedPosts = posts.map((p) =>
        p.id === selectedPost.id ? { ...p, isSoldOut: true } : p
      );
      
      setPosts(updatedPosts);
      
      // 현재 상세보기 페이지도 업데이트
      setSelectedPost({ ...selectedPost, isSoldOut: true });
      
      window.alert(`"${selectedPost.title}" 구매가 완료되었습니다! 🎉`);
    }
  };

  return (
    <div className="min-h-screen bg-[#1e1e1e] text-gray-300 flex flex-col">
      <header className="bg-[#2d2d30] border-b border-[#3e3e42] px-6 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="text-2xl">💻</div>
            <h1 className="text-xl text-white font-mono">코드 마켓</h1>
          </div>
          <button
            onClick={() => { setShowForm(true); setEditMode(false); }}
            className="bg-[#0e639c] hover:bg-[#1177bb] text-white px-4 py-2 rounded font-mono transition-colors flex items-center gap-2"
          >
            ➕ <span>코드 올리기</span>
          </button>
        </div>
      </header>

      <div className="flex-1 flex overflow-hidden">
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

        <div className="flex-1 flex flex-col overflow-hidden">
          {selectedPost ? (
            <div className="flex-1 flex flex-col">
              <div className="bg-[#2d2d30] border-b border-[#3e3e42] px-6 py-3 flex items-center justify-between">
                <h2 className="text-lg font-mono text-white">{selectedPost.title}</h2>
                <button onClick={() => setSelectedPost(null)} className="text-gray-400">✕</button>
              </div>
              <div className="flex-1 overflow-y-auto p-6">
                <div className="max-w-4xl">
                  <div className="bg-[#2d2d30] rounded-lg p-6 mb-6 border border-[#3e3e42] relative">
                    {/* 상세페이지에도 딱지 추가 */}
                    {selectedPost.isSoldOut && (
                      <div className="absolute top-4 right-4 bg-red-600 text-white px-3 py-1 rounded font-bold">SOLD OUT</div>
                    )}
                    <div className="flex items-center justify-between mb-4">
                      <div className="text-3xl font-mono text-[#4ec9b0]">
                        {selectedPost.isSoldOut ? "구매 완료" : `${selectedPost.price.toLocaleString()}원`}
                      </div>
                      <div className="text-sm text-gray-500">{selectedPost.createdAt}</div>
                    </div>
                    <p className="text-gray-300 mt-4">{selectedPost.description}</p>
                  </div>

                  <div className="bg-[#1e1e1e] rounded-lg border border-[#3e3e42] mb-6 overflow-hidden">
                    <div className="bg-[#2d2d30] px-4 py-2 text-xs text-gray-400 font-mono">code</div>
                    <pre className="p-4 overflow-x-auto">
                      <code className={`text-sm font-mono ${selectedPost.isSoldOut ? 'text-gray-600' : 'text-[#ce9178]'}`}>
                        {selectedPost.code}
                      </code>
                    </pre>
                  </div>

                  <div className="flex gap-3">
                    <button
                      onClick={handleBuy}
                      disabled={selectedPost.isSoldOut}
                      className={`flex-1 py-3 rounded-lg font-mono transition-colors ${selectedPost.isSoldOut ? 'bg-gray-700 cursor-not-allowed' : 'bg-[#0e639c] hover:bg-[#1177bb] text-white'}`}
                    >
                      {selectedPost.isSoldOut ? "구매 완료된 코드" : "구매하기"}
                    </button>
                    <button onClick={() => { setShowForm(true); setEditMode(true); }} className="bg-[#3e3e42] text-white px-4 py-3 rounded-lg">수정</button>
                    <button onClick={handleDeletePost} className="bg-red-600 text-white px-4 py-3 rounded-lg">삭제</button>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex-1 flex items-center justify-center text-gray-500 font-mono">코드를 선택해주세요</div>
          )}
        </div>
      </div>
      <footer className="bg-[#007acc] px-6 py-2 text-sm text-white flex justify-between">
        <div>총 {posts.length}개의 코드</div>
      </footer>
      {showForm && (
        <CodeForm
          onClose={() => { setShowForm(false); setEditMode(false); }}
          onSubmit={editMode ? handleEditPost : handleAddPost}
          initialData={editMode ? (selectedPost as any) : undefined}
        />
      )}
    </div>
  );
}