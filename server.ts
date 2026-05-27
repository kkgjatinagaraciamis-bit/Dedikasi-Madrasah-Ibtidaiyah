import express from "express";
import path from "path";
import fs from "fs/promises";
import { createServer as createViteServer } from "vite";
import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore, collection, getDocs, doc, setDoc, deleteDoc, writeBatch } from "firebase/firestore";

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Load Firebase Config securely
  let firebaseApp;
  let db: any;
  try {
    const configPath = path.join(process.cwd(), "firebase-applet-config.json");
    const certData = await fs.readFile(configPath, "utf-8");
    const firebaseConfig = JSON.parse(certData);
    
    // Initialize Firebase Client SDK
    if (getApps().length === 0) {
      firebaseApp = initializeApp(firebaseConfig);
    } else {
      firebaseApp = getApp();
    }
    db = getFirestore(firebaseApp, firebaseConfig.firestoreDatabaseId);
    console.log("Firebase Client SDK successfully initialized in server backend!");
  } catch (err: any) {
    console.error("Warning: Firebase integration initialization failed:", err.message);
  }

  const DEFAULT_MENUS = [
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

  // Helper function to read from Firestore
  async function readMenusFromFirestore() {
    try {
      if (!db) return [];
      const snap = await getDocs(collection(db, "menus"));
      const list = snap.docs.map((doc: any) => doc.data());
      list.sort((a: any, b: any) => (a.order || 0) - (b.order || 0));
      return list;
    } catch (err: any) {
      console.error("Error reading Firestore menus:", err);
      return [];
    }
  }

  // Middleware
  app.use(express.json());

  // --- API Endpoints ---

  // Get all menus
  app.get("/api/menus", async (req, res) => {
    try {
      let menus = await readMenusFromFirestore();
      if (menus.length === 0 && db) {
        // Automatically seed default menus so the app is not blank on initial deployment
        console.log("Seeding initial administrator menus into Firestore...");
        const batch = writeBatch(db);
        for (const item of DEFAULT_MENUS) {
          const docRef = doc(db, "menus", item.id);
          batch.set(docRef, item);
        }
        await batch.commit();
        menus = await readMenusFromFirestore();
      }
      res.json(menus);
    } catch (error: any) {
      res.status(500).json({ error: "Gagal membaca data menu dari Firestore: " + error.message });
    }
  });

  // Admin login validation (Only kkgjatinagaraciamis@gmail.com is allowed)
  app.post("/api/login", async (req, res) => {
    try {
      const { email, password } = req.body;
      if (!email) {
        return res.status(400).json({ error: "Email wajib diisi." });
      }
      const cleanEmail = email.toLowerCase().trim();
      if (cleanEmail !== "kkgjatinagaraciamis@gmail.com") {
        return res.status(403).json({ 
          error: "Akses Ditolak: Hanya akun dengan email kkgjatinagaraciamis@gmail.com yang diizinkan masuk panel admin." 
        });
      }
      res.json({ 
        success: true, 
        message: "Login sukses!", 
        email: "kkgjatinagaraciamis@gmail.com", 
        role: "admin" 
      });
    } catch (err: any) {
      res.status(500).json({ error: "Server error: " + err.message });
    }
  });

  // Edit / Add a menu
  app.post("/api/menus/save", async (req, res) => {
    try {
      const adminHeader = req.headers["x-admin-email"];
      const cleanAdmin = adminHeader ? String(adminHeader).toLowerCase().trim() : "";
      if (cleanAdmin !== "kkgjatinagaraciamis@gmail.com") {
        return res.status(403).json({ error: "Akses Ditolak: Silakan login sebagai admin kkgjatinagaraciamis@gmail.com terlebih dahulu." });
      }

      const { id, title, icon, content, reloadUrl, isActive, order } = req.body;
      if (!id || !title) {
        return res.status(400).json({ error: "ID dan Judul menu wajib diisi." });
      }

      if (!db) {
        return res.status(500).json({ error: "Firestore tidak terinisialisasi dengan benar." });
      }

      const menuData = {
        id,
        title,
        icon: icon || "BookOpen",
        content: content || "",
        reloadUrl: reloadUrl || "",
        isActive: isActive !== undefined ? isActive : true,
        order: order !== undefined ? Number(order) : 1
      };

      await setDoc(doc(db, "menus", id), menuData);

      res.json({ success: true, message: "Menu berhasil disimpan ke Firestore!", data: menuData });
    } catch (error: any) {
      res.status(500).json({ error: "Gagal menyimpan menu ke Firestore: " + error.message });
    }
  });

  // Re-order or wholesale update menus in Firestore
  app.post("/api/menus/bulk", async (req, res) => {
    try {
      const adminHeader = req.headers["x-admin-email"];
      const cleanAdmin = adminHeader ? String(adminHeader).toLowerCase().trim() : "";
      if (cleanAdmin !== "kkgjatinagaraciamis@gmail.com") {
        return res.status(403).json({ error: "Akses Ditolak: Hanya admin kkgjatinagaraciamis@gmail.com yang diizinkan." });
      }

      const { menus } = req.body;
      if (!Array.isArray(menus)) {
        return res.status(400).json({ error: "Format data salah, harus berupa array menu." });
      }

      if (!db) {
        return res.status(500).json({ error: "Firestore tidak terinisialisasi dengan benar." });
      }

      // Write each menu using a single fast write batch to ensure state consistency
      const batch = writeBatch(db);
      for (const item of menus) {
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
      res.json({ success: true, message: "Urutan menu berhasil diperbarui di Firestore dan Cloud!" });
    } catch (error: any) {
      res.status(500).json({ error: "Gagal memperbarui urutan menu di Firestore: " + error.message });
    }
  });

  // Delete a menu
  app.delete("/api/menus/:id", async (req, res) => {
    try {
      const adminHeader = req.headers["x-admin-email"];
      const cleanAdmin = adminHeader ? String(adminHeader).toLowerCase().trim() : "";
      if (cleanAdmin !== "kkgjatinagaraciamis@gmail.com") {
        return res.status(403).json({ error: "Akses Ditolak: Hanya admin kkgjatinagaraciamis@gmail.com yang diizinkan." });
      }

      const { id } = req.params;
      if (!db) {
        return res.status(500).json({ error: "Firestore tidak terinisialisasi dengan benar." });
      }

      await deleteDoc(doc(db, "menus", id));
      res.json({ success: true, message: "Menu berhasil dihapus dari Firestore!" });
    } catch (error: any) {
      res.status(500).json({ error: "Gagal menghapus menu dari Firestore: " + error.message });
    }
  });

  // Reset database to default if needed
  app.post("/api/menus/reset-default", async (req, res) => {
    try {
      const adminHeader = req.headers["x-admin-email"];
      const cleanAdmin = adminHeader ? String(adminHeader).toLowerCase().trim() : "";
      if (cleanAdmin !== "kkgjatinagaraciamis@gmail.com") {
        return res.status(403).json({ error: "Akses Ditolak: Hanya admin kkgjatinagaraciamis@gmail.com yang diizinkan." });
      }

      if (!db) {
        return res.status(500).json({ error: "Firestore tidak terinisialisasi dengan benar." });
      }

      // Fetch existing documents to delete them
      const snap = await getDocs(collection(db, "menus"));
      const deleteBatch = writeBatch(db);
      for (const d of snap.docs) {
        deleteBatch.delete(d.ref);
      }
      await deleteBatch.commit();

      // Reinstate default set
      const insertBatch = writeBatch(db);
      for (const item of DEFAULT_MENUS) {
        const docRef = doc(db, "menus", item.id);
        insertBatch.set(docRef, item);
      }
      await insertBatch.commit();

      res.json({ success: true, message: "Database Firestore berhasil direset ke setting awal!", menus: DEFAULT_MENUS });
    } catch (error: any) {
      res.status(500).json({ error: "Gagal mereset database Firestore: " + error.message });
    }
  });

  // --- Vite Middleware integration ---
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    // Support Express SPA routing, fallback to index.html for all non-matching routes (for Express 4)
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server Madrasah Ibtidaiyah running at http://localhost:${PORT}`);
  });
}

startServer();
