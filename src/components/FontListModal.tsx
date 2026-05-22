import { X, ExternalLink } from 'lucide-react';
import { defaultFonts } from '../data/fonts';
import { FontData } from '../types';

interface FontListModalProps {
  onClose: () => void;
  isDark: boolean;
  onSelectFont?: (font: FontData) => void;
  selectingRole?: string | null;
}

export function FontListModal({ onClose, isDark, onSelectFont, selectingRole }: FontListModalProps) {
  return (
    <div className={`fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-sm transition-colors ${isDark ? 'bg-black/80' : 'bg-zinc-900/40'}`}>
      <div 
        className={`w-full max-w-4xl max-h-[85vh] flex flex-col rounded-3xl overflow-hidden shadow-2xl border ${isDark ? 'bg-[#18181B] border-zinc-700/50 text-white' : 'bg-white border-zinc-200 text-zinc-900'}`}
      >
        <div className={`flex items-center justify-between px-8 py-6 border-b ${isDark ? 'border-zinc-800' : 'border-zinc-100'}`}>
          <div className="flex flex-col">
            <h2 className="text-2xl font-semibold tracking-tight">
              {selectingRole ? `Select ${selectingRole} Font` : "Registered Fonts"}
            </h2>
            <p className={`text-sm mt-1 ${isDark ? 'text-zinc-400' : 'text-zinc-500'}`}>
              Total {defaultFonts.length} fonts available from 폰트오락실
            </p>
          </div>
          <button 
            onClick={onClose}
            className={`p-2 rounded-full transition-colors ${isDark ? 'hover:bg-zinc-800 text-zinc-400' : 'hover:bg-zinc-100 text-zinc-500'}`}
          >
            <X size={24} />
          </button>
        </div>
        
        <div className={`flex-1 overflow-y-auto p-4 md:p-8 bg-zinc-50/0`}>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
            {defaultFonts.map((font, idx) => (
              <div 
                key={idx}
                onClick={onSelectFont ? () => onSelectFont(font) : undefined}
                className={`flex flex-col p-4 rounded-2xl border transition-all ${onSelectFont ? 'cursor-pointer hover:-translate-y-1' : ''} ${isDark ? 'bg-zinc-900 border-zinc-800 hover:border-zinc-700' : 'bg-white border-zinc-200 hover:border-zinc-300 shadow-sm'}`}
              >
                <span className="font-semibold text-lg" style={{ fontFamily: `"${font.family}", sans-serif` }}>{font.name}</span>
                <span className={`text-xs font-mono mt-1 ${isDark ? 'text-zinc-500' : 'text-zinc-400'}`}>{font.family}</span>
                
                <div className={`mt-4 pt-3 flex items-center justify-between border-t ${isDark ? 'border-zinc-800' : 'border-zinc-100'}`}>
                    <span className={`text-[10px] uppercase tracking-wider ${isDark ? 'text-zinc-600' : 'text-zinc-400'}`}>
                      {onSelectFont ? "Click to Select" : "CDN / File"}
                    </span>
                    {!onSelectFont && <ExternalLink size={12} className={isDark ? 'text-zinc-600' : 'text-zinc-400'} />}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
