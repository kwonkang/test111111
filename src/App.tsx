import { useState } from 'react';
import { Shield, KeyRound, Lock, Grid3X3, BookOpen } from 'lucide-react';
import CaesarCipher from './components/CaesarCipher';
import VigenereCipher from './components/VigenereCipher';
import TranspositionCipher from './components/TranspositionCipher';

export default function App() {
  const [activeTab, setActiveTab] = useState<'caesar' | 'vigenere' | 'transposition'>('caesar');

  return (
    <div className="min-h-screen bg-zinc-50 font-sans text-zinc-900 selection:bg-indigo-100 selection:text-indigo-900">
      {/* Header */}
      <header className="h-16 bg-white border-b border-zinc-200 flex items-center justify-between px-8 shrink-0 sticky top-0 z-10 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white font-bold shadow-sm">
            <Shield className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-lg font-bold leading-none text-zinc-900">정보정보최고짱이야</h1>
            <p className="text-xs text-zinc-500 mt-1">데이터와 정보 - 암호화 알고리즘 실습</p>
          </div>
        </div>
        
        {/* Navigation Tabs */}
        <nav className="flex bg-zinc-100 p-1 rounded-xl">
          <button
            onClick={() => setActiveTab('caesar')}
            className={`flex items-center gap-2 px-4 py-1.5 rounded-lg text-sm font-semibold transition-all ${
              activeTab === 'caesar' 
                ? 'bg-white text-indigo-700 shadow-sm' 
                : 'text-zinc-600 hover:text-zinc-900 hover:bg-zinc-200/50'
            }`}
          >
            <Lock className="w-4 h-4" /> 카이사르
          </button>
          <button
            onClick={() => setActiveTab('vigenere')}
            className={`flex items-center gap-2 px-4 py-1.5 rounded-lg text-sm font-semibold transition-all ${
              activeTab === 'vigenere' 
                ? 'bg-white text-emerald-700 shadow-sm' 
                : 'text-zinc-600 hover:text-zinc-900 hover:bg-zinc-200/50'
            }`}
          >
            <KeyRound className="w-4 h-4" /> 비즈네르
          </button>
          <button
            onClick={() => setActiveTab('transposition')}
            className={`flex items-center gap-2 px-4 py-1.5 rounded-lg text-sm font-semibold transition-all ${
              activeTab === 'transposition' 
                ? 'bg-white text-blue-700 shadow-sm' 
                : 'text-zinc-600 hover:text-zinc-900 hover:bg-zinc-200/50'
            }`}
          >
            <Grid3X3 className="w-4 h-4" /> 전치 암호
          </button>
        </nav>
      </header>

      {/* Main Content Area */}
      <main className="max-w-6xl mx-auto px-6 py-6">
        {/* Educational Context Banner */}
        <div className="mb-6 bg-indigo-600 text-white rounded-2xl shadow-lg p-6 flex gap-4 items-center justify-between">
          <div>
            <p className="text-indigo-100 text-sm font-medium">학습 목표</p>
            <h2 className="text-2xl font-bold mt-1">암호화와 복호화의 원리</h2>
            <p className="text-xs text-indigo-200 mt-2">평문이 어떤 규칙(키)에 의해 암호문으로 변환되는지 실습해 보세요.</p>
          </div>
          <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
            <BookOpen className="w-8 h-8" />
          </div>
        </div>

        {/* Tab Content */}
        <div>
          {activeTab === 'caesar' && <CaesarCipher />}
          {activeTab === 'vigenere' && <VigenereCipher />}
          {activeTab === 'transposition' && <TranspositionCipher />}
        </div>
      </main>
    </div>
  );
}
