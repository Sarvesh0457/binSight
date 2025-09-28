"use client";
import { useCallback, useMemo, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";

type WasteItem = {
  detected_object?: string;
  waste_category?: string;
  confidence?: number;
  label?: string;
  score?: number;
};

export default function ClassifyPage() {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [results, setResults] = useState<WasteItem[] | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const onFile = useCallback((f: File | null) => {
    setError(null);
    setResults(null);
    setFile(f);
    if (preview) URL.revokeObjectURL(preview);
    setPreview(f ? URL.createObjectURL(f) : null);
  }, [preview]);

  const handleDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const f = e.dataTransfer.files?.[0];
    if (f) onFile(f);
  }, [onFile]);

  const handleBrowse = useCallback(() => inputRef.current?.click(), []);

  const parseResults = (data: unknown): WasteItem[] => {
    if (!data) return [];
    if (Array.isArray(data)) return data as WasteItem[];
  const obj = data as Record<string, unknown>;
    if (Array.isArray(obj?.waste_analysis)) return obj.waste_analysis as WasteItem[];
    if (Array.isArray(obj?.original_classification)) return obj.original_classification as WasteItem[];
    return [];
  };

  const toPercent = (v?: number): number => {
    if (v == null) return 0;
    return v <= 1 ? v * 100 : v;
  };

  const catColor = (cat: string) => {
    const c = cat.toLowerCase();
    if (c.includes("hazard")) return { ring: "ring-red-900/60", fill: "bg-red-600", text: "text-red-300", chip: "bg-red-900/30 ring-red-800/60" };
    if (c.includes("recycl")) return { ring: "ring-emerald-900/60", fill: "bg-emerald-600", text: "text-emerald-300", chip: "bg-emerald-900/25 ring-emerald-800/60" };
    if (c.includes("compost")) return { ring: "ring-green-900/60", fill: "bg-green-600", text: "text-green-300", chip: "bg-green-900/25 ring-green-800/60" };
    return { ring: "ring-neutral-800", fill: "bg-neutral-500", text: "text-neutral-300", chip: "bg-neutral-900/30 ring-neutral-700" };
  };

  const handleSubmit = async () => {
    if (!file) return;
    setLoading(true);
    setError(null);
    setResults(null);

    try {
      const fd = new FormData();
      fd.append("file", file);
      const res = await fetch("/api/classify", { method: "POST", body: fd });
      const data = await res.json();
      if (!res.ok) {
        setError((data?.error as string) || "Classification failed");
        return;
      }
      setResults(parseResults(data));
    } catch (e) {
      setError(e instanceof Error ? e.message : "Network error");
    } finally {
      setLoading(false);
    }
  };

  // Derived best match
  const top = useMemo(() => {
    if (!results || results.length === 0) return null;
    return [...results].sort((a, b) => toPercent((b.confidence ?? b.score) as number) - toPercent((a.confidence ?? a.score) as number))[0];
  }, [results]);

  return (
    <div className="min-h-screen text-white bg-black bg-grid bg-noise hero-spotlight">
      <div className="mx-auto px-4 py-14 max-w-6xl md:px-8">
        <header className="flex items-center justify-between mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 text-xs text-neutral-300 bg-[#07100c]/70 rounded-full border-[#1b3a29] border">
            <span className="h-1.5 w-1.5 rounded-full" style={{ background: "#16a34a" }} />
            Classify an item
          </div>
          <div className="flex flex-col">
            <Link href="/" className="mt-14 mb-8 text-sm text-neutral-300 hover:text-white/90">
              Back to home →
            </Link>
            <button
              onClick={() => {
                onFile(null);
                setError(null);
                setResults(null);
              }}
              className="px-3 py-1 text-sm text-neutral-200 rounded-md border-[#1f3b28] cursor-pointer border hover:bg-[#0f2618]"
            >
              Reset
            </button>
          </div>
        </header>

  <section onDragOver={(e) => e.preventDefault()} onDrop={handleDrop} className="grid grid-cols-1 gap-8 md:grid-cols-2">
          {/* Uploader */}
      <div className="p-6 rounded-xl glass">
            <div
        className="flex flex-col items-center justify-center h-80 text-center bg-[#0a180e] rounded-lg border-2 border-dashed border-[#1f3b28] cursor-pointer hover:bg-[#0c1c12]"
              onClick={handleBrowse}
              role="button"
              aria-label="Upload image"
            >
              <input
                ref={inputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => onFile(e.target.files?.[0] ?? null)}
              />
              {preview ? (
                <div className="relative h-full w-full">
                  <Image src={preview} alt="Preview" fill className="object-cover rounded-lg" />
                </div>
              ) : (
                <div className="px-6">
                  <p className="text-sm font-medium">Drag & drop an image</p>
                  <p className="mt-1 text-xs text-neutral-300">or click to browse</p>
                </div>
              )}
            </div>

            <div className="flex gap-3 mt-5">
              <button
                disabled={!file || loading}
                onClick={handleSubmit}
                className="relative inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-white rounded-lg cursor-pointer group disabled:cursor-not-allowed disabled:opacity-50"
              >
                <span className="absolute inset-0 bg-[#0e2a1d] rounded-lg -z-10" />
                <span className="absolute inset-0 bg-gradient-to-b from-emerald-700/60 to-emerald-700/30 rounded-lg opacity-0 transition-opacity -z-10 group-hover:opacity-100" />
                <span className="absolute inset-0 rounded-lg -z-20 ring-1 ring-[#1b3a29]" />
                {loading ? (
                  <span className="inline-flex items-center gap-2">
                    <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="9" stroke="currentColor" strokeOpacity="0.2" strokeWidth="2"/><path d="M21 12a9 9 0 0 1-9 9" stroke="currentColor" strokeWidth="2"/></svg>
                    Classifying…
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-2">Scan Image<svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="opacity-90"><path d="M5 12h14M13 5l7 7-7 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg></span>
                )}
              </button>
              {file && (
                <button onClick={() => onFile(null)} className="px-4 py-2 text-sm text-neutral-200 rounded-md border-[#1f3b28] cursor-pointer border hover:bg-[#0f2618]">
                  Remove
                </button>
              )}
            </div>
          </div>

          {/* Results */}
          <div className="flex flex-col gap-6">
            <h2 className="text-2xl font-semibold">Results</h2>
            {!results && !error && (
              <p className="text-sm text-neutral-300">Upload an image and tap “Scan Image”.</p>
            )}
            {error && (
              <div className="p-3 text-sm text-red-300 bg-red-950/40 rounded-lg border-red-800 border">
                {error}
              </div>
            )}
            {results && results.length === 0 && (
              <div className="p-3 text-sm text-neutral-300 bg-[#0a180e] rounded-lg border-[#1f3b28] border">
                No items detected.
              </div>
            )}

            {top && (
              <div className="p-4 rounded-lg glass">
                {(() => {
                  const label = top.detected_object || top.label || "Unknown";
                  const category = top.waste_category || inferCategory(label);
                  const pct = toPercent(top.confidence ?? top.score);
                  const cc = catColor(category);
                  return (
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <div className="text-xs text-neutral-400">Top match</div>
                        <div className="mt-1 text-xl font-semibold text-white/90">{label}</div>
                        <div className={`mt-2 inline-flex items-center gap-2 rounded-full px-2.5 py-1 text-xs ring ${cc.chip} ${cc.ring}`}>
                          <span className="capitalize">{category.replaceAll("_"," ")}</span>
                        </div>
                      </div>
                      <div className={`text-right font-mono text-2xl ${cc.text}`}>{pct.toFixed(1)}%</div>
                    </div>
                  );
                })()}
              </div>
            )}

            {results && results.length > 0 && (
              <div className="p-5 rounded-lg glass">
                <ul className="divide-y divide-[#13271a]">
                  {results.slice(0, 6).map((r, i) => {
                    const label = r.detected_object || r.label || "Unknown";
                    const category = r.waste_category || inferCategory(label);
                    const pct = toPercent(r.confidence ?? r.score);
                    const cc = catColor(category);
                    return (
                      <li key={i} className="py-3">
                        <div className="flex items-center justify-between gap-3 mb-1">
                          <div className="min-w-0 text-sm text-neutral-200 truncate">{label}</div>
                          <div className="flex items-center gap-3">
                            <span className={`hidden sm:inline-flex items-center rounded-full px-2 py-0.5 text-xs ring ${cc.chip} ${cc.ring} capitalize`}>
                              {category.replaceAll("_"," ")}
                            </span>
                            <span className={`font-mono text-sm ${cc.text}`}>{pct.toFixed(1)}%</span>
                          </div>
                        </div>
                        <div className="h-2 w-full bg-[#13271a] rounded-full">
                          <div className={`h-2 rounded-full ${cc.fill}`} style={{ width: `${Math.max(3, Math.min(100, pct))}%` }} />
                        </div>
                      </li>
                    );
                  })}
                </ul>
              </div>
            )}
            {/* Actions (static) */}
            <div className="p-6 rounded-xl glass">
              <div className="mb-3 text-sm text-neutral-300">Next actions</div>
              <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                <Link href="/maps" className="w-full sm:w-auto">
                  <button className="relative inline-flex items-center justify-center gap-2 px-5 py-3 w-full text-base font-medium text-white rounded-lg cursor-pointer group sm:w-auto">
                  <span className="absolute inset-0 bg-[#0e2a1d] rounded-lg -z-10" />
                  <span className="absolute inset-0 bg-gradient-to-b from-emerald-700/60 to-emerald-700/30 rounded-lg opacity-0 transition-opacity -z-10 group-hover:opacity-100" />
                  <span className="absolute inset-0 rounded-lg -z-20 ring-1 ring-[#1b3a29]" />
                  Yards Near Me !
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="opacity-90"><path d="M12 21s7-5.1 7-11a7 7 0 1 0-14 0c0 5.9 7 11 7 11Z" stroke="currentColor" strokeWidth="1.5"/><circle cx="12" cy="10" r="2.5" stroke="currentColor" strokeWidth="1.5"/></svg>
                  </button>
                </Link>
                <Link href="/pickup" className="w-full sm:w-auto">
                  <button className="inline-flex items-center justify-center gap-2 px-5 py-3 w-full text-base text-neutral-200 rounded-lg border-[#1f3b28] cursor-pointer border hover:bg-[#0f2618] sm:w-auto">
                  Request a Pickup
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="opacity-90"><path d="M3 7h13l5 5v5a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2Z" stroke="currentColor" strokeWidth="1.5"/><path d="M21 12h-6a2 2 0 0 1-2-2V7" stroke="currentColor" strokeWidth="1.5"/></svg>
                  </button>
                </Link>
              </div>
            </div>

            
          </div>
        </section>

        <footer className="mt-10 text-center text-xs text-neutral-400">Turning Waste into Wisdom ♻️</footer>
      </div>
    </div>
  );
}


function inferCategory(label: string): string {
  const l = label.toLowerCase();
  if (/bottle|can|tin|cardboard|paper|glass|jar|carton|metal|aluminum|steel/.test(l)) return "recyclable";
  if (/banana|apple|orange|fruit|vegetable|carrot|potato|tomato|lettuce|bread|food|leaf|wood/.test(l)) return "compostable";
  if (/battery|phone|computer|electronic|bulb|fluorescent|chemical|paint|oil|medicine|pill|syringe/.test(l)) return "hazardous";
  return "general_waste";
}
