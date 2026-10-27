import { createFileRoute, Link } from "@tanstack/react-router";
import { PageShell } from "@/components/PageShell";

const TIERS = [
  {
    name: "Starter",
    price: "Rp1,5 jt",
    period: "/bulan",
    desc: "Untuk UMKM digital dan startup awal.",
    features: ["1 modul kepatuhan (PDP)", "Draf ROPA otomatis", "Dashboard skor dasar", "Email support"],
    cta: "Mulai",
    highlight: false,
  },
  {
    name: "Business",
    price: "Rp5 jt",
    period: "/bulan",
    desc: "Untuk perusahaan menengah yang butuh bukti audit.",
    features: [
      "Semua di Starter",
      "Pencatatan blockchain",
      "Penanda DPIA otomatis",
      "Modul PSPK & KBLI",
      "Onboarding 30 hari",
      "Chat support prioritas",
    ],
    cta: "Paling populer",
    highlight: true,
  },
  {
    name: "Enterprise",
    price: "Hubungi kami",
    period: "",
    desc: "Untuk perusahaan besar dan lembaga keuangan.",
    features: [
      "Semua di Business",
      "Paket audit siap serah",
      "SLA & dedicated success manager",
      "Integrasi ERP kustom",
      "Kontrak tahunan",
    ],
    cta: "Konsultasi",
    highlight: false,
  },
];

function HargaPage() {
  return (
    <PageShell>
      <section className="bg-navy-gradient py-16 text-white md:py-20">
        <div className="mx-auto max-w-6xl px-4">
          <p className="text-sm font-semibold uppercase tracking-widest text-teal-light">Harga</p>
          <h1 className="mt-2 max-w-2xl font-display text-4xl font-bold leading-tight">
            Lebih terjangkau dari konsultan penuh waktu
          </h1>
          <p className="mt-4 max-w-2xl text-sm text-white/70">
            Tanpa biaya tersembunyi. Berhenti kapan saja. Semua paket termasuk pembaruan aturan
            otomatis.
          </p>
        </div>
      </section>

      <section className="py-16 md:py-20">
        <div className="mx-auto max-w-6xl px-4">
          <div className="grid gap-6 md:grid-cols-3">
            {TIERS.map((t) => (
              <div
                key={t.name}
                className={`relative flex flex-col rounded-2xl border bg-card p-7 ${
                  t.highlight ? "border-primary shadow-lg" : "border-border"
                }`}
              >
                {t.highlight && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-primary px-3 py-1 text-xs font-semibold text-primary-foreground">
                    {t.cta}
                  </span>
                )}
                <h2 className="font-display text-xl font-bold text-foreground">{t.name}</h2>
                <p className="mt-1 text-sm text-muted-foreground">{t.desc}</p>
                <p className="mt-5">
                  <span className="font-display text-4xl font-bold text-foreground">{t.price}</span>
                  <span className="text-sm text-muted-foreground">{t.period}</span>
                </p>
                <ul className="mt-6 flex-1 space-y-2 text-sm text-muted-foreground">
                  {t.features.map((f) => (
                    <li key={f} className="flex gap-2">
                      <span className="text-primary">✓</span>
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
                <Link
                  to="/kontak"
                  className={`mt-6 rounded-xl px-4 py-3 text-center text-sm font-semibold transition-colors ${
                    t.highlight
                      ? "bg-primary text-primary-foreground hover:bg-primary/90"
                      : "border border-border text-foreground hover:bg-muted"
                  }`}
                >
                  {t.highlight ? "Pilih Business" : t.name === "Enterprise" ? "Hubungi kami" : "Mulai Starter"}
                </Link>
              </div>
            ))}
          </div>

          <div className="mx-auto mt-12 max-w-2xl rounded-2xl border border-border bg-muted p-6 text-center">
            <p className="text-sm text-muted-foreground">
              <strong className="text-foreground">Biaya setup:</strong> sekali bayar untuk integrasi
              sistem dan pemetaan awal — nominal menyesuaikan kompleksitas.{" "}
              <Link to="/kontak" className="font-semibold text-primary hover:underline">
                Minta penawaran
              </Link>
              .
            </p>
          </div>
        </div>
      </section>
    </PageShell>
  );
}

export const Route = createFileRoute("/harga")({
  head: () => ({
    meta: [
      { title: "Harga — PatuhChain" },
      { name: "description", content: "Paket langganan PatuhChain: Starter, Business, dan Enterprise. Lebih terjangkau dari konsultan penuh waktu." },
    ],
  }),
  component: HargaPage,
});