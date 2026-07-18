import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Eye, EyeOff, LogIn } from 'lucide-react';
import { supabase } from '../lib/supabase';

export default function AdminLogin() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const { error: authError } = await supabase.auth.signInWithPassword({
      email: username,
      password,
    });

    if (authError) {
      setError('Invalid email or password.');
    } else {
      navigate('/admin');
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-[#FCF9F8] flex items-center justify-center px-4">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 rounded-full bg-[#912A55]/5 blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 rounded-full bg-[#D9BDD0]/20 blur-3xl" />
      </div>

      <div className="relative w-full max-w-md">
        {/* Logo & Heading */}
        <div className="text-center mb-10">
          <span className="font-sans text-xs font-semibold text-[#912A55] uppercase tracking-[0.25em] block mb-3">
            Admin Portal
          </span>
          <h1 className="font-serif text-4xl font-light italic text-[#1C1B1B]">
            Cherished Voices
          </h1>
          <div className="w-10 h-[1px] bg-[#912A55] mx-auto mt-5" />
        </div>

        {/* Card */}
        <div className="bg-white border border-[#D9BDD0]/30 rounded-2xl shadow-xl shadow-[#912A55]/5 p-8 md:p-10">
          <h2 className="font-sans text-sm font-semibold text-[#1C1B1B] uppercase tracking-widest mb-8">
            Sign In
          </h2>

          <form onSubmit={handleLogin} className="space-y-5">
            {/* Username */}
            <div className="space-y-1.5">
              <label htmlFor="admin-username" className="font-sans text-xs font-medium text-[#5e5e5d] uppercase tracking-widest">
                Email
              </label>
              <input
                id="admin-username"
                type="email"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter email"
                className="w-full px-4 py-3 border border-[#D9BDD0]/50 rounded-lg bg-[#FCF9F8] font-sans text-sm text-[#1C1B1B] placeholder:text-[#5e5e5d]/40 focus:outline-none focus:border-[#912A55] focus:ring-2 focus:ring-[#912A55]/10 transition-all"
              />
            </div>

            {/* Password */}
            <div className="space-y-1.5">
              <label htmlFor="admin-password" className="font-sans text-xs font-medium text-[#5e5e5d] uppercase tracking-widest">
                Password
              </label>
              <div className="relative">
                <input
                  id="admin-password"
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full px-4 py-3 pr-12 border border-[#D9BDD0]/50 rounded-lg bg-[#FCF9F8] font-sans text-sm text-[#1C1B1B] placeholder:text-[#5e5e5d]/40 focus:outline-none focus:border-[#912A55] focus:ring-2 focus:ring-[#912A55]/10 transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#5e5e5d]/50 hover:text-[#912A55] transition-colors cursor-pointer"
                  aria-label="Toggle password visibility"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Error */}
            {error && (
              <div className="flex items-start gap-2 bg-red-50 border border-red-200 rounded-lg px-4 py-3">
                <span className="font-sans text-xs text-red-600">{error}</span>
              </div>
            )}

            {/* Submit */}
            <button
              id="admin-login-btn"
              type="submit"
              disabled={loading}
              className="w-full mt-2 px-6 py-4 bg-[#912A55] hover:bg-[#B05480] disabled:opacity-60 disabled:cursor-not-allowed text-white font-sans text-xs font-medium uppercase tracking-[0.15em] rounded-full transition-all duration-300 shadow-md hover:shadow-lg active:scale-[0.98] cursor-pointer flex items-center justify-center gap-2"
            >
              {loading ? (
                <span className="animate-pulse">Signing in…</span>
              ) : (
                <>
                  <LogIn className="w-4 h-4" />
                  Sign In
                </>
              )}
            </button>
          </form>
        </div>

        <p className="text-center mt-6 font-sans text-xs text-[#5e5e5d]/50">
          &larr;{' '}
          <a href="/" className="hover:text-[#912A55] transition-colors">
            Back to public site
          </a>
        </p>
      </div>
    </div>
  );
}
