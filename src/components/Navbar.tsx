import React from 'react';
import { Language, UserRole } from '../types';
import { translations } from '../data/translations';
import { HeartPulse, Wifi, WifiOff, RefreshCw, ShieldCheck, Stethoscope, Building2, Users } from './Icons';

interface NavbarProps {
  currentLanguage: Language;
  onLanguageChange: (lang: Language) => void;
  activeRole: UserRole;
  onRoleChange: (role: UserRole) => void;
  isOffline: boolean;
  onToggleOffline: () => void;
  pendingSyncCount: number;
  onSync: () => void;
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentLanguage,
  onLanguageChange,
  activeRole,
  onRoleChange,
  isOffline,
  onToggleOffline,
  pendingSyncCount,
  onSync,
  activeTab,
  onTabChange,
}) => {
  const t = translations[currentLanguage];

  const roleList: { id: UserRole; label: string; icon: any; color: string }[] = [
    { id: 'asha', label: t.roles.asha, icon: Users, color: 'text-amber-600 bg-amber-50 border-amber-200' },
    { id: 'phc', label: t.roles.phc, icon: Stethoscope, color: 'text-teal-600 bg-teal-50 border-teal-200' },
    { id: 'specialist', label: t.roles.specialist, icon: Building2, color: 'text-indigo-600 bg-indigo-50 border-indigo-200' },
    { id: 'patient', label: t.roles.patient, icon: HeartPulse, color: 'text-rose-600 bg-rose-50 border-rose-200' },
    { id: 'admin', label: t.roles.admin, icon: ShieldCheck, color: 'text-purple-600 bg-purple-50 border-purple-200' },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur border-b border-slate-200 shadow-sm">
      {/* Top Gov/Hackathon Bar */}
      <div className="bg-gradient-to-r from-teal-900 via-slate-900 to-sky-950 text-white text-xs px-4 py-1.5 flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-bold bg-amber-500 text-slate-950 uppercase tracking-wider">
            SIH 2026
          </span>
          <span className="font-medium text-slate-200">
            Problem Statement ID: 26133 • Accessibility & Quality of Public Healthcare Services in Rural Areas
          </span>
        </div>
        <div className="flex items-center gap-4 text-[11px] text-slate-300">
          <span className="flex items-center gap-1.5">
            <ShieldCheck size={14} className="text-teal-400" />
            ABDM (Ayushman Bharat Digital Mission) Compliant
          </span>
          <span className="hidden sm:inline text-slate-500">|</span>
          <span className="font-mono text-emerald-300 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-800/60">
            SETU Core Engine v0.9-alpha
          </span>
        </div>
      </div>

      {/* Main Brand & Actions Header */}
      <div className="max-w-7xl mx-auto px-4 py-3 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-teal-600 to-emerald-500 flex items-center justify-center text-white shadow-md shadow-teal-500/20">
            <HeartPulse size={24} className="animate-subtle-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-extrabold tracking-tight text-slate-900">
                {t.appTitle}
              </h1>
              <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-teal-100 text-teal-800 border border-teal-200">
                Team MedSetu
              </span>
            </div>
            <p className="text-xs text-slate-500 hidden sm:block">
              {t.appSubtitle}
            </p>
          </div>
        </div>

        {/* Global Controls: Sync / Language / Network */}
        <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
          {/* Offline / Online Simulator Button */}
          <button
            onClick={onToggleOffline}
            title="Toggle rural connectivity simulation"
            className={`flex items-center gap-1.5 text-xs px-2.5 py-1.5 rounded-lg border font-medium transition-smooth ${
              isOffline
                ? 'bg-amber-50 text-amber-800 border-amber-300 hover:bg-amber-100'
                : 'bg-emerald-50 text-emerald-800 border-emerald-200 hover:bg-emerald-100'
            }`}
          >
            {isOffline ? (
              <>
                <WifiOff size={15} className="text-amber-600" />
                <span>{t.offline}</span>
              </>
            ) : (
              <>
                <Wifi size={15} className="text-emerald-600" />
                <span>{t.online}</span>
              </>
            )}
          </button>

          {/* Sync Trigger button when offline queue has items */}
          {pendingSyncCount > 0 && (
            <button
              onClick={onSync}
              className="flex items-center gap-1.5 text-xs px-2.5 py-1.5 rounded-lg font-semibold bg-sky-600 text-white hover:bg-sky-700 shadow-sm animate-pulse"
            >
              <RefreshCw size={13} />
              <span>{t.syncNow} ({pendingSyncCount})</span>
            </button>
          )}

          {/* Language Switcher */}
          <div className="flex items-center bg-slate-100 p-0.5 rounded-lg border border-slate-200 text-xs font-semibold">
            {(['en', 'hi', 'mr'] as Language[]).map((lang) => (
              <button
                key={lang}
                onClick={() => onLanguageChange(lang)}
                className={`px-2.5 py-1 rounded-md transition-all ${
                  currentLanguage === lang
                    ? 'bg-white text-slate-900 shadow-sm font-bold'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {lang === 'en' ? 'English' : lang === 'hi' ? 'हिंदी' : 'मराठी'}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Role Switcher Toolbar */}
      <div className="bg-slate-100/90 border-t border-slate-200 px-4 py-2">
        <div className="max-w-7xl mx-auto flex items-center justify-between flex-wrap gap-2">
          <div className="flex items-center gap-1.5 text-xs text-slate-500 font-semibold mr-1">
            <span>Role Switcher:</span>
          </div>

          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 flex-1 max-w-full">
            {roleList.map((r) => {
              const IconComp = r.icon;
              const isActive = activeRole === r.id;
              return (
                <button
                  key={r.id}
                  onClick={() => onRoleChange(r.id)}
                  className={`flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg font-medium whitespace-nowrap transition-all border ${
                    isActive
                      ? `${r.color} font-bold shadow-sm ring-1 ring-black/5`
                      : 'bg-white/80 text-slate-600 border-slate-200 hover:bg-white hover:text-slate-900'
                  }`}
                >
                  <IconComp size={15} />
                  <span>{r.label}</span>
                </button>
              );
            })}
          </div>

          {/* Module Navigation Tabs */}
          <div className="flex items-center gap-1 text-xs">
            <button
              onClick={() => onTabChange('triage')}
              className={`px-2.5 py-1 rounded-md font-semibold ${
                activeTab === 'triage'
                  ? 'bg-teal-700 text-white'
                  : 'text-slate-600 hover:bg-slate-200'
              }`}
            >
              {t.tabs.triage}
            </button>
            <button
              onClick={() => onTabChange('teleconsult')}
              className={`px-2.5 py-1 rounded-md font-semibold ${
                activeTab === 'teleconsult'
                  ? 'bg-teal-700 text-white'
                  : 'text-slate-600 hover:bg-slate-200'
              }`}
            >
              {t.tabs.teleconsult}
            </button>
            <button
              onClick={() => onTabChange('referral')}
              className={`px-2.5 py-1 rounded-md font-semibold ${
                activeTab === 'referral'
                  ? 'bg-teal-700 text-white'
                  : 'text-slate-600 hover:bg-slate-200'
              }`}
            >
              {t.tabs.referral}
            </button>
            <button
              onClick={() => onTabChange('records')}
              className={`px-2.5 py-1 rounded-md font-semibold ${
                activeTab === 'records'
                  ? 'bg-teal-700 text-white'
                  : 'text-slate-600 hover:bg-slate-200'
              }`}
            >
              {t.tabs.records}
            </button>
            <button
              onClick={() => onTabChange('patientView')}
              className={`px-2.5 py-1 rounded-md font-semibold ${
                activeTab === 'patientView'
                  ? 'bg-teal-700 text-white'
                  : 'text-slate-600 hover:bg-slate-200'
              }`}
            >
              {t.tabs.patientView}
            </button>
            <button
              onClick={() => onTabChange('analytics')}
              className={`px-2.5 py-1 rounded-md font-semibold ${
                activeTab === 'analytics'
                  ? 'bg-teal-700 text-white'
                  : 'text-slate-600 hover:bg-slate-200'
              }`}
            >
              {t.tabs.analytics}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
