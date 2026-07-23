import { useState } from 'react';
import { Lock, Unlock, Columns, ArrowRight, ArrowDown } from 'lucide-react';
import { transpositionEncrypt, transpositionDecrypt } from '../utils';

export default function TranspositionCipher() {
  const [input, setInput] = useState('DATA SECURITY');
  const [columns, setColumns] = useState(4);
  const [mode, setMode] = useState<'encrypt' | 'decrypt'>('encrypt');

  const output = mode === 'encrypt' ? transpositionEncrypt(input, columns) : transpositionDecrypt(input, columns);
  
  // Grid visualization
  const renderGrid = () => {
    let sourceText = input;
    if (mode === 'encrypt') {
      sourceText = input.replace(/\s+/g, '_');
    }
    
    if (!sourceText) return null;

    const numCols = columns;
    const numRows = Math.ceil(sourceText.length / numCols);
    
    // Create matrix
    const grid = [];
    if (mode === 'encrypt') {
      let idx = 0;
      for (let r = 0; r < numRows; r++) {
        const row = [];
        for (let c = 0; c < numCols; c++) {
          row.push(idx < sourceText.length ? sourceText[idx] : '');
          idx++;
        }
        grid.push(row);
      }
    } else {
      // Decrypt mode visualization (building the grid by columns first)
      const emptyCells = (numRows * numCols) - sourceText.length;
      let idx = 0;
      
      // Initialize empty grid
      for (let r = 0; r < numRows; r++) {
        grid.push(new Array(numCols).fill(''));
      }
      
      for (let c = 0; c < numCols; c++) {
        const rowCount = c < numCols - emptyCells ? numRows : numRows - 1;
        for (let r = 0; r < rowCount; r++) {
          if (idx < sourceText.length) {
             grid[r][c] = sourceText[idx++];
          }
        }
      }
    }

    return (
      <div className="flex flex-col items-center mt-6">
        <div className="flex items-center gap-4 mb-4">
          <div className="flex items-center gap-2 text-[10px] font-bold tracking-wider uppercase text-zinc-500 bg-zinc-100 px-3 py-1.5 rounded-full">
            {mode === 'encrypt' ? <ArrowRight className="w-3 h-3 text-emerald-500" /> : <ArrowDown className="w-3 h-3 text-indigo-500" />}
            입력 방향: {mode === 'encrypt' ? '가로 (행)' : '세로 (열)'}
          </div>
          <div className="flex items-center gap-2 text-[10px] font-bold tracking-wider uppercase text-zinc-500 bg-zinc-100 px-3 py-1.5 rounded-full">
            {mode === 'encrypt' ? <ArrowDown className="w-3 h-3 text-indigo-500" /> : <ArrowRight className="w-3 h-3 text-emerald-500" />}
            출력 방향: {mode === 'encrypt' ? '세로 (열)' : '가로 (행)'}
          </div>
        </div>

        <div className="inline-grid gap-2 p-4 bg-zinc-50 border border-zinc-200 rounded-xl" style={{ gridTemplateColumns: `repeat(${numCols}, minmax(0, 1fr))` }}>
          {grid.map((row, rowIndex) => (
            row.map((cell, colIndex) => (
              <div 
                key={`${rowIndex}-${colIndex}`}
                className={`w-12 h-12 flex items-center justify-center font-mono text-xl font-bold rounded-lg border 
                  ${cell ? 'bg-white border-zinc-200 text-zinc-800 shadow-sm' : 'bg-transparent border-dashed border-zinc-300'}`}
              >
                {cell}
              </div>
            ))
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="bg-white rounded-2xl border border-zinc-200 shadow-sm p-6 flex flex-col">
        <h2 className="text-sm font-bold text-zinc-400 uppercase tracking-wider mb-4">전치 암호 (Transposition Cipher)</h2>
        <p className="text-sm text-zinc-500 mb-6 leading-relaxed">
          문자의 종류는 바꾸지 않고, 문자의 위치(순서)만 재배열하여 암호화하는 방식입니다. 일정한 열(Column) 개수를 정해 격자에 채우는 방식이 대표적입니다.
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
              onChange={(e) => setInput(e.target.value.toUpperCase())}
              placeholder="텍스트를 입력하세요"
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
          <label className="text-xs font-bold text-zinc-500 mb-4 flex items-center justify-between">
            <span className="flex items-center gap-2"><Columns className="w-4 h-4 text-indigo-500" /> 열(Column) 개수 (Key)</span>
            <span className="text-sm font-bold text-indigo-600">
              {columns} 열
            </span>
          </label>
          <input
            type="range"
            min="2"
            max="10"
            value={columns}
            onChange={(e) => setColumns(Number(e.target.value))}
            className="w-full h-1.5 bg-zinc-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
          />
          <p className="text-xs text-zinc-400 mt-3">격자의 가로 칸 수를 결정합니다. (공백은 편의상 '_'로 변환되어 표시됩니다)</p>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-zinc-200 shadow-sm p-6 flex flex-col">
        <h3 className="text-sm font-bold text-zinc-400 uppercase tracking-wider mb-2">행렬(Grid) 변환 시각화</h3>
        <p className="text-xs text-zinc-500 mb-4">암호화 시에는 가로로 채우고 세로로 읽습니다. 복호화 시에는 반대로 세로로 채우고 가로로 읽습니다.</p>
        <div className="overflow-x-auto pb-4">
          {renderGrid()}
        </div>
      </div>
    </div>
  );
}
