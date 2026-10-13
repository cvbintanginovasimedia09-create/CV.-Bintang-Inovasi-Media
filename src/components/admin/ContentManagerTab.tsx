import React, { useState } from 'react';
import { CompanyProfile, ServiceItem, PortfolioItem, MediaItem } from '../../types';
import { 
  Building2, 
  Layers, 
  Image as ImageIcon, 
  Plus, 
  Trash2, 
  Edit3, 
  Save, 
  Upload, 
  Check, 
  Sparkles,
  X
} from 'lucide-react';
import { processDeviceFileUpload } from '../../utils/storage';

interface ContentManagerTabProps {
  profile: CompanyProfile;
  services: ServiceItem[];
  portfolio: PortfolioItem[];
  mediaLibrary: MediaItem[];
  onSaveProfile: (updatedProfile: CompanyProfile) => void;
  onSaveServices: (updatedServices: ServiceItem[]) => void;
  onSavePortfolio: (updatedPortfolio: PortfolioItem[]) => void;
  onAddMediaItem: (media: MediaItem) => void;
}

export const ContentManagerTab: React.FC<ContentManagerTabProps> = ({
  profile,
  services,
  portfolio,
  mediaLibrary,
  onSaveProfile,
  onSaveServices,
  onSavePortfolio,
  onAddMediaItem
}) => {
  const [subTab, setSubTab] = useState<'profile' | 'services' | 'portfolio'>('profile');

  // Profile Form state
  const [profileForm, setProfileForm] = useState<CompanyProfile>(profile);
  const [profileSavedFeedback, setProfileSavedFeedback] = useState(false);

  // Service Modal state
  const [editingService, setEditingService] = useState<ServiceItem | null>(null);
  const [isServiceModalOpen, setIsServiceModalOpen] = useState(false);

  // Portfolio Modal state
  const [editingPortfolio, setEditingPortfolio] = useState<PortfolioItem | null>(null);
  const [isPortfolioModalOpen, setIsPortfolioModalOpen] = useState(false);

  // Handle Profile Save
  const handleProfileSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSaveProfile(profileForm);
    setProfileSavedFeedback(true);
    setTimeout(() => setProfileSavedFeedback(false), 3000);
  };

  // Service Handlers
  const openNewServiceModal = () => {
    setEditingService({
      id: 'srv-' + Date.now(),
      title: '',
      icon: 'Layers',
      category: 'Sound System',
      shortDesc: '',
      fullDesc: '',
      features: ['Spesifikasi A', 'Spesifikasi B'],
      specs: '',
      estimatedPrice: 'Mulai Rp 5.000.000',
      featured: false,
      image: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=800'
    });
    setIsServiceModalOpen(true);
  };

  const openEditServiceModal = (item: ServiceItem) => {
    setEditingService({ ...item });
    setIsServiceModalOpen(true);
  };

  const handleSaveService = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingService) return;

    const exists = services.some(s => s.id === editingService.id);
    let updated: ServiceItem[];
    if (exists) {
      updated = services.map(s => s.id === editingService.id ? editingService : s);
    } else {
      updated = [...services, editingService];
    }
    onSaveServices(updated);
    setIsServiceModalOpen(false);
  };

  const handleDeleteService = (id: string) => {
    if (window.confirm('Yakin ingin menghapus layanan ini?')) {
      onSaveServices(services.filter(s => s.id !== id));
    }
  };

  // Portfolio Handlers
  const openNewPortfolioModal = () => {
    setEditingPortfolio({
      id: 'port-' + Date.now(),
      title: '',
      category: 'Konser Musik',
      image: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=1000',
      date: '2026',
      client: '',
      location: '',
      audienceSize: '1.000+ Orang',
      desc: '',
      highlights: ['Audio Line Array', 'Lighting Moving Head'],
      featured: false
    });
    setIsPortfolioModalOpen(true);
  };

  const openEditPortfolioModal = (item: PortfolioItem) => {
    setEditingPortfolio({ ...item });
    setIsPortfolioModalOpen(true);
  };

  const handleSavePortfolio = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingPortfolio) return;

    const exists = portfolio.some(p => p.id === editingPortfolio.id);
    let updated: PortfolioItem[];
    if (exists) {
      updated = portfolio.map(p => p.id === editingPortfolio.id ? editingPortfolio : p);
    } else {
      updated = [...portfolio, editingPortfolio];
    }
    onSavePortfolio(updated);
    setIsPortfolioModalOpen(false);
  };

  const handleDeletePortfolio = (id: string) => {
    if (window.confirm('Yakin ingin menghapus portofolio ini?')) {
      onSavePortfolio(portfolio.filter(p => p.id !== id));
    }
  };

  // Upload image from device handler helper
  const handleDeviceUpload = async (
    e: React.ChangeEvent<HTMLInputElement>,
    onUrlReady: (url: string) => void
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      const media = await processDeviceFileUpload(file);
      onAddMediaItem(media);
      onUrlReady(media.url);
      alert(`Foto "${file.name}" berhasil diupload dari perangkat!`);
    } catch (err: any) {
      alert(err.message || 'Gagal mengupload gambar.');
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      
      {/* Sub-tab Navigation */}
      <div className="flex flex-wrap items-center gap-2 border-b border-slate-800 pb-3">
        <button
          onClick={() => setSubTab('profile')}
          className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 transition ${
            subTab === 'profile'
              ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/10'
              : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-white'
          }`}
        >
          <Building2 className="w-4 h-4" />
          <span>Profil & Identitas Perusahaan</span>
        </button>

        <button
          onClick={() => setSubTab('services')}
          className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 transition ${
            subTab === 'services'
              ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/10'
              : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-white'
          }`}
        >
          <Layers className="w-4 h-4" />
          <span>Katalog Layanan Produksi ({services.length})</span>
        </button>

        <button
          onClick={() => setSubTab('portfolio')}
          className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 transition ${
            subTab === 'portfolio'
              ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/10'
              : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-white'
          }`}
        >
          <ImageIcon className="w-4 h-4" />
          <span>Portofolio Event ({portfolio.length})</span>
        </button>
      </div>

      {/* ========================================= */}
      {/* SUB-TAB 1: PROFIL PERUSAHAAN              */}
      {/* ========================================= */}
      {subTab === 'profile' && (
        <form onSubmit={handleProfileSubmit} className="space-y-6 max-w-4xl">
          <div className="flex items-center justify-between pb-2 border-b border-slate-800">
            <div>
              <h3 className="text-xl font-bold text-white">Edit Informasi & Branding Perusahaan</h3>
              <p className="text-xs text-slate-400">Data ini tampil di seluruh website publik dan hasil pencarian Google</p>
            </div>

            {profileSavedFeedback && (
              <span className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 text-xs font-bold animate-in fade-in">
                <Check className="w-4 h-4" /> Tersimpan!
              </span>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1">Nama Perusahaan / Brand Resmi</label>
              <input
                type="text"
                required
                value={profileForm.companyName}
                onChange={(e) => setProfileForm({ ...profileForm, companyName: e.target.value })}
                className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3.5 py-2.5 text-white text-xs sm:text-sm focus:outline-none focus:border-amber-400"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1">Tagline Singkat</label>
              <input
                type="text"
                value={profileForm.tagline}
                onChange={(e) => setProfileForm({ ...profileForm, tagline: e.target.value })}
                className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3.5 py-2.5 text-white text-xs sm:text-sm focus:outline-none focus:border-amber-400"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-300 mb-1">Judul Utama Hero (Headline)</label>
            <input
              type="text"
              required
              value={profileForm.heroHeadline}
              onChange={(e) => setProfileForm({ ...profileForm, heroHeadline: e.target.value })}
              className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3.5 py-2.5 text-white text-xs sm:text-sm focus:outline-none focus:border-amber-400"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-300 mb-1">Sub-judul Hero (Deskripsi Pendek)</label>
            <textarea
              rows={2}
              value={profileForm.heroSubtitle}
              onChange={(e) => setProfileForm({ ...profileForm, heroSubtitle: e.target.value })}
              className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3.5 py-2.5 text-white text-xs sm:text-sm focus:outline-none focus:border-amber-400"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-300 mb-1">Deskripsi Tentang Perusahaan</label>
            <textarea
              rows={4}
              value={profileForm.aboutDescription}
              onChange={(e) => setProfileForm({ ...profileForm, aboutDescription: e.target.value })}
              className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3.5 py-2.5 text-white text-xs sm:text-sm focus:outline-none focus:border-amber-400"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1">Visi Perusahaan</label>
              <textarea
                rows={3}
                value={profileForm.vision}
                onChange={(e) => setProfileForm({ ...profileForm, vision: e.target.value })}
                className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3.5 py-2.5 text-white text-xs sm:text-sm focus:outline-none focus:border-amber-400"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1">Misi Perusahaan</label>
              <textarea
                rows={3}
                value={profileForm.mission}
                onChange={(e) => setProfileForm({ ...profileForm, mission: e.target.value })}
                className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3.5 py-2.5 text-white text-xs sm:text-sm focus:outline-none focus:border-amber-400"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1">Nomor WhatsApp Resmi</label>
              <input
                type="text"
                required
                value={profileForm.phone}
                onChange={(e) => setProfileForm({ ...profileForm, phone: e.target.value })}
                className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3.5 py-2.5 text-white text-xs sm:text-sm focus:outline-none focus:border-amber-400"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1">Email Resmi</label>
              <input
                type="email"
                required
                value={profileForm.email}
                onChange={(e) => setProfileForm({ ...profileForm, email: e.target.value })}
                className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3.5 py-2.5 text-white text-xs sm:text-sm focus:outline-none focus:border-amber-400"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1">Jam Operasional</label>
              <input
                type="text"
                value={profileForm.operatingHours}
                onChange={(e) => setProfileForm({ ...profileForm, operatingHours: e.target.value })}
                className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3.5 py-2.5 text-white text-xs sm:text-sm focus:outline-none focus:border-amber-400"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1">Alamat Kantor / Gudang</label>
              <input
                type="text"
                value={profileForm.address}
                onChange={(e) => setProfileForm({ ...profileForm, address: e.target.value })}
                className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3.5 py-2.5 text-white text-xs sm:text-sm focus:outline-none focus:border-amber-400"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1">Kota</label>
              <input
                type="text"
                value={profileForm.city}
                onChange={(e) => setProfileForm({ ...profileForm, city: e.target.value })}
                className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3.5 py-2.5 text-white text-xs sm:text-sm focus:outline-none focus:border-amber-400"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1">Provinsi & Kode Pos</label>
              <input
                type="text"
                value={`${profileForm.province} ${profileForm.postalCode}`}
                onChange={(e) => setProfileForm({ ...profileForm, province: e.target.value })}
                className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3.5 py-2.5 text-white text-xs sm:text-sm focus:outline-none focus:border-amber-400"
              />
            </div>
          </div>

          {/* Trust Stats Counter Controls */}
          <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800">
            <h4 className="text-xs uppercase font-bold text-amber-400 tracking-wider mb-3">Statistik Pengalaman (Tampil di Beranda)</h4>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div>
                <label className="block text-[11px] text-slate-400 mb-1">Tahun Pengalaman</label>
                <input
                  type="number"
                  value={profileForm.stats.yearsExperience}
                  onChange={(e) => setProfileForm({
                    ...profileForm,
                    stats: { ...profileForm.stats, yearsExperience: Number(e.target.value) }
                  })}
                  className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-1.5 text-white text-xs"
                />
              </div>

              <div>
                <label className="block text-[11px] text-slate-400 mb-1">Event Berhasil</label>
                <input
                  type="number"
                  value={profileForm.stats.completedEvents}
                  onChange={(e) => setProfileForm({
                    ...profileForm,
                    stats: { ...profileForm.stats, completedEvents: Number(e.target.value) }
                  })}
                  className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-1.5 text-white text-xs"
                />
              </div>

              <div>
                <label className="block text-[11px] text-slate-400 mb-1">Kepuasan Klien (%)</label>
                <input
                  type="number"
                  step="0.1"
                  value={profileForm.stats.clientSatisfactionRate}
                  onChange={(e) => setProfileForm({
                    ...profileForm,
                    stats: { ...profileForm.stats, clientSatisfactionRate: Number(e.target.value) }
                  })}
                  className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-1.5 text-white text-xs"
                />
              </div>

              <div>
                <label className="block text-[11px] text-slate-400 mb-1">Daya Genset (kVA)</label>
                <input
                  type="number"
                  value={profileForm.stats.totalGensetPowerKva}
                  onChange={(e) => setProfileForm({
                    ...profileForm,
                    stats: { ...profileForm.stats, totalGensetPowerKva: Number(e.target.value) }
                  })}
                  className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-1.5 text-white text-xs"
                />
              </div>
            </div>
          </div>

          <button
            type="submit"
            className="px-6 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs sm:text-sm flex items-center gap-2 transition shadow-lg shadow-amber-500/20"
          >
            <Save className="w-4 h-4" />
            <span>Simpan Perubahan Profil</span>
          </button>
        </form>
      )}

      {/* ========================================= */}
      {/* SUB-TAB 2: KELOLA LAYANAN                */}
      {/* ========================================= */}
      {subTab === 'services' && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-slate-800">
            <div>
              <h3 className="text-xl font-bold text-white">Daftar Layanan Produksi Event</h3>
              <p className="text-xs text-slate-400">Atur paket rigging, audio line array, lighting, dan multimedia yang Anda sewakan</p>
            </div>

            <button
              onClick={openNewServiceModal}
              className="px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs flex items-center gap-2 transition"
            >
              <Plus className="w-4 h-4" />
              <span>Tambah Layanan Baru</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((item) => (
              <div
                key={item.id}
                className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 flex flex-col justify-between"
              >
                <div>
                  {item.image && (
                    <img src={item.image} alt={item.title} className="w-full h-32 object-cover rounded-xl mb-4 border border-slate-800" />
                  )}
                  <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded bg-amber-500/10 text-amber-400 border border-amber-500/20">
                    {item.category}
                  </span>
                  <h4 className="font-bold text-white text-base mt-2 mb-1">{item.title}</h4>
                  <p className="text-xs text-slate-400 line-clamp-2 mb-3">{item.shortDesc}</p>
                  <p className="text-xs font-semibold text-amber-400">{item.estimatedPrice}</p>
                </div>

                <div className="pt-4 mt-4 border-t border-slate-800 flex items-center justify-end gap-2">
                  <button
                    onClick={() => openEditServiceModal(item)}
                    className="p-2 rounded-lg bg-slate-800 text-amber-400 hover:bg-slate-700 text-xs flex items-center gap-1"
                    title="Edit Layanan"
                  >
                    <Edit3 className="w-3.5 h-3.5" />
                    <span>Edit</span>
                  </button>
                  <button
                    onClick={() => handleDeleteService(item.id)}
                    className="p-2 rounded-lg bg-red-500/10 text-red-400 hover:bg-red-500 hover:text-white text-xs flex items-center gap-1 transition"
                    title="Hapus Layanan"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>Hapus</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ========================================= */}
      {/* SUB-TAB 3: KELOLA PORTOFOLIO              */}
      {/* ========================================= */}
      {subTab === 'portfolio' && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-slate-800">
            <div>
              <h3 className="text-xl font-bold text-white">Galeri & Portofolio Event</h3>
              <p className="text-xs text-slate-400">Pamerkan foto event nyata yang sudah berhasil Anda kerjakan ke calon klien</p>
            </div>

            <button
              onClick={openNewPortfolioModal}
              className="px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs flex items-center gap-2 transition"
            >
              <Plus className="w-4 h-4" />
              <span>Tambah Event Portofolio</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {portfolio.map((item) => (
              <div
                key={item.id}
                className="rounded-2xl bg-slate-900/80 border border-slate-800 overflow-hidden flex flex-col justify-between"
              >
                <div className="relative h-44">
                  <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                  <span className="absolute top-2.5 right-2.5 text-[10px] font-bold uppercase px-2.5 py-1 rounded-full bg-slate-950/80 text-amber-400">
                    {item.category}
                  </span>
                  {item.featured && (
                    <span className="absolute top-2.5 left-2.5 text-[9px] font-bold uppercase px-2 py-0.5 rounded bg-amber-500 text-slate-950">
                      Highlight
                    </span>
                  )}
                </div>

                <div className="p-4 flex-1 flex flex-col justify-between">
                  <div>
                    <h4 className="font-bold text-white text-sm mb-1">{item.title}</h4>
                    <p className="text-[11px] text-slate-400 mb-2">{item.client} • {item.location}</p>
                    <p className="text-xs text-slate-400 line-clamp-2">{item.desc}</p>
                  </div>

                  <div className="pt-3 mt-3 border-t border-slate-800 flex items-center justify-end gap-2">
                    <button
                      onClick={() => openEditPortfolioModal(item)}
                      className="p-1.5 px-2.5 rounded-lg bg-slate-800 text-amber-400 hover:bg-slate-700 text-xs flex items-center gap-1"
                    >
                      <Edit3 className="w-3.5 h-3.5" />
                      <span>Edit</span>
                    </button>
                    <button
                      onClick={() => handleDeletePortfolio(item.id)}
                      className="p-1.5 px-2.5 rounded-lg bg-red-500/10 text-red-400 hover:bg-red-500 hover:text-white text-xs flex items-center gap-1 transition"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>Hapus</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ========================================= */}
      {/* MODAL EDIT / TAMBAH SERVICE               */}
      {/* ========================================= */}
      {isServiceModalOpen && editingService && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-700 rounded-3xl max-w-xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 relative">
            <button
              onClick={() => setIsServiceModalOpen(false)}
              className="absolute top-5 right-5 p-2 text-slate-400 hover:text-white rounded-xl bg-slate-800"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-xl font-bold text-white mb-4">
              {services.some(s => s.id === editingService.id) ? 'Edit Layanan Produksi' : 'Tambah Layanan Baru'}
            </h3>

            <form onSubmit={handleSaveService} className="space-y-4 text-xs sm:text-sm">
              <div>
                <label className="block text-slate-300 font-bold mb-1">Nama Layanan</label>
                <input
                  type="text"
                  required
                  value={editingService.title}
                  onChange={(e) => setEditingService({ ...editingService, title: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-300 font-bold mb-1">Kategori</label>
                  <select
                    value={editingService.category}
                    onChange={(e: any) => setEditingService({ ...editingService, category: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-white"
                  >
                    <option>Stage & Rigging</option>
                    <option>Sound System</option>
                    <option>Lighting & FX</option>
                    <option>LED & Multimedia</option>
                    <option>Genset & Power</option>
                    <option>Manajemen Konser</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-300 font-bold mb-1">Perkiraan Biaya / Harga</label>
                  <input
                    type="text"
                    value={editingService.estimatedPrice}
                    onChange={(e) => setEditingService({ ...editingService, estimatedPrice: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-white"
                  />
                </div>
              </div>

              {/* Upload Foto dari Perangkat atau URL */}
              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
                <label className="block font-bold text-amber-400">Foto Thumbnail Layanan</label>
                
                <div className="flex items-center gap-3">
                  <label className="cursor-pointer px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-amber-400 font-bold text-xs flex items-center gap-2 border border-slate-700">
                    <Upload className="w-4 h-4" />
                    <span>Upload dari Device (Ponsel/PC)</span>
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => handleDeviceUpload(e, (url) => setEditingService({ ...editingService, image: url }))}
                    />
                  </label>

                  <span className="text-slate-500 text-xs">atau masukkan URL langsung:</span>
                </div>

                <input
                  type="url"
                  placeholder="https://..."
                  value={editingService.image || ''}
                  onChange={(e) => setEditingService({ ...editingService, image: e.target.value })}
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3.5 py-2 text-white text-xs"
                />

                {editingService.image && (
                  <img src={editingService.image} alt="Preview" className="h-24 w-auto rounded-lg object-cover border border-slate-800" />
                )}
              </div>

              <div>
                <label className="block text-slate-300 font-bold mb-1">Deskripsi Ringkas (Tampil di Kartu)</label>
                <textarea
                  rows={2}
                  required
                  value={editingService.shortDesc}
                  onChange={(e) => setEditingService({ ...editingService, shortDesc: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-white"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-bold mb-1">Spesifikasi Teknis Detail</label>
                <textarea
                  rows={2}
                  value={editingService.specs}
                  onChange={(e) => setEditingService({ ...editingService, specs: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-white"
                />
              </div>

              <div className="flex items-center gap-2 pt-2">
                <input
                  type="checkbox"
                  id="featured-service"
                  checked={editingService.featured}
                  onChange={(e) => setEditingService({ ...editingService, featured: e.target.checked })}
                  className="w-4 h-4 text-amber-500 rounded bg-slate-950"
                />
                <label htmlFor="featured-service" className="text-xs text-slate-300">Tampilkan sebagai layanan unggulan di beranda</label>
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setIsServiceModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 text-xs font-semibold"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-amber-500 text-slate-950 font-bold text-xs"
                >
                  Simpan Layanan
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================= */}
      {/* MODAL EDIT / TAMBAH PORTOFOLIO            */}
      {/* ========================================= */}
      {isPortfolioModalOpen && editingPortfolio && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-700 rounded-3xl max-w-xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 relative">
            <button
              onClick={() => setIsPortfolioModalOpen(false)}
              className="absolute top-5 right-5 p-2 text-slate-400 hover:text-white rounded-xl bg-slate-800"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-xl font-bold text-white mb-4">
              {portfolio.some(p => p.id === editingPortfolio.id) ? 'Edit Portofolio Event' : 'Tambah Event Baru'}
            </h3>

            <form onSubmit={handleSavePortfolio} className="space-y-4 text-xs sm:text-sm">
              <div>
                <label className="block text-slate-300 font-bold mb-1">Nama / Judul Event</label>
                <input
                  type="text"
                  required
                  placeholder="Contoh: Konser Musik Rock Merdeka 2026"
                  value={editingPortfolio.title}
                  onChange={(e) => setEditingPortfolio({ ...editingPortfolio, title: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-300 font-bold mb-1">Kategori Event</label>
                  <select
                    value={editingPortfolio.category}
                    onChange={(e: any) => setEditingPortfolio({ ...editingPortfolio, category: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-white"
                  >
                    <option>Konser Musik</option>
                    <option>Corporate Gathering</option>
                    <option>Festival Budaya</option>
                    <option>Pameran & Expo</option>
                    <option>Pernikahan Akbar</option>
                    <option>Pemerintahan</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-300 font-bold mb-1">Klien / Promotor</label>
                  <input
                    type="text"
                    required
                    placeholder="Contoh: PT Telkom / Promotor XYZ"
                    value={editingPortfolio.client}
                    onChange={(e) => setEditingPortfolio({ ...editingPortfolio, client: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-300 font-bold mb-1">Lokasi / Venue</label>
                  <input
                    type="text"
                    required
                    placeholder="Contoh: Stadion Madya GBK"
                    value={editingPortfolio.location}
                    onChange={(e) => setEditingPortfolio({ ...editingPortfolio, location: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-white"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-bold mb-1">Skala Audiens</label>
                  <input
                    type="text"
                    placeholder="Contoh: 15.000+ Penonton"
                    value={editingPortfolio.audienceSize}
                    onChange={(e) => setEditingPortfolio({ ...editingPortfolio, audienceSize: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-white"
                  />
                </div>
              </div>

              {/* Upload Foto Event dari Device */}
              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
                <label className="block font-bold text-amber-400">Foto Dokumentasi Event</label>
                
                <div className="flex items-center gap-3">
                  <label className="cursor-pointer px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-amber-400 font-bold text-xs flex items-center gap-2 border border-slate-700">
                    <Upload className="w-4 h-4" />
                    <span>Upload Foto dari Perangkat</span>
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => handleDeviceUpload(e, (url) => setEditingPortfolio({ ...editingPortfolio, image: url }))}
                    />
                  </label>

                  <span className="text-slate-500 text-xs">atau URL gambar:</span>
                </div>

                <input
                  type="url"
                  placeholder="https://..."
                  required
                  value={editingPortfolio.image}
                  onChange={(e) => setEditingPortfolio({ ...editingPortfolio, image: e.target.value })}
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3.5 py-2 text-white text-xs"
                />

                {editingPortfolio.image && (
                  <img src={editingPortfolio.image} alt="Preview" className="h-28 w-auto rounded-lg object-cover border border-slate-800" />
                )}
              </div>

              <div>
                <label className="block text-slate-300 font-bold mb-1">Deskripsi Singkat Eksekusi</label>
                <textarea
                  rows={3}
                  required
                  value={editingPortfolio.desc}
                  onChange={(e) => setEditingPortfolio({ ...editingPortfolio, desc: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-white"
                />
              </div>

              <div className="flex items-center gap-2 pt-2">
                <input
                  type="checkbox"
                  id="featured-port"
                  checked={editingPortfolio.featured}
                  onChange={(e) => setEditingPortfolio({ ...editingPortfolio, featured: e.target.checked })}
                  className="w-4 h-4 text-amber-500 rounded bg-slate-950"
                />
                <label htmlFor="featured-port" className="text-xs text-slate-300">Tampilkan sebagai Highlight utama</label>
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setIsPortfolioModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 text-xs font-semibold"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-amber-500 text-slate-950 font-bold text-xs"
                >
                  Simpan Portofolio
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
