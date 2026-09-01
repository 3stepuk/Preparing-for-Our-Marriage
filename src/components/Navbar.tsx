import React, { useState } from 'react';
import { useCourse } from '../context/CourseContext';
import { ActiveTab, AppendixTab } from '../types';
import { CONVERSATIONS, PARISH_INFO } from '../data/courseData';
import {
  Heart,
  BookOpen,
  CheckCircle2,
  Sparkles,
  User,
  Menu,
  X,
  FileText,
  HelpCircle,
  ShieldCheck,
  ChevronDown,
  Church,
} from 'lucide-react';

interface NavbarProps {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  selectedConversationId: number;
  setSelectedConversationId: (id: number) => void;
  selectedAppendixTab: AppendixTab;
  setSelectedAppendixTab: (tab: AppendixTab) => void;
  onOpenOptIn: () => void;
  onOpenProfile: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  selectedConversationId,
  setSelectedConversationId,
  selectedAppendixTab,
  setSelectedAppendixTab,
  onOpenOptIn,
  onOpenProfile,
}) => {
  const { profile } = useCourse();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [convDropdownOpen, setConvDropdownOpen] = useState(false);
  const [appDropdownOpen, setAppDropdownOpen] = useState(false);

  // Overall progress calculation
  const totalTasks = 4 + 12 + 15; // 4 convs + 12 readiness + 15 essentials
  const completedTasks =
    profile.completedConversations.length +
    profile.checkedReadiness.length +
    profile.masteredEssentials.length;
  const progressPercent = Math.min(100, Math.round((completedTasks / totalTasks) * 100));

  const coupleDisplayName =
    profile.partner1Name && profile.partner2Name
      ? `${profile.partner1Name} & ${profile.partner2Name}`
      : profile.partner1Name || 'Engaged Couple';

  return (
    <header className="sticky top-0 z-40 bg-[#141414] border-b border-white/10 select-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo / Title */}
          <div
            id="nav-brand-logo"
            onClick={() => {
              setActiveTab('home');
              setMobileMenuOpen(false);
            }}
            className="flex items-center gap-3.5 cursor-pointer group"
          >
            <div className="w-8 h-8 rounded-full bg-[#B85D42] flex items-center justify-center text-black font-bold text-xs transition-transform group-hover:scale-105">
              <span>M</span>
            </div>
            <div>
              <div className="uppercase tracking-[0.2em] text-xs font-semibold text-white font-serif group-hover:text-[#DF8E7C] transition-colors leading-tight">
                Preparing for Our Marriage
              </div>
              <div className="text-[9px] text-[#A08882] tracking-widest uppercase font-medium">
                Catholic Matrimony
              </div>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-2 lg:space-x-4 text-[10px] uppercase tracking-widest">
            {/* Overview / Home */}
            <button
              id="nav-tab-home"
              onClick={() => setActiveTab('home')}
              className={`px-3 py-1.5 transition-all cursor-pointer ${
                activeTab === 'home'
                  ? 'text-white border-b-2 border-[#B85D42] font-semibold'
                  : 'text-slate-400 hover:text-[#B85D42]'
              }`}
            >
              Overview
            </button>

            {/* Conversations Dropdown */}
            <div className="relative">
              <button
                id="nav-tab-conversations-btn"
                onClick={() => {
                  setConvDropdownOpen(!convDropdownOpen);
                  setAppDropdownOpen(false);
                }}
                className={`flex items-center gap-1.5 px-3 py-1.5 transition-all cursor-pointer ${
                  activeTab === 'conversations'
                    ? 'text-white border-b-2 border-[#B85D42] font-semibold'
                    : 'text-slate-400 hover:text-[#B85D42]'
                }`}
              >
                <span>4 Conversations</span>
                <span className="text-[9px] px-1.5 py-0.5 bg-[#1C1C1C] text-[#DF8E7C] rounded border border-white/10 font-mono">
                  {profile.completedConversations.length}/4
                </span>
                <ChevronDown className="w-3 h-3 ml-0.5 opacity-70" />
              </button>

              {convDropdownOpen && (
                <div
                  className="absolute left-0 mt-2 w-72 bg-[#161616] border border-white/10 rounded-lg shadow-2xl py-2 z-50 animate-in fade-in slide-in-from-top-1 duration-150"
                  onMouseLeave={() => setConvDropdownOpen(false)}
                >
                  <div className="px-3 py-1.5 text-[9px] font-bold text-[#A08882] uppercase tracking-widest border-b border-white/5">
                    Parish Conversations
                  </div>
                  {CONVERSATIONS.map((conv) => {
                    const isDone = profile.completedConversations.includes(conv.id);
                    return (
                      <button
                        key={conv.id}
                        id={`nav-conv-item-${conv.id}`}
                        onClick={() => {
                          setSelectedConversationId(conv.id);
                          setActiveTab('conversations');
                          setConvDropdownOpen(false);
                        }}
                        className={`w-full text-left px-3 py-2.5 flex items-center justify-between text-xs hover:bg-[#1C1C1C] transition-colors ${
                          activeTab === 'conversations' && selectedConversationId === conv.id
                            ? 'text-[#DF8E7C] bg-[#1F1918] font-semibold'
                            : 'text-slate-200'
                        }`}
                      >
                        <div className="flex items-center gap-2 font-serif">
                          <span className="font-bold text-[#B85D42] w-4 text-center">
                            {conv.romanNumeral}
                          </span>
                          <span className="truncate">{conv.title}</span>
                        </div>
                        {isDone && <CheckCircle2 className="w-3.5 h-3.5 text-[#B85D42] shrink-0" />}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Memory Drills / Essentials */}
            <button
              id="nav-tab-essentials"
              onClick={() => setActiveTab('essentials')}
              className={`flex items-center gap-1.5 px-3 py-1.5 transition-all cursor-pointer ${
                activeTab === 'essentials'
                  ? 'text-white border-b-2 border-[#B85D42] font-semibold'
                  : 'text-slate-400 hover:text-[#B85D42]'
              }`}
            >
              <span>Recalls</span>
              <span className="text-[9px] px-1.5 py-0.5 bg-[#1C1C1C] text-[#DF8E7C] rounded border border-white/10 font-mono">
                {profile.masteredEssentials.length}/15
              </span>
            </button>

            {/* Appendices Dropdown */}
            <div className="relative">
              <button
                id="nav-tab-appendices-btn"
                onClick={() => {
                  setAppDropdownOpen(!appDropdownOpen);
                  setConvDropdownOpen(false);
                }}
                className={`flex items-center gap-1.5 px-3 py-1.5 transition-all cursor-pointer ${
                  activeTab === 'appendices'
                    ? 'text-white border-b-2 border-[#B85D42] font-semibold'
                    : 'text-slate-400 hover:text-[#B85D42]'
                }`}
              >
                <span>Appendices (A–G)</span>
                <ChevronDown className="w-3 h-3 ml-0.5 opacity-70" />
              </button>

              {appDropdownOpen && (
                <div
                  className="absolute right-0 mt-2 w-80 bg-[#161616] border border-white/10 rounded-lg shadow-2xl py-2 z-50"
                  onMouseLeave={() => setAppDropdownOpen(false)}
                >
                  <div className="px-3 py-1.5 text-[9px] font-bold text-[#A08882] uppercase tracking-widest border-b border-white/5">
                    Reference Appendices
                  </div>
                  {[
                    { key: 'A', title: 'The Wedding Rite - Step by Step' },
                    { key: 'B', title: 'Freedom to Marry & Practical Prep' },
                    { key: 'C', title: 'The Essentials (15 Answers)' },
                    { key: 'D', title: 'Conversations That Matter (10 Areas)' },
                    { key: 'E', title: 'Before the Wedding: Are We Ready?' },
                    { key: 'F', title: 'Frequently Asked Questions' },
                    { key: 'G', title: 'A Simple Rule of Married Life' },
                  ].map((item) => (
                    <button
                      key={item.key}
                      id={`nav-app-item-${item.key}`}
                      onClick={() => {
                        setSelectedAppendixTab(item.key as AppendixTab);
                        setActiveTab('appendices');
                        setAppDropdownOpen(false);
                      }}
                      className={`w-full text-left px-3 py-2 flex items-center gap-2 text-xs hover:bg-[#1C1C1C] transition-colors ${
                        activeTab === 'appendices' && selectedAppendixTab === item.key
                          ? 'text-[#DF8E7C] bg-[#1F1918] font-semibold'
                          : 'text-slate-200'
                      }`}
                    >
                      <span className="font-heading font-bold text-[#B85D42] w-5">
                        {item.key}
                      </span>
                      <span className="truncate font-serif">{item.title}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Profile & Readiness */}
            <button
              id="nav-tab-profile"
              onClick={() => setActiveTab('profile')}
              className={`flex items-center gap-1.5 px-3 py-1.5 transition-all cursor-pointer ${
                activeTab === 'profile'
                  ? 'text-white border-b-2 border-[#B85D42] font-semibold'
                  : 'text-slate-400 hover:text-[#B85D42]'
              }`}
            >
              <span>Profile</span>
            </button>
          </nav>

          {/* Right Header Utilities: Quick Opt-in & Profile Action */}
          <div className="flex items-center gap-3">
            {!profile.optInSubmitted ? (
              <button
                id="header-optin-btn"
                onClick={onOpenOptIn}
                className="hidden sm:inline-flex items-center gap-1.5 text-[10px] uppercase tracking-wider px-2.5 py-1 rounded bg-[#1C1C1C] text-[#DF8E7C] border border-white/10 hover:border-[#B85D42] transition-all font-semibold"
                title="Optional sign-in: notify Father John"
              >
                <Church className="w-3 h-3 text-[#B85D42]" />
                <span>Notify Priest</span>
              </button>
            ) : (
              <span
                onClick={onOpenProfile}
                className="hidden sm:inline-flex items-center gap-1 text-[10px] uppercase tracking-wider px-2 py-1 rounded bg-[#1C1C1C] text-[#DF8E7C] border border-white/10 cursor-pointer"
                title="Registered for parish preparation"
              >
                <ShieldCheck className="w-3 h-3 text-[#B85D42]" />
                <span>Parish Linked</span>
              </span>
            )}

            {/* Couple Profile Avatar/Button */}
            <button
              id="header-profile-btn"
              onClick={onOpenProfile}
              className="flex items-center gap-2 pl-2 pr-3 py-1 rounded bg-[#161616] border border-white/10 hover:border-[#B85D42]/60 transition-all text-xs text-slate-200"
            >
              <div className="w-5 h-5 rounded-full bg-[#B85D42] text-black flex items-center justify-center font-bold text-[9px]">
                {profile.partner1Name ? profile.partner1Name.charAt(0) : 'M'}
              </div>
              <span className="hidden lg:inline max-w-[110px] truncate text-[11px] font-medium font-serif italic text-slate-300">
                {coupleDisplayName}
              </span>
              <div className="w-7 bg-slate-800 rounded-full h-1 overflow-hidden">
                <div
                  className="bg-[#B85D42] h-full transition-all duration-300"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
            </button>

            {/* Mobile Menu Toggle */}
            <button
              id="mobile-menu-toggle-btn"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded text-slate-300 hover:text-white hover:bg-[#1C1C1C]"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#141414] border-b border-white/10 px-4 pt-2 pb-6 space-y-3 font-serif">
          <div className="flex items-center justify-between py-2 border-b border-white/5 text-xs text-[#A08882]">
            <span>{coupleDisplayName}</span>
            <span className="font-mono text-[10px]">Progress: {progressPercent}%</span>
          </div>

          <div className="grid grid-cols-2 gap-2 text-xs">
            <button
              onClick={() => {
                setActiveTab('home');
                setMobileMenuOpen(false);
              }}
              className={`p-2.5 rounded text-left ${
                activeTab === 'home'
                  ? 'bg-[#1C1C1C] text-white border-l-2 border-[#B85D42]'
                  : 'bg-[#161616] text-slate-300'
              }`}
            >
              Overview
            </button>

            <button
              onClick={() => {
                setActiveTab('essentials');
                setMobileMenuOpen(false);
              }}
              className={`p-2.5 rounded text-left ${
                activeTab === 'essentials'
                  ? 'bg-[#1C1C1C] text-white border-l-2 border-[#B85D42]'
                  : 'bg-[#161616] text-slate-300'
              }`}
            >
              Recalls ({profile.masteredEssentials.length}/15)
            </button>
          </div>

          <div>
            <div className="text-[9px] font-bold text-[#A08882] uppercase tracking-widest mb-1 px-1">
              Conversations
            </div>
            <div className="space-y-1">
              {CONVERSATIONS.map((conv) => (
                <button
                  key={conv.id}
                  onClick={() => {
                    setSelectedConversationId(conv.id);
                    setActiveTab('conversations');
                    setMobileMenuOpen(false);
                  }}
                  className={`w-full text-left px-3 py-2 rounded text-xs flex items-center justify-between ${
                    activeTab === 'conversations' && selectedConversationId === conv.id
                      ? 'bg-[#1C1C1C] text-white border-l-2 border-[#B85D42]'
                      : 'bg-[#161616] text-slate-300'
                  }`}
                >
                  <span className="truncate">
                    {conv.romanNumeral}. {conv.title}
                  </span>
                  {profile.completedConversations.includes(conv.id) && (
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#B85D42]" />
                  )}
                </button>
              ))}
            </div>
          </div>

          <div>
            <div className="text-[9px] font-bold text-[#A08882] uppercase tracking-widest mb-1 px-1">
              Appendices & Tools
            </div>
            <div className="grid grid-cols-2 gap-1.5">
              {[
                { key: 'A', title: 'Wedding Rite' },
                { key: 'B', title: 'Freedom to Marry' },
                { key: 'C', title: '15 Essentials' },
                { key: 'D', title: '10 Deep Talks' },
                { key: 'E', title: 'Are We Ready?' },
                { key: 'F', title: 'Parish FAQs' },
                { key: 'G', title: 'Rule of Married Life' },
              ].map((item) => (
                <button
                  key={item.key}
                  onClick={() => {
                    setSelectedAppendixTab(item.key as AppendixTab);
                    setActiveTab('appendices');
                    setMobileMenuOpen(false);
                  }}
                  className={`p-2 rounded text-[11px] text-left truncate ${
                    activeTab === 'appendices' && selectedAppendixTab === item.key
                      ? 'bg-[#1C1C1C] text-[#DF8E7C] border-l-2 border-[#B85D42]'
                      : 'bg-[#161616] text-slate-300'
                  }`}
                >
                  App. {item.key}: {item.title}
                </button>
              ))}
            </div>
          </div>

          <div className="pt-2 flex gap-2">
            <button
              onClick={() => {
                setActiveTab('profile');
                setMobileMenuOpen(false);
              }}
              className="flex-1 py-2 rounded bg-[#161616] text-white border border-white/10 text-xs font-medium"
            >
              Couple Profile & Notes
            </button>
            {!profile.optInSubmitted && (
              <button
                onClick={() => {
                  onOpenOptIn();
                  setMobileMenuOpen(false);
                }}
                className="py-2 px-3 rounded bg-[#B85D42] text-white text-xs font-semibold"
              >
                Notify Priest
              </button>
            )}
          </div>
        </div>
      )}
    </header>
  );
};
