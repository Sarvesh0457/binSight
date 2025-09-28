import Link from "next/link";


export default function ToPage() {
  return (
    <Link href="/classify">
      <button className="py-3 px-6 text-sm font-medium text-white bg-[#0e2a1d] rounded-lg cursor-pointer ring-1 ring-[#1b3a29] hover:bg-emerald-800/40">
        Get Started
      </button>
    </Link>
  );
}
