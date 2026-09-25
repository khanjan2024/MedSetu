import React, { useState } from 'react';
import { PatientRecord, Language } from '../types';
import { translations } from '../data/translations';
import { 
  HeartPulse, 
  Phone, 
  MapPin, 
  QrCode, 
  Volume2, 
  CheckCircle, 
  Clock, 
  AlertTriangle, 
  Building2,
  FileText
} from './Icons';

interface PatientPortalViewProps {
  currentPatient: PatientRecord;
  currentLanguage: Language;
}

export const PatientPortalView: React.FC<PatientPortalViewProps> = ({
  currentPatient,
  currentLanguage,
}) => {
  const t = translations[currentLanguage];
  const [isSpeaking, setIsSpeaking] = useState(false);

  const handleSpeakGuidance = () => {
    if (!('speechSynthesis' in window)) {
      alert('Speech synthesis is not supported on this browser.');
      return;
    }

    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      return;
    }

    let msg = '';
    if (currentLanguage === 'hi') {
      msg = `नमस्ते सविता जी। आपका रेफरल सोलापुर जिला अस्पताल के लिए तैयार है। एम्बुलेंस आ रही है। अस्पताल पहुंचकर यह क्यूआर कोड दिखाएं। अपनी आशा दीदी सुनीता से संपर्क में रहें।`;
    } else if (currentLanguage === 'mr') {
      msg = `नमस्कार सविता ताई. आपला रेफरल सोलापूर जिल्हा रुग्णालयासाठी तयार आहे. रुग्णवाहिका येत आहे. रुग्णालयात हा क्यूआर कोड दाखवा. आशा कार्यकर्ती सुनिता यांच्या संपर्कात राहा.`;
    } else {
      msg = `Hello Savita ji. Your referral to Solapur District Hospital is active. Ambulance is en route. Show this QR pass at hospital reception. Stay in touch with ASHA Sunita.`;
    }

    const utterance = new SpeechSynthesisUtterance(msg);
    utterance.lang = currentLanguage === 'hi' ? 'hi-IN' : currentLanguage === 'mr' ? 'mr-IN' : 'en-US';
    utterance.rate = 0.9;
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);

    setIsSpeaking(true);
    window.speechSynthesis.speak(utterance);
  };

  // Multilingual SMS text simulation
  const smsText = currentLanguage === 'hi'
    ? `[मेडसेतु स्वास्थ्य संदेश] सविता जी, आपका डिजिटल रेफरल #REF-8819 सोलापुर जिला अस्पताल (डॉ. अनन्या राव) के लिए दर्ज है। 108 एम्बुलेंस आपकी सेवा में है। परामर्श के बाद आशा दीदी सुनीता आपके घर फॉलो-अप करेंगी। संपर्क: ${currentPatient.ashaContact}`
    : currentLanguage === 'mr'
    ? `[मेडसेतू आरोग्य संदेश] सविता ताई, आपला डिजिटल रेफरल #REF-8819 सोलापूर जिल्हा रुग्णालय (डॉ. अनन्य राव) साठी नोंदवला आहे. १०८ रुग्णवाहिका येत आहे. उपचारांनंतर आशा सुनिता गृहभेट देतील. संपर्क: ${currentPatient.ashaContact}`
    : `[MedSetu Alert] Savita ji, your referral #REF-8819 to Solapur District Hospital is confirmed with Dr. Ananya Rao. 108 Ambulance is en route. Post-discharge, ASHA Sunita will visit for BP monitoring. Help: ${currentPatient.ashaContact}`;

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Top Banner for Patient / Family */}
      <div className="bg-gradient-to-r from-rose-900 to-pink-950 rounded-3xl p-6 text-white shadow-xl flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-white/10 backdrop-blur border border-white/20 flex items-center justify-center text-3xl font-black">
            👩
          </div>
          <div>
            <span className="text-[11px] font-bold text-rose-300 uppercase tracking-widest block">
              Patient Care Pass (रुग्ण सेवा पास)
            </span>
            <h2 className="text-2xl font-black tracking-tight">{currentPatient.name}</h2>
            <p className="text-xs text-rose-200 mt-0.5">
              {currentPatient.village} • {currentPatient.age} Yrs • {currentPatient.isPregnant ? `${currentPatient.gestationWeeks} Weeks Pregnant` : ''}
            </p>
          </div>
        </div>

        {/* Audio Assistance Button for low literacy */}
        <button
          onClick={handleSpeakGuidance}
          className={`px-4 py-2.5 rounded-2xl font-bold text-xs flex items-center gap-2 shadow-lg transition-all ${
            isSpeaking 
              ? 'bg-amber-400 text-slate-950 animate-pulse' 
              : 'bg-white text-rose-950 hover:bg-rose-50'
          }`}
        >
          <Volume2 size={18} />
          <span>{isSpeaking ? 'बोलणे थांबवा (Stop)' : 'सूचना ऐका (Listen Audio)'}</span>
        </button>
      </div>

      {/* Main Rural Pass Card */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        {/* Left Column: Digital Pass & QR (7 cols) */}
        <div className="md:col-span-7 bg-white rounded-3xl border-2 border-slate-200 p-6 shadow-md space-y-6">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <div>
              <span className="text-[11px] font-bold text-slate-400 uppercase">Emergency Pass Status</span>
              <div className="flex items-center gap-2 mt-1">
                <span className="w-3 h-3 rounded-full bg-emerald-500 animate-ping"></span>
                <span className="font-extrabold text-slate-900 text-base">Direct Hospital Gate Pass</span>
              </div>
            </div>
            <div className="text-right">
              <span className="text-[10px] text-slate-400 font-bold uppercase block">ABHA ID</span>
              <span className="font-mono text-xs font-bold text-teal-800 bg-teal-50 px-2 py-0.5 rounded border border-teal-200">
                {currentPatient.abhaId}
              </span>
            </div>
          </div>

          {/* Large Scannable QR Code */}
          <div className="bg-slate-50 border-2 border-dashed border-slate-300 rounded-3xl p-5 text-center flex flex-col items-center">
            <div className="bg-white p-3 rounded-2xl border border-slate-300 shadow-md">
              <QrCode size={140} className="text-slate-900" />
            </div>
            <span className="text-xs font-bold text-slate-800 mt-3">
              दवाखान्यात हा कोड दाखवा (Show at Hospital Counter)
            </span>
            <p className="text-[11px] text-slate-500 mt-1 max-w-xs">
              No paperwork required! Hospital triage immediately reads BP and doctor's video notes.
            </p>
          </div>

          {/* Destination Hospital Summary */}
          <div className="p-4 rounded-2xl bg-indigo-50 border border-indigo-200 space-y-2 text-xs">
            <div className="font-bold text-indigo-950 flex items-center gap-1.5">
              <Building2 size={16} className="text-indigo-600" />
              <span>Assigned Hospital & Specialist</span>
            </div>
            <div className="text-slate-700 space-y-1">
              <p><strong>Hospital:</strong> Solapur District Civil Hospital (40 km)</p>
              <p><strong>Doctor:</strong> Dr. Ananya Rao (Specialist OBGYN & CCU)</p>
              <p><strong>Reason:</strong> High BP Care & Diagnostic Monitoring</p>
            </div>
          </div>

          {/* Quick Call ASHA Button */}
          <a
            href={`tel:${currentPatient.ashaContact}`}
            className="w-full py-3.5 px-4 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-black text-sm flex items-center justify-center gap-2 shadow-md transition-all"
          >
            <Phone size={18} />
            <span>आशा दीदींना फोन करा ({currentPatient.ashaAssigned})</span>
          </a>
        </div>

        {/* Right Column: SMS Preview & Medicines reminder (5 cols) */}
        <div className="md:col-span-5 space-y-6">
          {/* Simulated Rural Mobile Phone with SMS View */}
          <div className="bg-slate-950 rounded-3xl p-4 text-white shadow-2xl border-4 border-slate-800 space-y-3">
            <div className="flex items-center justify-between text-[11px] text-slate-400 border-b border-slate-800 pb-2">
              <span className="font-mono">📱 Mobile SMS Alert</span>
              <span className="text-emerald-400">Delivered</span>
            </div>

            <div className="bg-slate-900 rounded-2xl p-3 border border-slate-800 space-y-2">
              <div className="flex items-center justify-between text-[10px] text-slate-400">
                <span className="font-bold text-teal-400">Govt. MEDSETU SMS</span>
                <span>Just Now</span>
              </div>
              <p className="text-xs text-slate-200 leading-relaxed font-sans">
                {smsText}
              </p>
            </div>

            <div className="text-[10px] text-slate-500 text-center">
              Auto-dispatched via National Health SMS Gateway
            </div>
          </div>

          {/* Simple Medicine Reminder Card */}
          <div className="bg-white rounded-3xl border border-slate-200 p-5 shadow-sm space-y-3">
            <h4 className="font-bold text-slate-900 text-xs uppercase tracking-wider flex items-center gap-1.5">
              <FileText size={15} className="text-teal-600" />
              <span>औषधांची वेळ (Medication Time)</span>
            </h4>

            <div className="space-y-2">
              {currentPatient.prescriptions.map((rx) => (
                <div key={rx.id} className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs">
                  <div className="font-bold text-slate-900">{rx.medicationName}</div>
                  <div className="text-teal-700 font-semibold text-[11px] mt-0.5">
                    {rx.dosage} • {rx.frequency}
                  </div>
                  <div className="text-[10px] text-slate-500 mt-1">
                    {rx.instructions}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
