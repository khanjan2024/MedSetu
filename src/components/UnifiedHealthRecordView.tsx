import React, { useState } from 'react';
import { PatientRecord, Language } from '../types';
import { translations } from '../data/translations';
import { 
  FileText, 
  HeartPulse, 
  ShieldCheck, 
  Activity, 
  QrCode, 
  Clock, 
  Building2, 
  Stethoscope, 
  CheckCircle,
  Users
} from './Icons';

interface UnifiedHealthRecordViewProps {
  currentPatient: PatientRecord;
  currentLanguage: Language;
}

export const UnifiedHealthRecordView: React.FC<UnifiedHealthRecordViewProps> = ({
  currentPatient,
  currentLanguage,
}) => {
  const t = translations[currentLanguage];
  const [activeSubTab, setActiveSubTab] = useState<'timeline' | 'vitals' | 'prescriptions' | 'fhir'>('timeline');

  // Simulated BP longitudinal data points
  const vitalHistory = [
    { date: '25-Sep 09:45 AM', event: 'ASHA Home Check', sys: 165, dia: 105, pulse: 94, spo2: 96, status: 'Severe Spike' },
    { date: '25-Sep 10:35 AM', event: 'PHC Teleconsultation', sys: 162, dia: 102, pulse: 92, spo2: 96, status: 'Urgent Stat' },
    { date: '25-Sep 11:45 AM', event: 'District Hospital HDU (Post IV Labetalol)', sys: 138, dia: 88, pulse: 84, spo2: 98, status: 'Stabilized' },
    { date: '25-Sep 02:00 PM', event: 'Obstetric Ward Inpatient', sys: 132, dia: 84, pulse: 80, spo2: 99, status: 'Normal Range' },
  ];

  const fhirMockResource = {
    resourceType: "Bundle",
    type: "document",
    meta: {
      profile: ["https://nrces.in/ndhm/fhir/r4/StructureDefinition/ClinicalArtifact"]
    },
    identifier: {
      system: "https://abdm.gov.in/abha",
      value: currentPatient.abhaId
    },
    patient: {
      name: currentPatient.name,
      gender: currentPatient.gender,
      birthDate: `${2026 - currentPatient.age}-01-01`,
      telecom: currentPatient.phone,
      address: {
        village: currentPatient.village,
        district: currentPatient.district
      }
    },
    encounter: {
      triageClassification: currentPatient.riskLevel,
      primaryDiagnosis: currentPatient.triageReason,
      referralTrackId: currentPatient.referral?.id
    }
  };

  return (
    <div className="space-y-6">
      {/* Module Header */}
      <div className="bg-gradient-to-r from-teal-900 via-emerald-950 to-slate-900 rounded-2xl p-5 text-white shadow-lg flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-400 text-slate-950 uppercase tracking-wide">
              Module 4
            </span>
            <h2 className="text-xl font-bold">{t.tabs.records}</h2>
          </div>
          <p className="text-emerald-200 text-xs sm:text-sm mt-1 max-w-2xl">
            One single longitudinal health profile follows the patient seamlessly across rural sub-centres, PHCs, and tertiary hospitals.
          </p>
        </div>

        <div className="flex items-center gap-2 bg-emerald-950/80 border border-emerald-700/60 px-3 py-1.5 rounded-xl text-xs">
          <ShieldCheck size={16} className="text-emerald-400" />
          <span className="font-mono text-emerald-300">ABDM FHIR R4 Ready</span>
        </div>
      </div>

      {/* ABHA National Digital Health Card */}
      <div className="bg-gradient-to-tr from-slate-900 via-teal-950 to-slate-900 text-white rounded-3xl p-6 shadow-xl border border-teal-500/30 max-w-3xl mx-auto relative overflow-hidden">
        {/* Card Background Pattern */}
        <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-teal-500/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="flex items-center justify-between border-b border-teal-500/30 pb-4 mb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-teal-500 flex items-center justify-center font-black text-slate-950 text-base shadow-md">
              ABHA
            </div>
            <div>
              <span className="text-[10px] text-teal-300 uppercase tracking-wider block font-semibold">
                National Health Authority • Ayushman Bharat Digital Mission
              </span>
              <h3 className="font-bold text-white text-base">Ayushman Bharat Health Account</h3>
            </div>
          </div>
          <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center text-teal-300">
            <QrCode size={20} />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-12 gap-5 items-center">
          <div className="sm:col-span-3 flex flex-col items-center sm:items-start text-center sm:text-left">
            <div className="w-20 h-20 rounded-2xl bg-teal-800/80 border-2 border-teal-400/50 flex items-center justify-center text-2xl font-black text-white shadow-inner mb-2">
              {currentPatient.name.split(' ').map(n => n[0]).join('')}
            </div>
            <span className="text-[10px] text-teal-300 font-mono">Profile Verified</span>
          </div>

          <div className="sm:col-span-6 space-y-2 text-xs">
            <div>
              <span className="text-[10px] text-slate-400 uppercase font-bold">Patient Legal Name</span>
              <p className="text-base font-extrabold text-white">{currentPatient.name}</p>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <span className="text-[10px] text-slate-400 uppercase font-bold">Gender / Age</span>
                <p className="text-xs font-semibold text-slate-200">{currentPatient.gender} • {currentPatient.age} Yrs</p>
              </div>
              <div>
                <span className="text-[10px] text-slate-400 uppercase font-bold">Mobile Link</span>
                <p className="text-xs font-mono text-slate-200">{currentPatient.phone}</p>
              </div>
            </div>

            <div>
              <span className="text-[10px] text-slate-400 uppercase font-bold">Registered Facility</span>
              <p className="text-xs text-slate-300">{currentPatient.village}, {currentPatient.district}</p>
            </div>
          </div>

          <div className="sm:col-span-3 flex flex-col items-center justify-center border-t sm:border-t-0 sm:border-l border-white/10 pt-3 sm:pt-0 sm:pl-4 text-center">
            <span className="text-[10px] text-slate-400 font-bold uppercase mb-1">14-Digit ABHA Address</span>
            <div className="bg-black/40 px-2.5 py-1.5 rounded-lg border border-teal-500/40 font-mono text-xs font-bold text-teal-300 tracking-wider">
              {currentPatient.abhaId}
            </div>
            <span className="text-[9px] text-slate-400 mt-2">Active Consent: PHR Shared</span>
          </div>
        </div>
      </div>

      {/* Navigation Sub-Tabs */}
      <div className="flex items-center justify-center gap-2 border-b border-slate-200 pb-3 text-xs font-semibold">
        <button
          onClick={() => setActiveSubTab('timeline')}
          className={`px-4 py-2 rounded-xl transition-all ${
            activeSubTab === 'timeline'
              ? 'bg-teal-700 text-white shadow-sm'
              : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
          }`}
        >
          Clinical Care Timeline
        </button>

        <button
          onClick={() => setActiveSubTab('vitals')}
          className={`px-4 py-2 rounded-xl transition-all ${
            activeSubTab === 'vitals'
              ? 'bg-teal-700 text-white shadow-sm'
              : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
          }`}
        >
          Longitudinal Vitals Trends
        </button>

        <button
          onClick={() => setActiveSubTab('prescriptions')}
          className={`px-4 py-2 rounded-xl transition-all ${
            activeSubTab === 'prescriptions'
              ? 'bg-teal-700 text-white shadow-sm'
              : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
          }`}
        >
          Prescriptions & Lab Orders ({currentPatient.prescriptions.length})
        </button>

        <button
          onClick={() => setActiveSubTab('fhir')}
          className={`px-4 py-2 rounded-xl transition-all ${
            activeSubTab === 'fhir'
              ? 'bg-teal-700 text-white shadow-sm'
              : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
          }`}
        >
          ABDM FHIR JSON Schema
        </button>
      </div>

      {/* Sub-Tab 1: Longitudinal Timeline */}
      {activeSubTab === 'timeline' && (
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-6">
          <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2">
            <Clock size={16} className="text-teal-600" />
            <span>Continuity of Care Journey (Zero Dropouts)</span>
          </h3>

          <div className="relative pl-6 border-l-2 border-teal-500/30 space-y-8">
            {currentPatient.timeline.map((item, idx) => (
              <div key={item.id} className="relative group">
                <div className={`absolute -left-[31px] top-0 w-4 h-4 rounded-full border-2 bg-white ${
                  item.status === 'completed'
                    ? 'border-emerald-500 bg-emerald-500'
                    : item.status === 'current'
                    ? 'border-teal-600 bg-teal-600 ring-4 ring-teal-100 animate-pulse'
                    : 'border-slate-300 bg-slate-100'
                }`}></div>

                <div className="bg-slate-50/70 hover:bg-slate-50 p-4 rounded-xl border border-slate-200 transition-all">
                  <div className="flex items-center justify-between flex-wrap gap-2 mb-1">
                    <span className="text-xs font-bold text-slate-900">{item.stage}</span>
                    <span className="text-[11px] font-mono text-slate-500 bg-white px-2 py-0.5 rounded border">
                      {item.timestamp}
                    </span>
                  </div>

                  <p className="text-xs text-slate-600 mb-2 leading-relaxed">
                    {item.description}
                  </p>

                  <div className="flex items-center gap-4 text-[11px] text-slate-500 pt-1 border-t border-slate-200/60">
                    <span className="flex items-center gap-1">
                      <Building2 size={12} className="text-slate-400" />
                      {item.facility}
                    </span>
                    <span className="flex items-center gap-1">
                      <Stethoscope size={12} className="text-slate-400" />
                      {item.performer}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Sub-Tab 2: Vitals Trends Chart Simulation */}
      {activeSubTab === 'vitals' && (
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-6">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <div>
              <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2">
                <Activity size={16} className="text-rose-500" />
                <span>Longitudinal Blood Pressure Trajectory (Pre vs Post-Intervention)</span>
              </h3>
              <p className="text-xs text-slate-500">
                Visualizing how MedSetu's rapid triage and tele-consultation brought severe hypertension into safe maternal range
              </p>
            </div>
            <span className="text-xs font-bold text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
              Target Target &lt; 140/90 mmHg Achieved
            </span>
          </div>

          <div className="space-y-4">
            {vitalHistory.map((item, i) => (
              <div key={i} className="p-4 rounded-xl border border-slate-200 bg-slate-50/60 space-y-2">
                <div className="flex items-center justify-between text-xs flex-wrap gap-2">
                  <div className="font-bold text-slate-800 flex items-center gap-2">
                    <span>{item.event}</span>
                    <span className="text-slate-400 font-normal">({item.date})</span>
                  </div>
                  <span className={`text-[10px] font-black px-2 py-0.5 rounded-full uppercase ${
                    item.sys >= 160 ? 'bg-rose-100 text-rose-800' : 'bg-emerald-100 text-emerald-800'
                  }`}>
                    {item.status}
                  </span>
                </div>

                {/* Progress bar visual for Systolic BP */}
                <div>
                  <div className="flex justify-between text-[11px] font-semibold text-slate-600 mb-1">
                    <span>Systolic: {item.sys} mmHg / Diastolic: {item.dia} mmHg</span>
                    <span>Pulse: {item.pulse} bpm • SpO2: {item.spo2}%</span>
                  </div>
                  <div className="w-full h-3 bg-slate-200 rounded-full overflow-hidden">
                    <div 
                      className={`h-full rounded-full transition-all duration-700 ${
                        item.sys >= 160 ? 'bg-rose-500' : 'bg-emerald-500'
                      }`}
                      style={{ width: `${Math.min(100, (item.sys / 200) * 100)}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Sub-Tab 3: Prescriptions & Lab Work */}
      {activeSubTab === 'prescriptions' && (
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-6">
          <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2">
            <FileText size={16} className="text-teal-600" />
            <span>Digital Prescriptions & Diagnostic Investigations</span>
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {currentPatient.prescriptions.map((rx) => (
              <div key={rx.id} className="p-4 rounded-xl border border-slate-200 bg-slate-50 space-y-1.5 text-xs">
                <div className="flex items-center justify-between font-bold text-slate-900">
                  <span className="text-sm text-teal-900">{rx.medicationName}</span>
                  <span className="font-mono text-slate-600">{rx.dosage}</span>
                </div>
                <div className="text-slate-600">
                  <strong>Frequency:</strong> {rx.frequency}
                </div>
                <div className="text-slate-600">
                  <strong>Duration:</strong> {rx.duration}
                </div>
                <p className="text-[11px] text-slate-500 bg-white p-2 rounded border border-slate-200 italic">
                  {rx.instructions}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Sub-Tab 4: FHIR Interoperability */}
      {activeSubTab === 'fhir' && (
        <div className="bg-slate-900 rounded-2xl p-5 text-slate-200 text-xs font-mono shadow-inner space-y-3">
          <div className="flex items-center justify-between border-b border-slate-800 pb-2">
            <span className="text-teal-400 font-bold">HL7 FHIR R4 Clinical Document Bundle</span>
            <span className="text-[10px] text-slate-400">Ayushman Bharat Digital Health Stack Standard</span>
          </div>
          <pre className="overflow-x-auto max-h-72 p-2 bg-slate-950 rounded-xl text-teal-300">
            {JSON.stringify(fhirMockResource, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
};
