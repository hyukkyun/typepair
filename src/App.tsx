/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { Analytics } from '@vercel/analytics/react';
import { Header } from './components/Header';
import { FontInspector } from './components/FontInspector';
import { TypographyPreview } from './components/TypographyPreview';
import { FontListModal } from './components/FontListModal';
import { defaultFonts } from './data/fonts';
import { moodPresets } from './data/moodPresets';
import { SelectedFonts, LockedFonts, FontRole, TextMode, PairingMood, TypeTuning } from './types';
import { TypeTuningPanel } from './components/TypeTuningPanel';

const DEFAULT_TUNING: TypeTuning = {
  heading: { letterSpacing: -0.02, lineHeight: 1.15, fontSize: 1.0 },
  subtitle: { letterSpacing: 0.05, lineHeight: 1.4, fontSize: 1.0 },
  body: { letterSpacing: 0, lineHeight: 1.6, fontSize: 1.0 }
};


const getRandomFont = (excludeFamilies: string[] = []) => {
  const available = defaultFonts.filter(f => !excludeFamilies.includes(f.family));
  // Fallback to the whole pool if everything is excluded
  const pool = available.length > 0 ? available : defaultFonts;
  return pool[Math.floor(Math.random() * pool.length)];
};

const getRandomFontForMood = (role: FontRole, moodId: PairingMood, excludeFamilies: string[] = []) => {
  const preset = moodPresets.find(p => p.id === moodId);
  if (!preset || preset.id === 'all') {
    return getRandomFont(excludeFamilies);
  }

  // Get active family pool for this role under the requested mood preset
  const families = role === 'heading' 
    ? preset.headings 
    : role === 'subtitle' 
      ? preset.subtitles 
      : preset.bodies;

  const filtered = defaultFonts.filter(f => families.includes(f.family) && !excludeFamilies.includes(f.family));
  
  if (filtered.length > 0) {
    return filtered[Math.floor(Math.random() * filtered.length)];
  }

  // Fallback to the active preset pool without excluding if the constraint is too tight
  const filteredWithExcludesRemoved = defaultFonts.filter(f => families.includes(f.family));
  if (filteredWithExcludesRemoved.length > 0) {
    return filteredWithExcludesRemoved[Math.floor(Math.random() * filteredWithExcludesRemoved.length)];
  }

  // Ultimate fallback to any random available font
  return getRandomFont(excludeFamilies);
};

export default function App() {
  const [fontsLoaded, setFontsLoaded] = useState(false);
  const [isFontListOpen, setIsFontListOpen] = useState(false);
  const [selectingRole, setSelectingRole] = useState<FontRole | null>(null);
  const [selectedFonts, setSelectedFonts] = useState<SelectedFonts>(() => {
    const pretendard = defaultFonts.find(f => f.family.includes('Pretendard')) || defaultFonts[0];
    const heading = getRandomFont([pretendard.family]);
    const subtitle = getRandomFont([pretendard.family, heading.family]);
    return {
      heading,
      subtitle,
      body: pretendard
    };
  });

  const [lockedFonts, setLockedFonts] = useState<LockedFonts>({
    heading: false,
    subtitle: false,
    body: false
  });

  const [selectedMood, setSelectedMood] = useState<PairingMood>('all');
  const [isDark, setIsDark] = useState(true);
  const [textMode, setTextMode] = useState<TextMode>('ko');

  const [tuning, setTuning] = useState<TypeTuning>({ ...DEFAULT_TUNING });
  const [isTuningOpen, setIsTuningOpen] = useState(false);

  const handleResetTuning = (role?: FontRole) => {
    if (role) {
      setTuning(prev => ({
        ...prev,
        [role]: { ...DEFAULT_TUNING[role] }
      }));
    } else {
      setTuning({
        heading: { ...DEFAULT_TUNING.heading },
        subtitle: { ...DEFAULT_TUNING.subtitle },
        body: { ...DEFAULT_TUNING.body }
      });
    }
  };

  useEffect(() => {
    // Inject @font-face dynamically for all standard fonts
    const style = document.createElement('style');
    const rules = defaultFonts.map(font => `
      @font-face {
        font-family: "${font.family}";
        src: url('${font.url}');
        font-weight: normal;
        font-style: normal;
        font-display: swap;
      }
    `).join('\n');
    style.textContent = rules;
    document.head.appendChild(style);
    setFontsLoaded(true);
    
    return () => {
      document.head.removeChild(style);
    };
  }, []);

  const handleGenerate = (moodOverride?: PairingMood) => {
    const activeMood = moodOverride || selectedMood;
    setSelectedFonts(prev => {
      const next = { ...prev };
      
      (['heading', 'subtitle', 'body'] as FontRole[]).forEach(role => {
        if (!lockedFonts[role]) {
          next[role] = getRandomFontForMood(role, activeMood, [next.heading.family, next.subtitle.family, next.body.family]);
        }
      });
      return next;
    });
  };

  const handleMoodChange = (mood: PairingMood) => {
    setSelectedMood(mood);
    handleGenerate(mood);
  };

  const toggleLock = (role: FontRole) => {
    setLockedFonts(prev => ({
      ...prev,
      [role]: !prev[role]
    }));
  };

  const toggleTheme = () => setIsDark(prev => !prev);
  
  const handleOpenFontList = (role?: FontRole) => {
    setSelectingRole(role || null);
    setIsFontListOpen(true);
  };
  
  const handleSelectFont = (font: any) => {
    if (selectingRole) {
      setSelectedFonts(prev => ({
        ...prev,
        [selectingRole]: font
      }));
      setSelectingRole(null);
      setIsFontListOpen(false);
    }
  };

  if (!fontsLoaded) return null;

  return (
    <div className={`flex flex-col h-screen w-full font-sans transition-colors relative ${isDark ? 'bg-[#111] text-white' : 'bg-[#FAFAFA] text-zinc-900'}`}>
      <Header 
        onGenerate={() => handleGenerate()} 
        isDark={isDark} 
        toggleTheme={toggleTheme} 
        onOpenFontList={() => handleOpenFontList()}
        textMode={textMode}
        onTextModeChange={setTextMode}
        isTuningOpen={isTuningOpen}
        onToggleTuning={() => setIsTuningOpen(prev => !prev)}
      />
      
      {/* Mood Presets Sub-Header (Mood pairing controller) */}
      <div className={`flex flex-col md:flex-row items-stretch md:items-center justify-between px-8 py-3 border-b gap-3 transition-colors shrink-0 ${
        isDark ? 'bg-[#141414] border-zinc-800/80' : 'bg-zinc-50 border-zinc-200/80'
      }`}>
        <div className="flex items-center gap-2">
          <span className={`text-[10px] uppercase font-mono tracking-widest font-semibold ${isDark ? 'text-zinc-500' : 'text-zinc-400'}`}>
            Pairing Preset
          </span>
          <span className={`hidden md:inline-block w-1.5 h-1.5 rounded-full ${isDark ? 'bg-zinc-800' : 'bg-zinc-200'}`} />
          <span className={`text-xs ${isDark ? 'text-zinc-500' : 'text-zinc-400'} hidden md:inline-block`}>
            {moodPresets.find(m => m.id === selectedMood)?.description}
          </span>
        </div>
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0 scrollbar-none">
          {moodPresets.map(m => (
            <button
              key={m.id}
              onClick={() => handleMoodChange(m.id)}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs md:text-sm font-medium transition-all duration-200 whitespace-nowrap active:scale-95 ${
                selectedMood === m.id
                  ? (isDark ? 'bg-white text-zinc-950 font-semibold shadow-md shadow-black/20' : 'bg-zinc-950 text-white font-semibold shadow-md shadow-zinc-950/10')
                  : (isDark ? 'hover:bg-zinc-800 text-zinc-400 hover:text-zinc-200 bg-zinc-900/40' : 'hover:bg-zinc-200 text-zinc-600 hover:text-zinc-900 bg-zinc-100')
              }`}
            >
              <span className="text-xs md:text-sm">{m.emoji}</span>
              <span>{m.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Side-by-side workspace: Preview on left, Tuning panel on right */}
      <div className="flex-1 flex flex-row overflow-hidden relative w-full">
        <TypographyPreview fonts={selectedFonts} isDark={isDark} textMode={textMode} tuning={tuning} />
        <TypeTuningPanel 
          fonts={selectedFonts}
          tuning={tuning}
          onChangeTuning={setTuning}
          onReset={handleResetTuning}
          isOpen={isTuningOpen}
          onClose={() => setIsTuningOpen(false)}
          isDark={isDark}
        />
      </div>

      <FontInspector 
        selectedFonts={selectedFonts} 
        lockedFonts={lockedFonts} 
        toggleLock={toggleLock} 
        onSelectFontRole={(role) => handleOpenFontList(role)}
        isDark={isDark}
      />
      {isFontListOpen && (
        <FontListModal 
          onClose={() => {
            setIsFontListOpen(false);
            setSelectingRole(null);
          }} 
          isDark={isDark} 
          onSelectFont={selectingRole ? handleSelectFont : undefined}
          selectingRole={selectingRole}
        />
      )}
      
      {/* Footer (Left) */}
      <div className={`fixed bottom-4 left-4 z-30 text-[10px] md:text-xs leading-relaxed opacity-60 hover:opacity-100 transition-opacity hidden md:block ${isDark ? 'text-zinc-400' : 'text-zinc-500'}`}>
        <p className="mb-0.5">
          made by <a href="https://instagram.com/beyondbetterbrand" target="_blank" rel="noopener noreferrer" className="underline font-medium hover:text-current">@beyondbetterbrand</a>
        </p>
        <p className="max-w-[300px]">
          버그발견, 폰트추천, 제안 및 협업은 인스타그램 DM이나 <a href="mailto:beyondbetterbrand@gmail.com" className="underline hover:text-current">beyondbetterbrand@gmail.com</a> 으로 메일보내주세요.
        </p>
      </div>

      {/* Footer (Right) */}
      <div className={`fixed bottom-4 right-4 z-30 text-[10px] md:text-xs opacity-60 hover:opacity-100 transition-opacity hidden md:block ${isDark ? 'text-zinc-400' : 'text-zinc-500'}`}>
        made by <a href="https://instagram.com/beyondbetterbrand" target="_blank" rel="noopener noreferrer" className="underline font-medium hover:text-current">@beyondbetterbrand</a>
      </div>

      <Analytics />
    </div>
  );
}
