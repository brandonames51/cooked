import Link from "next/link";

export default function Header() {
  return (
    <header style={{ width: "100%", padding: "16px 24px" }}>
      <div style={{ maxWidth: 640, margin: "0 auto", display: "flex", justifyContent: "center" }}>
        <Link href="/" style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 20, fontWeight: 700, letterSpacing: 8, textTransform: "uppercase", color: "rgba(255,255,255,0.5)", textDecoration: "none" }}>
          ROTTED
        </Link>
      </div>
    </header>
  );
}
