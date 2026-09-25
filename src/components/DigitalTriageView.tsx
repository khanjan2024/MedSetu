import React, { useState } from 'react';
import { PatientRecord, Language, TriageRiskLevel } from '../types';
import { translations } from '../data/translations';
import { 
  HeartPulse, 
  AlertTriangle, 
  Ambulance, 
  Video, 
  Volume2, 
  CheckCircle, 
  Activity, 
  Phone, 
  MapPin, 
  Clock,
  ArrowRight,
  ShieldCheck
} from './Icons';

interface DigitalTriageViewProps {
  currentPatient: PatientRecord;
  onUpdatePatient: (updated: PatientRecord) => void;
  onSelectSavitaCase: () => void;
  onGoToTeleconsult: () => void;
  onGoToReferral: () => void;
  currentLanguage: Language;
  isOffline: boolean;
}

export const DigitalTriageView: React.FC<DigitalTriageViewProps> = ({
  currentPatient,
  onUpdatePatient,
  onSelectSavitaCase,
  onGoToTeleconsult,
  onGoToReferral,
  currentLanguage,
  isOffline,
}) => {
  const t = translations[currentLanguage];
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [showAmbulanceSuccess, setShowAmbulanceSuccess] = useState(false);

  // Red-flag symptom definitions
  const allRedFlags = [
    { id: 'chest_pain', label: 'Chest discomfort / tightness / pain', severe: true },
    { id: 'breathlessness', label: 'Breathlessness / shortness of breath', severe: true },
    { id: 'headache_vision', label: 'Severe frontal headache or blurred vision / flashing spots', severe: true },
    { id: 'convulsions', label: 'Convulsions / Fits / Eclampsia signs', severe: true },
    { id: 'vaginal_bleeding', label: 'Vaginal bleeding or foul discharge', severe: true },
    { id: 'severe_edema', label: 'Sudden swelling of face, hands, or feet (Edema)', severe: false },
    { id: 'high_sugar', label: 'Extreme thirst / Ketone breath / Glucose >250', severe: false },
  ];

  // Dynamic Triage calculation logic
  const calculateTriage = (v: typeof currentPatient.vitals, syms: string[], isPreg: boolean): { level: TriageRiskLevel; reason: string } => {
    const hasSevereHypertension = v.systolicBP >= 160 || v.diastolicBP >= 100;
    const hasModerateHypertension = v.systolicBP >= 140 || v.diastolicBP >= 90;
    const hasLowOxygen = v.spo2 < 92;
    const hasTachycardia = v.pulse > 115 || v.pulse < 50;
    const hasChestPain = syms.some(s => s.toLowerCase().includes('chest') || s.toLowerCase().includes('breath'));
    const hasConvulsions = syms.some(s => s.toLowerCase().includes('convulsion') || s.toLowerCase().includes('headache'));

    if (hasSevereHypertension && isPreg) {
      return {
        level: 'critical',
        reason: 'CRITICAL EMERGENCY: Severe Preeclampsia / Hypertensive Crisis in pregnancy. Imminent risk of maternal eclampsia & fetal distress.'
      };
    }

    if (hasLowOxygen || (hasSevereHypertension && hasChestPain)) {
      return {
        level: 'critical',
        reason: 'CRITICAL EMERGENCY: Severe cardiopulmonary compromise or acute hypertensive crisis. Immediate ambulance transfer required.'
      };
    }

    if (hasModerateHypertension || hasTachycardia || syms.length >= 2) {
      return {
        level: 'high',
        reason: 'HIGH RISK: Hemodynamic instability or multiple red-flag indicators. Mandatory assisted specialist teleconsultation at PHC.'
      };
    }

    if (v.bloodSugar && v.bloodSugar > 200) {
      return {
        level: 'moderate',
        reason: 'MODERATE RISK: Uncontrolled blood glucose. Requires medical officer review and prescription adjustment.'
      };
    }

    return {
      level: 'low',
      reason: 'ROUTINE RISK: Vitals within standard thresholds. Community ASHA home tracking every 14 days.'
    };
  };

  const handleVitalChange = (field: keyof typeof currentPatient.vitals, value: number) => {
    const newVitals = { ...currentPatient.vitals, [field]: value };
    const { level, reason } = calculateTriage(newVitals, currentPatient.symptoms, currentPatient.isPregnant);
    onUpdatePatient({
      ...currentPatient,
      vitals: newVitals,
      riskLevel: level,
      triageReason: reason,
    });
  };

  const handleToggleSymptom = (symptomLabel: string) => {
    let newSymptoms: string[];
    if (currentPatient.symptoms.includes(symptomLabel)) {
      newSymptoms = currentPatient.symptoms.filter(s => s !== symptomLabel);
    } else {
      newSymptoms = [...currentPatient.symptoms, symptomLabel];
    }
    const { level, reason } = calculateTriage(currentPatient.vitals, newSymptoms, currentPatient.isPregnant);
    onUpdatePatient({
      ...currentPatient,
      symptoms: newSymptoms,
      riskLevel: level,
      triageReason: reason,
    });
  };

  const handleDispatchAmbulance = () => {
    setShowAmbulanceSuccess(true);
    onUpdatePatient({
      ...currentPatient,
      ambulanceDispatched: true,
      referral: currentPatient.referral ? {
        ...currentPatient.referral,
        currentStatus: 'in_transit',
        statusHistory: [
          ...currentPatient.referral.statusHistory,
          {
            status: 'in_transit',
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            note: '108 Emergency Ambulance dispatched via MedSetu SOS. Oxygen & telemetry active.'
          }
        ]
      } : undefined
    });
  };

  // Web Speech API Voice synthesis for low literacy health workers
  const handlePlayVoiceGuidance = () => {
    if (!('speechSynthesis' in window)) {
      alert('Speech synthesis is not supported on this browser.');
      return;
    }

    if (isPlayingAudio) {
      window.speechSynthesis.cancel();
      setIsPlayingAudio(false);
      return;
    }

    let speechText = '';
    if (currentLanguage === 'hi') {
      speechText = `मरीज़ ${currentPatient.name}, आयु ${currentPatient.age} वर्ष। रक्तचाप ${currentPatient.vitals.systolicBP} बटा ${currentPatient.vitals.diastolicBP} है, जो बहुत अधिक है। स्थिति अत्यंत गंभीर है। तुरंत १०८ एम्बुलेंस बुलाएं अथवा प्राथमिक स्वास्थ्य केंद्र पर टेलीपरामर्श करें।`;
    } else if (currentLanguage === 'mr') {
      speechText = `रुग्ण ${currentPatient.name}, वय ${currentPatient.age} वर्षे. रक्तदाब ${currentPatient.vitals.systolicBP} बाय ${currentPatient.vitals.diastolicBP} आहे, जो धोकादायक पातळीवर आहे. तत्काळ १०८ रुग्णवाहिका बोलवा आणि जिल्हा रुग्णालयाशी संपर्क साधा.`;
    } else {
      speechText = `Patient ${currentPatient.name}, age ${currentPatient.age}. Blood pressure is ${currentPatient.vitals.systolicBP} over ${currentPatient.vitals.diastolicBP}. Severity is Critical. Immediate 108 emergency ambulance dispatch and teleconsultation recommended.`;
    }

    const utterance = new SpeechSynthesisUtterance(speechText);
    utterance.rate = 0.95;
    utterance.lang = currentLanguage === 'hi' ? 'hi-IN' : currentLanguage === 'mr' ? 'mr-IN' : 'en-US';
    utterance.onend = () => setIsPlayingAudio(false);
    utterance.onerror = () => setIsPlayingAudio(false);

    setIsPlayingAudio(true);
    window.speechSynthesis.speak(utterance);
  };

  return (
    <div className="space-y-6">
      {/* Hero Header & Quick Load Bar */}
      <div className="bg-gradient-to-r from-teal-800 to-sky-900 rounded-2xl p-5 text-white shadow-lg flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-400 text-slate-950 uppercase tracking-wide">
              Module 1
            </span>
            <h2 className="text-xl font-bold">{t.triage.heroTitle}</h2>
          </div>
          <p className="text-teal-100 text-xs sm:text-sm mt-1 max-w-2xl">
            {t.triage.heroSubtitle}
          </p>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          <button
            onClick={onSelectSavitaCase}
            className="px-3.5 py-2 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs shadow-md transition-all flex items-center gap-1.5 ring-2 ring-amber-300/40"
          >
            <HeartPulse size={16} />
            <span>{t.triage.loadSavita}</span>
          </button>

          <button
            onClick={handlePlayVoiceGuidance}
            className={`px-3 py-2 rounded-xl font-semibold text-xs border transition-all flex items-center gap-1.5 ${
              isPlayingAudio 
                ? 'bg-rose-500 text-white border-rose-400 animate-pulse' 
                : 'bg-white/10 hover:bg-white/20 text-white border-white/20'
            }`}
          >
            <Volume2 size={16} />
            <span>{isPlayingAudio ? t.triage.stopVoice : t.triage.listenVoice}</span>
          </button>
        </div>
      </div>

      {/* Main Grid: Patient Profile & Vitals Form */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Demographics & Vitals Inputs (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          {/* Patient Card */}
          <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-teal-100 text-teal-800 font-extrabold flex items-center justify-center text-lg border-2 border-teal-200">
                  {currentPatient.name.split(' ').map(n => n[0]).join('')}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-bold text-slate-900 text-lg">{currentPatient.name}</h3>
                    <span className="text-xs px-2 py-0.5 rounded-md font-mono bg-slate-100 text-slate-700 border">
                      {currentPatient.id}
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 flex items-center gap-2 mt-0.5">
                    <span>{currentPatient.age} yrs • {currentPatient.gender}</span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <MapPin size={13} className="text-slate-400" />
                      {currentPatient.village} ({currentPatient.distanceToHospitalKm} km from District Hospital)
                    </span>
                  </p>
                </div>
              </div>

              <div className="text-right">
                <span className="text-[11px] block font-semibold text-slate-400 uppercase">ABHA Identity</span>
                <span className="font-mono text-xs font-bold text-teal-900 bg-teal-50 px-2 py-1 rounded border border-teal-200">
                  {currentPatient.abhaId}
                </span>
              </div>
            </div>

            {/* Pregnancy indicator if applicable */}
            {currentPatient.isPregnant && (
              <div className="mb-4 bg-rose-50 border border-rose-200 rounded-xl p-3 flex items-center justify-between text-xs text-rose-950 font-medium">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-rose-500 animate-pulse"></span>
                  <span className="font-bold">Pregnant Patient:</span>
                  <span>{currentPatient.gestationWeeks} Weeks Gestation ({currentPatient.gravidaPara})</span>
                </div>
                <span className="bg-rose-100 text-rose-800 text-[11px] font-bold px-2 py-0.5 rounded-full">
                  High Maternal Vigilance
                </span>
              </div>
            )}

            {/* Vitals Form */}
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3 flex items-center gap-1.5">
              <Activity size={14} className="text-teal-600" />
              {t.triage.vitalsSection}
            </h4>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {/* BP Systolic */}
              <div className="p-3 rounded-xl border border-slate-200 bg-slate-50/50">
                <label className="text-[11px] font-bold text-slate-600 block mb-1">
                  Systolic BP (mmHg)
                </label>
                <div className="flex items-center gap-1">
                  <input
                    type="number"
                    value={currentPatient.vitals.systolicBP}
                    onChange={(e) => handleVitalChange('systolicBP', Number(e.target.value))}
                    className={`w-full text-lg font-black rounded-lg border px-2 py-1 ${
                      currentPatient.vitals.systolicBP >= 160 
                        ? 'border-rose-400 bg-rose-50 text-rose-700' 
                        : 'border-slate-300 bg-white text-slate-900'
                    }`}
                  />
                </div>
                <span className="text-[10px] text-slate-400 mt-1 block">
                  {currentPatient.vitals.systolicBP >= 160 ? '⚠️ Severe Stage 2' : 'Normal: 110-120'}
                </span>
              </div>

              {/* BP Diastolic */}
              <div className="p-3 rounded-xl border border-slate-200 bg-slate-50/50">
                <label className="text-[11px] font-bold text-slate-600 block mb-1">
                  Diastolic BP (mmHg)
                </label>
                <input
                  type="number"
                  value={currentPatient.vitals.diastolicBP}
                  onChange={(e) => handleVitalChange('diastolicBP', Number(e.target.value))}
                  className={`w-full text-lg font-black rounded-lg border px-2 py-1 ${
                    currentPatient.vitals.diastolicBP >= 100 
                      ? 'border-rose-400 bg-rose-50 text-rose-700' 
                      : 'border-slate-300 bg-white text-slate-900'
                  }`}
                />
                <span className="text-[10px] text-slate-400 mt-1 block">
                  {currentPatient.vitals.diastolicBP >= 100 ? '⚠️ Severe Risk' : 'Normal: 70-80'}
                </span>
              </div>

              {/* SpO2 */}
              <div className="p-3 rounded-xl border border-slate-200 bg-slate-50/50">
                <label className="text-[11px] font-bold text-slate-600 block mb-1">
                  SpO2 (%)
                </label>
                <input
                  type="number"
                  value={currentPatient.vitals.spo2}
                  onChange={(e) => handleVitalChange('spo2', Number(e.target.value))}
                  className={`w-full text-lg font-black rounded-lg border px-2 py-1 ${
                    currentPatient.vitals.spo2 < 94 
                      ? 'border-rose-400 bg-rose-50 text-rose-700' 
                      : 'border-slate-300 bg-white text-slate-900'
                  }`}
                />
                <span className="text-[10px] text-slate-400 mt-1 block">
                  {currentPatient.vitals.spo2 < 94 ? '⚠️ Hypoxia' : 'Normal: 95-100%'}
                </span>
              </div>

              {/* Pulse */}
              <div className="p-3 rounded-xl border border-slate-200 bg-slate-50/50">
                <label className="text-[11px] font-bold text-slate-600 block mb-1">
                  Pulse (BPM)
                </label>
                <input
                  type="number"
                  value={currentPatient.vitals.pulse}
                  onChange={(e) => handleVitalChange('pulse', Number(e.target.value))}
                  className="w-full text-lg font-black rounded-lg border border-slate-300 bg-white text-slate-900 px-2 py-1"
                />
                <span className="text-[10px] text-slate-400 mt-1 block">Normal: 60-100</span>
              </div>
            </div>

            {/* Blood Sugar & Resp Rate */}
            <div className="grid grid-cols-2 gap-3 mt-3">
              <div className="p-3 rounded-xl border border-slate-200 bg-slate-50/50">
                <label className="text-[11px] font-bold text-slate-600 block mb-1">
                  Blood Glucose (mg/dL)
                </label>
                <input
                  type="number"
                  value={currentPatient.vitals.bloodSugar || 110}
                  onChange={(e) => handleVitalChange('bloodSugar', Number(e.target.value))}
                  className="w-full text-sm font-bold rounded-lg border border-slate-300 bg-white text-slate-900 px-2 py-1"
                />
              </div>

              <div className="p-3 rounded-xl border border-slate-200 bg-slate-50/50">
                <label className="text-[11px] font-bold text-slate-600 block mb-1">
                  Assigned ASHA Worker
                </label>
                <div className="text-xs font-semibold text-slate-800 flex items-center justify-between pt-1">
                  <span>{currentPatient.ashaAssigned}</span>
                  <span className="text-[11px] font-mono text-teal-700">{currentPatient.ashaContact}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Red Flag Symptoms Checklist */}
          <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3 flex items-center gap-1.5">
              <AlertTriangle size={15} className="text-rose-500" />
              {t.triage.redFlagsSection}
            </h4>

            <div className="space-y-2">
              {allRedFlags.map((flag) => {
                const isSelected = currentPatient.symptoms.includes(flag.label);
                return (
                  <label
                    key={flag.id}
                    onClick={() => handleToggleSymptom(flag.label)}
                    className={`flex items-center justify-between p-3 rounded-xl border text-xs cursor-pointer transition-all ${
                      isSelected
                        ? flag.severe
                          ? 'bg-rose-50 border-rose-300 text-rose-950 font-bold shadow-xs'
                          : 'bg-amber-50 border-amber-300 text-amber-950 font-semibold'
                        : 'bg-slate-50/70 border-slate-200 text-slate-700 hover:bg-slate-100'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <input
                        type="checkbox"
                        checked={isSelected}
                        onChange={() => {}} // handled by parent label click
                        className="rounded text-rose-600 focus:ring-rose-500 w-4 h-4 cursor-pointer"
                      />
                      <span>{flag.label}</span>
                    </div>
                    {flag.severe && (
                      <span className="text-[10px] font-extrabold uppercase px-1.5 py-0.5 rounded bg-rose-200 text-rose-900">
                        Critical Red Flag
                      </span>
                    )}
                  </label>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Column: AI Triage Engine Verdict & Action Protocols (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          {/* Triage Verdict Box */}
          <div className={`rounded-2xl border-2 p-5 shadow-md transition-all ${
            currentPatient.riskLevel === 'critical'
              ? 'bg-rose-50/90 border-rose-500 ring-4 ring-rose-500/10'
              : currentPatient.riskLevel === 'high'
              ? 'bg-amber-50/90 border-amber-500 ring-4 ring-amber-500/10'
              : 'bg-emerald-50/90 border-emerald-500 ring-4 ring-emerald-500/10'
          }`}>
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-black uppercase tracking-wider text-slate-600">
                {t.triage.riskLevel}
              </span>
              <span className={`text-xs font-black px-3 py-1 rounded-full uppercase flex items-center gap-1.5 ${
                currentPatient.riskLevel === 'critical'
                  ? 'bg-rose-600 text-white animate-pulse'
                  : currentPatient.riskLevel === 'high'
                  ? 'bg-amber-500 text-white'
                  : 'bg-emerald-600 text-white'
              }`}>
                <AlertTriangle size={13} />
                {currentPatient.riskLevel.toUpperCase()} PRIORITY
              </span>
            </div>

            <div className="bg-white rounded-xl p-4 border border-slate-200 shadow-inner mb-4">
              <div className="text-xs font-bold text-slate-500 uppercase mb-1">
                Clinical Rationale:
              </div>
              <p className="text-sm font-semibold text-slate-900 leading-snug">
                {currentPatient.triageReason}
              </p>
            </div>

            {/* Protocol Directive Box */}
            <div className="text-xs space-y-2 mb-5">
              <div className="font-bold text-slate-800 flex items-center gap-1.5">
                <CheckCircle size={15} className="text-teal-600" />
                <span>{t.triage.recommendation}</span>
              </div>
              <ul className="list-disc pl-4 text-slate-700 space-y-1">
                {currentPatient.riskLevel === 'critical' ? (
                  <>
                    <li className="font-bold text-rose-800">Immediately transfer patient to District Hospital with OBGYN/CCU care.</li>
                    <li>Notify emergency 108 ambulance with obstetric kit.</li>
                    <li>Conduct assisted teleconsultation with District Specialist while transit arranges.</li>
                    <li>Begin maternal seizure prophylaxis monitoring (BP checks every 15 min).</li>
                  </>
                ) : currentPatient.riskLevel === 'high' ? (
                  <>
                    <li>Connect patient to PHC Medical Officer for assisted teleconsultation.</li>
                    <li>Generate tracked digital referral to District Hospital.</li>
                    <li>Order immediate point-of-care urine albumin and blood glucose.</li>
                  </>
                ) : (
                  <>
                    <li>Provide routine counseling and iron/calcium supplements.</li>
                    <li>Schedule ASHA home visit in 14 days.</li>
                  </>
                )}
              </ul>
            </div>

            {/* Action Buttons */}
            <div className="space-y-2.5">
              {/* Emergency Ambulance SOS */}
              {currentPatient.riskLevel === 'critical' && (
                <button
                  onClick={handleDispatchAmbulance}
                  disabled={currentPatient.ambulanceDispatched}
                  className={`w-full py-3 px-4 rounded-xl font-black text-sm flex items-center justify-center gap-2 shadow-lg transition-all ${
                    currentPatient.ambulanceDispatched
                      ? 'bg-emerald-600 text-white cursor-default'
                      : 'bg-rose-600 hover:bg-rose-700 text-white animate-bounce'
                  }`}
                >
                  <Ambulance size={18} />
                  <span>
                    {currentPatient.ambulanceDispatched 
                      ? '✓ 108 Ambulance En Route (ETA 12m)' 
                      : t.triage.ambulanceBtn}
                  </span>
                </button>
              )}

              {/* Assisted Teleconsultation Button */}
              <button
                onClick={onGoToTeleconsult}
                className="w-full py-3 px-4 rounded-xl font-bold text-xs sm:text-sm bg-teal-700 hover:bg-teal-800 text-white flex items-center justify-center gap-2 shadow-md transition-all"
              >
                <Video size={17} />
                <span>{t.triage.referPhcBtn}</span>
                <ArrowRight size={15} />
              </button>

              {/* View Referral Tracker Button */}
              <button
                onClick={onGoToReferral}
                className="w-full py-2.5 px-4 rounded-xl font-semibold text-xs bg-white hover:bg-slate-50 text-slate-800 border border-slate-300 flex items-center justify-center gap-1.5 transition-all"
              >
                <Clock size={15} className="text-slate-500" />
                <span>Track Digital E-Referral Journey</span>
              </button>
            </div>
          </div>

          {/* Success Banner if ambulance was dispatched */}
          {showAmbulanceSuccess && (
            <div className="bg-emerald-50 border border-emerald-300 rounded-2xl p-4 text-emerald-950 text-xs shadow-md animate-fadeIn">
              <div className="flex items-center gap-2 font-bold mb-1 text-sm text-emerald-800">
                <CheckCircle size={17} className="text-emerald-600" />
                <span>SOS Alert Successfully Dispatched</span>
              </div>
              <p className="text-emerald-900 leading-relaxed">
                {t.triage.ambulanceDispatchedText} Solapur District Civil Hospital Emergency Department has been pre-notified of an incoming critical preeclampsia transfer.
              </p>
            </div>
          )}

          {/* ABDM Standards & Privacy Footer Note */}
          <div className="bg-white rounded-2xl border border-slate-200 p-4 text-[11px] text-slate-500 space-y-1.5">
            <div className="flex items-center gap-1.5 font-bold text-slate-700">
              <ShieldCheck size={14} className="text-teal-600" />
              <span>Ayushman Bharat Digital Mission (ABDM) Guardrails</span>
            </div>
            <p>
              Triage entries are signed cryptographically and linked to the patient's ABHA identifier. Records remain cached locally when network connectivity drops.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
