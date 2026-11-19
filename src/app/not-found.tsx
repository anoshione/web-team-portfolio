import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-bg px-6 py-24 text-center">
      <div className="w-full max-w-md rounded-2xl border border-white/[0.08] bg-surface p-8 sm:p-12">
        <p className="font-mono text-xs uppercase tracking-widest text-accent">
          404 / Page Not Found
        </p>
        <h1 className="mt-4 font-display text-4xl font-bold tracking-tight text-ink sm:text-5xl">
          Lost in code.
        </h1>
        <p className="mt-4 text-sm leading-relaxed text-ink/60">
          The requested resource could not be found or has been relocated to another workspace.
        </p>
        <div className="mt-8">
          <Link
            href="/"
            className="inline-flex items-center justify-center rounded-lg bg-accent px-6 py-3 text-sm font-semibold text-ink transition-colors hover:bg-accent/90 focus-visible:outline-2 focus-visible:outline-accent"
          >
            Return to Homepage
          </Link>
        </div>
      </div>
    </main>
  );
}
