import React, { useState } from 'react';
import { GoogleSheetsConfig, FirebaseConfig, SyncLog, AppData } from '../../types';
import { 
  Cloud, 
  FileSpreadsheet, 
  Database, 
  RefreshCw, 
  CheckCircle2, 
  AlertCircle, 
  Download, 
  Upload, 
  Key, 
  Code, 
  Clock, 
  Copy, 
  Check, 
  Play
} from 'lucide-react';
import { 
  syncWithGoogleSheetsWebhook, 
  syncWithFirebaseFirestore, 
  exportDatabaseBackup, 
  exportInquiriesToCSV 
} from '../../utils/storage';

interface CloudSyncTabProps {
  appData: AppData;
  onUpdateGoogleSheetsConfig: (cfg: GoogleSheetsConfig) => void;
  onUpdateFirebaseConfig: (cfg: FirebaseConfig) => void;
  onAddSyncLog: (log: SyncLog) => void;
  onRestoreAppData: (data: AppData) => void;
}

export const CloudSyncTab: React.FC<CloudSyncTabProps> = ({
  appData,
  onUpdateGoogleSheetsConfig,
  onUpdateFirebaseConfig,
  onAddSyncLog,
  onRestoreAppData
}) => {
  const [activeSubTab, setActiveSubTab] = useState<'sheets' | 'firebase' | 'history'>('sheets');
  const [isSyncingSheets, setIsSyncingSheets] = useState(false);
  const [isSyncingFirebase, setIsSyncingFirebase] = useState(false);
  const [copiedScript, setCopiedScript] = useState(false);

  // Google Sheets state
  const [sheetsForm, setSheetsForm] = useState<GoogleSheetsConfig>(appData.googleSheetsConfig);
  // Firebase state
  const [firebaseForm, setFirebaseForm] = useState<FirebaseConfig>(appData.firebaseConfig);

  // Trigger Google Sheets manual sync
  const handleSyncSheets = async () => {
    setIsSyncingSheets(true);
    const result = await syncWithGoogleSheetsWebhook(
      appData.inquiries,
      sheetsForm.webhookUrl,
      sheetsForm.sheetName
    );

    setIsSyncingSheets(false);
    onAddSyncLog(result.log);

    const updatedConfig: GoogleSheetsConfig = {
      ...sheetsForm,
      lastSyncTime: new Date().toISOString().replace('T', ' ').substring(0, 16),
      status: result.success ? 'connected' : 'error',
      errorMessage: result.success ? undefined : result.message
    };
    onUpdateGoogleSheetsConfig(updatedConfig);
    setSheetsForm(updatedConfig);

    alert(result.message);
  };

  // Trigger Firebase manual sync
  const handleSyncFirebase = async () => {
    setIsSyncingFirebase(true);
    const result = await syncWithFirebaseFirestore(appData, firebaseForm.firestoreCollection);
    setIsSyncingFirebase(false);
    onAddSyncLog(result.log);

    const updatedConfig: FirebaseConfig = {
      ...firebaseForm,
      lastSyncTime: new Date().toISOString().replace('T', ' ').substring(0, 16),
      status: 'connected',
      lastBackupRecordCount: appData.inquiries.length + appData.portfolio.length + appData.services.length
    };
    onUpdateFirebaseConfig(updatedConfig);
    setFirebaseForm(updatedConfig);

    alert(result.message);
  };

  // Handle JSON Restore
  const handleRestoreJsonFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      try {
        const parsed = JSON.parse(reader.result as string);
        if (parsed.profile && parsed.services && parsed.inquiries) {
          onRestoreAppData(parsed);
          alert('Database berhasil dipulihkan dari cadangan file JSON!');
        } else {
          alert('File JSON tidak memiliki struktur database Bintang Inovasi Media yang valid.');
        }
      } catch (err: any) {
        alert('Gagal membaca file JSON: ' + err.message);
      }
    };
    reader.readAsText(file);
  };

  const sampleAppsScriptCode = `// KODE GOOGLE APPS SCRIPT UNTUK GOOGLE SHEETS
// Buka Spreadsheet -> Ekstensi -> Apps Script -> Paste kode ini -> Deploy as Web App!
function doPost(e) {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  var data = JSON.parse(e.postData.contents);
  
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(["Timestamp", "Nama Klien", "WhatsApp", "Email", "Jenis Event", "Tanggal", "Lokasi", "Anggaran", "Pesan", "Status"]);
  }
  
  if (data.records && data.records.length > 0) {
    data.records.forEach(function(item) {
      sheet.appendRow([
        item.createdAt,
        item.name,
        item.phone,
        item.email || "-",
        item.eventType,
        item.eventDate,
        item.location,
        item.budgetRange,
        item.message,
        item.status
      ]);
    });
  }
  
  return ContentService.createTextOutput(JSON.stringify({status: "success"}))
    .setMimeType(ContentService.MimeType.JSON);
}`;

  const copyAppsScript = () => {
    navigator.clipboard.writeText(sampleAppsScriptCode);
    setCopiedScript(true);
    setTimeout(() => setCopiedScript(false), 3000);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-slate-800">
        <div>
          <h2 className="text-2xl font-black text-white flex items-center gap-2.5">
            <Cloud className="w-6 h-6 text-amber-400" />
            <span>Sinkronisasi Cloud (Firebase & Google Sheets)</span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Hubungkan data formulir penawaran langsung ke Google Sheets tim marketing dan cadangkan database ke Cloud Firestore.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => exportDatabaseBackup(appData)}
            className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold border border-slate-700 flex items-center gap-1.5 transition"
            title="Download full backup file JSON"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Cadangkan JSON</span>
          </button>

          <label className="cursor-pointer px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-amber-400 text-xs font-bold border border-slate-700 flex items-center gap-1.5 transition">
            <Upload className="w-3.5 h-3.5" />
            <span>Pulihkan JSON</span>
            <input type="file" accept=".json" className="hidden" onChange={handleRestoreJsonFile} />
          </label>
        </div>
      </div>

      {/* Tabs Switcher */}
      <div className="flex flex-wrap items-center gap-2 border-b border-slate-800 pb-3">
        <button
          onClick={() => setActiveSubTab('sheets')}
          className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 transition ${
            activeSubTab === 'sheets'
              ? 'bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/20'
              : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-white'
          }`}
        >
          <FileSpreadsheet className="w-4 h-4" />
          <span>Google Sheets Live Sync</span>
        </button>

        <button
          onClick={() => setActiveSubTab('firebase')}
          className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 transition ${
            activeSubTab === 'firebase'
              ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20'
              : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-white'
          }`}
        >
          <Database className="w-4 h-4" />
          <span>Firebase Cloud Firestore</span>
        </button>

        <button
          onClick={() => setActiveSubTab('history')}
          className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 transition ${
            activeSubTab === 'history'
              ? 'bg-blue-500 text-slate-950 shadow-md shadow-blue-500/20'
              : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-white'
          }`}
        >
          <Clock className="w-4 h-4" />
          <span>Riwayat Sinkronisasi ({appData.syncHistory.length})</span>
        </button>
      </div>

      {/* ========================================= */}
      {/* 1. GOOGLE SHEETS LIVE SYNC                */}
      {/* ========================================= */}
      {activeSubTab === 'sheets' && (
        <div className="space-y-6 max-w-4xl">
          <div className="p-5 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-emerald-500 text-slate-950 flex items-center justify-center font-bold">
                <FileSpreadsheet className="w-6 h-6" />
              </div>
              <div>
                <span className="text-xs uppercase font-bold text-emerald-400">Integrasi Spreadsheet</span>
                <h3 className="text-lg font-black text-white">Google Sheets Webhook Dispatcher</h3>
                <span className="text-xs text-slate-400">
                  Status: <strong className="text-emerald-400 font-bold uppercase">{sheetsForm.status}</strong> • Terakhir Sinkron: {sheetsForm.lastSyncTime || 'Belum pernah'}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handleSyncSheets}
                disabled={isSyncingSheets}
                className="px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs flex items-center gap-2 transition shadow-lg shadow-emerald-500/20"
              >
                <RefreshCw className={`w-4 h-4 ${isSyncingSheets ? 'animate-spin' : ''}`} />
                <span>{isSyncingSheets ? 'Menyinkronkan...' : 'Sinkronkan Sekarang'}</span>
              </button>
            </div>
          </div>

          {/* Form Settings */}
          <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-4">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">Konfigurasi URL Google Sheets Webhook</h4>
            
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1">
                Google Apps Script Web App URL (Endpoint Webhook)
              </label>
              <input
                type="url"
                value={sheetsForm.webhookUrl}
                onChange={(e) => setSheetsForm({ ...sheetsForm, webhookUrl: e.target.value })}
                placeholder="https://script.google.com/macros/s/AKfycb.../exec"
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-white text-xs sm:text-sm font-mono focus:outline-none focus:border-emerald-400"
              />
              <span className="text-[11px] text-slate-500 mt-1 block">
                Setiap calon klien mengirim formulir penawaran di website, data akan otomatis diposting ke spreadsheet ini.
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">Nama Sheet Tab</label>
                <input
                  type="text"
                  value={sheetsForm.sheetName}
                  onChange={(e) => setSheetsForm({ ...sheetsForm, sheetName: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2 text-white text-xs sm:text-sm"
                />
              </div>

              <div className="flex items-center pt-6">
                <input
                  type="checkbox"
                  id="auto-sync-sheets"
                  checked={sheetsForm.autoSyncOnInquiry}
                  onChange={(e) => setSheetsForm({ ...sheetsForm, autoSyncOnInquiry: e.target.checked })}
                  className="w-4 h-4 text-emerald-500 rounded bg-slate-950"
                />
                <label htmlFor="auto-sync-sheets" className="ml-2 text-xs text-slate-300 cursor-pointer">
                  Auto-sync instan setiap ada pesan penawaran baru
                </label>
              </div>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-slate-800">
              <button
                type="button"
                onClick={() => exportInquiriesToCSV(appData.inquiries, appData.profile.companyName)}
                className="px-4 py-2 rounded-xl bg-slate-800 text-slate-200 text-xs font-bold flex items-center gap-2 hover:bg-slate-700 transition"
              >
                <Download className="w-4 h-4" />
                <span>Unduh File CSV Langsung</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  onUpdateGoogleSheetsConfig(sheetsForm);
                  alert('Pengaturan Google Sheets tersimpan!');
                }}
                className="px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs"
              >
                Simpan Konfigurasi
              </button>
            </div>
          </div>

          {/* Quick Helper: 1-Click Google Apps Script Code */}
          <div className="p-6 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-emerald-400 font-bold text-xs uppercase">
                <Code className="w-4 h-4" />
                <span>Panduan Cepat Script Google Apps Script (Siap Pakai)</span>
              </div>
              <button
                onClick={copyAppsScript}
                className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold flex items-center gap-1.5 transition"
              >
                {copiedScript ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedScript ? 'Tersalin!' : 'Salin Kode'}</span>
              </button>
            </div>

            <p className="text-xs text-slate-400">
              Langkah 1: Buat Google Sheet baru &gt; Klik <strong>Ekstensi</strong> &gt; <strong>Apps Script</strong>.
              <br />
              Langkah 2: Hapus kode default, tempel kode di bawah ini, lalu klik <strong>Terapkan (Deploy)</strong> &gt; <strong>Deployment Baru</strong> (Akses: <em>Siapa saja / Anyone</em>).
              <br />
              Langkah 3: Salin URL Web App yang dihasilkan ke kotak konfigurasi di atas. Selesai!
            </p>

            <pre className="p-4 rounded-xl bg-slate-900 border border-slate-800 text-[11px] font-mono text-emerald-300 overflow-x-auto max-h-48">
              {sampleAppsScriptCode}
            </pre>
          </div>
        </div>
      )}

      {/* ========================================= */}
      {/* 2. FIREBASE CLOUD FIRESTORE               */}
      {/* ========================================= */}
      {activeSubTab === 'firebase' && (
        <div className="space-y-6 max-w-4xl">
          <div className="p-5 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-amber-500 text-slate-950 flex items-center justify-center font-bold">
                <Database className="w-6 h-6" />
              </div>
              <div>
                <span className="text-xs uppercase font-bold text-amber-400">Cloud Persistence</span>
                <h3 className="text-lg font-black text-white">Firebase Firestore Database</h3>
                <span className="text-xs text-slate-400">
                  Status: <strong className="text-amber-400 font-bold uppercase">{firebaseForm.status}</strong> • Koleksi: {firebaseForm.firestoreCollection}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handleSyncFirebase}
                disabled={isSyncingFirebase}
                className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs flex items-center gap-2 transition shadow-lg shadow-amber-500/20"
              >
                <RefreshCw className={`w-4 h-4 ${isSyncingFirebase ? 'animate-spin' : ''}`} />
                <span>{isSyncingFirebase ? 'Mencadangkan...' : 'Cadangkan ke Cloud Firestore'}</span>
              </button>
            </div>
          </div>

          {/* Firebase Settings */}
          <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-4">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">Konfigurasi Proyek Firebase</h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">Firebase Project ID</label>
                <input
                  type="text"
                  value={firebaseForm.projectId}
                  onChange={(e) => setFirebaseForm({ ...firebaseForm, projectId: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2 text-white text-xs sm:text-sm font-mono"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">Firestore Collection Name</label>
                <input
                  type="text"
                  value={firebaseForm.firestoreCollection}
                  onChange={(e) => setFirebaseForm({ ...firebaseForm, firestoreCollection: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2 text-white text-xs sm:text-sm font-mono"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">Firebase Web API Key</label>
                <input
                  type="password"
                  value={firebaseForm.apiKey}
                  onChange={(e) => setFirebaseForm({ ...firebaseForm, apiKey: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2 text-white text-xs sm:text-sm font-mono"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">Auth Domain</label>
                <input
                  type="text"
                  value={firebaseForm.authDomain}
                  onChange={(e) => setFirebaseForm({ ...firebaseForm, authDomain: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2 text-white text-xs sm:text-sm font-mono"
                />
              </div>
            </div>

            <div className="flex items-center pt-2">
              <input
                type="checkbox"
                id="auto-sync-firebase"
                checked={firebaseForm.autoSync}
                onChange={(e) => setFirebaseForm({ ...firebaseForm, autoSync: e.target.checked })}
                className="w-4 h-4 text-amber-500 rounded bg-slate-950"
              />
              <label htmlFor="auto-sync-firebase" className="ml-2 text-xs text-slate-300 cursor-pointer">
                Auto-sync cadangan perubahan data profil & layanan secara periodik
              </label>
            </div>

            <div className="flex items-center justify-end pt-4 border-t border-slate-800">
              <button
                type="button"
                onClick={() => {
                  onUpdateFirebaseConfig(firebaseForm);
                  alert('Pengaturan Firebase Cloud tersimpan!');
                }}
                className="px-5 py-2 rounded-xl bg-amber-500 text-slate-950 font-bold text-xs"
              >
                Simpan Konfigurasi Firebase
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================= */}
      {/* 3. RIWAYAT SINKRONISASI (HISTORY)         */}
      {/* ========================================= */}
      {activeSubTab === 'history' && (
        <div className="space-y-4 max-w-4xl">
          <h3 className="text-base font-bold text-white">Log Aktivitas Sinkronisasi Cloud</h3>

          {appData.syncHistory.length === 0 ? (
            <div className="p-8 text-center rounded-2xl bg-slate-900/40 border border-slate-800 text-slate-400 text-xs">
              Belum ada riwayat sinkronisasi.
            </div>
          ) : (
            <div className="space-y-2.5">
              {appData.syncHistory.map((item) => (
                <div
                  key={item.id}
                  className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 flex items-start justify-between gap-4 text-xs"
                >
                  <div className="flex items-start gap-3">
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${
                      item.platform === 'Google Sheets' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-amber-500/10 text-amber-400'
                    }`}>
                      {item.platform === 'Google Sheets' ? <FileSpreadsheet className="w-4 h-4" /> : <Database className="w-4 h-4" />}
                    </div>

                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-white">{item.platform}</span>
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                          item.status === 'success' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-red-500/10 text-red-400'
                        }`}>
                          {item.status}
                        </span>
                        <span className="text-[11px] text-slate-400 font-mono">({item.recordCount} entitas)</span>
                      </div>
                      <p className="text-slate-300 mt-1">{item.message}</p>
                    </div>
                  </div>

                  <span className="text-[11px] text-slate-500 font-mono shrink-0">
                    {item.timestamp}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

    </div>
  );
};
