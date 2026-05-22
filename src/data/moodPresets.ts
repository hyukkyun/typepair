import { PairingMood } from '../types';

export interface MoodPreset {
  id: PairingMood;
  label: string;
  emoji: string;
  description: string;
  headings: string[];    // Font family names
  subtitles: string[];   // Font family names
  bodies: string[];      // Font family names
}

export const moodPresets: MoodPreset[] = [
  {
    id: 'all',
    label: '자유 조합',
    emoji: '🎲',
    description: '모든 서체 풀에서 자유롭고 과감하게 매칭합니다.',
    headings: [],
    subtitles: [],
    bodies: []
  },
  {
    id: 'warm',
    label: '따뜻함 & 감성',
    emoji: '🌸',
    description: '공방 손글씨, 산들바람, 정다운 대화가 연상되는 서정적 조합입니다.',
    headings: [
      'Ongle_ParkDaHyun',
      'LeeSeoyun',
      'PoliceEmotion',
      'Kyobo2025LeeYubin',
      'MemomentKukkuk',
      'Ongle_Uiyeon',
      'Ongle_Positivity',
      'OmuDayeppeum',
      'MeetMe',
      'RomanticGumi',
      'ElegantSerif',
      'NotoSerifKR',
      'RidiBatang',
      'ZenSerif'
    ],
    subtitles: [
      'Ongle_Konkon',
      'GangwonEduAll',
      'Yeongwol',
      'RidiBatang',
      'S-CoreDream-3Light',
      'Kyobo2025LeeYubin',
      'LeeSeoyun'
    ],
    bodies: [
      'Pretendard-Regular',
      'NanumSquareRound',
      'RidiBatang'
    ]
  },
  {
    id: 'modern',
    label: '미니멀 & 모던',
    emoji: '📐',
    description: '군더더기 없는 레이아웃과 정갈한 실루엣의 도시적인 조합입니다.',
    headings: [
      'Paperlogy-Bold',
      'GmarketSansMedium',
      'NanumSquareNeo-Variable',
      'TheJamsil',
      'S-CoreDream-3Light',
      'MapleStory',
      'PartialSans',
      'GyeonggiTitle',
      'LaundryGothic',
      'HSJandari'
    ],
    subtitles: [
      'NanumSquareNeo-Variable',
      'S-CoreDream-3Light',
      'LaundryGothic',
      'GangwonEduAll',
      'NEXONLv1GothicOTF'
    ],
    bodies: [
      'Pretendard-Regular',
      'NanumSquareNeo-Variable',
      'NEXONLv1GothicOTF'
    ]
  },
  {
    id: 'bold',
    label: '강렬함 & 개성',
    emoji: '⚡',
    description: '시선을 확 사로잡는 묵직하고 활기찬 타이포그래피 자극입니다.',
    headings: [
      'Jalnan',
      'SBAggroB',
      'Cafe24Ssurround',
      'KBLJumpExtended',
      'TmonMonsori',
      'Yangjin',
      'WildGak',
      'ChangwonDangamAsak',
      'GangwonEduStrong'
    ],
    subtitles: [
      'JalnanGothic',
      'NanumSquareNeo-Variable',
      'PyeongChangPeace-Bold',
      'ONEMobilePOP',
      'S-CoreDream-3Light'
    ],
    bodies: [
      'Pretendard-Regular',
      'NanumSquareNeo-Variable',
      'NEXONLv1GothicOTF'
    ]
  },
  {
    id: 'retro',
    label: '레트로 & 아날로그',
    emoji: '💾',
    description: '타자기 자국, 빈티지 사인보드, 픽셀 감성이 깃든 노스탤지어 조합입니다.',
    headings: [
      'Fixedsys',
      'JejuDoldam',
      'BMJUA',
      'BMDOHYEON',
      'GabiaDunn-Regular',
      'Independence',
      'VictoryDay',
      'OKGUNG',
      'PoliceFair'
    ],
    subtitles: [
      'SlowGothic',
      'SchoolSafeNotices',
      'SchoolSafeRoundSmile',
      'Binggrae',
      'CookieRun-Regular',
      'ONEMobilePOP'
    ],
    bodies: [
      'NanumSquareRound',
      'Pretendard-Regular',
      'Fixedsys'
    ]
  }
];
