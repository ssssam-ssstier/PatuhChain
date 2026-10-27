import { Link } from "@tanstack/react-router";


export function Footer() {
  return (
    <footer className="bg-navy-gradient text-white/80">
      <div className="mx-auto max-w-6xl px-4 py-14">
        <div className="grid gap-10 md:grid-cols-4">
          <div className="md:col-span-2">
            <div className="flex items-center gap-2.5">
              <img src="/favicon.png" alt="Logo PatuhChain" className="h-10 w-10 rounded-lg bg-white/95 object-contain p-0.5" />
              <span className="font-display text-xl font-bold text-white">
                Patuh<span className="text-teal-light">Chain</span>
              </span>
            </div>
            <p className="mt-4 max-w-sm text-sm leading-relaxed">
              Platform kepatuhan otomatis berbasis AI agentik dan blockchain untuk efisiensi proses
              bisnis. ROPA &amp; DPIA disusun otomatis, bukti kepatuhan tidak bisa diubah diam-diam.
            </p>
            <p className="mt-4 text-xs text-white/50">
              Dirintis oleh Samuel Halasan Sirait &amp; Dio Paskahri Arthimaswara Marthin —
              Universitas Brawijaya, Malang. Creanomic 2026 · Shaping Innovation, Creating Impact.
            </p>
          </div>

          <div>
            <h4 className="font-display text-sm font-semibold uppercase tracking-wider text-teal-light">Navigasi</h4>
            <ul className="mt-4 space-y-2.5 text-sm">
              <li><Link to="/fitur" className="hover:text-white">Fitur</Link></li>
              <li><Link to="/demo" className="hover:text-white">Demo Interaktif</Link></li>
              <li><Link to="/harga" className="hover:text-white">Harga</Link></li>
              <li><Link to="/bmc" className="hover:text-white">Model Bisnis</Link></li>
              <li><Link to="/kontak" className="hover:text-white">Kontak</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-display text-sm font-semibold uppercase tracking-wider text-teal-light">Regulasi yang Didukung</h4>
            <ul className="mt-4 space-y-2.5 text-sm">
              <li>PP 33/2026 — Pelaksana UU PDP</li>
              <li>PSPK 1 &amp; 2 — Keberlanjutan (OJK)</li>
              <li>KBLI 2025 — OSS &amp; AHU</li>
              <li>Pelaporan pajak digital</li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-3 border-t border-white/15 pt-6 text-xs text-white/50 sm:flex-row">
          <span>© {new Date().getFullYear()} PatuhChain. Seluruh hak cipta dilindungi.</span>
          <span>Data pribadi tidak disimpan di blockchain — hanya sidik digital (hash).</span>
        </div>
      </div>
    </footer>
  );
}
