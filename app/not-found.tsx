import Link from "next/link";

export default function NotFound() {
  return (
    <main className="not-found dark-section"><div className="page-shell"><p className="eyebrow">404</p><h1>This page does not exist.</h1><p>Project Monet is currently one focused Instagram marketing homepage.</p><Link className="button button-light" href="/">Return home</Link></div></main>
  );
}
