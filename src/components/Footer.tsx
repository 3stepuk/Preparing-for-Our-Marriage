import React from 'react';
import { PARISH_INFO } from '../data/courseData';
import { ActiveTab, AppendixTab } from '../types';
import { Shield } from 'lucide-react';

interface FooterProps {
  setActiveTab: (tab: ActiveTab) => void;
  setSelectedAppendixTab: (tab: AppendixTab) => void;
  onOpenOptIn: () => void;
  onOpenProfile: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  setActiveTab,
  setSelectedAppendixTab,
  onOpenOptIn,
  onOpenProfile,
}) => {
  return (
    <footer className="bg-[#141414] border-t border-white/5 text-xs text-[#8E7E7A] pt-12 pb-16 no-print">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Col */}
          <div className="space-y-3 md:col-span-2">
            <div className="flex items-center gap-3">
              <span className="w-7 h-7 rounded-full bg-[#B85D42] text-black flex items-center justify-center font-bold text-xs">
                M
              </span>
              <span className="uppercase tracking-[0.2em] text-xs font-semibold text-white font-serif">
                PREPARING FOR OUR MARRIAGE
              </span>
            </div>
            <p className="font-serif-body italic text-slate-300 text-sm max-w-md leading-relaxed">
              "{PARISH_INFO.motto}"
            </p>
            <div className="text-[11px] text-[#A08882] space-y-0.5 font-serif">
              <p className="italic">{PARISH_INFO.parishes}</p>
              <p className="text-[#B85D42] uppercase tracking-widest text-[9px] font-sans font-bold">
                {PARISH_INFO.edition}
              </p>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-2.5">
            <h4 className="text-[10px] uppercase tracking-[0.2em] font-bold text-white">
              Course Chapters
            </h4>
            <ul className="space-y-2 text-xs font-serif text-slate-400">
              <li>
                <button
                  onClick={() => setActiveTab('home')}
                  className="hover:text-[#DF8E7C] transition-colors cursor-pointer"
                >
                  Overview & Welcome
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveTab('conversations')}
                  className="hover:text-[#DF8E7C] transition-colors cursor-pointer"
                >
                  The 4 Conversations
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveTab('essentials')}
                  className="hover:text-[#DF8E7C] transition-colors cursor-pointer"
                >
                  15 Essentials Drill
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setSelectedAppendixTab('E');
                    setActiveTab('appendices');
                  }}
                  className="hover:text-[#DF8E7C] transition-colors cursor-pointer"
                >
                  Readiness Checklist (App. E)
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenProfile}
                  className="hover:text-[#DF8E7C] transition-colors cursor-pointer"
                >
                  Couple Profile & Notes
                </button>
              </li>
            </ul>
          </div>

          {/* Appendices & Mentors */}
          <div className="space-y-2.5">
            <h4 className="text-[10px] uppercase tracking-[0.2em] font-bold text-white">
              Parish Pastoral Care
            </h4>
            <p className="text-[11px] text-slate-400 leading-relaxed font-serif">
              Designed for engaged couples in parish preparation. Bring all canonical enquiries and
              wedding liturgy plans to your priest.
            </p>
            <div className="pt-1">
              <button
                onClick={onOpenOptIn}
                className="px-3.5 py-1.5 rounded bg-[#161616] text-[#DF8E7C] border border-white/10 hover:border-[#B85D42] text-[10px] uppercase tracking-wider font-semibold transition-colors cursor-pointer"
              >
                Optional Parish Sign-in (Formspree)
              </button>
            </div>
          </div>
        </div>

        {/* Bottom copyright / offline declaration */}
        <div className="pt-6 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-[#786763] font-serif">
          <p>© {new Date().getFullYear()} Catholic Couple Marriage Preparation • Parish Edition</p>
          <div className="flex items-center gap-4 text-[10px] uppercase tracking-wider font-sans">
            <span className="flex items-center gap-1.5 text-slate-400">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>Local Storage Active</span>
            </span>
            <span className="text-slate-500">•</span>
            <span className="text-slate-400">Catholic Matrimonial Series</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

