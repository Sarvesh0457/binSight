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
          A comprehensive waste management platform with AI-powered classification, real-time bin monitoring, gamified rewards, and smart analytics.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-3 mt-9">
          <Link href="/classify" className="relative inline-flex items-center gap-2 px-5 py-3 text-sm font-medium text-white rounded-lg group">
            <span className="absolute inset-0 bg-[#0e2a1d] rounded-lg -z-10" />
            <span className="absolute inset-0 bg-gradient-to-b from-emerald-700/60 to-emerald-700/30 rounded-lg opacity-0 transition-opacity -z-10 group-hover:opacity-100" />
            <span className="absolute inset-0 rounded-lg -z-20 ring-1 ring-[#1b3a29]" />
            <span className="text-md text-accent-gradient font-medium">Classify Waste</span>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="opacity-90"><path d="M5 12h14M13 5l7 7-7 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </Link>
          <Link href="/smartbins" className="relative inline-flex items-center gap-2 px-5 py-3 text-sm font-medium text-white rounded-lg group">
            <span className="absolute inset-0 bg-[#0e2a1d] rounded-lg -z-10" />
            <span className="absolute inset-0 bg-gradient-to-b from-blue-700/60 to-blue-700/30 rounded-lg opacity-0 transition-opacity -z-10 group-hover:opacity-100" />
            <span className="absolute inset-0 rounded-lg -z-20 ring-1 ring-[#1b3a29]" />
            <span className="text-md text-blue-400 font-medium">SmartBins</span>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="opacity-90"><path d="M5 12h14M13 5l7 7-7 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </Link>
        </div>
      </section>

      {/* Stats strip */}
      <section className="border-t border-[#153826]">
        <div className="mx-auto px-6 py-10 max-w-6xl md:px-8">
          <div className="flex flex-wrap items-center justify-center gap-3 md:gap-4">
            {[ 
              {n: "8", l: "Smart Bins"},
              {n: "Real-time", l: "Monitoring"},
              {n: "Gamified", l: "Rewards"},
              {n: "AI-Powered", l: "Classification"},
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
            {t: "AI Classification", d: "Upload an item photo to classify it into Recyclable, Compostable, Hazardous, or General.", icon:(
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="opacity-90"><path d="M4 5a2 2 0 0 1 2-2h7.5a2 2 0 0 1 1.6.8l2.5 3.2a2 2 0 0 1 .4 1.2V19a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V5Z" stroke="currentColor" strokeWidth="1.5"/><path d="M8 12h8M8 16h5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>
            )},
            {t: "SmartBins Monitoring", d: "Real-time monitoring of smart waste bins with fill levels, status indicators, and location tracking.", icon:(
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="opacity-90"><path d="M12 21s7-5.1 7-11a7 7 0 1 0-14 0c0 5.9 7 11 7 11Z" stroke="currentColor" strokeWidth="1.5"/><circle cx="12" cy="10" r="2.5" stroke="currentColor" strokeWidth="1.5"/></svg>
            )},
            {t: "Gamified Rewards", d: "Earn points for responsible waste management and redeem them for vouchers and eco-friendly rewards.", icon:(
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="opacity-90"><path d="M12 8v5l3 2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/><path d="M12 21a9 9 0 1 0-9-9" stroke="currentColor" strokeWidth="1.5"/><path d="M3 12H1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>
            )},
            {t: "Analytics Dashboard", d: "Track your environmental impact with detailed analytics, waste breakdown, and performance metrics.", icon:(
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="opacity-90"><path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>
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

      {/* New Features Showcase */}
      <section className="mx-auto px-6 py-24 max-w-6xl border-t border-[#153826] md:px-8">
        <div className="mb-8 text-center">
          <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">New Features</h2>
          <p className="mx-auto mt-2 max-w-2xl text-sm text-neutral-300">Discover the latest additions to BinSight&apos;s waste management ecosystem.</p>
        </div>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {[
            {
              title: "SmartBins Network",
              description: "Monitor 8+ smart bins across multiple locations with real-time fill levels, status indicators, and IoT data.",
              features: ["Real-time monitoring", "Location tracking", "Status alerts", "IoT integration"],
              icon: "🗑️",
              color: "text-blue-400"
            },
            {
              title: "Rewards System",
              description: "Earn points for responsible waste management and redeem them for vouchers, eco-friendly products, and more.",
              features: ["Point-based rewards", "Voucher redemption", "Activity tracking", "Gamification"],
              icon: "⭐",
              color: "text-yellow-400"
            },
            {
              title: "Analytics Dashboard",
              description: "Track your environmental impact with comprehensive analytics, waste breakdown, and performance metrics.",
              features: ["Waste analytics", "Impact tracking", "Performance metrics", "Data visualization"],
              icon: "📊",
              color: "text-green-400"
            }
          ].map((feature, index) => (
            <div key={index} className="p-6 rounded-lg glass">
              <div className="flex items-center gap-3 mb-4">
                <span className="text-3xl">{feature.icon}</span>
                <h3 className="text-lg font-semibold text-white">{feature.title}</h3>
              </div>
              <p className="text-sm text-neutral-300 mb-4">{feature.description}</p>
              <div className="space-y-2">
                {feature.features.map((item, i) => (
                  <div key={i} className="flex items-center gap-2 text-xs text-neutral-400">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
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
            {q: "Which waste types are supported?", a: "Recyclable, Compostable, Hazardous, and General waste categories."},
            {q: "How do I earn rewards points?", a: "Earn points by properly disposing waste, recycling items, and using SmartBins across the network."},
            {q: "Can I monitor bins remotely?", a: "Yes! SmartBins provides real-time monitoring of fill levels, status, and location data."},
            {q: "Is my data private?", a: "Yes—we prioritize privacy. Images are processed locally and not stored permanently."},
            {q: "How many SmartBins are available?", a: "Currently monitoring 8+ smart bins across multiple locations with real-time IoT data."},
            {q: "What rewards can I redeem?", a: "Gift cards, eco-friendly products, vouchers, and exclusive environmental rewards."},
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
          <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">Ready to revolutionize waste management?</h2>
          <p className="mx-auto mt-2 max-w-2xl text-sm text-neutral-300">Join the smart waste management ecosystem with AI classification, real-time monitoring, and gamified rewards.</p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Link href="/classify" className="relative inline-flex items-center gap-2 px-6 py-3 text-sm font-medium text-white rounded-lg group">
              <span className="absolute inset-0 bg-[#0e2a1d] rounded-lg -z-10" />
              <span className="absolute inset-0 bg-gradient-to-b from-emerald-700/60 to-emerald-700/30 rounded-lg opacity-0 transition-opacity -z-10 group-hover:opacity-100" />
              <span className="absolute inset-0 rounded-lg -z-20 ring-1 ring-[#1b3a29]" />
              Start Classifying
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="opacity-90"><path d="M5 12h14M13 5l7 7-7 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </Link>
            <Link href="/smartbins" className="relative inline-flex items-center gap-2 px-6 py-3 text-sm font-medium text-white rounded-lg group">
              <span className="absolute inset-0 bg-[#0e2a1d] rounded-lg -z-10" />
              <span className="absolute inset-0 bg-gradient-to-b from-blue-700/60 to-blue-700/30 rounded-lg opacity-0 transition-opacity -z-10 group-hover:opacity-100" />
              <span className="absolute inset-0 rounded-lg -z-20 ring-1 ring-[#1b3a29]" />
              View SmartBins
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="opacity-90"><path d="M5 12h14M13 5l7 7-7 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </Link>
          </div>
        </div>
      </section>

      <footer className="px-6 py-10 text-center text-xs text-neutral-400 md:px-8">© BinSight 2025</footer>
    </main>
  );
}
