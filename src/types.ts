export type Language = 'en' | 'hi' | 'mr';

export type UserRole = 'asha' | 'phc' | 'specialist' | 'patient' | 'admin';

export type TriageRiskLevel = 'low' | 'moderate' | 'high' | 'critical';

export type ReferralStatus = 
  | 'initiated'
  | 'in_transit'
  | 'arrived_hospital'
  | 'specialist_review'
  | 'diagnostics_prescribed'
  | 'resolved_followup';

export interface Vitals {
  systolicBP: number;
  diastolicBP: number;
  pulse: number;
  spo2: number;
  bloodSugar?: number;
  temperature?: number;
  respiratoryRate?: number;
  hemoglobin?: number;
}

export interface Prescription {
  id: string;
  medicationName: string;
  dosage: string;
  frequency: string;
  duration: string;
  instructions: string;
}

export interface TimelineEvent {
  id: string;
  timestamp: string;
  stage: string;
  facility: string;
  performer: string;
  description: string;
  status: 'completed' | 'current' | 'pending';
}

export interface ReferralRecord {
  id: string;
  patientId: string;
  fromFacility: string;
  toFacility: string;
  referringWorker: string;
  assignedSpecialist: string;
  specialty: string;
  priority: 'Emergency' | 'Urgent' | 'Routine';
  reason: string;
  createdAt: string;
  currentStatus: ReferralStatus;
  statusHistory: {
    status: ReferralStatus;
    timestamp: string;
    note: string;
  }[];
  transportMode?: string;
  ambulanceId?: string;
  estimatedArrivalMinutes?: number;
  prescribedTests?: string[];
  dischargeInstructions?: string;
  followUpDueDate?: string;
}

export interface PatientRecord {
  id: string;
  abhaId: string;
  name: string;
  age: number;
  gender: 'Female' | 'Male' | 'Other';
  phone: string;
  village: string;
  district: string;
  distanceToHospitalKm: number;
  isPregnant: boolean;
  gestationWeeks?: number;
  gravidaPara?: string;
  vitals: Vitals;
  symptoms: string[];
  riskLevel: TriageRiskLevel;
  triageReason: string;
  referral?: ReferralRecord;
  timeline: TimelineEvent[];
  prescriptions: Prescription[];
  ambulanceDispatched?: boolean;
  followUpAlertSent?: boolean;
  ashaAssigned: string;
  ashaContact: string;
  registeredDate: string;
}

export interface OfflineSyncItem {
  id: string;
  type: 'triage' | 'referral' | 'prescription' | 'vitals';
  patientId: string;
  timestamp: string;
  payload: any;
}
