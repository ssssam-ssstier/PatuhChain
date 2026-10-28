import { Link, createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/PageShell";

const FEATURES = [
  {
    tag: "Tersedia di MVP",
    title: "Agen AI Pemetaan Data",
    desc: "Agen AI membaca data dari ERP, CRM, HR, dan dokumen, lalu melacak aliran data pribadi di seluruh proses bisnis — tanpa memindahkan data.",
    icon: "✦",
  },
  {
    tag: "Tersedia di MVP",
    title: "Draf ROPA Otomatis",
    desc: "Catatan Kegiatan Pemrosesan Data (ROPA) yang diminta PP 33/2026 disusun otomatis dalam format siap diaudit, lengkap dengan dasar pemrosesan dan retensi.",
    icon: "🗒",
  },
  {
    tag: "Tersedia di MVP",
    title: "Penanda DPIA",
    desc: "Proses berisiko tinggi — termasuk penggunaan AI — ditandai otomatis sebagai kandidat penilaian dampak pemrosesan data (DPIA) beserta draf awalnya.",
    icon: "⚠︎",
  },
  {
    tag: "Tersedia di MVP",
    title: "Buku Besar Blockchain",
    desc: "Blockchain tertutup mencatat sidik digital (hash) setiap dokumen dan keputusan. Catatan tidak bisa diubah diam-diam — bukti kepatuhan siap audit.",
    icon: "⫘",
  },
  {
    tag: "Tersedia di MVP",
    title: "Persetujuan Manusia (Human-in-the-Loop)",
    desc: "Hasil AI tidak langsung final. Staf memeriksa, mengubah, dan menyetujui; persetujuan itulah yang terekam sebagai bukti.",
    icon: "✔",
  },
  {
    tag: "Tersedia di MVP",
    title: "Dashboard Skor Kepatuhan",
    desc: "Satu angka ringkas menunjukkan kesiapan kepatuhan, dengan daftar tindakan perbaikan dan status tiap kewajiban.",
    icon: "↗",
  },
  {
    tag: "Segera",
    title: "Pengingat Tenggat & Perubahan Aturan",
    desc: "Notifikasi otomatis ketika tenggat pelaporan mendekat atau aturan baru berdampak pada proses bisnis Anda.",
    icon: "ⓘ",
  },
  {
    tag: "Roadmap Tahun 2",
    title: "Modul Keberlanjutan (PSPK 1 & 2)",
    desc: "AI mengumpulkan dan memvalidasi data energi, SDM, dan rantai pasok; blockchain menjaga asal-usul data untuk mencegah klaim palsu (greenwashing).",
    icon: "❷",
  },
  {
    tag: "Roadmap Tahun 2",
    title: "Pengecekan KBLI 2025 & Pajak Digital",
    desc: "Memastikan kode KBLI pada izin dan akta masih sesuai usaha yang dijalankan, plus dukungan pelaporan pajak digital.",
    icon: "🗒",
  },
  {
    tag: "Roadmap Tahun 3",
    title: "Compliance Monitoring Agent",
    desc: "Agen pemantau regulasi yang terus menilai dampak aturan baru pada proses klien — layanan berlangganan berkelanjutan.",
    icon: "🖳",
  },
  {
    tag: "Roadmap Tahun 3–5",
    title: "Lapisan Kepercayaan untuk AI",
    desc: "Mencatat apa yang diputuskan agen AI, data apa yang diakses, dan siapa yang memberi izin — jejak audit untuk tindakan AI.",
    icon: "✴︎",
  },
  {
    tag: "Roadmap Tahun 3–5",
    title: "Paket Persiapan Audit",
    desc: "Laporan dan bukti kepatuhan yang siap diserahkan kepada auditor atau lembaga pengawas dalam satu klik.",
    icon: "➤",
  },
];

const ROADMAP = [
  { period: "Bulan 1–3", title: "Validasi masalah", desc: "Wawancara calon pengguna untuk memastikan masalah nyata dan kesediaan membayar." },
  { period: "Bulan 3–6", title: "Membangun MVP", desc: "Agen AI pemetaan data, draf ROPA, penanda DPIA, pencatatan hash — diuji di 3–5 perusahaan pilot." },
  { period: "Bulan 6–9", title: "Peluncuran", desc: "Paket berbayar, webinar “Siap PP 33/2026”, kemitraan kantor hukum dan konsultan." },
  { period: "Bulan 9–12", title: "Akuisisi", desc: "Target 15 pelanggan berbayar; ROPA turun ≥50% lebih cepat; >80% pilot lanjut berlangganan." },
  { period: "Tahun 2", title: "Modul baru", desc: "PSPK (keberlanjutan), pengecekan KBLI, pelaporan pajak digital." },
  { period: "Tahun 3–5", title: "Lapisan kepercayaan", desc: "Pemantau regulasi dan jejak audit untuk tindakan AI; ekspansi ke pasar Asia Tenggara." },
];

function FiturPage() {
  return (
    <PageShell>
      <section className="bg-navy-gradient py-16 text-white md:py-20">
        <div className="mx-auto max-w-6xl px-4">
          <p className="text-sm font-semibold uppercase tracking-widest text-teal-light">Fitur</p>
          <h1 className="mt-2 max-w-2xl font-display text-4xl font-bold leading-tight">
            Satu platform untuk beragam aturan
          </h1>
          <p className="mt-4 max-w-2xl text-sm leading-relaxed text-white/70">
            Dimulai dari modul kepatuhan data pribadi (PP 33/2026), lalu tumbuh menjadi pusat
            kepatuhan dan kepercayaan digital — setiap kali aturan baru muncul, PatuhChain siap.
          </p>
        </div>
      </section>

      <section className="py-16 md:py-20">
        <div className="mx-auto max-w-6xl px-4">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {FEATURES.map((f) => (
              <div key={f.title} className="card-lift flex flex-col rounded-2xl border border-border bg-card p-6">
                <div className="flex items-start justify-between">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-accent text-xl">{f.icon}</div>
                  <span
                    className={`rounded-full px-2.5 py-1 text-[11px] font-semibold ${
                      f.tag === "Tersedia di MVP"
                        ? "bg-accent text-accent-foreground"
                        : "bg-muted text-muted-foreground"
                    }`}
                  >
                    {f.tag}
                  </span>
                </div>
                <h3 className="mt-4 font-display text-lg font-semibold text-foreground">{f.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-muted py-16 md:py-20">
        <div className="mx-auto max-w-6xl px-4">
          <h2 className="text-center font-display text-3xl font-bold text-foreground">Peta jalan pengembangan</h2>
          <div className="mt-10 space-y-4">
            {ROADMAP.map((r, i) => (
              <div key={r.period} className="flex gap-4 rounded-2xl border border-border bg-card p-5 md:items-center">
                <div className="w-28 shrink-0 font-display text-sm font-bold text-primary">{r.period}</div>
                <div className="hidden h-px flex-1 bg-border md:block" aria-hidden="true" />
                <div className="md:w-72">
                  <h3 className="font-display font-semibold text-foreground">
                    {i + 1}. {r.title}
                  </h3>
                </div>
                <p className="flex-1 text-sm text-muted-foreground">{r.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 text-center">
        <Link
          to="/demo"
          className="inline-flex items-center rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-transform hover:scale-[1.03]"
        >
          Lihat langsung di Demo Interaktif →
        </Link>
      </section>
    </PageShell>
  );
}

export const Route = createFileRoute("/fitur")({
  head: () => ({
    meta: [
      { title: "Fitur — PatuhChain" },
      {
        name: "description",
        content:
          "Agen AI pemetaan data, draf ROPA otomatis, penanda DPIA, buku besar blockchain, dashboard skor kepatuhan, dan peta jalan modul PSPK, KBLI, serta pajak digital.",
      },
      { property: "og:title", content: "Fitur — PatuhChain" },
      {
        property: "og:description",
        content: "Satu platform untuk beragam aturan: PP 33/2026, PSPK 1 & 2, KBLI 2025, dan pajak digital.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: FiturPage,
});
