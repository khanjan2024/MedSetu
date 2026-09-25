# MedSetu (स्मार्ट सेतु)
### Smart E-Health & Teleconsultation Unified Network

**Smart India Hackathon 2026 • Problem Statement ID: 26133**  
*Accessibility and quality of public healthcare services, particularly in rural and underserved areas*  
**Theme:** MedTech / BioTech / HealthTech | **Category:** Software  

---

## 📌 Problem Context: The Savita Devi Case Study
In rural India, Primary Health Centres (PHCs) and village sub-centres often lack resident specialist doctors. A 42-year-old pregnant woman (*Savita Devi*), 40 km from the district hospital, presents with high blood pressure, chest tightness, and breathlessness. 
- **Without MedSetu:** No specialist at PHC, no recorded history, no tracked referral. Patient travels hours, repeats paperwork, faces long delays, and drops out with zero follow-up (~34% dropout rate).
- **With MedSetu:** Instant triage catches hypertensive crisis; automated 108 ambulance dispatch; assisted PHC teleconsultation connects with district specialist; closed-loop referral sends automated 48-hour home checkup alert to local ASHA worker.

---

## 🚀 4 Core Pillars of MedSetu

1. **Digital Triage & SOS Escalation:**
   - Real-time maternal and cardiovascular risk engine.
   - Evaluates vitals (BP, SpO2, Pulse, Blood Sugar) and red flags (chest pain, convulsions, edema).
   - One-click **108 Emergency Ambulance Dispatch** with GPS tracking.
   - **Rural Speech Synthesis:** Text-to-speech audio readout in **Hindi (हिंदी)**, **Marathi (मराठी)**, and **English** for community health workers with low digital literacy.

2. **Assisted PHC Teleconsultation Room:**
   - Encrypted WebRTC-style video link connecting rural PHC Medical Officer to District Hospital Specialist.
   - Live **Patient Vitals Telemetry HUD** with simulated ECG heartbeat animation.
   - Interactive prescription pad with test orders (ECG, Urine Albumin, Ultrasound) and medications (Tab. Labetalol 100mg BD).
   - Cryptographically signed digital Rx compliant with ABDM Telemedicine Guidelines.

3. **Closed-Loop End-to-End Referral Tracking:**
   - 5-stage interactive lifecycle: Triage $\to$ In-Transit $\to$ Hospital Check-in $\to$ Specialist Care $\to$ ASHA Follow-up.
   - Printable / Digital Referral Slip with scannable QR Code for instant desk check-in.
   - Automated push notifications and SMS alerts to village ASHA worker for 48-hour post-discharge home monitoring.

4. **Unified Shared Digital Health Record (ABHA):**
   - Ayushman Bharat Digital Mission (ABDM) 14-digit ABHA identity card.
   - Longitudinal vitals trajectory charts showing pre-triage spike vs post-treatment stabilization.
   - HL7 FHIR R4 clinical document bundle export ready for national health data exchange.

---

## 🛠️ Tech Stack & Rural Resilience
- **Frontend:** React 19, TypeScript, Tailwind CSS, Vite.
- **Languages Supported:** English, Hindi (हिंदी), Marathi (मराठी).
- **Offline First:** Built-in low-bandwidth rural mode with pending outbox cache and one-click cloud sync.
- **Compliance:** ABDM (Ayushman Bharat Digital Mission) FHIR R4, MoHFW Telemedicine Practice Guidelines.

---

## 💻 Local Quick Start

```bash
# Clone the repository
git clone https://github.com/khanjan2024/MedSetu.git
cd MedSetu/medsetu-app

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

Open [http://localhost:5173/](http://localhost:5173/) in your browser.

---

*Developed for Smart India Hackathon 2026 by Team MedSetu.*
