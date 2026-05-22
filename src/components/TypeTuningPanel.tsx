import { X, RotateCcw, SlidersHorizontal, ArrowRightLeft, Info, HelpCircle } from 'lucide-react';
import { FontRole, SelectedFonts, TypeTuning } from '../types';
import { motion, AnimatePresence } from 'motion/react';

interface TypeTuningPanelProps {
  fonts: SelectedFonts;
  tuning: TypeTuning;
  onChangeTuning: (tuning: TypeTuning) => void;
  onReset: (role?: FontRole) => void;
  isOpen: boolean;
  onClose: () => void;
  isDark: boolean;
}

const roleLabels: Record<FontRole, string> = {
  heading: 'Heads / 타이틀',
  subtitle: 'Subtitles / 서브타이틀',
  body: 'Body text / 본문',
};

const roleColors = {
  heading: 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20',
  subtitle: 'bg-blue-500/10 text-blue-500 border-blue-500/20',
  body: 'bg-indigo-500/10 text-indigo-500 border-indigo-500/20',
};

export function TypeTuningPanel({
  fonts,
  tuning,
  onChangeTuning,
  onReset,
  isOpen,
  onClose,
  isDark,
}: TypeTuningPanelProps) {
  const handleSliderChange = (role: FontRole, key: 'letterSpacing' | 'lineHeight' | 'fontSize', val: number) => {
    onChangeTuning({
      ...tuning,
      [role]: {
        ...tuning[role],
        [key]: parseFloat(val.toFixed(3)),
      },
    });
  };

  const handleStep = (role: FontRole, key: 'letterSpacing' | 'lineHeight' | 'fontSize', step: number) => {
    const current = tuning[role][key];
    const next = current + step;
    
    // Boundary guards
    let validated = next;
    if (key === 'letterSpacing') {
      validated = Math.max(-0.15, Math.min(0.40, next));
    } else if (key === 'lineHeight') {
      validated = Math.max(0.70, Math.min(3.00, next));
    } else {
      validated = Math.max(0.50, Math.min(2.50, next));
    }
    
    handleSliderChange(role, key, validated);
  };

  const getSpacingCategory = (val: number) => {
    if (val < -0.05) return { text: '초긴축 (Tight)', color: 'text-amber-500' };
    if (val < -0.01) return { text: '긴축 (Compact)', color: 'text-emerald-500' };
    if (val <= 0.01) return { text: '표준 (Standard)', color: 'text-zinc-400' };
    if (val <= 0.1) return { text: '여유 (Spacious)', color: 'text-blue-500' };
    return { text: '개방 (Wide-Air)', color: 'text-purple-500' };
  };

  const getHeightCategory = (val: number) => {
    if (val < 1.0) return { text: '중첩성 (Stacked)', color: 'text-red-400 font-bold' };
    if (val < 1.25) return { text: '타이틀 최적 (Heading-Fit)', color: 'text-emerald-500 font-medium' };
    if (val < 1.5) return { text: '서브타이틀 최적 (Sub-Fit)', color: 'text-blue-400' };
    if (val <= 1.8) return { text: '본문 최적 (Reading-Ratio)', color: 'text-zinc-300' };
    return { text: '시적인 여백 (Poetic-Flow)', color: 'text-purple-400' };
  };

  const getFontSizeCategory = (val: number) => {
    if (val < 0.70) return { text: '초미세 (Micro)', color: 'text-amber-500' };
    if (val < 0.95) return { text: '소형 (Sub-Size)', color: 'text-blue-500' };
    if (val <= 1.05) return { text: '기본 (Base)', color: 'text-zinc-400' };
    if (val <= 1.40) return { text: '확대 (Display-Up)', color: 'text-emerald-500 font-medium' };
    return { text: '대형 (Grand-Scale)', color: 'text-purple-600 font-semibold' };
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          id="type-tuning-sidebar"
          initial={{ x: '100%', opacity: 0.8 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: '100%', opacity: 0.8 }}
          transition={{ type: 'spring', damping: 26, stiffness: 220 }}
          className={`fixed md:relative top-0 right-0 h-full w-[360px] md:w-[380px] z-40 flex flex-col border-l shrink-0 shadow-2xl transition-colors ${
            isDark
              ? 'bg-[#141414]/95 border-zinc-800 text-zinc-100 shadow-black/80'
              : 'bg-white/95 border-zinc-200 text-zinc-950 shadow-zinc-300/40'
          } backdrop-blur-xl`}
        >
          {/* Header */}
          <div className={`p-6 border-b flex items-center justify-between shrink-0 ${isDark ? 'border-zinc-800' : 'border-zinc-100'}`}>
            <div className="flex items-center gap-2.5">
              <div className={`p-1.5 rounded-lg ${isDark ? 'bg-zinc-800 text-zinc-400' : 'bg-zinc-100 text-zinc-600'}`}>
                <SlidersHorizontal size={14} />
              </div>
              <div>
                <h3 className="font-semibold text-sm tracking-tight">Type Fine-Tuning</h3>
                <p className={`text-[10px] font-mono ${isDark ? 'text-zinc-500' : 'text-zinc-400'} uppercase mt-0.5`}>
                  미세 타이포 조정
                </p>
              </div>
            </div>
            
            <div className="flex items-center gap-1">
              <button
                onClick={() => onReset()}
                title="전체 초기화"
                className={`p-2 rounded-lg transition-colors active:scale-95 ${
                  isDark ? 'hover:bg-zinc-800 text-zinc-400 hover:text-zinc-200' : 'hover:bg-zinc-100 text-zinc-600 hover:text-zinc-900'
                }`}
              >
                <RotateCcw size={14} />
              </button>
              <button
                onClick={onClose}
                className={`p-2 rounded-lg transition-colors active:scale-95 ${
                  isDark ? 'hover:bg-zinc-800 text-zinc-400 hover:text-zinc-200' : 'hover:bg-zinc-100 text-zinc-600 hover:text-zinc-900'
                }`}
              >
                <X size={15} />
              </button>
            </div>
          </div>

          {/* Body Section */}
          <div className="flex-1 overflow-y-auto p-6 space-y-8 scrollbar-none pb-24">
            
            {/* Guide Info Banner */}
            <div className={`p-3.5 rounded-xl text-xs leading-relaxed border flex items-start gap-2.5 ${
              isDark ? 'bg-zinc-900/40 border-zinc-800 text-zinc-400' : 'bg-zinc-50 border-zinc-200/60 text-zinc-500'
            }`}>
              <Info size={14} className="shrink-0 mt-0.5 text-zinc-400" />
              <p>
                서체 종류 자체의 어울림을 넘어, <strong className={isDark ? 'text-zinc-200' : 'text-zinc-800'}>크기(Scale)</strong>, <strong className={isDark ? 'text-zinc-200' : 'text-zinc-800'}>자간(Spacing)</strong>, 그리고 <strong className={isDark ? 'text-zinc-200' : 'text-zinc-800'}>줄간격(Height)</strong>을 직접 조율해 독창적이고 균형감 있는 최고의 텍스트 질감을 빚어낼 수 있습니다.
              </p>
            </div>

            {(['heading', 'subtitle', 'body'] as FontRole[]).map((role) => {
              const roleTuning = tuning[role];
              const fontObj = fonts[role];
              const spacingCat = getSpacingCategory(roleTuning.letterSpacing);
              const heightCat = getHeightCategory(roleTuning.lineHeight);
              const sizeCat = getFontSizeCategory(roleTuning.fontSize || 1.0);

              return (
                <div key={role} className="space-y-4">
                  {/* Category Header */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className={`text-[10px] font-mono uppercase font-bold px-2 py-0.5 rounded border tracking-wider ${roleColors[role]}`}>
                        {roleLabels[role]}
                      </span>
                      <span className={`text-[11px] truncate max-w-[140px] font-medium ${isDark ? 'text-zinc-400' : 'text-zinc-500'}`}>
                        {fontObj.name}
                      </span>
                    </div>
                    <button
                      onClick={() => onReset(role)}
                      className={`text-[10px] flex items-center gap-1 font-mono transition-colors ${
                        isDark ? 'text-zinc-500 hover:text-zinc-300' : 'text-zinc-400 hover:text-zinc-600'
                      }`}
                    >
                      <RotateCcw size={10} /> Reset
                    </button>
                  </div>

                  {/* Tuning Box */}
                  <div className={`rounded-2xl p-4 space-y-5 border transition-all ${
                    isDark ? 'bg-[#1b1b1b]/50 border-zinc-800/80 hover:border-zinc-700/80' : 'bg-zinc-50/60 border-zinc-200/50 hover:border-zinc-300/60'
                  }`}>
                    
                    {/* 1. Font Size (글자 크기 비율) */}
                    <div className="space-y-1.5">
                      <div className="flex items-center justify-between text-xs font-mono">
                        <span className={isDark ? 'text-zinc-400' : 'text-zinc-600'}>Font Size (크기 비율)</span>
                        <div className="flex items-center gap-1.5 font-semibold">
                          <span className={`${sizeCat.color} text-[10px] transition-colors font-sans`}>{sizeCat.text}</span>
                          <span className={isDark ? 'text-white' : 'text-zinc-950'}>{Math.round((roleTuning.fontSize || 1.0) * 100)}%</span>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-3">
                        <button
                          onClick={() => handleStep(role, 'fontSize', -0.05)}
                          className={`w-7 h-7 rounded-lg flex items-center justify-center font-mono text-sm border hover:scale-105 active:scale-95 transition-all ${
                            isDark ? 'bg-zinc-800 border-zinc-700 text-zinc-400 hover:text-white' : 'bg-white border-zinc-200 text-zinc-500 hover:text-black'
                          }`}
                        >
                          -
                        </button>
                        
                        <input
                          type="range"
                          min="0.50"
                          max="2.50"
                          step="0.05"
                          value={roleTuning.fontSize || 1.0}
                          onChange={(e) => handleSliderChange(role, 'fontSize', parseFloat(e.target.value))}
                          className="flex-1 h-1.5 rounded-lg appearance-none cursor-pointer bg-zinc-300 dark:bg-zinc-800 accent-zinc-500 dark:accent-white"
                        />
                        
                        <button
                          onClick={() => handleStep(role, 'fontSize', 0.05)}
                          className={`w-7 h-7 rounded-lg flex items-center justify-center font-mono text-sm border hover:scale-105 active:scale-95 transition-all ${
                            isDark ? 'bg-zinc-800 border-zinc-700 text-zinc-400 hover:text-white' : 'bg-white border-zinc-200 text-zinc-500 hover:text-black'
                          }`}
                        >
                          +
                        </button>
                      </div>
                    </div>

                    {/* 2. Letter Spacing (자간) */}
                    <div className="space-y-1.5">
                      <div className="flex items-center justify-between text-xs font-mono">
                        <span className={isDark ? 'text-zinc-400' : 'text-zinc-600'}>Letter Spacing (자간)</span>
                        <div className="flex items-center gap-1.5 font-semibold">
                          <span className={`${spacingCat.color} text-[10px] transition-colors font-sans`}>{spacingCat.text}</span>
                          <span className={isDark ? 'text-white' : 'text-zinc-950'}>{roleTuning.letterSpacing > 0 ? `+${roleTuning.letterSpacing.toFixed(3)}` : roleTuning.letterSpacing.toFixed(3)}em</span>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-3">
                        <button
                          onClick={() => handleStep(role, 'letterSpacing', -0.005)}
                          className={`w-7 h-7 rounded-lg flex items-center justify-center font-mono text-sm border hover:scale-105 active:scale-95 transition-all ${
                            isDark ? 'bg-zinc-800 border-zinc-700 text-zinc-400 hover:text-white' : 'bg-white border-zinc-200 text-zinc-500 hover:text-black'
                          }`}
                        >
                          -
                        </button>
                        
                        <input
                          type="range"
                          min="-0.15"
                          max="0.40"
                          step="0.005"
                          value={roleTuning.letterSpacing}
                          onChange={(e) => handleSliderChange(role, 'letterSpacing', parseFloat(e.target.value))}
                          className="flex-1 h-1.5 rounded-lg appearance-none cursor-pointer bg-zinc-300 dark:bg-zinc-800 accent-zinc-500 dark:accent-white"
                        />
                        
                        <button
                          onClick={() => handleStep(role, 'letterSpacing', 0.005)}
                          className={`w-7 h-7 rounded-lg flex items-center justify-center font-mono text-sm border hover:scale-105 active:scale-95 transition-all ${
                            isDark ? 'bg-zinc-800 border-zinc-700 text-zinc-400 hover:text-white' : 'bg-white border-zinc-200 text-zinc-500 hover:text-black'
                          }`}
                        >
                          +
                        </button>
                      </div>
                    </div>

                    {/* 3. Line Height (행간) */}
                    <div className="space-y-1.5">
                      <div className="flex items-center justify-between text-xs font-mono">
                        <span className={isDark ? 'text-zinc-400' : 'text-zinc-600'}>Line Height (줄간격)</span>
                        <div className="flex items-center gap-1.5 font-semibold">
                          <span className={`${heightCat.color} text-[10px] transition-colors font-sans`}>{heightCat.text}</span>
                          <span className={isDark ? 'text-white' : 'text-zinc-950'}>{roleTuning.lineHeight.toFixed(2)}</span>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-3">
                        <button
                          onClick={() => handleStep(role, 'lineHeight', -0.05)}
                          className={`w-7 h-7 rounded-lg flex items-center justify-center font-mono text-sm border hover:scale-105 active:scale-95 transition-all ${
                            isDark ? 'bg-zinc-800 border-zinc-700 text-zinc-400 hover:text-white' : 'bg-white border-zinc-200 text-zinc-500 hover:text-black'
                          }`}
                        >
                          -
                        </button>
                        
                        <input
                          type="range"
                          min="0.70"
                          max="3.00"
                          step="0.05"
                          value={roleTuning.lineHeight}
                          onChange={(e) => handleSliderChange(role, 'lineHeight', parseFloat(e.target.value))}
                          className="flex-1 h-1.5 rounded-lg appearance-none cursor-pointer bg-zinc-300 dark:bg-zinc-800 accent-zinc-500 dark:accent-white"
                        />
                        
                        <button
                          onClick={() => handleStep(role, 'lineHeight', 0.05)}
                          className={`w-7 h-7 rounded-lg flex items-center justify-center font-mono text-sm border hover:scale-105 active:scale-95 transition-all ${
                            isDark ? 'bg-zinc-800 border-zinc-700 text-zinc-400 hover:text-white' : 'bg-white border-zinc-200 text-zinc-500 hover:text-black'
                          }`}
                        >
                          +
                        </button>
                      </div>
                    </div>

                  </div>
                </div>
              );
            })}
          </div>

          {/* Footer stats overview */}
          <div className={`p-4 border-t text-[10px] font-mono text-zinc-500 flex items-center justify-between shrink-0 absolute bottom-0 left-0 w-full ${
            isDark ? 'bg-[#141414] border-zinc-800' : 'bg-white border-zinc-150'
          }`}>
            <span>ACTIVE TUNES: 3</span>
            <span className="opacity-60">PRECISION: SUB-EM</span>
          </div>

        </motion.div>
      )}
    </AnimatePresence>
  );
}
