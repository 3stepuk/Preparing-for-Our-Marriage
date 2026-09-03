import React, { createContext, useContext, useEffect, useState } from 'react';
import { CoupleProfile } from '../types';

const STORAGE_KEY = 'catholic_marriage_prep_state_v1';

const defaultProfile: CoupleProfile = {
  partner1Name: '',
  partner2Name: '',
  weddingDate: '',
  church: "St Mary's | St John Bosco | St Edward's Parish",
  priestMentor: 'Fr. John',
  sponsorMentor: '',
  optInSubmitted: false,
  optInEmail: '',
  completedConversations: [],
  completedDiscussions: [],
  checkedReadiness: [],
  masteredEssentials: [],
  conversationNotes: {},
  discussionNotes: {},
  selectedHabits: ['rule-daily', 'rule-weekly'],
  customGoal: '',
};

interface CourseContextType {
  profile: CoupleProfile;
  updateProfile: (updates: Partial<CoupleProfile>) => void;
  exportData: () => string;
  importData: (jsonStr: string) => boolean;
  toggleConversationComplete: (num: number) => void;
  isConversationComplete: (num: number) => boolean;
  toggleDiscussionComplete: (id: string) => void;
  isDiscussionComplete: (id: string) => boolean;
  toggleReadinessCheck: (id: string) => void;
  isReadinessChecked: (id: string) => boolean;
  toggleMasteredEssential: (num: number) => void;
  isEssentialMastered: (num: number) => boolean;
  setConversationNote: (convKey: string, note: string) => void;
  setDiscussionNote: (discKey: string, note: string) => void;
  toggleHabit: (habitId: string) => void;
  resetProgress: () => void;
  sendOptInNotification: (data: {
    name: string;
    partnerName: string;
    email: string;
    weddingDate: string;
    church: string;
    priestMentor: string;
    sponsorMentor: string;
    message?: string;
  }) => Promise<{ success: boolean; error?: string }>;
}

const CourseContext = createContext<CourseContextType | null>(null);

export const CourseProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [profile, setProfile] = useState<CoupleProfile>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        return { ...defaultProfile, ...JSON.parse(saved) };
      }
    } catch {
      // ignore JSON parse error
    }
    return defaultProfile;
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(profile));
    } catch {
      // ignore
    }
  }, [profile]);

  const updateProfile = (updates: Partial<CoupleProfile>) => {
    setProfile((prev) => ({ ...prev, ...updates }));
  };

  const exportData = (): string => {
    return JSON.stringify({
      profile,
      exportedAt: new Date().toISOString(),
      version: '1.0.0',
      app: 'Preparing for Our Marriage',
    }, null, 2);
  };

  const importData = (jsonStr: string): boolean => {
    try {
      const parsed = JSON.parse(jsonStr);
      if (parsed && typeof parsed === 'object') {
        const imported = parsed.profile || parsed;
        setProfile((prev) => ({ ...defaultProfile, ...prev, ...imported }));
        return true;
      }
    } catch {
      // ignore parse errors
    }
    return false;
  };

  const toggleConversationComplete = (num: number) => {
    setProfile((prev) => {
      const exists = prev.completedConversations.includes(num);
      const updated = exists
        ? prev.completedConversations.filter((n) => n !== num)
        : [...prev.completedConversations, num];
      return { ...prev, completedConversations: updated };
    });
  };

  const isConversationComplete = (num: number) => {
    return profile.completedConversations.includes(num);
  };

  const toggleDiscussionComplete = (id: string) => {
    setProfile((prev) => {
      const exists = prev.completedDiscussions.includes(id);
      const updated = exists
        ? prev.completedDiscussions.filter((d) => d !== id)
        : [...prev.completedDiscussions, id];
      return { ...prev, completedDiscussions: updated };
    });
  };

  const isDiscussionComplete = (id: string) => {
    return profile.completedDiscussions.includes(id);
  };

  const toggleReadinessCheck = (id: string) => {
    setProfile((prev) => {
      const exists = prev.checkedReadiness.includes(id);
      const updated = exists
        ? prev.checkedReadiness.filter((c) => c !== id)
        : [...prev.checkedReadiness, id];
      return { ...prev, checkedReadiness: updated };
    });
  };

  const isReadinessChecked = (id: string) => {
    return profile.checkedReadiness.includes(id);
  };

  const toggleMasteredEssential = (num: number) => {
    setProfile((prev) => {
      const exists = prev.masteredEssentials.includes(num);
      const updated = exists
        ? prev.masteredEssentials.filter((m) => m !== num)
        : [...prev.masteredEssentials, num];
      return { ...prev, masteredEssentials: updated };
    });
  };

  const isEssentialMastered = (num: number) => {
    return profile.masteredEssentials.includes(num);
  };

  const setConversationNote = (convKey: string, note: string) => {
    setProfile((prev) => ({
      ...prev,
      conversationNotes: { ...prev.conversationNotes, [convKey]: note },
    }));
  };

  const setDiscussionNote = (discKey: string, note: string) => {
    setProfile((prev) => ({
      ...prev,
      discussionNotes: { ...prev.discussionNotes, [discKey]: note },
    }));
  };

  const toggleHabit = (habitId: string) => {
    setProfile((prev) => {
      const exists = prev.selectedHabits.includes(habitId);
      const updated = exists
        ? prev.selectedHabits.filter((h) => h !== habitId)
        : [...prev.selectedHabits, habitId];
      return { ...prev, selectedHabits: updated };
    });
  };

  const resetProgress = () => {
    if (window.confirm('Are you sure you want to reset all preparation progress and notes on this device?')) {
      setProfile(defaultProfile);
      try {
        localStorage.removeItem(STORAGE_KEY);
      } catch {
        // ignore
      }
    }
  };

  const sendOptInNotification = async (data: {
    name: string;
    partnerName: string;
    email: string;
    weddingDate: string;
    church: string;
    priestMentor: string;
    sponsorMentor: string;
    message?: string;
  }) => {
    try {
      const response = await fetch('https://formspree.io/f/xvkoozdo', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          module: 'Preparing for Our Marriage — Catholic Couple Preparation',
          partner1: data.name,
          partner2: data.partnerName,
          email: data.email,
          weddingDate: data.weddingDate,
          church: data.church,
          priestMentor: data.priestMentor,
          sponsorMentor: data.sponsorMentor,
          message: data.message || 'Couple has commenced marriage preparation module.',
          timestamp: new Date().toISOString(),
        }),
      });

      if (response.ok) {
        updateProfile({
          partner1Name: data.name || profile.partner1Name,
          partner2Name: data.partnerName || profile.partner2Name,
          optInSubmitted: true,
          optInEmail: data.email,
          weddingDate: data.weddingDate || profile.weddingDate,
          church: data.church || profile.church,
          priestMentor: data.priestMentor || profile.priestMentor,
          sponsorMentor: data.sponsorMentor || profile.sponsorMentor,
          optInDate: new Date().toLocaleDateString(),
        });
        return { success: true };
      } else {
        const errorData = await response.json().catch(() => ({}));
        return {
          success: false,
          error: errorData.error || 'Failed to submit notification to parish mentor.',
        };
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Network error';
      return { success: false, error: msg };
    }
  };

  return (
    <CourseContext.Provider
      value={{
        profile,
        updateProfile,
        exportData,
        importData,
        toggleConversationComplete,
        isConversationComplete,
        toggleDiscussionComplete,
        isDiscussionComplete,
        toggleReadinessCheck,
        isReadinessChecked,
        toggleMasteredEssential,
        isEssentialMastered,
        setConversationNote,
        setDiscussionNote,
        toggleHabit,
        resetProgress,
        sendOptInNotification,
      }}
    >
      {children}
    </CourseContext.Provider>
  );
};

export const useCourse = () => {
  const context = useContext(CourseContext);
  if (!context) {
    throw new Error('useCourse must be used within a CourseProvider');
  }
  return context;
};
