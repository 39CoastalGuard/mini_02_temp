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

    // 1. 사용자에게 먼저 물어봅니다.
    const isConfirmed = window.confirm(
      `"${selectedPost.title}"를 정말로 삭제하시겠습니까?`,
    );

    // 2. 사용자가 '확인'을 눌렀을 때만 삭제 로직을 실행합니다.
    if (isConfirmed) {
      setPosts(posts.filter((p) => p.id !== selectedPost.id));
      setSelectedPost(null);
      window.alert(`"${selectedPost.title}"가 삭제되었습니다 🗑️`);
    }
    // '취소'를 누르면 아무 일도 일어나지 않고 함수가 종료됩니다.
  };

  const handleBuy = () => {
    if (selectedPost) {
      window.alert(`"${selectedPost.title}" 구매가 완료되었습니다! 🎉`);
    }
  };

  return (
    <div className="min-h-screen bg-[#1e1e1e] text-gray-300 flex flex-col">
      {/* 헤더 */}
      <header className="bg-[#2d2d30] border-b border-[#3e3e42] px-6 py-5">
        <div className="flex items-center justify-between">
          <header className="bg-[#2d2d30] border-b border-[#3e3e42] px-6 py-5 shrink-0">
            <div className="flex items-center justify-between">
              {/* 웹 이름 */}
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <span className="text-2xl">🌸</span>
                  <h1 className="text-2xl text-white font-black tracking-tighter">
                    CodeBloom
                  </h1>
                </div>

                {/* 구분선 */}
                <div className="flex items-center ml-4 gap-4">
                  <span
                    className="text-[#4e4e52] opacity-50 select-none mx-5"
                    style={{
                      display: "inline-block",
                      padding: "12px",
                      fontSize: "12px", // 텍스트보다 작게 설정
                      transform: "scaleY(0.8)", // 높이를 더 작게 압축
                      fontWeight: 100,
                    }}
                  >
                    |
                  </span>
                  {/* 슬로건: 웹명 바로 오른쪽에 배치 */}
                  <p
                    className="font-mono opacity-80 whitespace-nowrap"
                    style={{
                      fontSize: "11px",
                      color: "#ddedff",
                      letterSpacing: "0.5px",
                      paddingTop: "4px", // 글자 높낮이 맞추기
                    }}
                  >
                    단순하게 시작하는 코딩 첫걸음
                  </p>
                </div>
              </div>
            </div>
          </header>
          {/* 등록 버튼 */}
          <button
            onClick={() => {
              setShowForm(true);
              setEditMode(false);
            }}
            // 1. justify-center: 글자를 정중앙으로
            // 2. whitespace-nowrap: 글자 잘림 방지
            className="py-2.5 rounded-lg font-bold text-white transition-all hover:brightness-110 active:scale-95 flex items-center justify-center gap-2 text-sm shadow-md whitespace-nowrap"
            style={{
              backgroundColor: "#0e639c",
              border: "none",
              cursor: "pointer",
              // 👇 px 대신 가로 길이를 직접 숫자로 정해버립니다.
              width: "135px",
              // 👇 만약 그래도 안 커지면 아래 속성을 추가해서 주변 간섭을 막습니다.
              flexShrink: 0,
            }}
          >
            <span style={{ fontSize: "1.2rem" }}>🌱</span>
            <span>코드 등록하기</span>
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
                      코드 미리보기 :
                    </div>

                    {/* 코드 블록 영역 */}
                    <div className="bg-[#1e1e1e] rounded-lg border border-[#3e3e42] relative min-h-[200px] overflow-hidden">
                      <div className="bg-[#2d2d30] px-4 py-2 border-b border-[#3e3e42] text-xs text-gray-400 font-mono flex justify-between">
                        <span>{selectedPost.language.toLowerCase()}.code</span>
                        <span className="text-[#b95f93] font-bold">
                          PREVIEW MODE
                        </span>
                      </div>

                      <div className="p-4 relative">
                        {/* 1. 실제 코드를 상위 4줄만 잘라서 보여줌 */}
                        <pre className="text-sm font-mono text-[#ce9178] whitespace-pre-wrap select-none opacity-60">
                          <code>
                            {selectedPost.code
                              .split("\n")
                              .slice(0, 4)
                              .join("\n")}
                            {"\n"}
                            {/* 4줄 이후에 줄바꿈이 더 있다면 ... 표시 */}
                            {selectedPost.code.split("\n").length > 4 && "..."}
                          </code>
                        </pre>

                        {/* 2. 코드 바로 아래를 자연스럽게 덮는 짧은 그라데이션 가림막 */}
                        <div className="absolute inset-0 bg-gradient-to-t from-[#1e1e1e] via-[#1e1e1e]/80 to-transparent pointer-events-none" />
                      </div>

                      {/* 3. 결제 안내 배너 (코드 양에 상관없이 박스 하단에 고정) */}
                      <div className="absolute bottom-0 left-0 right-0 h-32 flex flex-col items-center justify-end pb-6 bg-gradient-to-t from-[#1e1e1e] to-transparent">
                        <div className="bg-[#1e1e1e]/90 px-6 py-3 rounded-xl border border-[#b95f93]/40 shadow-2xl backdrop-blur-sm flex items-center gap-3">
                          <span className="text-lg">🔒</span>
                          <div className="flex flex-col">
                            <span className="text-xs text-white font-bold">
                              결제 후 전체 코드를 확인할 수 있습니다.
                            </span>
                            {/* <span className="text-[10px] text-gray-500">
                              구매 전에는 상위 4줄만 미리보기로 제공됩니다.
                            </span> */}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* 버튼들 */}
                  <div className="flex gap-3">
                    <button
                      onClick={handleBuy}
                      // 문구는 그대로 '구매하기', 배경색만 헤더 버튼과 동일하게 변경
                      className="flex-1 text-white py-3 rounded-lg font-mono transition-all hover:brightness-110 active:scale-95 shadow-md"
                      style={{
                        backgroundColor: "#0e639c",
                        border: "none",
                        cursor: "pointer",
                      }}
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
      <footer
        className="px-6 py-2 text-sm font-mono text-white flex items-center justify-between shadow-[0_-2px_10px_rgba(0,0,0,0.3)]"
        style={{ backgroundColor: "#0e639c" }} // 버튼과 동일한 핑크색 적용
      >
        <div className="flex items-center gap-2">
          <span className="opacity-80">STATUS</span>
          <span className="font-bold">총 {posts.length}개의 코드</span>
        </div>
        <div className="flex items-center gap-2 opacity-80">
          <span>CodeBloom Market v1.0</span>
        </div>
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
