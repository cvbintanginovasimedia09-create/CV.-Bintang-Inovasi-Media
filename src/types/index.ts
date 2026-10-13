export interface CompanyProfile {
  companyName: string;
  tagline: string;
  heroHeadline: string;
  heroSubtitle: string;
  aboutDescription: string;
  vision: string;
  mission: string;
  phone: string;
  email: string;
  address: string;
  city: string;
  province: string;
  postalCode: string;
  operatingHours: string;
  socialMedia: {
    instagram: string;
    youtube: string;
    tiktok: string;
    facebook: string;
  };
  stats: {
    yearsExperience: number;
    completedEvents: number;
    clientSatisfactionRate: number;
    totalGensetPowerKva: number;
  };
}

export interface ServiceItem {
  id: string;
  title: string;
  icon: string;
  category: 'Stage & Rigging' | 'Sound System' | 'Lighting & FX' | 'LED & Multimedia' | 'Genset & Power' | 'Manajemen Konser';
  shortDesc: string;
  fullDesc: string;
  features: string[];
  specs: string;
  estimatedPrice: string;
  featured: boolean;
  image?: string;
}

export interface PortfolioItem {
  id: string;
  title: string;
  category: 'Konser Musik' | 'Corporate Gathering' | 'Festival Budaya' | 'Pameran & Expo' | 'Pernikahan Akbar' | 'Pemerintahan';
  image: string;
  date: string;
  client: string;
  location: string;
  audienceSize: string;
  desc: string;
  highlights: string[];
  featured: boolean;
}

export interface InquiryItem {
  id: string;
  createdAt: string;
  name: string;
  phone: string;
  email?: string;
  eventType: string;
  eventDate: string;
  location: string;
  budgetRange: string;
  message: string;
  status: 'baru' | 'dihubungi' | 'deal' | 'selesai';
  adminNotes: string;
  syncedToGoogleSheets?: boolean;
  syncedToFirebase?: boolean;
}

export interface MediaItem {
  id: string;
  name: string;
  url: string; // Data URL Base64 or external URL
  sizeKb: number;
  uploadedAt: string;
  type: 'image';
  source: 'device' | 'url';
}

export interface WebAnalytics {
  totalPageViews: number;
  uniqueVisitors: number;
  inquiriesConversionRate: number;
  avgSessionSeconds: number;
  bounceRate: number;
  currentActiveVisitors: number;
  trafficHistory: {
    date: string;
    pageViews: number;
    visitors: number;
    inquiries: number;
  }[];
  deviceBreakdown: {
    mobile: number;
    desktop: number;
    tablet: number;
  };
  referrerSources: {
    source: string;
    count: number;
    percentage: number;
  }[];
  sectionVisits: {
    sectionName: string;
    count: number;
  }[];
  activityLogs: {
    id: string;
    timestamp: string;
    action: string;
    device: string;
    location: string;
  }[];
}

export interface GoogleSheetsConfig {
  webhookUrl: string;
  sheetName: string;
  autoSyncOnInquiry: boolean;
  lastSyncTime: string | null;
  status: 'connected' | 'idle' | 'error';
  errorMessage?: string;
}

export interface FirebaseConfig {
  projectId: string;
  apiKey: string;
  authDomain: string;
  firestoreCollection: string;
  autoSync: boolean;
  lastSyncTime: string | null;
  status: 'connected' | 'idle' | 'error';
  lastBackupRecordCount: number;
}

export interface SyncLog {
  id: string;
  platform: 'Google Sheets' | 'Firebase Firestore';
  timestamp: string;
  status: 'success' | 'failed';
  recordCount: number;
  message: string;
}

export interface SeoConfig {
  metaTitle: string;
  metaDescription: string;
  targetKeywords: string[];
  canonicalUrl: string;
  ogImageUrl: string;
  gscVerificationCode: string;
  ga4MeasurementId: string;
  robotsTxtContent: string;
  sitemapXmlContent: string;
  seoScore: number;
  schemaType: 'LocalBusiness' | 'ProfessionalService' | 'EventVenue';
}

export interface AppData {
  profile: CompanyProfile;
  services: ServiceItem[];
  portfolio: PortfolioItem[];
  inquiries: InquiryItem[];
  mediaLibrary: MediaItem[];
  analytics: WebAnalytics;
  googleSheetsConfig: GoogleSheetsConfig;
  firebaseConfig: FirebaseConfig;
  syncHistory: SyncLog[];
  seoConfig: SeoConfig;
  adminPasswordHash: string; // default hashed or stored securely: #HAVIN9719*
  adminLastLogin: string | null;
}
