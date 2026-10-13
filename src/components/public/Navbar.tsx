import React from 'react';
import { CompanyProfile } from '../../types';
import { Phone, Sparkles, Lock, Calculator } from 'lucide-react';

interface NavbarProps {
  profile: CompanyProfile;
  onOpenLogin: () => void;
  onOpenEstimator: () => void;
  isAdminLoggedIn: boolean;
  onGoToAdmin: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  profile,
  onOpenLogin,
  onOpenEstimator,
  isAdminLoggedIn,
  onGoToAdmin
}) => {
  const cleanPhone = profile.phone.replace(/[^0-9]/g, '');

  return (
    <header className="fixed top-0 left-0 right-0 z-40 bg-slate-950/85 backdrop-blur-md border-b border-slate-800/80 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3.5 flex justify-between items-center">
        {/* Brand Logo */}
        <a href="#" className="flex items-center gap-2.5 group">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-600 to-amber-400 flex items-center justify-center text-slate-950 font-black shadow-lg shadow-amber-500/20 group-hover:scale-105 transition-transform">
            <Sparkles className="w-5 h-5 text-slate-950" />
          </div>
          <div className="flex flex-col">
            <span className="text-base sm:text-lg font-black tracking-wider text-amber-400 uppercase leading-none">
              {profile.companyName}
            </span>
            <span className="text-[10px] text-slate-400 uppercase tracking-widest font-medium mt-0.5 hidden sm:block">
              Event Production & Multimedia
            </span>
          </div>
        </a>

        {/* Public Navigation Links */}
        <nav className="hidden lg:flex items-center space-x-7 font-medium text-sm text-slate-300">
          <a href="#about" className="hover:text-amber-400 transition-colors">Tentang Kami</a>
          <a href="#services" className="hover:text-amber-400 transition-colors">Layanan Produksi</a>
          <a href="#portfolio" className="hover:text-amber-400 transition-colors">Portofolio</a>
          <a href="#estimasi" onClick={(e) => { e.preventDefault(); onOpenEstimator(); }} className="hover:text-amber-400 transition-colors flex items-center gap-1.5 text-amber-300 font-semibold">
            <Calculator className="w-3.5 h-3.5" /> Hitung Estimasi
          </a>
          <a href="#contact" className="hover:text-amber-400 transition-colors">Kontak & Penawaran</a>
        </nav>

        {/* Action Buttons */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Quick Quote Calculator button for mobile / tablet */}
          <button
            onClick={onOpenEstimator}
            className="hidden sm:flex lg:hidden items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg bg-slate-800 text-amber-400 hover:bg-slate-700 transition"
          >
            <Calculator className="w-3.5 h-3.5" /> Estimator
          </button>

          {/* WhatsApp Direct */}
          <a
            href={`https://wa.me/${cleanPhone}?text=Halo%20Bintang%20Inovasi%20Media,%20saya%20ingin%20konsultasi%20produksi%20event`}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold px-3.5 sm:px-4 py-2 rounded-full text-xs sm:text-sm transition-all shadow-lg shadow-amber-500/20 flex items-center gap-2"
          >
            <Phone className="w-3.5 h-3.5 fill-slate-950" />
            <span className="hidden xs:inline">Hubungi WA</span>
          </a>

          {/* Admin Access Lock Button */}
          {isAdminLoggedIn ? (
            <button
              onClick={onGoToAdmin}
              className="bg-amber-500/15 border border-amber-500/40 text-amber-300 hover:bg-amber-500/25 px-3 py-2 rounded-full text-xs font-bold transition flex items-center gap-1.5"
              title="Kembali ke Panel Admin"
            >
              <Lock className="w-3.5 h-3.5 text-amber-400" />
              <span>CMS Panel</span>
            </button>
          ) : (
            <button
              onClick={onOpenLogin}
              className="p-2 sm:px-3 sm:py-2 rounded-full border border-slate-800 hover:border-amber-400/50 bg-slate-900/60 hover:bg-slate-800 text-slate-400 hover:text-amber-400 text-xs transition flex items-center gap-1.5"
              title="Akses Administrator Aman"
              aria-label="Akses Administrator"
            >
              <Lock className="w-3.5 h-3.5" />
              <span className="hidden sm:inline text-xs font-medium">Admin</span>
            </button>
          )}
        </div>
      </div>
    </header>
  );
};
