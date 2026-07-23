import { useState } from 'react';
import { Lock, Unlock, KeyRound } from 'lucide-react';
import { vigenereEncrypt, vigenereDecrypt, cleanText } from '../utils';

export default function VigenereCipher() {
  const [input, setInput] = useState('INFORMATION');
  const [keyword, setKeyword] = useState('KEY');
  const [mode, setMode] = useState<'encrypt' | 'decrypt'>('encrypt');

  const output = mode === 'encrypt' ? vigenereEncrypt(input, keyword) : vigenereDecrypt(input, keyword);
  
  // Generator for visualization
  const renderVisualization = () => {
    const cleanedInput = input.replace(/\s+/g, '').toUpperCase();
    const cleanedKey = cleanText(keyword) || 'A';
    const result = mode === 'encrypt' ? vigenereEncrypt(cleanedInput, cleanedKey) : vigenereDecrypt(cleanedInput, cleanedKey);
    
    return (
      <div className="flex flex-wrap gap-2">
        {cleanedInput.split('').map((char, i) => {
          const keyChar = cleanedKey[i % cleanedKey.length];
          const outChar = result[i];
          
          return (
            <div key={i} className="flex flex-col items-center border border-zinc-200 rounded-lg overflow-hidden w-10 shadow-sm">
              <div className="bg-zinc-100 w-full text-center py-1.5 text-[10px] font-bold tracking-wider uppercase text-zinc-500 border-b border-zinc-200">평문</div>
              <div className="py-2 text-lg font-mono font-medium text-zinc-800">{char}</div>
              
              <div className="bg-emerald-100 w-full text-center py-1 text-[10px] font-bold tracking-wider uppercase text-emerald-700 border-y border-emerald-200">키(Key)</div>
              <div className="py-2 bg-emerald-50 w-full text-center text-emerald-800 font-mono font-bold">{keyChar}</div>
              
              <div className="bg-indigo-100 w-full text-center py-1 text-[10px] font-bold tracking-wider uppercase text-indigo-700 border-y border-indigo-200">결과</div>
              <div className="py-2 bg-indigo-50 w-full text-center text-indigo-800 font-mono font-bold">{outChar}</div>
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="bg-white rounded-2xl border border-zinc-200 shadow-sm p-6 flex flex-col">
        <h2 className="text-sm font-bold text-zinc-400 uppercase tracking-wider mb-4">비즈네르 암호 (Vigenère Cipher)</h2>
        <p className="text-sm text-zinc-500 mb-6 leading-relaxed">
          하나의 키를 사용하는 카이사르 암호의 약점을 보완하기 위해, 키워드(Keyword)를 반복해서 사용하여 문자마다 다른 이동 값을 적용하는 다중 치환 암호입니다.
        </p>

        <div className="grid md:grid-cols-2 gap-6 mb-6 flex-1">
          <div className="flex flex-col">
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs font-bold text-zinc-500">입력 (Plaintext)</label>
              <div className="flex bg-zinc-100 p-1 rounded-lg">
                <button
                  onClick={() => setMode('encrypt')}
                  className={`px-3 py-1 rounded-md text-xs font-medium transition-all ${
                    mode === 'encrypt' ? 'bg-white shadow-sm text-indigo-600' : 'text-zinc-500 hover:text-zinc-700'
                  }`}
                >
                  <Lock className="w-3 h-3 inline-block mr-1" /> 암호화
                </button>
                <button
                  onClick={() => setMode('decrypt')}
                  className={`px-3 py-1 rounded-md text-xs font-medium transition-all ${
                    mode === 'decrypt' ? 'bg-white shadow-sm text-indigo-600' : 'text-zinc-500 hover:text-zinc-700'
                  }`}
                >
                  <Unlock className="w-3 h-3 inline-block mr-1" /> 복호화
                </button>
              </div>
            </div>
            <textarea
              className="flex-1 p-4 bg-zinc-50 border border-zinc-200 rounded-xl resize-none text-lg font-mono focus:outline-none focus:ring-2 focus:ring-indigo-500/20 transition-all uppercase"
              value={input}
              onChange={(e) => setInput(e.target.value.replace(/[^a-zA-Z\s]/g, ''))}
              placeholder="알파벳을 입력하세요"
            />
          </div>

          <div className="flex flex-col">
            <label className="text-xs font-bold text-zinc-500 mb-2 flex justify-between">
              결과 (Ciphertext)
              <span className="text-indigo-600 font-medium">실시간 변환 중</span>
            </label>
            <div className="flex-1 p-4 bg-indigo-900 text-indigo-100 border border-indigo-950 rounded-xl font-mono text-lg break-all shadow-inner overflow-y-auto min-h-[8rem]">
              {output || '결과가 이곳에 표시됩니다.'}
            </div>
          </div>
        </div>

        <div className="border-t border-zinc-100 pt-6">
          <label className="text-xs font-bold text-zinc-500 mb-3 flex items-center gap-2">
            <KeyRound className="w-4 h-4 text-emerald-500" />
            키워드 (Keyword)
          </label>
          <input
            type="text"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value.replace(/[^a-zA-Z]/g, '').toUpperCase())}
            placeholder="알파벳 키워드 입력"
            className="w-full max-w-sm p-3 bg-zinc-50 border border-zinc-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 uppercase font-mono text-lg transition-all"
          />
          <p className="text-xs text-zinc-400 mt-2">이 단어가 반복되면서 평문의 각 글자를 얼만큼 이동시킬지 결정합니다. (예: A=0칸, B=1칸...)</p>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-zinc-200 shadow-sm p-6 flex flex-col">
        <h3 className="text-sm font-bold text-zinc-400 uppercase tracking-wider mb-6">글자별 변환 과정 분석</h3>
        <div className="overflow-x-auto pb-4">
          {input.replace(/\s+/g, '').length > 0 ? (
            renderVisualization()
          ) : (
            <div className="text-zinc-400 text-sm italic text-center py-8">입력값이 없습니다.</div>
          )}
        </div>
      </div>
    </div>
  );
}
