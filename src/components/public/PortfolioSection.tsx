import React, { useState } from 'react';
import { PortfolioItem } from '../../types';
import { MapPin, Users, Calendar, Award, X, Sparkles } from 'lucide-react';

interface PortfolioSectionProps {
  portfolio: PortfolioItem[];
}

export const PortfolioSection: React.FC<PortfolioSectionProps> = ({ portfolio }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('Semua');
  const [activeModalItem, setActiveModalItem] = useState<PortfolioItem | null>(null);

  const categories = [
    'Semua',
    'Konser Musik',
    'Corporate Gathering',
    'Festival Budaya',
    'Pameran & Expo',
    'Pernikahan Akbar'
  ];

  const filteredItems = selectedCategory === 'Semua'
    ? portfolio
    : portfolio.filter(item => item.category === selectedCategory);

  return (
    <section id="portfolio" className="py-24 bg-slate-950 border-t border-slate-800/60 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-bold uppercase tracking-wider mb-3">
            <span>Rekam Jejak & Portofolio Event</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white leading-tight">
            Koleksi Event Spektakuler yang Sukses Kami Eksekusi
          </h2>
          <p className="text-slate-400 mt-4 text-sm sm:text-base leading-relaxed">
            Mulai dari konser stadion puluhan ribu penonton hingga gala dinner korporat VIP bertaraf kenegaraan.
          </p>
        </div>

        {/* Category Filter Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                selectedCategory === cat
                  ? 'bg-amber-500 text-slate-950 shadow-lg shadow-amber-500/20'
                  : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-white hover:border-slate-700'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Grid Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              onClick={() => setActiveModalItem(item)}
              className="group cursor-pointer rounded-2xl bg-slate-900/60 border border-slate-800/80 hover:border-amber-500/60 overflow-hidden transition-all duration-300 hover:shadow-2xl hover:shadow-amber-500/10 flex flex-col justify-between"
            >
              <div className="h-56 sm:h-64 overflow-hidden relative">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />
                
                <span className="absolute top-3 right-3 text-[11px] font-bold uppercase px-3 py-1 rounded-full bg-slate-950/85 backdrop-blur-md text-amber-400 border border-slate-800">
                  {item.category}
                </span>

                {item.featured && (
                  <span className="absolute top-3 left-3 text-[10px] font-bold uppercase px-2.5 py-1 rounded-md bg-amber-500 text-slate-950 flex items-center gap-1 shadow-md">
                    <Sparkles className="w-3 h-3 fill-slate-950" /> Highlight
                  </span>
                )}
              </div>

              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-lg font-bold text-white group-hover:text-amber-400 transition-colors mb-2 leading-snug">
                    {item.title}
                  </h3>
                  <p className="text-xs text-slate-400 line-clamp-2 mb-4 leading-relaxed">
                    {item.desc}
                  </p>
                </div>

                <div className="space-y-2 pt-3 border-t border-slate-800/80 text-[11px] text-slate-400">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                    <span className="truncate">{item.location}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                    <span>{item.audienceSize}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Portfolio Detail Modal */}
      {activeModalItem && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-700/80 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 relative animate-in fade-in zoom-in-95 duration-200">
            <button
              onClick={() => setActiveModalItem(null)}
              className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white rounded-lg bg-slate-800 z-10"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="rounded-xl overflow-hidden mb-6 border border-slate-800 relative h-64 sm:h-72">
              <img
                src={activeModalItem.image}
                alt={activeModalItem.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-3 left-3">
                <span className="text-xs font-bold uppercase px-3 py-1.5 rounded-lg bg-amber-500 text-slate-950">
                  {activeModalItem.category}
                </span>
              </div>
            </div>

            <h3 className="text-2xl font-black text-white mb-3">
              {activeModalItem.title}
            </h3>

            <p className="text-slate-300 text-sm leading-relaxed mb-6">
              {activeModalItem.desc}
            </p>

            <div className="grid grid-cols-2 gap-4 p-4 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-300 mb-6">
              <div>
                <span className="text-slate-400 block mb-0.5">Klien / Penyelenggara:</span>
                <span className="font-bold text-white">{activeModalItem.client}</span>
              </div>
              <div>
                <span className="text-slate-400 block mb-0.5">Waktu Pelaksanaan:</span>
                <span className="font-bold text-white flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5 text-amber-400" /> {activeModalItem.date}
                </span>
              </div>
              <div>
                <span className="text-slate-400 block mb-0.5">Lokasi / Venue:</span>
                <span className="font-bold text-white flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-amber-400" /> {activeModalItem.location}
                </span>
              </div>
              <div>
                <span className="text-slate-400 block mb-0.5">Skala Audiens:</span>
                <span className="font-bold text-amber-400 flex items-center gap-1">
                  <Users className="w-3.5 h-3.5" /> {activeModalItem.audienceSize}
                </span>
              </div>
            </div>

            {activeModalItem.highlights && activeModalItem.highlights.length > 0 && (
              <div className="mb-6">
                <h4 className="text-xs uppercase font-bold text-slate-400 mb-3 tracking-wider flex items-center gap-1.5">
                  <Award className="w-4 h-4 text-amber-400" /> Spesifikasi Produksi yang Digunakan:
                </h4>
                <div className="flex flex-wrap gap-2">
                  {activeModalItem.highlights.map((h, i) => (
                    <span
                      key={i}
                      className="px-3 py-1.5 rounded-lg bg-slate-800 text-amber-300 text-xs font-medium border border-slate-700"
                    >
                      {h}
                    </span>
                  ))}
                </div>
              </div>
            )}

            <div className="pt-4 border-t border-slate-800 flex justify-end">
              <a
                href="#contact"
                onClick={() => setActiveModalItem(null)}
                className="px-6 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs transition"
              >
                Ingin Produksi Serupa? Hubungi Kami
              </a>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
