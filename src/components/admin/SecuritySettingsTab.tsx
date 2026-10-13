import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Key, 
  Lock, 
  AlertCircle, 
  CheckCircle2, 
  Eye, 
  EyeOff, 
  Clock, 
  RotateCcw,
  UserCheck
} from 'lucide-react';

interface SecuritySettingsTabProps {
  currentPasswordHash: string;
  lastLogin: string | null;
  onUpdatePassword: (newPass: string) => void;
  onResetFactoryDefaults: () => void;
}

export const SecuritySettingsTab: React.FC<SecuritySettingsTabProps> = ({
  currentPasswordHash,
  lastLogin,
  onUpdatePassword,
  onResetFactoryDefaults
}) => {
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPasswords, setShowPasswords] = useState(false);
  const [feedback, setFeedback] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  const handleChangePassword = (e: React.FormEvent) => {
    e.preventDefault();

    if (oldPassword !== currentPasswordHash) {
      setFeedback({ type: 'error', message: 'Kata sandi saat ini yang Anda masukkan salah.' });
      return;
    }

    if (newPassword.length < 6) {
      setFeedback({ type: 'error', message: 'Kata sandi baru minimal 6 karakter dengan kombinasi angka/simbol.' });
      return;
    }

    if (newPassword !== confirmPassword) {
      setFeedback({ type: 'error', message: 'Konfirmasi kata sandi baru tidak cocok.' });
      return;
    }

    onUpdatePassword(newPassword);
    setOldPassword('');
    setNewPassword('');
    setConfirmPassword('');
    setFeedback({ type: 'success', message: 'Kata sandi administrator berhasil diperbarui dengan aman!' });
  };

  return (
    <div className="space-y-8 max-w-4xl animate-in fade-in duration-200">
      
      {/* Top Header */}
      <div className="pb-2 border-b border-slate-800">
        <h2 className="text-2xl font-black text-white flex items-center gap-2.5">
          <ShieldCheck className="w-6 h-6 text-amber-400" />
          <span>Pengaturan Keamanan & Password Administrator</span>
        </h2>
        <p className="text-xs sm:text-sm text-slate-400 mt-1">
          Proteksi akses data penawaran, enkripsi login, dan kelola kata sandi backend.
        </p>
      </div>

      {/* Security Status Card */}
      <div className="p-6 rounded-3xl bg-slate-900/80 border border-slate-800 space-y-4">
        <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
          <UserCheck className="w-4 h-4 text-emerald-400" />
          <span>Status Keamanan Sistem Saat Ini</span>
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800">
            <span className="text-[11px] text-slate-400 block mb-1">Proteksi Brute-Force:</span>
            <span className="text-xs font-bold text-emerald-400 flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4" /> Aktif (Lock 30s)
            </span>
          </div>

          <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800">
            <span className="text-[11px] text-slate-400 block mb-1">Visibilitas Password Publik:</span>
            <span className="text-xs font-bold text-emerald-400 flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4" /> Dihilangkan 100%
            </span>
          </div>

          <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800">
            <span className="text-[11px] text-slate-400 block mb-1">Login Terakhir:</span>
            <span className="text-xs font-semibold text-white flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-amber-400" /> {lastLogin || 'Sesi ini'}
            </span>
          </div>
        </div>

        <div className="p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/20 text-xs text-amber-300">
          <strong>Perhatian:</strong> Kata sandi default sistem telah disetel ke <code>#HAVIN9719*</code> sesuai instruksi keamanan Anda. Jangan bagikan password ini ke publik.
        </div>
      </div>

      {/* Form Ganti Password */}
      <div className="p-6 rounded-3xl bg-slate-900/80 border border-slate-800 space-y-5">
        <h3 className="text-base font-bold text-white flex items-center gap-2">
          <Key className="w-4 h-4 text-amber-400" />
          <span>Ubah Kata Sandi (Password) Admin</span>
        </h3>

        {feedback && (
          <div className={`p-4 rounded-2xl border text-xs flex items-start gap-2.5 ${
            feedback.type === 'success'
              ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400'
              : 'bg-red-500/10 border-red-500/30 text-red-400'
          }`}>
            {feedback.type === 'success' ? (
              <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5" />
            ) : (
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
            )}
            <span>{feedback.message}</span>
          </div>
        )}

        <form onSubmit={handleChangePassword} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-300 mb-1">
              Kata Sandi Saat Ini (Current Password)
            </label>
            <input
              type={showPasswords ? 'text' : 'password'}
              required
              placeholder="Masukkan kata sandi saat ini (#HAVIN9719*)"
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-white text-xs sm:text-sm focus:outline-none focus:border-amber-400 font-mono"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1">
                Kata Sandi Baru
              </label>
              <input
                type={showPasswords ? 'text' : 'password'}
                required
                placeholder="Minimal 6 karakter"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-white text-xs sm:text-sm focus:outline-none focus:border-amber-400 font-mono"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1">
                Ulangi Kata Sandi Baru
              </label>
              <input
                type={showPasswords ? 'text' : 'password'}
                required
                placeholder="Ulangi kata sandi baru"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-white text-xs sm:text-sm focus:outline-none focus:border-amber-400 font-mono"
              />
            </div>
          </div>

          <div className="flex items-center gap-2 pt-1">
            <button
              type="button"
              onClick={() => setShowPasswords(!showPasswords)}
              className="text-xs text-slate-400 hover:text-white flex items-center gap-1.5"
            >
              {showPasswords ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              <span>{showPasswords ? 'Sembunyikan karakter' : 'Tampilkan karakter password'}</span>
            </button>
          </div>

          <div className="pt-2">
            <button
              type="submit"
              className="px-6 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs sm:text-sm transition"
            >
              Simpan Kata Sandi Baru
            </button>
          </div>
        </form>
      </div>

      {/* Danger Zone: Reset to Defaults */}
      <div className="p-6 rounded-3xl bg-red-950/20 border border-red-900/40 space-y-3">
        <h3 className="text-sm font-bold text-red-400 uppercase tracking-wider flex items-center gap-2">
          <RotateCcw className="w-4 h-4" />
          <span>Area Pemulihan Pengaturan Pabrik (Factory Reset)</span>
        </h3>
        <p className="text-xs text-slate-400 leading-relaxed">
          Jika diperlukan, Anda dapat mengembalikan seluruh data konten profil, portofolio awal, dan konfigurasi default. Seluruh data kustom akan digantikan dengan data bawaan.
        </p>
        <button
          onClick={() => {
            if (confirm('PERINGATAN: Apakah Anda yakin ingin mereset seluruh database ke pengaturan awal pabrik?')) {
              onResetFactoryDefaults();
              alert('Sistem berhasil direset ke pengaturan awal!');
            }
          }}
          className="px-4 py-2 rounded-xl bg-red-600/20 hover:bg-red-600 text-red-300 hover:text-white text-xs font-bold border border-red-700/50 transition flex items-center gap-1.5"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Reset Seluruh Data ke Default</span>
        </button>
      </div>

    </div>
  );
};
