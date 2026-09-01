import React, { useState } from 'react';
import { useCourse } from '../context/CourseContext';
import {
  CONVERSATIONS,
  PARISH_INFO,
  COUPLES_PRAYER,
  DISCUSSION_AREAS,
  READINESS_CHECKLIST,
} from '../data/courseData';
import { ActiveTab, AppendixTab } from '../types';
import {
  Heart,
  BookOpen,
  Sparkles,
  CheckCircle2,
  Clock,
  ArrowRight,
  Shield,
  Church,
  Calendar,
  User,
  Users,
  FileText,
  HelpCircle,
  ShieldCheck,
  Check,
  Edit3,
  Bookmark,
  ChevronRight,
} from 'lucide-react';

interface HeroLandingProps {
  setActiveTab: (tab: ActiveTab) => void;
  setSelectedConversationId: (id: number) => void;
  setSelectedAppendixTab: (tab: AppendixTab) => void;
  onOpenOptIn: () => void;
  onOpenProfile: () => void;
}

export const HeroLanding: React.FC<HeroLandingProps> = ({
  setActiveTab,
  setSelectedConversationId,
  setSelectedAppendixTab,
  onOpenOptIn,
  onOpenProfile,
}) => {
  const { profile, updateProfile, isConversationComplete } = useCourse();
  const [editingCouple, setEditingCouple] = useState(false);
  const [tempNames, setTempNames] = useState({
    p1: profile.partner1Name,
    p2: profile.partner2Name,
    date: profile.weddingDate,
    church: profile.church,
  });

  const handleSaveQuickNames = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile({
      partner1Name: tempNames.p1,
      partner2Name: tempNames.p2,
      weddingDate: tempNames.date,
      church: tempNames.church,
    });
    setEditingCouple(false);
  };

  // Next recommended conversation
  const nextConv = CONVERSATIONS.find((c) => !isConversationComplete(c.id)) || CONVERSATIONS[0];

  return (
    <div className="space-y-12 pb-16">
      {/* Hero Header Section */}
      <section className="relative overflow-hidden pt-10 sm:pt-14 pb-12 bg-gradient-to-b from-[#1a1311] to-[#0F0F0F] border-b border-white/5">
        <div className="max-w-4xl mx-auto px-4 text-center relative z-10 space-y-6">
          {/* Liturgical Monogram */}
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-[#161616] border border-white/10 text-[#DF8E7C] shadow-2xl mb-1">
            <span className="text-2xl font-serif">☩</span>
          </div>

          <div className="space-y-3">
            <h1 className="text-4xl sm:text-5xl md:text-6xl text-white mb-2 leading-tight font-serif font-normal tracking-wide">
              {PARISH_INFO.title}
            </h1>
            <p className="text-base sm:text-xl text-[#B85D42] italic font-serif font-light">
              {PARISH_INFO.subtitle}
            </p>
          </div>

          {/* Golden Highlight Motto */}
          <div className="inline-block py-2.5 px-6 rounded-full bg-[#161616] border border-white/10 shadow-inner">
            <p className="font-serif-body italic text-lg sm:text-xl text-[#F3D5CE]">
              "{PARISH_INFO.motto}"
            </p>
          </div>

          {/* Parish & Edition Stamp */}
          <div className="pt-2 text-xs text-[#9E8B86] space-y-1 font-serif">
            <p className="text-slate-400 italic">{PARISH_INFO.parishes}</p>
            <p className="text-[10px] uppercase tracking-[0.2em] font-sans text-[#B85D42]">
              {PARISH_INFO.edition}
            </p>
          </div>

          {/* CTA Row */}
          <div className="pt-4 flex flex-wrap items-center justify-center gap-3">
            <button
              id="hero-begin-flow-btn"
              onClick={() => {
                setSelectedConversationId(nextConv.id);
                setActiveTab('conversations');
              }}
              className="px-8 sm:px-10 py-3 border border-[#B85D42] bg-[#B85D42] text-white uppercase tracking-[0.25em] text-xs hover:bg-[#8F3F2A] hover:border-[#8F3F2A] transition-colors duration-300 font-semibold shadow-lg flex items-center gap-2 cursor-pointer"
            >
              <span>
                {profile.completedConversations.length > 0
                  ? `Continue: Conv. ${nextConv.romanNumeral}`
                  : 'Begin Preparation'}
              </span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>

            <button
              id="hero-essentials-drill-btn"
              onClick={() => setActiveTab('essentials')}
              className="px-8 py-3 border border-[#B85D42] text-[#B85D42] uppercase tracking-[0.25em] text-xs hover:bg-[#B85D42] hover:text-white transition-colors duration-300 font-semibold flex items-center gap-2 cursor-pointer bg-transparent"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Essentials Drill</span>
            </button>

            <button
              id="hero-profile-btn"
              onClick={onOpenProfile}
              className="px-6 py-3 border border-white/10 text-slate-300 uppercase tracking-[0.2em] text-xs hover:border-white/30 hover:text-white transition-colors duration-300 flex items-center gap-2 cursor-pointer bg-[#161616]"
            >
              <Users className="w-3.5 h-3.5 text-[#B85D42]" />
              <span>Couple Profile</span>
            </button>
          </div>
        </div>
      </section>

      {/* Couple Register / Identity Card & Opt-In Notification Banner */}
      <section className="max-w-4xl mx-auto px-4">
        <div className="bg-[#161616] border-t-2 border-[#B85D42] border-x border-b border-white/5 rounded-lg p-5 sm:p-6 shadow-2xl relative overflow-hidden">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/5">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#1C1C1C] border border-white/10 flex items-center justify-center text-[#B85D42]">
                <Heart className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-serif text-lg sm:text-xl font-normal text-white">
                  Our Preparation Record
                </h3>
                <p className="text-[11px] text-[#A08882] tracking-wide">
                  Stored locally on this device • Private & secure
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                id="couple-card-edit-btn"
                onClick={() => setEditingCouple(!editingCouple)}
                className="text-[10px] uppercase tracking-widest px-3 py-1.5 rounded bg-[#1C1C1C] border border-white/10 text-[#DF8E7C] hover:border-[#B85D42] flex items-center gap-1.5 transition-all font-semibold"
              >
                <Edit3 className="w-3.5 h-3.5" />
                <span>{editingCouple ? 'Cancel' : 'Edit Names'}</span>
              </button>
            </div>
          </div>

          {editingCouple ? (
            <form onSubmit={handleSaveQuickNames} className="pt-4 grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-[11px] font-medium text-slate-300 mb-1 font-serif">
                  Our Names (Partner 1 & Partner 2)
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <input
                    type="text"
                    placeholder="e.g. Michael"
                    value={tempNames.p1}
                    onChange={(e) => setTempNames({ ...tempNames, p1: e.target.value })}
                    className="bg-[#0F0F0F] border border-white/10 rounded px-3 py-2 text-xs text-white focus:outline-none focus:border-[#B85D42]"
                  />
                  <input
                    type="text"
                    placeholder="e.g. Sarah"
                    value={tempNames.p2}
                    onChange={(e) => setTempNames({ ...tempNames, p2: e.target.value })}
                    className="bg-[#0F0F0F] border border-white/10 rounded px-3 py-2 text-xs text-white focus:outline-none focus:border-[#B85D42]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-medium text-slate-300 mb-1 font-serif">
                  Wedding Date & Parish
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <input
                    type="date"
                    value={tempNames.date}
                    onChange={(e) => setTempNames({ ...tempNames, date: e.target.value })}
                    className="bg-[#0F0F0F] border border-white/10 rounded px-3 py-2 text-xs text-white focus:outline-none focus:border-[#B85D42]"
                  />
                  <input
                    type="text"
                    placeholder="Parish church"
                    value={tempNames.church}
                    onChange={(e) => setTempNames({ ...tempNames, church: e.target.value })}
                    className="bg-[#0F0F0F] border border-white/10 rounded px-3 py-2 text-xs text-white focus:outline-none focus:border-[#B85D42]"
                  />
                </div>
              </div>

              <div className="sm:col-span-2 flex justify-end">
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#B85D42] text-white text-xs font-semibold uppercase tracking-widest rounded hover:bg-[#8F3F2A] transition-colors"
                >
                  Save Record
                </button>
              </div>
            </form>
          ) : (
            <div className="pt-4 grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
              <div className="bg-[#1C1C1C] p-3 rounded border border-white/5">
                <span className="text-[#A08882] block text-[9px] uppercase tracking-widest font-bold">
                  Couple Names
                </span>
                <span className="font-serif text-sm text-white truncate block mt-0.5 italic">
                  {profile.partner1Name || profile.partner2Name
                    ? `${profile.partner1Name || '—'} & ${profile.partner2Name || '—'}`
                    : 'Not entered yet'}
                </span>
              </div>

              <div className="bg-[#1C1C1C] p-3 rounded border border-white/5">
                <span className="text-[#A08882] block text-[9px] uppercase tracking-widest font-bold">
                  Wedding Date
                </span>
                <span className="font-serif text-sm text-white truncate block mt-0.5">
                  {profile.weddingDate || 'Date pending'}
                </span>
              </div>

              <div className="bg-[#1C1C1C] p-3 rounded border border-white/5">
                <span className="text-[#A08882] block text-[9px] uppercase tracking-widest font-bold">
                  Priest / Deacon / Mentor
                </span>
                <span className="font-serif text-sm text-white truncate block mt-0.5">
                  {profile.priestMentor || 'Fr. John'}
                </span>
              </div>

              <div className="bg-[#1C1C1C] p-3 rounded border border-white/5">
                <span className="text-[#A08882] block text-[9px] uppercase tracking-widest font-bold">
                  Sponsor / Mentor
                </span>
                <span className="font-serif text-sm text-white truncate block mt-0.5">
                  {profile.sponsorMentor || 'Thomas & Sarah More'}
                </span>
              </div>
            </div>
          )}

          {/* Optional Opt-In Notice Box (Father John Formspree) */}
          {!profile.optInSubmitted ? (
            <div className="mt-4 p-3.5 bg-[#1C1C1C] border border-[#B85D42]/30 rounded flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
              <div className="flex items-start gap-2.5">
                <Church className="w-4 h-4 text-[#B85D42] mt-0.5 shrink-0" />
                <div>
                  <span className="font-serif font-semibold text-white">
                    Optional Parish Notification
                  </span>
                  <p className="text-slate-400 text-[11px] mt-0.5 font-serif">
                    Let Father John know you have started your preparation booklet (via Formspree notification).
                  </p>
                </div>
              </div>
              <button
                id="optin-banner-btn"
                onClick={onOpenOptIn}
                className="px-4 py-2 border border-[#B85D42] text-[#B85D42] hover:bg-[#B85D42] hover:text-white uppercase tracking-widest text-[10px] font-bold rounded transition-colors shrink-0 text-center"
              >
                Send Notification
              </button>
            </div>
          ) : (
            <div className="mt-4 p-3 bg-[#16221A] border border-[#274632] rounded flex items-center gap-2.5 text-xs text-emerald-200">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>
                Father John notified on {profile.optInDate || 'file'} ({profile.optInEmail}).
              </span>
            </div>
          )}
        </div>
      </section>

      {/* "This Book Belongs to You" Pastoral Welcome Box */}
      <section className="max-w-4xl mx-auto px-4">
        <div className="bg-[#161616] border border-white/10 rounded-lg p-6 sm:p-8 space-y-6 shadow-xl">
          <div className="border-b border-white/5 pb-4">
            <span className="text-[10px] tracking-[0.2em] uppercase font-bold text-[#B85D42] block">
              Pastoral Welcome
            </span>
            <h2 className="text-2xl sm:text-3xl text-white mt-1 font-serif font-normal">
              This book belongs to you
            </h2>
          </div>

          <div className="font-serif-body text-slate-300 space-y-4 leading-relaxed text-base sm:text-lg">
            <p>
              Congratulations on your engagement. The Church is not preparing you only for a
              wedding ceremony, but for a lifelong covenant. This book is designed for the two of you
              to use together: quietly, honestly and without needing to prepare a lesson beforehand.
            </p>
            <p>
              You do not need to present yourselves as a perfect couple or a perfect Catholic
              household. Marriage preparation is a time to understand what you are promising, to
              speak truthfully about the life you hope to build, to bring difficulties into the
              light early, and to let Christ become part of your preparation rather than an addition
              at the end.
            </p>
          </div>

          {/* Four Conversations summary box */}
          <div className="p-4 rounded bg-[#1C1C1C] border border-white/5 space-y-2">
            <div className="uppercase tracking-widest text-[10px] font-bold text-[#B85D42] flex items-center gap-2">
              <Clock className="w-3.5 h-3.5" />
              <span>FOUR CONVERSATIONS</span>
            </div>
            <p className="text-xs sm:text-sm text-slate-300 font-serif leading-relaxed">
              Work through the four conversations together. Allow about 20-30 minutes for each. Read
              the teaching, talk about the question, make sure you understand the essentials, pray
              together and take one practical next step.
            </p>
          </div>

          <p className="text-xs text-slate-400 leading-normal italic font-serif">
            Your meetings with the priest remain important. This booklet does not replace the
            Church’s formal enquiry into freedom to marry, any permissions or dispensations, civil
            requirements, or the final planning of the wedding liturgy. Bring any questions to the
            priest rather than guessing.
          </p>

          {/* How to use each conversation steps */}
          <div className="space-y-3 pt-2">
            <h3 className="text-[10px] uppercase tracking-[0.2em] text-[#B85D42] font-bold">
              How to use each conversation
            </h3>
            <div className="grid sm:grid-cols-2 gap-3 text-xs font-serif">
              <div className="p-3.5 bg-[#1C1C1C] rounded border-l-2 border-[#B85D42] flex items-start gap-2.5">
                <div>
                  <strong className="text-white text-xs block font-sans uppercase tracking-wider">REMEMBER</strong>
                  <p className="text-slate-400 mt-0.5">The central Catholic truth.</p>
                </div>
              </div>

              <div className="p-3.5 bg-[#1C1C1C] rounded border-l-2 border-[#B85D42] flex items-start gap-2.5">
                <div>
                  <strong className="text-white text-xs block font-sans uppercase tracking-wider">SHORT TEACHING</strong>
                  <p className="text-slate-400 mt-0.5">Read it together slowly.</p>
                </div>
              </div>

              <div className="p-3.5 bg-[#1C1C1C] rounded border-l-2 border-[#B85D42] flex items-start gap-2.5">
                <div>
                  <strong className="text-white text-xs block font-sans uppercase tracking-wider">TALK ABOUT IT</strong>
                  <p className="text-slate-400 mt-0.5">Each answer honestly; do not rush to agree.</p>
                </div>
              </div>

              <div className="p-3.5 bg-[#1C1C1C] rounded border-l-2 border-[#B85D42] flex items-start gap-2.5">
                <div>
                  <strong className="text-white text-xs block font-sans uppercase tracking-wider">THE ESSENTIALS</strong>
                  <p className="text-slate-400 mt-0.5">
                    Explain the main points in ordinary words.
                  </p>
                </div>
              </div>

              <div className="p-3.5 bg-[#1C1C1C] rounded border-l-2 border-[#B85D42] flex items-start gap-2.5">
                <div>
                  <strong className="text-white text-xs block font-sans uppercase tracking-wider">PRAYER</strong>
                  <p className="text-slate-400 mt-0.5">Place your future marriage before God.</p>
                </div>
              </div>

              <div className="p-3.5 bg-[#1C1C1C] rounded border-l-2 border-[#B85D42] flex items-start gap-2.5">
                <div>
                  <strong className="text-white text-xs block font-sans uppercase tracking-wider">TOGETHER THIS WEEK</strong>
                  <p className="text-slate-400 mt-0.5">One concrete next step.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Simple Rule Callout Card */}
          <div className="p-4 bg-[#1C1C1C] border border-[#B85D42]/30 rounded">
            <div className="flex items-start gap-3">
              <span className="px-2 py-0.5 bg-[#B85D42] text-white text-[9px] font-bold uppercase rounded tracking-widest shrink-0">
                SIMPLE RULE
              </span>
              <p className="text-xs sm:text-sm text-[#F3D5CE] italic font-serif leading-relaxed">
                Do not try to impress each other. Do not hide an issue because the wedding is
                already booked. Honesty now is an act of love for your future marriage.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* The 4 Conversations Course Modules Grid */}
      <section className="max-w-4xl mx-auto px-4 space-y-4">
        <div className="flex items-center justify-between border-b border-white/5 pb-2">
          <div>
            <h2 className="text-2xl sm:text-3xl text-white font-serif font-normal">
              The Four Conversations
            </h2>
            <p className="text-[11px] text-[#A08882] tracking-wide font-serif">
              Core matrimonial teaching, sacramental covenant, and family life
            </p>
          </div>
          <span className="text-[10px] text-[#B85D42] uppercase tracking-widest font-bold">
            {profile.completedConversations.length} of 4 Completed
          </span>
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          {CONVERSATIONS.map((conv) => {
            const isCompleted = isConversationComplete(conv.id);
            return (
              <div
                key={conv.id}
                id={`conversation-card-${conv.id}`}
                onClick={() => {
                  setSelectedConversationId(conv.id);
                  setActiveTab('conversations');
                }}
                className={`group cursor-pointer p-6 border-t-2 border-[#B85D42] bg-[#161616] hover:bg-[#1C1C1C] transition-colors rounded-lg flex flex-col justify-between shadow-lg relative overflow-hidden`}
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[10px] text-[#B85D42] uppercase tracking-widest font-bold">
                      CONVERSATION {conv.romanNumeral}
                    </span>
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] text-slate-500 flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {conv.estimatedMinutes}
                      </span>
                      {isCompleted ? (
                        <span className="px-2 py-0.5 rounded bg-[#1C261F] text-emerald-300 text-[9px] font-bold uppercase tracking-wider flex items-center gap-1">
                          <Check className="w-3 h-3" /> Completed
                        </span>
                      ) : (
                        <span className="px-2 py-0.5 rounded bg-[#1C1C1C] text-[#DF8E7C] text-[9px] font-bold uppercase tracking-wider border border-white/5">
                          To Begin
                        </span>
                      )}
                    </div>
                  </div>

                  <h3 className="text-xl text-white font-serif font-normal group-hover:text-[#DF8E7C] transition-colors leading-tight">
                    {conv.title}
                  </h3>
                  <p className="text-xs text-slate-400 mt-2 font-serif line-clamp-2 leading-relaxed">
                    {conv.purpose}
                  </p>
                </div>

                <div className="pt-5 mt-4 border-t border-white/5 flex items-center justify-between text-xs text-[#DF8E7C] group-hover:text-white transition-colors uppercase tracking-wider font-semibold">
                  <span className="text-[10px]">Open Chapter</span>
                  <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Memory Recall & Drills Banner */}
      <section className="max-w-4xl mx-auto px-4">
        <div className="bg-[#161616] border-t-2 border-[#B85D42] border-x border-b border-white/5 rounded-lg p-6 sm:p-7 flex flex-col sm:flex-row sm:items-center justify-between gap-6 shadow-xl">
          <div className="space-y-2 max-w-xl">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded bg-[#1C1C1C] border border-white/10 text-[#B85D42] text-[9px] font-bold uppercase tracking-widest">
              <Sparkles className="w-3 h-3" />
              <span>Memory-Recall Drills</span>
            </div>
            <h3 className="text-xl sm:text-2xl text-white font-serif font-normal">
              The 15 Essentials of Catholic Marriage
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 font-serif italic leading-relaxed">
              "This is not a theological examination. You should, however, be able to understand
              and explain these truths in your own words."
            </p>
            <div className="pt-1 flex items-center gap-3 text-xs text-[#A08882]">
              <span className="font-mono text-[11px]">
                Mastery: {profile.masteredEssentials.length} / 15
              </span>
              <div className="w-24 bg-slate-800 rounded-full h-1 overflow-hidden">
                <div
                  className="bg-[#B85D42] h-full"
                  style={{ width: `${(profile.masteredEssentials.length / 15) * 100}%` }}
                />
              </div>
            </div>
          </div>

          <button
            id="launch-essentials-drill-cta"
            onClick={() => setActiveTab('essentials')}
            className="px-6 py-3 border border-[#B85D42] bg-[#B85D42] hover:bg-[#8F3F2A] text-white text-xs uppercase tracking-[0.2em] font-semibold rounded shadow-lg shrink-0 flex items-center justify-center gap-2 transition-all cursor-pointer"
          >
            <span>Launch Flashcards</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </section>

      {/* Appendices Reference Matrix */}
      <section className="max-w-4xl mx-auto px-4 space-y-4">
        <div className="border-b border-white/5 pb-2">
          <h2 className="text-2xl sm:text-3xl text-white font-serif font-normal">
            Appendices & Reference
          </h2>
          <p className="text-[11px] text-[#A08882] tracking-wide font-serif">
            "The four conversations are intentionally concise. The appendices are there when you
            need practical detail, not as extra lessons to complete."
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 text-xs">
          {[
            {
              key: 'A',
              title: 'The Wedding Rite - Step by Step',
              desc: '10 practical steps of the Catholic marriage liturgy.',
            },
            {
              key: 'B',
              title: 'Freedom to Marry & Practical Prep',
              desc: 'Canonical enquiry, previous bonds, dispensations, civil rules.',
            },
            {
              key: 'C',
              title: 'The Essentials (15 Concise Answers)',
              desc: 'Concise definitions to know and explain clearly.',
            },
            {
              key: 'D',
              title: 'Conversations That Matter',
              desc: '10 crucial areas: Faith, conflict, money, intimacy, safety.',
            },
            {
              key: 'E',
              title: 'Before the Wedding: Are We Ready?',
              desc: 'Pastoral readiness checklist (12 canonical points).',
            },
            {
              key: 'F',
              title: 'Frequently Asked Questions',
              desc: '14 common pastoral, sacramental, and canonical answers.',
            },
            {
              key: 'G',
              title: 'A Simple Rule of Married Life',
              desc: '11 practical daily & weekly rhythms for the domestic church.',
            },
          ].map((app) => (
            <div
              key={app.key}
              id={`appendix-quick-card-${app.key}`}
              onClick={() => {
                setSelectedAppendixTab(app.key as AppendixTab);
                setActiveTab('appendices');
              }}
              className="group cursor-pointer p-4 bg-[#161616] border border-white/5 hover:border-[#B85D42]/60 hover:bg-[#1C1C1C] rounded transition-all"
            >
              <div className="flex items-center gap-2 mb-1.5">
                <span className="text-[9px] uppercase tracking-widest font-bold text-[#B85D42]">
                  Appendix {app.key}
                </span>
              </div>
              <h4 className="font-serif text-sm font-medium text-slate-100 group-hover:text-[#DF8E7C] transition-colors line-clamp-1">
                {app.title}
              </h4>
              <p className="text-slate-400 mt-1 text-[11px] font-serif line-clamp-2 leading-relaxed">
                {app.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* A Couple's Prayer Banner Card */}
      <section className="max-w-4xl mx-auto px-4">
        <div className="bg-[#161616] border border-white/10 rounded-lg p-6 sm:p-8 text-center relative overflow-hidden space-y-4 shadow-xl">
          <span className="text-2xl text-[#B85D42] font-serif">☩</span>
          <h3 className="text-xl sm:text-2xl text-white font-serif font-normal">
            A Couple's Prayer
          </h3>
          <p className="font-serif-body italic text-base sm:text-lg text-[#F3D5CE] max-w-2xl mx-auto leading-relaxed">
            "{COUPLES_PRAYER}"
          </p>
          <div className="text-[10px] text-[#A08882] tracking-[0.2em] uppercase font-sans">
            St Mary's | St John Bosco | St Edward's Parish
          </div>
        </div>
      </section>
    </div>
  );
};
