import { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import App from './App.tsx';

// Admin code (and its heavy deps like image/video compression) is only fetched on /admin routes.
const AdminApp = lazy(() => import('./admin/AdminApp.tsx'));
const AdminLogin = lazy(() => import('./admin/AdminLogin.tsx'));

// Shared by the browser entry (main.tsx) and the build-time prerender (entry-server.tsx),
// so the prerendered HTML and the first client render have the same tree and hydrate cleanly.
export default function AppRoutes() {
  return (
    <Suspense fallback={null}>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/*" element={<AdminApp />} />
      </Routes>
    </Suspense>
  );
}
