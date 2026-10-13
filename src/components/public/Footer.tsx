import React from 'react';
import { CompanyProfile } from '../../types';
import { Sparkles, Phone, Mail, MapPin, Lock } from 'lucide-react';

interface FooterProps {
  profile: CompanyProfile;
  onOpenLogin: () => void;
  isAdminLoggedIn: boolean;
  onGoToAdmin: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  profile,
  onOpenLogin,
  isAdminLoggedIn,
  onGoToAdmin
}) => {
  return (
    <footer className="bg-slate-950 border-t border-slate-800 text-slate-400 text-xs py-14">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          
          {/* Brand Info */}
          <div className="space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-amber-500 text-slate-950 flex items-center justify-center font-bold">
                <Sparkles className="w-4 h-4" />
              </div>
              <span className="text-base font-black text-amber-400 tracking-wider">
                {profile.companyName}
              </span>
            </div>
            <p className="text-slate-400 leading-relaxed text-xs">
              {profile.tagline}. Spesialis produksi event, sound system line array, rigging truss aluminium, lighting, dan videotron konser profesional.
            </p>
            <div className="text-[11px] text-slate-500">
              Terdaftar resmi sebagai korporasi penyedia jasa pertunjukan & multimedia.
            </div>
          </div>

          {/* Nav Links */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">Layanan Utama</h4>
            <ul className="space-y-2">
              <li><a href="#services" className="hover:text-amber-400 transition-colors">Stage & Rigging Aluminium</a></li>
              <li><a href="#services" className="hover:text-amber-400 transition-colors">Sound System Line Array Concert</a></li>
              <li><a href="#services" className="hover:text-amber-400 transition-colors">Lighting & Special Effects Co2</a></li>
              <li><a href="#services" className="hover:text-amber-400 transition-colors">LED Videotron P2.6 & P3.9</a></li>
              <li><a href="#services" className="hover:text-amber-400 transition-colors">Sewa Genset Silent 40-250 kVA</a></li>
            </ul>
          </div>

          {/* Portofolio Links */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">Kategori Event</h4>
            <ul className="space-y-2">
              <li><a href="#portfolio" className="hover:text-amber-400 transition-colors">Konser Musik & Tur Festival</a></li>
              <li><a href="#portfolio" className="hover:text-amber-400 transition-colors">Corporate Gathering & Awarding</a></li>
              <li><a href="#portfolio" className="hover:text-amber-400 transition-colors">Konferensi Internasional & Summit</a></li>
              <li><a href="#portfolio" className="hover:text-amber-400 transition-colors">Pameran Industri Otomotif & Expo</a></li>
              <li><a href="#portfolio" className="hover:text-amber-400 transition-colors">Pesta Rakyat & Hari Kemerdekaan</a></li>
            </ul>
          </div>

          {/* Contact Fast Info */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">Hubungi Kami</h4>
            <div className="space-y-2.5 text-xs text-slate-300">
              <p className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <span>{profile.address}, {profile.city}</span>
              </p>
              <p className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-amber-400 shrink-0" />
                <span className="text-amber-400 font-bold">{profile.phone}</span>
              </p>
              <p className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-amber-400 shrink-0" />
                <span className="break-all">{profile.email}</span>
              </p>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-slate-500 text-[11px]">
          <div>
            &copy; 2026 <strong className="text-slate-400">{profile.companyName}</strong>. Hak Cipta Dilindungi Undang-Undang.
          </div>

          <div className="flex items-center gap-4">
            <a href="#about" className="hover:text-slate-300 transition-colors">Kebijakan Privasi</a>
            <span>•</span>
            <a href="#about" className="hover:text-slate-300 transition-colors">Syarat & Ketentuan</a>
            <span>•</span>
            {isAdminLoggedIn ? (
              <button
                onClick={onGoToAdmin}
                className="text-amber-400 hover:text-amber-300 flex items-center gap-1 font-semibold"
              >
                <Lock className="w-3 h-3" /> Panel Admin
              </button>
            ) : (
              <button
                onClick={onOpenLogin}
                className="hover:text-slate-300 flex items-center gap-1 transition-colors"
                title="Akses Administrator"
              >
                <Lock className="w-3 h-3" /> Akses Admin
              </button>
            )}
          </div>
        </div>
      </div>
    </footer>
  );
};
