import React, { useState } from 'react';
import { ServiceItem } from '../../types';
import { 
  Layers, 
  Volume2, 
  Sparkles, 
  MonitorPlay, 
  Zap, 
  Radio, 
  Check, 
  ChevronRight, 
  X,
  ArrowUpRight
} from 'lucide-react';

interface ServicesSectionProps {
  services: ServiceItem[];
  onSelectServiceForInquiry: (serviceTitle: string) => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({ services, onSelectServiceForInquiry }) => {
  const [selectedService, setSelectedService] = useState<ServiceItem | null>(null);

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Layers': return <Layers className="w-6 h-6" />;
      case 'Volume2': return <Volume2 className="w-6 h-6" />;
      case 'Sparkles': return <Sparkles className="w-6 h-6" />;
      case 'MonitorPlay': return <MonitorPlay className="w-6 h-6" />;
      case 'Zap': return <Zap className="w-6 h-6" />;
      case 'Radio': return <Radio className="w-6 h-6" />;
      default: return <Sparkles className="w-6 h-6" />;
    }
  };

  return (
    <section id="services" className="py-24 bg-slate-900 border-t border-slate-800/60 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-bold uppercase tracking-wider mb-3">
            <span>Daftar Layanan Teknis Produksi</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white leading-tight">
            Peralatan Standar Internasional & Tim Ahli Bersertifikasi
          </h2>
          <p className="text-slate-400 mt-4 text-sm sm:text-base leading-relaxed">
            Dari panggung megah konser terbuka hingga audio visual konferensi berkelas, kami menyediakan solusi terintegrasi tanpa kompromi.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {services.map((item) => (
            <div
              key={item.id}
              className="group relative bg-slate-950/80 rounded-2xl border border-slate-800 hover:border-amber-500/50 transition-all duration-300 flex flex-col justify-between overflow-hidden hover:shadow-2xl hover:shadow-amber-500/10"
            >
              {/* Optional Thumbnail Image */}
              {item.image && (
                <div className="h-44 w-full overflow-hidden relative">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
                  <span className="absolute top-3 right-3 text-[11px] font-bold uppercase px-2.5 py-1 rounded bg-slate-950/80 backdrop-blur-sm text-amber-400 border border-slate-700">
                    {item.category}
                  </span>
                </div>
              )}

              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-center mb-5 group-hover:bg-amber-500 group-hover:text-slate-950 transition-colors">
                    {getIcon(item.icon)}
                  </div>

                  <h3 className="text-lg sm:text-xl font-bold text-white mb-2 group-hover:text-amber-400 transition-colors">
                    {item.title}
                  </h3>

                  <p className="text-slate-400 text-xs sm:text-sm leading-relaxed mb-5">
                    {item.shortDesc}
                  </p>

                  {/* Feature Checkpoints */}
                  <div className="space-y-2 mb-6">
                    {item.features.slice(0, 3).map((feat, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-xs text-slate-300">
                        <Check className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] uppercase font-bold text-slate-400 block tracking-wider">Perkiraan Biaya</span>
                    <span className="text-xs font-semibold text-amber-400">{item.estimatedPrice}</span>
                  </div>

                  <button
                    onClick={() => setSelectedService(item)}
                    className="text-xs font-bold text-white group-hover:text-amber-400 flex items-center gap-1 hover:underline"
                  >
                    <span>Detail Spek</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Detail Specification Modal */}
      {selectedService && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-700/80 rounded-2xl max-w-xl w-full p-6 sm:p-8 max-h-[90vh] overflow-y-auto relative animate-in fade-in duration-200">
            <button
              onClick={() => setSelectedService(null)}
              className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white rounded-lg bg-slate-800"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-lg bg-amber-500/10 text-amber-400 flex items-center justify-center">
                {getIcon(selectedService.icon)}
              </div>
              <div>
                <span className="text-xs uppercase font-bold text-amber-400 tracking-wider">
                  {selectedService.category}
                </span>
                <h3 className="text-xl font-bold text-white">{selectedService.title}</h3>
              </div>
            </div>

            {selectedService.image && (
              <img
                src={selectedService.image}
                alt={selectedService.title}
                className="w-full h-48 object-cover rounded-xl mb-5 border border-slate-800"
              />
            )}

            <p className="text-sm text-slate-300 leading-relaxed mb-5">
              {selectedService.fullDesc}
            </p>

            <div className="mb-5">
              <h4 className="text-xs uppercase font-bold text-slate-400 mb-3 tracking-wider">
                Kelengkapan & Fitur Paket:
              </h4>
              <ul className="space-y-2">
                {selectedService.features.map((feat, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-xs text-slate-200">
                    <Check className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-300 mb-6">
              <span className="font-bold text-amber-400 block mb-1">Spesifikasi Teknis:</span>
              <p>{selectedService.specs}</p>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-slate-800">
              <div>
                <span className="text-[10px] uppercase font-bold text-slate-400 block">Estimasi Investasi</span>
                <span className="text-sm font-bold text-amber-400">{selectedService.estimatedPrice}</span>
              </div>

              <button
                onClick={() => {
                  const title = selectedService.title;
                  setSelectedService(null);
                  onSelectServiceForInquiry(title);
                }}
                className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs flex items-center gap-1.5 transition"
              >
                <span>Pilih Layanan Ini</span>
                <ArrowUpRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
