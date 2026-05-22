import { Lock, Unlock, Heading1, CaseSensitive, Type, MousePointerClick } from 'lucide-react';
import { FontData, FontRole } from '../types';

interface FontInspectorProps {
  selectedFonts: Record<FontRole, FontData>;
  lockedFonts: Record<FontRole, boolean>;
  toggleLock: (role: FontRole) => void;
  onSelectFontRole: (role: FontRole) => void;
  isDark: boolean;
}

const roleIcons = {
  heading: <Heading1 size={16} />,
  subtitle: <CaseSensitive size={16} />,
  body: <Type size={16} />
};

export function FontInspector({ selectedFonts, lockedFonts, toggleLock, onSelectFontRole, isDark }: FontInspectorProps) {
  return (
    <div className={`fixed bottom-8 left-1/2 -translate-x-1/2 flex items-center p-2 rounded-2xl md:rounded-full shadow-2xl backdrop-blur-xl z-50 border ${isDark ? 'bg-zinc-900/90 border-zinc-700/50 text-zinc-100 shadow-black/50' : 'bg-white/90 border-zinc-200/80 text-zinc-900 shadow-zinc-200/50'}`}>
      <div className="flex flex-col md:flex-row divide-y md:divide-y-0 md:divide-x divide-solid transition-colors gap-2 md:gap-0 p-2 md:p-0 w-full" style={{ borderColor: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'}}>
        {(['heading', 'subtitle', 'body'] as FontRole[]).map((role) => (
          <div key={role} className={`flex items-center gap-4 px-4 py-2 md:py-3 w-64 md:w-56 group justify-between rounded-xl md:rounded-none transition-colors ${isDark ? 'hover:bg-white/5' : 'hover:bg-black/5'}`}>
            <button 
              onClick={() => onSelectFontRole(role)}
              className="flex items-center gap-3 overflow-hidden flex-1 text-left"
              title={`Select ${role} font`}
            >
              <div className={`flex items-center justify-center w-8 h-8 rounded-full flex-shrink-0 transition-colors ${isDark ? 'bg-zinc-800 text-zinc-400 group-hover:bg-zinc-700' : 'bg-zinc-100 text-zinc-500 group-hover:bg-zinc-200'}`}>
                {roleIcons[role]}
              </div>
              <div className="flex flex-col overflow-hidden w-full">
                <span className="flex items-center gap-1 text-[10px] uppercase tracking-wider opacity-50 font-mono leading-none mb-1 shadow-none transition-opacity group-hover:opacity-100">
                  {role} <MousePointerClick size={10} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                </span>
                <span className="text-sm font-medium truncate w-full" style={{ fontFamily: selectedFonts[role].family }}>
                  {selectedFonts[role].name}
                </span>
              </div>
            </button>
            
            <button
               onClick={() => toggleLock(role)}
               className={`transition-colors p-2 rounded-full flex-shrink-0 z-10 relative ${lockedFonts[role] ? (isDark ? 'text-black bg-white/90' : 'text-white bg-black/90') : (isDark ? 'text-zinc-500 hover:text-zinc-200 hover:bg-zinc-800' : 'text-zinc-400 hover:text-zinc-700 hover:bg-zinc-100')}`}
            >
              {lockedFonts[role] ? <Lock size={14} /> : <Unlock size={14} />}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
