import React, { useState } from 'react';
import { Language, UserRole, PatientRecord } from './types';
import { initialPatients } from './data/mockPatients';
import { translations } from './data/translations';
import { Navbar } from './components/Navbar';
import { DigitalTriageView } from './components/DigitalTriageView';
import { TeleconsultationView } from './components/TeleconsultationView';
import { ReferralTrackerView } from './components/ReferralTrackerView';
import { UnifiedHealthRecordView } from './components/UnifiedHealthRecordView';
import { PatientPortalView } from './components/PatientPortalView';
import { AdminAnalyticsView } from './components/AdminAnalyticsView';
import { ShieldCheck, HeartPulse, RefreshCw } from './components/Icons';

export function App() {
  const [currentLanguage, setCurrentLanguage] = useState<Language>('en');
  const [activeRole, setActiveRole] = useState<UserRole>('asha');
  const [activeTab, setActiveTab] = useState<string>('triage');
  const [isOffline, setIsOffline] = useState<boolean>(false);
  const [pendingSyncCount, setPendingSyncCount] = useState<number>(0);
  const [patients, setPatients] = useState<PatientRecord[]>(initialPatients);
  const [selectedPatientId, setSelectedPatientId] = useState<string>(initialPatients[0].id);
  const [syncNotice, setSyncNotice] = useState<string | null>(null);

  const t = translations[currentLanguage];
  const currentPatient = patients.find(p => p.id === selectedPatientId) || patients[0];

  const handleRoleChange = (role: UserRole) => {
    setActiveRole(role);
    if (role === 'asha') setActiveTab('triage');
    else if (role === 'phc') setActiveTab('teleconsult');
    else if (role === 'specialist') setActiveTab('referral');
    else if (role === 'patient') setActiveTab('patientView');
    else if (role === 'admin') setActiveTab('analytics');
  };

  const handleUpdatePatient = (updated: PatientRecord) => {
    setPatients(prev => prev.map(p => p.id === updated.id ? updated : p));
    if (isOffline) {
      setPendingSyncCount(count => count + 1);
    }
  };

  const handleSelectSavitaCase = () => {
    // Reset to base Savita Devi SIH case
    setPatients(initialPatients);
    setSelectedPatientId(initialPatients[0].id);
    setActiveTab('triage');
    setActiveRole('asha');
  };

  const handleToggleOffline = () => {
    setIsOffline(prev => !prev);
  };

  const handleSync = () => {
    setSyncNotice('Syncing rural health outbox with National ABDM Cloud...');
    setTimeout(() => {
      setPendingSyncCount(0);
      setSyncNotice('✅ All pending triage records and digital prescriptions synced successfully to ABDM Cloud!');
      setTimeout(() => setSyncNotice(null), 5000);
    }, 1200);
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 font-sans">
      {/* Top Navbar & Role Switcher */}
      <Navbar
        currentLanguage={currentLanguage}
        onLanguageChange={setCurrentLanguage}
        activeRole={activeRole}
        onRoleChange={handleRoleChange}
        isOffline={isOffline}
        onToggleOffline={handleToggleOffline}
        pendingSyncCount={pendingSyncCount}
        onSync={handleSync}
        activeTab={activeTab}
        onTabChange={setActiveTab}
      />

      {/* Sync Notification Banner */}
      {syncNotice && (
        <div className="bg-sky-600 text-white text-xs font-semibold px-4 py-2 text-center shadow-md animate-fadeIn flex items-center justify-center gap-2">
          <RefreshCw size={15} className="animate-spin" />
          <span>{syncNotice}</span>
        </div>
      )}

      {/* Offline Mode Alert Bar */}
      {isOffline && (
        <div className="bg-amber-500 text-slate-950 text-xs font-bold px-4 py-1.5 text-center shadow-sm flex items-center justify-center gap-2">
          <span>⚠️ RURAL LOW-BANDWIDTH / OFFLINE MODE ACTIVE:</span>
          <span>Triage assessments, vitals & emergency referrals are safely cached in local storage. ({pendingSyncCount} pending upload)</span>
        </div>
      )}

      {/* Patient Selector Bar (when applicable) */}
      <div className="max-w-7xl mx-auto px-4 py-2 w-full flex items-center justify-between flex-wrap gap-2 text-xs border-b border-slate-200 bg-white">
        <div className="flex items-center gap-2">
          <span className="font-bold text-slate-500">Active Patient Case:</span>
          <div className="flex items-center gap-1.5">
            {patients.map(p => (
              <button
                key={p.id}
                onClick={() => setSelectedPatientId(p.id)}
                className={`px-3 py-1 rounded-lg font-bold border transition-all ${
                  p.id === selectedPatientId
                    ? 'bg-teal-50 text-teal-900 border-teal-300 shadow-xs'
                    : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
                }`}
              >
                {p.name} ({p.id}) {p.isPregnant ? '• 🤰 34w' : ''}
              </button>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleSelectSavitaCase}
            className="text-[11px] font-semibold text-teal-700 hover:text-teal-900 underline flex items-center gap-1"
          >
            <HeartPulse size={13} />
            <span>Reset to Savita Devi (SIH Slide 2 & 5 Hero Case)</span>
          </button>
        </div>
      </div>

      {/* Main Content View Switcher */}
      <main className="flex-1 max-w-7xl mx-auto px-4 py-6 w-full">
        {activeTab === 'triage' && (
          <DigitalTriageView
            currentPatient={currentPatient}
            onUpdatePatient={handleUpdatePatient}
            onSelectSavitaCase={handleSelectSavitaCase}
            onGoToTeleconsult={() => setActiveTab('teleconsult')}
            onGoToReferral={() => setActiveTab('referral')}
            currentLanguage={currentLanguage}
            isOffline={isOffline}
          />
        )}

        {activeTab === 'teleconsult' && (
          <TeleconsultationView
            currentPatient={currentPatient}
            onUpdatePatient={handleUpdatePatient}
            currentLanguage={currentLanguage}
            onGoToReferral={() => setActiveTab('referral')}
          />
        )}

        {activeTab === 'referral' && (
          <ReferralTrackerView
            currentPatient={currentPatient}
            onUpdatePatient={handleUpdatePatient}
            currentLanguage={currentLanguage}
          />
        )}

        {activeTab === 'records' && (
          <UnifiedHealthRecordView
            currentPatient={currentPatient}
            currentLanguage={currentLanguage}
          />
        )}

        {activeTab === 'patientView' && (
          <PatientPortalView
            currentPatient={currentPatient}
            currentLanguage={currentLanguage}
          />
        )}

        {activeTab === 'analytics' && (
          <AdminAnalyticsView
            currentLanguage={currentLanguage}
          />
        )}
      </main>

      {/* Government Standard Footer */}
      <footer className="bg-slate-900 text-slate-400 border-t border-slate-800 text-xs py-8 mt-12">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-white font-black text-base">
              <HeartPulse size={20} className="text-teal-400" />
              <span>MedSetu</span>
            </div>
            <p className="text-[11px] text-slate-400 leading-relaxed">
              Smart E-Health & Teleconsultation Unified Network. Addressing SIH 2026 Problem Statement 26133: Healthcare Accessibility in Rural & Underserved Areas.
            </p>
          </div>

          <div>
            <h5 className="font-bold text-slate-200 text-xs uppercase mb-2">4 Pillars of MedSetu</h5>
            <ul className="space-y-1 text-[11px]">
              <li>• Rapid Digital Triage & 108 SOS</li>
              <li>• Assisted Specialist Teleconsultation</li>
              <li>• End-to-End Closed-Loop E-Referral</li>
              <li>• ABDM Shared Digital Health Record</li>
            </ul>
          </div>

          <div>
            <h5 className="font-bold text-slate-200 text-xs uppercase mb-2">Compliance & Research</h5>
            <ul className="space-y-1 text-[11px]">
              <li>• Ayushman Bharat Digital Mission (ABDM)</li>
              <li>• MoHFW Telemedicine Practice Guidelines (2020)</li>
              <li>• HL7 FHIR R4 Clinical Data Architecture</li>
              <li>• Offline-First Resilient Sync Engine</li>
            </ul>
          </div>

          <div>
            <h5 className="font-bold text-slate-200 text-xs uppercase mb-2">Local Languages</h5>
            <p className="text-[11px] text-slate-400 mb-2">
              Accessible across India with instant switching for English, हिंदी, and मराठी.
            </p>
            <div className="flex items-center gap-1.5 text-teal-400 font-semibold text-[11px]">
              <ShieldCheck size={14} />
              <span>National Health Stack Verified</span>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 mt-6 pt-4 border-t border-slate-800 text-center text-[10px] text-slate-500">
          Smart India Hackathon 2026 • Team MedSetu • Software Category: MedTech / BioTech / HealthTech
        </div>
      </footer>
    </div>
  );
}

export default App;
