export type Language = "en" | "hi" | "kn";

export interface Translations {
  // Header
  goodMorning: string;
  goodAfternoon: string;
  goodEvening: string;
  menu: string;
  menuDescription: string;
  healthUser: string;
  userEmail: string;
  
  // Navigation
  home: string;
  myCertificates: string;
  notifications: string;
  settings: string;
  logout: string;
  helpSupport: string;
  
  // Login Page
  healthIdManagement: string;
  signInToAccess: string;
  demoCredentials: string;
  username: string;
  password: string;
  enterUsername: string;
  enterPassword: string;
  rememberMe: string;
  forgotPassword: string;
  signIn: string;
  signingIn: string;
  orContinueWith: string;
  google: string;
  apple: string;
  dontHaveAccount: string;
  signUp: string;
  
  // Home Page
  welcomeToPortal: string;
  manageHealthDocuments: string;
  viewAllCertificates: string;
  checkRecentUpdates: string;
  healthRecords: string;
  accessMedicalHistory: string;
  healthTracking: string;
  monitorVitalSigns: string;
  recentActivity: string;
  latestHealthUpdates: string;
  covid19Certificate: string;
  addedWeeksAgo: string;
  annualCheckup: string;
  addedMonthAgo: string;
  valid: string;
  
  // Certificates Page
  yourHealthDocuments: string;
  manageCertificatesAndIds: string;
  noCertificatesFound: string;
  bloodTestResults: string;
  dentalHealthCertificate: string;
  eyeExaminationReport: string;
  mentalHealthAssessment: string;
  expired: string;
  pending: string;
  
  // Notifications Page
  stayUpdated: string;
  newLabel: string;
  certificateVerified: string;
  certificateVerifiedMsg: string;
  certificateExpiring: string;
  certificateExpiringMsg: string;
  newHealthGuidelines: string;
  newHealthGuidelinesMsg: string;
  documentUploaded: string;
  documentUploadedMsg: string;
  systemMaintenance: string;
  systemMaintenanceMsg: string;
  hoursAgo: string;
  dayAgo: string;
  daysAgo: string;
  noNotifications: string;
  
  // Settings Page
  manageAccount: string;
  profileInformation: string;
  updatePersonalInfo: string;
  fullName: string;
  email: string;
  phoneNumber: string;
  saveChanges: string;
  notificationPreferences: string;
  chooseNotifications: string;
  emailNotifications: string;
  receiveEmailUpdates: string;
  pushNotifications: string;
  receivePushNotifications: string;
  certificateExpiryAlerts: string;
  notifyBeforeExpiry: string;
  privacySecurity: string;
  manageSecuritySettings: string;
  twoFactorAuth: string;
  extraLayerSecurity: string;
  enable: string;
  changePassword: string;
  updatePasswordRegularly: string;
  change: string;
  appearance: string;
  customizeAppLooks: string;
  darkMode: string;
  darkThemeActive: string;
  switchToDarkTheme: string;
  language: string;
  selectLanguage: string;
  profilePicture: string;
  uploadPhoto: string;
  removePhoto: string;
  profilePictureHint: string;
  
  // Toast Messages
  loginSuccessful: string;
  invalidCredentials: string;
  fillAllFields: string;
  profileUpdated: string;
  loggedOut: string;
  darkModeEnabled: string;
  lightModeEnabled: string;
  languageChanged: string;
  twoFactorComingSoon: string;
  passwordChangeComingSoon: string;
  helpCenterComingSoon: string;
  googleLoginComingSoon: string;
  appleLoginComingSoon: string;
  registrationComingSoon: string;
  profilePictureUpdated: string;
  profilePictureRemoved: string;
  imageTooLarge: string;
  notificationDismissed: string;
}

export const translations: Record<Language, Translations> = {
  en: {
    // Header
    goodMorning: "Good Morning",
    goodAfternoon: "Good Afternoon",
    goodEvening: "Good Evening",
    menu: "Menu",
    menuDescription: "Navigate through your health management app",
    healthUser: "Health User",
    userEmail: "user@healthid.com",
    
    // Navigation
    home: "Home",
    myCertificates: "My Certificates",
    notifications: "Notifications",
    settings: "Settings",
    logout: "Log Out",
    helpSupport: "Help & Support",
    
    // Login Page
    healthIdManagement: "Health ID Management",
    signInToAccess: "Sign in to access your health certificates and records",
    demoCredentials: "Demo credentials: username:",
    username: "Username",
    password: "Password",
    enterUsername: "Enter username",
    enterPassword: "Enter your password",
    rememberMe: "Remember me",
    forgotPassword: "Forgot password?",
    signIn: "Sign In",
    signingIn: "Signing in...",
    orContinueWith: "Or continue with",
    google: "Google",
    apple: "Apple",
    dontHaveAccount: "Don't have an account?",
    signUp: "Sign up",
    
    // Home Page
    welcomeToPortal: "Welcome to Your Health Portal",
    manageHealthDocuments: "Manage your health documents and records in one place",
    viewAllCertificates: "View all health certificates",
    checkRecentUpdates: "Check recent updates",
    healthRecords: "Health Records",
    accessMedicalHistory: "Access medical history",
    healthTracking: "Health Tracking",
    monitorVitalSigns: "Monitor vital signs",
    recentActivity: "Recent Activity",
    latestHealthUpdates: "Your latest health updates",
    covid19Certificate: "COVID-19 Vaccination Certificate",
    addedWeeksAgo: "Added 2 weeks ago",
    annualCheckup: "Annual Health Checkup Report",
    addedMonthAgo: "Added 1 month ago",
    valid: "Valid",
    
    // Certificates Page
    yourHealthDocuments: "Your Health Documents",
    manageCertificatesAndIds: "Manage and view your health certificates and IDs",
    noCertificatesFound: "No health certificates found",
    bloodTestResults: "Blood Test Results",
    dentalHealthCertificate: "Dental Health Certificate",
    eyeExaminationReport: "Eye Examination Report",
    mentalHealthAssessment: "Mental Health Assessment",
    expired: "Expired",
    pending: "Pending",
    
    // Notifications Page
    stayUpdated: "Stay updated with your health records",
    newLabel: "New",
    certificateVerified: "Certificate Verified",
    certificateVerifiedMsg: "Your COVID-19 Vaccination Certificate has been verified successfully.",
    certificateExpiring: "Certificate Expiring Soon",
    certificateExpiringMsg: "Your Blood Test Results certificate will expire in 7 days. Please renew.",
    newHealthGuidelines: "New Health Guidelines",
    newHealthGuidelinesMsg: "Updated health and safety guidelines are now available for review.",
    documentUploaded: "Document Uploaded",
    documentUploadedMsg: "Your Annual Health Checkup Report has been uploaded successfully.",
    systemMaintenance: "System Maintenance",
    systemMaintenanceMsg: "Scheduled maintenance on Sunday, 2 AM - 4 AM EST.",
    hoursAgo: "hours ago",
    dayAgo: "day ago",
    daysAgo: "days ago",
    noNotifications: "No notifications yet",
    
    // Settings Page
    manageAccount: "Manage your account and preferences",
    profileInformation: "Profile Information",
    updatePersonalInfo: "Update your personal information",
    fullName: "Full Name",
    email: "Email",
    phoneNumber: "Phone Number",
    saveChanges: "Save Changes",
    notificationPreferences: "Notification Preferences",
    chooseNotifications: "Choose how you want to be notified",
    emailNotifications: "Email Notifications",
    receiveEmailUpdates: "Receive updates via email",
    pushNotifications: "Push Notifications",
    receivePushNotifications: "Receive push notifications",
    certificateExpiryAlerts: "Certificate Expiry Alerts",
    notifyBeforeExpiry: "Get notified before certificates expire",
    privacySecurity: "Privacy & Security",
    manageSecuritySettings: "Manage your security settings",
    twoFactorAuth: "Two-Factor Authentication",
    extraLayerSecurity: "Add an extra layer of security",
    enable: "Enable",
    changePassword: "Change Password",
    updatePasswordRegularly: "Update your password regularly",
    change: "Change",
    appearance: "Appearance",
    customizeAppLooks: "Customize how the app looks",
    darkMode: "Dark Mode",
    darkThemeActive: "Dark theme is active",
    switchToDarkTheme: "Switch to dark theme",
    language: "Language",
    selectLanguage: "Select your preferred language",
    
    // Toast Messages
    loginSuccessful: "Login successful!",
    invalidCredentials: "Invalid credentials. Please use username: 'hi' and password: 'passHere'",
    fillAllFields: "Please fill in all fields",
    profileUpdated: "Profile updated successfully",
    loggedOut: "Logged out successfully",
    darkModeEnabled: "Dark mode enabled",
    lightModeEnabled: "Light mode enabled",
    languageChanged: "Language changed successfully",
    twoFactorComingSoon: "Two-factor authentication setup coming soon",
    passwordChangeComingSoon: "Password change coming soon",
    helpCenterComingSoon: "Help center coming soon",
    googleLoginComingSoon: "Google login coming soon",
    appleLoginComingSoon: "Apple login coming soon",
    registrationComingSoon: "Registration coming soon",
  },
  hi: {
    // Header
    goodMorning: "सुप्रभात",
    goodAfternoon: "नमस्ते",
    goodEvening: "शुभ संध्या",
    menu: "मेनू",
    menuDescription: "अपने स्वास्थ्य प्रबंधन ऐप में नेविगेट करें",
    healthUser: "स्वास्थ्य उपयोगकर्ता",
    userEmail: "user@healthid.com",
    
    // Navigation
    home: "होम",
    myCertificates: "मेरे प्रमाणपत्र",
    notifications: "सूचनाएं",
    settings: "सेटिंग्स",
    logout: "लॉग आउट",
    helpSupport: "सहायता और समर्थन",
    
    // Login Page
    healthIdManagement: "स्वास्थ्य आईडी प्रबंधन",
    signInToAccess: "अपने स्वास्थ्य प्रमाणपत्र और रिकॉर्ड तक पहुंचने के लिए साइन इन करें",
    demoCredentials: "डेमो क्रेडेंशियल्स: उपयोगकर्ता नाम:",
    username: "उपयोगकर्ता नाम",
    password: "पासवर्ड",
    enterUsername: "उपयोगकर्ता नाम दर्ज करें",
    enterPassword: "अपना पासवर्ड दर्ज करें",
    rememberMe: "मुझे याद रखें",
    forgotPassword: "पासवर्ड भूल गए?",
    signIn: "साइन इन करें",
    signingIn: "साइन इन हो रहा है...",
    orContinueWith: "या इसके साथ जारी रखें",
    google: "गूगल",
    apple: "एप्पल",
    dontHaveAccount: "खाता नहीं है?",
    signUp: "साइन अप करें",
    
    // Home Page
    welcomeToPortal: "आपके स्वास्थ्य पोर्टल में आपका स्वागत है",
    manageHealthDocuments: "अपने स्वास्थ्य दस्तावेज़ और रिकॉर्ड एक जगह पर प्रबंधित करें",
    viewAllCertificates: "सभी स्वास्थ्य प्रमाणपत्र देखें",
    checkRecentUpdates: "हाल के अपडेट देखें",
    healthRecords: "स्वास्थ्य रिकॉर्ड",
    accessMedicalHistory: "चिकित्सा इतिहास तक पहुंचें",
    healthTracking: "स्वास्थ्य ट्रैकिंग",
    monitorVitalSigns: "महत्वपूर्ण संकेतों की निगरानी करें",
    recentActivity: "हाल की गतिविधि",
    latestHealthUpdates: "आपके नवीनतम स्वास्थ्य अपडेट",
    covid19Certificate: "COVID-19 टीकाकरण प्रमाणपत्र",
    addedWeeksAgo: "2 सप्ताह पहले जोड़ा गया",
    annualCheckup: "वार्षिक स्वास्थ्य जांच रिपोर्ट",
    addedMonthAgo: "1 महीने पहले जोड़ा गया",
    valid: "वैध",
    
    // Certificates Page
    yourHealthDocuments: "आपके स्वास्थ्य दस्तावेज़",
    manageCertificatesAndIds: "अपने स्वास्थ्य प्रमाणपत्र और आईडी प्रबंधित और देखें",
    noCertificatesFound: "कोई स्वास्थ्य प्रमाणपत्र नहीं मिला",
    bloodTestResults: "रक्त परीक्षण परिणाम",
    dentalHealthCertificate: "दंत स्वास्थ्य प्रमाणपत्र",
    eyeExaminationReport: "नेत्र परीक्षण रिपोर्ट",
    mentalHealthAssessment: "मानसिक स्वास्थ्य मूल्यांकन",
    expired: "समाप्त",
    pending: "लंबित",
    
    // Notifications Page
    stayUpdated: "अपने स्वास्थ्य रिकॉर्ड के साथ अपडेट रहें",
    newLabel: "नया",
    certificateVerified: "प्रमाणपत्र सत्यापित",
    certificateVerifiedMsg: "आपका COVID-19 टीकाकरण प्रमाणपत्र सफलतापूर्वक सत्यापित कर दिया गया है।",
    certificateExpiring: "प्रमाणपत्र जल्द समाप्त हो रहा है",
    certificateExpiringMsg: "आपका रक्त परीक्षण परिणाम प्रमाणपत्र 7 दिनों में समाप्त हो जाएगा। कृपया नवीनीकरण करें।",
    newHealthGuidelines: "नए स्वास्थ्य दिशानिर्देश",
    newHealthGuidelinesMsg: "अद्यतन स्वास्थ्य और सुरक्षा दिशानिर्देश अब समीक्षा के लिए उपलब्ध हैं।",
    documentUploaded: "दस्तावेज़ अपलोड किया गया",
    documentUploadedMsg: "आपकी वार्षिक स्वास्थ्य जांच रिपोर्ट सफलतापूर्वक अपलोड कर दी गई है।",
    systemMaintenance: "सिस्टम रखरखाव",
    systemMaintenanceMsg: "रविवार, सुबह 2 बजे - 4 बजे EST पर निर्धारित रखरखाव।",
    hoursAgo: "घंटे पहले",
    dayAgo: "दिन पहले",
    daysAgo: "दिन पहले",
    noNotifications: "अभी तक कोई सूचना नहीं",
    
    // Settings Page
    manageAccount: "अपना खाता और प्राथमिकताएं प्रबंधित करें",
    profileInformation: "प्रोफ़ाइल जानकारी",
    updatePersonalInfo: "अपनी व्यक्तिगत जानकारी अपडेट करें",
    fullName: "पूरा नाम",
    email: "ईमेल",
    phoneNumber: "फ़ोन नंबर",
    saveChanges: "परिवर्तन सहेजें",
    notificationPreferences: "सूचना प्राथमिकताएं",
    chooseNotifications: "चुनें कि आपको कैसे सूचित किया जाए",
    emailNotifications: "ईमेल सूचनाएं",
    receiveEmailUpdates: "ईमेल के माध्यम से अपडेट प्राप्त करें",
    pushNotifications: "पुश सूचनाएं",
    receivePushNotifications: "पुश सूचनाएं प्राप्त करें",
    certificateExpiryAlerts: "प्रमाणपत्र समाप्ति अलर्ट",
    notifyBeforeExpiry: "प्रमाणपत्र समाप्त होने से पहले सूचित करें",
    privacySecurity: "गोपनीयता और सुरक्षा",
    manageSecuritySettings: "अपनी सुरक्षा सेटिंग्स प्रबंधित करें",
    twoFactorAuth: "दो-कारक प्रमाणीकरण",
    extraLayerSecurity: "सुरक्षा की एक अतिरिक्त परत जोड़ें",
    enable: "सक्षम करें",
    changePassword: "पासवर्ड बदलें",
    updatePasswordRegularly: "नियमित रूप से अपना पासवर्ड अपडेट करें",
    change: "बदलें",
    appearance: "दिखावट",
    customizeAppLooks: "ऐप कैसा दिखता है उसे अनुकूलित करें",
    darkMode: "डार्क मोड",
    darkThemeActive: "डार्क थीम सक्रिय है",
    switchToDarkTheme: "डार्क थीम पर स्विच करें",
    language: "भाषा",
    selectLanguage: "अपनी पसंदीदा भाषा चुनें",
    
    // Toast Messages
    loginSuccessful: "लॉगिन सफल!",
    invalidCredentials: "अमान्य क्रेडेंशियल्स। कृपया उपयोगकर्ता नाम: 'hi' और पासवर्ड: 'passHere' का उपयोग करें",
    fillAllFields: "कृपया सभी फ़ील्ड भरें",
    profileUpdated: "प्रोफ़ाइल सफलतापूर्वक अपडेट की गई",
    loggedOut: "सफलतापूर्वक लॉग आउट किया गया",
    darkModeEnabled: "डार्क मोड सक्षम किया गया",
    lightModeEnabled: "लाइट मोड सक्षम किया गया",
    languageChanged: "भाषा सफलतापूर्वक बदल दी गई",
    twoFactorComingSoon: "दो-कारक प्रमाणीकरण सेटअप जल्द आ रहा है",
    passwordChangeComingSoon: "पासवर्ड परिवर्तन जल्द आ रहा है",
    helpCenterComingSoon: "सहायता केंद्र जल्द आ रहा है",
    googleLoginComingSoon: "गूगल लॉगिन जल्द आ रहा है",
    appleLoginComingSoon: "एप्पल लॉगिन जल्द आ रहा है",
    registrationComingSoon: "पंजीकरण जल्द आ रहा है",
  },
  kn: {
    // Header
    goodMorning: "ಶುಭೋದಯ",
    goodAfternoon: "ನಮಸ್ಕಾರ",
    goodEvening: "ಶುಭ ಸಂಜೆ",
    menu: "ಮೆನು",
    menuDescription: "ನಿಮ್ಮ ಆರೋಗ್ಯ ನಿರ್ವಹಣೆ ಅಪ್ಲಿಕೇಶನ್ ಮೂಲಕ ನ್ಯಾವಿಗೇಟ್ ಮಾಡಿ",
    healthUser: "ಆರೋಗ್ಯ ಬಳಕೆದಾರ",
    userEmail: "user@healthid.com",
    
    // Navigation
    home: "ಮುಖಪುಟ",
    myCertificates: "ನನ್ನ ಪ್ರಮಾಣಪತ್ರಗಳು",
    notifications: "ಅಧಿಸೂಚನೆಗಳು",
    settings: "ಸೆಟ್ಟಿಂಗ್‌ಗಳು",
    logout: "ಲಾಗ್ ಔಟ್",
    helpSupport: "ಸಹಾಯ ಮತ್ತು ಬೆಂಬಲ",
    
    // Login Page
    healthIdManagement: "ಆರೋಗ್ಯ ಐಡಿ ನಿರ್ವಹಣೆ",
    signInToAccess: "ನಿಮ್ಮ ಆರೋಗ್ಯ ಪ್ರಮಾಣಪತ್ರಗಳು ಮತ್ತು ದಾಖಲೆಗಳನ್ನು ಪ್ರವೇಶಿಸಲು ಸೈನ್ ಇನ್ ಮಾಡಿ",
    demoCredentials: "ಡೆಮೊ ರುಜುವಾತುಗಳು: ಬಳಕೆದಾರ ಹೆಸರು:",
    username: "ಬಳಕೆದಾರ ಹೆಸರು",
    password: "ಪಾಸ್‌ವರ್ಡ್",
    enterUsername: "ಬಳಕೆದಾರ ಹೆಸರು ನಮೂದಿಸಿ",
    enterPassword: "ನಿಮ್ಮ ಪಾಸ್‌ವರ್ಡ್ ನಮೂದಿಸಿ",
    rememberMe: "ನನ್ನನ್ನು ನೆನಪಿಡಿ",
    forgotPassword: "ಪಾಸ್‌ವರ್ಡ್ ಮರೆತಿರುವಿರಾ?",
    signIn: "ಸೈನ್ ಇನ್ ಮಾಡಿ",
    signingIn: "ಸೈನ್ ಇನ್ ಆಗುತ್ತಿದೆ...",
    orContinueWith: "ಅಥವಾ ಇದರೊಂದಿಗೆ ಮುಂದುವರಿಸಿ",
    google: "ಗೂಗಲ್",
    apple: "ಆಪಲ್",
    dontHaveAccount: "ಖಾತೆ ಇಲ್ಲವೇ?",
    signUp: "ಸೈನ್ ಅಪ್ ಮಾಡಿ",
    
    // Home Page
    welcomeToPortal: "ನಿಮ್ಮ ಆರೋಗ್ಯ ಪೋರ್ಟಲ್‌ಗೆ ಸ್ವಾಗತ",
    manageHealthDocuments: "ನಿಮ್ಮ ಆರೋಗ್ಯ ದಸ್ತಾವೇಜುಗಳು ಮತ್ತು ದಾಖಲೆಗಳನ್ನು ಒಂದೇ ಸ್ಥಳದಲ್ಲಿ ನಿರ್ವಹಿಸಿ",
    viewAllCertificates: "ಎಲ್ಲಾ ಆರೋಗ್ಯ ಪ್ರಮಾಣಪತ್ರಗಳನ್ನು ವೀಕ್ಷಿಸಿ",
    checkRecentUpdates: "ಇತ್ತೀಚಿನ ನವೀಕರಣಗಳನ್ನು ಪರಿಶೀಲಿಸಿ",
    healthRecords: "ಆರೋಗ್ಯ ದಾಖಲೆಗಳು",
    accessMedicalHistory: "ವೈದ್ಯಕೀಯ ಇತಿಹಾಸವನ್ನು ಪ್ರವೇಶಿಸಿ",
    healthTracking: "ಆರೋಗ್ಯ ಟ್ರ್ಯಾಕಿಂಗ್",
    monitorVitalSigns: "ಪ್ರಮುಖ ಚಿಹ್ನೆಗಳನ್ನು ಮೇಲ್ವಿಚಾರಣೆ ಮಾಡಿ",
    recentActivity: "ಇತ್ತೀಚಿನ ಚಟುವಟಿಕೆ",
    latestHealthUpdates: "ನಿಮ್ಮ ಇತ್ತೀಚಿನ ಆರೋಗ್ಯ ನವೀಕರಣಗಳು",
    covid19Certificate: "COVID-19 ಲಸಿಕೆ ಪ್ರಮಾಣಪತ್ರ",
    addedWeeksAgo: "2 ವಾರಗಳ ಹಿಂದೆ ಸೇರಿಸಲಾಗಿದೆ",
    annualCheckup: "ವಾರ್ಷಿಕ ಆರೋಗ್ಯ ಪರಿಶೀಲನೆ ವರದಿ",
    addedMonthAgo: "1 ತಿಂಗಳ ಹಿಂದೆ ಸೇರಿಸಲಾಗಿದೆ",
    valid: "ಮಾನ್ಯ",
    
    // Certificates Page
    yourHealthDocuments: "ನಿಮ್ಮ ಆರೋಗ್ಯ ದಸ್ತಾವೇಜುಗಳು",
    manageCertificatesAndIds: "ನಿಮ್ಮ ಆರೋಗ್ಯ ಪ್ರಮಾಣಪತ್ರಗಳು ಮತ್ತು ಐಡಿಗಳನ್ನು ನಿರ್ವಹಿಸಿ ಮತ್ತು ವೀಕ್ಷಿಸಿ",
    noCertificatesFound: "ಯಾವುದೇ ಆರೋಗ್ಯ ಪ್ರಮಾಣಪತ್ರಗಳು ಕಂಡುಬಂದಿಲ್ಲ",
    bloodTestResults: "ರಕ್ತ ಪರೀಕ್ಷೆ ಫಲಿತಾಂಶಗಳು",
    dentalHealthCertificate: "ದಂತ ಆರೋಗ್ಯ ಪ್ರಮಾಣಪತ್ರ",
    eyeExaminationReport: "ಕಣ್ಣು ಪರೀಕ್ಷೆ ವರದಿ",
    mentalHealthAssessment: "ಮಾನಸಿಕ ಆರೋಗ್ಯ ಮೌಲ್ಯಮಾಪನ",
    expired: "ಅವಧಿ ಮುಗಿದಿದೆ",
    pending: "ಬಾಕಿ ಉಳಿದಿದೆ",
    
    // Notifications Page
    stayUpdated: "ನಿಮ್ಮ ಆರೋಗ್ಯ ದಾಖಲೆಗಳೊಂದಿಗೆ ನವೀಕೃತವಾಗಿರಿ",
    newLabel: "ಹೊಸದು",
    certificateVerified: "ಪ್ರಮಾಣಪತ್ರ ಪರಿಶೀಲಿಸಲಾಗಿದೆ",
    certificateVerifiedMsg: "ನಿಮ್ಮ COVID-19 ಲಸಿಕೆ ಪ್ರಮಾಣಪತ್ರವನ್ನು ಯಶಸ್ವಿಯಾಗಿ ಪರಿಶೀಲಿಸಲಾಗಿದೆ.",
    certificateExpiring: "ಪ್ರಮಾಣಪತ್ರ ಶೀಘ್ರದಲ್ಲೇ ಅವಧಿ ಮುಗಿಯುತ್ತಿದೆ",
    certificateExpiringMsg: "ನಿಮ್ಮ ರಕ್ತ ಪರೀಕ್ಷೆ ಫಲಿತಾಂಶಗಳ ಪ್ರಮಾಣಪತ್ರವು 7 ದಿನಗಳಲ್ಲಿ ಅವಧಿ ಮುಗಿಯುತ್ತದೆ. ದಯವಿಟ್ಟು ನವೀಕರಿಸಿ.",
    newHealthGuidelines: "ಹೊಸ ಆರೋಗ್ಯ ಮಾರ್ಗಸೂಚಿಗಳು",
    newHealthGuidelinesMsg: "ನವೀಕೃತ ಆರೋಗ್ಯ ಮತ್ತು ಸುರಕ್ಷತಾ ಮಾರ್ಗಸೂಚಿಗಳು ಈಗ ಪರಿಶೀಲನೆಗೆ ಲಭ್ಯವಿದೆ.",
    documentUploaded: "ದಸ್ತಾವೇಜು ಅಪ್‌ಲೋಡ್ ಮಾಡಲಾಗಿದೆ",
    documentUploadedMsg: "ನಿಮ್ಮ ವಾರ್ಷಿಕ ಆರೋಗ್ಯ ಪರಿಶೀಲನೆ ವರದಿಯನ್ನು ಯಶಸ್ವಿಯಾಗಿ ಅಪ್‌ಲೋಡ್ ಮಾಡಲಾಗಿದೆ.",
    systemMaintenance: "ವ್ಯವಸ್ಥೆ ನಿರ್ವಹಣೆ",
    systemMaintenanceMsg: "ಭಾನುವಾರ, ಬೆಳಿಗ್ಗೆ 2 ಗಂಟೆ - 4 ಗಂಟೆ EST ಗೆ ನಿಗದಿತ ನಿರ್ವಹಣೆ.",
    hoursAgo: "ಗಂಟೆಗಳ ಹಿಂದೆ",
    dayAgo: "ದಿನ ಹಿಂದೆ",
    daysAgo: "ದಿನಗಳ ಹಿಂದೆ",
    noNotifications: "ಇನ್ನೂ ಅಧಿಸೂಚನೆಗಳಿಲ್ಲ",
    
    // Settings Page
    manageAccount: "ನಿಮ್ಮ ಖಾತೆ ಮತ್ತು ಆದ್ಯತೆಗಳನ್ನು ನಿರ್ವಹಿಸಿ",
    profileInformation: "ಪ್ರೊಫೈಲ್ ಮಾಹಿತಿ",
    updatePersonalInfo: "ನಿಮ್ಮ ವೈಯಕ್ತಿಕ ಮಾಹಿತಿಯನ್ನು ನವೀಕರಿಸಿ",
    fullName: "ಪೂರ್ಣ ಹೆಸರು",
    email: "ಇಮೇಲ್",
    phoneNumber: "ದೂರವಾಣಿ ಸಂಖ್ಯೆ",
    saveChanges: "ಬದಲಾವಣೆಗಳನ್ನು ಉಳಿಸಿ",
    notificationPreferences: "ಅಧಿಸೂಚನೆ ಆದ್ಯತೆಗಳು",
    chooseNotifications: "ನಿಮಗೆ ಹೇಗೆ ಸೂಚಿಸಬೇಕೆಂದು ಆಯ್ಕೆಮಾಡಿ",
    emailNotifications: "ಇಮೇಲ್ ಅಧಿಸೂಚನೆಗಳು",
    receiveEmailUpdates: "ಇಮೇಲ್ ಮೂಲಕ ನವೀಕರಣಗಳನ್ನು ಸ್ವೀಕರಿಸಿ",
    pushNotifications: "ಪುಶ್ ಅಧಿಸೂಚನೆಗಳು",
    receivePushNotifications: "ಪುಶ್ ಅಧಿಸೂಚನೆಗಳನ್ನು ಸ್ವೀಕರಿಸಿ",
    certificateExpiryAlerts: "ಪ್ರಮಾಣಪತ್ರ ಅವಧಿ ಮುಗಿಯುವ ಎಚ್ಚರಿಕೆಗಳು",
    notifyBeforeExpiry: "ಪ್ರಮಾಣಪತ್ರಗಳು ಅವಧಿ ಮುಗಿಯುವ ಮೊದಲು ಸೂಚಿಸಿ",
    privacySecurity: "ಗೌಪ್ಯತೆ ಮತ್ತು ಸುರಕ್ಷತೆ",
    manageSecuritySettings: "ನಿಮ್ಮ ಸುರಕ್ಷತೆ ಸೆಟ್ಟಿಂಗ್‌ಗಳನ್ನು ನಿರ್ವಹಿಸಿ",
    twoFactorAuth: "ಎರಡು-ಅಂಶ ದೃಢೀಕರಣ",
    extraLayerSecurity: "ಸುರಕ್ಷತೆಯ ಹೆಚ್ಚುವರಿ ಪದರವನ್ನು ಸೇರಿಸಿ",
    enable: "ಸಕ್ರಿಯಗೊಳಿಸಿ",
    changePassword: "ಪಾಸ್‌ವರ್ಡ್ ಬದಲಾಯಿಸಿ",
    updatePasswordRegularly: "ನಿಮ್ಮ ಪಾಸ್‌ವರ್ಡ್ ಅನ್ನು ನಿಯಮಿತವಾಗಿ ನವೀಕರಿಸಿ",
    change: "ಬದಲಾಯಿಸಿ",
    appearance: "ನೋಟ",
    customizeAppLooks: "ಅಪ್ಲಿಕೇಶನ್ ಹೇಗೆ ಕಾಣುತ್ತದೆ ಎಂಬುದನ್ನು ಕಸ್ಟಮೈಜ್ ಮಾಡಿ",
    darkMode: "ಡಾರ್ಕ್ ಮೋಡ್",
    darkThemeActive: "ಡಾರ್ಕ್ ಥೀಮ್ ಸಕ್ರಿಯವಾಗಿದೆ",
    switchToDarkTheme: "ಡಾರ್ಕ್ ಥೀಮ್‌ಗೆ ಬದಲಾಯಿಸಿ",
    language: "ಭಾಷೆ",
    selectLanguage: "ನಿಮ್ಮ ಆದ್ಯತೆಯ ಭಾಷೆಯನ್ನು ಆಯ್ಕೆಮಾಡಿ",
    
    // Toast Messages
    loginSuccessful: "ಲಾಗಿನ್ ಯಶಸ್ವಿಯಾಗಿದೆ!",
    invalidCredentials: "ಅಮಾನ್ಯ ರುಜುವಾತುಗಳು. ದಯವಿಟ್ಟು ಬಳಕೆದಾರ ಹೆಸರು: 'hi' ಮತ್ತು ಪಾಸ್‌ವರ್ಡ್: 'passHere' ಬಳಸಿ",
    fillAllFields: "ದಯವಿಟ್ಟು ಎಲ್ಲಾ ಕ್ಷೇತ್ರಗಳನ್ನು ಭರ್ತಿ ಮಾಡಿ",
    profileUpdated: "ಪ್ರೊಫೈಲ್ ಅನ್ನು ಯಶಸ್ವಿಯಾಗಿ ನವೀಕರಿಸಲಾಗಿದೆ",
    loggedOut: "ಯಶಸ್ವಿಯಾಗಿ ಲಾಗ್ ಔಟ್ ಮಾಡಲಾಗಿದೆ",
    darkModeEnabled: "ಡಾರ್ಕ್ ಮೋಡ್ ಸಕ್ರಿಯಗೊಳಿಸಲಾಗಿದೆ",
    lightModeEnabled: "ಲೈಟ್ ಮೋಡ್ ಸಕ್ರಿಯಗೊಳಿಸಲಾಗಿದೆ",
    languageChanged: "ಭಾಷೆಯನ್ನು ಯಶಸ್ವಿಯಾಗಿ ಬದಲಾಯಿಸಲಾಗಿದೆ",
    twoFactorComingSoon: "ಎರಡು-ಅಂಶ ದೃಢೀಕರಣ ಸೆಟಪ್ ಶೀಘ್ರದಲ್ಲೇ ಬರುತ್ತಿದೆ",
    passwordChangeComingSoon: "ಪಾಸ್‌ವರ್ಡ್ ಬದಲಾವಣೆ ಶೀಘ್ರದಲ್ಲೇ ಬರುತ್ತಿದೆ",
    helpCenterComingSoon: "ಸಹಾಯ ಕೇಂದ್ರ ಶೀಘ್ರದಲ್ಲೇ ಬರುತ್ತಿದೆ",
    googleLoginComingSoon: "ಗೂಗಲ್ ಲಾಗಿನ್ ಶೀಘ್ರದಲ್ಲೇ ಬರುತ್ತಿದೆ",
    appleLoginComingSoon: "ಆಪಲ್ ಲಾಗಿನ್ ಶೀಘ್ರದಲ್ಲೇ ಬರುತ್ತಿದೆ",
    registrationComingSoon: "ನೋಂದಣಿ ಶೀಘ್ರದಲ್ಲೇ ಬರುತ್ತಿದೆ",
  },
};

export const languageNames: Record<Language, string> = {
  en: "English",
  hi: "हिन्दी (Hindi)",
  kn: "ಕನ್ನಡ (Kannada)",
};
