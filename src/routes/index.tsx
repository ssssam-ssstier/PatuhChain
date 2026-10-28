import { useEffect, useState } from "react";
import { Link, createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/PageShell";
const logoAsset = { url: "/favicon.png" };
const heroImg = "/hero.png";

function useCountdown(target: Date) {
  const [now, setNow] = useState(() => new Date());
  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);
  const diff = Math.max(0, target.getTime() - now.getTime());
  const days = Math.floor(diff / 86_400_000);
  const hours = Math.floor((diff % 86_400_000) / 3_600_000);
  const minutes = Math.floor((diff % 3_600_000) / 60_000);
  const seconds = Math.floor((diff % 60_000) / 1000);
  return { days, hours, minutes, seconds, passed: diff === 0 };
}

const DEADLINE_PP33 = new Date("2027-01-16T00:00:00+07:00");

function CountdownStrip() {
  const t = useCountdown(DEADLINE_PP33);
  const items = [
    { label: "Hari", value: t.days },
    { label: "Jam", value: t.hours },
    { label: "Menit", value: t.minutes },
    { label: "Detik", value: t.seconds },
  ];
  return (
    <section className="border-y border-white/10 bg-navy-deep py-6">
      <div className="mx-auto max-w-6xl px-4">
        <p className="text-center text-sm font-medium tracking-wide text-teal-light">
          Tenggat kepatuhan PP 33/2026 (Pelaksana UU PDP): 16 Januari 2027
        </p>
        <div className="mt-3 flex items-center justify-center gap-3 sm:gap-6">
          {items.map((item) => (
            <div key={item.label} className="min-w-[4.5rem] rounded-xl border border-white/10 bg-white/5 px-3 py-3 text-center sm:min-w-[5.5rem]">
              <div className="font-display text-2xl font-bold tabular-nums text-white sm:text-3xl">
                {String(item.value).padStart(2, "0")}
              </div>
              <div className="mt-0.5 text-xs text-white/60">{item.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

const PROBLEMS = [
  {
    title: "Regulasi datang tumpang tindih",
    desc: "PP 33/2026 berlaku Januari 2027, PSPK 1 & 2 efektif 1 Januari 2027, dan KBLI 2025 sudah dipakai OSS/AHU sejak Juni 2026. Semua wajib dipenuhi hampir bersamaan.",
  },
  {
    title: "Pekerjaan masih manual",
    desc: "Data pelanggan tersebar di banyak aplikasi, daftar kegiatan dibuat di spreadsheet, dan pengecekan ditanggung tim kecil yang sudah sibuk.",
  },
  {
    title: "Sulit dibuktikan saat diaudit",
    desc: "Dokumen biasa bisa diubah tanpa jejak. Saat diperiksa, perusahaan kesulitan menunjukkan siapa mengubah apa dan kapan.",
  },
];

const STEPS = [
  {
    no: "01",
    title: "Hubungkan",
    desc: "PatuhChain terhubung ke ERP, CRM, HR, dan dokumen perusahaan dengan izin dari pemilik data.",
  },
  {
    no: "02",
    title: "Petakan",
    desc: "Agen AI membaca data, melacak aliran data pribadi, lalu menyusun draf ROPA, penanda DPIA, dan daftar tindakan perbaikan.",
  },
  {
    no: "03",
    title: "Setujui",
    desc: "Staf perusahaan memeriksa dan menyetujui hasilnya. Keputusan penting tetap di tangan manusia.",
  },
  {
    no: "04",
    title: "Buktikan",
    desc: "Setiap keputusan dan perubahan dicatat di blockchain tertutup sebagai bukti yang siap diaudit.",
  },
];

const VALUES = [
  { icon: "⏱", title: "Hemat waktu", desc: "ROPA dan penanda DPIA disusun otomatis oleh AI, bukan berminggu-minggu secara manual." },
  { icon: "⛃⛂", title: "Hemat biaya", desc: "Langganan bulanan jauh lebih terjangkau daripada konsultan kepatuhan penuh waktu." },
  { icon: "𖣨", title: "Minim kesalahan", desc: "Pengecekan berjalan terus-menerus dan tenggat selalu diingatkan otomatis." },
  { icon: "✔", title: "Bukti tahan uji", desc: "Catatan di blockchain tidak bisa diubah diam-diam, siap saat diaudit." },
  { icon: "❶", title: "Satu platform", desc: "Data pribadi, keberlanjutan, KBLI, dan pajak dalam satu dasbor." },
  { icon: "🔒︎", title: "Aman by design", desc: "Data pribadi tidak disimpan di blockchain â€” hanya sidik digital (hash). Manusia menyetujui keputusan penting." },
];

function HomePage() {
  return (
    <PageShell>
      {/* Hero */}
      <section className="bg-navy-gradient text-white">
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-16 md:grid-cols-2 md:py-24">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-teal-light/30 bg-white/5 px-3 py-1 text-xs font-medium text-teal-light">
              <span className="h-2 w-2 rounded-full bg-primary animate-chain-pulse" />
              AI Agentik Blockchain untuk Kepatuhan Indonesia
            </div>
            <h1 className="mt-5 font-display text-4xl font-bold leading-tight sm:text-5xl">
              Kepatuhan aturan baru, <span className="text-gradient-teal">otomatis dan terbukti</span>
            </h1>
            <p className="mt-5 max-w-lg text-base leading-relaxed text-white/70">
              PatuhChain membantu perusahaan memenuhi PP 33/2026 (UU PDP), PSPK 1 &amp; 2, dan KBLI
              2025 dari pemetaan data otomatis hingga bukti kepatuhan yang tidak bisa diubah diam-diam.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                to="/demo"
                className="inline-flex items-center rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/30 transition-transform hover:scale-[1.03]"
              >
                Coba Demo Interaktif
              </Link>
              <Link
                to="/kontak"
                className="inline-flex items-center rounded-xl border border-white/25 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/10"
              >
                Minta Konsultasi
              </Link>
            </div>
          </div>
          <div className="relative">
            <img
              src={heroImg}
              alt="Ilustrasi dasbor otomatisasi kepatuhan PatuhChain"
              width={1024}
              height={1024}
              className="mx-auto w-full max-w-md rounded-3xl border border-white/10 shadow-2xl animate-float-slow"
            />
            <div className="absolute -bottom-4 left-4 rounded-xl border border-white/10 bg-navy-deep/90 px-4 py-3 text-xs backdrop-blur">
              <span className="font-semibold text-teal-light">ROPA tersusun otomatis</span>
              <div className="text-white/60">dari berminggu-minggu hitungan menit</div>
            </div>
          </div>
        </div>
      </section>

      <CountdownStrip />

      {/* Problem */}
      <section className="py-16 md:py-20">
        <div className="mx-auto max-w-6xl px-4">
          <p className="text-center text-sm font-semibold uppercase tracking-widest text-primary">Masalahnya</p>
          <h2 className="mt-2 text-center font-display text-3xl font-bold text-foreground">
            Aturan baru datang berdempetan, tim Anda kewalahan
          </h2>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {PROBLEMS.map((p) => (
              <div key={p.title} className="card-lift rounded-2xl border border-border bg-card p-6">
                <h3 className="font-display text-lg font-semibold text-foreground">{p.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="bg-muted py-16 md:py-20">
        <div className="mx-auto max-w-6xl px-4">
          <p className="text-center text-sm font-semibold uppercase tracking-widest text-primary">Cara Kerja</p>
          <h2 className="mt-2 text-center font-display text-3xl font-bold text-foreground">Empat langkah, dari data mentah jadi bukti</h2>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {STEPS.map((s) => (
              <div key={s.no} className="card-lift relative rounded-2xl border border-border bg-card p-6">
                <span className="font-display text-4xl font-bold text-teal-soft">{s.no}</span>
                <h3 className="mt-3 font-display text-lg font-semibold text-foreground">{s.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{s.desc}</p>
              </div>
            ))}
          </div>
          <p className="mt-6 text-center text-sm text-muted-foreground">
            Data pribadi tidak disimpan di blockchain yang dicatat hanya sidik digital (hash) dokumen dan keputusan.
          </p>
        </div>
      </section>

      {/* Value props */}
      <section className="py-16 md:py-20">
        <div className="mx-auto max-w-6xl px-4">
          <p className="text-center text-sm font-semibold uppercase tracking-widest text-primary">Nilai untuk Anda</p>
          <h2 className="mt-2 text-center font-display text-3xl font-bold text-foreground">
            Lebih cepat, lebih murah, lebih siap diaudit
          </h2>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {VALUES.map((v) => (
              <div key={v.title} className="card-lift rounded-2xl border border-border bg-card p-6">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-accent text-xl">{v.icon}</div>
                <h3 className="mt-4 font-display text-lg font-semibold text-foreground">{v.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Target & pricing teaser */}
      <section className="bg-navy-gradient py-16 text-white md:py-20">
        <div className="mx-auto max-w-6xl px-4 text-center">
          <img src={logoAsset.url} alt="Logo PatuhChain" className="mx-auto h-14 w-14 rounded-xl bg-white/95 object-contain p-1" />
          <h2 className="mt-5 font-display text-3xl font-bold">Siap patuh tanpa drama?</h2>
          <p className="mx-auto mt-3 max-w-xl text-sm text-white/70">
            Dirancang untuk perusahaan menengah dan startup digital ”e-commerce, fintech, kesehatan,
            pendidikan, dan SaaS” yang mengelola banyak data pelanggan dengan tim kecil.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link
              to="/harga"
              className="inline-flex items-center rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-transform hover:scale-[1.03]"
            >
              Lihat Harga
            </Link>
            <Link
              to="/demo"
              className="inline-flex items-center rounded-xl border border-white/25 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/10"
            >
              Coba Demo Interaktif
            </Link>
          </div>
        </div>
      </section>
    </PageShell>
  );
}

export const Route = createFileRoute("/")({
  component: HomePage,
});
