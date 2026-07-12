import { useEffect, useState } from 'react';
import { useNavigate, Routes, Route, NavLink } from 'react-router-dom';
import HeroAdmin from './sections/HeroAdmin';
import MomentsAdmin from './sections/MomentsAdmin';
import { supabase } from '../lib/supabase';
import { Image, LayoutTemplate, LogOut, ExternalLink, Menu, X } from 'lucide-react';

const NAV_ITEMS = [
  { to: '/admin', label: 'Hero', icon: LayoutTemplate, end: true },
  { to: '/admin/moments', label: 'Moments', icon: Image, end: false },
];

  export default function AdminApp() {
    const navigate = useNavigate();
    const [authLoading, setAuthLoading] = useState(true);
    const [sidebarOpen, setSidebarOpen] = useState(false);
  
    useEffect(() => {
      supabase.auth.getSession().then(({ data: { session } }) => {
        if (!session) {
          navigate('/admin/login');
        }
        setAuthLoading(false);
      });

      const { data: subscription } = supabase.auth.onAuthStateChange((_event, session) => {
        if (!session) {
          navigate('/admin/login');
        }
      });

      return () => subscription.subscription.unsubscribe();
    }, [navigate]);

    const handleLogout = async () => {
      await supabase.auth.signOut();
      navigate('/admin/login');
    };

  if (authLoading) {
    return (
      <div className="min-h-screen bg-[#FCF9F8] flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-8 h-8 border-2 border-[#912A55]/20 border-t-[#912A55] rounded-full animate-spin" />
          <p className="font-sans text-sm text-[#5e5e5d]">Authenticating…</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FCF9F8] flex">
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/30 z-20 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed lg:sticky top-0 left-0 h-screen w-64 bg-white border-r border-[#D9BDD0]/30 flex flex-col z-30 transition-transform duration-300 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        {/* Logo */}
        <div className="p-6 border-b border-[#D9BDD0]/20">
          <span className="font-sans text-[10px] font-semibold text-[#912A55] uppercase tracking-[0.25em] block mb-1">
            Admin Portal
          </span>
          <h1 className="font-serif text-xl font-light italic text-[#1C1B1B] leading-tight">
            Cherished Voices
          </h1>
        </div>

        {/* Nav */}
        <nav className="flex-1 p-4 space-y-1">
          {NAV_ITEMS.map(({ to, label, icon: Icon, end }) => (
            <NavLink
              key={to}
              to={to}
              end={end}
              onClick={() => setSidebarOpen(false)}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-xl font-sans text-sm font-medium transition-all duration-200 ${
                  isActive
                    ? 'bg-[#F4DCEA] text-[#912A55]'
                    : 'text-[#5e5e5d] hover:bg-[#FCF9F8] hover:text-[#912A55]'
                }`
              }
            >
              <Icon className="w-4 h-4 flex-shrink-0" />
              {label}
            </NavLink>
          ))}
        </nav>

        {/* Footer */}
        <div className="p-4 border-t border-[#D9BDD0]/20 space-y-2">
          <a
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-[#5e5e5d] hover:text-[#912A55] hover:bg-[#FCF9F8] font-sans text-xs font-medium transition-all"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            View Public Site
          </a>

          <div className="px-4 py-2">
            <p className="font-sans text-[10px] text-[#5e5e5d]/50 truncate">Logged in as admin</p>
          </div>

          <button
            id="admin-logout-btn"
            onClick={handleLogout}
            className="w-full flex items-center gap-2 px-4 py-2.5 rounded-xl text-[#5e5e5d] hover:text-red-500 hover:bg-red-50 font-sans text-xs font-medium transition-all cursor-pointer"
          >
            <LogOut className="w-3.5 h-3.5" />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top bar (mobile) */}
        <header className="lg:hidden sticky top-0 z-10 bg-white border-b border-[#D9BDD0]/20 px-4 py-3 flex items-center justify-between">
          <button
            onClick={() => setSidebarOpen(true)}
            className="p-2 text-[#5e5e5d] hover:text-[#912A55] transition-colors cursor-pointer"
            aria-label="Open menu"
          >
            <Menu className="w-5 h-5" />
          </button>
          <h1 className="font-serif text-lg font-light italic text-[#1C1B1B]">Cherished Voices</h1>
          <button
            onClick={() => setSidebarOpen(false)}
            className="p-2 text-transparent"
            aria-hidden
          >
            <X className="w-5 h-5" />
          </button>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-6 md:p-10 max-w-6xl mx-auto w-full">
          <Routes>
            <Route path="/" element={<HeroAdmin />} />
            <Route path="/moments" element={<MomentsAdmin />} />
          </Routes>
        </main>
      </div>
    </div>
  );
}
