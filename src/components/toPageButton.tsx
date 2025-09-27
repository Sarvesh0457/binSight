import Link from "next/link";


export default function ToPage() {
  return (
    <Link href="/classify">
      <button className="py-4 px-8 text-white bg-neutral-500 rounded-xl cursor-pointer hover:bg-neutral-600">Get Started</button>
    </Link>
  );
}
