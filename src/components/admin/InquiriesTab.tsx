import React, { useState } from 'react';
import { InquiryItem } from '../../types';
import { 
  Inbox, 
  MessageSquare, 
  Phone, 
  Calendar, 
  MapPin, 
  Trash2, 
  Download, 
  Search, 
  Filter, 
  Clock, 
  CheckCircle,
  FileSpreadsheet,
  AlertCircle
} from 'lucide-react';
import { exportInquiriesToCSV } from '../../utils/storage';

interface InquiriesTabProps {
  inquiries: InquiryItem[];
  companyName: string;
  onUpdateInquiry: (updated: InquiryItem) => void;
  onDeleteInquiry: (id: string) => void;
}

export const InquiriesTab: React.FC<InquiriesTabProps> = ({
  inquiries,
  companyName,
  onUpdateInquiry,
  onDeleteInquiry
}) => {
  const [statusFilter, setStatusFilter] = useState<string>('semua');
  const [searchQuery, setSearchQuery] = useState('');
  const [editingNotesId, setEditingNotesId] = useState<string | null>(null);
  const [notesDraft, setNotesDraft] = useState('');

  const filteredInquiries = inquiries.filter(item => {
    const matchStatus = statusFilter === 'semua' || item.status === statusFilter;
    const matchSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.phone.includes(searchQuery) ||
      item.eventType.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.message.toLowerCase().includes(searchQuery.toLowerCase());
    return matchStatus && matchSearch;
  });

  const handleStatusChange = (item: InquiryItem, newStatus: InquiryItem['status']) => {
    onUpdateInquiry({ ...item, status: newStatus });
  };

  const startEditNotes = (item: InquiryItem) => {
    setEditingNotesId(item.id);
    setNotesDraft(item.adminNotes || '');
  };

  const saveNotes = (item: InquiryItem) => {
    onUpdateInquiry({ ...item, adminNotes: notesDraft });
    setEditingNotesId(null);
  };

  const openWhatsAppDirect = (item: InquiryItem) => {
    const clean = item.phone.replace(/[^0-9]/g, '');
    const messageTemplate = `Halo ${item.name},\n\nTerima kasih telah menghubungi ${companyName} terkait penawaran produksi event:\n• Jenis Acara: ${item.eventType}\n• Tanggal Rencana: ${item.eventDate}\n• Lokasi: ${item.location}\n\nKami siap memberikan solusi panggung rigging, sound system line array, lighting, dan multimedia terbaik. Boleh kami minta waktu untuk berdiskusi sebentar mengenai rundown dan layout panggung?`;
    window.open(`https://wa.me/${clean}?text=${encodeURIComponent(messageTemplate)}`, '_blank');
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2.5">
            <h2 className="text-2xl font-black text-white">Pesan & Permintaan Penawaran (CRM)</h2>
            <span className="px-2.5 py-0.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-bold">
              {inquiries.length} Total Masuk
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Kelola prospek calon klien, tindak lanjut penawaran via WhatsApp direct, dan status kesepakatan event.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => exportInquiriesToCSV(inquiries, companyName)}
            className="px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center gap-2 transition shadow"
            title="Download CSV untuk dibuka di Google Sheets atau Excel"
          >
            <FileSpreadsheet className="w-4 h-4" />
            <span>Ekspor Format Google Sheets (.CSV)</span>
          </button>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Cari nama klien, WhatsApp, atau jenis event..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-slate-900 border border-slate-800 rounded-xl pl-9 pr-4 py-2 text-white text-xs sm:text-sm focus:outline-none focus:border-amber-400"
          />
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {['semua', 'baru', 'dihubungi', 'deal', 'selesai'].map((st) => (
            <button
              key={st}
              onClick={() => setStatusFilter(st)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold capitalize transition ${
                statusFilter === st
                  ? 'bg-amber-500 text-slate-950 font-bold'
                  : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
              }`}
            >
              {st === 'semua' ? 'Semua Status' : st}
            </button>
          ))}
        </div>
      </div>

      {/* Inquiries Table / Cards */}
      {filteredInquiries.length === 0 ? (
        <div className="p-12 text-center rounded-2xl bg-slate-900/40 border border-slate-800 text-slate-400 text-xs">
          Tidak ada penawaran yang sesuai dengan filter.
        </div>
      ) : (
        <div className="space-y-4">
          {filteredInquiries.map((item) => (
            <div
              key={item.id}
              className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-slate-700 transition space-y-4"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-800/80">
                <div className="flex items-center gap-3">
                  <span className="w-9 h-9 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center font-bold text-sm">
                    {item.name.charAt(0).toUpperCase()}
                  </span>
                  <div>
                    <h4 className="text-base font-bold text-white leading-tight">{item.name}</h4>
                    <span className="text-[11px] text-slate-400 flex items-center gap-1.5 mt-0.5">
                      <Clock className="w-3 h-3 text-slate-500" /> Masuk: {item.createdAt}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <select
                    value={item.status}
                    onChange={(e: any) => handleStatusChange(item, e.target.value)}
                    className={`text-xs font-bold px-3 py-1.5 rounded-lg border focus:outline-none ${
                      item.status === 'baru'
                        ? 'bg-amber-500/15 text-amber-400 border-amber-500/30'
                        : item.status === 'dihubungi'
                        ? 'bg-blue-500/15 text-blue-400 border-blue-500/30'
                        : item.status === 'deal'
                        ? 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30'
                        : 'bg-slate-800 text-slate-400 border-slate-700'
                    }`}
                  >
                    <option value="baru">Status: BARU</option>
                    <option value="dihubungi">Status: SEDANG DIHUBUNGI</option>
                    <option value="deal">Status: DEAL / TERKONFIRMASI</option>
                    <option value="selesai">Status: SELESAI</option>
                  </select>

                  <button
                    onClick={() => {
                      if (confirm(`Hapus data penawaran dari "${item.name}"?`)) {
                        onDeleteInquiry(item.id);
                      }
                    }}
                    className="p-1.5 rounded-lg bg-red-500/10 text-red-400 hover:bg-red-500 hover:text-white transition"
                    title="Hapus Penawaran"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Event Details Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs bg-slate-950 p-3.5 rounded-xl border border-slate-800">
                <div>
                  <span className="text-slate-400 block mb-0.5">Jenis Event:</span>
                  <span className="font-bold text-white">{item.eventType}</span>
                </div>
                <div>
                  <span className="text-slate-400 block mb-0.5">Rencana Tanggal:</span>
                  <span className="font-bold text-white flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 text-amber-400" /> {item.eventDate}
                  </span>
                </div>
                <div>
                  <span className="text-slate-400 block mb-0.5">Lokasi / Venue:</span>
                  <span className="font-bold text-white flex items-center gap-1 truncate">
                    <MapPin className="w-3.5 h-3.5 text-amber-400 shrink-0" /> {item.location}
                  </span>
                </div>
                <div>
                  <span className="text-slate-400 block mb-0.5">Estimasi Anggaran:</span>
                  <span className="font-bold text-amber-400">{item.budgetRange}</span>
                </div>
              </div>

              {/* Message Content */}
              <div className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800/80 text-xs text-slate-300">
                <span className="text-[10px] uppercase font-bold text-slate-400 block mb-1">
                  Pesan & Spesifikasi Teknis yang Diminta Klien:
                </span>
                <p className="whitespace-pre-line leading-relaxed">{item.message}</p>
              </div>

              {/* Internal Notes & Follow-up Action */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-1">
                {/* Notes */}
                <div className="flex-1 text-xs">
                  {editingNotesId === item.id ? (
                    <div className="flex items-center gap-2">
                      <input
                        type="text"
                        value={notesDraft}
                        onChange={(e) => setNotesDraft(e.target.value)}
                        placeholder="Tulis catatan follow-up internal..."
                        className="flex-1 bg-slate-950 border border-slate-700 rounded-lg px-3 py-1.5 text-white text-xs focus:outline-none"
                      />
                      <button
                        onClick={() => saveNotes(item)}
                        className="px-3 py-1.5 rounded-lg bg-amber-500 text-slate-950 font-bold text-xs"
                      >
                        Simpan
                      </button>
                      <button
                        onClick={() => setEditingNotesId(null)}
                        className="px-2 py-1.5 rounded-lg bg-slate-800 text-slate-300 text-xs"
                      >
                        Batal
                      </button>
                    </div>
                  ) : (
                    <div
                      onClick={() => startEditNotes(item)}
                      className="cursor-pointer text-slate-400 hover:text-slate-200 flex items-center gap-1.5"
                    >
                      <span className="font-semibold text-amber-400/90">Catatan Internal:</span>
                      <span className="italic">{item.adminNotes || 'Klik di sini untuk menambah catatan follow up...'}</span>
                    </div>
                  )}
                </div>

                {/* WhatsApp Action Button */}
                <button
                  onClick={() => openWhatsAppDirect(item)}
                  className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center justify-center gap-2 transition shrink-0"
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>Balas via WhatsApp Direct ({item.phone})</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

    </div>
  );
};
