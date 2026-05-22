export interface FontData {
  name: string;
  family: string;
  url: string;
  category?: string;
}

export type FontRole = 'heading' | 'subtitle' | 'body';
export type TextMode = 'ko' | 'en' | 'mixed';
export type PairingMood = 'all' | 'warm' | 'modern' | 'bold' | 'retro';

export type SelectedFonts = Record<FontRole, FontData>;
export type LockedFonts = Record<FontRole, boolean>;

export interface TuningValues {
  letterSpacing: number; // letter spacing in em
  lineHeight: number;    // line height multiplier
  fontSize: number;      // font size scale multiplier (1.0 = 100%)
}

export type TypeTuning = Record<FontRole, TuningValues>;

