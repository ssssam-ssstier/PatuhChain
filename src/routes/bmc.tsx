import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/PageShell";

type Block = {
  key: string;
  title: string;
  subtitle: string;
  items: { head: string; desc: string }[];
};

const BLOCKS: Block[] = [
  {
    key: "segments",
    title: "Customer Segments",
    subtitle: "Siapa yang dilayani",
    items: [
      { head: "Utama", desc: "Perusahaan menengah (±50–500 karyawan) dan startup digital di e-commerce, fintech, kesehatan digital, pendidikan digital, dan SaaS — tim hukum/IT kecil, belum mampu bayar konsultan penuh waktu." },
      { head: "Sekunder", desc: "UMKM digital yang bertumbuh; kantor hukum, notaris, dan konsultan pajak yang melayani banyak klien." },
      { head: "Jangka panjang", desc: "Perusahaan terbuka dan lembaga keuangan yang membutuhkan pelaporan keberlanjutan." },
    ],
  },
  {
    key: "value",
    title: "Value Propositions",
    subtitle: "Mengapa memilih RegChain",
    items: [
      { head: "Hemat waktu", desc: "ROPA dan penanda DPIA disusun otomatis oleh AI, bukan berminggu-minggu secara manual." },
      { head: "Hemat biaya", desc: "Langganan bulanan lebih terjangkau daripada konsultan penuh waktu." },
      { head: "Minim kesalahan", desc: "Pengecekan berjalan terus dan tenggat selalu diingatkan." },
      { head: "Bukti tahan uji", desc: "Catatan di blockchain tidak bisa diubah diam-diam, siap saat diaudit." },
      { head: "Satu platform", desc: "Data pribadi, keberlanjutan, KBLI, dan pajak dalam satu tempat." },
      { head: "Aman", desc: "Data pribadi tidak disimpan di blockchain; manusia menyetujui keputusan penting." },
    ],
  },
  {
    key: "channels",
    title: "Channels",
    subtitle: "Cara menjangkau pelanggan",
    items: [
      { head: "Website & demo", desc: "Mencoba platform dan meminta konsultasi." },
      { head: "Konten & webinar", desc: "LinkedIn, edukasi, dan webinar tentang PP 33/2026 dan aturan terkait." },
      { head: "Mitra penyalur", desc: "Kantor hukum, notaris, dan konsultan yang merekomendasikan ke klien." },
      { head: "Komunitas", desc: "Komunitas startup dan kampus untuk pelanggan awal dan pilot." },
      { head: "Integrasi", desc: "Tersedia di software ERP/akuntansi agar mudah dipasang." },
      { head: "Penjualan langsung", desc: "Untuk pelanggan perusahaan yang lebih besar." },
    ],
  },
  {
    key: "relations",
    title: "Customer Relationships",
    subtitle: "Hubungan jangka panjang",
    items: [
      { head: "Onboarding dibantu", desc: "30 hari pertama agar pelanggan cepat merasakan manfaat." },
      { head: "Customer success", desc: "Pendampingan tiap pelanggan dan chat bantuan." },
      { head: "Dashboard & notifikasi", desc: "Skor kepatuhan, pengingat tenggat, dan perubahan aturan." },
      { head: "Webinar & komunitas", desc: "Berbagi pengalaman antarpengguna." },
      { head: "Kontrak & referral", desc: "Kontrak tahunan dengan diskon dan program referral." },
    ],
  },
  {
    key: "revenue",
    title: "Revenue Streams",
    subtitle: "Sumber pendapatan",
    items: [
      { head: "Langganan", desc: "Starter ±Rp1,5 jt/bulan · Business ±Rp5 jt/bulan · Enterprise sesuai kebutuhan." },
      { head: "Biaya setup", desc: "Sekali bayar untuk integrasi sistem dan pemetaan awal." },
      { head: "Modul tambahan", desc: "PSPK (keberlanjutan), pelaporan pajak digital, pengecekan KBLI." },
      { head: "Paket audit", desc: "Persiapan audit: laporan dan bukti kepatuhan siap serah." },
      { head: "Proyeksi awal", desc: "15 pelanggan × Rp4 jt/bulan ≈ Rp60 jt/bulan atau Rp720 jt/tahun, di luar setup dan modul." },
    ],
  },
  {
    key: "resources",
    title: "Key Resources",
    subtitle: "Sumber daya kunci",
    items: [
      { head: "SDM", desc: "Engineer AI & blockchain, ahli hukum/kepatuhan, customer success, penjualan." },
      { head: "Teknologi", desc: "Model AI (API/cloud), jaringan blockchain tertutup, cloud dengan penyimpanan data di Indonesia." },
      { head: "Kekayaan intelektual", desc: "Basis pengetahuan aturan terstruktur dan template per sektor." },
      { head: "Lainnya", desc: "Modal awal, reputasi, jejaring mitra, rencana sertifikasi keamanan informasi." },
    ],
  },
  {
    key: "activities",
    title: "Key Activities",
    subtitle: "Aktivitas utama",
    items: [
      { head: "Produk", desc: "Membangun dan merawat agen AI serta jaringan blockchain." },
      { head: "Regulasi", desc: "Memantau aturan baru dan memperbarui sistem." },
      { head: "Klien", desc: "Onboarding dan integrasi sistem pelanggan." },
      { head: "Mutu", desc: "Menguji akurasi AI dan keamanan data secara rutin." },
      { head: "Pasar", desc: "Pemasaran, edukasi, dan membangun kemitraan." },
    ],
  },
  {
    key: "partners",
    title: "Key Partnerships",
    subtitle: "Mitra kunci",
    items: [
      { head: "Hukum", desc: "Kantor hukum, notaris, dan konsultan sebagai penyalur dan pemberi masukan hukum." },
      { head: "Infrastruktur", desc: "Penyedia cloud, model AI, dan infrastruktur blockchain." },
      { head: "Software", desc: "Vendor ERP, CRM, dan software akuntansi untuk integrasi." },
      { head: "Ekosistem", desc: "Kampus dan inkubator bisnis untuk riset, talenta, dan pilot; asosiasi industri digital." },
    ],
  },
  {
    key: "costs",
    title: "Cost Structure",
    subtitle: "Struktur biaya",
    items: [
      { head: "Tim", desc: "Gaji pengembang, hukum/kepatuhan, dan customer success." },
      { head: "Teknologi", desc: "Cloud, pemakaian API AI, dan node blockchain." },
      { head: "Keamanan", desc: "Sertifikasi dan pengujian keamanan berkala." },
      { head: "Riset", desc: "Riset regulasi dan konsultasi hukum." },
      { head: "Pemasaran", desc: "Kampanye dan acara seperti webinar, plus operasional & dukungan pelanggan." },
    ],
  },
];

function BmcPage() {
  const [active, setActive] = useState<Block>(BLOCKS[1] as Block);

  return (
    <PageShell>
      <section className="bg-navy-gradient py-16 text-white md:py-20">
        <div className="mx-auto max-w-6xl px-4">
          <p className="text-sm font-semibold uppercase tracking-widest text-teal-light">Model Bisnis</p>
          <h1 className="mt-2 max-w-2xl font-display text-4xl font-bold leading-tight">
            Business Model Canvas RegChain
          </h1>
          <p className="mt-4 max-w-2xl text-sm text-white/70">
            Sembilan elemen yang saling terhubung: pelanggan jelas, nilai konkret, pendapatan
            berulang, serta mitra dan sumber daya yang mendukung. Klik setiap blok untuk melihat
            isinya.
          </p>
        </div>
      </section>

      <section className="py-16 md:py-20">
        <div className="mx-auto max-w-6xl px-4">
          <div className="grid gap-8 lg:grid-cols-[380px_1fr]">
            {/* Canvas grid */}
            <div className="grid grid-cols-3 gap-2">
              {BLOCKS.map((b) => (
                <button
                  key={b.key}
                  onClick={() => setActive(b)}
                  className={`rounded-xl border p-3 text-left transition-all ${
                    active.key === b.key
                      ? "border-primary bg-accent shadow-sm"
                      : "border-border bg-card hover:border-primary/50 hover:bg-muted"
                  }`}
                >
                  <div className="font-display text-[13px] font-bold leading-tight text-foreground">{b.title}</div>
                  <div className="mt-1 text-[11px] leading-snug text-muted-foreground">{b.subtitle}</div>
                </button>
              ))}
            </div>

            {/* Detail panel */}
            <div className="rounded-2xl border border-border bg-card p-7">
              <h2 className="font-display text-2xl font-bold text-foreground">{active.title}</h2>
              <p className="mt-1 text-sm text-muted-foreground">{active.subtitle}</p>
              <ul className="mt-6 space-y-5">
                {active.items.map((it) => (
                  <li key={it.head} className="border-l-2 border-primary/40 pl-4">
                    <h3 className="font-display text-sm font-semibold text-foreground">{it.head}</h3>
                    <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{it.desc}</p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>
    </PageShell>
  );
}

export const Route = createFileRoute("/bmc")({
  head: () => ({
    meta: [
      { title: "Model Bisnis (BMC) — RegChain" },
      {
        name: "description",
        content:
          "Sembilan elemen Business Model Canvas RegChain: segmen pelanggan, proposisi nilai, saluran, hubungan pelanggan, pendapatan, sumber daya, aktivitas, mitra, dan struktur biaya.",
      },
      { property: "og:title", content: "Model Bisnis (BMC) — RegChain" },
      {
        property: "og:description",
        content: "Pelanggan jelas, nilai konkret, pendapatan berulang — BMC lengkap RegChain.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: BmcPage,
});
