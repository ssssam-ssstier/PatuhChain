import { useState, type FormEvent } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/PageShell";

const SECTORS = ["E-commerce", "Fintech", "Kesehatan digital", "Pendidikan digital", "SaaS", "Lainnya"];
const PLANS = ["Starter — Rp1,5 jt/bulan", "Business — Rp5 jt/bulan", "Enterprise — sesuai kebutuhan", "Belum tahu, minta konsultasi"];

function KontakPage() {
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ nama: "", perusahaan: "", email: "", sektor: SECTORS[0], paket: PLANS[3], pesan: "" });

  const update = (k: keyof typeof form) => (e: { target: { value: string } }) =>
    setForm((f) => ({ ...f, [k]: e.target.value }));

  function submit(e: FormEvent) {
    e.preventDefault();
    setSent(true);
  }

  return (
    <PageShell>
      <section className="bg-navy-gradient py-16 text-white md:py-20">
        <div className="mx-auto max-w-6xl px-4">
          <p className="text-sm font-semibold uppercase tracking-widest text-teal-light">Kontak</p>
          <h1 className="mt-2 font-display text-4xl font-bold">Mari bicara tentang kepatuhan Anda</h1>
          <p className="mt-4 max-w-2xl text-sm text-white/70">
            Ceritakan kebutuhan Anda — tim kami akan membantu menilai modul yang paling relevan,
            mulai dari kepatuhan data pribadi (PP 33/2026).
          </p>
        </div>
      </section>

      <section className="py-16 md:py-20">
        <div className="mx-auto grid max-w-6xl gap-10 px-4 lg:grid-cols-[1fr_360px]">
          <div className="rounded-2xl border border-border bg-card p-7">
            {sent ? (
              <div className="flex h-full flex-col items-center justify-center py-10 text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-accent text-3xl">✅</div>
                <h2 className="mt-5 font-display text-2xl font-bold text-foreground">Terima kasih, {form.nama || "kak"}!</h2>
                <p className="mt-2 max-w-md text-sm text-muted-foreground">
                  Permintaan konsultasi untuk {form.perusahaan || "perusahaan Anda"} sudah kami terima.
                  Tim PatuhChain akan menghubungi {form.email || "email Anda"} dalam 1–2 hari kerja.
                </p>
                <button
                  onClick={() => setSent(false)}
                  className="mt-6 text-sm font-medium text-primary underline-offset-4 hover:underline"
                >
                  Kirim permintaan lain
                </button>
              </div>
            ) : (
              <form onSubmit={submit} className="space-y-5">
                <div className="grid gap-5 sm:grid-cols-2">
                  <label className="block">
                    <span className="text-sm font-medium text-foreground">Nama lengkap</span>
                    <input
                      required
                      value={form.nama}
                      onChange={update("nama")}
                      placeholder="Nama Anda"
                      className="mt-1.5 w-full rounded-lg border border-input bg-background px-3 py-2.5 text-sm outline-none transition-colors focus:border-primary"
                    />
                  </label>
                  <label className="block">
                    <span className="text-sm font-medium text-foreground">Nama perusahaan</span>
                    <input
                      required
                      value={form.perusahaan}
                      onChange={update("perusahaan")}
                      placeholder="PT Contoh Digital"
                      className="mt-1.5 w-full rounded-lg border border-input bg-background px-3 py-2.5 text-sm outline-none transition-colors focus:border-primary"
                    />
                  </label>
                </div>
                <label className="block">
                  <span className="text-sm font-medium text-foreground">Email kerja</span>
                  <input
                    required
                    type="email"
                    value={form.email}
                    onChange={update("email")}
                    placeholder="nama@perusahaan.co.id"
                    className="mt-1.5 w-full rounded-lg border border-input bg-background px-3 py-2.5 text-sm outline-none transition-colors focus:border-primary"
                  />
                </label>
                <div className="grid gap-5 sm:grid-cols-2">
                  <label className="block">
                    <span className="text-sm font-medium text-foreground">Sektor usaha</span>
                    <select
                      value={form.sektor}
                      onChange={update("sektor")}
                      className="mt-1.5 w-full rounded-lg border border-input bg-background px-3 py-2.5 text-sm outline-none focus:border-primary"
                    >
                      {SECTORS.map((s) => (
                        <option key={s}>{s}</option>
                      ))}
                    </select>
                  </label>
                  <label className="block">
                    <span className="text-sm font-medium text-foreground">Paket yang diminati</span>
                    <select
                      value={form.paket}
                      onChange={update("paket")}
                      className="mt-1.5 w-full rounded-lg border border-input bg-background px-3 py-2.5 text-sm outline-none focus:border-primary"
                    >
                      {PLANS.map((p) => (
                        <option key={p}>{p}</option>
                      ))}
                    </select>
                  </label>
                </div>
                <label className="block">
                  <span className="text-sm font-medium text-foreground">Pesan (opsional)</span>
                  <textarea
                    rows={4}
                    value={form.pesan}
                    onChange={update("pesan")}
                    placeholder="Ceritakan sistem yang dipakai, jumlah karyawan, atau tantangan kepatuhan saat ini…"
                    className="mt-1.5 w-full rounded-lg border border-input bg-background px-3 py-2.5 text-sm outline-none transition-colors focus:border-primary"
                  />
                </label>
                <button
                  type="submit"
                  className="inline-flex w-full items-center justify-center rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90 sm:w-auto"
                >
                  Kirim Permintaan Konsultasi
                </button>
                <p className="text-xs text-muted-foreground">
                  Dengan mengirim formulir, Anda menyetujui data kontak kami simpan untuk keperluan tindak lanjut.
                </p>
              </form>
            )}
          </div>

          <aside className="space-y-6">
            <div className="rounded-2xl border border-border bg-card p-6">
              <h3 className="font-display font-semibold text-foreground">Tim di balik PatuhChain</h3>
              <ul className="mt-3 space-y-3 text-sm text-muted-foreground">
                <li>
                  <span className="font-medium text-foreground">Samuel Halasan Sirait</span>
                  <br />Universitas Brawijaya
                </li>
                <li>
                  <span className="font-medium text-foreground">Dio Paskahri Arthimaswara Marthin</span>
                  <br />Universitas Brawijaya
                </li>
              </ul>
            </div>
            <div className="rounded-2xl border border-border bg-card p-6">
              <h3 className="font-display font-semibold text-foreground">Lokasi</h3>
              <p className="mt-2 text-sm text-muted-foreground">Kota Malang, Jawa Timur, Indonesia</p>
              <p className="mt-3 text-sm text-muted-foreground">Creanomic 2026 · Shaping Innovation, Creating Impact</p>
            </div>
            <div className="rounded-2xl bg-accent p-6">
              <h3 className="font-display font-semibold text-accent-foreground">Ingin mencoba dulu?</h3>
              <p className="mt-2 text-sm text-accent-foreground/80">
                Buka halaman demo untuk mencoba simulasi ROPA, skor kepatuhan, dan buku besar blockchain.
              </p>
            </div>
          </aside>
        </div>
      </section>
    </PageShell>
  );
}

export const Route = createFileRoute("/kontak")({
  head: () => ({
    meta: [
      { title: "Kontak — PatuhChain" },
      {
        name: "description",
        content:
          "Minta konsultasi kepatuhan dengan PatuhChain. Tim dari Universitas Brawijaya, Malang — siap membantu perusahaan Anda siap PP 33/2026.",
      },
      { property: "og:title", content: "Kontak — PatuhChain" },
      {
        property: "og:description",
        content: "Ceritakan kebutuhan kepatuhan Anda — tim PatuhChain akan menindaklanjuti dalam 1–2 hari kerja.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: KontakPage,
});
