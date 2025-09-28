"use client";
import { useCallback, useMemo, useRef, useState } from "react";
import Image from "next/image";

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

  const theme = useMemo(() => ({
    bg: "bg-black",
    panel: "bg-[#0b1a0f] border border-[#0f2a17]",
    accent: "#16a34a",
    textMuted: "text-neutral-300",
  }), []);

  const parseResults = (data: unknown): WasteItem[] => {
    if (!data) return [];
    if (Array.isArray(data)) return data as WasteItem[];
  const obj = data as Record<string, unknown>;
  if (Array.isArray(obj?.waste_analysis)) return obj.waste_analysis as WasteItem[];
  if (Array.isArray(obj?.original_classification)) return obj.original_classification as WasteItem[];
    return [];
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

  return (
    <div className={`${theme.bg} min-h-screen text-white`}>
      <div className="mx-auto px-4 py-10 max-w-3xl">
        <header className="flex items-center justify-between mb-8">
          <h1 className="text-2xl font-semibold tracking-tight">BinSight — Classify</h1>
          <button
            onClick={() => {
              onFile(null);
              setError(null);
              setResults(null);
            }}
            className="px-3 py-1 text-sm text-neutral-200 rounded-md border-[#1f3b28] border hover:bg-[#0f2618]"
          >
            Reset
          </button>
        </header>

        <section
          onDragOver={(e) => e.preventDefault()}
          onDrop={handleDrop}
          className={`${theme.panel} rounded-xl p-5`}
        >
          <div className="grid gap-5 md:grid-cols-2">
            <div>
              <div
                className="flex flex-col items-center justify-center h-48 text-center bg-[#0a180e] rounded-lg border-2 border-dashed border-[#1f3b28] cursor-pointer hover:bg-[#0c1c12]"
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
                      <Image
                        src={preview}
                        alt="Preview"
                        fill
                        className="object-cover rounded-lg"
                      />
                    </div>
                ) : (
                  <div className="px-6">
                    <p className="text-sm font-medium">Drag & drop an image</p>
                    <p className={`mt-1 text-xs ${theme.textMuted}`}>or click to browse</p>
                  </div>
                )}
              </div>

              <div className="flex gap-3 mt-4">
                <button
                  disabled={!file || loading}
                  onClick={handleSubmit}
                  className="px-4 py-2 text-sm font-medium text-white bg-green-700 rounded-md hover:bg-green-800 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {loading ? "Classifying…" : "Scan Image"}
                </button>
                {file && (
                  <button
                    onClick={() => onFile(null)}
                    className="px-4 py-2 text-sm text-neutral-200 rounded-md border-[#1f3b28] border hover:bg-[#0f2618]"
                  >
                    Remove
                  </button>
                )}
              </div>
            </div>

            <div className="flex flex-col gap-3">
              <h2 className="text-lg font-semibold">Results</h2>
              {!results && !error && (
                <p className={`text-sm ${theme.textMuted}`}>Upload an image and tap “Scan Image”.</p>
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
              {results && results.length > 0 && (
                <ul className="overflow-hidden divide-y divide-[#13271a] rounded-lg border-[#1f3b28] border">
                  {results.slice(0, 5).map((r, i) => {
                    const label = r.detected_object || r.label || "Unknown";
                    const category = r.waste_category || inferCategory(label);
                    const score = (r.confidence ?? r.score ?? 0) * (r.confidence || r.score ? 100 : 1);
                    return (
                      <li key={i} className="grid grid-cols-[1fr_auto_auto] items-center gap-3 px-4 py-3 bg-[#0a180e]">
                        <span className="text-sm text-neutral-200 truncate">{label}</span>
                        <span className="px-2 py-0.5 text-xs text-neutral-300 rounded-full border-[#1f3b28] border capitalize">
                          {category}
                        </span>
                        <span className="text-right text-sm font-mono" style={{color: theme.accent}}>
                          {typeof score === "number" && score <= 1 ? `${(score * 100).toFixed(1)}%` : `${Number(score).toFixed(1)}%`}
                        </span>
                      </li>
                    );
                  })}
                </ul>
              )}
            </div>
          </div>
        </section>

        <footer className="mt-8 text-center text-xs text-neutral-400">
          Turning Waste into Wisdom ♻️
        </footer>
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
