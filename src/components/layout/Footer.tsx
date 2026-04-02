import Link from "next/link";

export default function Footer() {
  return (
    <footer className="w-full py-6 px-6 mt-auto">
      <div className="max-w-2xl mx-auto flex flex-col items-center gap-2">
        <div className="flex items-center gap-4 text-xs text-cooked-text-muted">
          <Link
            href="/"
            className="hover:text-cooked-text-secondary transition-colors"
          >
            Home
          </Link>
          <span>&middot;</span>
          <Link
            href="/privacy"
            className="hover:text-cooked-text-secondary transition-colors"
          >
            Privacy
          </Link>
        </div>
        <p className="text-[10px] text-cooked-text-muted">
          &copy; 2026 Rotted
        </p>
      </div>
    </footer>
  );
}
