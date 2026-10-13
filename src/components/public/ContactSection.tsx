import React, { useState } from 'react';
import { CompanyProfile, InquiryItem } from '../../types';
import { Send, CheckCircle2, MessageSquare, Phone, MapPin, Mail, Sparkles } from 'lucide-react';

interface ContactSectionProps {
  profile: CompanyProfile;
  initialMessage?: string;
  initialEventType?: string;
  onSubmitInquiry: (inquiry: Omit<InquiryItem, 'id' | 'createdAt' | 'status' | 'adminNotes'>) => void;
}

export const ContactSection: React.FC<ContactSectionProps> = ({
  profile,
  initialMessage = '',
  initialEventType = '',
  onSubmitInquiry
}) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [eventType, setEventType] = useState(initialEventType || 'Konser Musik / Pertunjukan');
  const [eventDate, setEventDate] = useState('');
  const [location, setLocation] = useState('');
  const [budgetRange, setBudgetRange] = useState('Rp 25.000.000 - Rp 50.000.000');
  const [message, setMessage] = useState(initialMessage);
  const [submitted, setSubmitted] = useState(false);

  // Sync if initial props change
  React.useEffect(() => {
    if (initialMessage) setMessage(initialMessage);
    if (initialEventType) setEventType(initialEventType);
  }, [initialMessage, initialEventType]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim() || !message.trim()) return;

    onSubmitInquiry({
      name,
      phone,
      email,
      eventType,
      eventDate: eventDate || 'Akan dikonfirmasi',
      location: location || 'Jakarta & Sekitarnya',
      budgetRange,
      message
    });

    setSubmitted(true);
  };

  const handleReset = () => {
    setName('');
    setPhone('');
    setEmail('');
    setEventDate('');
    setLocation('');
    setMessage('');
    setSubmitted(false);
  };

  const cleanPhone = profile.phone.replace(/[^0-9]/g, '');

  return (
    <section id="contact" className="py-24 bg-slate-900 border-t border-slate-800/60 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Left Column: Context & Contact Points */}
          <div className="lg:col-span-5 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-bold uppercase tracking-wider">
              <span>Konsultasi & Penawaran</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-black text-white leading-tight">
              Siap Mewujudkan Event Impian Anda?
            </h2>

            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              Kirimkan rincian kebutuhan teknis acara Anda, tim konsultan produksi kami akan menyusun proposal penawaran resmi, technical rider, dan skema layout panggung dalam waktu 1x24 jam.
            </p>

            <div className="p-6 rounded-2xl bg-slate-950 border border-slate-800 space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs text-slate-400 block font-medium">WhatsApp Respon Cepat (Hotline):</span>
                  <a
                    href={`https://wa.me/${cleanPhone}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-bold text-amber-400 hover:underline text-base"
                  >
                    {profile.phone}
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs text-slate-400 block font-medium">Email Penawaran & Tender:</span>
                  <a
                    href={`mailto:${profile.email}`}
                    className="font-semibold text-white hover:underline text-sm break-all"
                  >
                    {profile.email}
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs text-slate-400 block font-medium">Workshop & Warehouse:</span>
                  <p className="font-semibold text-white text-xs">{profile.address}, {profile.city}</p>
                </div>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-amber-500/5 border border-amber-500/20 text-xs text-slate-300 flex items-start gap-3">
              <Sparkles className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
              <span>
                <strong>Jaminan Bintang Inovasi Media:</strong> Seluruh peralatan diservis berkala, uji fungsi pra-event di workshop, dan teknisi berseragam rapi standby di lokasi.
              </span>
            </div>
          </div>

          {/* Right Column: Inquiry Form */}
          <div className="lg:col-span-7">
            <div className="p-7 sm:p-9 rounded-3xl bg-slate-950 border border-slate-800 shadow-2xl relative">
              {submitted ? (
                <div className="py-12 text-center space-y-4 animate-in fade-in duration-300">
                  <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 flex items-center justify-center mx-auto mb-2">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="text-2xl font-black text-white">Permintaan Penawaran Berhasil Dikirim!</h3>
                  <p className="text-slate-300 text-sm max-w-md mx-auto leading-relaxed">
                    Terima kasih, data penawaran Anda telah tercatat langsung di sistem kami. Tim teknis Bintang Inovasi Media akan segera menghubungi Anda melalui nomor WhatsApp yang terdaftar.
                  </p>
                  <div className="pt-4 flex flex-col sm:flex-row justify-center gap-3">
                    <a
                      href={`https://wa.me/${cleanPhone}?text=Halo%20Bintang%20Inovasi%20Media,%20saya%20${encodeURIComponent(name)}%20baru%20saja%20mengirimkan%20penawaran%20event%20di%20website`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2"
                    >
                      <MessageSquare className="w-4 h-4" />
                      <span>Konfirmasi via WhatsApp Sekarang</span>
                    </a>
                    <button
                      onClick={handleReset}
                      className="px-5 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs sm:text-sm font-semibold"
                    >
                      Kirim Penawaran Lain
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                    <h3 className="text-xl font-bold text-white">Formulir Spesifikasi & Penawaran</h3>
                    <span className="text-[11px] text-amber-400 font-semibold">*Respon Cepat 1x24 Jam</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-300 mb-1">
                        Nama Lengkap / Instansi <span className="text-amber-400">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="Contoh: Bpk. Kurniawan (PT Sentosa)"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3.5 py-2.5 text-white text-xs sm:text-sm focus:outline-none focus:border-amber-400"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-300 mb-1">
                        Nomor WhatsApp / HP Aktif <span className="text-amber-400">*</span>
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="Contoh: 0812-xxxx-xxxx"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3.5 py-2.5 text-white text-xs sm:text-sm focus:outline-none focus:border-amber-400"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-300 mb-1">Email Resmi (Opsional)</label>
                      <input
                        type="email"
                        placeholder="nama@perusahaan.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3.5 py-2.5 text-white text-xs sm:text-sm focus:outline-none focus:border-amber-400"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-300 mb-1">Jenis Acara / Event</label>
                      <select
                        value={eventType}
                        onChange={(e) => setEventType(e.target.value)}
                        className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3.5 py-2.5 text-white text-xs sm:text-sm focus:outline-none focus:border-amber-400"
                      >
                        <option>Konser Musik / Pertunjukan</option>
                        <option>Corporate Gathering & Gala Dinner</option>
                        <option>Konferensi & Seminar Internasional</option>
                        <option>Pameran & Exhibition</option>
                        <option>Festival Kebudayaan / Komunitas</option>
                        <option>Pernikahan Akbar (Wedding)</option>
                        <option>Lainnya</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-300 mb-1">Rencana Tanggal Event</label>
                      <input
                        type="date"
                        value={eventDate}
                        onChange={(e) => setEventDate(e.target.value)}
                        className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3.5 py-2.5 text-white text-xs sm:text-sm focus:outline-none focus:border-amber-400"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-300 mb-1">Estimasi Anggaran (Budget)</label>
                      <select
                        value={budgetRange}
                        onChange={(e) => setBudgetRange(e.target.value)}
                        className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3.5 py-2.5 text-white text-xs sm:text-sm focus:outline-none focus:border-amber-400"
                      >
                        <option>Di bawah Rp 15.000.000</option>
                        <option>Rp 15.000.000 - Rp 35.000.000</option>
                        <option>Rp 35.000.000 - Rp 70.000.000</option>
                        <option>Rp 70.000.000 - Rp 150.000.000</option>
                        <option>Di atas Rp 150.000.000 (Mega Event)</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-1">Lokasi / Venue Acara</label>
                    <input
                      type="text"
                      placeholder="Contoh: Grand Ballroom JCC Senayan / Lapangan Gasibu Bandung"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3.5 py-2.5 text-white text-xs sm:text-sm focus:outline-none focus:border-amber-400"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-1">
                      Rincian Kebutuhan & Spesifikasi Event <span className="text-amber-400">*</span>
                    </label>
                    <textarea
                      required
                      rows={4}
                      placeholder="Jelaskan kebutuhan panggung, sound system (watt), LED videotron (ukuran), lighting, genset, atau kebutuhan artis..."
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3.5 py-2.5 text-white text-xs sm:text-sm focus:outline-none focus:border-amber-400 leading-relaxed"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-black text-sm shadow-xl shadow-amber-500/20 transition-all flex items-center justify-center gap-2 mt-2"
                  >
                    <Send className="w-4 h-4" />
                    <span>Kirim Permintaan Penawaran Resmi</span>
                  </button>
                </form>
              )}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
