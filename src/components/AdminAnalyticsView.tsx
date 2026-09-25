import React, { useState } from 'react';
import { Language } from '../types';
import { translations } from '../data/translations';
import { 
  Activity, 
  Users, 
  Building2, 
  Clock, 
  AlertTriangle, 
  CheckCircle, 
  ShieldCheck, 
  HeartPulse,
  MapPin
} from './Icons';

interface AdminAnalyticsViewProps {
  currentLanguage: Language;
}

export const AdminAnalyticsView: React.FC<AdminAnalyticsViewProps> = ({
  currentLanguage,
}) => {
  const t = translations[currentLanguage];
  const [selectedDistrict, setSelectedDistrict] = useState('Solapur');

  const facilityRoutes = [
    {
      from: 'Rampur Primary Health Centre',
      to: 'Solapur District Civil Hospital',
      caseCount: 84,
      avgTransitMin: 38,
      status: 'optimal',
      bottleneck: 'None (108 Dedicated Corridor)',
      successRate: '98.8%'
    },
    {
      from: 'Borgaon PHC / Sub-centre',
      to: 'Solapur District Civil Hospital',
      caseCount: 62,
      avgTransitMin: 55,
      status: 'warning',
      bottleneck: 'Ultrasound & Radiology Queue (45m delay)',
      successRate: '92.4%'
    },
    {
      from: 'Karmala Rural Hospital',
      to: 'Government Medical College (Tertiary)',
      caseCount: 112,
      avgTransitMin: 72,
      status: 'optimal',
      bottleneck: 'None (Prioritized Bed Allocation)',
      successRate: '97.1%'
    },
    {
      from: 'Akkalkot Tribal Health Unit',
      to: 'Solapur District Civil Hospital',
      caseCount: 45,
      avgTransitMin: 64,
      status: 'warning',
      bottleneck: 'Intermittent Cellular Coverage (Offline Queue Active)',
      successRate: '94.0%'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Banner */}
      <div className="bg-gradient-to-r from-purple-900 via-slate-900 to-indigo-950 rounded-2xl p-5 text-white shadow-lg flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-purple-400 text-slate-950 uppercase tracking-wide">
              Module 6
            </span>
            <h2 className="text-xl font-bold">District Health Administration & Bottleneck Analytics</h2>
          </div>
          <p className="text-purple-200 text-xs sm:text-sm mt-1 max-w-2xl">
            Real-time monitoring of referral velocity, triage accuracy, and closed-loop follow-up compliance across primary and tertiary health networks.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <select
            value={selectedDistrict}
            onChange={(e) => setSelectedDistrict(e.target.value)}
            className="bg-purple-950/80 border border-purple-700 text-white rounded-xl px-3 py-1.5 text-xs font-semibold focus:outline-none"
          >
            <option value="Solapur">District: Solapur (Maharashtra)</option>
            <option value="Pune">District: Pune Rural</option>
            <option value="Nashik">District: Nashik Tribal Belt</option>
          </select>
        </div>
      </div>

      {/* 4 Core KPIs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Metric 1 */}
        <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm space-y-1">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase">Total Triaged</span>
            <span className="w-8 h-8 rounded-lg bg-teal-50 text-teal-600 flex items-center justify-center">
              <Users size={16} />
            </span>
          </div>
          <div className="text-2xl font-black text-slate-900">1,842</div>
          <span className="text-[11px] font-semibold text-emerald-600 flex items-center gap-1">
            <span>↑ 18% month-over-month</span>
          </span>
          <p className="text-[10px] text-slate-400">Screened across 48 village sub-centres</p>
        </div>

        {/* Metric 2 */}
        <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm space-y-1">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase">High Risk Caught Early</span>
            <span className="w-8 h-8 rounded-lg bg-rose-50 text-rose-600 flex items-center justify-center">
              <AlertTriangle size={16} />
            </span>
          </div>
          <div className="text-2xl font-black text-rose-600">341 cases</div>
          <span className="text-[11px] font-semibold text-rose-700">
            99.4% flagged within 3 minutes
          </span>
          <p className="text-[10px] text-slate-400">Preeclampsia, stroke & trauma triage</p>
        </div>

        {/* Metric 3 */}
        <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm space-y-1">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase">Lost-to-Followup Rate</span>
            <span className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <CheckCircle size={16} />
            </span>
          </div>
          <div className="text-2xl font-black text-emerald-600">0.4%</div>
          <span className="text-[11px] font-semibold text-emerald-700">
            vs 34.0% National Rural Baseline
          </span>
          <p className="text-[10px] text-slate-400">Closed-loop ASHA reminders prevent lost cases</p>
        </div>

        {/* Metric 4 */}
        <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm space-y-1">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase">Avg Time to Specialist</span>
            <span className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center">
              <Clock size={16} />
            </span>
          </div>
          <div className="text-2xl font-black text-indigo-900">42 mins</div>
          <span className="text-[11px] font-semibold text-indigo-700">
            Reduced from 7.5 hours
          </span>
          <p className="text-[10px] text-slate-400">Via assisted PHC teleconsultation & pre-admission</p>
        </div>
      </div>

      {/* Facility Referral Corridor & Bottleneck Matrix */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-4">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <div>
            <h3 className="font-bold text-slate-900 text-sm">
              Rural Facility Referral Corridors & Bottleneck Inspector
            </h3>
            <p className="text-xs text-slate-500">
              Detects delay points across transport, hospital check-in, and specialist diagnostic turnaround
            </p>
          </div>
          <span className="text-xs font-bold px-3 py-1 rounded-full bg-slate-100 text-slate-700 border">
            District: {selectedDistrict}
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-bold uppercase text-[10px]">
              <tr>
                <th className="p-3">Origin Facility</th>
                <th className="p-3">Destination Hospital</th>
                <th className="p-3 text-center">Referral Volume</th>
                <th className="p-3 text-center">Avg Transit Time</th>
                <th className="p-3">Bottleneck Status</th>
                <th className="p-3 text-right">Completion Rate</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium">
              {facilityRoutes.map((route, i) => (
                <tr key={i} className="hover:bg-slate-50/80 transition-colors">
                  <td className="p-3 text-slate-900 font-semibold">{route.from}</td>
                  <td className="p-3 text-slate-700">{route.to}</td>
                  <td className="p-3 text-center font-mono font-bold text-slate-800">{route.caseCount}</td>
                  <td className="p-3 text-center font-mono text-teal-800 font-bold">{route.avgTransitMin} min</td>
                  <td className="p-3">
                    <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold ${
                      route.status === 'optimal'
                        ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                        : 'bg-amber-50 text-amber-800 border border-amber-200'
                    }`}>
                      {route.status === 'optimal' ? <CheckCircle size={12} /> : <AlertTriangle size={12} />}
                      {route.bottleneck}
                    </span>
                  </td>
                  <td className="p-3 text-right font-mono font-black text-slate-900">{route.successRate}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Qualitative Comparison Table: Without MedSetu vs With MedSetu (from Slide 5) */}
      <div className="bg-slate-900 rounded-3xl p-6 text-white shadow-xl space-y-4">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div>
            <h3 className="font-bold text-white text-base">Impact Analysis: Before vs After MedSetu Implementation</h3>
            <p className="text-xs text-slate-400">Direct transformation documented from rural field clinical pilot</p>
          </div>
          <span className="text-xs font-bold text-teal-400 bg-teal-950 px-2.5 py-1 rounded-full border border-teal-800">
            SIH 2026 Evidence
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          {/* Before MedSetu */}
          <div className="p-4 rounded-2xl bg-rose-950/40 border border-rose-800/50 space-y-2">
            <span className="text-rose-400 font-bold text-xs uppercase tracking-wider block">
              ❌ Before MedSetu (Manual Rural Healthcare)
            </span>
            <ul className="space-y-1.5 text-rose-100 list-disc pl-4">
              <li>No gynecologist or specialist context at Primary Health Centre.</li>
              <li>Patient travels 40+ km with handwritten paper slips that get torn or lost.</li>
              <li>Specialist in tertiary hospital has zero context of prior BP or medications.</li>
              <li>Up to 34% of patients drop out or get redirected with zero follow-up.</li>
              <li>ASHA workers have no visibility into hospital treatment outcomes.</li>
            </ul>
          </div>

          {/* With MedSetu */}
          <div className="p-4 rounded-2xl bg-emerald-950/40 border border-emerald-800/50 space-y-2">
            <span className="text-emerald-400 font-bold text-xs uppercase tracking-wider block">
              ✅ With MedSetu (Unified E-Health Network)
            </span>
            <ul className="space-y-1.5 text-emerald-100 list-disc pl-4">
              <li>Assisted teleconsultation links rural PHC directly to specialist within minutes.</li>
              <li>Instant digital triage flags preeclampsia; automated 108 ambulance dispatch.</li>
              <li>One unified digital health record (ABHA) eliminates repeated history and duplicate tests.</li>
              <li>Closed-loop tracking alerts local ASHA worker for 48-hour home checkup.</li>
              <li>District administrators get live bottleneck analytics across all rural facilities.</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
