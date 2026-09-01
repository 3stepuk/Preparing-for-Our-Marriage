import React, { useState } from 'react';
import { useCourse } from '../context/CourseContext';
import { CONVERSATIONS, PARISH_INFO, COUPLES_PRAYER } from '../data/courseData';
import { ActiveTab, AppendixTab } from '../types';
import {
  Heart,
  Users,
  Calendar,
  Church,
  UserCheck,
  CheckCircle2,
  Printer,
  Sparkles,
  RotateCcw,
  ShieldCheck,
  Award,
  ArrowRight,
  Save,
  Check,
  BookOpen,
  FileText,
} from 'lucide-react';

interface ProfileViewProps {
  onOpenOptIn: () => void;
  setActiveTab: (tab: ActiveTab) => void;
  setSelectedConversationId: (id: number) => void;
  setSelectedAppendixTab: (tab: AppendixTab) => void;
}

export const ProfileView: React.FC<ProfileViewProps> = ({
  onOpenOptIn,
  setActiveTab,
  setSelectedConversationId,
  setSelectedAppendixTab,
}) => {
  const {
    profile,
    updateProfile,
    isConversationComplete,
    toggleConversationComplete,
    resetProgress,
  } = useCourse();

  const [formData, setFormData] = useState({
    partner1Name: profile.partner1Name,
    partner2Name: profile.partner2Name,
    weddingDate: profile.weddingDate,
    church: profile.church,
    priestMentor: profile.priestMentor,
    sponsorMentor: profile.sponsorMentor,
    customGoal: profile.customGoal || '',
  });

  const [savedFeedback, setSavedFeedback] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile(formData);
    setSavedFeedback(true);
    setTimeout(() => setSavedFeedback(false), 2000);
  };

  const handlePrint = () => {
    window.print();
  };

  // Progress metrics
  const convsDone = profile.completedConversations.length;
  const essentialsDone = profile.masteredEssentials.length;
  const readinessDone = profile.checkedReadiness.length;
  const discussionsDone = profile.completedDiscussions.length;

  const totalScore = Math.round(
    ((convsDone / 4) * 0.4 +
      (essentialsDone / 15) * 0.3 +
      (readinessDone / 12) * 0.2 +
      (discussionsDone / 10) * 0.1) *
      100
  );

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-10 pb-24">
      {/* Header */}
      <div className="text-center space-y-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#251B18] border border-[#C5705D]/40 text-[#DF8E7C] text-xs font-semibold uppercase">
          <Heart className="w-3.5 h-3.5" />
          <span>Couple & Parish Record</span>
        </div>
        <h1 className="font-heading text-2xl sm:text-3xl md:text-4xl font-bold text-slate-100">
          Our Preparation Record
        </h1>
        <p className="text-xs sm:text-sm text-[#A08882]">
          Track your progress, notes, and records for your meetings with the parish priest.
        </p>
      </div>

      {/* Progress Dashboard Banner */}
      <div className="bg-gradient-to-br from-[#1A1514] to-[#141212] border border-[#3E2D29] rounded-2xl p-6 sm:p-8 shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <div className="space-y-1">
            <span className="text-[11px] font-semibold text-[#C5705D] uppercase tracking-wider">
              Overall Preparation Readiness
            </span>
            <div className="flex items-baseline gap-3">
              <span className="font-heading text-3xl sm:text-4xl font-bold text-slate-100">
                {totalScore}%
              </span>
              <span className="text-xs text-slate-400">Completion index</span>
            </div>
            <p className="text-xs text-slate-400 pt-1">
              {profile.partner1Name || 'Partner 1'} & {profile.partner2Name || 'Partner 2'} •{' '}
              {profile.weddingDate ? `Wedding: ${profile.weddingDate}` : 'Wedding date pending'}
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handlePrint}
              className="px-4 py-2.5 rounded-xl bg-[#221B19] hover:bg-[#2D2320] border border-[#3B2C28] text-xs font-semibold text-[#DF8E7C] flex items-center gap-1.5 transition-all"
            >
              <Printer className="w-4 h-4" />
              <span>Print Parish Summary</span>
            </button>
          </div>
        </div>

        {/* 4 Pillars Progress Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6 pt-6 border-t border-[#29201E] text-xs">
          <div className="p-3 bg-[#171413] rounded-xl border border-[#2A201E]">
            <span className="text-[#8E7E7A] block text-[10px] uppercase font-semibold">
              Conversations
            </span>
            <span className="font-bold text-slate-100 text-sm block mt-0.5">
              {convsDone} / 4
            </span>
            <div className="w-full bg-[#261E1C] rounded-full h-1 mt-2">
              <div
                className="bg-[#C5705D] h-full rounded-full"
                style={{ width: `${(convsDone / 4) * 100}%` }}
              />
            </div>
          </div>

          <div className="p-3 bg-[#171413] rounded-xl border border-[#2A201E]">
            <span className="text-[#8E7E7A] block text-[10px] uppercase font-semibold">
              Essentials Mastered
            </span>
            <span className="font-bold text-slate-100 text-sm block mt-0.5">
              {essentialsDone} / 15
            </span>
            <div className="w-full bg-[#261E1C] rounded-full h-1 mt-2">
              <div
                className="bg-[#C5705D] h-full rounded-full"
                style={{ width: `${(essentialsDone / 15) * 100}%` }}
              />
            </div>
          </div>

          <div className="p-3 bg-[#171413] rounded-xl border border-[#2A201E]">
            <span className="text-[#8E7E7A] block text-[10px] uppercase font-semibold">
              Readiness Check (App. E)
            </span>
            <span className="font-bold text-slate-100 text-sm block mt-0.5">
              {readinessDone} / 12
            </span>
            <div className="w-full bg-[#261E1C] rounded-full h-1 mt-2">
              <div
                className="bg-[#C5705D] h-full rounded-full"
                style={{ width: `${(readinessDone / 12) * 100}%` }}
              />
            </div>
          </div>

          <div className="p-3 bg-[#171413] rounded-xl border border-[#2A201E]">
            <span className="text-[#8E7E7A] block text-[10px] uppercase font-semibold">
              Discussions (App. D)
            </span>
            <span className="font-bold text-slate-100 text-sm block mt-0.5">
              {discussionsDone} / 10
            </span>
            <div className="w-full bg-[#261E1C] rounded-full h-1 mt-2">
              <div
                className="bg-[#C5705D] h-full rounded-full"
                style={{ width: `${(discussionsDone / 10) * 100}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Profile & Mentor Details Form */}
      <div className="bg-[#141212] border border-[#2A211F] rounded-2xl p-6 sm:p-8 space-y-6 shadow-xl">
        <div className="flex items-center justify-between border-b border-[#241E1C] pb-4">
          <div className="flex items-center gap-2.5">
            <Users className="w-5 h-5 text-[#C5705D]" />
            <h2 className="font-heading text-lg font-bold text-slate-100">
              Couple & Parish Details
            </h2>
          </div>
          {savedFeedback && (
            <span className="text-emerald-400 text-xs font-semibold flex items-center gap-1">
              <Check className="w-3.5 h-3.5" /> Details saved
            </span>
          )}
        </div>

        <form onSubmit={handleSave} className="space-y-4 text-xs">
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-medium text-slate-300 mb-1">
                Partner 1 / Groom's Full Name
              </label>
              <input
                type="text"
                value={formData.partner1Name}
                onChange={(e) => setFormData({ ...formData, partner1Name: e.target.value })}
                placeholder="e.g. Michael Davies"
                className="w-full bg-[#0F0E0E] border border-[#302422] rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-[#C5705D]"
              />
            </div>

            <div>
              <label className="block font-medium text-slate-300 mb-1">
                Partner 2 / Bride's Full Name
              </label>
              <input
                type="text"
                value={formData.partner2Name}
                onChange={(e) => setFormData({ ...formData, partner2Name: e.target.value })}
                placeholder="e.g. Sarah Jenkins"
                className="w-full bg-[#0F0E0E] border border-[#302422] rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-[#C5705D]"
              />
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-medium text-slate-300 mb-1">
                Wedding Date
              </label>
              <input
                type="date"
                value={formData.weddingDate}
                onChange={(e) => setFormData({ ...formData, weddingDate: e.target.value })}
                className="w-full bg-[#0F0E0E] border border-[#302422] rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-[#C5705D]"
              />
            </div>

            <div>
              <label className="block font-medium text-slate-300 mb-1">
                Parish / Church of Marriage
              </label>
              <input
                type="text"
                value={formData.church}
                onChange={(e) => setFormData({ ...formData, church: e.target.value })}
                placeholder="e.g. St Mary's | St John Bosco | St Edward's"
                className="w-full bg-[#0F0E0E] border border-[#302422] rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-[#C5705D]"
              />
            </div>
          </div>

          {/* Mentors Grid: Priest / Deacon / Mentor & Sponsor / Mentor */}
          <div className="grid sm:grid-cols-2 gap-4 pt-2">
            <div>
              <label className="block font-medium text-slate-300 mb-1">
                Priest / Deacon / Mentor
              </label>
              <input
                type="text"
                value={formData.priestMentor}
                onChange={(e) => setFormData({ ...formData, priestMentor: e.target.value })}
                placeholder="e.g. Fr. John"
                className="w-full bg-[#0F0E0E] border border-[#302422] rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-[#C5705D]"
              />
              <p className="text-[10px] text-[#8E7E7A] mt-1">
                Priest or deacon assisting with canonical enquiry & celebration
              </p>
            </div>

            <div>
              <label className="block font-medium text-slate-300 mb-1">
                Sponsor / Mentor
              </label>
              <input
                type="text"
                value={formData.sponsorMentor}
                onChange={(e) => setFormData({ ...formData, sponsorMentor: e.target.value })}
                placeholder="e.g. David & Mary Thomas"
                className="w-full bg-[#0F0E0E] border border-[#302422] rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-[#C5705D]"
              />
              <p className="text-[10px] text-[#8E7E7A] mt-1">
                Accompanying couple or mentor from the parish
              </p>
            </div>
          </div>

          <div className="pt-2 flex justify-end">
            <button
              type="submit"
              className="px-5 py-2.5 bg-[#C5705D] text-white font-semibold rounded-xl text-xs hover:brightness-110 flex items-center gap-1.5 shadow-md shadow-[#C5705D]/20"
            >
              <Save className="w-3.5 h-3.5" />
              <span>Save Record Details</span>
            </button>
          </div>
        </form>
      </div>

      {/* Parish Registration / Father John Notification status */}
      <div className="bg-[#161312] border border-[#3A2A26] rounded-2xl p-6 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <Church className="w-4 h-4 text-[#DF8E7C]" />
              <h3 className="font-heading text-sm font-semibold text-slate-100">
                Parish Mentor Notification (Formspree)
              </h3>
            </div>
            <p className="text-xs text-slate-400">
              Direct notification to Father John (`xvkoozdo`) when commencing marriage preparation.
            </p>
          </div>

          {!profile.optInSubmitted ? (
            <button
              onClick={onOpenOptIn}
              className="px-4 py-2 bg-[#B85D42] text-white font-semibold rounded-xl text-xs hover:brightness-110 shrink-0"
            >
              Send Notification
            </button>
          ) : (
            <div className="flex items-center gap-2 text-xs text-emerald-300 bg-[#1B291F] border border-[#274632] px-3 py-1.5 rounded-xl">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Notified ({profile.optInEmail})</span>
            </div>
          )}
        </div>
      </div>

      {/* Conversations Checklist and Quick Access */}
      <div className="bg-[#141212] border border-[#2A211F] rounded-2xl p-6 sm:p-8 space-y-4">
        <h3 className="font-heading text-base font-bold text-slate-100">
          The 4 Conversations Checklist
        </h3>

        <div className="space-y-2 text-xs">
          {CONVERSATIONS.map((conv) => {
            const done = isConversationComplete(conv.id);
            return (
              <div
                key={conv.id}
                className="p-3.5 bg-[#181514] border border-[#271F1D] rounded-xl flex items-center justify-between gap-3"
              >
                <div
                  onClick={() => {
                    setSelectedConversationId(conv.id);
                    setActiveTab('conversations');
                  }}
                  className="flex items-center gap-3 cursor-pointer group flex-1"
                >
                  <span className="font-heading font-bold text-[#DF8E7C] w-6 text-center">
                    {conv.romanNumeral}.
                  </span>
                  <span className="font-medium text-slate-200 group-hover:text-[#F3D5CE] transition-colors">
                    {conv.title}
                  </span>
                </div>

                <button
                  onClick={() => toggleConversationComplete(conv.id)}
                  className={`px-2.5 py-1 rounded-lg font-medium text-xs flex items-center gap-1.5 transition-colors ${
                    done
                      ? 'bg-[#1D2B20] text-emerald-300 border border-[#294B34]'
                      : 'bg-[#221B19] text-slate-400 hover:text-slate-200'
                  }`}
                >
                  {done ? (
                    <>
                      <Check className="w-3.5 h-3.5" />
                      <span>Completed</span>
                    </>
                  ) : (
                    <span>Mark Complete</span>
                  )}
                </button>
              </div>
            );
          })}
        </div>
      </div>

      {/* Reset progress */}
      <div className="pt-6 border-t border-[#261E1C] flex justify-between items-center text-xs text-[#8E7E7A]">
        <span>Privacy note: All answers & notes are kept on this device.</span>
        <button
          onClick={resetProgress}
          className="text-rose-400 hover:text-rose-300 flex items-center gap-1 hover:underline"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Reset All Device Progress</span>
        </button>
      </div>
    </div>
  );
};
