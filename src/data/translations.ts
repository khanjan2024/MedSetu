import { Language } from '../types';

export const translations = {
  en: {
    appTitle: 'MedSetu',
    appSubtitle: 'Smart E-Health & Teleconsultation Unified Network',
    sihTag: 'SIH 2026 • Problem Statement ID: 26133',
    online: 'Online (Connected)',
    offline: 'Offline Mode (Rural Sync)',
    syncPending: 'sync pending',
    syncNow: 'Sync to Cloud',
    
    // Roles
    roles: {
      asha: 'ASHA Worker (Sunita)',
      phc: 'PHC Doctor (Dr. Sharma)',
      specialist: 'District Specialist (Dr. Rao)',
      patient: 'Patient (Savita Devi)',
      admin: 'Health Officer (Analytics)',
    },
    
    // Tabs / Sections
    tabs: {
      triage: 'Digital Triage & SOS',
      teleconsult: 'Assisted Teleconsultation',
      referral: 'Referral Tracker (End-to-End)',
      records: 'Unified Health Record (ABHA)',
      patientView: 'Patient Pass & SMS',
      analytics: 'District Analytics',
    },
    
    // Triage View
    triage: {
      heroTitle: 'Rapid Rural Health Screening & Triage',
      heroSubtitle: 'Instant risk categorization preventing lost cases and maternal complications',
      loadSavita: 'Load Savita Devi SIH Case (Chest Pain + High BP in Pregnancy)',
      patientInfo: 'Patient Demographics',
      vitalsSection: 'Clinical Vitals & Measurements',
      redFlagsSection: 'Red Flag Symptoms (High Alert)',
      riskLevel: 'Calculated Triage Severity',
      recommendation: 'Recommended Clinical Protocol',
      ambulanceBtn: '🚨 Emergency Ambulance Dispatch (108)',
      referPhcBtn: 'Schedule Teleconsultation at PHC',
      routineBtn: 'Routine Village Care & Log Follow-up',
      listenVoice: 'Listen Audio Instructions',
      stopVoice: 'Stop Audio',
      ambulanceDispatchedText: 'Ambulance Unit MH-14-108 dispatched! Live GPS tracking enabled.',
    },
    
    // Teleconsultation
    teleconsult: {
      title: 'Assisted PHC Teleconsultation Room',
      subtitle: 'Connecting Rampur Primary Health Centre directly to District Hospital Specialist',
      specialistName: 'Dr. Ananya Rao (MD, Gynecologist & Cardiologist)',
      facility: 'District Hospital, Solapur',
      vitalsHUD: 'Live Patient Vitals Telemetry',
      rxSection: 'Digital Prescription & Clinical Directives',
      saveRxBtn: 'Sign & Issue Digital Rx (ABDM Linked)',
      callActive: 'Encrypted Tele-Video Feed Active',
    },
    
    // Referral Tracker
    referral: {
      title: 'Closed-Loop E-Referral Tracking',
      subtitle: 'Zero lost cases: Tracking patient journey from village ASHA to District Hospital and back',
      step1: '1. Triage & Initiated',
      step2: '2. Transit / Ambulance',
      step3: '3. Hospital Check-in',
      step4: '4. Specialist & Tests',
      step5: '5. ASHA Follow-up Alert',
      advanceStage: 'Simulate Next Referral Stage',
      slipTitle: 'Official Government E-Referral Slip',
      printSlip: 'Print / Save Referral Pass',
      ashaNotificationSent: 'SMS & App Alert sent to ASHA worker for 48h home monitoring',
    },
    
    // Common
    common: {
      bp: 'Blood Pressure',
      pulse: 'Pulse Rate',
      spo2: 'SpO2 Oxygen',
      bloodSugar: 'Random Blood Sugar',
      pregnant: 'Pregnancy',
      gestation: 'Gestation Weeks',
      status: 'Status',
      abha: 'ABHA ID',
      phone: 'Phone',
      village: 'Village',
      hospitalDistance: 'Distance to District Hospital',
    }
  },
  
  hi: {
    appTitle: 'मेडसेतु (MedSetu)',
    appSubtitle: 'स्मार्ट ई-स्वास्थ्य एवं टेलीपरामर्श एकीकृत नेटवर्क',
    sihTag: 'स्मार्ट इंडिया हैकथॉन 2026 • समस्या क्रमांक: 26133',
    online: 'ऑनलाइन (सक्रिय)',
    offline: 'ऑफ़लाइन मोड (ग्रामीण सिंक)',
    syncPending: 'सिंक लंबित',
    syncNow: 'क्लाउड सिंक करें',
    
    // Roles
    roles: {
      asha: 'आशा कार्यकर्ता (सुनीता देवी)',
      phc: 'पीएचसी डॉक्टर (डॉ. शर्मा)',
      specialist: 'जिला विशेषज्ञ (डॉ. राव)',
      patient: 'मरीज़ (सविता देवी)',
      admin: 'जिला स्वास्थ्य अधिकारी',
    },
    
    // Tabs / Sections
    tabs: {
      triage: 'डिजिटल ट्राइएज एवं आपातकालीन',
      teleconsult: 'सहायता प्राप्त टेलीकंसल्टेशन',
      referral: 'रेफरल ट्रैकर (शुरू से अंत तक)',
      records: 'एकीकृत डिजिटल रिकॉर्ड (ABHA)',
      patientView: 'मरीज़ पर्ची व एसएमएस',
      analytics: 'जिला डैशबोर्ड व विश्लेषण',
    },
    
    // Triage View
    triage: {
      heroTitle: 'त्वरित ग्रामीण स्वास्थ्य जांच एवं ट्राइएज',
      heroSubtitle: 'तत्काल जोखिम मूल्यांकन — कोई भी मामला बिना इलाज के न छूटे',
      loadSavita: 'सविता देवी केस लोड करें (गर्भावस्था में उच्च रक्तचाप व सीने में दर्द)',
      patientInfo: 'मरीज़ का विवरण',
      vitalsSection: 'शारीरिक माप एवं जांच (Vitals)',
      redFlagsSection: 'खतरे के लक्षण (रेड फ्लैग)',
      riskLevel: 'निर्धारित जोखिम स्तर',
      recommendation: 'अनुशंसित उपचार प्रोटोकॉल',
      ambulanceBtn: '🚨 आपातकालीन एम्बुलेंस बुलाएं (108)',
      referPhcBtn: 'पीएचसी टेलीकंसल्टेशन बुक करें',
      routineBtn: 'सामान्य परामर्श व नियमित फॉलो-अप दर्ज करें',
      listenVoice: 'निर्देश बोलकर सुनें',
      stopVoice: 'आवाज रोकें',
      ambulanceDispatchedText: 'एम्बुलेंस MH-14-108 रवाना हो गई है! जीपीएस ट्रैकिंग सक्रिय है।',
    },
    
    // Teleconsultation
    teleconsult: {
      title: 'पीएचसी सहायता प्राप्त टेलीपरामर्श कक्ष',
      subtitle: 'रामपुर प्राथमिक स्वास्थ्य केंद्र से जिला अस्पताल विशेषज्ञ का सीधा संपर्क',
      specialistName: 'डॉ. अनन्या राव (एमडी, स्त्री रोग एवं हृदय रोग विशेषज्ञ)',
      facility: 'जिला अस्पताल, सोलापुर',
      vitalsHUD: 'लाइव मरीज़ वाइटल्स टेलीमेट्री',
      rxSection: 'डिजिटल पर्चा एवं चिकित्सीय निर्देश',
      saveRxBtn: 'डिजिटल पर्चा जारी करें (ABDM प्रमाणित)',
      callActive: 'सुरक्षित वीडियो परामर्श चालू है',
    },
    
    // Referral Tracker
    referral: {
      title: 'क्लोज्ड-लूप डिजिटल रेफरल ट्रैकिंग',
      subtitle: 'शून्य खोए मामले: गांव से जिला अस्पताल और वापस आशा फॉलो-अप तक निरंतर ट्रैकिंग',
      step1: '1. जांच एवं रेफरल',
      step2: '2. परिवहन / एम्बुलेंस',
      step3: '3. अस्पताल आगमन',
      step4: '4. विशेषज्ञ जांच व इलाज',
      step5: '5. आशा फॉलो-अप अलर्ट',
      advanceStage: 'अगला चरण सिमुलेट करें',
      slipTitle: 'सरकारी डिजिटल रेफरल पास',
      printSlip: 'रेफरल पर्ची प्रिंट करें',
      ashaNotificationSent: 'आशा कार्यकर्ता को 48 घंटे में गृह भेंट के लिए संदेश भेज दिया गया है',
    },
    
    // Common
    common: {
      bp: 'रक्तचाप (BP)',
      pulse: 'नाड़ी गति (Pulse)',
      spo2: 'ऑक्सीजन (SpO2)',
      bloodSugar: 'रक्त शर्करा (Sugar)',
      pregnant: 'गर्भावस्था',
      gestation: 'गर्भकाल (सप्ताह)',
      status: 'स्थिति',
      abha: 'आभा आईडी (ABHA)',
      phone: 'फ़ोन नंबर',
      village: 'गांव',
      hospitalDistance: 'जिला अस्पताल से दूरी',
    }
  },
  
  mr: {
    appTitle: 'मेडसेतू (MedSetu)',
    appSubtitle: 'स्मार्ट ई-आरोग्य आणि टेलिसल्ला एकात्मिक नेटवर्क',
    sihTag: 'स्मार्ट इंडिया हॅकेथॉन २०२६ • समस्या क्र: २६१३३',
    online: 'ऑनलाइन (सक्रिय)',
    offline: 'ऑफलाइन मोड (ग्रामीण सिंक)',
    syncPending: 'सिंक प्रलंबित',
    syncNow: 'क्लाउड सिंक करा',
    
    // Roles
    roles: {
      asha: 'आशा कार्यकर्ती (सुनिता)',
      phc: 'प्रा.आ. केंद्र वैद्यकीय अधिकारी',
      specialist: 'जिल्हा तज्ज्ञ डॉक्टर (डॉ. राव)',
      patient: 'रुग्ण (सविता देवी)',
      admin: 'जिल्हा आरोग्य अधिकारी',
    },
    
    // Tabs / Sections
    tabs: {
      triage: 'डिजिटल ट्रायज व आपत्कालीन',
      teleconsult: 'टेलिमेडिसिन सल्ला',
      referral: 'रेफरल ट्रॅकर (सुरुवात ते शेवट)',
      records: 'एकात्मिक डिजिटल आरोग्य नोंद (ABHA)',
      patientView: 'रुग्ण पास व एसएमएस',
      analytics: 'जिल्हा आरोग्य विश्लेषण',
    },
    
    // Triage View
    triage: {
      heroTitle: 'जलद ग्रामीण आरोग्य तपासणी व ट्रायज',
      heroSubtitle: 'तातडीचे जोखीम मूल्यांकन — कोणताही रुग्ण उपचारांशिवाय मागे राहू नये',
      loadSavita: 'सविता देवी केस लोड करा (गर्भावस्थेत उच्च रक्तदाब व छातीत दुखणे)',
      patientInfo: 'रुग्णाची माहिती',
      vitalsSection: 'आरोग्य मोजमापे (Vitals)',
      redFlagsSection: 'धोक्याची लक्षणे (Red Flags)',
      riskLevel: 'जोखीम पातळी',
      recommendation: 'शिफारस केलेला वैद्यकीय मार्ग',
      ambulanceBtn: '🚨 रुग्णवाहिका बोलवा (१०८)',
      referPhcBtn: 'प्रा.आ. केंद्रात टेलिसल्ला बुक करा',
      routineBtn: 'नियमित फॉलो-अप नोंदवा',
      listenVoice: 'सूचना आवाजात ऐका',
      stopVoice: 'आवाज बंद करा',
      ambulanceDispatchedText: '१०८ रुग्णवाहिका MH-14-108 रवाना झाली आहे! जीपीएस सुरू आहे.',
    },
    
    // Teleconsultation
    teleconsult: {
      title: 'प्राथमिक आरोग्य केंद्र सहाय्यित टेलिसल्ला कक्ष',
      subtitle: 'रामपूर प्राथमिक आरोग्य केंद्रातून थेट जिल्हा रुग्णालय तज्ज्ञांशी संपर्क',
      specialistName: 'डॉ. अनन्य राव (स्त्रीरोग व हृदयरोग तज्ज्ञ)',
      facility: 'जिल्हा रुग्णालय, सोलापूर',
      vitalsHUD: 'लाइव्ह रुग्ण आरोग्य निर्देशक',
      rxSection: 'डिजिटल औषधोपचार व वैद्यकीय सूचना',
      saveRxBtn: 'डिजिटल प्रिस्क्रिप्शन जारी करा (ABDM मान्यताप्राप्त)',
      callActive: 'सुरक्षित व्हिडिओ सल्लामसलत सुरू आहे',
    },
    
    // Referral Tracker
    referral: {
      title: 'क्लोज्ड-लूप डिजिटल रेफरल ट्रॅकिंग',
      subtitle: 'शून्य गमावलेली प्रकरणे: गावातील आशा ते जिल्हा रुग्णालय आणि परत आशा पाठपुरावा',
      step1: '१. तपासणी व रेफरल',
      step2: '२. वाहतूक / रुग्णवाहिका',
      step3: '३. रुग्णालयात आगमन',
      step4: '४. तज्ज्ञ तपासणी व उपचार',
      step5: '५. आशा फॉलो-अप अलर्ट',
      advanceStage: 'पुढील टप्पा दाखवा',
      slipTitle: 'अधिकृत डिजिटल रेफरल पास',
      printSlip: 'रेफरल पावती प्रिंट करा',
      ashaNotificationSent: 'आशा कार्यकर्तीला ४८ तासांत गृहभेट देण्यासाठी संदेश पाठवण्यात आला आहे',
    },
    
    // Common
    common: {
      bp: 'रक्तदाब (BP)',
      pulse: 'नाडीचे ठोके',
      spo2: 'ऑक्सिजन (SpO2)',
      bloodSugar: 'रक्त शर्करा',
      pregnant: 'गर्भावस्थेत',
      gestation: 'गर्भधारणा आठवडे',
      status: 'स्थिती',
      abha: 'आभा ओळख क्रमांक (ABHA)',
      phone: 'फोन नंबर',
      village: 'गाव',
      hospitalDistance: 'जिल्हा रुग्णालयापासून अंतर',
    }
  }
};
