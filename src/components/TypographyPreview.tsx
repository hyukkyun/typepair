import { SelectedFonts, TextMode, TypeTuning } from '../types';
import { motion } from 'motion/react';
import { contentData } from '../data/content';

interface PreviewProps {
  fonts: SelectedFonts;
  isDark: boolean;
  textMode: TextMode;
  tuning?: TypeTuning;
}

export function TypographyPreview({ fonts, isDark, textMode, tuning }: PreviewProps) {
  const content = contentData[textMode];

  const containerClasses = isDark 
    ? 'bg-[#18181B] border-zinc-800 shadow-2xl shadow-black/40' 
    : 'bg-white border-zinc-200 shadow-xl shadow-zinc-200/50';

  const textClasses = isDark ? 'text-white focus:bg-zinc-800/50' : 'text-zinc-900 focus:bg-zinc-100/50';
  const subClasses = isDark ? 'text-zinc-400 focus:bg-zinc-800/50' : 'text-zinc-600 focus:bg-zinc-100/50';

  const specimenTextEn = "Aa Bb Cc Dd Ee Ff Gg Hh Ii Jj Kk Ll Mm Nn Oo Pp Qq Rr Ss Tt Uu Vv Ww Xx Yy Zz 0123456789";
  const specimenTextKo = "가 나 다 라 마 바 사 아 자 차 카 타 파 하 허 고 노 도 로 모 보 소 오 조 초 코 토 포 호 0123456789 Aa Bb Cc Dd Ee Ff Gg Hh Ii Jj Kk Ll Mm Nn Oo Pp Qq Rr Ss Tt Uu Vv Ww Xx Yy Zz";
  const specimenText = textMode === 'en' ? specimenTextEn : specimenTextKo;

  return (
    <div className="w-full flex-1 overflow-y-auto">
      <div className="w-full flex flex-col items-center gap-8 p-4 md:p-8 pb-48 min-h-max">
      {/* Brand Identity Showcase */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className={`w-full max-w-5xl shrink-0 rounded-3xl border border-solid p-8 md:p-16 lg:p-24 relative transition-colors ${containerClasses}`}
      >
        <div className="flex flex-col gap-12 relative z-10 w-full">
          <div className="flex items-center gap-3 mb-2">
            <div className={`h-px w-8 ${isDark ? 'bg-zinc-700' : 'bg-zinc-300'}`} />
            <span className={`text-[10px] md:text-xs uppercase tracking-[0.2em] font-mono ${isDark ? 'text-zinc-500' : 'text-zinc-400'}`}>
              Brand Identity Showcase
            </span>
          </div>
          
          <div className="flex flex-col lg:flex-row gap-8 w-full mt-8 mb-8">
            {/* Left Area - Logo & Slogan Combination */}
            <div className={`w-full lg:w-1/2 flex flex-col justify-center items-center text-center rounded-3xl p-12 border ${isDark ? 'bg-[#1a1a1a] border-zinc-800' : 'bg-white border-zinc-200'} shadow-sm`}>
              <div className="flex flex-col w-full gap-1">
                <div
                  contentEditable
                  suppressContentEditableWarning
                  style={{ 
                    fontFamily: `"${fonts.heading.family}", sans-serif`,
                    letterSpacing: tuning ? `${tuning.heading.letterSpacing}em` : undefined,
                    lineHeight: tuning ? tuning.heading.lineHeight : undefined,
                    fontSize: tuning ? `calc(clamp(3rem, 7vw, 4.5rem) * ${(tuning.heading.fontSize || 1.0)})` : undefined
                  }}
                  className={`text-6xl md:text-7xl font-bold tracking-tight outline-none rounded-xl hover:bg-black/5 dark:hover:bg-white/5 transition-colors px-4 py-1 -mx-4 z-10 ${textClasses}`}
                >
                  {content.brandHeading}
                </div>
                <div
                  contentEditable
                  suppressContentEditableWarning
                  style={{ 
                    fontFamily: `"${fonts.subtitle.family}", sans-serif`,
                    letterSpacing: tuning ? `${tuning.subtitle.letterSpacing}em` : '0.3em',
                    lineHeight: tuning ? tuning.subtitle.lineHeight : undefined,
                    fontSize: tuning ? `calc(clamp(0.875rem, 1.5vw, 1rem) * ${(tuning.subtitle.fontSize || 1.0)})` : undefined
                  }}
                  className={`text-sm md:text-base tracking-[0.3em] uppercase outline-none rounded-xl hover:bg-black/5 dark:hover:bg-white/5 transition-colors px-4 py-1 -mx-4 ${subClasses}`}
                >
                  {content.brandSubtitle}
                </div>
              </div>
            </div>

            {/* Right Area - Typography Specimens */}
            <div className={`w-full lg:w-1/2 flex flex-col justify-center gap-10 rounded-3xl p-8 md:p-12 border ${isDark ? 'bg-[#1a1a1a] border-zinc-800' : 'bg-white border-zinc-200'} shadow-sm`}>
              {/* Heading Font Specimen */}
              <div className="flex flex-col gap-4">
                <div className={`flex justify-between items-center border-b pb-2 ${isDark ? 'border-zinc-800' : 'border-zinc-200'}`}>
                   <span className={`text-xs md:text-sm uppercase font-mono tracking-widest ${subClasses}`}>{fonts.heading.name}</span>
                   <span className={`text-[10px] uppercase font-mono tracking-widest px-2 py-1 rounded-full border ${isDark ? 'bg-zinc-900 border-zinc-800 text-zinc-500' : 'bg-zinc-50 border-zinc-200 text-zinc-400'}`}>Heading</span>
                </div>
                <div 
                  contentEditable
                  suppressContentEditableWarning
                  style={{ 
                    fontFamily: `"${fonts.heading.family}", sans-serif`,
                    letterSpacing: tuning ? `${tuning.heading.letterSpacing}em` : undefined,
                    lineHeight: tuning ? tuning.heading.lineHeight : undefined,
                    fontSize: tuning ? `calc(clamp(1.25rem, 2vw, 1.5rem) * ${(tuning.heading.fontSize || 1.0)})` : undefined
                  }} 
                  className={`text-xl md:text-2xl break-words leading-relaxed outline-none rounded-xl hover:bg-black/5 dark:hover:bg-white/5 transition-colors p-3 -mx-3 ${textClasses}`}
                >
                  {specimenText}
                </div>
              </div>
 
              {/* Subtitle Font Specimen */}
              <div className="flex flex-col gap-4">
                <div className={`flex justify-between items-center border-b pb-2 ${isDark ? 'border-zinc-800' : 'border-zinc-200'}`}>
                   <span className={`text-xs md:text-sm uppercase font-mono tracking-widest ${subClasses}`}>{fonts.subtitle.name}</span>
                   <span className={`text-[10px] uppercase font-mono tracking-widest px-2 py-1 rounded-full border ${isDark ? 'bg-zinc-900 border-zinc-800 text-zinc-500' : 'bg-zinc-50 border-zinc-200 text-zinc-400'}`}>Subtitle</span>
                </div>
                <div 
                  contentEditable
                  suppressContentEditableWarning
                  style={{ 
                    fontFamily: `"${fonts.subtitle.family}", sans-serif`,
                    letterSpacing: tuning ? `${tuning.subtitle.letterSpacing}em` : undefined,
                    lineHeight: tuning ? tuning.subtitle.lineHeight : undefined,
                    fontSize: tuning ? `calc(clamp(1rem, 1.8vw, 1.125rem) * ${(tuning.subtitle.fontSize || 1.0)})` : undefined
                  }} 
                  className={`text-base md:text-lg break-words leading-relaxed outline-none rounded-xl hover:bg-black/5 dark:hover:bg-white/5 transition-colors p-3 -mx-3 ${textClasses}`}
                >
                  {specimenText}
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Editorial Layout */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
        className={`w-full max-w-5xl shrink-0 rounded-3xl border border-solid p-8 md:p-16 lg:p-24 transition-colors ${containerClasses}`}
      >
        <div className="flex flex-col gap-12">
          {/* Tagline / Category */}
          <div className="flex items-center gap-3">
            <div className={`h-px w-8 ${isDark ? 'bg-zinc-700' : 'bg-zinc-300'}`} />
            <span 
              className={`text-[10px] md:text-xs uppercase tracking-[0.2em] font-mono ${isDark ? 'text-zinc-500' : 'text-zinc-400'}`}
            >
              Editorial View
            </span>
          </div>

          <div className="flex flex-col gap-8 w-full max-w-3xl">
            <div className="flex flex-col relative group pb-4">
              <span className={`absolute -top-4 text-[10px] uppercase font-mono tracking-widest pl-2 mb-2 ${isDark ? 'text-zinc-500' : 'text-zinc-400'}`}>
                {fonts.heading.name}
              </span>
              <h2
                key={`h2-${textMode}`}
                contentEditable
                suppressContentEditableWarning
                style={{ 
                  fontFamily: `"${fonts.heading.family}", sans-serif`,
                  letterSpacing: tuning ? `${tuning.heading.letterSpacing}em` : undefined,
                  lineHeight: tuning ? tuning.heading.lineHeight : undefined,
                  fontSize: tuning ? `calc(clamp(2.5rem, 6vw, 4.5rem) * ${(tuning.heading.fontSize || 1.0)})` : undefined
                }}
                className={`text-5xl md:text-7xl outline-none leading-[1.1] tracking-tight rounded-2xl px-6 -mx-6 pt-6 pb-2 transition-colors ${textClasses}`}
              >
                {content.editHeading}
              </h2>
            </div>
            
            <div className="flex flex-col relative group pb-4">
              <span className={`absolute -top-4 text-[10px] uppercase font-mono tracking-widest pl-2 mb-2 ${isDark ? 'text-zinc-500' : 'text-zinc-400'}`}>
                {fonts.subtitle.name}
              </span>
              <h3
                key={`h3-${textMode}`}
                contentEditable
                suppressContentEditableWarning
                style={{ 
                  fontFamily: `"${fonts.subtitle.family}", sans-serif`,
                  letterSpacing: tuning ? `${tuning.subtitle.letterSpacing}em` : undefined,
                  lineHeight: tuning ? tuning.subtitle.lineHeight : undefined,
                  fontSize: tuning ? `calc(clamp(1.25rem, 3vw, 1.875rem) * ${(tuning.subtitle.fontSize || 1.0)})` : undefined
                }}
                className={`text-xl md:text-3xl outline-none leading-relaxed rounded-2xl px-6 -mx-6 pt-6 pb-2 transition-colors ${subClasses}`}
              >
                {content.editSubtitle}
              </h3>
            </div>
          </div>
 
          {/* Divider */}
          <div className={`w-full h-px my-2 ${isDark ? 'bg-zinc-800' : 'bg-zinc-100'}`} />
 
          <div className="columns-1 md:columns-2 gap-12 relative pt-8">
            <div className="absolute top-0 left-0">
              <span className={`text-[10px] uppercase font-mono tracking-widest pl-2 ${isDark ? 'text-zinc-500' : 'text-zinc-400'}`}>
                {fonts.body.name}
              </span>
            </div>
            <p
              key={`p2-${textMode}`}
              contentEditable
              suppressContentEditableWarning
              style={{ 
                fontFamily: `"${fonts.body.family}", sans-serif`,
                letterSpacing: tuning ? `${tuning.body.letterSpacing}em` : undefined,
                lineHeight: tuning ? tuning.body.lineHeight : undefined,
                fontSize: tuning ? `calc(clamp(1.125rem, 2vw, 1.25rem) * ${(tuning.body.fontSize || 1.0)})` : undefined
              }}
              className={`text-lg md:text-xl outline-none leading-relaxed rounded-2xl px-4 -mx-4 py-2 transition-colors ${subClasses} mb-8 break-inside-avoid mt-2 md:mt-0`}
            >
              {content.editBody1}
            </p>
 
            <p
              key={`p3-${textMode}`}
              contentEditable
              suppressContentEditableWarning
              style={{ 
                fontFamily: `"${fonts.body.family}", sans-serif`,
                letterSpacing: tuning ? `${tuning.body.letterSpacing}em` : undefined,
                lineHeight: tuning ? tuning.body.lineHeight : undefined,
                fontSize: tuning ? `calc(clamp(1.125rem, 2vw, 1.25rem) * ${(tuning.body.fontSize || 1.0)})` : undefined
              }}
              className={`text-lg md:text-xl outline-none leading-relaxed rounded-2xl px-4 -mx-4 py-2 transition-colors ${subClasses} break-inside-avoid`}
            >
              {content.editBody2}
            </p>
          </div>
        </div>
      </motion.div>
      </div>
    </div>
  );
}
