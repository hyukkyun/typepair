import { TextMode } from '../types';

export const contentData: Record<TextMode, {
  brandHeading: string;
  brandSubtitle: string;
  brandBgLetter: string;
  editHeading: string;
  editSubtitle: string;
  editBody1: string;
  editBody2: string;
}> = {
  ko: {
    brandHeading: "브랜드",
    brandSubtitle: "브랜드슬로건",
    brandBgLetter: "브",
    editHeading: "의도를 담은 디자인",
    editSubtitle: "아름다운 타이포그래피는 디지털 프로덕트를 기능적인 것을 넘어 감성적인 울림으로 승화시킵니다.",
    editBody1: "폰트 페어링의 목표는 전반적인 테마를 공유하면서도 기분 좋은 스탠스를 가진 폰트를 선택하는 것입니다. 어떤 폰트가 잘 어울리는지는 직관의 문제이지만, 실제 레이아웃에서 확인하면 그 선택이 올바른지 즉시 판단할 수 있습니다.",
    editBody2: "아래의 인스펙터를 사용해 마음에 드는 서체를 고정해보세요. 새로운 조합을 생성하여 예상치 못한 아름다움을 발견할 수 있습니다. 텍스트는 자유롭게 수정 가능하므로 브랜드 메시지나 로컬라이징된 문안을 직접 테스트해보세요."
  },
  en: {
    brandHeading: "BRAND",
    brandSubtitle: "BRAND SLOGAN",
    brandBgLetter: "B",
    editHeading: "Designing with Intention",
    editSubtitle: "Beautiful typography elevates a digital product from purely functional to emotionally resonant.",
    editBody1: "The goal of font pairing is to select fonts that share an overarching theme yet have a pleasing contrast. Which fonts work together is largely a matter of intuition, but seeing them in a realistic layout helps validate those choices immediately.",
    editBody2: "Use the floating inspector below to lock typefaces you are satisfied with. Generate new combinations to discover unexpected harmony. The text is completely editable, allowing you to test specific brand messaging or localized copy."
  },
  mixed: {
    brandHeading: "브랜드",
    brandSubtitle: "BRAND SLOGAN",
    brandBgLetter: "브",
    editHeading: "Designing with 의도적 접근",
    editSubtitle: "Beautiful typography는 디지털 프로덕트를 기능과 감성의 조화로 이끌어냅니다.",
    editBody1: "The goal of font pairing은 전반적인 테마를 공유하면서도 기분 좋은 contrast를 가진 폰트를 선택하는 것입니다. 어떤 폰트가 잘 어울리는지는 직관의 영역이지만, realistic layout에서 확인하면 그 선택을 즉시 validate할 수 있습니다.",
    editBody2: "Use the floating inspector를 사용하여 마음에 드는 서체를 lock 해보세요. 새로운 combinations를 생성하여 unexpected harmony를 발견할 수 있습니다. 모든 텍스트는 editable하여 브랜드 메시지를 직접 테스트할 수 있습니다."
  }
};
