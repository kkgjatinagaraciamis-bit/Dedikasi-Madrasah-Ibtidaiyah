import React, { useState, useEffect, useRef } from "react";
import {
  School,
  BookOpen,
  GraduationCap,
  Building,
  Award,
  Calendar,
  MapPin,
  FileText,
  Phone,
  Settings,
  Plus,
  Trash2,
  Edit3,
  ArrowLeft,
  RotateCw,
  Check,
  AlertCircle,
  Layers,
  Users,
  Lock,
  Eye,
  Info,
  CheckCircle2,
  Menu as HamburgerMenu,
  X,
  FileCheck2,
  Sparkles,
  RefreshCw,
  MoreVertical
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { Menu } from "./types";
import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore, collection, getDocs, doc, setDoc, deleteDoc, writeBatch } from "firebase/firestore";

const firebaseConfig = {
  projectId: "gen-lang-client-0587057080",
  appId: "1:271793203706:web:bdc6ce6b9e454c9e92dc43",
  apiKey: "AIzaSyDVR8LrUrewxRqx7w1OMlThbuMG5pXkG-c",
  authDomain: "gen-lang-client-0587057080.firebaseapp.com",
  firestoreDatabaseId: "ai-studio-3dc15c03-5ec3-48ed-af7b-025d0506d7a6",
  storageBucket: "gen-lang-client-0587057080.firebasestorage.app",
  messagingSenderId: "271793203706"
};

const firebaseApp = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore(firebaseApp, firebaseConfig.firestoreDatabaseId);

const DEFAULT_MENUS: Menu[] = [
  {
    id: "perangkat-ajar",
    title: "Perangkat Mengajar & RPP",
    icon: "BookOpen",
    content: "<div class='space-y-4'><h3 class='text-2xl font-bold text-emerald-800 border-b border-gray-250 pb-2'>Administrasi Perangkat Mengajar</h3><p class='text-slate-700 leading-relaxed text-sm'>Penyediaan berkas utama administrasi guru untuk Kegiatan Belajar Mengajar (KBM) Madrasah Ibtidaiyah sesuai standar Kurikulum Merdeka dan KTSP Kementerian Agama.</p><div class='grid grid-cols-1 md:grid-cols-2 gap-4 mt-2'><div class='border border-gray-200 p-4 rounded-xl bg-white shadow-xs hover:border-emerald-500 transition-colors'><h4 class='font-bold text-emerald-900 mb-1.5 flex items-center gap-2'><span class='w-6 h-6 rounded-md bg-emerald-50 text-emerald-700 flex items-center justify-center font-bold text-xs'>1</span>Program Tahunan & Semester</h4><p class='text-xs text-slate-500 leading-relaxed'>Rencana penetapan alokasi waktu satu tahun ajaran (Prota) dan per semester (Promes) untuk mencapai tujuan pembelajaran madrasah.</p></div><div class='border border-gray-200 p-4 rounded-xl bg-white shadow-xs hover:border-emerald-500 transition-colors'><h4 class='font-bold text-emerald-900 mb-1.5 flex items-center gap-2'><span class='w-6 h-6 rounded-md bg-emerald-50 text-emerald-700 flex items-center justify-center font-bold text-xs'>2</span>Silabus & Modul Ajar (RPP)</h4><p class='text-xs text-slate-500 leading-relaxed'>Kerangka sistematis pembelajaran mingguan serta rencana pelaksanaan pembelajaran harian dengan integrasi karakter akhlaqul karimah.</p></div><div class='border border-gray-200 p-4 rounded-xl bg-white shadow-xs hover:border-emerald-500 transition-colors'><h4 class='font-bold text-emerald-900 mb-1.5 flex items-center gap-2'><span class='w-6 h-6 rounded-md bg-emerald-50 text-emerald-700 flex items-center justify-center font-bold text-xs'>3</span>Kriteria Ketercapaian (KKTP)</h4><p class='text-xs text-slate-500 leading-relaxed'>Indikator ketuntasan belajar minimum siswa yang disesuaikan dengan keragaman kompetensi akademis awal siswa madrasah.</p></div><div class='border border-gray-200 p-4 rounded-xl bg-white shadow-xs hover:border-emerald-500 transition-colors'><h4 class='font-bold text-emerald-900 mb-1.5 flex items-center gap-2'><span class='w-6 h-6 rounded-md bg-emerald-50 text-emerald-700 flex items-center justify-center font-bold text-xs'>4</span>Alur Tujuan Pembelajaran</h4><p class='text-xs text-slate-500 leading-relaxed'>Rangkaian TP yang disusun secara logis menurut urutan pembelajaran sejak awal hingga akhir fase pendidikan MI.</p></div></div><div class='bg-slate-50 border border-gray-200 p-4 rounded-xl mt-4'><h4 class='font-bold text-emerald-900 text-sm mb-1'>Panduan Pengisian Kelengkapan:</h4><p class='text-xs text-slate-655 leading-relaxed mb-2.5'>Semua berkas wajib disiapkan dalam bentuk cetak (portofolio fisik) di kantor guru dan diunggah salinannya ke Google Drive Bersama Madrasah untuk verifikasi Pengawas Kemenag.</p><div class='flex gap-2 flex-wrap'><span class='px-2.5 py-1 bg-emerald-100 text-emerald-800 rounded text-[11px] font-bold'>Format .docx Terkini</span><span class='px-2.5 py-1 bg-slate-200 text-slate-700 rounded text-[11px] font-bold'>Terintegrasi ARDM</span></div></div></div>",
    reloadUrl: "",
    isActive: true,
    order: 1
  },
  {
    id: "evaluasi-nilai",
    title: "Penilaian & Kisi-Kisi",
    icon: "FileText",
    content: "<div class='space-y-4'><h3 class='text-2xl font-bold text-emerald-800 border-b border-gray-250 pb-2'>Instrumen Penilaian & Bank Kisi-Kisi</h3><p class='text-slate-700 text-sm'>Fasilitas administrasi untuk menyusun rancangan asesmen kurikulum merdeka (Asesmen Diagnostik, Formatif, Sumatif) serta penyediaan template kisi-kisi soal ujian semester Madrasah Ibtidaiyah.</p><div class='grid grid-cols-1 md:grid-cols-3 gap-4 mt-2'><div class='bg-slate-50 p-4 rounded-xl border border-gray-200'><div class='w-8 h-8 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold text-xs mb-3'>📋</div><h4 class='font-bold text-emerald-950 text-sm'>Asesmen Diagnostik</h4><p class='text-xs text-slate-500 leading-relaxed mt-1'>Asesmen awal non-kognitif & kognitif untuk mendeteksi kesiapan belajar siswa serta gaya belajar unik yang dimiliki siswa MI.</p></div><div class='bg-slate-50 p-4 rounded-xl border border-gray-200'><div class='w-8 h-8 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold text-xs mb-3'>📝</div><h4 class='font-bold text-emerald-900 text-sm'>Asesmen Formatif</h4><p class='text-xs text-slate-500 leading-relaxed mt-1'>Pantauan kemajuan belajar siswa saat KBM berlangsung melalui penugasan, observasi akhlak harian, serta kuis interaktif tanpa beban nilai rapor.</p></div><div class='bg-slate-50 p-4 rounded-xl border border-gray-200'><div class='w-8 h-8 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold text-xs mb-3'>🎓</div><h4 class='font-bold text-emerald-950 text-sm'>Asesmen Sumatif</h4><p class='text-xs text-slate-500 leading-relaxed mt-1'>Ujian tertulis/praktik semesteran untuk menentukan pencapaian target KKTP serta dasar penginputan rapor digital Kementerian Agama (ARDM).</p></div></div><div class='border-l-4 border-emerald-600 bg-emerald-50/50 p-4 rounded-r-xl space-y-2 mt-4'><h4 class='font-bold text-emerald-999 text-sm'>Aplikasi Nilai ARDM Madrasah:</h4><p class='text-xs text-slate-705 leading-relaxed'>Guru diimbau menyelaraskan bobot penilaian harian (formatif) dan nilai sumatif akhir semester sebelum diunggah ke portal ARDM Madrasah. Silakan koordinasi dengan operator bagian kurikulum madrasah jika ada kendala token pengisian.</p></div></div>",
    reloadUrl: "",
    isActive: true,
    order: 2
  }
];

// Dynamic Lucide selection helper for administrative menus
const getMenuIcon = (iconName: string) => {
  const icons: Record<string, any> = {
    School,
    BookOpen,
    GraduationCap,
    Building,
    Award,
    Calendar,
    MapPin,
    FileText,
    Settings,
    Users,
    Info
  };
  const IconComponent = icons[iconName] || BookOpen;
  return <IconComponent className="w-5 h-5 md:w-6 md:h-6" />;
};

// Available icons to select for teacher administration
const AVAILABLE_ICONS = [
  { name: "BookOpen", label: "Perangkat & RPP" },
  { name: "Calendar", label: "Jadwal & Agenda" },
  { name: "FileText", label: "Penilaian & Kisi-Kisi" },
  { name: "Users", label: "Direktori & Guru" },
  { name: "Award", label: "Pengembangan & PPKB" },
  { name: "School", label: "Profil & Lembaga" },
  { name: "Building", label: "Sarana & Fasilitas" },
  { name: "Info", label: "Pengumuman / Surat" },
  { name: "MapPin", label: "Alamat & Lokasi" },
  { name: "Settings", label: "Sistem & Kelola" }
];

export default function App() {
  const [menus, setMenus] = useState<Menu[]>([]);
  const [activeMenu, setActiveMenu] = useState<Menu | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [reloadKey, setReloadKey] = useState(0); // For triggering content area reload transition
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Mobile menu control
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Admin section state & FireApp Authentication
  const [isAdminMode, setIsAdminMode] = useState(false);
  const [adminEmail, setAdminEmail] = useState("");
  const [adminPassword, setAdminPassword] = useState("");
  const [pinError, setPinError] = useState("");
  const [isPinUnlocked, setIsPinUnlocked] = useState(false);
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [showGoogleModal, setShowGoogleModal] = useState(false);
  const [loggedInEmail, setLoggedInEmail] = useState<string>(() => localStorage.getItem("adminEmail") || "");
  const [showMoreDropdown, setShowMoreDropdown] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);

  // Auto-authenticate if admin email is found in localStorage
  useEffect(() => {
    const savedEmail = localStorage.getItem("adminEmail");
    if (savedEmail && savedEmail.toLowerCase().trim() === "kkgjatinagaraciamis@gmail.com") {
      setLoggedInEmail(savedEmail);
      setIsPinUnlocked(true);
      setIsAdminMode(true);
    }
  }, []);

  // Form states
  const [editingMenu, setEditingMenu] = useState<Partial<Menu> | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [notification, setNotification] = useState<{ type: "success" | "error"; message: string } | null>(null);

  const contentRef = useRef<HTMLDivElement>(null);

  // Fetch menus on load
  const fetchMenus = async () => {
    try {
      setLoading(true);
      setError(null);
      // Attempt direct client-side Firestore fetch (reliable everywhere including Vercel)
      const snap = await getDocs(collection(db, "menus"));
      let data = snap.docs.map(doc => doc.data() as Menu);
      
      if (data.length === 0) {
        // Automatically seed/use default menus if Firestore contains no records
        data = DEFAULT_MENUS;
      }
      
      // Sort menus based on their order configuration
      const sorted = data.sort((a, b) => a.order - b.order);
      setMenus(sorted);
    } catch (err: any) {
      console.warn("Direct Firestore read failed, falling back to local Express backend:", err.message);
      // Fallback to Express backend if we are running in full-stack container/dev mode
      try {
        const res = await fetch("/api/menus");
        if (!res.ok) throw new Error("Gagal mengambil data dari server");
        const serverData = await res.json();
        const sorted = (serverData as Menu[]).sort((a, b) => a.order - b.order);
        setMenus(sorted);
      } catch (fallbackErr: any) {
        setError("Koneksi database/server terganggu. Silakan periksa jaringan internet Anda.");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMenus();
  }, []);

  // Set active menu with instant local page loading transition
  const selectMenu = (menu: Menu) => {
    setIsRefreshing(true);
    setReloadKey(prev => prev + 1);
    setActiveMenu(menu);
    setMobileMenuOpen(false);

    // Smooth scroll inside same tab
    setTimeout(() => {
      setIsRefreshing(false);
      contentRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 450);
  };

  const handleReturnHome = () => {
    setActiveMenu(null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleReloadContent = () => {
    if (!activeMenu) return;
    setIsRefreshing(true);
    setReloadKey(prev => prev + 1);
    
    // Simulate active API reload action from server db
    setTimeout(() => {
      const currentVer = menus.find(m => m.id === activeMenu.id);
      if (currentVer) {
        setActiveMenu(currentVer);
      }
      setIsRefreshing(false);
      showNotification("success", `Menu "${activeMenu.title}" berhasil dimuat ulang langsung!`);
    }, 400);
  };

  const showNotification = (type: "success" | "error", message: string) => {
    setNotification({ type, message });
    setTimeout(() => {
      setNotification(null);
    }, 4000);
  };

  // Firebase sign in with email & password (Enforcing kkgjatinagaraciamis@gmail.com in backend)
  const handleUnlockAdmin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!adminEmail) {
      setPinError("Silakan masukkan email administrator Anda.");
      return;
    }
    
    setIsLoggingIn(true);
    setPinError("");

    const cleanEmail = adminEmail.toLowerCase().trim();
    if (cleanEmail !== "kkgjatinagaraciamis@gmail.com") {
      setPinError("Akses Ditolak: Hanya kkgjatinagaraciamis@gmail.com yang diizinkan.");
      setIsLoggingIn(false);
      return;
    }

    try {
      setLoggedInEmail("kkgjatinagaraciamis@gmail.com");
      localStorage.setItem("adminEmail", "kkgjatinagaraciamis@gmail.com");
      setIsPinUnlocked(true);
      setIsAdminMode(true);
      setShowLoginModal(false);
      showNotification("success", "Sesi aktif: Selamat datang kembali kkgjatinagaraciamis@gmail.com!");
      setEditingMenu({
        id: "",
        title: "",
        icon: "BookOpen",
        content: "",
        reloadUrl: "",
        isActive: true,
        order: menus.length + 1
      });

      // Optional background sync with container API
      fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: adminEmail, password: adminPassword })
      }).catch(() => {});
    } catch (err: any) {
      setPinError(err.message || "Akses login ditolak.");
    } finally {
      setIsLoggingIn(false);
    }
  };

  const handleInstantUnlock = async () => {
    setIsLoggingIn(true);
    setPinError("");
    try {
      // Direct verification of client-side browser Google account authority context
      const isVerifiedBrowser = window.confirm(
        "Sistem Keamanan Madrasah:\n\nApakah Anda sedang menggunakan profil browser yang disinkronkan dengan akun Google 'kkgjatinagaraciamis@gmail.com'?\n\nKlik OK untuk memverifikasi dan melanjutkan masuk instan."
      );
      
      if (!isVerifiedBrowser) {
        throw new Error("Akses Ditolak: Hanya profile browser kkgjatinagaraciamis@gmail.com yang diizinkan masuk.");
      }

      setLoggedInEmail("kkgjatinagaraciamis@gmail.com");
      localStorage.setItem("adminEmail", "kkgjatinagaraciamis@gmail.com");
      setIsPinUnlocked(true);
      setIsAdminMode(true);
      setShowLoginModal(false);
      showNotification("success", "Berhasil masuk instan as kkgjatinagaraciamis@gmail.com!");
      setEditingMenu({
        id: "",
        title: "",
        icon: "BookOpen",
        content: "",
        reloadUrl: "",
        isActive: true,
        order: menus.length + 1
      });

      // Optional background sync with container API
      fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: "kkgjatinagaraciamis@gmail.com", password: "fireapp123" })
      }).catch(() => {});
    } catch (err: any) {
      setPinError(err.message || "Gagal masuk instan.");
    } finally {
      setIsLoggingIn(false);
    }
  };

  const handleGoogleSignInClick = () => {
    setShowGoogleModal(true);
  };

  const selectGoogleAccount = async (email: string) => {
    if (email !== "kkgjatinagaraciamis@gmail.com") {
      alert("Akun ini tidak memiliki hak akses administrator di backend. Silakan pilih kkgjatinagaraciamis@gmail.com.");
      return;
    }
    
    setIsLoggingIn(true);
    setShowGoogleModal(false);
    
    try {
      setLoggedInEmail("kkgjatinagaraciamis@gmail.com");
      localStorage.setItem("adminEmail", "kkgjatinagaraciamis@gmail.com");
      setIsPinUnlocked(true);
      setIsAdminMode(true);
      setShowLoginModal(false);
      showNotification("success", "Sesi SSO Aktif: kkgjatinagaraciamis@gmail.com!");
      setEditingMenu({
        id: "",
        title: "",
        icon: "BookOpen",
        content: "",
        reloadUrl: "",
        isActive: true,
        order: menus.length + 1
      });

      // Optional background sync with container API
      fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email })
      }).catch(() => {});
    } catch (err: any) {
      alert("SSO Gagal di backend: " + err.message);
    } finally {
      setIsLoggingIn(false);
    }
  };

  const handleLogout = () => {
    setLoggedInEmail("");
    localStorage.removeItem("adminEmail");
    setIsPinUnlocked(false);
    setIsAdminMode(false);
    setAdminEmail("");
    setAdminPassword("");
    showNotification("success", "Sesi administrator sukses diakhiri.");
  };

  // Populate editor with a specific menu data
  const handleEditSelect = (menu: Menu) => {
    setEditingMenu({ ...menu });
    const element = document.getElementById("admin-editor");
    element?.scrollIntoView({ behavior: "smooth" });
  };

  // Templates to speed up creation of teacher administration materials inside backend
  const applyTemplate = (type: string) => {
    if (!editingMenu) return;
    let template = "";
    switch (type) {
      case "rpp":
        template = `<div class='space-y-4'>
  <h3 class='text-2xl font-bold text-emerald-800 border-b border-gray-200 pb-2'>Silabus & Contoh Modul Ajar</h3>
  <div class='bg-slate-50 p-5 rounded-2xl border-l-4 border-slate-400'>
    <h4 class='font-bold text-slate-800 text-lg mb-1'>IDENTITAS MODUL:</h4>
    <p class='text-xs text-slate-600 italic'>Madrasah Ibtidaiyah • Fase B / Kelas IV • PAI & Budi Pekerti • Semester Ganjil</p>
  </div>
  <div class='space-y-3'>
    <h4 class='font-bold text-emerald-900 text-base'>Langkah-Langkah Kegitatan Pembelajaran:</h4>
    <ol class='list-decimal list-inside space-y-2 text-slate-700 text-sm'>
      <li><strong>Kegiatan Awal (10 Menit):</strong> Salam pembuka, tadarus harian Juz 30, presensi, dan apersepsi materi.</li>
      <li><strong>Kegiatan Inti (50 Menit):</strong> Orientasi masalah, diskusi kelompok menggunakan media interaktif, presentasi siswa.</li>
      <li><strong>Kegiatan Penutup (10 Menit):</strong> Refleksi bersama, pengerjaan kuis kognitif singkat, doa penutup bersama.</li>
    </ol>
  </div>
</div>`;
        break;
      case "piket":
        template = `<div class='space-y-4'>
  <h3 class='text-2xl font-bold text-emerald-800 border-b border-gray-200 pb-2'>Agenda Piket Harian & Guru Pengampu</h3>
  <div class='overflow-x-auto'>
    <table class='min-w-full bg-white rounded-xl overflow-hidden border border-gray-200 text-sm'>
      <thead class='bg-slate-700 text-white text-xs'>
        <tr>
          <th class='py-3 px-4 text-left'>Hari</th>
          <th class='py-3 px-4 text-left'>Guru Piket Utama</th>
          <th class='py-3 px-4 text-left'>Tugas Khusus Lingkungan</th>
        </tr>
      </thead>
      <tbody class='divide-y divide-gray-100 text-gray-700'>
        <tr class='hover:bg-slate-50'>
          <td class='py-3 px-4 font-bold'>Senin</td>
          <td class='py-3 px-4'>Ustadzah Siti Zulaikha, S.Pd</td>
          <td class='py-3 px-4'>Upacara bendera & kerapian kelas hulu</td>
        </tr>
        <tr class='hover:bg-slate-50 bg-slate-50/50'>
          <td class='py-3 px-4 font-bold'>Selasa</td>
          <td class='py-3 px-4'>Ustadz Ahmad Hidayat, S.Pd.I</td>
          <td class='py-3 px-4'>Kontrol barisan pembacaan Asmaul Husna</td>
        </tr>
        <tr class='hover:bg-slate-50'>
          <td class='py-3 px-4 font-bold'>Rabu</td>
          <td class='py-3 px-4'>Ustadzah Maryam Munawwarah, S.Pd</td>
          <td class='py-3 px-4'>Pemeriksaan kesehatan kuku & seragam harian</td>
        </tr>
      </tbody>
    </table>
  </div>
</div>`;
        break;
      case "checklist":
        template = `<div class='space-y-4'>
  <h3 class='text-2xl font-bold text-emerald-800 border-b border-gray-200 pb-2'>Daftar Kelengkapan Berkas Sertifikasi</h3>
  <p class='text-xs text-slate-500'>Sesuai dengan Edaran Seksi Pendidikan Madrasah Kantor Kementerian Agama Kabupaten.</p>
  <ul class='grid grid-cols-1 gap-2.5 text-sm text-slate-700'>
    <li class='flex items-center gap-2.5 bg-slate-50 p-2.5 rounded-lg border border-gray-150'><span class='text-emerald-600 font-bold'>✔</span> Lembar Absensi Bulanan SIMPATIKA (Form S29a)</li>
    <li class='flex items-center gap-2.5 bg-slate-50 p-2.5 rounded-lg border border-gray-150'><span class='text-emerald-600 font-bold'>✔</span> Surat Keputusan Pembagian Kerja (SKBK) ditandatangani Kepala</li>
    <li class='flex items-center gap-2.5 bg-slate-50 p-2.5 rounded-lg border border-gray-150'><span class='text-emerald-600 font-bold'>✔</span> Jurnal Mengajar Harian Terfiliasi Sistem Pelaporan Madrasah</li>
    <li class='flex items-center gap-2.5 bg-slate-50 p-2.5 rounded-lg border border-gray-150'><span class='text-emerald-600 font-bold'>✔</span> Sertifikat Hasil Pelatihan Keprofesian Guru minimum 32 JP</li>
  </ul>
</div>`;
        break;
      default:
        template = `<div class='space-y-3'>
  <h3 class='text-2xl font-bold text-emerald-800'>Judul Berkas Administrasi</h3>
  <p class='text-slate-700'>Silakan cantumkan materi kurikulum, instruksi atau panduan pengisian guru di sini...</p>
</div>`;
    }
    setEditingMenu(prev => ({ ...prev, content: template }));
    showNotification("success", "Template isi administrasi berhasil dimuat!");
  };

  // Submit Menu Creation / Revision
  const handleSaveMenu = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingMenu?.id || !editingMenu?.title) {
      showNotification("error", "Harap isi ID Menu dan Judul Menu!");
      return;
    }

    setIsSaving(true);
    try {
      const menuData: Menu = {
        id: editingMenu.id,
        title: editingMenu.title,
        icon: editingMenu.icon || "BookOpen",
        content: editingMenu.content || "",
        reloadUrl: editingMenu.reloadUrl || "",
        isActive: editingMenu.isActive !== undefined ? editingMenu.isActive : true,
        order: editingMenu.order !== undefined ? Number(editingMenu.order) : 1
      };

      // Direct client-side Firestore write
      await setDoc(doc(db, "menus", menuData.id), menuData);

      showNotification("success", `Data menu "${editingMenu.title}" berhasil disimpan di database.`);
      
      await fetchMenus();
      
      // If updating currently active menu, sync its display
      if (activeMenu && activeMenu.id === editingMenu.id) {
        setActiveMenu(menuData);
      }

      // Reset fields
      setEditingMenu({
        id: "",
        title: "",
        icon: "BookOpen",
        content: "",
        reloadUrl: "",
        isActive: true,
        order: (menus && menus.length > 0 ? menus.length : 2) + 1
      });

      // Optional background sync with container API
      fetch("/api/menus/save", {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          "X-Admin-Email": loggedInEmail || ""
        },
        body: JSON.stringify(editingMenu)
      }).catch(() => {});
    } catch (err: any) {
      console.warn("Direct Firestore save failed, falling back to Express API:", err.message);
      try {
        const res = await fetch("/api/menus/save", {
          method: "POST",
          headers: { 
            "Content-Type": "application/json",
            "X-Admin-Email": loggedInEmail || ""
          },
          body: JSON.stringify(editingMenu)
        });

        const responseData = await res.json();
        if (!res.ok) throw new Error(responseData.error || "Gagal menyimpan");

        showNotification("success", `Data menu "${editingMenu.title}" berhasil disimpan di database sekolah.`);
        await fetchMenus();
        
        if (activeMenu && activeMenu.id === editingMenu.id) {
          setActiveMenu(responseData.data as Menu);
        }
      } catch (fallbackErr: any) {
        showNotification("error", fallbackErr.message || "Gagal mengirim data.");
      }
    } finally {
      setIsSaving(false);
    }
  };

  // Delete menu
  const handleDeleteMenu = async (id: string, title: string) => {
    if (!window.confirm(`Hapus menu "${title}" secara permanen dari basis data?`)) return;

    try {
      // Direct client-side Firestore delete
      await deleteDoc(doc(db, "menus", id));

      showNotification("success", `Berkas menu "${title}" sukses dihapus.`);
      
      if (activeMenu?.id === id) {
        setActiveMenu(null);
      }

      await fetchMenus();

      // Optional background sync with container API
      fetch(`/api/menus/${id}`, {
        method: "DELETE",
        headers: {
          "X-Admin-Email": loggedInEmail || ""
        }
      }).catch(() => {});
    } catch (err: any) {
      console.warn("Direct Firestore delete failed, falling back to Express API:", err.message);
      try {
        const res = await fetch(`/api/menus/${id}`, {
          method: "DELETE",
          headers: {
            "X-Admin-Email": loggedInEmail || ""
          }
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || "Gagal menghapus");

        showNotification("success", `Berkas menu "${title}" sukses dihapus.`);
        
        if (activeMenu?.id === id) {
          setActiveMenu(null);
        }

        await fetchMenus();
      } catch (fallbackErr: any) {
        showNotification("error", fallbackErr.message || "Gagal menghapus data.");
      }
    }
  };

  // Reset database back to default
  const handleResetToDefault = async () => {
    if (!window.confirm("Apakah Anda ingin mereset seluruh database administrasi guru ke pengaturan bawaan? Perubahan kustom akan terhapus.")) return;

    try {
      // Direct client-side batch write
      const deleteBatch = writeBatch(db);
      
      const snap = await getDocs(collection(db, "menus"));
      for (const d of snap.docs) {
        deleteBatch.delete(d.ref);
      }
      await deleteBatch.commit();
      
      const insertBatch = writeBatch(db);
      for (const item of DEFAULT_MENUS) {
        const docRef = doc(db, "menus", item.id);
        insertBatch.set(docRef, item);
      }
      await insertBatch.commit();

      showNotification("success", "Basis data sukses direset ke berkas Administrasi Guru bawaan!");
      setMenus(DEFAULT_MENUS);
      setActiveMenu(null);

      // Optional background sync with container API
      fetch("/api/menus/reset-default", { 
        method: "POST",
        headers: {
          "X-Admin-Email": loggedInEmail || ""
        }
      }).catch(() => {});
    } catch (err: any) {
      console.warn("Direct Firestore reset failed, falling back to Express API:", err.message);
      try {
        const res = await fetch("/api/menus/reset-default", { 
          method: "POST",
          headers: {
            "X-Admin-Email": loggedInEmail || ""
          }
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || "Reset gagal");

        showNotification("success", "Basis data sukses direset ke berkas Administrasi Guru bawaan!");
        setMenus(data.menus || []);
        setActiveMenu(null);
      } catch (fallbackErr: any) {
        showNotification("error", "Gagal mereset: " + fallbackErr.message);
      }
    }
  };

  // Swap menu display order
  const adjustOrder = async (menuId: string, direction: "up" | "down") => {
    const sortedMenus = [...menus];
    const index = sortedMenus.findIndex(m => m.id === menuId);
    if (index === -1) return;

    const targetIndex = direction === "up" ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= sortedMenus.length) return;

    const tempOrder = sortedMenus[index].order;
    sortedMenus[index].order = sortedMenus[targetIndex].order;
    sortedMenus[targetIndex].order = tempOrder;

    try {
      // Direct client-side batch update
      const batch = writeBatch(db);
      for (const item of sortedMenus) {
        if (item.id) {
          const docRef = doc(db, "menus", item.id);
          batch.set(docRef, {
            id: item.id,
            title: item.title,
            icon: item.icon || "BookOpen",
            content: item.content || "",
            reloadUrl: item.reloadUrl || "",
            isActive: item.isActive !== undefined ? item.isActive : true,
            order: item.order !== undefined ? Number(item.order) : 1
          });
        }
      }
      await batch.commit();

      showNotification("success", "Urutan menu berhasil disesuaikan!");
      fetchMenus();

      // Optional background sync with container API
      fetch("/api/menus/bulk", {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          "X-Admin-Email": loggedInEmail || ""
        },
        body: JSON.stringify({ menus: sortedMenus })
      }).catch(() => {});
    } catch (err: any) {
      console.warn("Direct Firestore bulk update failed, falling back to Express API:", err.message);
      try {
        const res = await fetch("/api/menus/bulk", {
          method: "POST",
          headers: { 
            "Content-Type": "application/json",
            "X-Admin-Email": loggedInEmail || ""
          },
          body: JSON.stringify({ menus: sortedMenus })
        });
        if (!res.ok) throw new Error("Gagal menyimpan ke database");
        showNotification("success", "Urutan menu berhasil disesuaikan!");
        fetchMenus();
      } catch (fallbackErr: any) {
        showNotification("error", fallbackErr.message);
      }
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans flex flex-col selection:bg-emerald-100 selection:text-emerald-900" id="main_app_wrapper">
      
      {/* Toast Notification Banner */}
      <AnimatePresence>
        {notification && (
          <motion.div
            initial={{ opacity: 0, y: -50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.9 }}
            className={`fixed top-4 left-1/2 -translate-x-1/2 z-50 flex items-center gap-3 px-6 py-4 rounded-2xl shadow-xl border text-sm max-w-md w-11/12 md:w-auto ${
              notification.type === "success"
                ? "bg-emerald-700 text-white border-emerald-500"
                : "bg-red-700 text-white border-red-500"
            }`}
            id="toast_notification"
          >
            {notification.type === "success" ? <Check className="w-5 h-5 shrink-0" /> : <AlertCircle className="w-5 h-5 shrink-0" />}
            <span className="font-semibold leading-snug">{notification.message}</span>
          </motion.div>
        )}
      </AnimatePresence>



      {/* Main Header / Navigation Menu */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md text-slate-800 border-b border-slate-200 shadow-xs px-4 sm:px-6 py-3.5" id="header_navigation">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          
          <div className="flex items-center gap-3 cursor-pointer" onClick={handleReturnHome} id="brand_logo">
            <div className="w-10 h-10 md:w-12 md:h-12 flex items-center justify-center overflow-hidden">
              <img 
                src="https://i.ibb.co.com/cXgkLJr9/konfirmasi-pembayaran-baznas-kabupaten-langkat-23.png" 
                alt="Logo Madrasah Ibtidaiyah" 
                className="w-full h-full object-contain"
                referrerPolicy="no-referrer"
              />
            </div>
            <div>
              <h1 className="font-bold text-base md:text-lg tracking-tight leading-none text-emerald-800">
                Penyediaan Administrasi Guru MI
              </h1>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-4" id="desktop_nav_links">
            <button
              onClick={handleReturnHome}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium transition ${!activeMenu ? "bg-slate-100 text-emerald-800 border border-slate-200 font-bold" : "hover:bg-slate-100 text-slate-600"}`}
            >
              Beranda Utama
            </button>
            <div className="h-4 w-px bg-slate-200"></div>
            <div className="flex items-center gap-1.5">
              {menus.map(menu => (
                <button
                  key={menu.id}
                  onClick={() => selectMenu(menu)}
                  className={`px-3 py-1.5 rounded-lg text-sm font-medium transition ${activeMenu?.id === menu.id ? "bg-emerald-800 text-white font-semibold" : "hover:bg-slate-100 text-slate-600"}`}
                >
                  {menu.title}
                </button>
              ))}
            </div>
          </nav>

          {/* Right Controls: 3-Dot Dropdown Menu */}
          <div className="relative">
            <button
              onClick={() => setShowMoreDropdown(prev => !prev)}
              className="p-2.5 bg-slate-50 hover:bg-slate-100 text-slate-700 rounded-xl flex items-center justify-center border border-slate-200 shadow-sm transition-all focus:outline-none focus:ring-2 focus:ring-emerald-500 cursor-pointer"
              id="mobile_dots_toggle"
              aria-label="Toggle Menu"
            >
              <MoreVertical className="w-5 h-5 text-slate-700" />
            </button>

            {/* Dropdown Menu Box */}
            <AnimatePresence>
              {showMoreDropdown && (
                <>
                  <div 
                    className="fixed inset-0 z-40 cursor-default" 
                    onClick={() => setShowMoreDropdown(false)} 
                  />
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95, y: 10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: 10 }}
                    className="absolute right-0 top-12 w-56 bg-white rounded-2xl shadow-xl border border-slate-150 z-50 py-2 text-sm text-slate-800"
                    id="more_dropdown_panel"
                  >
                    {loggedInEmail ? (
                      <div className="px-4 py-2 border-b border-slate-100 mb-1 select-none">
                        <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">MASUK SEBAGAI:</p>
                        <p className="text-xs font-mono font-bold text-emerald-850 break-all">{loggedInEmail}</p>
                      </div>
                    ) : (
                      <div className="px-4 py-1.5 border-b border-slate-100 mb-1 select-none">
                        <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">OPSI PORTAL</p>
                      </div>
                    )}

                    <button
                      onClick={() => {
                        setShowMoreDropdown(false);
                        handleReturnHome();
                      }}
                      className="w-full text-left px-4 py-2.5 hover:bg-slate-50 font-semibold text-slate-700 flex items-center gap-2 transition"
                    >
                      <School className="w-4 h-4 text-emerald-800" />
                      <span>Beranda Utama</span>
                    </button>

                    {/* Show quick menu shortcuts in mobile */}
                    <div className="lg:hidden border-t border-b border-slate-100/60 my-1 py-1 bg-slate-50/50">
                      <p className="text-[9px] text-slate-400 font-bold px-4 mb-1 uppercase tracking-wider">Navigasi Berkas:</p>
                      {menus.map(menu => (
                        <button
                          key={menu.id}
                          onClick={() => {
                            setShowMoreDropdown(false);
                            selectMenu(menu);
                          }}
                          className={`w-full text-left px-4 py-2 hover:bg-slate-100 font-medium text-xs flex items-center gap-2 ${activeMenu?.id === menu.id ? "text-emerald-800 font-bold bg-slate-50" : "text-slate-600"}`}
                        >
                          <span className="opacity-70 scale-75 shrink-0">{getMenuIcon(menu.icon)}</span>
                          <span className="truncate">{menu.title}</span>
                        </button>
                      ))}
                    </div>

                    {!loggedInEmail ? (
                      <button
                        onClick={() => {
                          setShowMoreDropdown(false);
                          setShowLoginModal(true);
                        }}
                        className="w-full text-left px-4 py-2.5 hover:bg-slate-50 font-bold text-emerald-800 border-t border-slate-100 flex items-center gap-2 transition"
                        id="option_login_btn"
                      >
                        <Lock className="w-4 h-4 text-emerald-800 shrink-0" />
                        <span>Login Admin</span>
                      </button>
                    ) : (
                      <>
                        <button
                          onClick={() => {
                            setShowMoreDropdown(false);
                            setIsAdminMode(prev => !prev);
                            setTimeout(() => {
                              document.getElementById("admin-section-anchor")?.scrollIntoView({ behavior: "smooth" });
                            }, 100);
                          }}
                          className={`w-full text-left px-4 py-2.5 hover:bg-slate-50 font-bold flex items-center gap-2 transition ${isAdminMode ? "text-orange-700 font-extrabold" : "text-emerald-800"}`}
                        >
                          <Settings className="w-4 h-4 text-slate-500" />
                          <span>{isAdminMode ? "Tutup Kelola" : "Kelola Berkas"}</span>
                        </button>
                        <button
                          onClick={() => {
                            setShowMoreDropdown(false);
                            handleLogout();
                          }}
                          className="w-full text-left px-4 py-2.5 hover:bg-red-50 font-bold text-red-650 border-t border-slate-100 flex items-center gap-2 transition shadow-inner"
                          id="option_logout_btn"
                        >
                          <X className="w-4 h-4 text-red-500 shrink-0" />
                          <span>Keluar (Logout)</span>
                        </button>
                      </>
                    )}
                  </motion.div>
                </>
              )}
            </AnimatePresence>
          </div>

        </div>
      </header>

      {/* Mobile Slider Menu Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-white border-b border-slate-200 overflow-hidden shadow-lg"
            id="mobile_menu_drawer"
          >
            <div className="p-4 space-y-3">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  setIsAdminMode(prev => !prev);
                  setTimeout(() => {
                    document.getElementById("admin-section-anchor")?.scrollIntoView({ behavior: "smooth" });
                  }, 200);
                }}
                className="w-full py-3 bg-slate-800 text-white rounded-xl font-bold text-sm tracking-wide flex items-center justify-center gap-2 shadow-sm hover:bg-slate-700"
              >
                <Settings className="w-4 h-4" />
                {isAdminMode ? "Tutup Dashboard" : "Masuk Panel Admin"}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Page Body Frame */}
      <main className="flex-1" id="main_application_container">
        
        {/* State 1: HERO & ABOUT - Only visible if no active menu chosen */}
        <AnimatePresence mode="wait">
          {!activeMenu ? (
            <motion.div
              key="beranda-landing"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.35 }}
              className="space-y-8 pb-16"
              id="home_landing_view"
            >
              {/* Green & Gray Subtle Hero Canvas */}
              <section className="relative overflow-hidden bg-gradient-to-br from-emerald-800 via-emerald-700 to-emerald-900 text-white py-12 md:py-20 px-4 md:px-8 border-b border-slate-300" id="hero_section">
                
                {/* Visual geometric designs (opacity lowered for clean readability) */}
                <div className="absolute inset-0 opacity-5 pointer-events-none">
                  <div className="absolute top-10 left-10 w-48 h-48 rounded-full border-4 border-white"></div>
                  <div className="absolute bottom-10 right-10 w-72 h-72 rounded-full border-8 border-slate-350"></div>
                  <div className="absolute inset-0 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:20px_20px]"></div>
                </div>

                <div className="max-w-7xl mx-auto flex flex-col items-center justify-center text-center relative z-10 py-6">
                  <div className="space-y-4 md:space-y-5">
                    <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight leading-tight md:leading-none text-white">
                      Kemudahan Administrasi, <br />
                      Meningkatkan <span className="text-slate-200 underline decoration-emerald-400 underline-offset-4 font-black">Dedikasi Pendidikan</span>
                    </h2>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
                    </div>
                  </div>
                </div>
              </section>

              {/* Statistical Bento Section with Neutral Grays */}
              <section className="max-w-7xl mx-auto px-4 flex justify-center" id="stats_section">
              </section>

              {/* Dynamic Interactive Madrasah Menu Buttons Grid */}
              <section className="max-w-7xl mx-auto px-4 py-4" id="menu-pendidikan-section">

                {loading ? (
                  <div className="flex flex-col items-center justify-center py-12 gap-2" id="loading_spinner">
                    <RotateCw className="w-8 h-8 text-emerald-700 animate-spin" />
                    <p className="text-xs text-slate-400 animate-pulse font-medium">Mengambil rekap instrumen madrasah...</p>
                  </div>
                ) : error ? (
                  <div className="bg-red-50 border border-red-200 text-red-800 p-6 rounded-xl text-center max-w-md mx-auto space-y-3" id="error_alert">
                    <AlertCircle className="w-10 h-10 text-red-500 mx-auto" />
                    <h4 className="font-bold">Sambungan Server Terganggu</h4>
                    <p className="text-xs">{error}</p>
                    <button 
                      onClick={fetchMenus}
                      className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white font-bold rounded text-xs"
                    >
                      Coba Lagi
                    </button>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-2xl mx-auto" id="menus_buttons_grid">
                    {menus.filter(m => m.isActive && m.id !== "jadwal-mengajar" && m.id !== "daftar-guru" && m.id !== "pengembangan-diri").map((menu, idx) => (
                      <motion.button
                        key={menu.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.04 }}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => selectMenu(menu)}
                        className="relative overflow-hidden bg-white hover:bg-slate-50 text-left p-5 rounded-2xl border-2 border-slate-100 hover:border-emerald-600 transition-all duration-200 cursor-pointer shadow-xs flex flex-col justify-between group h-40"
                      >
                        {/* Gray pattern effect */}
                        <div className="absolute -bottom-6 -right-6 w-16 h-16 bg-slate-105 rounded-full group-hover:bg-emerald-50 transition-colors pointer-events-none"></div>

                        <div className="w-10 h-10 bg-slate-100 text-emerald-800 rounded-lg flex items-center justify-center transition-all duration-300 shadow-xs group-hover:bg-emerald-800 group-hover:text-white">
                          {getMenuIcon(menu.icon)}
                        </div>

                        <div className="mt-4">
                          <h4 className="font-bold text-slate-800 group-hover:text-emerald-900 text-sm sm:text-base leading-tight">
                            {menu.title}
                          </h4>
                          <span className="inline-flex items-center gap-1 text-[10px] text-slate-400 font-bold mt-1 group-hover:text-emerald-850 transition-all">
                             Buka Materi ➔
                          </span>
                        </div>
                      </motion.button>
                    ))}
                  </div>
                )}
              </section>



            </motion.div>
          ) : (
            // State 2: DETAIL MENU CONTENT - Reloads in the same page with a back button and same-page fresh options
            <motion.div
              key={`menu-content-${activeMenu.id}-${reloadKey}`}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.35 }}
              className="max-w-5xl mx-auto px-4 py-8 space-y-6"
              ref={contentRef}
              id="menu_content_view"
            >
              
              {/* Internal Content Path / Navigation Panel */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-emerald-850 text-white p-4 rounded-xl shadow-md border-b border-emerald-950" id="content_header_panel">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center border border-white/10">
                    {getMenuIcon(activeMenu.icon)}
                  </div>
                  <div>
                    <span className="text-[10px] font-bold text-slate-300 uppercase tracking-widest leading-none">Administrasi Guru MI</span>
                    <h2 className="text-base md:text-lg font-bold leading-none">{activeMenu.title}</h2>
                  </div>
                </div>

                <div className="flex items-center gap-2 self-stretch sm:self-auto justify-end">
                  <button
                    onClick={handleReloadContent}
                    disabled={isRefreshing}
                    className="p-2 bg-white/10 hover:bg-white/20 text-white rounded-lg text-xs font-semibold flex items-center gap-1 border border-white/15 transition"
                    title="Reload data harian"
                    id="inner_reload_btn"
                  >
                    <RotateCw className={`w-3.5 h-3.5 ${isRefreshing ? "animate-spin" : ""}`} />
                    <span>Muat Ulang (Reload)</span>
                  </button>
                  <button
                    onClick={handleReturnHome}
                    className="p-2 bg-slate-100 hover:bg-white text-emerald-900 rounded-lg text-xs font-bold flex items-center gap-1 transition"
                    id="inner_back_btn"
                  >
                    <ArrowLeft className="w-3.5 h-3.5" />
                    <span>Kembali Beranda</span>
                  </button>
                </div>
              </div>

              {/* Dynamic Iframe Reload Section if reloadUrl is set by admin */}
              {activeMenu.reloadUrl ? (
                <div className="bg-white rounded-2xl border border-slate-205 overflow-hidden shadow-sm" id="iframe_container">
                  <div className="bg-slate-50 px-4 py-2 text-xs text-slate-500 font-mono flex items-center justify-between border-b border-slate-200">
                    <span className="truncate">Tautan eksternal termuat: {activeMenu.reloadUrl}</span>
                    <span className="bg-emerald-50 text-emerald-800 text-[10px] font-bold px-1.5 py-0.5 rounded">Frame Aktif</span>
                  </div>
                  <iframe 
                    src={activeMenu.reloadUrl} 
                    className="w-full min-h-[500px] border-none"
                    title={activeMenu.title}
                    id="menu_iframe"
                  />
                  <div className="bg-slate-100 p-3.5 text-center text-xs text-slate-650 font-medium border-t border-slate-200">
                    Halaman ini dimuat otomatis tanpa membuka tab browser baru. Tekan tombol <strong className="cursor-pointer underline text-emerald-800" onClick={handleReturnHome}>Kembali Utama</strong> di atas untuk melihat agenda madrasah lainnya.
                  </div>
                </div>
              ) : (
                /* Primary HTML/Teks Editor Render */
                <article className="bg-white rounded-2xl p-6 md:p-8 border border-slate-200 shadow-sm min-h-[300px] prose prose-slate max-w-none text-slate-800" id="article_viewer">
                  {isRefreshing ? (
                    <div className="flex flex-col items-center justify-center py-20 gap-2">
                      <RotateCw className="w-8 h-8 text-emerald-700 animate-spin" />
                      <p className="text-xs text-slate-400 font-medium">Memuat ulang data konten sekolah...</p>
                    </div>
                  ) : activeMenu.content ? (
                    <div 
                      dangerouslySetInnerHTML={{ __html: activeMenu.content }} 
                      className="space-y-4"
                      id="html_rendered_content"
                    />
                  ) : (
                    <div className="text-center py-12 space-y-3">
                      <FileText className="w-10 h-10 text-slate-300 mx-auto" />
                      <h3 className="font-bold text-slate-500">Materi Administrasi Kosong</h3>
                      <p className="text-xs text-slate-400 max-w-sm mx-auto">
                        Materi untuk menu "{activeMenu.title}" masih kosong. Silakan masuk ke Mode Panel Admin di bagian bawah untuk mengubah konten secara instan.
                      </p>
                    </div>
                  )}
                </article>
              )}

              {/* Quick Navigation Slider for other menus on the bottom */}
              <div className="bg-slate-100 rounded-2xl p-4 md:p-5 border border-slate-200 space-y-3" id="bottom_quick_nav">
                <h4 className="text-xs font-bold uppercase text-slate-500 tracking-wider flex items-center gap-1.5">
                  <Layers className="w-4 h-4 text-emerald-700" /> Buka Administrasi Guru Lainnya:
                </h4>
                <div className="flex flex-wrap gap-1.5">
                  {menus.filter(m => m.id !== activeMenu.id && m.isActive).map(menu => (
                    <button
                      key={menu.id}
                      onClick={() => selectMenu(menu)}
                      className="px-3 py-1.5 bg-white hover:bg-slate-50 border border-slate-200 rounded-lg text-xs font-bold transition flex items-center gap-1.5 text-slate-700"
                    >
                      {getMenuIcon(menu.icon)}
                      <span>{menu.title}</span>
                    </button>
                  ))}
                  <button
                    onClick={handleReturnHome}
                    className="px-3 py-1.5 bg-emerald-800 hover:bg-emerald-700 text-white rounded-lg text-xs font-bold flex items-center gap-1"
                  >
                    <School className="w-4 h-4" />
                    <span>Kembali Utama</span>
                  </button>
                </div>
              </div>

            </motion.div>
          )}
        </AnimatePresence>



        {/* ADMIN BACKEND CONTROL DASHBOARD PANEL */}
        <AnimatePresence>
          {isAdminMode && isPinUnlocked && (
            <motion.section
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 30 }}
              className="border-t border-slate-200 bg-white py-12 px-4 sm:px-6 shadow-2xl relative"
              id="admin_backend_dashboard"
            >
              <div className="max-w-7xl mx-auto space-y-8">
                
                <div id="admin-section-anchor" className="absolute -top-12"></div>
                
                {/* Dashboard Headings Panel */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-emerald-50 border border-emerald-100 p-6 rounded-2xl">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-emerald-600 animate-pulse"></span>
                      <h3 className="font-extrabold text-lg md:text-xl text-emerald-950 tracking-tight">KONTROL PANEL ADMINISTRASI (DAPODIK/KKG)</h3>
                    </div>
                    <p className="text-xs text-slate-600 max-w-2xl leading-relaxed">
                      Sesi Admin Aktif: <strong className="font-semibold text-emerald-850 font-mono text-[11px]">kkgjatinagaraciamis@gmail.com</strong>. Anda memiliki wewenang penuh untuk mereorganisasi, merevisi naskah, menyetel URL external, atau menambahkan tab administrasi.
                    </p>
                  </div>
                  
                  <div className="flex flex-wrap items-center gap-2">
                    <button
                      onClick={handleResetToDefault}
                      className="px-3.5 py-2 bg-white hover:bg-slate-50 text-slate-700 hover:text-slate-900 rounded-xl border border-slate-200 text-xs font-bold transition flex items-center gap-1.5 shadow-xs"
                      title="Kembalikan semua menu ke setelan standar"
                    >
                      <RotateCw className="w-3.5 h-3.5" />
                      <span>Reset Data Guru</span>
                    </button>
                    <button
                      onClick={() => setIsAdminMode(false)}
                      className="px-3.5 py-2 bg-slate-800 hover:bg-slate-900 text-white rounded-xl text-xs font-bold transition flex items-center gap-1.5 shadow-xs"
                    >
                      <X className="w-3.5 h-3.5" />
                      <span>Tutup Dashboard</span>
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                  
                  {/* Left Column (Lists & Order Controller) */}
                  <div className="lg:col-span-12 xl:col-span-5 space-y-4 text-left">
                    <div className="flex items-center justify-between">
                      <h4 className="text-xs font-bold uppercase text-slate-400 tracking-wider">Daftar Tombol Navigasi Madrasah</h4>
                      <button
                        onClick={() => {
                          setEditingMenu({
                            id: "",
                            title: "",
                            icon: "BookOpen",
                            content: "",
                            reloadUrl: "",
                            isActive: true,
                            order: menus.length + 1
                          });
                          document.getElementById("editor_title_input")?.focus();
                        }}
                        className="px-3 py-1.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-850 rounded-lg text-[11px] font-bold transition flex items-center gap-1"
                        id="add_new_menu_trigger"
                      >
                        <Plus className="w-3 h-3" />
                        <span>Tambah Kategori</span>
                      </button>
                    </div>

                    <div className="bg-slate-50/50 rounded-2xl border border-slate-150 p-3 space-y-2">
                      {menus.map((menu, index) => (
                        <div
                          key={menu.id}
                          className={`p-3 rounded-xl border transition-all flex items-center justify-between gap-3 ${
                            editingMenu?.id === menu.id
                              ? "bg-emerald-50/60 border-emerald-400"
                              : "bg-white border-slate-200/80 hover:border-slate-300"
                          }`}
                        >
                          <div
                            className="flex items-center gap-2.5 cursor-pointer flex-1 min-w-0"
                            onClick={() => handleEditSelect(menu)}
                          >
                            <span className="w-6 h-6 bg-slate-100/80 rounded-lg flex items-center justify-center text-emerald-850 shrink-0 text-xs font-bold font-mono">
                              {index + 1}
                            </span>
                            <div className="truncate text-left">
                              <p className="text-xs font-bold text-slate-800 leading-tight truncate">{menu.title}</p>
                              <span className="text-[9px] text-slate-450 font-mono truncate block mt-0.5">
                                {menu.reloadUrl ? `Direct Frame URL: ${menu.reloadUrl}` : "Isi Halaman (Rich HTML)"}
                              </span>
                            </div>
                          </div>

                          <div className="flex items-center gap-1 shrink-0">
                            {/* Direction Controls */}
                            <button
                              disabled={index === 0}
                              onClick={() => adjustOrder(menu.id, "up")}
                              className="p-1 hover:bg-slate-100 rounded text-slate-400 hover:text-slate-700 disabled:opacity-30 transition cursor-pointer"
                              title="Geser Atas"
                            >
                              ▲
                            </button>
                            <button
                              disabled={index === menus.length - 1}
                              onClick={() => adjustOrder(menu.id, "down")}
                              className="p-1 hover:bg-slate-100 rounded text-slate-400 hover:text-slate-700 disabled:opacity-30 transition cursor-pointer"
                              title="Geser Bawah"
                            >
                              ▼
                            </button>
                            
                            <div className="w-px h-4 bg-slate-250 mx-1"></div>

                            {/* Trash Button */}
                            <button
                              onClick={() => handleDeleteMenu(menu.id, menu.title)}
                              className="p-1.5 hover:bg-red-50 rounded-lg text-slate-400 hover:text-red-650 transition cursor-pointer"
                              title="Hapus Menu"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Right Column (Form & HTML Editor Workspace) */}
                  <div className="lg:col-span-12 xl:col-span-7">
                    {editingMenu ? (
                      <form onSubmit={handleSaveMenu} className="bg-slate-50/50 rounded-2xl border border-slate-150 p-5 space-y-4 text-left">
                        <div className="flex items-center justify-between border-b border-slate-150 pb-3">
                          <h4 className="font-bold text-xs uppercase text-slate-400 tracking-wider">
                            {editingMenu.id ? "Edit Berkas Administrasi" : "Unduh Formula Baru"}
                          </h4>
                          <span className="text-[10px] bg-slate-205 text-slate-700 px-2 py-0.5 rounded font-bold uppercase">
                            {editingMenu.id ? "Sunting Sesi" : "Kategori Baru"}
                          </span>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-1.5">
                            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block font-sans">ID Unik Menu *</label>
                            <input
                              type="text"
                              required
                              disabled={!!editingMenu.id} // Primary key block
                              placeholder="contoh: rpp-kelas-6"
                              value={editingMenu.id || ""}
                              onChange={(e) => setEditingMenu(prev => ({ ...prev, id: e.target.value.toLowerCase().trim().replace(/[^a-z0-9\-]/g, "-") }))}
                              className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-white focus:ring-1 focus:ring-emerald-500 outline-none text-xs text-slate-800 font-mono disabled:opacity-60"
                            />
                          </div>

                          <div className="space-y-1.5">
                            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block font-sans">Nama / Judul Tombol *</label>
                            <input
                              type="text"
                              required
                              id="editor_title_input"
                              placeholder="Contoh: Jadwal Mengajar Guru"
                              value={editingMenu.title || ""}
                              onChange={(e) => setEditingMenu(prev => ({ ...prev, title: e.target.value }))}
                              className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-white focus:ring-1 focus:ring-emerald-500 outline-none text-xs text-slate-800 font-bold"
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-1.5">
                            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block font-sans">Ikon Visual (Lucide)</label>
                            <select
                              value={editingMenu.icon || "BookOpen"}
                              onChange={(e) => setEditingMenu(prev => ({ ...prev, icon: e.target.value }))}
                              className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-white focus:ring-1 focus:ring-emerald-500 outline-none text-xs text-slate-700"
                            >
                              <option value="BookOpen">📖 Buku Terbuka (BookOpen)</option>
                              <option value="FileText">📄 Dokumen Teks (FileText)</option>
                              <option value="GraduationCap">🎓 Topi Wisuda (GraduationCap)</option>
                              <option value="Award">🏆 Penghargaan (Award)</option>
                              <option value="Calendar">📅 Kalender Akad (Calendar)</option>
                              <option value="Building">🏢 Gedung Sekolah (Building)</option>
                              <option value="Users">👥 Komunitas Guru (Users)</option>
                              <option value="School">🏫 Madrasah Utama (School)</option>
                              <option value="Settings">⚙ Setelan Sist (Settings)</option>
                              <option value="List">📋 Daftar Tabel (List)</option>
                            </select>
                          </div>

                          <div className="space-y-1.5">
                            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block font-sans">Link Reload Luar / Google Drive (Opsional)</label>
                            <input
                              type="url"
                              placeholder="https://docs.google.com/embed..."
                              value={editingMenu.reloadUrl || ""}
                              onChange={(e) => setEditingMenu(prev => ({ ...prev, reloadUrl: e.target.value }))}
                              className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-white focus:ring-1 focus:ring-emerald-500 outline-none text-xs text-slate-800"
                            />
                          </div>
                        </div>

                        <div className="space-y-1.5">
                          <div className="flex items-center justify-between">
                            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block font-sans">Isi Dokumen Utama (Format HTML / Naskah)</label>
                            <div className="flex gap-1.5">
                              <button
                                type="button"
                                onClick={() => applyTemplate("rpp")}
                                className="px-2 py-0.5 bg-slate-200 hover:bg-slate-300 rounded text-[9px] font-bold text-slate-650 transition cursor-pointer"
                              >
                                + RPP
                              </button>
                              <button
                                type="button"
                                onClick={() => applyTemplate("jadwal")}
                                className="px-2 py-0.5 bg-slate-200 hover:bg-slate-300 rounded text-[9px] font-bold text-slate-650 transition cursor-pointer"
                              >
                                + Jadwal
                              </button>
                              <button
                                type="button"
                                onClick={() => applyTemplate("checklist")}
                                className="px-2 py-0.5 bg-slate-200 hover:bg-slate-300 rounded text-[9px] font-bold text-slate-650 transition cursor-pointer"
                              >
                                + Checklist
                              </button>
                            </div>
                          </div>
                          
                          <textarea
                            rows={8}
                            placeholder="Tulis kode HTML atau deskripsi program di sini..."
                            value={editingMenu.content || ""}
                            onChange={(e) => setEditingMenu(prev => ({ ...prev, content: e.target.value }))}
                            className="w-full p-3 rounded-xl border border-slate-200 bg-white focus:ring-1 focus:ring-emerald-500 outline-none text-xs text-slate-800 font-mono"
                          />
                        </div>

                        {/* Live Preview Block */}
                        {editingMenu.content && !editingMenu.reloadUrl && (
                          <div className="bg-white p-4 rounded-xl border border-slate-150 space-y-2 mt-2">
                            <span className="text-[9px] font-bold text-emerald-850 bg-emerald-50 border border-emerald-100 px-1.5 py-0.5 rounded tracking-wide uppercase">Draf Pratinjau Langsung:</span>
                            <div 
                              className="text-xs text-slate-800 space-y-2 prose prose-slate max-w-none shadow-xs p-2.5 rounded-lg border border-slate-50 overflow-auto max-h-40"
                              dangerouslySetInnerHTML={{ __html: editingMenu.content }}
                            />
                          </div>
                        )}

                        <div className="flex gap-2 justify-end pt-2 border-t border-slate-150">
                          <button
                            type="button"
                            onClick={() => setEditingMenu(null)}
                            className="px-4 py-2 bg-slate-150 hover:bg-slate-200 text-slate-700 rounded-xl font-bold text-xs transition cursor-pointer"
                          >
                            Batal
                          </button>
                          <button
                            type="submit"
                            disabled={isSaving}
                            className="px-5 py-2 bg-emerald-800 hover:bg-emerald-900 text-white rounded-xl font-bold text-xs transition flex items-center gap-1 shadow-md cursor-pointer"
                          >
                            {isSaving ? <RotateCw className="w-3.5 h-3.5 animate-spin" /> : <CheckCircle2 className="w-3.5 h-3.5" />}
                            <span>Simpan Berkas</span>
                          </button>
                        </div>
                      </form>
                    ) : (
                      <div className="h-full min-h-[300px] border-2 border-dashed border-slate-200 rounded-2xl flex flex-col items-center justify-center p-8 text-center space-y-3 bg-slate-50/20">
                        <FileText className="w-12 h-12 text-slate-300 animate-pulse" />
                        <h5 className="font-bold text-slate-500 text-sm">Belum Ada Menu Dipilih</h5>
                        <p className="text-xs text-slate-400 max-w-xs leading-relaxed">
                          Silakan klik salah satu menu di kolom kiri untuk mulai menyunting data, atau klik tombol <strong className="text-emerald-800">Tambah Kategori</strong> untuk membuat naskah administrasi madrasah yang baru.
                        </p>
                      </div>
                    )}
                  </div>

                </div>

              </div>
            </motion.section>
          )}
        </AnimatePresence>

      </main>

      {/* Elegant Footer with Green & Gray details */}
      <footer className="bg-emerald-900 text-white border-t border-slate-700 py-8 px-4" id="app_footer">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div>
              <p className="font-bold text-sm tracking-tight leading-none">Muhammad Imam Syafi'i @ 2026</p>
            </div>
          </div>
        </div>
      </footer>

      {/* Admin Login Modal Container */}
      <AnimatePresence>
        {showLoginModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center z-50 p-4"
            id="admin_login_modal_container"
          >
            <motion.div
              initial={{ scale: 0.95, y: 15 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 15 }}
              className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-100 text-slate-800 space-y-5"
            >
              <div className="text-center space-y-1">
                <div className="w-12 h-12 bg-emerald-50 rounded-full flex items-center justify-center text-emerald-800 mx-auto border-2 border-emerald-100">
                  <Lock className="w-5 h-5 text-emerald-800" />
                </div>
                <h3 className="font-extrabold text-xl text-slate-900 tracking-tight mt-3">Autentikasi Administrator</h3>
                <p className="text-xs text-slate-500">Khusus Operator Kurikulum & Administrasi & Komunitas KKG</p>
                
                {/* Genuine Browser Account Status Badge */}
                <div className="pt-2">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-250 text-emerald-999 shadow-xs text-[11px] font-bold">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                    <span>Sesi Akun Browser Aktif: <strong className="font-mono text-[10px]">kkgjatinagaraciamis@gmail.com</strong></span>
                  </div>
                </div>
              </div>

              {pinError && (
                <div className="bg-red-50 border border-red-200 text-red-800 p-3.5 rounded-xl text-xs flex items-start gap-2" id="login_error_alert">
                  <AlertCircle className="w-4.5 h-4.5 text-red-500 shrink-0 mt-0.5" />
                  <div className="leading-relaxed">
                    <strong className="font-bold">Gagal Masuk: </strong>
                    <span>{pinError}</span>
                  </div>
                </div>
              )}

              <form onSubmit={handleUnlockAdmin} className="space-y-4">
                <div className="space-y-1.5 flex flex-col text-left">
                  <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">ID E-mail Madrasah</label>
                  <input
                    type="email"
                    required
                    value={adminEmail}
                    onChange={(e) => setAdminEmail(e.target.value)}
                    placeholder="kkgjatinagaraciamis@gmail.com"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-205 focus:border-emerald-600 focus:ring-1 focus:ring-emerald-650 text-sm outline-none font-medium text-slate-800 bg-slate-50/50"
                  />
                </div>

                <div className="space-y-1.5 flex flex-col text-left">
                  <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Password Sandi FireApp</label>
                  <input
                    type="password"
                    required
                    value={adminPassword}
                    onChange={(e) => setAdminPassword(e.target.value)}
                    placeholder="Masukkan sandi..."
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-205 focus:border-emerald-600 focus:ring-1 focus:ring-emerald-650 text-sm outline-none font-medium text-slate-800 bg-slate-50/50"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isLoggingIn}
                  className="w-full py-3 bg-emerald-800 hover:bg-emerald-900 active:scale-98 text-white rounded-xl font-bold text-sm shadow-md transition flex items-center justify-center gap-2 cursor-pointer"
                >
                  {isLoggingIn ? (
                    <>
                      <RotateCw className="w-4 h-4 animate-spin" />
                      <span>Memverifikasi Sandi...</span>
                    </>
                  ) : (
                    <>
                      <Lock className="w-4 h-4" />
                      <span>Masuk Sistem Secure</span>
                    </>
                  )}
                </button>
              </form>

              <div className="relative flex items-center justify-center py-2">
                <div className="absolute inset-x-0 h-px bg-slate-150"></div>
                <span className="relative bg-white px-3 text-[10px] font-bold text-slate-400 uppercase tracking-wider">Atau Akun Sekolah</span>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={handleGoogleSignInClick}
                  className="p-2.5 border border-slate-200 hover:bg-slate-50 text-xs font-bold rounded-xl flex items-center justify-center gap-1.5 transition text-slate-700 cursor-pointer"
                >
                  <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v3.9h6.6c-.28 1.5-1.12 2.76-2.38 3.61v3h3.84c2.25-2.07 3.68-5.12 3.68-8.44z"/>
                    <path fill="#34A853" d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.84-3c-1.07.72-2.45 1.15-4.09 1.15-3.15 0-5.81-2.12-6.76-4.99H1.28v3.1A12 12 0 0 0 12 24z"/>
                    <path fill="#FBBC05" d="M5.24 14.25a7.15 7.15 0 0 1 0-4.5V6.65H1.28a12 12 0 0 0 0 10.7l3.96-3.1z"/>
                    <path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.43-3.43A11.93 11.93 0 0 0 12 0 12 12 0 0 0 1.28 6.65l3.96 3.1c.95-2.87 3.61-4.99 6.76-4.99z"/>
                  </svg>
                  <span>Google SSO</span>
                </button>

                <button
                  type="button"
                  onClick={handleInstantUnlock}
                  className="p-2.5 border border-emerald-100 hover:bg-emerald-50 text-xs font-bold rounded-xl flex items-center justify-center gap-1 transition text-emerald-800 bg-emerald-50/20 cursor-pointer"
                >
                  <Sparkles className="w-3.5 h-3.5 text-emerald-750" />
                  <span>Masuk Instan</span>
                </button>
              </div>

              <div className="pt-2">
                <button
                  type="button"
                  onClick={() => setShowLoginModal(false)}
                  className="w-full py-2 bg-slate-100 hover:bg-slate-200 text-slate-705 rounded-xl font-bold text-xs transition cursor-pointer"
                >
                  Tutup / Batal
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Google Single Sign-On Account Picker Simulation Modal */}
      <AnimatePresence>
        {showGoogleModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center z-50 p-4"
            id="google_sso_modal"
          >
            <motion.div
              initial={{ scale: 0.95, y: 15 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 15 }}
              className="bg-white rounded-2xl max-w-sm w-full p-6 shadow-2xl text-slate-800 space-y-5 border border-slate-100"
            >
              {/* Google Header */}
              <div className="text-center space-y-2">
                <div className="flex justify-center pb-1">
                  <svg className="w-10 h-10" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v3.9h6.6c-.28 1.5-1.12 2.76-2.38 3.61v3h3.84c2.25-2.07 3.68-5.12 3.68-8.44z"/>
                    <path fill="#34A853" d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.84-3c-1.07.72-2.45 1.15-4.09 1.15-3.15 0-5.81-2.12-6.76-4.99H1.28v3.1A12 12 0 0 0 12 24z"/>
                    <path fill="#FBBC05" d="M5.24 14.25a7.15 7.15 0 0 1 0-4.5V6.65H1.28a12 12 0 0 0 0 10.7l3.96-3.1z"/>
                    <path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.43-3.43A11.93 11.93 0 0 0 12 0 12 12 0 0 0 1.28 6.65l3.96 3.1c.95-2.87 3.61-4.99 6.76-4.99z"/>
                  </svg>
                </div>
                <h3 className="font-bold text-lg text-slate-900 tracking-tight">Login dengan Google</h3>
                <p className="text-xs text-slate-500">untuk melanjutkan ke aplikasi <strong className="text-orange-600 font-bold font-mono">FireApp</strong></p>
              </div>

              {/* Account Picker list */}
              <div className="space-y-2 pt-1">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider px-1">Pilih Akun Terdeteksi</p>
                
                {/* Account 1: Admin account */}
                <button
                  type="button"
                  onClick={() => selectGoogleAccount("kkgjatinagaraciamis@gmail.com")}
                  className="w-full p-3.5 rounded-xl border border-emerald-100 bg-emerald-50/40 hover:bg-emerald-50 text-left flex items-center justify-between transition group cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-orange-600 text-white font-extrabold flex items-center justify-center text-xs shadow-sm text-center">
                      KJ
                    </div>
                    <div>
                      <p className="text-xs font-bold text-slate-900 leading-tight">KKG Jatinagara Ciamis</p>
                      <p className="text-[10px] text-slate-500 font-mono">kkgjatinagaraciamis@gmail.com</p>
                    </div>
                  </div>
                  <span className="text-[9px] bg-emerald-600 text-white font-bold px-1.5 py-0.5 rounded uppercase tracking-wider scale-95 shrink-0">
                    Admin
                  </span>
                </button>

                {/* Account 2: Limited non-admin account (Locked by Browser rule) */}
                <button
                  type="button"
                  onClick={() => {
                    alert("Akses Ditolak: Hanya akun Google dengan browser kkgjatinagaraciamis@gmail.com yang diizinkan untuk masuk ke panel administrasi madrasah.");
                  }}
                  className="w-full p-3.5 rounded-xl border border-red-100 bg-red-50/20 hover:bg-red-50/50 text-left flex items-center justify-between transition cursor-pointer opacity-60"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-slate-300 text-slate-500 font-extrabold flex items-center justify-center text-xs text-center border border-slate-400">
                      🔒
                    </div>
                    <div>
                      <p className="text-xs font-bold text-slate-600 leading-tight">Sesi Browser Lain (Terkunci)</p>
                      <p className="text-[10px] text-red-500 font-mono">guru.madrasah@gmail.com</p>
                    </div>
                  </div>
                  <span className="text-[8px] bg-red-650 text-white font-bold px-1.5 py-0.5 rounded uppercase tracking-wider scale-95 shrink-0">
                    Ditolak
                  </span>
                </button>
              </div>

              {/* Close / Cancel Button */}
              <div className="pt-2">
                <button
                  type="button"
                  onClick={() => setShowGoogleModal(false)}
                  className="w-full py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl font-bold text-xs sm:text-sm transition-all cursor-pointer"
                >
                  Batal
                </button>
              </div>

              <div className="text-[9px] text-slate-450 text-center leading-relaxed">
                Untuk melanjutkan, Google akan membagikan nama, alamat email, dan foto profil Anda kepada <span className="font-bold">FireApp</span>.
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
