import React, { useState, useEffect } from 'react';
import { 
  AppData, 
  CompanyProfile, 
  ServiceItem, 
  PortfolioItem, 
  InquiryItem, 
  MediaItem, 
  GoogleSheetsConfig, 
  FirebaseConfig, 
  SyncLog, 
  SeoConfig 
} from './types';
import { 
  getAppData, 
  saveAppData, 
  resetToDefaults, 
  recordAnalyticsEvent, 
  syncWithGoogleSheetsWebhook 
} from './utils/storage';
import { Navbar } from './components/public/Navbar';
import { HeroSection } from './components/public/HeroSection';
import { AboutSection } from './components/public/AboutSection';
import { ServicesSection } from './components/public/ServicesSection';
import { PortfolioSection } from './components/public/PortfolioSection';
import { ContactSection } from './components/public/ContactSection';
import { Footer } from './components/public/Footer';
import { QuoteEstimatorModal } from './components/public/QuoteEstimatorModal';
import { LoginModal } from './components/public/LoginModal';
import { AdminLayout } from './components/admin/AdminLayout';

export default function App() {
  const [data, setData] = useState<AppData>(getAppData());
  const [view, setView] = useState<'public' | 'admin'>('public');
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isEstimatorOpen, setIsEstimatorOpen] = useState(false);
  const [inquiryPreFill, setInquiryPreFill] = useState<{ message: string; eventType: string }>({
    message: '',
    eventType: ''
  });

  // Track Admin authentication state in session
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState<boolean>(() => {
    return sessionStorage.getItem('bim_admin_auth') === 'true';
  });

  // Keep localStorage updated when state changes
  const updateData = (newData: AppData) => {
    setData(newData);
    saveAppData(newData);
  };

  // Initial page load analytics recording
  useEffect(() => {
    recordAnalyticsEvent('Kunjungan Baru ke Beranda Website', 'Hero & Overview');
  }, []);

  // Update HTML Document Title and Meta tags dynamically from SEO settings
  useEffect(() => {
    if (data.seoConfig.metaTitle) {
      document.title = data.seoConfig.metaTitle;
    }
  }, [data.seoConfig.metaTitle]);

  // Handle Login success
  const handleLoginSuccess = () => {
    setIsAdminLoggedIn(true);
    sessionStorage.setItem('bim_admin_auth', 'true');
    setView('admin');

    const updated = {
      ...data,
      adminLastLogin: new Date().toISOString().replace('T', ' ').substring(0, 16)
    };
    updateData(updated);
  };

  // Handle Logout
  const handleLogout = () => {
    setIsAdminLoggedIn(false);
    sessionStorage.removeItem('bim_admin_auth');
    setView('public');
  };

  // Handle public inquiry submission
  const handleSubmitInquiry = async (
    inquiryPayload: Omit<InquiryItem, 'id' | 'createdAt' | 'status' | 'adminNotes'>
  ) => {
    const newInquiry: InquiryItem = {
      ...inquiryPayload,
      id: 'inq-' + Date.now(),
      createdAt: new Date().toISOString().replace('T', ' ').substring(0, 16),
      status: 'baru',
      adminNotes: 'Penawaran baru masuk via website.'
    };

    const nextInquiries = [newInquiry, ...data.inquiries];

    // Trigger auto-sync to Google Sheets if configured
    let nextHistory = [...data.syncHistory];
    let syncedSheets = false;

    if (data.googleSheetsConfig.autoSyncOnInquiry && data.googleSheetsConfig.webhookUrl) {
      try {
        const syncRes = await syncWithGoogleSheetsWebhook(
          nextInquiries,
          data.googleSheetsConfig.webhookUrl,
          data.googleSheetsConfig.sheetName
        );
        if (syncRes.success) {
          syncedSheets = true;
          nextHistory = [syncRes.log, ...nextHistory];
        }
      } catch (e) {
        console.warn('Auto-sync notice:', e);
      }
    }

    // Update analytics
    const nextAnalytics = {
      ...data.analytics,
      totalPageViews: data.analytics.totalPageViews + 1,
      activityLogs: [
        {
          id: 'act-' + Date.now(),
          timestamp: new Date().toTimeString().slice(0, 8),
          action: `Penawaran baru dari ${inquiryPayload.name} (${inquiryPayload.eventType})`,
          device: window.innerWidth < 768 ? 'Mobile (Browser)' : 'Desktop (Browser)',
          location: inquiryPayload.location || 'Indonesia'
        },
        ...data.analytics.activityLogs.slice(0, 19)
      ]
    };

    updateData({
      ...data,
      inquiries: nextInquiries.map(i => i.id === newInquiry.id ? { ...i, syncedToGoogleSheets: syncedSheets } : i),
      syncHistory: nextHistory,
      analytics: nextAnalytics
    });
  };

  // Pre-fill inquiry from Estimator
  const handleApplyEstimate = (summary: string) => {
    setInquiryPreFill({
      message: summary,
      eventType: 'Konser Musik / Pertunjukan'
    });
    // Scroll smoothly to contact section
    const el = document.getElementById('contact');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  // Pre-fill inquiry from Service selection
  const handleSelectServiceForInquiry = (serviceTitle: string) => {
    setInquiryPreFill({
      message: `Saya tertarik dengan paket layanan: ${serviceTitle}. Mohon informasi ketersediaan jadwal dan technical rider resminya.`,
      eventType: 'Konser Musik / Pertunjukan'
    });
    const el = document.getElementById('contact');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  // CMS Handlers
  const handleSaveProfile = (profile: CompanyProfile) => {
    updateData({ ...data, profile });
  };

  const handleSaveServices = (services: ServiceItem[]) => {
    updateData({ ...data, services });
  };

  const handleSavePortfolio = (portfolio: PortfolioItem[]) => {
    updateData({ ...data, portfolio });
  };

  const handleUpdateInquiry = (updatedInquiry: InquiryItem) => {
    const updated = data.inquiries.map(i => i.id === updatedInquiry.id ? updatedInquiry : i);
    updateData({ ...data, inquiries: updated });
  };

  const handleDeleteInquiry = (id: string) => {
    updateData({ ...data, inquiries: data.inquiries.filter(i => i.id !== id) });
  };

  const handleAddMedia = (item: MediaItem) => {
    updateData({ ...data, mediaLibrary: [item, ...data.mediaLibrary] });
  };

  const handleDeleteMedia = (id: string) => {
    updateData({ ...data, mediaLibrary: data.mediaLibrary.filter(m => m.id !== id) });
  };

  const handleUpdateGoogleSheetsConfig = (cfg: GoogleSheetsConfig) => {
    updateData({ ...data, googleSheetsConfig: cfg });
  };

  const handleUpdateFirebaseConfig = (cfg: FirebaseConfig) => {
    updateData({ ...data, firebaseConfig: cfg });
  };

  const handleAddSyncLog = (log: SyncLog) => {
    updateData({ ...data, syncHistory: [log, ...data.syncHistory] });
  };

  const handleRestoreAppData = (restored: AppData) => {
    updateData(restored);
  };

  const handleUpdateSeoConfig = (seo: SeoConfig) => {
    updateData({ ...data, seoConfig: seo });
  };

  const handleUpdatePassword = (newPass: string) => {
    updateData({ ...data, adminPasswordHash: newPass });
  };

  const handleResetFactoryDefaults = () => {
    const reset = resetToDefaults();
    setData(reset);
  };

  const handleRefreshAnalytics = () => {
    const refreshed = getAppData();
    setData(refreshed);
  };

  const handleSimulateVisitor = () => {
    recordAnalyticsEvent('Pengunjung baru melihat rincian Panggung Rigging & Sound System', 'Layanan Produksi');
    const updated = getAppData();
    setData(updated);
  };

  // Render Admin View if user navigated to admin
  if (view === 'admin' && isAdminLoggedIn) {
    return (
      <AdminLayout
        appData={data}
        onLogout={handleLogout}
        onSwitchToPublic={() => setView('public')}
        onSaveProfile={handleSaveProfile}
        onSaveServices={handleSaveServices}
        onSavePortfolio={handleSavePortfolio}
        onUpdateInquiry={handleUpdateInquiry}
        onDeleteInquiry={handleDeleteInquiry}
        onAddMedia={handleAddMedia}
        onDeleteMedia={handleDeleteMedia}
        onUpdateGoogleSheetsConfig={handleUpdateGoogleSheetsConfig}
        onUpdateFirebaseConfig={handleUpdateFirebaseConfig}
        onAddSyncLog={handleAddSyncLog}
        onRestoreAppData={handleRestoreAppData}
        onUpdateSeoConfig={handleUpdateSeoConfig}
        onUpdatePassword={handleUpdatePassword}
        onResetFactoryDefaults={handleResetFactoryDefaults}
        onRefreshAnalytics={handleRefreshAnalytics}
        onSimulateVisitor={handleSimulateVisitor}
      />
    );
  }

  // Render Public Website
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-amber-500 selection:text-slate-950">
      
      {/* Public Navbar */}
      <Navbar
        profile={data.profile}
        onOpenLogin={() => setIsLoginModalOpen(true)}
        onOpenEstimator={() => setIsEstimatorOpen(true)}
        isAdminLoggedIn={isAdminLoggedIn}
        onGoToAdmin={() => setView('admin')}
      />

      {/* Hero Section */}
      <main className="flex-1">
        <HeroSection
          profile={data.profile}
          onOpenEstimator={() => setIsEstimatorOpen(true)}
        />

        {/* About Section */}
        <AboutSection profile={data.profile} />

        {/* Services Section */}
        <ServicesSection
          services={data.services}
          onSelectServiceForInquiry={handleSelectServiceForInquiry}
        />

        {/* Portfolio Section */}
        <PortfolioSection portfolio={data.portfolio} />

        {/* Contact & Inquiries Form */}
        <ContactSection
          profile={data.profile}
          initialMessage={inquiryPreFill.message}
          initialEventType={inquiryPreFill.eventType}
          onSubmitInquiry={handleSubmitInquiry}
        />
      </main>

      {/* Footer */}
      <Footer
        profile={data.profile}
        onOpenLogin={() => setIsLoginModalOpen(true)}
        isAdminLoggedIn={isAdminLoggedIn}
        onGoToAdmin={() => setView('admin')}
      />

      {/* Interactive Budget & Equipment Estimator Modal */}
      <QuoteEstimatorModal
        isOpen={isEstimatorOpen}
        onClose={() => setIsEstimatorOpen(false)}
        onApplyEstimate={handleApplyEstimate}
        phone={data.profile.phone}
      />

      {/* Secure Administrator Login Modal (Zero Credential Hint) */}
      <LoginModal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
        onLoginSuccess={handleLoginSuccess}
        correctPasswordHash={data.adminPasswordHash}
      />

    </div>
  );
}
