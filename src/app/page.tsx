import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen text-white bg-black">
      {/* Hero */}
      <section className="relative mx-auto px-6 py-28 max-w-7xl text-center">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(1,50,32,0.18),transparent_60%)] pointer-events-none -z-10" />

        <div className="space-y-3">
          <div className="text-3xl font-semibold tracking-tight md:text-4xl">
            BinSight
          </div>
          <span className="inline-flex items-center px-3 py-1 text-xs text-white/80 bg-[#013220]/10 rounded-full border-[#013220]/30 border">
            Turning Waste into Wisdom ♻️
          </span>
        </div>

        <h1 className="mx-auto mt-10 max-w-4xl text-4xl font-bold tracking-tight md:text-6xl">
          AI-Powered Waste Management
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-base text-white/70 md:text-lg">
          Scan your waste, know what it is, and take action instantly.
        </p>

        <div className="mt-10">
          <Link
            href="/classify"
            className="inline-block px-6 py-3 font-medium text-white bg-[#013220] rounded-md"
          >
            Scan Now
          </Link>
        </div>
      </section>

      {/* Features */}
      <section className="mx-auto px-6 py-20 max-w-7xl">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          <div className="p-6 text-center bg-[#013220]/10 rounded-lg border-[#013220]/20 border">
            <h3 className="font-semibold">Scan Image → Identify Waste Type</h3>
            <p className="mt-2 text-white/70">
              Upload a photo and instantly know the category of your waste.
            </p>
          </div>
          <div className="p-6 text-center bg-[#013220]/10 rounded-lg border-[#013220]/20 border">
            <h3 className="font-semibold">Request Pickup → Hassle-free collection</h3>
            <p className="mt-2 text-white/70">
              Enter your details and get your waste picked up within 3–6 hrs for
              minimal charges.
            </p>
          </div>
          <div className="p-6 text-center bg-[#013220]/10 rounded-lg border-[#013220]/20 border">
            <h3 className="font-semibold">Find Disposal → Nearby waste yards</h3>
            <p className="mt-2 text-white/70">
              Provide your pincode and discover the nearest authorized disposal
              locations.
            </p>
          </div>
        </div>
      </section>

      {/* How it Works */}
      <section className="mx-auto px-6 py-20 max-w-7xl border-t border-[#013220]/20">
        <div className="grid grid-cols-1 gap-8 text-center md:grid-cols-3">
          <div className="flex flex-col items-center">
            <span className="flex items-center justify-center mb-4 h-10 w-10 text-[#013220] font-semibold rounded-full border-[#013220] border">
              1
            </span>
            <h4 className="font-semibold">Upload Image</h4>
            <p className="mt-2 text-white/70">Snap or select a waste photo.</p>
          </div>
          <div className="flex flex-col items-center">
            <span className="flex items-center justify-center mb-4 h-10 w-10 text-[#013220] font-semibold rounded-full border-[#013220] border">
              2
            </span>
            <h4 className="font-semibold">Get Waste Type</h4>
            <p className="mt-2 text-white/70">AI instantly classifies it.</p>
          </div>
          <div className="flex flex-col items-center">
            <span className="flex items-center justify-center mb-4 h-10 w-10 text-[#013220] font-semibold rounded-full border-[#013220] border">
              3
            </span>
            <h4 className="font-semibold">Choose Pickup or Disposal</h4>
            <p className="mt-2 text-white/70">
              Either schedule a pickup or locate disposal yards.
            </p>
          </div>
        </div>
      </section>

      {/* CTA strip */}
      <section className="bg-black border-y border-[#013220]/20">
        <div className="mx-auto px-6 py-16 max-w-7xl text-center">
          <h2 className="text-3xl font-semibold md:text-4xl">
            Smarter Waste Management Starts with You
          </h2>
          <div className="mt-6">
            <Link
              href="/classify"
              className="inline-block px-6 py-3 font-medium text-white bg-[#013220] rounded-md"
            >
              Get Started
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-6 py-10 text-center text-white/60">© BinSight 2025</footer>
    </main>
  );
}
