import { StrictMode, lazy, Suspense } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './index.css';
import App from './App.tsx';

// Admin code (and its heavy deps like image/video compression) is only fetched on /admin routes.
const AdminApp = lazy(() => import('./admin/AdminApp.tsx'));
const AdminLogin = lazy(() => import('./admin/AdminLogin.tsx'));

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Suspense fallback={null}>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin/*" element={<AdminApp />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  </StrictMode>,
);
