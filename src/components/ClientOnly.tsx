import { Suspense, useEffect, useState, type ReactNode } from 'react';

const Spinner = () => (
  <div className="h-32 flex items-center justify-center">
    <div className="w-6 h-6 border-2 border-[#912A55]/20 border-t-[#912A55] rounded-full animate-spin" />
  </div>
);

// Renders children only after hydration. Used for sections that load live data from
// Supabase (or depend on today's date), so they never mismatch the build-time HTML.
// Each gets its own Suspense boundary so loading it never blanks the rest of the page.
export default function ClientOnly({ children }: { children: ReactNode }) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;
  return <Suspense fallback={<Spinner />}>{children}</Suspense>;
}
