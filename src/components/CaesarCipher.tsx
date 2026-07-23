import { useState } from 'react';
import { Lock, Unlock, ArrowRight, ArrowDown } from 'lucide-react';
import { caesarEncrypt, caesarDecrypt, ALPHABET, cleanText } from '../utils';

export default function CaesarCipher() {
  const [input, setInput] = useState('HELLO INFORMATICS');
  const [shift, setShift] = useState(3);
  const [mode, setMode] = useState<'encrypt' | 'decrypt'>('encrypt');

  const output = mode === 'encrypt' ? caesarEncrypt(input, shift) : caesarDecrypt(input, shift);
  
  // Create shifted alphabet for visualization
  const getShiftedAlphabet = () => {
    const s = ((mode === 'encrypt' ? shift : -shift) % 26 + 26) % 26;
    return ALPHABET.slice(s) + ALPHABET.slice(0, s);
  };
  const shiftedAlphabet = getShiftedAlphabet();

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="bg-white rounded-2xl border border-zinc-200 shadow-sm p-6 flex flex-col">
        <h2 className="text-sm font-bold text-zinc-400 uppercase tracking-wider mb-4">카이사르 암호 (Caesar Cipher)</h2>
        <p className="text-sm text-zinc-500 mb-6 leading-relaxed">
          고대 로마의 황제 줄리어스 시저가 사용했던 암호로, 알파벳을 일정한 수만큼 평행 이동(Shift)시켜 암호화하는 치환 암호 방식입니다.
        </p>

        <div className="grid md:grid-cols-2 gap-6 flex-1">
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

        <div className="mt-6 pt-6 border-t border-zinc-100">
          <label className="text-xs font-bold text-zinc-500 mb-4 flex items-center justify-between">
            <span>이동 값 (Key: Shift)</span>
            <span className="text-sm font-bold text-indigo-600">
              {shift}칸 이동
            </span>
          </label>
          <input
            type="range"
            min="0"
            max="25"
            value={shift}
            onChange={(e) => setShift(Number(e.target.value))}
            className="w-full h-1.5 bg-zinc-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
          />
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-zinc-200 shadow-sm p-6 flex flex-col">
        <h3 className="text-sm font-bold text-zinc-400 uppercase tracking-wider mb-6 flex items-center gap-2">
          알파벳 변환 시각화
        </h3>
        
        <div className="overflow-x-auto pb-2">
          <div className="flex flex-col gap-2 min-w-max">
            <div className="flex gap-1 items-center">
              <span className="w-16 text-xs font-bold text-zinc-400 uppercase text-right pr-4">평문</span>
              {ALPHABET.split('').map((char, i) => (
                <div key={`p-${i}`} className="w-8 h-8 flex items-center justify-center bg-zinc-50 rounded text-sm font-mono font-medium text-zinc-600">
                  {char}
                </div>
              ))}
            </div>
            
            <div className="flex gap-1 items-center">
              <span className="w-16"></span>
              {ALPHABET.split('').map((_, i) => (
                <div key={`arr-${i}`} className="w-8 flex justify-center text-zinc-300">
                  <div className="h-4 w-[1px] bg-zinc-300 my-1"></div>
                </div>
              ))}
            </div>

            <div className="flex gap-1 items-center">
              <span className="w-16 text-xs font-bold text-indigo-600 uppercase text-right pr-4">암호문</span>
              {shiftedAlphabet.split('').map((char, i) => (
                <div key={`c-${i}`} className="w-8 h-8 flex items-center justify-center bg-indigo-50 rounded text-sm font-mono font-bold text-indigo-700">
                  {char}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
