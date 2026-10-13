import React, { useState, useRef } from 'react';
import { MediaItem } from '../../types';
import { Upload, Image as ImageIcon, Copy, Check, Trash2, HardDrive, Sparkles, Download } from 'lucide-react';
import { processDeviceFileUpload } from '../../utils/storage';

interface MediaUploaderTabProps {
  mediaLibrary: MediaItem[];
  onAddMedia: (item: MediaItem) => void;
  onDeleteMedia: (id: string) => void;
}

export const MediaUploaderTab: React.FC<MediaUploaderTabProps> = ({
  mediaLibrary,
  onAddMedia,
  onDeleteMedia
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFiles = async (files: FileList | null) => {
    if (!files || files.length === 0) return;
    setIsProcessing(true);

    let countSuccess = 0;
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      try {
        const item = await processDeviceFileUpload(file);
        onAddMedia(item);
        countSuccess++;
      } catch (err: any) {
        alert(`Gagal upload "${file.name}": ${err.message}`);
      }
    }

    setIsProcessing(false);
    if (countSuccess > 0) {
      alert(`Berhasil mengupload ${countSuccess} file dari perangkat Anda!`);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    handleFiles(e.dataTransfer.files);
  };

  const handleCopy = (item: MediaItem) => {
    navigator.clipboard.writeText(item.url);
    setCopiedId(item.id);
    setTimeout(() => setCopiedId(null), 2500);
  };

  const totalStorageKb = mediaLibrary.reduce((acc, m) => acc + m.sizeKb, 0);

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-slate-800">
        <div>
          <h2 className="text-2xl font-black text-white flex items-center gap-2.5">
            <HardDrive className="w-6 h-6 text-amber-400" />
            <span>Media Manager & Upload dari Device</span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Upload langsung foto panggung, video dokumentasi, logo klien dari perangkat HP/Laptop Anda ke database media.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="px-3.5 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-300">
            Total File: <strong className="text-amber-400">{mediaLibrary.length}</strong> ({Math.round(totalStorageKb / 1024 * 10) / 10} MB)
          </div>
        </div>
      </div>

      {/* Drag & Drop Upload Zone */}
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
        className={`cursor-pointer p-8 sm:p-12 rounded-3xl border-2 border-dashed transition-all text-center relative overflow-hidden group ${
          isDragging
            ? 'border-amber-400 bg-amber-500/10 scale-[1.01]'
            : 'border-slate-700/80 hover:border-amber-500/50 bg-slate-900/60 hover:bg-slate-900'
        }`}
      >
        <input
          type="file"
          ref={fileInputRef}
          multiple
          accept="image/*"
          className="hidden"
          onChange={(e) => handleFiles(e.target.files)}
        />

        <div className="max-w-md mx-auto space-y-3">
          <div className="w-16 h-16 rounded-2xl bg-amber-500/10 text-amber-400 flex items-center justify-center mx-auto group-hover:scale-110 transition-transform">
            <Upload className="w-8 h-8" />
          </div>

          <h3 className="text-lg font-bold text-white">
            {isProcessing ? 'Sedang Memproses Upload...' : 'Tarik & Letakkan File Gambar ke Sini'}
          </h3>

          <p className="text-xs text-slate-400 leading-relaxed">
            atau <span className="text-amber-400 font-bold underline">klik untuk memilih dari penyimpanan perangkat Anda</span> (Galeri HP, File Explorer Laptop).
          </p>

          <div className="flex flex-wrap items-center justify-center gap-2 pt-2 text-[11px] text-slate-500">
            <span className="px-2 py-0.5 rounded bg-slate-800">PNG</span>
            <span className="px-2 py-0.5 rounded bg-slate-800">JPG</span>
            <span className="px-2 py-0.5 rounded bg-slate-800">WEBP</span>
            <span className="px-2 py-0.5 rounded bg-slate-800">Maks. 5 MB / foto</span>
          </div>
        </div>
      </div>

      {/* Media Library Grid */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <ImageIcon className="w-4 h-4 text-amber-400" />
            <span>Pustaka Gambar Tersimpan ({mediaLibrary.length})</span>
          </h3>
          <span className="text-xs text-slate-400">Klik "Salin URL" untuk digunakan di form Layanan atau Portofolio</span>
        </div>

        {mediaLibrary.length === 0 ? (
          <div className="p-12 text-center rounded-2xl bg-slate-900/40 border border-slate-800 text-slate-400 text-xs">
            Belum ada media diupload. Tarik file foto dari perangkat Anda di atas untuk memulai.
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {mediaLibrary.map((item) => (
              <div
                key={item.id}
                className="rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-slate-700 overflow-hidden group flex flex-col justify-between"
              >
                <div className="relative h-32 bg-slate-950 overflow-hidden">
                  <img
                    src={item.url}
                    alt={item.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                  />
                  <span className="absolute top-2 left-2 text-[9px] font-bold px-1.5 py-0.5 rounded bg-slate-950/80 text-amber-400">
                    {item.sizeKb} KB
                  </span>
                </div>

                <div className="p-3">
                  <p className="text-xs font-semibold text-white truncate mb-1" title={item.name}>
                    {item.name}
                  </p>
                  <p className="text-[10px] text-slate-400 mb-3">{item.uploadedAt}</p>

                  <div className="flex items-center justify-between gap-1 pt-2 border-t border-slate-800/80">
                    <button
                      onClick={() => handleCopy(item)}
                      className="flex-1 py-1 px-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-amber-400 text-[10px] font-bold flex items-center justify-center gap-1 transition"
                      title="Salin Link Gambar"
                    >
                      {copiedId === item.id ? (
                        <>
                          <Check className="w-3 h-3 text-emerald-400" />
                          <span className="text-emerald-400">Tersalin!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3 h-3" />
                          <span>Salin Link</span>
                        </>
                      )}
                    </button>

                    <button
                      onClick={() => {
                        if (confirm(`Hapus media "${item.name}"?`)) {
                          onDeleteMedia(item.id);
                        }
                      }}
                      className="p-1.5 rounded-lg bg-red-500/10 hover:bg-red-500 text-red-400 hover:text-white transition"
                      title="Hapus Media"
                    >
                      <Trash2 className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

    </div>
  );
};
