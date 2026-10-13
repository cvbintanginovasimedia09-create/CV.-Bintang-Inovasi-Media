import React, { useState } from 'react';
import { WebAnalytics } from '../../types';
import { 
  BarChart3, 
  Users, 
  Eye, 
  TrendingUp, 
  Clock, 
  Smartphone, 
  Laptop, 
  Tablet, 
  Compass, 
  Globe, 
  RefreshCw,
  PlusCircle,
  Activity
} from 'lucide-react';

interface WebAnalyticsTabProps {
  analytics: WebAnalytics;
  onRefreshAnalytics: () => void;
  onSimulateVisitor: () => void;
}

export const WebAnalyticsTab: React.FC<WebAnalyticsTabProps> = ({
  analytics,
  onRefreshAnalytics,
  onSimulateVisitor
}) => {
  const [timeFilter, setTimeFilter] = useState<'7days' | '30days'>('7days');

  const maxViews = Math.max(...analytics.trafficHistory.map(h => h.pageViews), 100);

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      
      {/* Top Bar with actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2.5">
            <h2 className="text-2xl font-black text-white">Analisis Web & Traffic Insights</h2>
            <span className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-bold">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>{analytics.currentActiveVisitors} Aktif Online</span>
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Pantau performa kunjungan, konversi calon klien, sumber referrer, dan perangkat pengunjung secara langsung.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={onSimulateVisitor}
            className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-amber-400 text-xs font-bold border border-slate-700 flex items-center gap-1.5 transition"
            title="Simulasikan kunjungan pengunjung baru untuk menguji grafik"
          >
            <PlusCircle className="w-3.5 h-3.5" />
            <span>Simulasi Kunjungan</span>
          </button>

          <button
            onClick={onRefreshAnalytics}
            className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700 transition"
            title="Refresh Data"
          >
            <RefreshCw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Primary KPI Metrics */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-medium">Total Tayangan Halaman</span>
            <Eye className="w-4 h-4 text-amber-400" />
          </div>
          <div className="text-2xl font-black text-white">
            {analytics.totalPageViews.toLocaleString('id-ID')}
          </div>
          <div className="text-[11px] text-emerald-400 font-semibold mt-1 flex items-center gap-1">
            <TrendingUp className="w-3 h-3" /> +14.2% minggu ini
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-medium">Pengunjung Unik</span>
            <Users className="w-4 h-4 text-blue-400" />
          </div>
          <div className="text-2xl font-black text-white">
            {analytics.uniqueVisitors.toLocaleString('id-ID')}
          </div>
          <div className="text-[11px] text-emerald-400 font-semibold mt-1 flex items-center gap-1">
            <TrendingUp className="w-3 h-3" /> +8.6% pengunjung baru
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-medium">Tingkat Konversi Lead</span>
            <BarChart3 className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-2xl font-black text-amber-400">
            {analytics.inquiriesConversionRate}%
          </div>
          <div className="text-[11px] text-slate-400 mt-1">
            Pengunjung jadi penawaran
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-medium">Rata-rata Waktu Sesi</span>
            <Clock className="w-4 h-4 text-purple-400" />
          </div>
          <div className="text-2xl font-black text-white">
            {Math.floor(analytics.avgSessionSeconds / 60)}m {analytics.avgSessionSeconds % 60}s
          </div>
          <div className="text-[11px] text-slate-400 mt-1">
            Interaksi tinggi
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 col-span-2 sm:col-span-1">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-medium">Bounce Rate (Rasio Mental)</span>
            <Activity className="w-4 h-4 text-rose-400" />
          </div>
          <div className="text-2xl font-black text-white">
            {analytics.bounceRate}%
          </div>
          <div className="text-[11px] text-emerald-400 font-semibold mt-1">
            Sangat Sehat (&lt; 40%)
          </div>
        </div>
      </div>

      {/* Traffic Trend Visual Chart */}
      <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <BarChart3 className="w-4 h-4 text-amber-400" />
              <span>Tren Kunjungan Harian & Penawaran Masuk</span>
            </h3>
            <span className="text-xs text-slate-400">Tingkat keterlibatan calon klien selama 7 hari terakhir</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setTimeFilter('7days')}
              className={`px-3 py-1 rounded-lg text-xs font-semibold ${timeFilter === '7days' ? 'bg-amber-500 text-slate-950' : 'bg-slate-800 text-slate-400'}`}
            >
              7 Hari Terakhir
            </button>
          </div>
        </div>

        {/* Bar / Column Chart */}
        <div className="h-48 flex items-end justify-between gap-2 sm:gap-4 pt-4 border-b border-slate-800 pb-2">
          {analytics.trafficHistory.map((item, idx) => {
            const heightPercent = Math.round((item.pageViews / maxViews) * 100);
            return (
              <div key={idx} className="flex-1 flex flex-col items-center gap-2 group h-full justify-end">
                <div className="text-[10px] text-amber-400 font-bold opacity-0 group-hover:opacity-100 transition-opacity">
                  {item.pageViews}
                </div>
                <div
                  style={{ height: `${Math.max(heightPercent, 12)}%` }}
                  className="w-full max-w-[42px] rounded-t-lg bg-gradient-to-t from-amber-600 to-amber-400 group-hover:from-amber-500 group-hover:to-amber-300 transition-all relative"
                >
                  {item.inquiries > 0 && (
                    <span className="absolute -top-6 left-1/2 -translate-x-1/2 px-1.5 py-0.5 rounded bg-emerald-500 text-slate-950 font-black text-[9px] whitespace-nowrap shadow">
                      +{item.inquiries} Penawaran
                    </span>
                  )}
                </div>
                <span className="text-[11px] text-slate-400 group-hover:text-white font-medium">
                  {item.date}
                </span>
              </div>
            );
          })}
        </div>

        <div className="flex items-center justify-between pt-3 text-xs text-slate-400">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded bg-amber-400" /> Page Views
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded bg-emerald-400" /> Penawaran Masuk
            </span>
          </div>
          <span>Total 7 Hari: {analytics.trafficHistory.reduce((a, b) => a + b.pageViews, 0).toLocaleString()} views</span>
        </div>
      </div>

      {/* Two Columns: Device Breakdown & Referrers */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Device Breakdown */}
        <div className="lg:col-span-5 p-6 rounded-2xl bg-slate-900/80 border border-slate-800 flex flex-col justify-between">
          <div>
            <h3 className="text-base font-bold text-white mb-1 flex items-center gap-2">
              <Smartphone className="w-4 h-4 text-amber-400" />
              <span>Distribusi Perangkat Pengunjung</span>
            </h3>
            <p className="text-xs text-slate-400 mb-6">Sebagian besar klien mencari sewa panggung & sound via HP</p>

            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-xs font-semibold text-slate-300 mb-1.5">
                  <span className="flex items-center gap-2"><Smartphone className="w-4 h-4 text-amber-400" /> Ponsel (Mobile)</span>
                  <span className="text-amber-400">{analytics.deviceBreakdown.mobile}%</span>
                </div>
                <div className="h-2.5 rounded-full bg-slate-800 overflow-hidden">
                  <div style={{ width: `${analytics.deviceBreakdown.mobile}%` }} className="h-full bg-amber-500 rounded-full" />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs font-semibold text-slate-300 mb-1.5">
                  <span className="flex items-center gap-2"><Laptop className="w-4 h-4 text-blue-400" /> Komputer (Desktop)</span>
                  <span className="text-blue-400">{analytics.deviceBreakdown.desktop}%</span>
                </div>
                <div className="h-2.5 rounded-full bg-slate-800 overflow-hidden">
                  <div style={{ width: `${analytics.deviceBreakdown.desktop}%` }} className="h-full bg-blue-500 rounded-full" />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs font-semibold text-slate-300 mb-1.5">
                  <span className="flex items-center gap-2"><Tablet className="w-4 h-4 text-emerald-400" /> Tablet (iPad/Tab)</span>
                  <span className="text-emerald-400">{analytics.deviceBreakdown.tablet}%</span>
                </div>
                <div className="h-2.5 rounded-full bg-slate-800 overflow-hidden">
                  <div style={{ width: `${analytics.deviceBreakdown.tablet}%` }} className="h-full bg-emerald-500 rounded-full" />
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-slate-800 text-[11px] text-slate-400">
            UI Mobile-first responsive terbukti meningkatkan kenyamanan klien saat membuka portofolio di lokasi.
          </div>
        </div>

        {/* Referrer Sources */}
        <div className="lg:col-span-7 p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
          <h3 className="text-base font-bold text-white mb-1 flex items-center gap-2">
            <Globe className="w-4 h-4 text-amber-400" />
            <span>Sumber Rujukan Trafik (Referrers)</span>
          </h3>
          <p className="text-xs text-slate-400 mb-5">Dari mana calon klien menemukan Bintang Inovasi Media</p>

          <div className="space-y-3">
            {analytics.referrerSources.map((ref, idx) => (
              <div key={idx} className="flex items-center justify-between p-3 rounded-xl bg-slate-950 border border-slate-800 text-xs">
                <div className="flex items-center gap-2.5">
                  <span className="w-6 h-6 rounded-lg bg-amber-500/10 text-amber-400 flex items-center justify-center font-bold text-[11px]">
                    {idx + 1}
                  </span>
                  <span className="font-semibold text-white">{ref.source}</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-slate-400">{ref.count.toLocaleString()} sesi</span>
                  <span className="px-2 py-0.5 rounded bg-slate-800 text-amber-400 font-bold text-[11px]">
                    {ref.percentage}%
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Popular Sections Visited & Live Activity Log */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Popular Sections */}
        <div className="lg:col-span-5 p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
          <h3 className="text-base font-bold text-white mb-1 flex items-center gap-2">
            <Compass className="w-4 h-4 text-amber-400" />
            <span>Halaman & Bagian Terpopuler</span>
          </h3>
          <p className="text-xs text-slate-400 mb-4">Bagian yang paling sering ditelusuri pengunjung</p>

          <div className="space-y-2.5 text-xs">
            {analytics.sectionVisits.map((sec, idx) => (
              <div key={idx} className="flex items-center justify-between p-2.5 rounded-lg bg-slate-950/60 border border-slate-800/80">
                <span className="text-slate-300 font-medium">{sec.sectionName}</span>
                <span className="text-amber-400 font-bold">{sec.count.toLocaleString()} dilihat</span>
              </div>
            ))}
          </div>
        </div>

        {/* Live Visitor Event Log */}
        <div className="lg:col-span-7 p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Activity className="w-4 h-4 text-emerald-400" />
              <span>Aktivitas Pengunjung Terkini (Live Stream)</span>
            </h3>
            <span className="text-[11px] text-slate-400">Pembaruan Real-Time</span>
          </div>

          <div className="space-y-2.5 max-h-64 overflow-y-auto pr-1">
            {analytics.activityLogs.map((log) => (
              <div key={log.id} className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-xs flex items-center justify-between gap-3">
                <div className="space-y-0.5">
                  <p className="font-semibold text-white">{log.action}</p>
                  <p className="text-[11px] text-slate-400">{log.device} • {log.location}</p>
                </div>
                <span className="text-[10px] text-slate-500 font-mono shrink-0">
                  {log.timestamp}
                </span>
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
};
