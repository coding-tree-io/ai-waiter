export default function NotFound() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-canvas px-6 text-center text-ink">
      <div className="space-y-3">
        <p className="text-xs uppercase tracking-[0.3em] text-muted">404</p>
        <h1 className="text-3xl font-[var(--font-display)]">Table not found</h1>
        <p className="text-sm text-muted">That page slipped back into the kitchen.</p>
      </div>
    </main>
  );
}
