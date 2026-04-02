import Link from "next/link";

export default function Header() {
  return (
    <header className="w-full py-4 px-6">
      <div className="max-w-2xl mx-auto flex items-center justify-center">
        <Link href="/" className="text-2xl font-bold tracking-tight text-cooked-amber">
          COOKED
        </Link>
      </div>
    </header>
  );
}
