import React, { useState } from 'react';
import { X, Calculator, ArrowRight, Check } from 'lucide-react';

interface QuoteEstimatorModalProps {
  isOpen: boolean;
  onClose: () => void;
  onApplyEstimate: (estimatedText: string) => void;
  phone: string;
}

export const QuoteEstimatorModal: React.FC<QuoteEstimatorModalProps> = ({
  isOpen,
  onClose,
  onApplyEstimate,
  phone
}) => {
  const [eventType, setEventType] = useState('Konser Musik / Festival');
  const [audienceCount, setAudienceCount] = useState('1.000 - 3.000');
  const [stageSize, setStageSize] = useState('10 x 8 Meter (Rigging)');
  const [soundWattage, setSoundWattage] = useState('20.000 Watt Line Array');
  const [ledVideotron, setLedVideotron] = useState('Indoor/Outdoor 6 x 3 Meter');
  const [lightingPackage, setLightingPackage] = useState('Paket Standard (16 Moving Head + Par LED)');
  const [needsGenset, setNeedsGenset] = useState(true);

  if (!isOpen) return null;

  // Compute ballpark budget estimate
  let basePrice = 25000000;
  if (eventType === 'Konser Musik / Festival') basePrice += 20000000;
  if (stageSize.includes('12 x 10') || stageSize.includes('18 x 14')) basePrice += 15000000;
  if (soundWattage.includes('40.000') || soundWattage.includes('60.000')) basePrice += 18000000;
  if (ledVideotron.includes('8 x 4') || ledVideotron.includes('10 x 5')) basePrice += 16000000;
  if (needsGenset) basePrice += 4500000;

  const minBudget = (basePrice * 0.9).toLocaleString('id-ID');
  const maxBudget = (basePrice * 1.25).toLocaleString('id-ID');

  const generatedSummary = `[Hasil Estimator Web]
• Jenis Event: ${eventType}
• Estimasi Audiens: ${audienceCount} orang
• Panggung: ${stageSize}
• Sound System: ${soundWattage}
• LED Videotron: ${ledVideotron}
• Tata Cahaya: ${lightingPackage}
• Genset Mandiri: ${needsGenset ? 'Ya (Silent Generator)' : 'Tidak (Listrik Venue)'}
• Kisaran Estimasi: Rp ${minBudget} - Rp ${maxBudget}`;

  const handleApplyToForm = () => {
    onApplyEstimate(generatedSummary);
    onClose();
  };

  const handleSendToWhatsApp = () => {
    const clean = phone.replace(/[^0-9]/g, '');
    const encoded = encodeURIComponent(`Halo Bintang Inovasi Media, saya menghitung estimasi kebutuhan event melalui website:\n\n${generatedSummary}\n\nMohon dicek ketersediaan jadwal dan penawaran resminya.`);
    window.open(`https://wa.me/${clean}?text=${encoded}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-slate-700/80 rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 relative animate-in fade-in zoom-in-95 duration-200">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 text-slate-400 hover:text-white rounded-xl bg-slate-800"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-center">
            <Calculator className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-xl sm:text-2xl font-black text-white">Kalkulator Estimasi Produksi Event</h3>
            <p className="text-xs sm:text-sm text-slate-400">Rancang spesifikasi teknis dan ketahui kisaran anggaran dalam hitungan detik</p>
          </div>
        </div>

        {/* Options */}
        <div className="space-y-4 text-xs sm:text-sm mb-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-slate-300 font-bold mb-1.5">Tipe / Jenis Acara</label>
              <select
                value={eventType}
                onChange={(e) => setEventType(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-amber-400"
              >
                <option>Konser Musik / Festival</option>
                <option>Corporate Gathering / Gala Dinner</option>
                <option>Konferensi / Seminar Internasional</option>
                <option>Pameran / Expo Produk</option>
                <option>Pernikahan Akbar / Wedding</option>
              </select>
            </div>

            <div>
              <label className="block text-slate-300 font-bold mb-1.5">Target Jumlah Penonton / Audiens</label>
              <select
                value={audienceCount}
                onChange={(e) => setAudienceCount(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-amber-400"
              >
                <option>300 - 1.000 orang</option>
                <option>1.000 - 3.000 orang</option>
                <option>3.000 - 8.000 orang</option>
                <option>8.000 - 20.000+ orang</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-slate-300 font-bold mb-1.5">Ukuran Panggung (Stage & Rigging)</label>
              <select
                value={stageSize}
                onChange={(e) => setStageSize(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-amber-400"
              >
                <option>6 x 4 Meter (Mini Stage)</option>
                <option>8 x 6 Meter (Standard)</option>
                <option>10 x 8 Meter (Rigging)</option>
                <option>12 x 10 Meter (Festival Stage)</option>
                <option>18 x 14 Meter (Mega Concert Stage)</option>
              </select>
            </div>

            <div>
              <label className="block text-slate-300 font-bold mb-1.5">Kapasitas Sound System</label>
              <select
                value={soundWattage}
                onChange={(e) => setSoundWattage(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-amber-400"
              >
                <option>10.000 Watt Sound System</option>
                <option>20.000 Watt Line Array</option>
                <option>40.000 Watt Line Array Concert</option>
                <option>60.000 - 100.000 Watt Stadium Sound</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-slate-300 font-bold mb-1.5">Layar LED Videotron</label>
              <select
                value={ledVideotron}
                onChange={(e) => setLedVideotron(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-amber-400"
              >
                <option>Tidak Menggunakan LED</option>
                <option>Indoor/Outdoor 4 x 2.5 Meter</option>
                <option>Indoor/Outdoor 6 x 3 Meter</option>
                <option>Indoor/Outdoor 8 x 4 Meter</option>
                <option>Mega Screen 12 x 5 Meter Curved</option>
              </select>
            </div>

            <div>
              <label className="block text-slate-300 font-bold mb-1.5">Tata Cahaya (Lighting & Effects)</label>
              <select
                value={lightingPackage}
                onChange={(e) => setLightingPackage(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-amber-400"
              >
                <option>Paket Minimalis (Par LED + Spot)</option>
                <option>Paket Standard (16 Moving Head + Par LED)</option>
                <option>Paket Spektakuler (32 Moving Head + Laser + Co2 Jet)</option>
                <option>Paket Konser Kolosal (48+ Moving Head + FX Stadium)</option>
              </select>
            </div>
          </div>

          <div className="flex items-center gap-3 pt-2">
            <input
              type="checkbox"
              id="genset-checkbox"
              checked={needsGenset}
              onChange={(e) => setNeedsGenset(e.target.checked)}
              className="w-4 h-4 text-amber-500 rounded border-slate-800 focus:ring-amber-500 bg-slate-950"
            />
            <label htmlFor="genset-checkbox" className="text-xs text-slate-300 cursor-pointer">
              Sertakan Genset Silent Diesel Mandiri (60kVA - 150kVA) lengkap dengan solar industri & kabel induk
            </label>
          </div>
        </div>

        {/* Estimated Price Card */}
        <div className="p-5 rounded-2xl bg-gradient-to-r from-amber-500/10 via-amber-500/5 to-slate-950 border border-amber-500/30 mb-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <span className="text-[11px] uppercase tracking-wider font-bold text-amber-400 block">
                Perkiraan Nilai Investasi Produksi:
              </span>
              <div className="text-xl sm:text-2xl font-black text-white mt-0.5">
                Rp {minBudget} - Rp {maxBudget}
              </div>
              <span className="text-[11px] text-slate-400 block mt-1">
                *Estimasi dapat disesuaikan dengan durasi hari event dan lokasi venue luar kota.
              </span>
            </div>

            <div className="space-y-1.5 text-xs text-slate-300">
              <span className="flex items-center gap-1.5">
                <Check className="w-3.5 h-3.5 text-emerald-400" /> Bebas Biaya Survei Venue
              </span>
              <span className="flex items-center gap-1.5">
                <Check className="w-3.5 h-3.5 text-emerald-400" /> Teknisi & Kru Standby 24 Jam
              </span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3">
          <button
            onClick={handleApplyToForm}
            className="flex-1 py-3 px-4 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs sm:text-sm transition flex items-center justify-center gap-2"
          >
            <span>Terapkan ke Formulir Penawaran</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <button
            onClick={handleSendToWhatsApp}
            className="py-3 px-5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs sm:text-sm transition flex items-center justify-center gap-2"
          >
            <span>Kirim Estimasi ke WhatsApp</span>
          </button>
        </div>
      </div>
    </div>
  );
};
