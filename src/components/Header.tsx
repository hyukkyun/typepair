import { RefreshCw, Moon, Sun, Type, Library, SlidersHorizontal } from 'lucide-react';
import { TextMode } from '../types';

interface HeaderProps {
  onGenerate: () => void;
  isDark: boolean;
  toggleTheme: () => void;
  onOpenFontList: () => void;
  textMode: TextMode;
  onTextModeChange: (mode: TextMode) => void;
  isTuningOpen: boolean;
  onToggleTuning: () => void;
}

export function Header({ 
  onGenerate, 
  isDark, 
  toggleTheme, 
  onOpenFontList, 
  textMode, 
  onTextModeChange,
  isTuningOpen,
  onToggleTuning
}: HeaderProps) {
  return (
    <header className={`flex items-center justify-between px-8 py-5 transition-colors z-20 sticky top-0 w-full ${isDark ? 'bg-[#111] text-zinc-100' : 'bg-[#FAFAFA] text-zinc-900'}`}>
      <div className="flex items-center gap-3">
        <div className={`p-2 rounded-xl ${isDark ? 'bg-zinc-800' : 'bg-white shadow-sm border border-zinc-200'}`}>
          <Type size={20} />
        </div>
        <h1 className="font-semibold tracking-tight text-lg">TypePair</h1>
      </div>

      <div className="flex items-center gap-2 md:gap-4">
        
        <div className={`hidden md:flex items-center p-1 rounded-full ${isDark ? 'bg-zinc-800' : 'bg-zinc-100'} text-sm`}>
          <button
            onClick={() => onTextModeChange('ko')}
            className={`px-3 py-1.5 rounded-full transition-colors ${
              textMode === 'ko' 
                ? (isDark ? 'bg-zinc-700 text-white shadow-sm' : 'bg-white text-zinc-900 shadow-sm') 
                : (isDark ? 'text-zinc-400 hover:text-zinc-200' : 'text-zinc-500 hover:text-zinc-800')
            }`}
          >
            한글
          </button>
          <button
            onClick={() => onTextModeChange('en')}
            className={`px-3 py-1.5 rounded-full transition-colors ${
              textMode === 'en' 
                ? (isDark ? 'bg-zinc-700 text-white shadow-sm' : 'bg-white text-zinc-900 shadow-sm') 
                : (isDark ? 'text-zinc-400 hover:text-zinc-200' : 'text-zinc-500 hover:text-zinc-800')
            }`}
          >
            영문
          </button>
          <button
            onClick={() => onTextModeChange('mixed')}
            className={`px-3 py-1.5 rounded-full transition-colors ${
              textMode === 'mixed' 
                ? (isDark ? 'bg-zinc-700 text-white shadow-sm' : 'bg-white text-zinc-900 shadow-sm') 
                : (isDark ? 'text-zinc-400 hover:text-zinc-200' : 'text-zinc-500 hover:text-zinc-800')
            }`}
          >
            혼합
          </button>
        </div>

        <button
          onClick={onOpenFontList}
          className={`hidden md:flex items-center gap-2 px-4 py-2.5 rounded-full transition-colors text-sm font-medium ${isDark ? 'hover:bg-zinc-800 text-zinc-400 hover:text-zinc-200' : 'hover:bg-zinc-200 text-zinc-600 hover:text-zinc-900'}`}
        >
          <Library size={16} />
          Fonts List
        </button>

        <button
          onClick={onToggleTuning}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-full transition-colors text-sm font-medium ${
            isTuningOpen
              ? (isDark ? 'bg-white text-zinc-950 font-semibold shadow-md shadow-black/20' : 'bg-zinc-950 text-white font-semibold shadow-md shadow-zinc-950/10')
              : (isDark ? 'hover:bg-zinc-800 text-zinc-400 hover:text-zinc-200' : 'hover:bg-zinc-200 text-zinc-600 hover:text-zinc-900')
          }`}
        >
          <SlidersHorizontal size={16} />
          <span>Fine-Tuning</span>
        </button>
        
        <div className={`w-px h-6 mx-2 hidden md:block ${isDark ? 'bg-zinc-800' : 'bg-zinc-200'}`} />

        <button
          onClick={toggleTheme}
          className={`p-2.5 rounded-full transition-colors ${isDark ? 'hover:bg-zinc-800 text-zinc-400 hover:text-zinc-200' : 'hover:bg-zinc-200 text-zinc-500 hover:text-zinc-700'}`}
        >
          {isDark ? <Sun size={18} /> : <Moon size={18} />}
        </button>
        
        <button
          onClick={onGenerate}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-full transition-all text-sm font-medium active:scale-95 ${isDark ? 'bg-white text-black hover:bg-zinc-200 hover:scale-105' : 'bg-black text-white hover:bg-zinc-800 hover:scale-105 shadow-md shadow-black/10'}`}
        >
          <RefreshCw size={16} />
          Pair Fonts
        </button>
      </div>
    </header>
  );
}
