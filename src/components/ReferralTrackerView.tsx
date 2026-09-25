import React, { useState } from 'react';
import { PatientRecord, Language, ReferralStatus } from '../types';
import { translations } from '../data/translations';
import { 
  Clock, 
  MapPin, 
  CheckCircle, 
  Ambulance, 
  Building2, 
  QrCode, 
  Printer, 
  AlertTriangle, 
  ShieldCheck, 
  ArrowRight,
  Phone,
  FileText
} from './Icons';

interface ReferralTrackerViewProps {
  currentPatient: PatientRecord;
  onUpdatePatient: (updated: PatientRecord) => void;
  currentLanguage: Language;
}

export const ReferralTrackerView: React.FC<ReferralTrackerViewProps> = ({
  currentPatient,
  onUpdatePatient,
  currentLanguage,
}) => {
  const t = translations[currentLanguage];
  const ref = currentPatient.referral;

  const [simulatedProgressIndex, setSimulatedProgressIndex] = useState(3);
  const [notificationToast, setNotificationToast] = useState<string | null>(null);

  const stages: { status: ReferralStatus; label: string; desc: string; facility: string }[] = [
    {
      status: 'initiated',
      label: t.referral.step1,
      desc: 'Triage completed at Rampur PHC. Emergency digital referral slip generated.',
      facility: 'Rampur Sub-centre / PHC'
    },
    {
      status: 'in_transit',
      label: t.referral.step2,
      desc: '108 Ambulance MH-14-108 transporting patient. Oxygen & live telemetry active.',
      facility: 'Highway SH-13 (40 km transit)'
    },
    {
      status: 'arrived_hospital',
      label: t.referral.step3,
      desc: 'Arrived at Solapur District Hospital. ABHA QR scanned at Emergency Triage.',
      facility: 'Solapur District Civil Hospital'
    },
    {
      status: 'specialist_review',
      label: t.referral.step4,
      desc: 'Dr. Ananya Rao (OBGYN) examined patient. Bedside ECG & Labetalol given.',
      facility: 'Obstetric HDU / CCU'
    },
    {
      status: 'resolved_followup',
      label: t.referral.step5,
      desc: 'Discharge summary signed. Automated SMS alert sent to ASHA Sunita for 48h home monitoring.',
      facility: 'Rampur Community Health Outbox'
    },
  ];

  const currentStageIndex = ref ? (
    ref.currentStatus === 'initiated' ? 0 :
    ref.currentStatus === 'in_transit' ? 1 :
    ref.currentStatus === 'arrived_hospital' ? 2 :
    ref.currentStatus === 'specialist_review' || ref.currentStatus === 'diagnostics_prescribed' ? 3 : 4
  ) : 0;

  const handleAdvanceStage = () => {
    if (!ref) return;

    const nextIndex = (currentStageIndex + 1) % stages.length;
    const nextStatus = stages[nextIndex].status;

    let alertMsg = '';
    if (nextStatus === 'resolved_followup') {
      alertMsg = '🔔 Closed-Loop Complete! SMS & App Alert sent to ASHA Sunita: "Savita Devi discharged. Conduct home BP visit within 48h."';
    } else if (nextStatus === 'arrived_hospital') {
      alertMsg = '✅ Patient checked in at District Hospital. Triage queue prioritized.';
    } else if (nextStatus === 'in_transit') {
      alertMsg = '🚑 Patient in transit via 108 Emergency Ambulance.';
    } else if (nextStatus === 'specialist_review') {
      alertMsg = '🩺 Specialist review in progress by Dr. Ananya Rao.';
    }

    if (alertMsg) {
      setNotificationToast(alertMsg);
      setTimeout(() => setNotificationToast(null), 6000);
    }

    const updatedReferral = {
      ...ref,
      currentStatus: nextStatus,
      statusHistory: [
        ...ref.statusHistory,
        {
          status: nextStatus,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          note: stages[nextIndex].desc
        }
      ]
    };

    onUpdatePatient({
      ...currentPatient,
      referral: updatedReferral,
      followUpAlertSent: nextStatus === 'resolved_followup' ? true : currentPatient.followUpAlertSent
    });
  };

  const handlePrintSlip = () => {
    window.print();
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-indigo-900 via-slate-900 to-teal-950 rounded-2xl p-5 text-white shadow-lg flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-indigo-400 text-slate-950 uppercase tracking-wide">
              Module 3
            </span>
            <h2 className="text-xl font-bold">{t.referral.title}</h2>
          </div>
          <p className="text-indigo-200 text-xs sm:text-sm mt-1 max-w-2xl">
            {t.referral.subtitle}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleAdvanceStage}
            className="px-4 py-2.5 rounded-xl bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold text-xs shadow-md transition-all flex items-center gap-2 ring-2 ring-teal-300/40"
          >
            <span>{t.referral.advanceStage}</span>
            <ArrowRight size={15} />
          </button>
        </div>
      </div>

      {/* Notification Toast when stage advances */}
      {notificationToast && (
        <div className="bg-emerald-50 border-2 border-emerald-400 text-emerald-950 p-4 rounded-2xl shadow-lg flex items-center gap-3 animate-fadeIn">
          <CheckCircle size={22} className="text-emerald-600 flex-shrink-0" />
          <div className="text-xs sm:text-sm font-semibold">
            {notificationToast}
          </div>
        </div>
      )}

      {/* 5-Stage Closed-Loop Visual Tracker */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
        <div className="flex items-center justify-between mb-6 flex-wrap gap-2">
          <div>
            <h3 className="font-bold text-slate-900 text-base">
              End-to-End Patient Referral Stepper
            </h3>
            <p className="text-xs text-slate-500">
              Closed-loop tracking ensures zero patient dropouts between village and tertiary facilities
            </p>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono font-bold px-2.5 py-1 rounded bg-slate-100 text-slate-700 border">
              Referral ID: {ref?.id || 'REF-2026-PENDING'}
            </span>
            <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-rose-100 text-rose-800 border border-rose-200 uppercase">
              {ref?.priority || 'Emergency'}
            </span>
          </div>
        </div>

        {/* Stepper Progress Bar */}
        <div className="relative mb-8">
          <div className="hidden sm:block absolute top-1/2 left-0 right-0 h-1 bg-slate-200 -translate-y-1/2 z-0"></div>
          <div 
            className="hidden sm:block absolute top-1/2 left-0 h-1 bg-teal-600 -translate-y-1/2 z-0 transition-all duration-500"
            style={{ width: `${(currentStageIndex / (stages.length - 1)) * 100}%` }}
          ></div>

          <div className="grid grid-cols-1 sm:grid-cols-5 gap-4 relative z-10">
            {stages.map((st, idx) => {
              const isPast = idx < currentStageIndex;
              const isCurrent = idx === currentStageIndex;

              return (
                <div 
                  key={st.status} 
                  className={`p-3 rounded-xl border transition-all ${
                    isCurrent
                      ? 'bg-teal-50 border-teal-500 ring-2 ring-teal-500/20 shadow-md'
                      : isPast
                      ? 'bg-slate-50 border-slate-200 text-slate-700'
                      : 'bg-white border-dashed border-slate-200 text-slate-400'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-black ${
                      isCurrent
                        ? 'bg-teal-600 text-white'
                        : isPast
                        ? 'bg-emerald-500 text-white'
                        : 'bg-slate-200 text-slate-600'
                    }`}>
                      {isPast ? '✓' : idx + 1}
                    </span>
                    <span className={`text-[10px] font-bold uppercase tracking-wider ${
                      isCurrent ? 'text-teal-700' : isPast ? 'text-emerald-700' : 'text-slate-400'
                    }`}>
                      {isCurrent ? 'Active Now' : isPast ? 'Done' : 'Upcoming'}
                    </span>
                  </div>

                  <h4 className="font-bold text-xs text-slate-900 mb-1">
                    {st.label}
                  </h4>
                  <p className="text-[11px] text-slate-600 leading-tight">
                    {st.desc}
                  </p>
                  <div className="mt-2 text-[10px] text-slate-400 flex items-center gap-1 font-medium">
                    <MapPin size={11} />
                    <span>{st.facility}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Closed-loop ASHA Notification Callout */}
        {currentStageIndex === 4 && (
          <div className="bg-amber-50 border-2 border-amber-300 rounded-2xl p-4 text-amber-950 flex items-start gap-3">
            <AlertTriangle size={20} className="text-amber-600 mt-0.5 flex-shrink-0" />
            <div className="text-xs space-y-1">
              <span className="font-bold text-amber-900 block text-sm">
                ASHA Community Follow-Up Alert Triggered!
              </span>
              <p>
                MedSetu has dispatched an automated task to <strong>ASHA Sunita Gaikwad</strong> at Rampur Village: 
                "Patient Savita Devi discharged from Solapur District Hospital. Please conduct a mandatory home visit on 27-Sep-2026 to measure BP, inspect ankle edema, ensure adherence to Tab Labetalol 100mg, and record status in the mobile app."
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Official Government Digital Referral Slip (Printable / Scannable) */}
      <div id="printable-slip" className="bg-white rounded-2xl border-2 border-slate-300 p-6 shadow-md max-w-4xl mx-auto space-y-6">
        {/* Slip Header */}
        <div className="border-b-2 border-slate-900 pb-4 flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-slate-900 text-white rounded-xl flex items-center justify-center font-black text-xl">
              SETU
            </div>
            <div>
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest block">
                Government of Maharashtra • Public Health Department
              </span>
              <h2 className="text-lg font-black text-slate-900">
                OFFICIAL DIGITAL E-REFERRAL SLIP
              </h2>
              <span className="text-xs text-teal-700 font-semibold">
                Unified Health Network (ABDM Compliant)
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handlePrintSlip}
              className="px-3 py-1.5 rounded-lg border border-slate-300 text-slate-700 text-xs font-semibold hover:bg-slate-100 flex items-center gap-1.5 shadow-sm"
            >
              <Printer size={15} />
              <span>{t.referral.printSlip}</span>
            </button>
          </div>
        </div>

        {/* Slip Metadata Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 bg-slate-50 p-4 rounded-xl border border-slate-200 text-xs">
          <div>
            <span className="text-slate-400 block text-[10px] font-bold uppercase">Referral Number</span>
            <span className="font-mono font-bold text-slate-900">{ref?.id || 'REF-MH-2026-8819'}</span>
          </div>
          <div>
            <span className="text-slate-400 block text-[10px] font-bold uppercase">Date & Time</span>
            <span className="font-semibold text-slate-900">{ref?.createdAt || '25-Sep-2026 10:15 AM'}</span>
          </div>
          <div>
            <span className="text-slate-400 block text-[10px] font-bold uppercase">Priority Tier</span>
            <span className="font-extrabold text-rose-700 uppercase">{ref?.priority || 'Emergency (Red)'}</span>
          </div>
          <div>
            <span className="text-slate-400 block text-[10px] font-bold uppercase">Transport Mode</span>
            <span className="font-semibold text-slate-900">{ref?.transportMode || '108 Ambulance'}</span>
          </div>
        </div>

        {/* Patient Details & QR Section */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
          <div className="md:col-span-8 space-y-3 text-xs">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <span className="text-slate-400 font-bold block text-[10px] uppercase">Patient Name</span>
                <span className="text-sm font-bold text-slate-900">{currentPatient.name}</span>
              </div>
              <div>
                <span className="text-slate-400 font-bold block text-[10px] uppercase">ABHA ID (14-Digit)</span>
                <span className="font-mono font-bold text-teal-800">{currentPatient.abhaId}</span>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div>
                <span className="text-slate-400 font-bold block text-[10px] uppercase">Age / Gender</span>
                <span className="font-semibold text-slate-800">{currentPatient.age} Yrs / {currentPatient.gender}</span>
              </div>
              <div>
                <span className="text-slate-400 font-bold block text-[10px] uppercase">Maternal Status</span>
                <span className="font-semibold text-rose-700">
                  {currentPatient.isPregnant ? `${currentPatient.gestationWeeks}w Gestation` : 'N/A'}
                </span>
              </div>
              <div>
                <span className="text-slate-400 font-bold block text-[10px] uppercase">Village / Sub-centre</span>
                <span className="font-semibold text-slate-800">{currentPatient.village}</span>
              </div>
            </div>

            <div className="border-t border-slate-100 pt-2">
              <span className="text-slate-400 font-bold block text-[10px] uppercase">Clinical Referral Reason</span>
              <p className="font-semibold text-slate-900 mt-0.5">
                {ref?.reason || currentPatient.triageReason}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4 border-t border-slate-100 pt-2">
              <div>
                <span className="text-slate-400 font-bold block text-[10px] uppercase">Referring Facility</span>
                <span className="font-semibold text-slate-800">{ref?.fromFacility}</span>
              </div>
              <div>
                <span className="text-slate-400 font-bold block text-[10px] uppercase">Destination Facility</span>
                <span className="font-semibold text-indigo-900">{ref?.toFacility}</span>
              </div>
            </div>
          </div>

          {/* QR Code Desk Check-in Box */}
          <div className="md:col-span-4 bg-slate-50 border-2 border-dashed border-slate-300 rounded-2xl p-4 text-center">
            <div className="w-32 h-32 mx-auto bg-white border border-slate-300 rounded-xl p-2 flex flex-col items-center justify-center shadow-inner">
              <QrCode size={90} className="text-slate-900" />
            </div>
            <span className="text-[11px] font-bold text-slate-800 block mt-2">
              Scan at Hospital Desk
            </span>
            <p className="text-[10px] text-slate-500 mt-0.5">
              Instantly unlocks clinical triage vitals & tele-consult history
            </p>
          </div>
        </div>

        {/* Verification Footer */}
        <div className="border-t border-slate-200 pt-4 flex items-center justify-between text-[11px] text-slate-500">
          <div className="flex items-center gap-1.5">
            <ShieldCheck size={14} className="text-teal-600" />
            <span>Digital signature verified by Medical Officer Dr. R. Sharma (Rampur PHC)</span>
          </div>
          <span className="font-mono text-[10px]">
            SHA-256: 4f98...c201
          </span>
        </div>
      </div>
    </div>
  );
};
