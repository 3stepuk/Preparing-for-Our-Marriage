import React, { useState } from 'react';
import { useCourse } from '../context/CourseContext';
import {
  WEDDING_RITE_STEPS,
  FREEDOM_TO_MARRY_ITEMS,
  ALL_ESSENTIALS_15,
  DISCUSSION_AREAS,
  READINESS_CHECKLIST,
  FAQ_LIST,
  RULE_OF_LIFE_ITEMS,
  COUPLES_PRAYER,
  SOURCES_AND_REFERENCES,
  FINAL_REMINDER,
} from '../data/courseData';
import { AppendixTab, ActiveTab } from '../types';
import {
  FileText,
  ShieldCheck,
  CheckSquare,
  Square,
  HelpCircle,
  Sparkles,
  Heart,
  AlertTriangle,
  BookOpen,
  Church,
  Calendar,
  MessageSquare,
  Check,
  Copy,
  ChevronDown,
  ChevronUp,
  Search,
  CheckCircle2,
  FileEdit,
} from 'lucide-react';

interface AppendicesViewProps {
  selectedTab: AppendixTab;
  setSelectedTab: (tab: AppendixTab) => void;
  setActiveTab: (tab: ActiveTab) => void;
}

export const AppendicesView: React.FC<AppendicesViewProps> = ({
  selectedTab,
  setSelectedTab,
  setActiveTab,
}) => {
  const {
    profile,
    toggleDiscussionComplete,
    isDiscussionComplete,
    setDiscussionNote,
    toggleReadinessCheck,
    isReadinessChecked,
    toggleHabit,
  } = useCourse();

  const [faqFilter, setFaqFilter] = useState<'all' | 'canonical' | 'sacramental' | 'pastoral' | 'practical'>('all');
  const [openFaqs, setOpenFaqs] = useState<Record<string, boolean>>({ 'faq-1': true, 'faq-2': true });
  const [copiedPrayer, setCopiedPrayer] = useState(false);
  const [essentialsSearch, setEssentialsSearch] = useState('');

  const toggleFaq = (id: string) => {
    setOpenFaqs((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleCopyPrayer = () => {
    navigator.clipboard.writeText(COUPLES_PRAYER);
    setCopiedPrayer(true);
    setTimeout(() => setCopiedPrayer(false), 2000);
  };

  const tabsConfig: { key: AppendixTab; label: string; short: string }[] = [
    { key: 'A', label: 'Wedding Rite Step by Step', short: 'Rite' },
    { key: 'B', label: 'Freedom to Marry & Practical Prep', short: 'Freedom' },
    { key: 'C', label: 'The 15 Essentials', short: 'Essentials' },
    { key: 'D', label: 'Conversations That Matter (10 Areas)', short: 'Discussions' },
    { key: 'E', label: 'Before Wedding: Are We Ready?', short: 'Readiness' },
    { key: 'F', label: 'Frequently Asked Questions', short: 'FAQs' },
    { key: 'G', label: 'A Simple Rule of Married Life', short: 'Rule of Life' },
  ];

  // Readiness calculation
  const readinessCount = profile.checkedReadiness.length;
  const readinessPercent = Math.round((readinessCount / 12) * 100);

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-8 pb-24">
      {/* Header */}
      <div className="space-y-2 text-center">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#251B18] border border-[#C5705D]/40 text-[#DF8E7C] text-xs font-semibold uppercase">
          <FileText className="w-3.5 h-3.5" />
          <span>Course Reference & Appendices</span>
        </div>
        <h1 className="font-heading text-2xl sm:text-3xl md:text-4xl font-bold text-slate-100">
          Appendices A – G
        </h1>
        <p className="text-xs sm:text-sm text-[#A08882] italic">
          "The four conversations are intentionally concise. The appendices are there when you need
          practical detail, not as extra lessons to complete."
        </p>
      </div>

      {/* Appendix Sub-Tabs Bar */}
      <div className="flex overflow-x-auto no-scrollbar gap-1.5 p-1.5 bg-[#141212] border border-[#27201E] rounded-2xl">
        {tabsConfig.map((tab) => (
          <button
            key={tab.key}
            id={`appendix-tab-btn-${tab.key}`}
            onClick={() => setSelectedTab(tab.key)}
            className={`px-3 py-2 rounded-xl text-xs font-medium whitespace-nowrap transition-all flex items-center gap-1.5 ${
              selectedTab === tab.key
                ? 'bg-[#C5705D] text-white shadow-md font-semibold'
                : 'text-slate-400 hover:text-slate-200 hover:bg-[#1C1817]'
            }`}
          >
            <span className="font-heading font-bold opacity-80">{tab.key}.</span>
            <span>{tab.short}</span>
          </button>
        ))}
      </div>

      {/* ========================================================================= */}
      {/* APPENDIX A: The Wedding Rite - Step by Step */}
      {/* ========================================================================= */}
      {selectedTab === 'A' && (
        <div className="space-y-6 animate-in fade-in duration-150">
          <div className="bg-[#161312] border border-[#2F2321] rounded-2xl p-6 sm:p-8 space-y-4">
            <span className="text-xs uppercase tracking-wider font-semibold text-[#DF8E7C] font-heading">
              APPENDIX A
            </span>
            <h2 className="font-heading text-xl sm:text-2xl font-bold text-slate-100">
              The Wedding Rite — Step by Step
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 italic">
              "This is a practical outline, not a script. The approved Order of Celebrating
              Matrimony and the priest or deacon govern the celebration."
            </p>

            <div className="space-y-3 pt-4">
              {WEDDING_RITE_STEPS.map((step) => (
                <div
                  key={step.step}
                  className="p-4 bg-[#1A1615] border border-[#2A201E] rounded-xl flex flex-col sm:flex-row sm:items-start gap-3 sm:gap-4"
                >
                  <div className="flex items-center gap-2 sm:w-48 shrink-0">
                    <span className="w-6 h-6 rounded-lg bg-[#2B1D1A] text-[#DF8E7C] font-heading font-bold text-xs flex items-center justify-center shrink-0 border border-[#3E2925]">
                      {step.step}
                    </span>
                    <span className="font-heading font-semibold text-slate-100 text-xs sm:text-sm">
                      {step.part}
                    </span>
                  </div>

                  <p className="font-serif-body text-slate-300 text-xs sm:text-sm leading-relaxed sm:pt-0.5">
                    {step.whatItMeans}
                  </p>
                </div>
              ))}
            </div>

            {/* For the Day callout box */}
            <div className="mt-6 p-4 bg-[#211918] border border-[#482F2A] rounded-xl">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#DF8E7C] block mb-1">
                FOR THE DAY
              </span>
              <p className="text-xs sm:text-sm text-[#F3D5CE]">
                The parish will give you the exact approved texts, readings and practical
                directions. Use those rather than copying wording from an internet source.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* APPENDIX B: Freedom to Marry and Practical Preparation */}
      {/* ========================================================================= */}
      {selectedTab === 'B' && (
        <div className="space-y-6 animate-in fade-in duration-150">
          <div className="bg-[#161312] border border-[#2F2321] rounded-2xl p-6 sm:p-8 space-y-6">
            <span className="text-xs uppercase tracking-wider font-semibold text-[#DF8E7C] font-heading">
              APPENDIX B
            </span>
            <h2 className="font-heading text-xl sm:text-2xl font-bold text-slate-100">
              Freedom to Marry and Practical Preparation
            </h2>
            <p className="font-serif-body text-slate-300 text-base leading-relaxed">
              Some matters cannot be self-certified. The priest must establish freedom to marry and
              complete the Church’s formal pre-marriage enquiry. Tell him the full truth early; most
              difficulties are easier to handle before dates, suppliers and invitations become fixed.
            </p>

            {/* Tell the priest check items */}
            <div className="space-y-3 pt-2">
              <h3 className="font-heading text-xs uppercase tracking-wider text-[#DF8E7C] font-semibold">
                Tell the priest at the first meeting if any of these apply:
              </h3>
              <div className="space-y-2">
                {FREEDOM_TO_MARRY_ITEMS.map((item, idx) => (
                  <div
                    key={idx}
                    className="p-3.5 bg-[#1A1615] border border-[#2A201E] rounded-xl flex items-start gap-3 text-xs"
                  >
                    <span className="text-[#C5705D] font-bold mt-0.5">•</span>
                    <span className="text-slate-200 leading-relaxed">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Mixed Marriage & Disparity of Cult Section */}
            <div className="p-5 bg-[#1B1615] border border-[#352522] rounded-xl space-y-3">
              <h3 className="font-heading text-sm font-semibold text-[#F3D5CE]">
                Mixed Marriage and Disparity of Cult
              </h3>
              <p className="font-serif-body text-slate-300 text-sm leading-relaxed">
                A marriage between a Catholic and a baptised non-Catholic ordinarily requires the
                appropriate permission. A marriage between a Catholic and an unbaptised person
                requires a dispensation from the impediment of disparity of cult for validity.
              </p>
              <p className="font-serif-body text-slate-300 text-sm leading-relaxed">
                The Catholic party makes the promises required by Church law concerning
                perseverance in the Catholic faith and doing all in their power for the baptism and
                Catholic upbringing of children; the other party is informed of those promises.
              </p>
              <p className="font-serif-body text-slate-300 text-sm leading-relaxed">
                If one spouse is unbaptised, the valid marriage is not sacramental unless and until
                both spouses are baptised.
              </p>
            </div>

            {/* Documents and Civil Requirements */}
            <div className="p-5 bg-[#1B1615] border border-[#352522] rounded-xl space-y-3">
              <h3 className="font-heading text-sm font-semibold text-[#F3D5CE]">
                Documents and Civil Requirements
              </h3>
              <p className="font-serif-body text-slate-300 text-sm leading-relaxed">
                The parish will tell you what is currently required. This normally includes a
                recently issued baptism certificate for each Catholic party, evidence of
                Confirmation if available, information needed to establish freedom to marry, and
                whatever civil documentation is required at the time.
              </p>
              <p className="font-serif-body text-slate-300 text-sm leading-relaxed">
                Civil procedures can change, so follow the current instructions of the parish and
                registrar rather than an old checklist.
              </p>
            </div>

            {/* Important Warning Callout */}
            <div className="p-4 bg-[#231A18] border border-[#52332D] rounded-xl">
              <div className="flex items-start gap-3">
                <span className="px-2 py-0.5 bg-[#A24E38] text-white text-[10px] font-bold uppercase rounded shrink-0">
                  IMPORTANT
                </span>
                <p className="text-xs sm:text-sm text-[#F3D5CE] leading-relaxed">
                  Do not book a wedding on the assumption that a previous bond, dispensation,
                  permission or document will “probably be fine”. Establish freedom to marry with the
                  priest first.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* APPENDIX C: The Essentials Reference (15 Answers) */}
      {/* ========================================================================= */}
      {selectedTab === 'C' && (
        <div className="space-y-6 animate-in fade-in duration-150">
          <div className="bg-[#161312] border border-[#2F2321] rounded-2xl p-6 sm:p-8 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <span className="text-xs uppercase tracking-wider font-semibold text-[#DF8E7C] font-heading">
                  APPENDIX C
                </span>
                <h2 className="font-heading text-xl sm:text-2xl font-bold text-slate-100">
                  The Essentials
                </h2>
                <p className="text-xs text-slate-300 italic mt-1">
                  Fifteen concise answers to know and understand.
                </p>
              </div>

              <button
                onClick={() => setActiveTab('essentials')}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-[#C5705D] text-white rounded-xl text-xs font-semibold hover:brightness-110 shrink-0"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Launch Memory Drill</span>
              </button>
            </div>

            {/* Search Box */}
            <div className="relative">
              <Search className="w-4 h-4 text-[#8E7E7A] absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search essential answers..."
                value={essentialsSearch}
                onChange={(e) => setEssentialsSearch(e.target.value)}
                className="w-full bg-[#100E0E] border border-[#2C211F] rounded-xl pl-10 pr-4 py-2.5 text-xs text-slate-200 focus:outline-none focus:border-[#C5705D]"
              />
            </div>

            <div className="space-y-3">
              {ALL_ESSENTIALS_15.filter(
                (item) =>
                  item.question.toLowerCase().includes(essentialsSearch.toLowerCase()) ||
                  item.answer.toLowerCase().includes(essentialsSearch.toLowerCase())
              ).map((item) => (
                <div
                  key={item.id}
                  className="p-4 bg-[#1A1615] border border-[#2A201E] rounded-xl space-y-2"
                >
                  <div className="flex items-start gap-2.5">
                    <span className="font-heading font-bold text-[#C5705D] text-sm shrink-0">
                      {item.number}.
                    </span>
                    <h3 className="font-heading font-semibold text-slate-100 text-sm">
                      {item.question}
                    </h3>
                  </div>
                  <p className="font-serif-body text-[#F3D5CE] text-sm sm:text-base pl-6 leading-relaxed">
                    {item.answer}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* APPENDIX D: Conversations That Matter Before Marriage (10 Areas) */}
      {/* ========================================================================= */}
      {selectedTab === 'D' && (
        <div className="space-y-6 animate-in fade-in duration-150">
          <div className="bg-[#161312] border border-[#2F2321] rounded-2xl p-6 sm:p-8 space-y-6">
            <div className="border-b border-[#241E1C] pb-4">
              <span className="text-xs uppercase tracking-wider font-semibold text-[#DF8E7C] font-heading">
                APPENDIX D
              </span>
              <h2 className="font-heading text-xl sm:text-2xl font-bold text-slate-100">
                Conversations That Matter Before Marriage
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 mt-2 font-serif-body leading-relaxed">
                "These are not trick questions and there is no “correct couple answer”. Each of you
                should answer honestly before trying to solve the difference. A serious disagreement
                discovered now is useful information, not a failure of preparation."
              </p>
            </div>

            {/* 10 Areas List with Interactive Notes */}
            <div className="space-y-4">
              {DISCUSSION_AREAS.map((disc) => {
                const isCompleted = isDiscussionComplete(disc.id);
                const currentNote = profile.discussionNotes[disc.id] || '';

                return (
                  <div
                    key={disc.id}
                    className={`p-5 rounded-2xl border transition-all ${
                      disc.isSafetyWarning
                        ? 'bg-[#211614] border-[#5E2B23]'
                        : isCompleted
                        ? 'bg-[#181716] border-[#3F312E]'
                        : 'bg-[#1A1615] border-[#2E2220]'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span
                            className={`font-heading font-bold text-sm uppercase tracking-wide ${
                              disc.isSafetyWarning ? 'text-[#E57373]' : 'text-[#DF8E7C]'
                            }`}
                          >
                            {disc.area}
                          </span>
                          {disc.isSafetyWarning && (
                            <span className="px-2 py-0.5 rounded bg-[#4C1814] text-red-300 text-[10px] font-bold uppercase flex items-center gap-1">
                              <AlertTriangle className="w-3 h-3" /> Critical Safety
                            </span>
                          )}
                        </div>
                        <p className="font-serif-body text-slate-100 text-sm sm:text-base leading-relaxed pt-1">
                          {disc.prompt}
                        </p>
                      </div>

                      <button
                        onClick={() => toggleDiscussionComplete(disc.id)}
                        className={`p-2 rounded-xl text-xs transition-colors shrink-0 ${
                          isCompleted
                            ? 'bg-[#1E2E22] text-emerald-300 border border-[#2B5438]'
                            : 'bg-[#221B19] text-slate-400 hover:text-slate-200'
                        }`}
                        title={isCompleted ? 'Completed' : 'Mark discussed'}
                      >
                        {isCompleted ? <Check className="w-4 h-4" /> : <Square className="w-4 h-4" />}
                      </button>
                    </div>

                    {/* Private Dialogue Notes for this area */}
                    <div className="mt-4 pt-3 border-t border-[#29201E]">
                      <textarea
                        rows={2}
                        value={currentNote}
                        onChange={(e) => setDiscussionNote(disc.id, e.target.value)}
                        placeholder={`Couple notes & thoughts on ${disc.area.toLowerCase()}...`}
                        className="w-full bg-[#100E0E] border border-[#2F2321] rounded-xl p-2.5 text-xs text-slate-200 focus:outline-none focus:border-[#C5705D] placeholder:text-[#685854]"
                      />
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Do Not Rush Pastoral Notice */}
            <div className="p-4 bg-[#261B18] border border-[#5A352F] rounded-xl">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#DF8E7C] block mb-1">
                DO NOT RUSH
              </span>
              <p className="text-xs sm:text-sm text-[#F3D5CE] leading-relaxed">
                If a conversation reveals something serious, stop trying to “finish the page”. Make
                a note and bring it to the priest. Preparation exists to protect freedom and truth,
                not to keep a wedding timetable moving.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* APPENDIX E: Before the Wedding: Are We Ready? */}
      {/* ========================================================================= */}
      {selectedTab === 'E' && (
        <div className="space-y-6 animate-in fade-in duration-150">
          <div className="bg-[#161312] border border-[#2F2321] rounded-2xl p-6 sm:p-8 space-y-6">
            <div className="border-b border-[#241E1C] pb-4">
              <span className="text-xs uppercase tracking-wider font-semibold text-[#DF8E7C] font-heading">
                APPENDIX E
              </span>
              <h2 className="font-heading text-xl sm:text-2xl font-bold text-slate-100">
                Before the Wedding: Are We Ready?
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 mt-2 font-serif-body leading-relaxed">
                "This is a pastoral review, not a pass/fail test. The priest makes the final canonical
                and pastoral judgement about readiness and freedom to marry."
              </p>
            </div>

            {/* Score & Progress Tracker */}
            <div className="p-4 bg-[#1B1615] border border-[#3A2A26] rounded-xl flex items-center justify-between gap-4">
              <div>
                <span className="text-xs text-[#A08882] block">Readiness Affirmations</span>
                <span className="font-bold text-slate-100 text-sm sm:text-base">
                  {readinessCount} of 12 Points Reviewed ({readinessPercent}%)
                </span>
              </div>
              <div className="w-32 bg-[#28201E] rounded-full h-2 overflow-hidden">
                <div
                  className="bg-[#C5705D] h-full transition-all duration-300"
                  style={{ width: `${readinessPercent}%` }}
                />
              </div>
            </div>

            {/* 12 Interactive Canonical Review Statements */}
            <div className="space-y-2.5">
              {READINESS_CHECKLIST.map((item) => {
                const checked = isReadinessChecked(item.id);
                return (
                  <div
                    key={item.id}
                    id={`readiness-check-${item.id}`}
                    onClick={() => toggleReadinessCheck(item.id)}
                    className={`p-4 rounded-xl border cursor-pointer transition-all flex items-start gap-3 ${
                      checked
                        ? 'bg-[#19221C] border-[#2A5236] text-slate-100'
                        : 'bg-[#191514] border-[#2B211F] text-slate-300 hover:border-[#422F2B]'
                    }`}
                  >
                    <button
                      type="button"
                      className={`mt-0.5 w-5 h-5 rounded-md flex items-center justify-center text-xs shrink-0 transition-colors ${
                        checked
                          ? 'bg-emerald-500 text-black font-bold'
                          : 'border border-[#4A3935] bg-[#120F0E]'
                      }`}
                    >
                      {checked && <Check className="w-3.5 h-3.5 text-black stroke-[3]" />}
                    </button>

                    <div className="space-y-0.5">
                      <span className="font-heading font-semibold text-xs text-[#DF8E7C] uppercase tracking-wider block">
                        {item.label}
                      </span>
                      <p className="font-serif-body text-sm sm:text-base leading-relaxed">
                        {item.statement}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* A Good Sign of Readiness Pastoral Box */}
            <div className="p-5 bg-[#1F1918] border border-[#4E322C] rounded-xl space-y-2">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#DF8E7C] block">
                A GOOD SIGN OF READINESS
              </span>
              <p className="font-serif-body text-[#F3D5CE] text-sm sm:text-base leading-relaxed">
                "Not that you agree about everything, but that you can tell the truth, listen, seek
                help, understand what marriage is and freely intend what the Church asks you to
                promise."
              </p>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* APPENDIX F: Frequently Asked Questions */}
      {/* ========================================================================= */}
      {selectedTab === 'F' && (
        <div className="space-y-6 animate-in fade-in duration-150">
          <div className="bg-[#161312] border border-[#2F2321] rounded-2xl p-6 sm:p-8 space-y-6">
            <div className="border-b border-[#241E1C] pb-4">
              <span className="text-xs uppercase tracking-wider font-semibold text-[#DF8E7C] font-heading">
                APPENDIX F
              </span>
              <h2 className="font-heading text-xl sm:text-2xl font-bold text-slate-100">
                Frequently Asked Questions
              </h2>
              <p className="text-xs text-[#A08882] italic mt-1">
                Common pastoral and canonical questions answered clearly.
              </p>
            </div>

            {/* Filter Pills */}
            <div className="flex flex-wrap gap-1.5 text-xs">
              {[
                { key: 'all', label: 'All Questions' },
                { key: 'canonical', label: 'Canonical & Validity' },
                { key: 'sacramental', label: 'Sacraments & Grace' },
                { key: 'pastoral', label: 'Pastoral Care' },
                { key: 'practical', label: 'Readings & Music' },
              ].map((f) => (
                <button
                  key={f.key}
                  onClick={() => setFaqFilter(f.key as any)}
                  className={`px-3 py-1.5 rounded-lg text-xs transition-all ${
                    faqFilter === f.key
                      ? 'bg-[#C5705D] text-white font-semibold'
                      : 'bg-[#1C1817] text-slate-400 hover:text-slate-200'
                  }`}
                >
                  {f.label}
                </button>
              ))}
            </div>

            {/* Accordion FAQ Items */}
            <div className="space-y-3">
              {FAQ_LIST.filter((faq) => faqFilter === 'all' || faq.category === faqFilter).map(
                (faq) => {
                  const isOpen = openFaqs[faq.id];
                  return (
                    <div
                      key={faq.id}
                      className="bg-[#1A1615] border border-[#2B211F] rounded-xl overflow-hidden"
                    >
                      <button
                        onClick={() => toggleFaq(faq.id)}
                        className="w-full p-4 text-left flex items-center justify-between gap-3 text-slate-100 hover:bg-[#201A18] transition-colors"
                      >
                        <h3 className="font-heading text-xs sm:text-sm font-semibold">
                          {faq.question}
                        </h3>
                        {isOpen ? (
                          <ChevronUp className="w-4 h-4 text-[#DF8E7C] shrink-0" />
                        ) : (
                          <ChevronDown className="w-4 h-4 text-[#8E7E7A] shrink-0" />
                        )}
                      </button>

                      {isOpen && (
                        <div className="p-4 pt-0 border-t border-[#251D1B] bg-[#141110]">
                          <p className="font-serif-body text-slate-300 text-sm sm:text-base leading-relaxed pt-3">
                            {faq.answer}
                          </p>
                        </div>
                      )}
                    </div>
                  );
                }
              )}
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* APPENDIX G: A Simple Rule of Married Life */}
      {/* ========================================================================= */}
      {selectedTab === 'G' && (
        <div className="space-y-8 animate-in fade-in duration-150">
          <div className="bg-[#161312] border border-[#2F2321] rounded-2xl p-6 sm:p-8 space-y-6">
            <div className="border-b border-[#241E1C] pb-4">
              <span className="text-xs uppercase tracking-wider font-semibold text-[#DF8E7C] font-heading">
                APPENDIX G
              </span>
              <h2 className="font-heading text-xl sm:text-2xl font-bold text-slate-100">
                A Simple Rule of Married Life
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 mt-1 italic font-serif-body">
                "A strong marriage is usually built less by dramatic gestures than by ordinary
                habits repeated faithfully."
              </p>
            </div>

            {/* 11 Rhythm Practices */}
            <div className="space-y-3">
              {RULE_OF_LIFE_ITEMS.map((rule) => {
                const isSelected = profile.selectedHabits.includes(rule.id);
                return (
                  <div
                    key={rule.id}
                    onClick={() => toggleHabit(rule.id)}
                    className={`p-4 rounded-xl border cursor-pointer transition-all flex flex-col sm:flex-row sm:items-start gap-3 sm:gap-4 ${
                      isSelected
                        ? 'bg-[#1C1715] border-[#4A322C]'
                        : 'bg-[#181514] border-[#271F1D] hover:border-[#382B28]'
                    }`}
                  >
                    <div className="flex items-center justify-between sm:w-44 shrink-0">
                      <span className="font-heading font-semibold text-xs sm:text-sm text-[#DF8E7C]">
                        {rule.rhythm}
                      </span>
                      <span
                        className={`text-[10px] px-2 py-0.5 rounded-full font-medium sm:hidden ${
                          isSelected
                            ? 'bg-[#3F2B26] text-[#F3D5CE]'
                            : 'bg-[#201A18] text-[#8E7E7A]'
                        }`}
                      >
                        {isSelected ? 'Our Habit' : 'Tap to adopt'}
                      </span>
                    </div>

                    <p className="font-serif-body text-slate-200 text-xs sm:text-sm leading-relaxed sm:pt-0.5">
                      {rule.practice}
                    </p>
                  </div>
                );
              })}
            </div>

            {/* A Couple's Prayer Box */}
            <div className="p-6 bg-[#1F1817] border border-[#482F2A] rounded-2xl space-y-3 text-center">
              <div className="flex items-center justify-between text-xs text-[#A08882]">
                <span className="font-heading font-semibold text-[#DF8E7C] uppercase tracking-wider">
                  A Couple's Prayer
                </span>
                <button
                  onClick={handleCopyPrayer}
                  className="inline-flex items-center gap-1 text-[11px] text-[#DF8E7C] hover:underline"
                >
                  {copiedPrayer ? 'Copied' : 'Copy'}
                </button>
              </div>
              <span className="text-xl text-[#DF8E7C]">☩</span>
              <p className="font-serif-body italic text-base sm:text-lg text-[#F3D5CE] leading-relaxed">
                "{COUPLES_PRAYER}"
              </p>
            </div>

            {/* Sources and Doctrinal References */}
            <div className="p-5 bg-[#141212] border border-[#27201E] rounded-xl space-y-3 text-xs">
              <h3 className="font-heading text-xs font-semibold text-[#A08882] uppercase tracking-wider">
                Sources and Doctrinal References
              </h3>
              <ul className="space-y-1.5 text-slate-400 font-serif-body text-xs sm:text-sm list-disc pl-4">
                {SOURCES_AND_REFERENCES.map((ref, idx) => (
                  <li key={idx}>{ref}</li>
                ))}
              </ul>
            </div>

            {/* Final Reminder */}
            <div className="p-5 bg-[#231A18] border border-[#52332D] rounded-xl">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#DF8E7C] block mb-1">
                FINAL REMINDER
              </span>
              <p className="font-serif-body text-[#F3D5CE] text-sm sm:text-base leading-relaxed">
                {FINAL_REMINDER}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
