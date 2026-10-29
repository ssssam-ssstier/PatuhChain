import { useMemo, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/PageShell";

/* ---------------- ROPA Simulator ---------------- */

const DATA_TYPES = [
  { id: "identitas", label: "Identitas (NIK, KTP)", weight: 2 },
  { id: "kontak", label: "Kontak (email, telepon)", weight: 1 },
  { id: "transaksi", label: "Riwayat transaksi", weight: 2 },
  { id: "keuangan", label: "Data keuangan & kartu", weight: 3 },
  { id: "lokasi", label: "Data lokasi/GPS", weight: 2 },
  { id: "biometrik", label: "Biometrik (wajah, sidik jari)", weight: 4 },
];

type RopaRow = {
  aktivitas: string;
  dasar: string;
  data: string;
  retensi: string;
};

function sampleRopa(sektor: string, selected: string[]): RopaRow[] {
  const base: RopaRow[] = [
    {
      aktivitas: "Pendaftaran akun pelanggan",
      dasar: "Pelaksanaan kontrak (Art. 24 UU PDP)",
      data: selected.slice(0, 2).join(", ") || "Identitas, kontak",
      retensi: "Selama akun aktif + 2 tahun",
    },
    {
      aktivitas: "Pemrosesan pesanan/transaksi",
      dasar: "Pelaksanaan kontrak",
      data: selected.includes("transaksi") ? "Riwayat transaksi, kontak" : "Kontak",
      retensi: "10 tahun (kewajiban pajak)",
    },
    {
      aktivitas: "Pemasaran & newsletter",
      dasar: "Persetujuan (Art. 21 UU PDP)",
      data: "Kontak, preferensi",
      retensi: "Sampai penarikan persetujuan",
    },
    {
      aktivitas: "Deteksi penipuan (otomatis)",
      dasar: "Kepentingan sah + perlu DPIA âš ï¸",
      data: selected.includes("lokasi") ? "Perilaku, lokasi, perangkat" : "Perilaku, perangkat",
      retensi: "1 tahun",
    },
  ];
  if (sektor === "Kesehatan digital") {
    base.push({
      aktivitas: "Rekam medis elektronik",
      dasar: "Kewajiban hukum â€” data sensitif",
      data: "Riwayat kesehatan, identitas",
      retensi: "Sesuai Permenkes rekam medis",
    });
  }
  if (sektor === "Fintech") {
    base.push({
      aktivitas: "Penilaian kelayakan kredit",
      dasar: "Pelaksanaan kontrak â€” perlu DPIA âš ï¸",
      data: selected.includes("keuangan") ? "Data keuangan, skoring" : "Data keuangan",
      retensi: "5 tahun",
    });
  }
  return base;
}

function RopaSimulator() {
  const [sektor, setSektor] = useState("E-commerce");
  const [systems, setSystems] = useState(5);
  const [team, setTeam] = useState(2);
  const [selected, setSelected] = useState<string[]>(["identitas", "kontak", "transaksi"]);
  const [generated, setGenerated] = useState(false);

  const toggle = (id: string) =>
    setSelected((s) => (s.includes(id) ? s.filter((x) => x !== id) : [...s, id]));

  const stats = useMemo(() => {
    const dataWeight = DATA_TYPES.filter((d) => selected.includes(d.id)).reduce((a, d) => a + d.weight, 0) || 1;
    const manualHours = Math.round(systems * dataWeight * 6 + 24);
    const manualDays = Math.max(1, Math.round((manualHours / (team * 7)) * 10) / 10);
    const autoMinutes = 12 + systems * 3;
    return { manualHours, manualDays, autoMinutes, savings: Math.floor((1 - autoMinutes / 60 / manualHours) * 100) };
  }, [systems, team, selected]);

  const rows = useMemo(() => sampleRopa(sektor, selected), [sektor, selected]);

  return (
    <div className="grid gap-8 lg:grid-cols-[400px_1fr]">
      <div className="space-y-5 rounded-2xl border border-border bg-muted p-6">
        <label className="block">
          <span className="text-sm font-medium text-foreground">Sektor usaha</span>
          <select
            value={sektor}
            onChange={(e) => setSektor(e.target.value)}
            className="mt-1.5 w-full rounded-lg border border-input bg-background px-3 py-2.5 text-sm outline-none focus:border-primary"
          >
            {["E-commerce", "Fintech", "Kesehatan digital", "Pendidikan digital", "SaaS"].map((s) => (
              <option key={s}>{s}</option>
            ))}
          </select>
        </label>

        <div>
          <div className="flex items-center justify-between text-sm">
            <span className="font-medium text-foreground">Jumlah sistem terhubung</span>
            <span className="font-semibold text-primary">{systems}</span>
          </div>
          <input type="range" min={1} max={12} value={systems} onChange={(e) => setSystems(+e.target.value)} className="mt-2 w-full accent-[var(--primary)]" />
        </div>

        <div>
          <div className="flex items-center justify-between text-sm">
            <span className="font-medium text-foreground">Ukuran tim kepatuhan</span>
            <span className="font-semibold text-primary">{team} orang</span>
          </div>
          <input type="range" min={1} max={8} value={team} onChange={(e) => setTeam(+e.target.value)} className="mt-2 w-full accent-[var(--primary)]" />
        </div>

        <div>
          <span className="text-sm font-medium text-foreground">Jenis data pribadi yang diproses</span>
          <div className="mt-2 grid gap-2">
            {DATA_TYPES.map((d) => (
              <label key={d.id} className="flex cursor-pointer items-center gap-2.5 rounded-lg border border-input bg-background px-3 py-2 text-sm">
                <input
                  type="checkbox"
                  checked={selected.includes(d.id)}
                  onChange={() => toggle(d.id)}
                  className="h-4 w-4 accent-[var(--primary)]"
                />
                {d.label}
              </label>
            ))}
          </div>
        </div>

        <button
          onClick={() => setGenerated(true)}
          className="w-full rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
        >
          Jalankan Agen AI â†’
        </button>
      </div>

      <div>
        {!generated ? (
          <div className="flex h-full min-h-72 flex-col items-center justify-center rounded-2xl border border-dashed border-border bg-card p-10 text-center">
            <div className="text-4xl"></div>
            <h3 className="mt-4 font-display text-lg font-semibold text-foreground">Hasil simulasi akan muncul di sini</h3>
            <p className="mt-2 max-w-sm text-sm text-muted-foreground">
              Atur profil perusahaan di sebelah kiri, lalu jalankan agen AI. Dalam kondisi nyata,
              agen membaca sistem Anda dan menyusun draf ROPA dalam hitungan menit.
            </p>
          </div>
        ) : (
          <div className="space-y-5">
            <div className="grid gap-4 sm:grid-cols-3">
              <div className="rounded-xl border border-border bg-card p-4 text-center">
                <div className="font-display text-2xl font-bold text-muted-foreground">{stats.manualHours} jam</div>
                <div className="mt-1 text-xs text-muted-foreground">Cara manual (draf ROPA)</div>
              </div>
              <div className="rounded-xl border border-primary bg-card p-4 text-center shadow-sm shadow-primary/10">
                <div className="font-display text-2xl font-bold text-primary">â‰ˆ{stats.autoMinutes} mnt</div>
                <div className="mt-1 text-xs text-muted-foreground">Dengan RegChain</div>
              </div>
              <div className="rounded-xl border border-border bg-card p-4 text-center">
                <div className="font-display text-2xl font-bold text-foreground">âˆ’{stats.savings}%</div>
                <div className="mt-1 text-xs text-muted-foreground">Estimasi waktu terhemat</div>
              </div>
            </div>

            <div className="overflow-hidden rounded-2xl border border-border bg-card">
              <div className="flex items-center justify-between border-b border-border px-5 py-3">
                <h4 className="font-display text-sm font-semibold text-foreground">Draf ROPA â€” {sektor}</h4>
                <span className="rounded-full bg-accent px-2.5 py-0.5 text-[11px] font-semibold text-accent-foreground">
                  Status: menunggu persetujuan staf
                </span>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full min-w-[640px] text-left text-sm">
                  <thead>
                    <tr className="border-b border-border bg-muted text-xs uppercase tracking-wide text-muted-foreground">
                      <th className="px-5 py-2.5 font-medium">Kegiatan pemrosesan</th>
                      <th className="px-5 py-2.5 font-medium">Dasar pemrosesan</th>
                      <th className="px-5 py-2.5 font-medium">Jenis data</th>
                      <th className="px-5 py-2.5 font-medium">Retensi</th>
                    </tr>
                  </thead>
                  <tbody>
                    {rows.map((r) => (
                      <tr key={r.aktivitas} className="border-b border-border last:border-0">
                        <td className="px-5 py-3 font-medium text-foreground">{r.aktivitas}</td>
                        <td className="px-5 py-3 text-muted-foreground">{r.dasar}</td>
                        <td className="px-5 py-3 text-muted-foreground">{r.data}</td>
                        <td className="px-5 py-3 text-muted-foreground">{r.retensi}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="border-t border-border bg-muted px-5 py-3 text-xs text-muted-foreground">
                Simulasi ilustratif. Dalam versi penuh, draf dihasilkan dari data sistem Anda yang sebenarnya dan
                hash-nya dicatat di blockchain setelah Anda menyetujui.
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

/* ---------------- Compliance Score ---------------- */

const CHECKLIST = [
  { id: "ropa", label: "ROPA tersusun dan terbarui", points: 20 },
  { id: "dpia", label: "DPIA untuk proses berisiko tinggi", points: 15 },
  { id: "dasar", label: "Dasar pemrosesan jelas tiap kegiatan", points: 15 },
  { id: "persetujuan", label: "Mekanisme persetujuan & penarikan", points: 10 },
  { id: "bocor", label: "Prosedur penanganan kebocoran data", points: 15 },
  { id: "retensi", label: "Kebijakan retensi & penghapusan", points: 10 },
  { id: "akses", label: "Kontrol akses & pencatatan aktivitas", points: 10 },
  { id: "bukti", label: "Bukti kepatuhan siap diaudit", points: 5 },
];

function ScoreRing({ score }: { score: number }) {
  const r = 80;
  const c = 2 * Math.PI * r;
  const filled = (score / 100) * c;
  const color = score >= 80 ? "var(--primary)" : score >= 50 ? "oklch(0.78 0.12 80)" : "var(--destructive)";
  return (
    <svg viewBox="0 0 200 200" className="h-44 w-44">
      <circle cx="100" cy="100" r={r} fill="none" stroke="var(--muted)" strokeWidth="16" />
      <circle
        cx="100" cy="100" r={r} fill="none"
        stroke={color} strokeWidth="16" strokeLinecap="round"
        strokeDasharray={`${filled} ${c}`}
        transform="rotate(-90 100 100)"
        style={{ transition: "stroke-dasharray 0.6s ease, stroke 0.6s ease" }}
      />
      <text x="100" y="94" textAnchor="middle" fontSize="40" fontWeight="700" fill="var(--foreground)" fontFamily="Space Grotesk, sans-serif">
        {score}
      </text>
      <text x="100" y="120" textAnchor="middle" fontSize="13" fill="var(--muted-foreground)">
        / 100
      </text>
    </svg>
  );
}

function ScoreCalculator() {
  const initial = Object.fromEntries(CHECKLIST.map((c) => [c.id, c.id === "ropa" || c.id === "dasar"]));
  const [checked, setChecked] = useState<Record<string, boolean>>(initial as Record<string, boolean>);

  const score = CHECKLIST.reduce((sum, c) => sum + (checked[c.id] ? c.points : 0), 0);
  const missing = CHECKLIST.filter((c) => !checked[c.id]);

  const label = score >= 80 ? "Siap diaudit" : score >= 50 ? "Perlu perbaikan" : "Berisiko tinggi";

  return (
    <div className="grid gap-8 lg:grid-cols-[1fr_320px]">
      <div className="rounded-2xl border border-border bg-card p-6">
        <h3 className="font-display font-semibold text-foreground">Periksa kesiapan kepatuhan data pribadi Anda (PP 33/2026)</h3>
        <div className="mt-4 grid gap-2.5">
          {CHECKLIST.map((c) => (
            <label
              key={c.id}
              className={`flex cursor-pointer items-center justify-between gap-3 rounded-xl border px-4 py-3 text-sm transition-colors ${
                checked[c.id] ? "border-primary/50 bg-accent" : "border-border bg-background hover:bg-muted"
              }`}
            >
              <span className="flex items-center gap-3">
                <input
                  type="checkbox"
                  checked={!!checked[c.id]}
                  onChange={() => setChecked((s) => ({ ...s, [c.id]: !s[c.id] }))}
                  className="h-4 w-4 accent-[var(--primary)]"
                />
                {c.label}
              </span>
              <span className="text-xs font-semibold text-muted-foreground">+{c.points}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="flex h-fit flex-col items-center rounded-2xl border border-border bg-card p-6 text-center">
        <ScoreRing score={score} />
        <div
          className="mt-2 rounded-full px-3 py-1 text-xs font-semibold"
          style={{
            background:
              score >= 80 ? "var(--accent)" : score >= 50 ? "oklch(0.93 0.06 80)" : "oklch(0.93 0.04 25)",
            color: score >= 80 ? "var(--accent-foreground)" : score >= 50 ? "oklch(0.45 0.1 80)" : "var(--destructive-foreground)",
          }}
        >
          {label}
        </div>
        <div className="mt-5 w-full text-left">
          <h4 className="text-sm font-semibold text-foreground">Rekomendasi tindakan</h4>
          {missing.length === 0 ? (
            <p className="mt-2 text-sm text-muted-foreground">Semua elemen terpenuhi â€” pertahankan dan pantau terus. ðŸ‘</p>
          ) : (
            <ul className="mt-2 space-y-1.5 text-sm text-muted-foreground">
              {missing.slice(0, 4).map((m) => (
                <li key={m.id} className="flex gap-2">
                  <span className="text-primary">â†’</span> Susun/lembagakan: {m.label.toLowerCase()}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}

/* ---------------- Blockchain Ledger ---------------- */

function toHash(input: string): string {
  let h1 = 0x811c9dc5;
  for (let i = 0; i < input.length; i++) {
    h1 ^= input.charCodeAt(i);
    h1 = Math.imul(h1, 0x01000193) >>> 0;
  }
  let h2 = 0xdeadbeef ^ input.length;
  for (let i = input.length - 1; i >= 0; i--) {
    h2 = Math.imul(h2 ^ input.charCodeAt(i), 0x85ebca6b) >>> 0;
  }
  return (
    (h1 >>> 0).toString(16).padStart(8, "0") +
    (h2 >>> 0).toString(16).padStart(8, "0")
  ).repeat(2);
}

type LedgerBlock = {
  index: number;
  ts: string;
  action: string;
  hash: string;
  prev: string;
};

const LEDGER_ACTIONS = [
  "ROPA v3 disetujui oleh Dina (Compliance) â€” hash dokumen dicatat",
  "DPIA untuk fitur skoring AI ditandai & draf dibuat",
  "Kebijakan retensi diperbarui: 10â†’7 tahun untuk data transaksi",
  "Akses agen AI ke tabel pelanggan diberikan izin oleh IT",
  "Laporan kesiapan audit Q1 diekspor dan ditandatangani",
];

function LedgerDemo() {
  const [blocks, setBlocks] = useState<LedgerBlock[]>([
    {
      index: 0,
      ts: new Date().toLocaleTimeString("id-ID"),
      action: "Genesis: koneksi sistem & pemetaan awal selesai",
      hash: toHash("genesis-regchain"),
      prev: "0".repeat(16),
    },
  ]);
  const [nextIdx, setNextIdx] = useState(0);
  const [tampering, setTampering] = useState(false);

  const addBlock = () => {
    const last = blocks[blocks.length - 1];
    if (!last) return;
    const action = LEDGER_ACTIONS[nextIdx % LEDGER_ACTIONS.length] as string;
    const ts = new Date().toLocaleTimeString("id-ID");
    const hash = toHash(`${last.hash}|${action}|${ts}`);
    setBlocks((b) => [...b, { index: b.length, ts, action, hash, prev: last.hash }]);
    setNextIdx((i) => i + 1);
  };

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="max-w-xl text-sm text-muted-foreground">
          Klik tombol untuk mencatat keputusan kepatuhan. Setiap blok menyimpan sidik digital (hash)
          dari isi dan hash blok sebelumnya â€” <span className="font-medium text-foreground">data pribadi tidak pernah disimpan di sini</span>.
        </p>
        <div className="flex gap-2">
          <button
            onClick={addBlock}
            className="rounded-xl bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
          >
            + Catat Keputusan
          </button>
          <button
            onClick={() => setTampering((t) => !t)}
            className={`rounded-xl border px-4 py-2.5 text-sm font-medium transition-colors ${
              tampering ? "border-destructive bg-destructive/10 text-destructive" : "border-border bg-card text-muted-foreground hover:bg-muted"
            }`}
          >
            {tampering ? "Pulihkan" : "Coba ubah blok lama ðŸ”“"}
          </button>
        </div>
      </div>

      <div className="mt-5 space-y-3">
        {blocks.map((b, i) => {
          const tamperIdx = Math.max(1, Math.floor(blocks.length / 2));
          const isTampered = tampering && i === tamperIdx;
          const shownAction = isTampered ? `${b.action} âœï¸ (diubah diam-diam)` : b.action;
          const storedHash = i === 0 ? b.hash : toHash(`${b.prev}|${b.action}|${b.ts}`);
          const shownValid = !isTampered && (i === 0 || storedHash === b.hash);
          return (
            <div key={b.index} className="relative">
              {i > 0 && <div className="absolute -top-3 left-8 h-3 w-px bg-border" aria-hidden="true" />}
              <div className={`flex flex-wrap items-center gap-x-4 gap-y-1 rounded-xl border p-4 ${shownValid ? "border-border bg-card" : "border-destructive bg-destructive/5"}`}>
                <div className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg font-display text-sm font-bold ${shownValid ? "bg-accent text-accent-foreground" : "bg-destructive text-destructive-foreground"}`}>
                  {b.index === 0 ? "G" : b.index}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium text-foreground">{shownAction}</p>
                  <p className="mt-0.5 font-mono text-[11px] text-muted-foreground">
                    #{b.index} Â· {b.ts} Â· hash: <span className={shownValid ? "text-primary" : "text-destructive"}>{storedHash.slice(0, 16)}â€¦</span> Â· prev: {b.prev.slice(0, 10)}â€¦
                  </p>
                </div>
                <span className={`shrink-0 rounded-full px-2.5 py-1 text-[11px] font-semibold ${shownValid ? "bg-accent text-accent-foreground" : "bg-destructive/15 text-destructive"}`}>
                  {shownValid ? "âœ“ Terverifikasi" : "âœ— Rantai rusak!"}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {tampering && (
        <p className="mt-4 rounded-xl bg-destructive/10 p-4 text-sm text-destructive">
          Beginilah kekuatan bukti berbasis blockchain: jika seseorang mengubah catatan lama diam-diam,
          hash blok tersebut tidak cocok lagi dengan rantai dan perubahan langsung terlihat saat audit.
        </p>
      )}
      {!tampering && blocks.length === 1 && (
        <p className="mt-4 text-center text-sm text-muted-foreground">Rantai masih kosong â€” catat keputusan pertama Anda.</p>
      )}
    </div>
  );
}

/* ---------------- Page ---------------- */

const TABS = [
  { id: "ropa", label: "Simulasi ROPA", desc: "Lihat bagaimana agen AI menyusun draf ROPA" },
  { id: "score", label: "Skor Kepatuhan", desc: "Ukur kesiapan kepatuhan perusahaan Anda" },
  { id: "ledger", label: "Buku Besar Blockchain", desc: "Bukti kepatuhan yang tidak bisa diubah diam-diam" },
] as const;

type TabId = (typeof TABS)[number]["id"];

function DemoPage() {
  const [tab, setTab] = useState<TabId>("ropa");

  return (
    <PageShell>
      <section className="bg-navy-gradient py-16 text-white md:py-20">
        <div className="mx-auto max-w-6xl px-4">
          <p className="text-sm font-semibold uppercase tracking-widest text-teal-light">Demo Interaktif</p>
          <h1 className="mt-2 max-w-2xl font-display text-4xl font-bold leading-tight">
            Rasakan cara RegChain bekerja
          </h1>
          <p className="mt-4 max-w-2xl text-sm text-white/70">
            Tiga simulasi interaktif yang meniru alur nyata: Hubungkan â†’ Petakan â†’ Setujui â†’
            Buktikan. Tidak perlu mendaftar â€” semuanya berjalan langsung di halaman ini.
          </p>
        </div>
      </section>

      <section className="py-12 md:py-16">
        <div className="mx-auto max-w-6xl px-4">
          <div className="grid gap-3 sm:grid-cols-3">
            {TABS.map((t) => (
              <button
                key={t.id}
                onClick={() => setTab(t.id)}
                className={`rounded-2xl border p-4 text-left transition-all ${
                  tab === t.id ? "border-primary bg-accent shadow-sm" : "border-border bg-card hover:border-primary/40"
                }`}
              >
                <div className="font-display text-sm font-bold text-foreground">{t.label}</div>
                <div className="mt-1 text-xs leading-snug text-muted-foreground">{t.desc}</div>
              </button>
            ))}
          </div>

          <div className="mt-8">
            {tab === "ropa" && <RopaSimulator />}
            {tab === "score" && <ScoreCalculator />}
            {tab === "ledger" && <LedgerDemo />}
          </div>
        </div>
      </section>
    </PageShell>
  );
}

export const Route = createFileRoute("/demo")({
  head: () => ({
    meta: [
      { title: "Demo Interaktif â€” RegChain" },
      {
        name: "description",
        content:
          "Coba simulasi interaktif RegChain: penyusunan draf ROPA oleh agen AI, kalkulator skor kepatuhan, dan buku besar blockchain yang menunjukkan bukti kepatuhan tahan uji.",
      },
      { property: "og:title", content: "Demo Interaktif â€” RegChain" },
      {
        property: "og:description",
        content: "Simulasi ROPA, skor kepatuhan, dan buku besar blockchain â€” langsung di halaman ini.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: DemoPage,
});
