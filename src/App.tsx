import { useState } from 'react';
import { CodeList } from './components/CodeList';
import { CodeForm } from './components/CodeForm';

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
      title: 'React 투두리스트 컴포넌트',
      price: 15000,
      code: 'function TodoList() {\n  const [todos, setTodos] = useState([]);\n  return <div>...</div>\n}',
      description: '깔끔한 투두리스트 컴포넌트입니다',
      language: 'JavaScript',
      createdAt: '2시간 전'
    },
    {
      id: 2,
      title: 'Python 웹 스크래퍼',
      price: 25000,
      code: 'import requests\nfrom bs4 import BeautifulSoup\n\ndef scrape_data():\n    ...',
      description: '효율적인 웹 스크래핑 코드',
      language: 'Python',
      createdAt: '5시간 전'
    },
    {
      id: 3,
      title: 'CSS 애니메이션 모음',
      price: 10000,
      code: '@keyframes fadeIn {\n  from { opacity: 0; }\n  to { opacity: 1; }\n}',
      description: '다양한 CSS 애니메이션 효과',
      language: 'CSS',
      createdAt: '1일 전'
    },
    {
      id: 4,
      title: 'Node.js Express API 템플릿',
      price: 35000,
      code: 'const express = require("express");\nconst app = express();\n\napp.get("/api/data", (req, res) => {\n  res.json({ message: "Hello" });\n});',
      description: 'RESTful API 기본 구조',
      language: 'JavaScript',
      createdAt: '3일 전'
    },
    {
      id: 5,
      title: 'SQL 데이터베이스 스키마',
      price: 20000,
      code: 'CREATE TABLE users (\n  id INT PRIMARY KEY,\n  username VARCHAR(50),\n  email VARCHAR(100)\n);',
      description: '사용자 관리 DB 스키마',
      language: 'SQL',
      createdAt: '5일 전'
    },
    {
      id: 6,
      title: 'Java 싱글톤 패턴',
      price: 12000,
      code: 'public class Singleton {\n  private static Singleton instance;\n  private Singleton() {}\n  public static Singleton getInstance() {...}\n}',
      description: '디자인 패턴 구현 예제',
      language: 'Java',
      createdAt: '1주일 전'
    },
    {
      id: 7,
      title: 'TypeScript 유틸리티 함수 모음',
      price: 18000,
      code: 'export const debounce = <T extends (...args: any[]) => any>(\n  func: T,\n  wait: number\n) => {...}',
      description: '자주 사용하는 유틸리티 함수들',
      language: 'TypeScript',
      createdAt: '1주일 전'
    },
    {
      id: 8,
      title: 'React Custom Hook - useLocalStorage',
      price: 15000,
      code: 'function useLocalStorage(key, initialValue) {\n  const [value, setValue] = useState(() => {\n    const item = localStorage.getItem(key);\n    return item ? JSON.parse(item) : initialValue;\n  });\n  ...\n}',
      description: '로컬 스토리지 관리 훅',
      language: 'JavaScript',
      createdAt: '2주일 전'
    }
  ]);

  const [selectedPost, setSelectedPost] = useState<CodePost | null>(posts[0]);
  const [showForm, setShowForm] = useState(false);

  const handleSelectPost = (post: CodePost) => {
    setSelectedPost(post);
  };

  const handleAddPost = (newPost: Omit<CodePost, 'id' | 'createdAt'>) => {
    const post: CodePost = {
      ...newPost,
      id: Math.max(...posts.map(p => p.id)) + 1,
      createdAt: '방금 전'
    };
    setPosts([post, ...posts]);
    setSelectedPost(post);
    setShowForm(false);
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
            <span className="text-sm text-gray-500 ml-2">- 개발자들의 코드 거래소</span>
          </div>
          <button 
            onClick={() => setShowForm(true)}
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
                <h2 className="text-lg font-mono text-white">{selectedPost.title}</h2>
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
                      <div className="text-sm text-gray-500">{selectedPost.createdAt}</div>
                    </div>
                    <div className="flex items-center gap-2 mb-2">
                      <span className="px-3 py-1 bg-[#3e3e42] rounded text-sm font-mono">
                        {selectedPost.language}
                      </span>
                    </div>
                    <p className="text-gray-300 mt-4">{selectedPost.description}</p>
                  </div>

                  {/* 코드 블록 */}
                  <div className="mb-4">
                    <div className="text-sm text-gray-500 mb-2 font-mono">코드 미리보기:</div>
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

                  {/* 구매 버튼 */}
                  <button 
                    onClick={handleBuy}
                    className="w-full bg-[#0e639c] hover:bg-[#1177bb] text-white py-3 rounded-lg font-mono transition-colors"
                  >
                    구매하기
                  </button>
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

      {/* 코드 올리기 폼 모달 */}
      {showForm && (
        <CodeForm 
          onClose={() => setShowForm(false)}
          onSubmit={handleAddPost}
        />
      )}
    </div>
  );
}
