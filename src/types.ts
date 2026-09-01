export interface EssentialQuestion {
  id: string;
  number: number;
  question: string;
  answer: string;
  conversationNumber: number;
}

export interface ConversationData {
  id: number;
  number: number;
  romanNumeral: string;
  title: string;
  purpose: string;
  estimatedMinutes: string;
  remember: string;
  teachingParagraphs: string[];
  threeWords?: {
    unity: string;
    permanence: string;
    fruitfulness: string;
  };
  talkAboutItPrompt: string;
  essentials: EssentialQuestion[];
  prayer: string;
  togetherThisWeekPrompt: string;
  togetherThisWeekPrefix?: string;
  simpleRuleNote?: string;
}

export interface WeddingRiteStep {
  step: number;
  part: string;
  whatItMeans: string;
}

export interface DiscussionArea {
  id: string;
  area: string;
  prompt: string;
  isSafetyWarning?: boolean;
}

export interface ReadinessCheckItem {
  id: string;
  label: string;
  statement: string;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: 'canonical' | 'sacramental' | 'pastoral' | 'practical';
}

export interface RuleOfLifeItem {
  id: string;
  rhythm: string;
  practice: string;
  iconName?: string;
}

export interface CoupleProfile {
  partner1Name: string;
  partner2Name: string;
  weddingDate: string;
  church: string;
  priestMentor: string; // "Priest / Deacon / Mentor"
  sponsorMentor: string; // "Sponsor / Mentor"
  optInSubmitted: boolean;
  optInEmail: string;
  optInDate?: string;
  completedConversations: number[];
  completedDiscussions: string[];
  checkedReadiness: string[];
  masteredEssentials: number[];
  conversationNotes: Record<string, string>; // key: conv-1, conv-2, etc.
  discussionNotes: Record<string, string>; // key: area-id
  selectedHabits: string[];
  customGoal?: string;
}

export type ActiveTab = 'home' | 'conversations' | 'essentials' | 'appendices' | 'profile';
export type AppendixTab = 'A' | 'B' | 'C' | 'D' | 'E' | 'F' | 'G';
