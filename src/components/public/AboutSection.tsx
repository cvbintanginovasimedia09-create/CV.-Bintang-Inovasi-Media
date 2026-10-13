import React from 'react';
import { CompanyProfile } from '../../types';
import { MapPin, Mail, Phone, Clock, Target, Compass, ShieldCheck } from 'lucide-react';

interface AboutSectionProps {
  profile: CompanyProfile;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ profile }) => {
  return (
    <section id="about" className="py-24 bg-slate-950 border-t border-slate-800/60 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Story, Vision & Mission */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-bold uppercase tracking-wider">
              <span>Tentang Perusahaan Kami</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-black text-white leading-tight">
              Mitra Produksi Teknis Paling Andal untuk Konser & Konferensi Anda
            </h2>

            <p className="text-slate-300 text-base sm:text-lg leading-relaxed font-normal">
              {profile.aboutDescription}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
              <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-slate-700 transition">
                <div className="flex items-center gap-3 mb-2.5">
                  <div className="w-9 h-9 rounded-lg bg-amber-500/10 flex items-center justify-center text-amber-400">
                    <Target className="w-5 h-5" />
                  </div>
                  <h3 className="font-bold text-white text-base">Visi Perusahaan</h3>
                </div>
                <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                  {profile.vision}
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-slate-700 transition">
                <div className="flex items-center gap-3 mb-2.5">
                  <div className="w-9 h-9 rounded-lg bg-amber-500/10 flex items-center justify-center text-amber-400">
                    <Compass className="w-5 h-5" />
                  </div>
                  <h3 className="font-bold text-white text-base">Misi Perusahaan</h3>
                </div>
                <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                  {profile.mission}
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3 pt-2 text-xs text-slate-400">
              <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800">
                <ShieldCheck className="w-4 h-4 text-emerald-400" /> Sertifikasi Uji Beban Truss
              </span>
              <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800">
                <ShieldCheck className="w-4 h-4 text-emerald-400" /> Sertifikasi Audio FOH Level 1
              </span>
              <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800">
                <ShieldCheck className="w-4 h-4 text-emerald-400" /> Standar K3 Kelistrikan Genset
              </span>
            </div>
          </div>

          {/* Right Column: Information Card */}
          <div className="lg:col-span-5">
            <div className="relative p-7 sm:p-9 rounded-3xl bg-gradient-to-b from-slate-900 to-slate-950 border border-slate-800 shadow-2xl">
              <div className="absolute top-0 right-0 w-44 h-44 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

              <h3 className="text-xl font-black text-amber-400 mb-6 flex items-center gap-2">
                <span>Kantor & Workshop Produksi</span>
              </h3>

              <div className="space-y-5 text-sm text-slate-300">
                <div className="flex items-start gap-3.5">
                  <div className="w-9 h-9 rounded-lg bg-slate-800 flex items-center justify-center text-amber-400 shrink-0 mt-0.5">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="block text-xs uppercase font-bold text-slate-400 tracking-wider">Lokasi Kantor / Gudang</span>
                    <p className="font-semibold text-white mt-0.5">{profile.address}</p>
                    <p className="text-xs text-slate-400">{profile.city}, {profile.province} {profile.postalCode}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="w-9 h-9 rounded-lg bg-slate-800 flex items-center justify-center text-amber-400 shrink-0 mt-0.5">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="block text-xs uppercase font-bold text-slate-400 tracking-wider">Layanan Konsultasi & WhatsApp</span>
                    <p className="font-bold text-amber-400 mt-0.5 text-base">{profile.phone}</p>
                    <p className="text-xs text-slate-400">Tersedia respon kilat untuk survei venue</p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="w-9 h-9 rounded-lg bg-slate-800 flex items-center justify-center text-amber-400 shrink-0 mt-0.5">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="block text-xs uppercase font-bold text-slate-400 tracking-wider">Email Korespondensi Resmi</span>
                    <p className="font-semibold text-white mt-0.5 break-all">{profile.email}</p>
                    <p className="text-xs text-slate-400">Pengiriman RFP, TOR, dan layout teknis</p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="w-9 h-9 rounded-lg bg-slate-800 flex items-center justify-center text-amber-400 shrink-0 mt-0.5">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="block text-xs uppercase font-bold text-slate-400 tracking-wider">Jam Operasional Kantor</span>
                    <p className="font-semibold text-white mt-0.5">{profile.operatingHours}</p>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-slate-800/80">
                <a
                  href={`https://wa.me/${profile.phone.replace(/[^0-9]/g, '')}?text=Halo%20Admin%20Bintang%20Inovasi%20Media,%20saya%20ingin%20jadwalkan%20survei%20lokasi`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-sm flex items-center justify-center gap-2 transition"
                >
                  <Phone className="w-4 h-4 fill-slate-950" />
                  <span>Jadwalkan Survei Venue Gratis</span>
                </a>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
