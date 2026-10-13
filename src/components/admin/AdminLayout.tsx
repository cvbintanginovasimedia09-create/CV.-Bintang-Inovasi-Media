import React, { useState } from 'react';
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
} from '../../types';
import { 
  BarChart3, 
  Layers, 
  Inbox, 
  HardDrive, 
  Cloud, 
  Search, 
  ShieldCheck, 
  Globe, 
  LogOut, 
  Sparkles,
  Menu,
  X,
  ChevronLeft,
  ChevronRight,
  PanelLeftClose,
  PanelLeftOpen
} from 'lucide-react';
import { WebAnalyticsTab } from './WebAnalyticsTab';
import { ContentManagerTab } from './ContentManagerTab';
import { InquiriesTab } from './InquiriesTab';
import { MediaUploaderTab } from './MediaUploaderTab';
import { CloudSyncTab } from './CloudSyncTab';
import { GoogleSeoTab } from './GoogleSeoTab';
import { SecuritySettingsTab } from './SecuritySettingsTab';

interface AdminLayoutProps {
  appData: AppData;
  onLogout: () => void;
  onSwitchToPublic: () => void;
  onSaveProfile: (profile: CompanyProfile) => void;
  onSaveServices: (services: ServiceItem[]) => void;
  onSavePortfolio: (portfolio: PortfolioItem[]) => void;
  onUpdateInquiry: (inquiry: InquiryItem) => void;
  onDeleteInquiry: (id: string) => void;
  onAddMedia: (media: MediaItem) => void;
  onDeleteMedia: (id: string) => void;
  onUpdateGoogleSheetsConfig: (cfg: GoogleSheetsConfig) => void;
  onUpdateFirebaseConfig: (cfg: FirebaseConfig) => void;
  onAddSyncLog: (log: SyncLog) => void;
  onRestoreAppData: (data: AppData) => void;
  onUpdateSeoConfig: (seo: SeoConfig) => void;
  onUpdatePassword: (newPass: string) => void;
  onResetFactoryDefaults: () => void;
  onRefreshAnalytics: () => void;
  onSimulateVisitor: () => void;
}

export type AdminTab = 'analytics' | 'content' | 'inquiries' | 'media' | 'cloud_sync' | 'seo' | 'security';

export const AdminLayout: React.FC<AdminLayoutProps> = ({
  appData,
  onLogout,
  onSwitchToPublic,
  onSaveProfile,
  onSaveServices,
  onSavePortfolio,
  onUpdateInquiry,
  onDeleteInquiry,
  onAddMedia,
  onDeleteMedia,
  onUpdateGoogleSheetsConfig,
  onUpdateFirebaseConfig,
  onAddSyncLog,
  onRestoreAppData,
  onUpdateSeoConfig,
  onUpdatePassword,
  onResetFactoryDefaults,
  onRefreshAnalytics,
  onSimulateVisitor
}) => {
  const [activeTab, setActiveTab] = useState<AdminTab>('analytics');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  const newInquiriesCount = appData.inquiries.filter(i => i.status === 'baru').length;

  const navigationItems = [
    { id: 'analytics' as AdminTab, label: 'Analisis Web', icon: BarChart3, badge: null, desc: 'Traffic & Visitor Insights' },
    { id: 'content' as AdminTab, label: 'Manajemen Konten', icon: Layers, badge: null, desc: 'Profil, Layanan & Portofolio' },
    { id: 'inquiries' as AdminTab, label: 'Pesan & Penawaran', icon: Inbox, badge: newInquiriesCount > 0 ? newInquiriesCount : null, desc: 'Prospek Calon Klien' },
    { id: 'media' as AdminTab, label: 'Upload dari Device', icon: HardDrive, badge: null, desc: 'Pustaka Foto & Berkas' },
    { id: 'cloud_sync' as AdminTab, label: 'Sinkronisasi Cloud', icon: Cloud, badge: null, desc: 'Google Sheets & Firebase' },
    { id: 'seo' as AdminTab, label: 'Otomatisasi SEO', icon: Search, badge: '98', desc: 'Google Snippet & Schema' },
    { id: 'security' as AdminTab, label: 'Keamanan Admin', icon: ShieldCheck, badge: null, desc: 'Ganti Password & Akses' }
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
      
      {/* Top Navbar */}
      <header className="bg-slate-900 border-b border-slate-800 px-4 sm:px-6 py-3.5 flex items-center justify-between sticky top-0 z-30 shadow-md">
        <div className="flex items-center gap-3">
          {/* Mobile drawer toggle */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 rounded-xl bg-slate-800 text-slate-300 hover:text-white transition"
            title="Buka / Tutup Menu"
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>

          {/* Desktop sidebar collapse toggle from navbar */}
          <button
            onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
            className="hidden lg:flex p-2 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-amber-400 border border-slate-700/60 transition items-center gap-1.5"
            title={isSidebarCollapsed ? "Maximize Sidebar (Perbesar Menu)" : "Minimize Sidebar (Perkecil Menu)"}
          >
            {isSidebarCollapsed ? (
              <PanelLeftOpen className="w-4 h-4 text-amber-400" />
            ) : (
              <PanelLeftClose className="w-4 h-4" />
            )}
            <span className="text-[11px] font-semibold hidden xl:inline">
              {isSidebarCollapsed ? 'Maximize' : 'Minimize'}
            </span>
          </button>

          {/* Brand Logo & Title */}
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-amber-500 text-slate-950 font-black flex items-center justify-center shadow-lg shadow-amber-500/20">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <span className="text-base font-black tracking-wider text-amber-400 uppercase leading-none block">
                CMS CONTROL PANEL
              </span>
              <span className="text-[10px] text-slate-400 uppercase tracking-widest font-semibold mt-0.5 block truncate max-w-[200px] sm:max-w-none">
                {appData.profile.companyName}
              </span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2.5 sm:gap-3">
          <button
            onClick={onSwitchToPublic}
            className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white text-xs font-bold border border-slate-700 flex items-center gap-1.5 transition"
            title="Lihat Tampilan Website Pengunjung"
          >
            <Globe className="w-3.5 h-3.5 text-amber-400" />
            <span className="hidden sm:inline">Lihat Website</span>
          </button>

          <button
            onClick={onLogout}
            className="px-3.5 py-2 rounded-xl bg-red-500/10 hover:bg-red-500 text-red-400 hover:text-white text-xs font-bold border border-red-500/25 flex items-center gap-1.5 transition"
            title="Keluar dari Panel Admin"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Logout</span>
          </button>
        </div>
      </header>

      {/* Main Container */}
      <div className="flex-1 flex overflow-hidden">
        
        {/* Left Sidebar (Collapsible & Scrollable) */}
        <aside
          className={`fixed inset-y-0 left-0 z-40 bg-slate-900 border-r border-slate-800 transition-all duration-300 ease-in-out flex flex-col justify-between lg:static lg:h-[calc(100vh-61px)] ${
            isSidebarCollapsed ? 'lg:w-20' : 'lg:w-64'
          } ${
            isMobileMenuOpen ? 'w-64 translate-x-0' : '-translate-x-full lg:translate-x-0'
          }`}
        >
          {/* Top section of sidebar with Toggle Button & Nav Header */}
          <div className="p-3 border-b border-slate-800/80 flex items-center justify-between">
            {isSidebarCollapsed ? (
              <div className="w-full flex justify-center">
                <button
                  onClick={() => setIsSidebarCollapsed(false)}
                  className="p-2 rounded-xl bg-slate-800 hover:bg-amber-500 hover:text-slate-950 text-slate-300 transition"
                  title="Maximize Sidebar (Perbesar Menu Samping)"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
                  <span className="text-xs font-black text-amber-400 uppercase tracking-wider">
                    Navigasi Admin
                  </span>
                </div>

                <div className="flex items-center gap-1">
                  {/* Minimize button */}
                  <button
                    onClick={() => setIsSidebarCollapsed(true)}
                    className="p-1.5 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-slate-400 hover:text-white transition hidden lg:flex items-center justify-center"
                    title="Minimize Sidebar (Perkecil Menu)"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>

                  {/* Close button for mobile drawer */}
                  <button
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="lg:hidden p-1.5 rounded-lg bg-slate-800 text-slate-400 hover:text-white"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </>
            )}
          </div>

          {/* Scrollable Navigation Items */}
          <div className="flex-1 overflow-y-auto custom-scrollbar p-3 space-y-1.5">
            {navigationItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveTab(item.id);
                    setIsMobileMenuOpen(false);
                  }}
                  title={item.label}
                  className={`w-full flex items-center rounded-xl font-bold transition-all relative group ${
                    isSidebarCollapsed 
                      ? 'justify-center p-3 text-sm' 
                      : 'justify-between px-3.5 py-3 text-xs sm:text-sm'
                  } ${
                    isActive
                      ? 'bg-amber-500 text-slate-950 shadow-lg shadow-amber-500/20'
                      : 'text-slate-400 hover:text-white hover:bg-slate-800/80'
                  }`}
                >
                  <div className={`flex items-center gap-3 ${isSidebarCollapsed ? 'justify-center' : ''}`}>
                    <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-slate-950' : 'text-slate-400 group-hover:text-amber-400'}`} />
                    {!isSidebarCollapsed && (
                      <span className="truncate">{item.label}</span>
                    )}
                  </div>

                  {/* Badges */}
                  {item.badge && (
                    <>
                      {!isSidebarCollapsed ? (
                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-black shrink-0 ${
                          isActive ? 'bg-slate-950 text-amber-400' : 'bg-amber-500 text-slate-950'
                        }`}>
                          {item.badge}
                        </span>
                      ) : (
                        <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 rounded-full bg-amber-400 border border-slate-900" />
                      )}
                    </>
                  )}

                  {/* Hover Floating Tooltip when Minimized */}
                  {isSidebarCollapsed && (
                    <div className="absolute left-full ml-3 px-3 py-1.5 bg-slate-900 text-white border border-slate-700 rounded-xl text-xs font-semibold whitespace-nowrap opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity shadow-xl z-50">
                      <div>{item.label}</div>
                      <div className="text-[10px] text-slate-400 font-normal">{item.desc}</div>
                    </div>
                  )}
                </button>
              );
            })}
          </div>

          {/* Bottom Footer Section of Sidebar */}
          <div className="p-3 border-t border-slate-800/80 bg-slate-950/40">
            {isSidebarCollapsed ? (
              <div className="flex flex-col items-center gap-2">
                <button
                  onClick={() => setIsSidebarCollapsed(false)}
                  className="w-full py-2 flex items-center justify-center rounded-xl bg-slate-800/80 hover:bg-amber-500 hover:text-slate-950 text-slate-400 transition"
                  title="Maximize Sidebar"
                >
                  <PanelLeftOpen className="w-4 h-4" />
                </button>
                <div className="w-2 h-2 rounded-full bg-emerald-400" title="Sistem Aktif & Terlindungi" />
              </div>
            ) : (
              <div className="space-y-2">
                <div className="flex items-center justify-between text-[11px] text-slate-400">
                  <span className="font-semibold text-slate-300">Proteksi Admin:</span>
                  <span className="text-emerald-400 font-bold flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" /> Terkunci Aman
                  </span>
                </div>

                <button
                  onClick={() => setIsSidebarCollapsed(true)}
                  className="w-full py-1.5 px-3 rounded-lg bg-slate-800/60 hover:bg-slate-800 text-slate-400 hover:text-amber-400 text-xs font-semibold flex items-center justify-center gap-1.5 transition border border-slate-800"
                >
                  <PanelLeftClose className="w-3.5 h-3.5" />
                  <span>Minimize Sidebar</span>
                </button>
              </div>
            )}
          </div>
        </aside>

        {/* Content Area (Scrollable independently) */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto custom-scrollbar">
          {activeTab === 'analytics' && (
            <WebAnalyticsTab
              analytics={appData.analytics}
              onRefreshAnalytics={onRefreshAnalytics}
              onSimulateVisitor={onSimulateVisitor}
            />
          )}

          {activeTab === 'content' && (
            <ContentManagerTab
              profile={appData.profile}
              services={appData.services}
              portfolio={appData.portfolio}
              mediaLibrary={appData.mediaLibrary}
              onSaveProfile={onSaveProfile}
              onSaveServices={onSaveServices}
              onSavePortfolio={onSavePortfolio}
              onAddMediaItem={onAddMedia}
            />
          )}

          {activeTab === 'inquiries' && (
            <InquiriesTab
              inquiries={appData.inquiries}
              companyName={appData.profile.companyName}
              onUpdateInquiry={onUpdateInquiry}
              onDeleteInquiry={onDeleteInquiry}
            />
          )}

          {activeTab === 'media' && (
            <MediaUploaderTab
              mediaLibrary={appData.mediaLibrary}
              onAddMedia={onAddMedia}
              onDeleteMedia={onDeleteMedia}
            />
          )}

          {activeTab === 'cloud_sync' && (
            <CloudSyncTab
              appData={appData}
              onUpdateGoogleSheetsConfig={onUpdateGoogleSheetsConfig}
              onUpdateFirebaseConfig={onUpdateFirebaseConfig}
              onAddSyncLog={onAddSyncLog}
              onRestoreAppData={onRestoreAppData}
            />
          )}

          {activeTab === 'seo' && (
            <GoogleSeoTab
              seoConfig={appData.seoConfig}
              profile={appData.profile}
              onUpdateSeoConfig={onUpdateSeoConfig}
            />
          )}

          {activeTab === 'security' && (
            <SecuritySettingsTab
              currentPasswordHash={appData.adminPasswordHash}
              lastLogin={appData.adminLastLogin}
              onUpdatePassword={onUpdatePassword}
              onResetFactoryDefaults={onResetFactoryDefaults}
            />
          )}
        </main>

      </div>
    </div>
  );
};
