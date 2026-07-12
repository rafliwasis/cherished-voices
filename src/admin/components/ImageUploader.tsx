import { useCallback, useRef, useState } from 'react';
import { Upload, X, Image as ImageIcon } from 'lucide-react';
import { supabase } from '../../lib/supabase';

interface ImageUploaderProps {
  bucket: string;
  onUploaded: (publicUrl: string) => void;
  currentUrl?: string;
  label?: string;
}

export default function ImageUploader({ bucket, onUploaded, currentUrl, label = 'Upload Image' }: ImageUploaderProps) {
  const [dragging, setDragging] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [preview, setPreview] = useState<string>(currentUrl || '');
  const [error, setError] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  const uploadFile = useCallback(async (file: File) => {
    if (!file.type.startsWith('image/')) {
      setError('Please upload an image file.');
      return;
    }
    setError('');
    setUploading(true);

    const ext = file.name.split('.').pop();
    const path = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;

    const { error: uploadError } = await supabase.storage
      .from(bucket)
      .upload(path, file, { upsert: false });

    if (uploadError) {
      setError(uploadError.message);
      setUploading(false);
      return;
    }

    const { data } = supabase.storage.from(bucket).getPublicUrl(path);
    const publicUrl = data.publicUrl;
    setPreview(publicUrl);
    onUploaded(publicUrl);
    setUploading(false);
  }, [bucket, onUploaded]);

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) uploadFile(file);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) uploadFile(file);
  };

  return (
    <div className="space-y-3">
      {/* Dropzone */}
      <div
        onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
        onDragLeave={() => setDragging(false)}
        onDrop={handleDrop}
        onClick={() => inputRef.current?.click()}
        className={`relative flex flex-col items-center justify-center gap-3 border-2 border-dashed rounded-xl p-6 cursor-pointer transition-all duration-200 ${
          dragging
            ? 'border-[#912A55] bg-[#912A55]/5 scale-[1.01]'
            : 'border-[#D9BDD0]/60 hover:border-[#912A55]/50 hover:bg-[#FCF9F8]'
        }`}
      >
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleChange}
          id={`uploader-${bucket}`}
        />

        {uploading ? (
          <div className="flex flex-col items-center gap-2 py-2">
            <div className="w-8 h-8 border-2 border-[#912A55]/30 border-t-[#912A55] rounded-full animate-spin" />
            <span className="font-sans text-xs text-[#5e5e5d]">Uploading…</span>
          </div>
        ) : (
          <>
            <div className="w-10 h-10 rounded-full bg-[#F4DCEA] flex items-center justify-center">
              <Upload className="w-5 h-5 text-[#912A55]" />
            </div>
            <div className="text-center">
              <p className="font-sans text-sm font-medium text-[#1C1B1B]">{label}</p>
              <p className="font-sans text-xs text-[#5e5e5d]/70 mt-1">Drag & drop or click to browse</p>
              <p className="font-sans text-[10px] text-[#5e5e5d]/50 mt-0.5">JPG, PNG, WEBP — max 5MB</p>
            </div>
          </>
        )}
      </div>

      {/* Preview */}
      {preview && !uploading && (
        <div className="relative rounded-xl overflow-hidden border border-[#D9BDD0]/30 bg-[#F4DCEA]/20 group">
          <img src={preview} alt="Preview" className="w-full h-48 object-cover" />
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-200" />
          <button
            type="button"
            onClick={(e) => { e.stopPropagation(); setPreview(''); onUploaded(''); }}
            className="absolute top-2 right-2 bg-white/90 hover:bg-white text-[#912A55] p-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-all shadow-md cursor-pointer"
            aria-label="Remove image"
          >
            <X className="w-3.5 h-3.5" />
          </button>
          <div className="absolute bottom-2 left-2 bg-white/80 backdrop-blur-sm rounded-full px-2 py-0.5 flex items-center gap-1">
            <ImageIcon className="w-3 h-3 text-[#912A55]" />
            <span className="font-sans text-[10px] text-[#5e5e5d]">Current image</span>
          </div>
        </div>
      )}

      {error && (
        <p className="font-sans text-xs text-red-500 flex items-center gap-1">
          <X className="w-3 h-3" /> {error}
        </p>
      )}
    </div>
  );
}
