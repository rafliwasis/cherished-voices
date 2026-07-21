import { useCallback, useEffect, useRef, useState } from 'react';
import { fetchOverrides, saveOverrides } from '../../lib/data-store';
import { HERO_BG_IMAGE } from '../../data';
import { Eye, Check, RefreshCw, Upload, Video, X, Image as ImageIcon } from 'lucide-react';


// ── Video uploader — uploads to Supabase Storage ──
function VideoUploader({ currentUrl, onUploaded }: { currentUrl: string; onUploaded: (url: string) => void }) {
  const [dragging, setDragging] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  const uploadFile = useCallback(async (file: File) => {
    if (!file.type.startsWith('video/')) { setError('Please select a video file.'); return; }
    setError('');
    setUploading(true);
    const ext = file.name.split('.').pop();
    const filename = `hero-videos/${Date.now()}.${ext}`;
    
    try {
      const response = await fetch('/api/upload', {
        method: 'POST',
        headers: {
          'x-filename': filename,
          'Content-Type': file.type,
        },
        body: file,
      });
      
      if (!response.ok) {
        const err = await response.json();
        throw new Error(err.error || 'Upload failed');
      }
      
      const data = await response.json();
      onUploaded(data.url);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setUploading(false);
    }
  }, [onUploaded]);

  return (
    <div className="space-y-2">
      <div
        onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
        onDragLeave={() => setDragging(false)}
        onDrop={(e) => { e.preventDefault(); setDragging(false); const f = e.dataTransfer.files[0]; if (f) uploadFile(f); }}
        onClick={() => inputRef.current?.click()}
        className={`flex flex-col items-center gap-2 border-2 border-dashed rounded-xl p-5 cursor-pointer transition-all ${
          dragging ? 'border-[#912A55] bg-[#912A55]/5' : 'border-[#D9BDD0]/60 hover:border-[#912A55]/50 hover:bg-[#FCF9F8]'
        }`}
      >
        <input ref={inputRef} type="file" accept="video/*" className="hidden" onChange={(e) => { const f = e.target.files?.[0]; if (f) uploadFile(f); }} />
        {uploading ? (
          <div className="flex items-center gap-2 py-1">
            <div className="w-5 h-5 border-2 border-[#912A55]/20 border-t-[#912A55] rounded-full animate-spin" />
            <span className="font-sans text-xs text-[#5e5e5d]">Uploading video…</span>
          </div>
        ) : (
          <>
            <div className="w-9 h-9 rounded-full bg-[#F4DCEA] flex items-center justify-center">
              <Upload className="w-4 h-4 text-[#912A55]" />
            </div>
            <p className="font-sans text-sm font-medium text-[#1C1B1B]">Upload New Video</p>
            <p className="font-sans text-[10px] text-[#5e5e5d]/60">MP4, MOV, WEBM — drag & drop or click</p>
          </>
        )}
      </div>
      {currentUrl && currentUrl !== '/hero-cherished.mp4' && (
        <div className="flex items-center gap-2 px-3 py-2 bg-[#F4DCEA]/40 rounded-lg border border-[#D9BDD0]/30">
          <Video className="w-3.5 h-3.5 text-[#912A55] flex-shrink-0" />
          <span className="font-mono text-[10px] text-[#5e5e5d] truncate">{currentUrl.split('/').pop()}</span>
          <button onClick={(e) => { e.stopPropagation(); onUploaded(''); }} className="ml-auto text-[#5e5e5d]/40 hover:text-red-500 transition-colors cursor-pointer flex-shrink-0">
            <X className="w-3 h-3" />
          </button>
        </div>
      )}
      {error && <p className="font-sans text-xs text-red-500">{error}</p>}
    </div>
  );
}

// ── Poster image uploader — click or drag on the preview ──
function PosterUploader({ currentUrl, onUploaded }: { currentUrl: string; onUploaded: (url: string) => void }) {
  const [dragging, setDragging] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  const uploadFile = useCallback(async (file: File) => {
    if (!file.type.startsWith('image/')) { setError('Please select an image file.'); return; }
    setError('');
    setUploading(true);
    const ext = file.name.split('.').pop();
    const filename = `hero-posters/${Date.now()}.${ext}`;
    
    try {
      const response = await fetch('/api/upload', {
        method: 'POST',
        headers: {
          'x-filename': filename,
          'Content-Type': file.type,
        },
        body: file,
      });
      
      if (!response.ok) {
        const err = await response.json();
        throw new Error(err.error || 'Upload failed');
      }
      
      const data = await response.json();
      onUploaded(data.url);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setUploading(false);
    }
  }, [onUploaded]);

  return (
    <div className="space-y-2">
      <div
        className="relative rounded-xl overflow-hidden border border-[#D9BDD0]/30 aspect-[16/9] group cursor-pointer"
        onClick={() => inputRef.current?.click()}
        onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
        onDragLeave={() => setDragging(false)}
        onDrop={(e) => { e.preventDefault(); setDragging(false); const f = e.dataTransfer.files[0]; if (f) uploadFile(f); }}
      >
        <input ref={inputRef} type="file" accept="image/*" className="hidden" onChange={(e) => { const f = e.target.files?.[0]; if (f) uploadFile(f); }} />
        {uploading ? (
          <div className="w-full h-full bg-[#FCF9F8] flex flex-col items-center justify-center gap-2">
            <div className="w-6 h-6 border-2 border-[#912A55]/20 border-t-[#912A55] rounded-full animate-spin" />
            <span className="font-sans text-xs text-[#5e5e5d]">Uploading…</span>
          </div>
        ) : (
          <>
            <img src={currentUrl || HERO_BG_IMAGE} alt="Poster" className="w-full h-full object-cover" />
            <div className={`absolute inset-0 flex flex-col items-center justify-center gap-2 transition-all duration-200 ${
              dragging ? 'bg-[#912A55]/50 opacity-100' : 'bg-black/0 opacity-0 group-hover:bg-black/40 group-hover:opacity-100'
            }`}>
              <div className="w-10 h-10 rounded-full bg-white/90 flex items-center justify-center">
                <ImageIcon className="w-5 h-5 text-[#912A55]" />
              </div>
              <span className="font-sans text-xs text-white font-medium uppercase tracking-wider">
                {dragging ? 'Drop to upload' : 'Click or drag to replace'}
              </span>
            </div>
          </>
        )}
      </div>
      {error && <p className="font-sans text-xs text-red-500">{error}</p>}
    </div>
  );
}

// ── Main HeroAdmin ──
export default function HeroAdmin() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const [posterUrl, setPosterUrl] = useState('');
  const [videoUrl, setVideoUrl] = useState('');
  const [caption, setCaption] = useState('Audio & Video Guestbook');

  const previewVideoSrc = videoUrl || '/hero-cherished.mp4';
  const previewPoster = posterUrl || HERO_BG_IMAGE;

  const fetchActive = async () => {
    setLoading(true);
    const overrides = await fetchOverrides();
    if (overrides.hero) {
      setPosterUrl(overrides.hero.imageUrl || '');
      setVideoUrl(overrides.hero.videoUrl || '');
      setCaption(overrides.hero.caption || 'Audio & Video Guestbook');
    }
    setLoading(false);
  };

  useEffect(() => { fetchActive(); }, []);

  const handleSave = async () => {
    setSaving(true);
    setError('');

    try {
      const overrides = await fetchOverrides();
      overrides.hero = {
        imageUrl: posterUrl || HERO_BG_IMAGE,
        videoUrl: videoUrl || null,
        caption: caption || null,
      };
      
      await saveOverrides(overrides);
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
      fetchActive();
    } catch (err: any) {
      setError(err.message);
    }
    setSaving(false);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-serif text-3xl font-light italic text-[#1C1B1B]">Hero Highlight</h2>
        </div>
        <button onClick={fetchActive} className="p-2 text-[#5e5e5d] hover:text-[#912A55] transition-colors cursor-pointer" aria-label="Refresh">
          <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* ── Left: Editor ── */}
        <div className="space-y-5">

          {/* 1. Background Video */}
          <div className="bg-white border border-[#D9BDD0]/30 rounded-2xl p-6 shadow-sm space-y-4">
            <div className="flex items-center gap-2">
              <Video className="w-4 h-4 text-[#912A55]" />
              <h3 className="font-sans text-xs font-semibold text-[#912A55] uppercase tracking-widest">Background Video</h3>
            </div>
            <div className="flex items-center gap-2 px-3 py-2.5 bg-[#FCF9F8] border border-[#D9BDD0]/40 rounded-lg">
              <span className="font-mono text-xs text-[#5e5e5d]">
                {videoUrl ? videoUrl.split('/').pop() : '/hero-cherished.mp4'}
              </span>
              {videoUrl && (
                <button onClick={() => setVideoUrl('')} title="Revert to default" className="ml-auto text-[#5e5e5d]/40 hover:text-red-500 transition-colors cursor-pointer flex-shrink-0">
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
            <VideoUploader currentUrl={videoUrl} onUploaded={setVideoUrl} />
          </div>

          {/* 2. Poster Image */}
          <div className="bg-white border border-[#D9BDD0]/30 rounded-2xl p-6 shadow-sm space-y-4">
            <div className="flex items-center gap-2">
              <ImageIcon className="w-4 h-4 text-[#912A55]" />
              <h3 className="font-sans text-xs font-semibold text-[#912A55] uppercase tracking-widest">Poster / Fallback Image</h3>
            </div>
            <p className="font-sans text-[10px] text-[#5e5e5d]/60 -mt-2">Click or drag directly on the image to replace it.</p>
            <PosterUploader currentUrl={posterUrl} onUploaded={setPosterUrl} />
          </div>

          {/* 3. Caption */}
          <div className="bg-white border border-[#D9BDD0]/30 rounded-2xl p-6 shadow-sm space-y-3">
            <h3 className="font-sans text-xs font-semibold text-[#912A55] uppercase tracking-widest">Caption</h3>
            <input
              id="hero-caption"
              type="text"
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
              placeholder="Audio & Video Guestbook"
              className="w-full px-4 py-3 border border-[#D9BDD0]/50 rounded-lg bg-[#FCF9F8] font-sans text-sm text-[#1C1B1B] placeholder:text-[#5e5e5d]/40 focus:outline-none focus:border-[#912A55] focus:ring-2 focus:ring-[#912A55]/10 transition-all"
            />
          </div>

          {error && <p className="font-sans text-xs text-red-500">{error}</p>}

          <button
            id="hero-save-btn"
            onClick={handleSave}
            disabled={saving}
            className="w-full px-6 py-4 bg-[#912A55] hover:bg-[#B05480] disabled:opacity-50 disabled:cursor-not-allowed text-white font-sans text-xs font-medium uppercase tracking-[0.15em] rounded-full transition-all duration-300 shadow-md active:scale-[0.98] cursor-pointer flex items-center justify-center gap-2"
          >
            {saving ? (
              <span className="animate-pulse">Saving…</span>
            ) : success ? (
              <><Check className="w-4 h-4" /> Saved!</>
            ) : (
              'Save Changes'
            )}
          </button>
        </div>

        {/* ── Right: Live Preview ── */}
        <div className="space-y-3 lg:sticky lg:top-8 self-start">
          <h3 className="font-sans text-xs font-semibold text-[#912A55] uppercase tracking-widest flex items-center gap-2">
            <Eye className="w-3.5 h-3.5" /> Live Preview
          </h3>
          <div className="relative rounded-2xl overflow-hidden border border-[#D9BDD0]/30 shadow-lg aspect-[16/9] bg-[#1C1B1B]">
            <video
              key={previewVideoSrc}
              autoPlay
              loop
              muted
              playsInline
              poster={previewPoster}
              className="w-full h-full object-cover opacity-80"
            >
              <source src={previewVideoSrc} type="video/mp4" />
            </video>
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
            <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center px-6 pointer-events-none">
              <span className="font-sans text-[11px] italic text-white/70 mb-2 tracking-wide">
                {caption || 'Audio & Video Guestbook'}
              </span>
              <h4 className="font-serif text-2xl font-light italic drop-shadow">
                Every Voice, Forever Cherished
              </h4>
            </div>
            <div className="absolute top-3 left-3 bg-black/50 backdrop-blur-sm rounded-full px-3 py-1">
              <span className="font-sans text-[10px] text-white/80 tracking-wider">
                ▶ {videoUrl ? videoUrl.split('/').pop() : 'hero-cherished.mp4'}
              </span>
            </div>
          </div>
          <p className="font-sans text-[10px] text-[#5e5e5d]/50">
            Preview updates in real time. Hit "Save Changes" to publish to the public site.
          </p>
        </div>
      </div>
    </div>
  );
}
