import React, { useState } from 'react';
import { useCourse } from '../context/CourseContext';
import { CONVERSATIONS } from '../data/courseData';
import { ActiveTab, AppendixTab } from '../types';
import {
  BookOpen,
  CheckCircle2,
  Circle,
  Clock,
  MessageSquare,
  Sparkles,
  Heart,
  Calendar,
  ArrowLeft,
  ArrowRight,
  Copy,
  Check,
  Eye,
  EyeOff,
  Share2,
  Bookmark,
  FileEdit,
} from 'lucide-react';

interface ConversationViewProps {
  conversationId: number;
  setConversationId: (id: number) => void;
  setActiveTab: (tab: ActiveTab) => void;
  setSelectedAppendixTab: (tab: AppendixTab) => void;
}

export const ConversationView: React.FC<ConversationViewProps> = ({
  conversationId,
  setConversationId,
  setActiveTab,
  setSelectedAppendixTab,
}) => {
  const {
    profile,
    toggleConversationComplete,
    isConversationComplete,
    isEssentialMastered,
    toggleMasteredEssential,
    setConversationNote,
  } = useCourse();

  const conversation =
    CONVERSATIONS.find((c) => c.id === conversationId) || CONVERSATIONS[0];

  const isCompleted = isConversationComplete(conversation.id);
  const noteKey = `conv-${conversation.id}`;
  const currentNote = profile.conversationNotes[noteKey] || '';

  const [revealedEssentials, setRevealedEssentials] = useState<Record<string, boolean>>({});
  const [copiedPrayer, setCopiedPrayer] = useState(false);
  const [noteSavedFeedback, setNoteSavedFeedback] = useState(false);

  const toggleRevealEssential = (id: string) => {
    setRevealedEssentials((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleCopyPrayer = () => {
    navigator.clipboard.writeText(conversation.prayer);
    setCopiedPrayer(true);
    setTimeout(() => setCopiedPrayer(false), 2000);
  };

  const handleNoteChange = (text: string) => {
    setConversationNote(noteKey, text);
    setNoteSavedFeedback(true);
    setTimeout(() => setNoteSavedFeedback(false), 1500);
  };

  const prevConv = CONVERSATIONS.find((c) => c.id === conversation.id - 1);
  const nextConv = CONVERSATIONS.find((c) => c.id === conversation.id + 1);

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-10 pb-20">
      {/* Top Breadcrumb & Step Navigation */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-4">
        <button
          onClick={() => setActiveTab('home')}
          className="inline-flex items-center gap-1.5 text-[10px] uppercase tracking-widest text-[#A08882] hover:text-[#DF8E7C] transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Overview</span>
        </button>

        {/* 4 Conversations Step Indicator Buttons */}
        <div className="flex items-center gap-1.5">
          {CONVERSATIONS.map((c) => {
            const isDone = isConversationComplete(c.id);
            const isCurrent = c.id === conversation.id;
            return (
              <button
                key={c.id}
                id={`conv-nav-pill-${c.id}`}
                onClick={() => setConversationId(c.id)}
                className={`px-3 py-1.5 text-[10px] uppercase tracking-wider font-semibold flex items-center gap-1.5 transition-all cursor-pointer rounded ${
                  isCurrent
                    ? 'bg-[#B85D42] text-white shadow-md'
                    : isDone
                    ? 'bg-[#1C261F] text-emerald-300 border border-[#274632]'
                    : 'bg-[#161616] text-slate-400 border border-white/5 hover:text-slate-200'
                }`}
              >
                <span>Conv. {c.romanNumeral}</span>
                {isDone && <Check className="w-3 h-3 text-emerald-400" />}
              </button>
            );
          })}
        </div>
      </div>

      {/* Conversation Header */}
      <div className="space-y-3">
        <div className="flex flex-wrap items-center gap-2 text-xs font-semibold">
          <span className="px-2.5 py-0.5 rounded bg-[#1C1C1C] text-[#B85D42] border border-white/10 text-[9px] uppercase tracking-widest font-bold">
            CONVERSATION {conversation.romanNumeral}
          </span>
          <span className="text-[10px] text-slate-500 uppercase tracking-widest flex items-center gap-1">
            <Clock className="w-3 h-3 text-[#B85D42]" />
            Allow {conversation.estimatedMinutes} together
          </span>
        </div>

        <h1 className="text-3xl sm:text-4xl md:text-5xl text-white font-serif font-normal leading-tight">
          {conversation.title}
        </h1>
        <p className="text-base text-[#DF8E7C] italic font-serif">
          {conversation.purpose}
        </p>

        {/* Mark Completed Toggle */}
        <div className="pt-2">
          <button
            id={`mark-complete-btn-${conversation.id}`}
            onClick={() => toggleConversationComplete(conversation.id)}
            className={`inline-flex items-center gap-2 px-4 py-2 rounded text-[10px] uppercase tracking-widest font-semibold transition-all cursor-pointer ${
              isCompleted
                ? 'bg-[#1C261F] text-emerald-300 border border-[#274632]'
                : 'bg-[#161616] text-[#DF8E7C] border border-white/10 hover:border-[#B85D42]'
            }`}
          >
            {isCompleted ? (
              <>
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                <span>Marked as Completed by Couple</span>
              </>
            ) : (
              <>
                <Circle className="w-3.5 h-3.5 text-[#B85D42]" />
                <span>Mark Chapter as Completed</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* 1. REMEMBER BANNER */}
      <section className="bg-[#161616] border-l-2 border-[#B85D42] border-y border-r border-white/5 rounded-r-lg p-5 sm:p-6 shadow-xl relative overflow-hidden">
        <div className="flex items-start gap-3">
          <div className="px-2 py-0.5 rounded bg-[#B85D42] text-white text-[9px] font-bold uppercase tracking-widest shrink-0 mt-0.5">
            REMEMBER
          </div>
          <p className="font-serif-body text-slate-100 text-base sm:text-lg leading-relaxed">
            {conversation.remember}
          </p>
        </div>
      </section>

      {/* 2. SHORT TEACHING (Read Together Slowly) */}
      <section className="bg-[#161616] border border-white/10 rounded-lg p-6 sm:p-8 space-y-6 shadow-xl">
        <div className="flex items-center justify-between border-b border-white/5 pb-3">
          <div className="flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-[#B85D42]" />
            <h2 className="text-[10px] uppercase tracking-[0.2em] text-[#B85D42] font-bold">
              Short Teaching
            </h2>
          </div>
          <span className="text-[11px] text-[#8E7E7A] italic font-serif">Read together slowly</span>
        </div>

        <div className="font-serif-body text-slate-200 text-base sm:text-lg space-y-5 leading-relaxed">
          {conversation.teachingParagraphs.map((para, idx) => (
            <p key={idx}>{para}</p>
          ))}
        </div>

        {/* Highlight for Conversation 1 Three Words */}
        {conversation.threeWords && (
          <div className="mt-6 pt-4 border-t border-white/5 grid sm:grid-cols-3 gap-3 text-xs">
            <div className="p-4 bg-[#1C1C1C] rounded border-t-2 border-[#B85D42]">
              <span className="text-[10px] uppercase tracking-widest font-bold text-[#DF8E7C] block mb-1">
                Unity
              </span>
              <p className="text-slate-300 font-serif leading-relaxed">{conversation.threeWords.unity}</p>
            </div>
            <div className="p-4 bg-[#1C1C1C] rounded border-t-2 border-[#B85D42]">
              <span className="text-[10px] uppercase tracking-widest font-bold text-[#DF8E7C] block mb-1">
                Permanence
              </span>
              <p className="text-slate-300 font-serif leading-relaxed">{conversation.threeWords.permanence}</p>
            </div>
            <div className="p-4 bg-[#1C1C1C] rounded border-t-2 border-[#B85D42]">
              <span className="text-[10px] uppercase tracking-widest font-bold text-[#DF8E7C] block mb-1">
                Fruitfulness
              </span>
              <p className="text-slate-300 font-serif leading-relaxed">{conversation.threeWords.fruitfulness}</p>
            </div>
          </div>
        )}
      </section>

      {/* 3. TALK ABOUT IT & Interactive Couple Reflection Notes */}
      <section className="bg-[#161616] border border-white/10 rounded-lg p-6 sm:p-8 space-y-5 shadow-xl">
        <div className="flex items-center gap-2 text-[#B85D42]">
          <MessageSquare className="w-4 h-4" />
          <h2 className="text-[10px] uppercase tracking-[0.2em] font-bold">
            Talk About It
          </h2>
          <span className="text-[11px] text-[#A08882] italic ml-auto hidden sm:inline font-serif">
            Each answer honestly; do not rush to agree
          </span>
        </div>

        <div className="p-4 bg-[#1C1C1C] border border-[#B85D42]/30 rounded">
          <p className="font-serif-body text-slate-100 text-base sm:text-lg font-medium leading-relaxed">
            "{conversation.talkAboutItPrompt}"
          </p>
        </div>

        {/* Couple Dialogue Notes Box */}
        <div className="space-y-2 pt-2">
          <div className="flex items-center justify-between text-xs">
            <label className="font-medium text-slate-300 flex items-center gap-1.5 font-serif">
              <FileEdit className="w-3.5 h-3.5 text-[#B85D42]" />
              <span>Our Reflections / Notes for this Conversation</span>
            </label>
            {noteSavedFeedback && (
              <span className="text-emerald-400 text-[10px] uppercase tracking-wider flex items-center gap-1">
                <Check className="w-3 h-3" /> Saved locally
              </span>
            )}
          </div>
          <textarea
            rows={3}
            value={currentNote}
            onChange={(e) => handleNoteChange(e.target.value)}
            placeholder="Record private thoughts, insights, or questions you wish to bring to the priest or mentor..."
            className="w-full bg-[#0F0F0F] border border-white/10 rounded p-3 text-xs sm:text-sm text-slate-200 focus:outline-none focus:border-[#B85D42] placeholder:text-slate-600 font-serif"
          />
        </div>
      </section>

      {/* 4. THE ESSENTIALS (5 Concise Q&As for this Conversation) */}
      <section className="bg-[#161616] border border-white/10 rounded-lg p-6 sm:p-8 space-y-6 shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/5 pb-3">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-[#B85D42]" />
            <h2 className="text-[10px] uppercase tracking-[0.2em] text-[#B85D42] font-bold">
              The Essentials
            </h2>
          </div>
          <p className="text-[11px] text-[#8E7E7A] italic font-serif">
            Make sure you can explain the main points in ordinary words
          </p>
        </div>

        <div className="space-y-3">
          {conversation.essentials.map((item, idx) => {
            const isRevealed = revealedEssentials[item.id];
            const isMastered = isEssentialMastered(item.number);
            return (
              <div
                key={item.id}
                id={`essential-item-${item.id}`}
                className="p-4 bg-[#1C1C1C] border border-white/5 rounded space-y-3 hover:border-white/20 transition-colors"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-start gap-2.5">
                    <span className="font-serif font-bold text-[#B85D42] text-sm shrink-0 mt-0.5">
                      {idx + 1}.
                    </span>
                    <h3 className="font-serif text-slate-100 text-sm font-medium">
                      {item.question}
                    </h3>
                  </div>

                  <div className="flex items-center gap-1.5 shrink-0">
                    <button
                      onClick={() => toggleRevealEssential(item.id)}
                      className="p-1.5 rounded bg-[#161616] text-[#DF8E7C] hover:border-[#B85D42] text-xs transition-colors cursor-pointer border border-white/5"
                      title={isRevealed ? 'Hide answer' : 'Reveal canonical answer'}
                    >
                      {isRevealed ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                    </button>

                    <button
                      onClick={() => toggleMasteredEssential(item.number)}
                      className={`p-1.5 rounded text-xs transition-colors cursor-pointer ${
                        isMastered
                          ? 'bg-[#1C261F] text-emerald-300 border border-[#274632]'
                          : 'bg-[#161616] text-slate-400 hover:text-slate-200 border border-white/5'
                      }`}
                      title={isMastered ? 'Mastered' : 'Mark as mastered'}
                    >
                      <Check className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                {/* Answer Card with Reveal State */}
                <div
                  onClick={() => toggleRevealEssential(item.id)}
                  className={`cursor-pointer rounded p-3 text-xs transition-all ${
                    isRevealed
                      ? 'bg-[#161616] text-slate-200 border border-white/10'
                      : 'bg-[#141414] text-slate-500 hover:text-slate-300 border border-white/5'
                  }`}
                >
                  {isRevealed ? (
                    <p className="font-serif-body text-sm sm:text-base leading-relaxed text-[#F3D5CE]">
                      {item.answer}
                    </p>
                  ) : (
                    <span className="flex items-center gap-1.5 text-[11px] font-serif">
                      <Eye className="w-3 h-3 text-[#B85D42]" /> Click or tap to reveal the answer...
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 5. PRAYER CARD */}
      <section className="bg-[#161616] border border-white/10 rounded-lg p-6 sm:p-8 space-y-4 text-center relative overflow-hidden shadow-xl">
        <div className="flex items-center justify-between text-xs text-[#A08882]">
          <span className="text-[10px] uppercase tracking-[0.2em] text-[#B85D42] font-bold">
            Prayer
          </span>
          <button
            onClick={handleCopyPrayer}
            className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-[#1C1C1C] border border-white/5 hover:border-white/20 text-[#DF8E7C] text-[10px] uppercase tracking-wider font-semibold transition-colors cursor-pointer"
          >
            {copiedPrayer ? (
              <>
                <Check className="w-3 h-3 text-emerald-400" />
                <span>Copied</span>
              </>
            ) : (
              <>
                <Copy className="w-3 h-3" />
                <span>Copy Prayer</span>
              </>
            )}
          </button>
        </div>

        <span className="text-xl text-[#B85D42] font-serif">☩</span>
        <p className="font-serif-body italic text-lg sm:text-xl text-[#F3D5CE] max-w-xl mx-auto leading-relaxed">
          "{conversation.prayer}"
        </p>
      </section>

      {/* 6. TOGETHER THIS WEEK (Practical Next Step) */}
      <section className="bg-[#161616] border-t-2 border-[#B85D42] border-x border-b border-white/5 rounded-lg p-6 sm:p-8 space-y-4 shadow-xl">
        <div className="flex items-center gap-2 text-[#B85D42]">
          <Calendar className="w-4 h-4" />
          <h2 className="text-[10px] uppercase tracking-[0.2em] font-bold">
            Together This Week
          </h2>
          <span className="text-[11px] text-[#A08882] italic ml-auto font-serif">One concrete next step</span>
        </div>

        <div className="p-4 bg-[#1C1C1C] border border-white/5 rounded">
          <p className="font-serif-body text-slate-100 text-base sm:text-lg leading-relaxed">
            {conversation.togetherThisWeekPrompt}
          </p>
        </div>
      </section>

      {/* Bottom Navigation between Conversations */}
      <div className="pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
        {prevConv ? (
          <button
            id="prev-conv-btn"
            onClick={() => setConversationId(prevConv.id)}
            className="w-full sm:w-auto px-6 py-2.5 rounded bg-[#161616] border border-white/10 hover:border-white/30 text-xs uppercase tracking-wider font-semibold text-slate-200 flex items-center justify-center gap-2 cursor-pointer transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Previous: Conv. {prevConv.romanNumeral}</span>
          </button>
        ) : (
          <button
            onClick={() => setActiveTab('home')}
            className="w-full sm:w-auto px-6 py-2.5 rounded bg-[#161616] border border-white/10 hover:border-white/30 text-xs uppercase tracking-wider font-semibold text-slate-300 flex items-center justify-center gap-2 cursor-pointer transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Course Overview</span>
          </button>
        )}

        {nextConv ? (
          <button
            id="next-conv-btn"
            onClick={() => {
              setConversationId(nextConv.id);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="w-full sm:w-auto px-6 py-2.5 rounded border border-[#B85D42] bg-[#B85D42] hover:bg-[#8F3F2A] text-white text-xs uppercase tracking-wider font-semibold flex items-center justify-center gap-2 shadow-lg cursor-pointer transition-colors"
          >
            <span>Next: Conv. {nextConv.romanNumeral} — {nextConv.title}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        ) : (
          <button
            id="finish-to-appendices-btn"
            onClick={() => {
              setSelectedAppendixTab('E');
              setActiveTab('appendices');
            }}
            className="w-full sm:w-auto px-6 py-2.5 rounded border border-[#B85D42] bg-[#B85D42] hover:bg-[#8F3F2A] text-white text-xs uppercase tracking-wider font-semibold flex items-center justify-center gap-2 shadow-lg cursor-pointer transition-colors"
          >
            <span>Proceed to Pastoral Readiness (App. E)</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        )}
      </div>
    </div>
  );
};
