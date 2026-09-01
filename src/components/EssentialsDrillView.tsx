import React, { useState } from 'react';
import { useCourse } from '../context/CourseContext';
import { ALL_ESSENTIALS_15 } from '../data/courseData';
import { EssentialQuestion } from '../types';
import {
  Sparkles,
  CheckCircle2,
  RotateCcw,
  Search,
  Eye,
  EyeOff,
  Shuffle,
  ChevronLeft,
  ChevronRight,
  BookOpen,
  Check,
  Award,
  Layers,
  HelpCircle,
} from 'lucide-react';

export const EssentialsDrillView: React.FC = () => {
  const { profile, toggleMasteredEssential, isEssentialMastered } = useCourse();

  const [mode, setMode] = useState<'flashcards' | 'quiz' | 'list'>('flashcards');
  const [filterConv, setFilterConv] = useState<number | 'all'>('all');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [shuffled, setShuffled] = useState(false);

  // Filter items
  const filteredList = ALL_ESSENTIALS_15.filter((item) => {
    const matchConv = filterConv === 'all' || item.conversationNumber === filterConv;
    const matchSearch =
      item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.answer.toLowerCase().includes(searchQuery.toLowerCase());
    return matchConv && matchSearch;
  });

  const activeItems = shuffled
    ? [...filteredList].sort(() => 0.5 - Math.random())
    : filteredList;

  const currentItem = activeItems[currentIndex] || activeItems[0] || ALL_ESSENTIALS_15[0];
  const isCurrentMastered = currentItem ? isEssentialMastered(currentItem.number) : false;

  const handleNext = () => {
    setIsFlipped(false);
    setCurrentIndex((prev) => (prev + 1) % (activeItems.length || 1));
  };

  const handlePrev = () => {
    setIsFlipped(false);
    setCurrentIndex((prev) => (prev - 1 + activeItems.length) % (activeItems.length || 1));
  };

  const handleShuffle = () => {
    setShuffled(!shuffled);
    setCurrentIndex(0);
    setIsFlipped(false);
  };

  const totalMastered = profile.masteredEssentials.length;
  const masteryPercent = Math.round((totalMastered / 15) * 100);

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-8 pb-20">
      {/* Header & Stats */}
      <div className="space-y-4 text-center">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded bg-[#1C1C1C] border border-white/10 text-[#DF8E7C] text-[10px] uppercase tracking-widest font-semibold">
          <Sparkles className="w-3 h-3 text-[#B85D42]" />
          <span>Memory-Recall Drills</span>
        </div>

        <h1 className="text-3xl sm:text-4xl md:text-5xl text-white font-serif font-normal">
          The 15 Essentials of Catholic Marriage
        </h1>

        <p className="font-serif italic text-slate-300 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
          "This is not a theological examination. You should, however, be able to understand and
          explain these truths in your own words."
        </p>

        {/* Progress & Mastery Banner */}
        <div className="max-w-md mx-auto p-4 bg-[#161616] border border-white/10 rounded flex items-center justify-between gap-4">
          <div className="text-left text-xs">
            <span className="text-[#8E7E7A] block text-[9px] uppercase tracking-widest font-bold">
              Mastery Progress
            </span>
            <span className="font-bold text-slate-100 text-sm font-serif">
              {totalMastered} of 15 Mastered ({masteryPercent}%)
            </span>
          </div>
          <div className="w-32 bg-[#251D1B] rounded-full h-1.5 overflow-hidden">
            <div
              className="bg-[#B85D42] h-full transition-all duration-300"
              style={{ width: `${masteryPercent}%` }}
            />
          </div>
          {totalMastered === 15 && (
            <span className="px-2 py-0.5 rounded bg-[#1C261F] text-emerald-300 text-[10px] uppercase tracking-wider font-bold flex items-center gap-1">
              <Award className="w-3.5 h-3.5" /> Complete
            </span>
          )}
        </div>
      </div>

      {/* Control Bar: Modes & Filters */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-[#161616] p-2 rounded border border-white/10">
        {/* Mode Switcher */}
        <div className="flex items-center gap-1 w-full sm:w-auto">
          <button
            id="drill-mode-flashcards-btn"
            onClick={() => setMode('flashcards')}
            className={`flex-1 sm:flex-none px-3.5 py-1.5 rounded text-[10px] uppercase tracking-wider font-semibold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
              mode === 'flashcards'
                ? 'bg-[#B85D42] text-white shadow-md'
                : 'text-slate-400 hover:text-slate-200 hover:bg-[#1C1C1C]'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>Flashcard Drill</span>
          </button>

          <button
            id="drill-mode-quiz-btn"
            onClick={() => setMode('quiz')}
            className={`flex-1 sm:flex-none px-3.5 py-1.5 rounded text-[10px] uppercase tracking-wider font-semibold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
              mode === 'quiz'
                ? 'bg-[#B85D42] text-white shadow-md'
                : 'text-slate-400 hover:text-slate-200 hover:bg-[#1C1C1C]'
            }`}
          >
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Self-Test Quiz</span>
          </button>

          <button
            id="drill-mode-list-btn"
            onClick={() => setMode('list')}
            className={`flex-1 sm:flex-none px-3.5 py-1.5 rounded text-[10px] uppercase tracking-wider font-semibold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
              mode === 'list'
                ? 'bg-[#B85D42] text-white shadow-md'
                : 'text-slate-400 hover:text-slate-200 hover:bg-[#1C1C1C]'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>Full List</span>
          </button>
        </div>

        {/* Conversation Filter */}
        <div className="flex items-center gap-1.5 w-full sm:w-auto justify-end text-xs">
          <span className="text-[#8E7E7A] text-[10px] uppercase tracking-wider hidden md:inline">Filter:</span>
          {(['all', 1, 2, 3, 4] as const).map((cNum) => (
            <button
              key={cNum}
              onClick={() => {
                setFilterConv(cNum);
                setCurrentIndex(0);
                setIsFlipped(false);
              }}
              className={`px-2.5 py-1 rounded text-[10px] uppercase tracking-wider font-medium transition-all cursor-pointer ${
                filterConv === cNum
                  ? 'bg-[#1C1C1C] text-[#DF8E7C] border border-[#B85D42]/50 font-bold'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-[#1C1C1C]'
              }`}
            >
              {cNum === 'all' ? 'All 15' : `Conv ${cNum}`}
            </button>
          ))}
        </div>
      </div>

      {/* MODE 1: FLASHCARD DRILL */}
      {mode === 'flashcards' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between text-xs text-[#A08882] px-2 font-serif">
            <span>
              Card {currentIndex + 1} of {activeItems.length}
            </span>
            <button
              onClick={handleShuffle}
              className={`flex items-center gap-1 text-[10px] uppercase tracking-wider px-2.5 py-1 rounded border transition-all cursor-pointer ${
                shuffled
                  ? 'bg-[#1C1C1C] text-[#DF8E7C] border-[#B85D42]'
                  : 'bg-[#161616] text-slate-400 border-white/10'
              }`}
            >
              <Shuffle className="w-3 h-3" />
              <span>{shuffled ? 'Shuffled' : 'Sequential'}</span>
            </button>
          </div>

          {/* Flashcard Frame */}
          <div
            id="flashcard-main-card"
            onClick={() => setIsFlipped(!isFlipped)}
            className="min-h-[280px] sm:min-h-[320px] bg-[#161616] border-t-2 border-[#B85D42] border-x border-b border-white/10 hover:border-white/20 rounded p-6 sm:p-10 shadow-2xl cursor-pointer flex flex-col justify-between transition-all duration-300 relative select-none"
          >
            {/* Top Card Badge */}
            <div className="flex items-center justify-between">
              <span className="text-[9px] uppercase tracking-widest font-bold px-2.5 py-0.5 rounded bg-[#1C1C1C] text-[#DF8E7C] border border-white/10">
                Question {currentItem.number} • Conversation {currentItem.conversationNumber}
              </span>
              <span className="text-[10px] text-slate-500 uppercase tracking-widest flex items-center gap-1">
                {isFlipped ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                <span>{isFlipped ? 'Answer Revealed' : 'Click to flip'}</span>
              </span>
            </div>

            {/* Middle Content */}
            <div className="my-auto py-6 text-center">
              {!isFlipped ? (
                <div className="space-y-3">
                  <span className="text-[9px] tracking-[0.2em] uppercase font-bold text-[#B85D42]">
                    Question
                  </span>
                  <h2 className="text-xl sm:text-2xl md:text-3xl text-white font-serif font-normal leading-snug">
                    {currentItem.question}
                  </h2>
                  <p className="text-xs text-slate-400 font-serif italic pt-3">
                    Think of the Catholic answer, then click or tap the card to verify.
                  </p>
                </div>
              ) : (
                <div className="space-y-3 animate-in fade-in zoom-in-95 duration-200">
                  <span className="text-[9px] tracking-[0.2em] uppercase font-bold text-[#B85D42]">
                    Canonical Truth & Answer
                  </span>
                  <p className="font-serif-body text-slate-100 text-lg sm:text-2xl leading-relaxed text-[#F3D5CE]">
                    "{currentItem.answer}"
                  </p>
                </div>
              )}
            </div>

            {/* Bottom Card Footer */}
            <div className="flex items-center justify-between pt-4 border-t border-white/5">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  toggleMasteredEssential(currentItem.number);
                }}
                className={`px-3 py-1.5 rounded text-[10px] uppercase tracking-wider font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
                  isCurrentMastered
                    ? 'bg-[#1C261F] text-emerald-300 border border-[#274632]'
                    : 'bg-[#1C1C1C] text-[#DF8E7C] border border-white/10 hover:border-[#B85D42]'
                }`}
              >
                <Check className="w-3.5 h-3.5" />
                <span>{isCurrentMastered ? 'Mastered' : 'Mark as Mastered'}</span>
              </button>

              <span className="text-[11px] text-slate-500 font-serif">
                {currentIndex + 1} / {activeItems.length}
              </span>
            </div>
          </div>

          {/* Navigation Controls */}
          <div className="flex items-center justify-center gap-4">
            <button
              id="drill-prev-btn"
              onClick={handlePrev}
              className="p-3 rounded bg-[#161616] border border-white/10 hover:border-white/30 text-slate-200 hover:text-white transition-all active:scale-95 cursor-pointer"
              aria-label="Previous card"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            <button
              onClick={() => setIsFlipped(!isFlipped)}
              className="px-6 py-2.5 rounded bg-[#1C1C1C] border border-white/10 text-[10px] uppercase tracking-wider font-semibold text-[#DF8E7C] hover:border-[#B85D42] transition-all cursor-pointer"
            >
              {isFlipped ? 'Show Question' : 'Reveal Answer'}
            </button>

            <button
              id="drill-next-btn"
              onClick={handleNext}
              className="p-3 rounded border border-[#B85D42] bg-[#B85D42] text-white hover:bg-[#8F3F2A] transition-all active:scale-95 shadow-md cursor-pointer"
              aria-label="Next card"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      )}

      {/* MODE 2: SELF-TEST / QUIZ MODE */}
      {mode === 'quiz' && (
        <div className="space-y-6">
          <div className="p-4 bg-[#161616] border border-white/10 rounded space-y-2">
            <h3 className="text-xs uppercase tracking-[0.2em] font-bold text-[#DF8E7C]">
              Couple Self-Test & Drill
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed font-serif">
              Take turns asking each question aloud. Explain the truth in your own words before
              revealing the text. Rate your grasp to track your mutual mastery.
            </p>
          </div>

          <div className="bg-[#161616] border border-white/10 rounded p-6 sm:p-8 space-y-6">
            <div className="flex items-center justify-between text-xs">
              <span className="text-[10px] uppercase tracking-widest font-bold text-[#B85D42]">
                Question #{currentItem.number}
              </span>
              <span className="text-slate-500 font-serif text-xs">
                Card {currentIndex + 1} of {activeItems.length}
              </span>
            </div>

            <h2 className="text-xl sm:text-2xl font-serif text-slate-100 font-normal">
              {currentItem.question}
            </h2>

            {/* Answer toggle */}
            {!isFlipped ? (
              <button
                onClick={() => setIsFlipped(true)}
                className="w-full py-4 rounded bg-[#1C1C1C] border border-dashed border-white/20 text-xs uppercase tracking-wider font-semibold text-[#DF8E7C] hover:border-[#B85D42] flex items-center justify-center gap-2 transition-all cursor-pointer"
              >
                <Eye className="w-4 h-4" />
                <span>Check Official Answer</span>
              </button>
            ) : (
              <div className="space-y-4 animate-in fade-in duration-150">
                <div className="p-4 rounded bg-[#1C1C1C] border border-white/10">
                  <span className="text-[9px] uppercase tracking-widest font-bold text-[#B85D42] block mb-1">
                    Canonical Formulation
                  </span>
                  <p className="font-serif-body text-base sm:text-lg text-[#F3D5CE] leading-relaxed">
                    {currentItem.answer}
                  </p>
                </div>

                <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
                  <span className="text-xs text-slate-400 font-serif">How did you do?</span>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => {
                        if (isCurrentMastered) toggleMasteredEssential(currentItem.number);
                        handleNext();
                      }}
                      className="px-3 py-1.5 rounded bg-[#1C1C1C] text-slate-300 hover:text-white border border-white/10 text-[10px] uppercase tracking-wider font-medium cursor-pointer"
                    >
                      Need More Practice
                    </button>
                    <button
                      onClick={() => {
                        if (!isCurrentMastered) toggleMasteredEssential(currentItem.number);
                        handleNext();
                      }}
                      className="px-4 py-1.5 rounded bg-[#1C261F] text-emerald-300 border border-[#274632] text-[10px] uppercase tracking-wider font-semibold flex items-center gap-1 cursor-pointer"
                    >
                      <Check className="w-3.5 h-3.5" />
                      <span>Got It! Mastered</span>
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="flex justify-between items-center">
            <button
              onClick={handlePrev}
              className="px-4 py-2 rounded bg-[#161616] border border-white/10 text-[10px] uppercase tracking-wider font-semibold text-slate-300 hover:text-white flex items-center gap-1.5 cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4" /> Previous
            </button>
            <button
              onClick={handleNext}
              className="px-4 py-2 rounded border border-[#B85D42] bg-[#B85D42] text-white text-[10px] uppercase tracking-wider font-semibold flex items-center gap-1.5 shadow-md hover:bg-[#8F3F2A] cursor-pointer"
            >
              Next Question <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* MODE 3: FULL REFERENCE LIST */}
      {mode === 'list' && (
        <div className="space-y-4">
          {/* Search Box */}
          <div className="relative">
            <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search the 15 Essentials..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#161616] border border-white/10 rounded pl-10 pr-4 py-2.5 text-xs text-slate-200 focus:outline-none focus:border-[#B85D42] font-serif"
            />
          </div>

          <div className="space-y-3">
            {filteredList.map((item) => {
              const isMastered = isEssentialMastered(item.number);
              return (
                <div
                  key={item.id}
                  className="p-4 sm:p-5 bg-[#161616] border border-white/5 rounded space-y-2 hover:border-white/20 transition-colors"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-start gap-2.5">
                      <span className="font-serif font-bold text-[#B85D42] text-sm shrink-0">
                        {item.number}.
                      </span>
                      <div>
                        <h3 className="font-serif text-slate-100 text-sm sm:text-base font-medium">
                          {item.question}
                        </h3>
                        <span className="text-[10px] uppercase tracking-widest text-[#B85D42]">
                          Conversation {item.conversationNumber}
                        </span>
                      </div>
                    </div>

                    <button
                      onClick={() => toggleMasteredEssential(item.number)}
                      className={`p-1.5 rounded text-xs transition-colors shrink-0 cursor-pointer ${
                        isMastered
                          ? 'bg-[#1C261F] text-emerald-300 border border-[#274632]'
                          : 'bg-[#1C1C1C] text-slate-400 hover:text-slate-200 border border-white/5'
                      }`}
                      title={isMastered ? 'Mastered' : 'Mark as mastered'}
                    >
                      <Check className="w-4 h-4" />
                    </button>
                  </div>

                  <p className="font-serif-body text-slate-300 text-sm sm:text-base pl-6 leading-relaxed">
                    {item.answer}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
