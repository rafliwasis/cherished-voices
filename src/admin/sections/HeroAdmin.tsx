import { useCallback, useEffect, useRef, useState } from 'react';
import { heroVideoExists, getHeroVideoUrl, uploadHeroVideo } from '../../lib/cms';
import { Check, RefreshCw, Upload, Video as VideoIcon } from 'lucide-react';
import ConfirmModal from '../components/ConfirmModal';

function VideoUploader({ uploading, onSelect }: { uploading: boolean; onSelect: (file: File) => void }) {
  const [dragging, setDragging] = useState(false);
  const [error, setError] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  const pickFile = useCallback(
    (file?: File) => {
      if (!file) return;
      if (!file.type.startsWith('video/')) {
        setError('Please select a video file.');
        return;
      }
      setError('');
      onSelect(file);
    },
    [onSelect],
  );

  return (
    <div className="space-y-2">
      <div
        onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
        onDragLeave={() => setDragging(false)}
        onDrop={(e) => { e.preventDefault(); setDragging(false); pickFile(e.dataTransfer.files[0]); }}
        onClick={() => inputRef.current?.click()}
        className={`flex flex-col items-center gap-2 border-2 border-dashed rounded-xl p-5 cursor-pointer transition-all ${
          dragging ? 'border-[#912A55] bg-[#912A55]/5' : 'border-[#D9BDD0]/60 hover:border-[#912A55]/50 hover:bg-[#FCF9F8]'
        }`}
      >
        <input
          ref={inputRef}
          type="file"
          accept="video/*"
          className="hidden"
          onChange={(e) => { pickFile(e.target.files?.[0]); e.target.value = ''; }}
        />
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
      {error && <p className="font-sans text-xs text-red-500">{error}</p>}
    </div>
  );
}

export default function HeroAdmin() {
  const [loading, setLoading] = useState(true);
  const [hasVideo, setHasVideo] = useState(false);
  const [videoUrl, setVideoUrl] = useState('');
  const [uploading, setUploading] = useState(false);
  const [uploaded, setUploaded] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [pendingFile, setPendingFile] = useState<File | null>(null);

  const fetchCurrent = async () => {
    setLoading(true);
    const exists = await heroVideoExists();
    setHasVideo(exists);
    setVideoUrl(getHeroVideoUrl());
    setLoading(false);
  };

  useEffect(() => { fetchCurrent(); }, []);

  const handleSelect = (file: File) => {
    setPendingFile(file);
    setConfirmOpen(true);
  };

  const handleConfirmUpload = async () => {
    if (!pendingFile) return;
    setConfirmOpen(false);
    setUploading(true);
    try {
      await uploadHeroVideo(pendingFile);
      setHasVideo(true);
      setVideoUrl(getHeroVideoUrl());
      setUploaded(true);
      setTimeout(() => setUploaded(false), 2500);
    } catch (err: any) {
      console.error(err);
    } finally {
      setUploading(false);
      setPendingFile(null);
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-serif text-3xl font-light italic text-[#1C1B1B]">Hero Video</h2>
        </div>
        <button
          onClick={fetchCurrent}
          disabled={loading}
          className="p-2 text-[#5e5e5d] hover:text-[#912A55] transition-colors cursor-pointer"
          aria-label="Refresh"
        >
          <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Preview */}
        <div className="space-y-3 lg:sticky lg:top-8 self-start">
          <h3 className="font-sans text-xs font-semibold text-[#912A55] uppercase tracking-widest">Live Preview</h3>
          <div className="relative aspect-video bg-[#1C1B1B] rounded-xl overflow-hidden border border-[#D9BDD0]/30">
            {hasVideo ? (
              <video
                key={videoUrl}
                src={videoUrl}
                autoPlay
                muted
                loop
                playsInline
                controls
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex flex-col items-center justify-center gap-2 text-center px-6">
                <VideoIcon className="w-8 h-8 text-white/40" />
                <p className="font-sans text-sm text-white/60">No video uploaded yet</p>
              </div>
            )}
          </div>
        </div>

        {/* Upload */}
        <div className="bg-white border border-[#D9BDD0]/30 rounded-2xl p-6 shadow-sm space-y-4 self-start">
          <div className="flex items-center gap-2">
            <VideoIcon className="w-4 h-4 text-[#912A55]" />
            <h3 className="font-sans text-xs font-semibold text-[#912A55] uppercase tracking-widest">Hero Video</h3>
          </div>
          <p className="font-sans text-[10px] text-[#5e5e5d]/60 -mt-2">
            Pilih video baru — akan muncul konfirmasi sebelum mengganti yang sekarang.
          </p>
          <VideoUploader uploading={uploading} onSelect={handleSelect} />
          {uploaded && (
            <p className="flex items-center gap-1.5 font-sans text-xs text-emerald-600">
              <Check className="w-3.5 h-3.5" /> Video uploaded — live on the public site.
            </p>
          )}
        </div>
      </div>

      <ConfirmModal
        isOpen={confirmOpen}
        title="Replace video?"
        message={
          pendingFile
            ? `Are you sure you want to replace the current Hero video with "${pendingFile.name}"?`
            : 'Are you sure you want to replace the current video?'
        }
        confirmLabel="Yes, replace"
        cancelLabel="No"
        destructive={false}
        onConfirm={handleConfirmUpload}
        onCancel={() => {
          setConfirmOpen(false);
          setPendingFile(null);
        }}
      />
    </div>
  );
}
