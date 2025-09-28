import Link from "next/link";

export default function Home() {
  return (
    <main className="overflow-hidden relative min-h-screen text-white bg-black bg-grid bg-noise">
      {/* Hero */}
  <section className="relative flex flex-col items-center justify-center mx-auto px-6 max-w-6xl min-h-[100svh] min-h-[92vh] text-center hero-spotlight md:px-8">
        {/* decorative gradient ring */}
        <div className="absolute left-1/2 h-[28rem] w-[28rem] rounded-full blur-3xl pointer-events-none -top-32 -translate-x-1/2" style={{background:"radial-gradient(closest-side, rgba(22,163,74,0.15), transparent)"}} />

        <div className="inline-flex items-center gap-2 px-3 py-1 text-xs text-neutral-300 bg-[#07100c]/70 rounded-full border-[#1b3a29] border">
          <span className="h-1.5 w-1.5 rounded-full" style={{background: "#16a34a"}} />
          Turning Waste into Wisdom
        </div>

  <h1 className="mx-auto mt-6 max-w-4xl text-pretty text-4xl font-semibold leading-tight tracking-tight md:text-7xl">
          <span className="text-white/90">BinSight</span>{" "}
          <span className="text-accent-gradient">classifies your waste</span>{" "}
          so you can act instantly
        </h1>

        <p className="mx-auto mt-6 max-w-2xl text-balance text-base text-neutral-300 md:text-lg">
          A minimal, fast, and privacy-friendly tool to scan an item, identify its waste type, and choose pickup or proper disposal.
        </p>

        <div className="flex items-center justify-center gap-3 mt-9">
          <Link href="/classify" className="relative inline-flex items-center gap-2 px-5 py-3 text-sm font-medium text-white rounded-lg group">
            <span className="absolute inset-0 bg-[#0e2a1d] rounded-lg -z-10" />
            <span className="absolute inset-0 bg-gradient-to-b from-emerald-700/60 to-emerald-700/30 rounded-lg opacity-0 transition-opacity -z-10 group-hover:opacity-100" />
            <span className="absolute inset-0 rounded-lg -z-20 ring-1 ring-[#1b3a29]" />
            Scan an image
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="opacity-90"><path d="M5 12h14M13 5l7 7-7 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </Link>
          <a href="#how" className="text-sm text-neutral-300 hover:text-white/90">How it works</a>
        </div>
      </section>

      {/* Stats strip */}
      <section className="border-t border-[#153826]">
        <div className="mx-auto px-6 py-10 max-w-6xl md:px-8">
          <div className="flex flex-wrap items-center justify-center gap-3 md:gap-4">
            {[ 
              {n: "4", l: "core categories"},
              {n: "Fast", l: "results"},
              {n: "Private", l: "by design"},
              {n: "No", l: "sign‑up"},
            ].map((s, i) => (
              <div key={i} className="px-4 py-2 text-sm rounded-full glass">
                <span className="font-semibold text-white/90">{s.n}</span>
                <span className="ml-2 text-neutral-300">{s.l}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Capabilities */}
      <section className="mx-auto px-6 py-20 max-w-6xl md:px-8">
        <div className="mb-8 text-center">
          <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">What you can do</h2>
          <p className="mx-auto mt-2 max-w-2xl text-sm text-neutral-300">Simple tools that help you sort and act responsibly—kept minimal, fast, and focused.</p>
        </div>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
          {[
            {t: "Identify waste", d: "Upload an item photo to classify it into Recyclable, Compostable, Hazardous, or General.", icon:(
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="opacity-90"><path d="M4 5a2 2 0 0 1 2-2h7.5a2 2 0 0 1 1.6.8l2.5 3.2a2 2 0 0 1 .4 1.2V19a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V5Z" stroke="currentColor" strokeWidth="1.5"/><path d="M8 12h8M8 16h5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>
            )},
            {t: "Pick the next step", d: "Decide to store, recycle, compost, or discard based on the classification.", icon:(
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="opacity-90"><path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>
            )},
            {t: "Find disposal (soon)", d: "Discover nearby authorized centers for responsible disposal.", icon:(
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="opacity-90"><path d="M12 21s7-5.1 7-11a7 7 0 1 0-14 0c0 5.9 7 11 7 11Z" stroke="currentColor" strokeWidth="1.5"/><circle cx="12" cy="10" r="2.5" stroke="currentColor" strokeWidth="1.5"/></svg>
            )},
            {t: "History (soon)", d: "Keep a lightweight log of recent scans for quick reference.", icon:(
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="opacity-90"><path d="M12 8v5l3 2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/><path d="M12 21a9 9 0 1 0-9-9" stroke="currentColor" strokeWidth="1.5"/><path d="M3 12H1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>
            )},
          ].map((c, i) => (
            <div key={i} className="p-5 rounded-lg glass">
              <div className="inline-flex items-center justify-center mb-3 h-9 w-9 bg-[#0e2a1d] rounded-md ring-1 ring-[#1b3a29]">
                {c.icon}
              </div>
              <h3 className="text-base font-semibold">{c.t}</h3>
              <p className="mt-1 text-sm text-neutral-300">{c.d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section id="how" className="mx-auto px-6 py-24 max-w-6xl border-t border-[#153826] md:px-8">
        <div className="mb-8 text-center">
          <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">How it works</h2>
          <p className="mx-auto mt-2 max-w-2xl text-sm text-neutral-300">Three quick steps—no clutter, no friction.</p>
        </div>
        <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
          {[
            {t: "Upload", d: "Drag an image in or browse from your device."},
            {t: "Classify", d: "We analyze it and label the waste type."},
            {t: "Choose", d: "Act instantly—store, recycle/compost, or discard."},
          ].map((f, i) => (
            <div key={i} className="p-6 text-center rounded-lg glass">
              <div className="flex items-center justify-center mx-auto mb-3 h-10 w-10 text-sm text-neutral-200 rounded-full border-[#1b3a29] border">{i + 1}</div>
              <h3 className="text-base font-semibold">{f.t}</h3>
              <p className="mt-1 text-sm text-neutral-300">{f.d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="mx-auto px-6 py-24 max-w-6xl md:px-8">
        <div className="mb-8 text-center">
          <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">FAQ</h2>
          <p className="mx-auto mt-2 max-w-2xl text-sm text-neutral-300">Quick answers to common questions.</p>
        </div>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {[
            {q: "Which waste types are supported?", a: "Recyclable, Compostable, Hazardous, and General."},
            {q: "Do I need to create an account?", a: "No. You can try it without signing up."},
            {q: "Is my image stored?", a: "Images are processed to classify the item. Avoid uploading sensitive content."},
            {q: "Is it free?", a: "Yes—free to try. Some features may evolve over time."},
          ].map((f, i) => (
            <div key={i} className="p-5 rounded-lg glass">
              <h3 className="font-medium">{f.q}</h3>
              <p className="mt-1 text-sm text-neutral-300">{f.a}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Final CTA */}
      <section className="border-t border-[#153826]">
        <div className="mx-auto px-6 py-20 max-w-6xl text-center md:px-8">
          <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">Ready to sort smarter?</h2>
          <p className="mx-auto mt-2 max-w-2xl text-sm text-neutral-300">Start with a single item and see what BinSight suggests.</p>
          <div className="mt-8">
            <Link href="/classify" className="relative inline-flex items-center gap-2 px-6 py-3 text-sm font-medium text-white rounded-lg group">
              <span className="absolute inset-0 bg-[#0e2a1d] rounded-lg -z-10" />
              <span className="absolute inset-0 bg-gradient-to-b from-emerald-700/60 to-emerald-700/30 rounded-lg opacity-0 transition-opacity -z-10 group-hover:opacity-100" />
              <span className="absolute inset-0 rounded-lg -z-20 ring-1 ring-[#1b3a29]" />
              Get started
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="opacity-90"><path d="M5 12h14M13 5l7 7-7 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </Link>
          </div>
        </div>
      </section>

      <footer className="px-6 py-10 text-center text-xs text-neutral-400 md:px-8">© BinSight 2025</footer>
    </main>
  );
}
