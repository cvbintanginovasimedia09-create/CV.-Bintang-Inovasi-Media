import React from 'react';
import { CompanyProfile } from '../../types';
import { ArrowRight, CheckCircle2, ShieldCheck, Award, Zap, Calculator } from 'lucide-react';

interface HeroSectionProps {
  profile: CompanyProfile;
  onOpenEstimator: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ profile, onOpenEstimator }) => {
  return (
    <section className="relative min-h-[92vh] flex items-center justify-center bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 pt-28 pb-16 overflow-hidden">
      {/* Background Glow Accents */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[350px] bg-amber-500/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-1/3 left-10 w-72 h-72 bg-blue-500/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 text-center z-10">
        {/* Quality Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/25 text-amber-400 text-xs sm:text-sm font-semibold uppercase tracking-wider mb-8">
          <Award className="w-4 h-4 text-amber-400" />
          <span>Vendor Produksi Event & Multimedia Terpercaya #1</span>
        </div>

        {/* Main Headline */}
        <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-white leading-[1.15] tracking-tight mb-6 max-w-5xl mx-auto">
          {profile.heroHeadline}
        </h1>

        {/* Subtitle */}
        <p className="text-slate-300 sm:text-lg md:text-xl max-w-3xl mx-auto leading-relaxed mb-10 font-normal">
          {profile.heroSubtitle}
        </p>

        {/* Action CTAs */}
        <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 mb-16">
          <a
            href="#contact"
            className="px-7 py-3.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-black text-sm sm:text-base shadow-xl shadow-amber-500/25 transition-all transform hover:-translate-y-0.5 flex items-center gap-2"
          >
            <span>Minta Penawaran Acara</span>
            <ArrowRight className="w-4 h-4" />
          </a>

          <button
            onClick={onOpenEstimator}
            className="px-6 py-3.5 rounded-xl bg-slate-900/90 hover:bg-slate-800 border border-slate-700/80 hover:border-amber-500/50 text-amber-300 font-bold text-sm sm:text-base transition-all flex items-center gap-2"
          >
            <Calculator className="w-4 h-4 text-amber-400" />
            <span>Hitung Estimasi Anggaran</span>
          </button>

          <a
            href="#portfolio"
            className="px-6 py-3.5 rounded-xl bg-slate-900/50 hover:bg-slate-800/80 border border-slate-800 text-slate-300 hover:text-white font-medium text-sm sm:text-base transition-all"
          >
            Jelajahi Portofolio
          </a>
        </div>

        {/* Trust Stats Counter */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 max-w-4xl mx-auto pt-8 border-t border-slate-800/70 text-left">
          <div className="p-4 rounded-xl bg-slate-900/40 border border-slate-800/60">
            <div className="text-2xl sm:text-3xl font-black text-amber-400 mb-1">
              {profile.stats.yearsExperience}+ Tahun
            </div>
            <div className="text-xs text-slate-400 flex items-center gap-1.5 font-medium">
              <ShieldCheck className="w-3.5 h-3.5 text-amber-400 shrink-0" />
              <span>Pengalaman Teruji</span>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-slate-900/40 border border-slate-800/60">
            <div className="text-2xl sm:text-3xl font-black text-amber-400 mb-1">
              {profile.stats.completedEvents}+
            </div>
            <div className="text-xs text-slate-400 flex items-center gap-1.5 font-medium">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              <span>Event Berhasil</span>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-slate-900/40 border border-slate-800/60">
            <div className="text-2xl sm:text-3xl font-black text-amber-400 mb-1">
              {profile.stats.clientSatisfactionRate}%
            </div>
            <div className="text-xs text-slate-400 flex items-center gap-1.5 font-medium">
              <Award className="w-3.5 h-3.5 text-amber-400 shrink-0" />
              <span>Kepuasan Klien</span>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-slate-900/40 border border-slate-800/60">
            <div className="text-2xl sm:text-3xl font-black text-amber-400 mb-1">
              {profile.stats.totalGensetPowerKva} kVA
            </div>
            <div className="text-xs text-slate-400 flex items-center gap-1.5 font-medium">
              <Zap className="w-3.5 h-3.5 text-amber-400 shrink-0" />
              <span>Daya Listrik Mandiri</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
