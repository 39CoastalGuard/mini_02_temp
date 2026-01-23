import { useState } from "react";
import type { CodePost } from "../App";

interface CodeFormProps {
  onClose: () => void;

  onSubmit: (post: Omit<CodePost, 'id' | 'createdAt'>) => void;
  initialData?: CodePost | null; //수정 모드
}

export function CodeForm({ onClose, onSubmit, initialData }: CodeFormProps) {
  const [title, setTitle] = useState(initialData?.title || '');
  const [price, setPrice] = useState(initialData?.price?.toString() || '');
  const [code, setCode] = useState(initialData?.code || '');
  const [description, setDescription] = useState(initialData?.description || '');
  const [language, setLanguage] = useState(initialData?.language || 'JavaScript');


  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!title || !price || !code || !description) {
      alert("모든 필드를 입력해주세요.");
      return;
    }

    onSubmit({
      title,
      price: parseInt(price),
      code,
      description,
      language,
    });
  };

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
      <div className="bg-[#252526] border border-[#3e3e42] rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto m-4">
        {/*header*/}
        <div className="bg-[#2d2d30] border-b border-[#3e3e42] px-6 py-3 flex items-center justify-between sticky top-0">

          <h2 className="text-lg font-mono text-white">
            {initialData ? '코드 수정하기' : '코드 올리기'}
          </h2>

          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white px-3 py-1 rounded hover:bg-[#3e3e42]"
          >
            ✕
          </button>
        </div>

        {/* form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {/* title */}
          <div>
            <label className="block text-sm font-mono text-gray-400 mb-2">
              코드 제목 *
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="ex) 재귀 알고리즘을 활용한 하노이의 탑 시뮬레이션"
              className="w-full bg-[#1e1e1e] border border-[#3e3e42] rounded px-4 py-2 text-white font-mono focus:outline-none focus:border-[#007acc]"
            />
          </div>

          {/* price */}
          <div>
            <label className="block text-sm font-mono text-gray-400 mb-2">
              가격 (원) *
            </label>
            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              placeholder="1000"
              className="w-full bg-[#1e1e1e] border border-[#3e3e42] rounded px-4 py-2 text-white font-mono focus:outline-none focus:border-[#007acc]"
            />
          </div>

          {/* language */}
          <div>
            <label className="block text-sm font-mono text-gray-400 mb-2">
              대표 언어 *
            </label>
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="w-full bg-[#1e1e1e] border border-[#3e3e42] rounded px-4 py-2 text-white font-mono focus:outline-none focus:border-[#007acc]"
            >
              <option>Python</option>
              <option>JavaScript</option>
              <option>TypeScript</option>
              <option>Java</option>
              <option>CSS</option>
              <option>HTML</option>
              <option>SQL</option>
              <option>C/C++</option>
              <option>C#</option>
              <option>Go(Golang)</option>
              <option>Rust</option>
            </select>
          </div>

          {/* 설명 */}
          <div>
            <label className="block text-sm font-mono text-gray-400 mb-2">
              설명 *
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="ex) 세 개의 기둥 사이로 원반을 옮기는 고전 퍼즐을 분할 정복(Divide and Conquer) 로직으로 구현한 코드입니다."
              rows={4}
              className="w-full bg-[#1e1e1e] border border-[#3e3e42] rounded px-4 py-2 text-white font-mono focus:outline-none focus:border-[#007acc] resize-none"
            />
          </div>

          {/* 코드 */}
          <div>
            <label className="block text-sm font-mono text-gray-400 mb-2">
              코드 *
            </label>
            <textarea
              value={code}
              onChange={(e) => setCode(e.target.value)}
              placeholder="코드를 첨부해주세요."
              rows={10}
              className="w-full bg-[#1e1e1e] border border-[#3e3e42] rounded px-4 py-2 text-[#ce9178] font-mono text-sm focus:outline-none focus:border-[#007acc] resize-none"
            />
          </div>

          {/* button */}
          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 bg-[#3e3e42] hover:bg-[#4e4e52] text-white px-4 py-2 rounded font-mono transition-colors"
            >
              취소
            </button>
            <button
              type="submit"
              className="flex-1 bg-[#0e639c] hover:bg-[#1177bb] text-white px-4 py-2 rounded font-mono transition-colors"
            >
              {initialData ? '수정 완료' : '등록하기'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}