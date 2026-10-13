import React, { useState } from 'react';
import { X, Lock, Shield, Eye, EyeOff, AlertCircle } from 'lucide-react';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: () => void;
  correctPasswordHash: string;
}

export const LoginModal: React.FC<LoginModalProps> = ({
  isOpen,
  onClose,
  onLoginSuccess,
  correctPasswordHash
}) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [attemptCount, setAttemptCount] = useState(0);
  const [isLocked, setIsLocked] = useState(false);
  const [lockTimer, setLockTimer] = useState(0);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (isLocked) {
      setErrorMessage(`Akses sementara dikunci karena terlalu banyak percobaan salah. Tunggu ${lockTimer} detik.`);
      return;
    }

    const cleanUser = username.trim().toLowerCase();
    const isUserValid = cleanUser === 'admin' || cleanUser === 'cvbintanginovasimedia09@gmail.com' || cleanUser === 'bintang';
    const isPasswordValid = password === correctPasswordHash;

    if (isUserValid && isPasswordValid) {
      setErrorMessage('');
      setPassword('');
      setUsername('');
      setAttemptCount(0);
      onLoginSuccess();
      onClose();
    } else {
      const nextAttempts = attemptCount + 1;
      setAttemptCount(nextAttempts);

      if (nextAttempts >= 4) {
        setIsLocked(true);
        setLockTimer(30);
        setErrorMessage('Terlalu banyak percobaan gagal. Akses dikunci selama 30 detik untuk perlindungan data.');

        const interval = setInterval(() => {
          setLockTimer((prev) => {
            if (prev <= 1) {
              clearInterval(interval);
              setIsLocked(false);
              setAttemptCount(0);
              return 0;
            }
            return prev - 1;
          });
        }, 1000);
      } else {
        setErrorMessage('Username atau Password yang Anda masukkan tidak valid. Akses dibatasi.');
      }
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-slate-700/80 rounded-3xl max-w-md w-full p-6 sm:p-8 relative shadow-2xl animate-in fade-in zoom-in-95 duration-200">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 text-slate-400 hover:text-white rounded-xl bg-slate-800 transition"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header Icon */}
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-400 flex items-center justify-center shadow-md">
            <Lock className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-xl font-black text-white">Login CMS Administrator</h3>
            <span className="text-xs text-slate-400 flex items-center gap-1 mt-0.5">
              <Shield className="w-3.5 h-3.5 text-amber-400" /> Akses Khusus Pengelola Website
            </span>
          </div>
        </div>

        {/* Security Warning Notice */}
        <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-400 leading-relaxed mb-6">
          Area ini dilindungi enkripsi keamanan data. Hanya personel resmi Bintang Inovasi Media yang diizinkan mengelola konten dan sistem backend.
        </div>

        {/* Error Feedback */}
        {errorMessage && (
          <div className="p-3.5 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-xs flex items-start gap-2.5 mb-5 animate-in fade-in">
            <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
            <span>{errorMessage}</span>
          </div>
        )}

        {/* Login Form - STRICTLY NO CREDENTIAL HINTS */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-300 mb-1.5">
              Username atau Email Administrator
            </label>
            <input
              type="text"
              required
              autoFocus
              placeholder="Masukkan identitas admin"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 focus:border-amber-400 rounded-xl px-4 py-3 text-white text-sm focus:outline-none transition"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-300 mb-1.5">
              Kata Sandi (Password)
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                required
                placeholder="••••••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 focus:border-amber-400 rounded-xl px-4 py-3 text-white text-sm focus:outline-none pr-11 transition"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
                title={showPassword ? 'Sembunyikan password' : 'Lihat password'}
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={isLocked}
            className={`w-full py-3.5 rounded-xl font-bold text-sm transition-all shadow-lg mt-2 flex items-center justify-center gap-2 ${
              isLocked
                ? 'bg-slate-800 text-slate-500 cursor-not-allowed'
                : 'bg-amber-500 hover:bg-amber-400 text-slate-950 shadow-amber-500/20'
            }`}
          >
            <Lock className="w-4 h-4" />
            <span>{isLocked ? `Terkunci (${lockTimer}s)` : 'Masuk ke Panel Kontrol'}</span>
          </button>
        </form>

        <div className="mt-6 pt-4 border-t border-slate-800/80 text-center">
          <span className="text-[11px] text-slate-500">
            Lupa kata sandi? Hubungi Super Admin di <strong className="text-slate-400">cvbintanginovasimedia09@gmail.com</strong>
          </span>
        </div>

      </div>
    </div>
  );
};
