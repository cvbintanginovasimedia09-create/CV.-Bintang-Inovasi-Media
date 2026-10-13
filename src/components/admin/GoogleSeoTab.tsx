import React, { useState } from 'react';
import { SeoConfig, CompanyProfile } from '../../types';
import { 
  Search, 
  Sparkles, 
  CheckCircle2, 
  AlertTriangle, 
  Globe, 
  Smartphone, 
  Laptop, 
  Copy, 
  Check, 
  FileCode, 
  Tag, 
  ShieldCheck,
  TrendingUp,
  RefreshCw
} from 'lucide-react';
import { auditSeo, generateSitemapXml, generateRobotsTxt } from '../../utils/seoHelper';

interface GoogleSeoTabProps {
  seoConfig: SeoConfig;
  profile: CompanyProfile;
  onUpdateSeoConfig: (updated: SeoConfig) => void;
}

export const GoogleSeoTab: React.FC<GoogleSeoTabProps> = ({
  seoConfig,
  profile,
  onUpdateSeoConfig
}) => {
  const [form, setForm] = useState<SeoConfig>(seoConfig);
  const [previewDevice, setPreviewDevice] = useState<'desktop' | 'mobile'>('desktop');
  const [copiedSitemap, setCopiedSitemap] = useState(false);
  const [copiedRobots, setCopiedRobots] = useState(false);
  const [newKeywordInput, setNewKeywordInput] = useState('');

  // Run real-time SEO audit
  const auditResult = auditSeo(form, profile);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    const updated = {
      ...form,
      seoScore: auditResult.score
    };
    onUpdateSeoConfig(updated);
    alert('Konfigurasi SEO & Metadata Google berhasil disimpan!');
  };

  const handleAddKeyword = () => {
    if (!newKeywordInput.trim()) return;
    if (!form.targetKeywords.includes(newKeywordInput.trim())) {
      setForm({
        ...form,
        targetKeywords: [...form.targetKeywords, newKeywordInput.trim()]
      });
    }
    setNewKeywordInput('');
  };

  const handleRemoveKeyword = (kw: string) => {
    setForm({
      ...form,
      targetKeywords: form.targetKeywords.filter(k => k !== kw)
    });
  };

  const handleRegenerateSitemap = () => {
    const sitemap = generateSitemapXml(form.canonicalUrl || 'https://bintanginovasimedia.com');
    const robots = generateRobotsTxt(form.canonicalUrl || 'https://bintanginovasimedia.com');
    setForm({
      ...form,
      sitemapXmlContent: sitemap,
      robotsTxtContent: robots
    });
    alert('Sitemap.xml dan Robots.txt berhasil digenerate otomatis!');
  };

  const copySitemap = () => {
    navigator.clipboard.writeText(form.sitemapXmlContent);
    setCopiedSitemap(true);
    setTimeout(() => setCopiedSitemap(false), 2500);
  };

  const copyRobots = () => {
    navigator.clipboard.writeText(form.robotsTxtContent);
    setCopiedRobots(true);
    setTimeout(() => setCopiedRobots(false), 2500);
  };

  // Preset keyword recommendations for Indonesian event organizer
  const recommendedKeywords = [
    'sewa sound system jakarta',
    'vendor event organizer profesional',
    'sewa videotron led p2.6',
    'panggung rigging konser musik',
    'sewa genset silent jakarta',
    'lighting moving head beam vendor'
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2.5">
            <h2 className="text-2xl font-black text-white">Otomatisasi SEO Pencarian di Google</h2>
            <span className="px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/25 text-amber-400 text-xs font-bold flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Googlebot & Search Console Ready</span>
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Optimalkan visibilitas website Bintang Inovasi Media agar menempati halaman #1 pencarian Google saat klien mencari vendor event.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 px-4 py-2 rounded-2xl bg-slate-900 border border-slate-800">
            <span className="text-xs text-slate-400">Skor Kesehatan SEO:</span>
            <span className={`text-xl font-black ${
              auditResult.score >= 85 ? 'text-emerald-400' : auditResult.score >= 70 ? 'text-amber-400' : 'text-red-400'
            }`}>
              {auditResult.score}/100
            </span>
          </div>
        </div>
      </div>

      {/* Google Search Snippet Live Preview Simulator */}
      <div className="p-6 rounded-3xl bg-slate-900/90 border border-slate-800 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-800">
          <div>
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Search className="w-4 h-4 text-blue-400" />
              <span>Simulator Hasil Pencarian Google (SERP Preview)</span>
            </h3>
            <span className="text-xs text-slate-400">Tampilan persis ketika calon klien menemukan website Anda di Google</span>
          </div>

          <div className="flex items-center gap-1 bg-slate-950 p-1 rounded-xl border border-slate-800">
            <button
              onClick={() => setPreviewDevice('desktop')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition ${
                previewDevice === 'desktop' ? 'bg-slate-800 text-white' : 'text-slate-400 hover:text-white'
              }`}
            >
              <Laptop className="w-3.5 h-3.5" /> Desktop
            </button>
            <button
              onClick={() => setPreviewDevice('mobile')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition ${
                previewDevice === 'mobile' ? 'bg-slate-800 text-white' : 'text-slate-400 hover:text-white'
              }`}
            >
              <Smartphone className="w-3.5 h-3.5" /> Mobile
            </button>
          </div>
        </div>

        {/* Google SERP Card Preview */}
        <div className={`p-5 rounded-2xl bg-white text-slate-900 font-sans shadow-lg transition-all ${
          previewDevice === 'mobile' ? 'max-w-md mx-auto border-2 border-slate-700' : 'w-full'
        }`}>
          {/* Breadcrumb URL */}
          <div className="flex items-center gap-2 text-xs text-slate-700 mb-1">
            <div className="w-4 h-4 rounded-full bg-slate-200 flex items-center justify-center text-[10px] font-bold text-slate-800">
              G
            </div>
            <div className="flex flex-col leading-none">
              <span className="text-[12px] font-medium text-slate-800 truncate">bintanginovasimedia.com</span>
              <span className="text-[10px] text-slate-500">https://bintanginovasimedia.com › event-production</span>
            </div>
          </div>

          {/* Title */}
          <h4 className="text-lg text-[#1a0dab] hover:underline cursor-pointer font-medium leading-snug line-clamp-1 mb-1">
            {form.metaTitle}
          </h4>

          {/* Snippet Description */}
          <p className="text-xs text-[#4d5156] leading-relaxed line-clamp-2">
            {form.metaDescription}
          </p>

          {/* Rich Snippet Enhancements (LocalBusiness) */}
          <div className="mt-2 pt-2 border-t border-slate-200 flex flex-wrap items-center gap-3 text-[11px] text-slate-600">
            <span className="flex items-center gap-1 text-amber-600 font-bold">
              ★ 4.9 (850+ ulasan event)
            </span>
            <span>•</span>
            <span>Lokasi: {profile.city}</span>
            <span>•</span>
            <span>Jam: Buka • Tutup 22.00</span>
          </div>
        </div>
      </div>

      {/* SEO Audit Checklist Cards */}
      <div className="p-6 rounded-3xl bg-slate-900/80 border border-slate-800 space-y-4">
        <h3 className="text-base font-bold text-white flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-emerald-400" />
          <span>Hasil Audit Otomatis Algoritma Google</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {auditResult.checks.map((c, i) => (
            <div
              key={i}
              className={`p-3.5 rounded-xl border text-xs flex items-start gap-2.5 ${
                c.passed
                  ? 'bg-emerald-500/5 border-emerald-500/25 text-slate-200'
                  : 'bg-amber-500/5 border-amber-500/25 text-slate-200'
              }`}
            >
              {c.passed ? (
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              ) : (
                <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
              )}
              <div>
                <span className="font-bold block text-white">{c.label}</span>
                <span className="text-[11px] text-slate-400 mt-0.5 block leading-relaxed">{c.recommendation}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* SEO Configuration Form */}
      <form onSubmit={handleSave} className="p-6 rounded-3xl bg-slate-900/80 border border-slate-800 space-y-6">
        <h3 className="text-base font-bold text-white flex items-center gap-2">
          <Tag className="w-4 h-4 text-amber-400" />
          <span>Pengaturan Meta Tag & Kata Kunci Google</span>
        </h3>

        <div>
          <div className="flex justify-between items-center mb-1">
            <label className="text-xs font-bold text-slate-300">
              Judul Halaman Google (Title Tag)
            </label>
            <span className={`text-[11px] font-mono ${
              form.metaTitle.length >= 35 && form.metaTitle.length <= 65 ? 'text-emerald-400 font-bold' : 'text-amber-400'
            }`}>
              {form.metaTitle.length} / 60 karakter optimal
            </span>
          </div>
          <input
            type="text"
            required
            value={form.metaTitle}
            onChange={(e) => setForm({ ...form, metaTitle: e.target.value })}
            className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-white text-xs sm:text-sm focus:outline-none focus:border-amber-400"
          />
        </div>

        <div>
          <div className="flex justify-between items-center mb-1">
            <label className="text-xs font-bold text-slate-300">
              Deskripsi Cuplikan Google (Meta Description)
            </label>
            <span className={`text-[11px] font-mono ${
              form.metaDescription.length >= 115 && form.metaDescription.length <= 165 ? 'text-emerald-400 font-bold' : 'text-amber-400'
            }`}>
              {form.metaDescription.length} / 155 karakter optimal
            </span>
          </div>
          <textarea
            rows={3}
            required
            value={form.metaDescription}
            onChange={(e) => setForm({ ...form, metaDescription: e.target.value })}
            className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-white text-xs sm:text-sm focus:outline-none focus:border-amber-400 leading-relaxed"
          />
        </div>

        {/* Target Keywords Generator */}
        <div className="space-y-3">
          <label className="block text-xs font-bold text-slate-300">
            Target Kata Kunci Pencarian (Keywords)
          </label>
          
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Ketik kata kunci baru (misal: sewa rig panggung konser)..."
              value={newKeywordInput}
              onChange={(e) => setNewKeywordInput(e.target.value)}
              onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); handleAddKeyword(); } }}
              className="flex-1 bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-white text-xs focus:outline-none focus:border-amber-400"
            />
            <button
              type="button"
              onClick={handleAddKeyword}
              className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-amber-400 font-bold text-xs"
            >
              Tambah
            </button>
          </div>

          {/* Active Keywords list */}
          <div className="flex flex-wrap gap-2 pt-1">
            {form.targetKeywords.map((kw, i) => (
              <span
                key={i}
                className="px-3 py-1.5 rounded-lg bg-amber-500/10 text-amber-400 border border-amber-500/25 text-xs flex items-center gap-1.5"
              >
                <span>{kw}</span>
                <button
                  type="button"
                  onClick={() => handleRemoveKeyword(kw)}
                  className="text-amber-400 hover:text-white ml-1"
                >
                  ×
                </button>
              </span>
            ))}
          </div>

          {/* Recommended Keywords Preset */}
          <div className="pt-2">
            <span className="text-[11px] text-slate-400 block mb-1.5">Saran Kata Kunci Terpopuler:</span>
            <div className="flex flex-wrap gap-1.5">
              {recommendedKeywords.map((rec, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => {
                    if (!form.targetKeywords.includes(rec)) {
                      setForm({ ...form, targetKeywords: [...form.targetKeywords, rec] });
                    }
                  }}
                  className="text-[10px] px-2.5 py-1 rounded bg-slate-800 text-slate-300 hover:text-amber-400 hover:bg-slate-700 transition"
                >
                  + {rec}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Google Search Console & Analytics Tags */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
          <div>
            <label className="block text-xs font-bold text-slate-300 mb-1">
              Google Search Console Verification Tag
            </label>
            <input
              type="text"
              placeholder="google-site-verification=xxxx..."
              value={form.gscVerificationCode}
              onChange={(e) => setForm({ ...form, gscVerificationCode: e.target.value })}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-white text-xs font-mono"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-300 mb-1">
              Google Analytics 4 Measurement ID
            </label>
            <input
              type="text"
              placeholder="G-XXXXXXXXXX"
              value={form.ga4MeasurementId}
              onChange={(e) => setForm({ ...form, ga4MeasurementId: e.target.value })}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-white text-xs font-mono"
            />
          </div>
        </div>

        {/* Sitemap & Robots Generators */}
        <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">
              Generator Sitemap XML & Robots.txt Otomatis
            </span>
            <button
              type="button"
              onClick={handleRegenerateSitemap}
              className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold flex items-center gap-1.5"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Regenerasi Otomatis</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
                <span>sitemap.xml</span>
                <button
                  type="button"
                  onClick={copySitemap}
                  className="text-amber-400 hover:underline flex items-center gap-1 text-[11px]"
                >
                  {copiedSitemap ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                  <span>{copiedSitemap ? 'Tersalin' : 'Salin XML'}</span>
                </button>
              </div>
              <textarea
                rows={5}
                value={form.sitemapXmlContent}
                onChange={(e) => setForm({ ...form, sitemapXmlContent: e.target.value })}
                className="w-full bg-slate-900 border border-slate-800 rounded-xl p-3 text-[11px] font-mono text-slate-300 leading-tight"
              />
            </div>

            <div>
              <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
                <span>robots.txt</span>
                <button
                  type="button"
                  onClick={copyRobots}
                  className="text-amber-400 hover:underline flex items-center gap-1 text-[11px]"
                >
                  {copiedRobots ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                  <span>{copiedRobots ? 'Tersalin' : 'Salin TXT'}</span>
                </button>
              </div>
              <textarea
                rows={5}
                value={form.robotsTxtContent}
                onChange={(e) => setForm({ ...form, robotsTxtContent: e.target.value })}
                className="w-full bg-slate-900 border border-slate-800 rounded-xl p-3 text-[11px] font-mono text-slate-300 leading-tight"
              />
            </div>
          </div>
        </div>

        <div className="flex justify-end pt-2">
          <button
            type="submit"
            className="px-6 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs sm:text-sm transition shadow-lg shadow-amber-500/20"
          >
            Simpan Konfigurasi SEO Google
          </button>
        </div>
      </form>

    </div>
  );
};
