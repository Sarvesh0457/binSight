"use client";
import { useRef, useState, useEffect } from "react";
import Link from "next/link";
import zod from "zod";

const contactNoSchema=zod.string().min(10, "Contact number must be at least 10 digits").max(10, "Contact number must be at most 10 digits");
const pincodeSchema=zod.string().min(6, "Pincode must be at least 6 digits").max(6, "Pincode must be at most 6 digits");
const citySchema=zod.string().min(3, "City must be at least 3 characters").max(30, "City must be at most 30 characters");
const areaSchema=zod.string().min(3, "Area must be at least 3 characters").max(30, "Area must be at most 30 characters");
const addressSchema=zod.string().min(10, "Address must be at least 10 characters").max(100, "Address must be at most 100 characters");
const notesSchema=zod.string().max(100, "Notes must be at most 100 characters");

const formSchema=zod.object({
  name: zod.string().min(3, "Name must be at least 3 characters").max(30, "Name must be at most 30 characters"),
  contactNo: contactNoSchema,
  pincode: pincodeSchema,
  city: citySchema,
  area: areaSchema,
  address: addressSchema,
  notes: notesSchema,
});
export default function PickupPage() {
  const formRef = useRef<HTMLFormElement | null>(null);
  const [notice, setNotice] = useState<string | null>(null);

  useEffect(() => {
    if (!notice) return;
    const t = setTimeout(() => setNotice(null), 5500);
    return () => clearTimeout(t);
  }, [notice]);

  const onSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const validation = formSchema.safeParse(fd);
    if (!validation.success) {
      setNotice(validation.error.message);
      return;
    }
    const name = String(fd.get("name") || "").trim();
    setNotice(`Thanks${name ? `, ${name}` : ""}! Pickup scheduled within 3–6 hours.`);
    e.currentTarget.reset();
  };

  return (
    <main className="relative min-h-screen text-white bg-black bg-grid bg-noise hero-spotlight">
      <div className="mx-auto px-4 pt-16 pb-20 max-w-3xl md:px-6">
        <header className="flex items-center justify-between mb-8">
          <div className="inline-flex items-center gap-2 mt-14 px-3 py-1 text-xs text-neutral-300 bg-[#07100c]/70 rounded-full border-[#1b3a29] border">
            <span className="h-1.5 w-1.5 rounded-full" style={{ background: "#16a34a" }} />
            Request a pickup
          </div>
          <Link href="/classify" className="mt-14 text-sm text-neutral-300 hover:text-white/90">Back to classify →</Link>
        </header>

        {notice && (
          <div className="mb-6 p-3 text-sm text-emerald-300 bg-emerald-950/40 rounded-lg border-emerald-800 border">
            <span className="mr-2">✅</span>
            {notice}
          </div>
        )}

        <section className="p-6 rounded-xl glass">
          <h1 className="mb-1 text-2xl font-semibold">Pickup details</h1>
          <p className="mb-6 text-sm text-neutral-300">We’ll arrange a pickup for the items at your location. Provide accurate contact and address details.</p>

          <form ref={formRef} onSubmit={onSubmit} className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div>
              <label htmlFor="name" className="block mb-1 text-sm text-neutral-300">Full name</label>
              <input id="name" name="name" required placeholder="John Doe" className="px-3 py-2 w-full text-sm bg-[#0a180e] rounded-md border-[#1b3a29] outline-none border focus:ring-2 focus:ring-emerald-700/40" />
            </div>
            <div>
              <label htmlFor="phone" className="block mb-1 text-sm text-neutral-300">Phone number</label>
              <input id="phone" name="phone" required inputMode="tel" pattern="[0-9+\-() ]{7,}" placeholder="+91 98765 43210" className="px-3 py-2 w-full text-sm bg-[#0a180e] rounded-md border-[#1b3a29] outline-none border focus:ring-2 focus:ring-emerald-700/40" />
            </div>
            <div>
              <label htmlFor="pincode" className="block mb-1 text-sm text-neutral-300">Pincode</label>
              <input id="pincode" name="pincode" required inputMode="numeric" pattern="[0-9]{4,8}" placeholder="560001" className="px-3 py-2 w-full text-sm bg-[#0a180e] rounded-md border-[#1b3a29] outline-none border focus:ring-2 focus:ring-emerald-700/40" />
            </div>
            <div>
              <label htmlFor="city" className="block mb-1 text-sm text-neutral-300">City</label>
              <input id="city" name="city" required placeholder="Bengaluru" className="px-3 py-2 w-full text-sm bg-[#0a180e] rounded-md border-[#1b3a29] outline-none border focus:ring-2 focus:ring-emerald-700/40" />
            </div>
            <div>
              <label htmlFor="area" className="block mb-1 text-sm text-neutral-300">Area / Locality</label>
              <input id="area" name="area" required placeholder="Indiranagar" className="px-3 py-2 w-full text-sm bg-[#0a180e] rounded-md border-[#1b3a29] outline-none border focus:ring-2 focus:ring-emerald-700/40" />
            </div>
            <div className="md:col-span-2">
              <label htmlFor="address" className="block mb-1 text-sm text-neutral-300">Address</label>
              <textarea id="address" name="address" required rows={3} placeholder="House/Flat, Street, Landmark" className="px-3 py-2 w-full text-sm bg-[#0a180e] rounded-md border-[#1b3a29] outline-none border focus:ring-2 focus:ring-emerald-700/40" />
            </div>
            <div className="md:col-span-2">
              <label htmlFor="notes" className="block mb-1 text-sm text-neutral-300">Notes (optional)</label>
              <input id="notes" name="notes" placeholder="Gate code, best time, item quantity…" className="px-3 py-2 w-full text-sm bg-[#0a180e] rounded-md border-[#1b3a29] outline-none border focus:ring-2 focus:ring-emerald-700/40" />
            </div>

            <div className="flex flex-wrap items-center gap-3 mt-2 md:col-span-2">
              <button type="submit" className="relative inline-flex items-center gap-2 px-5 py-3 text-sm font-medium text-white rounded-lg cursor-pointer group">
                <span className="absolute inset-0 bg-[#0e2a1d] rounded-lg -z-10" />
                <span className="absolute inset-0 bg-gradient-to-b from-emerald-700/60 to-emerald-700/30 rounded-lg opacity-0 transition-opacity -z-10 group-hover:opacity-100" />
                <span className="absolute inset-0 rounded-lg -z-20 ring-1 ring-[#1b3a29]" />
                Request Pickup
              </button>
              <button type="reset" className="px-5 py-3 text-sm text-neutral-200 rounded-lg border-[#1f3b28] cursor-pointer border hover:bg-[#0f2618]">Clear</button>
            </div>
          </form>
        </section>
      </div>
    </main>
  );
}