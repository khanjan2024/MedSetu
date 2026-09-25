import React, { useState } from 'react';
import { PatientRecord, Language, Prescription } from '../types';
import { translations } from '../data/translations';
import { 
  Video, 
  VideoOff, 
  Mic, 
  MicOff, 
  HeartPulse, 
  Activity, 
  FileText, 
  CheckCircle, 
  ShieldCheck, 
  Building2, 
  Stethoscope, 
  Clock, 
  MapPin,
  ArrowRight
} from './Icons';

interface TeleconsultationViewProps {
  currentPatient: PatientRecord;
  onUpdatePatient: (updated: PatientRecord) => void;
  currentLanguage: Language;
  onGoToReferral: () => void;
}

export const TeleconsultationView: React.FC<TeleconsultationViewProps> = ({
  currentPatient,
  onUpdatePatient,
  currentLanguage,
  onGoToReferral,
}) => {
  const t = translations[currentLanguage];

  const [isVideoOn, setIsVideoOn] = useState(true);
  const [isMicOn, setIsMicOn] = useState(true);
  const [rxNotes, setRxNotes] = useState(
    'Assisted consultation conducted with MO Dr. Sharma at Rampur PHC. Patient Savita Devi (34w gestation) presents with BP 165/105 mmHg, bilateral edema, and frontal headache. High suspicion of severe preeclampsia. Initiated stat Labetalol. Emergency transfer to District Hospital Obstetric HDU initiated.'
  );

  const [newMedName, setNewMedName] = useState('Tab. Labetalol');
  const [newDosage, setNewDosage] = useState('100 mg');
  const [newFreq, setNewFreq] = useState('Twice daily (BD)');
  const [newDuration, setNewDuration] = useState('14 days');
  const [newInstructions, setNewInstructions] = useState('Take with food. Monitor BP daily.');

  const [selectedTests, setSelectedTests] = useState<string[]>([
    'Urgent Bedside 12-Lead ECG',
    'Urine Albumin Dipstick & Protein/Creatinine Ratio',
    'Obstetric Ultrasound & Fetal Biophysical Profile',
    'Complete Blood Count & Platelet Count'
  ]);

  const [rxSavedNotice, setRxSavedNotice] = useState(false);

  const availableTests = [
    'Urgent Bedside 12-Lead ECG',
    'Urine Albumin Dipstick & Protein/Creatinine Ratio',
    'Obstetric Ultrasound & Fetal Biophysical Profile',
    'Complete Blood Count & Platelet Count',
    'Serum Creatinine & Uric Acid',
    'Liver Function Tests (AST/ALT, Bilirubin)',
    'Blood Glucose Random'
  ];

  const handleToggleTest = (test: string) => {
    if (selectedTests.includes(test)) {
      setSelectedTests(selectedTests.filter(t => t !== test));
    } else {
      setSelectedTests([...selectedTests, test]);
    }
  };

  const handleAddMedication = () => {
    if (!newMedName) return;
    const newRx: Prescription = {
      id: `RX-${Date.now().toString().slice(-4)}`,
      medicationName: newMedName,
      dosage: newDosage,
      frequency: newFreq,
      duration: newDuration,
      instructions: newInstructions,
    };

    onUpdatePatient({
      ...currentPatient,
      prescriptions: [...currentPatient.prescriptions, newRx],
    });
  };

  const handleSignPrescription = () => {
    setRxSavedNotice(true);
    const updatedPatient: PatientRecord = {
      ...currentPatient,
      referral: currentPatient.referral ? {
        ...currentPatient.referral,
        currentStatus: 'specialist_review',
        prescribedTests: selectedTests,
        dischargeInstructions: rxNotes,
        statusHistory: [
          ...currentPatient.referral.statusHistory,
          {
            status: 'specialist_review',
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            note: 'Assisted Teleconsultation completed by Dr. Ananya Rao. Digital Rx signed & linked to ABHA.'
          }
        ]
      } : undefined
    };
    onUpdatePatient(updatedPatient);
    setTimeout(() => setRxSavedNotice(false), 5000);
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-slate-900 rounded-2xl p-5 text-white shadow-lg flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-teal-400 text-slate-950 uppercase tracking-wide">
              Module 2
            </span>
            <h2 className="text-xl font-bold">{t.teleconsult.title}</h2>
          </div>
          <p className="text-slate-300 text-xs sm:text-sm mt-1">
            {t.teleconsult.subtitle}
          </p>
        </div>

        <div className="flex items-center gap-3 bg-slate-800/90 px-3 py-2 rounded-xl border border-slate-700">
          <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse"></div>
          <div className="text-xs">
            <span className="text-slate-400 block text-[10px]">Session Status</span>
            <span className="font-semibold text-white">Live Encrypted WebRTC Session</span>
          </div>
        </div>
      </div>

      {/* Main Grid: Video Stream HUD on Left (7 cols), Clinical Workstation on Right (5 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Telemedicine Video Call Interface */}
        <div className="lg:col-span-7 space-y-4">
          <div className="bg-slate-950 rounded-2xl overflow-hidden border border-slate-800 shadow-xl relative aspect-video flex flex-col justify-between p-4">
            {/* Top Video Overlay Bar */}
            <div className="flex items-center justify-between z-10">
              <div className="flex items-center gap-2 bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-xl border border-white/10 text-white text-xs">
                <Building2 size={14} className="text-teal-400" />
                <span className="font-semibold">{t.teleconsult.facility}</span>
                <span className="text-slate-400">•</span>
                <span className="text-slate-300">{t.teleconsult.specialistName}</span>
              </div>

              {/* Vitals Telemetry HUD badge */}
              <div className="flex items-center gap-3 bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-xl border border-white/10 text-white text-xs font-mono">
                <span className="flex items-center gap-1 text-rose-400 font-bold">
                  <Activity size={14} className="animate-pulse" />
                  BP: {currentPatient.vitals.systolicBP}/{currentPatient.vitals.diastolicBP}
                </span>
                <span className="text-teal-400">
                  SpO2: {currentPatient.vitals.spo2}%
                </span>
                <span className="text-amber-400">
                  Pulse: {currentPatient.vitals.pulse}
                </span>
              </div>
            </div>

            {/* Video Main Feed: Specialist Feed Simulation */}
            <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-b from-slate-900 via-slate-950 to-slate-900">
              {isVideoOn ? (
                <div className="text-center space-y-3">
                  {/* Doctor Avatar & Video Graphic */}
                  <div className="relative mx-auto w-28 h-28 rounded-full bg-gradient-to-tr from-teal-500 to-sky-600 p-1 shadow-2xl shadow-teal-500/20">
                    <div className="w-full h-full rounded-full bg-slate-800 flex items-center justify-center overflow-hidden border-2 border-white/20">
                      <Stethoscope size={48} className="text-teal-300" />
                    </div>
                    <span className="absolute bottom-1 right-1 w-4 h-4 bg-emerald-500 border-2 border-slate-950 rounded-full"></span>
                  </div>

                  <div>
                    <h4 className="text-white font-bold text-base">Dr. Ananya Rao, MD</h4>
                    <p className="text-teal-400 text-xs">Consultant Gynecologist & High-Risk Obstetrician</p>
                    <p className="text-slate-400 text-[11px] mt-1">District Hospital Solapur • Video Connected</p>
                  </div>

                  {/* Simulated ECG audio-visual wave */}
                  <div className="flex items-center justify-center gap-1 opacity-80 pt-1">
                    <span className="w-1 h-3 bg-teal-400 rounded-full animate-pulse"></span>
                    <span className="w-1 h-6 bg-teal-400 rounded-full animate-pulse delay-75"></span>
                    <span className="w-1 h-8 bg-teal-400 rounded-full animate-pulse delay-150"></span>
                    <span className="w-1 h-4 bg-teal-400 rounded-full animate-pulse delay-200"></span>
                    <span className="w-1 h-7 bg-teal-400 rounded-full animate-pulse delay-100"></span>
                  </div>
                </div>
              ) : (
                <div className="text-slate-500 text-center">
                  <VideoOff size={40} className="mx-auto mb-2 opacity-50" />
                  <p className="text-xs">Camera Stream Suspended</p>
                </div>
              )}
            </div>

            {/* Picture-in-Picture: Rural PHC Feed (Assisted Teleconsultation) */}
            <div className="absolute bottom-4 right-4 z-10 w-44 aspect-video rounded-xl overflow-hidden border-2 border-white/20 shadow-2xl bg-slate-900 p-2 flex flex-col justify-between">
              <div className="flex items-center justify-between text-[10px] text-white bg-black/50 px-1.5 py-0.5 rounded">
                <span>Rampur PHC Hub</span>
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
              </div>
              <div className="text-center py-1">
                <span className="text-[11px] font-bold text-slate-200 block">
                  Savita Devi + Dr. Sharma
                </span>
                <span className="text-[9px] text-teal-300">ASHA Sunita Assisting</span>
              </div>
              <div className="text-[9px] text-slate-400 text-right">
                Cam 1 • HD 720p
              </div>
            </div>

            {/* Bottom In-call Controls */}
            <div className="z-10 flex items-center justify-center gap-3">
              <button
                onClick={() => setIsMicOn(!isMicOn)}
                className={`p-3 rounded-full transition-all ${
                  isMicOn ? 'bg-slate-800 text-white hover:bg-slate-700' : 'bg-rose-600 text-white'
                }`}
                title="Toggle Microphone"
              >
                {isMicOn ? <Mic size={18} /> : <MicOff size={18} />}
              </button>

              <button
                onClick={() => setIsVideoOn(!isVideoOn)}
                className={`p-3 rounded-full transition-all ${
                  isVideoOn ? 'bg-slate-800 text-white hover:bg-slate-700' : 'bg-rose-600 text-white'
                }`}
                title="Toggle Video"
              >
                {isVideoOn ? <Video size={18} /> : <VideoOff size={18} />}
              </button>

              <div className="h-6 w-px bg-slate-700"></div>

              <span className="text-xs text-slate-300 font-mono bg-slate-800/80 px-3 py-1.5 rounded-xl border border-slate-700">
                ⏱️ Session Duration: 14:22
              </span>
            </div>
          </div>

          {/* Quick Case Summary for Doctor */}
          <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-sm">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2 flex items-center gap-1.5">
              <Stethoscope size={15} className="text-teal-600" />
              Specialist Diagnostic Impression
            </h4>
            <p className="text-xs text-slate-700 leading-relaxed">
              <strong>Maternal Risk Evaluation:</strong> Multigravida at 34 weeks gestation presenting with acute onset severe systolic hypertension (165/105 mmHg), headaches, and chest tightness. Clinical presentation indicates <strong>Imminent Preeclampsia with features of severe hypertension</strong>. Patient requires urgent antihypertensive titration under telemetry and formal ultrasound evaluation for fetal wellbeing.
            </p>
          </div>
        </div>

        {/* Right Column: Digital Prescription Pad & Diagnostic Ordering (5 cols) */}
        <div className="lg:col-span-5 space-y-5">
          <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <h3 className="font-bold text-slate-900 text-sm">Digital Rx & Orders Pad</h3>
                <p className="text-[11px] text-slate-500">Government ABDM Telemedicine Guideline Compliant</p>
              </div>
              <span className="text-[10px] font-bold px-2 py-1 rounded bg-teal-50 text-teal-800 border border-teal-200">
                ABHA Linked
              </span>
            </div>

            {/* Doctor Clinical Notes */}
            <div>
              <label className="text-[11px] font-bold text-slate-700 block mb-1">
                Clinical Directives & Provisional Diagnosis
              </label>
              <textarea
                rows={3}
                value={rxNotes}
                onChange={(e) => setRxNotes(e.target.value)}
                className="w-full text-xs rounded-xl border border-slate-300 p-2.5 focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
              />
            </div>

            {/* Diagnostic Tests to Order */}
            <div>
              <label className="text-[11px] font-bold text-slate-700 block mb-1.5">
                Prescribe Diagnostic Workup:
              </label>
              <div className="space-y-1.5 max-h-36 overflow-y-auto pr-1">
                {availableTests.map((tName) => {
                  const checked = selectedTests.includes(tName);
                  return (
                    <label
                      key={tName}
                      onClick={() => handleToggleTest(tName)}
                      className={`flex items-center gap-2 p-2 rounded-lg border text-xs cursor-pointer transition-all ${
                        checked 
                          ? 'bg-teal-50 border-teal-300 text-teal-950 font-semibold' 
                          : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={checked}
                        onChange={() => {}}
                        className="rounded text-teal-600 focus:ring-teal-500"
                      />
                      <span>{tName}</span>
                    </label>
                  );
                })}
              </div>
            </div>

            {/* Current Prescriptions List */}
            <div>
              <label className="text-[11px] font-bold text-slate-700 block mb-1.5">
                Active Medications ({currentPatient.prescriptions.length})
              </label>
              <div className="space-y-2 max-h-40 overflow-y-auto pr-1">
                {currentPatient.prescriptions.map((rx) => (
                  <div key={rx.id} className="p-2.5 rounded-xl border border-slate-200 bg-slate-50 text-xs">
                    <div className="flex items-center justify-between font-bold text-slate-800">
                      <span>{rx.medicationName}</span>
                      <span className="text-[11px] text-teal-700">{rx.dosage}</span>
                    </div>
                    <div className="text-[11px] text-slate-500 mt-0.5">
                      {rx.frequency} • {rx.duration}
                    </div>
                    <div className="text-[10px] text-slate-400 mt-1 italic">
                      {rx.instructions}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Add Medication */}
            <div className="p-3 rounded-xl border border-dashed border-slate-300 bg-slate-50/70 space-y-2">
              <span className="text-[11px] font-bold text-slate-600 block">
                + Add Medication to Prescription:
              </span>
              <div className="grid grid-cols-2 gap-2">
                <input
                  type="text"
                  placeholder="Medication Name"
                  value={newMedName}
                  onChange={(e) => setNewMedName(e.target.value)}
                  className="text-xs p-1.5 rounded-lg border border-slate-300 bg-white"
                />
                <input
                  type="text"
                  placeholder="Dosage (e.g. 100 mg)"
                  value={newDosage}
                  onChange={(e) => setNewDosage(e.target.value)}
                  className="text-xs p-1.5 rounded-lg border border-slate-300 bg-white"
                />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <input
                  type="text"
                  placeholder="Frequency"
                  value={newFreq}
                  onChange={(e) => setNewFreq(e.target.value)}
                  className="text-xs p-1.5 rounded-lg border border-slate-300 bg-white"
                />
                <input
                  type="text"
                  placeholder="Duration"
                  value={newDuration}
                  onChange={(e) => setNewDuration(e.target.value)}
                  className="text-xs p-1.5 rounded-lg border border-slate-300 bg-white"
                />
              </div>
              <button
                onClick={handleAddMedication}
                className="w-full py-1.5 bg-slate-200 hover:bg-slate-300 text-slate-800 rounded-lg text-xs font-semibold"
              >
                Insert Drug
              </button>
            </div>

            {/* Sign & Issue Digital Rx Button */}
            <button
              onClick={handleSignPrescription}
              className="w-full py-3 px-4 rounded-xl font-bold text-xs sm:text-sm bg-teal-700 hover:bg-teal-800 text-white flex items-center justify-center gap-2 shadow-md transition-all"
            >
              <FileText size={16} />
              <span>{t.teleconsult.saveRxBtn}</span>
            </button>

            {rxSavedNotice && (
              <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-300 text-emerald-900 text-xs flex items-center gap-2 animate-fadeIn font-semibold">
                <CheckCircle size={16} className="text-emerald-600" />
                <span>Prescription cryptographically signed & pushed to Savita Devi's ABHA locker!</span>
              </div>
            )}

            {/* Jump to Referral Tracker */}
            <button
              onClick={onGoToReferral}
              className="w-full py-2.5 px-4 rounded-xl font-semibold text-xs bg-indigo-50 hover:bg-indigo-100 text-indigo-900 border border-indigo-200 flex items-center justify-center gap-1.5 transition-all"
            >
              <span>View Closed-Loop Referral Lifecycle</span>
              <ArrowRight size={14} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
