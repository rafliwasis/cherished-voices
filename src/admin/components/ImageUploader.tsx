import { useCallback, useRef, useState } from 'react';
import { Image as ImageIcon } from 'lucide-react';
import { uploadMedia } from '../../lib/cms';

export default function ImageUploader({
  bucket,
  currentUrl,
  onUploaded,
}: {
  bucket: string;
  currentUrl: string;
  onUploaded: (url: string) => void;
}) {
  const [dragging, setDragging] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  const uploadFile = useCallback(
    async (file: File) => {
      if (!file.type.startsWith('image/')) {
        setError('Please select an image file.');
        return;
      }
      setError('');
      setUploading(true);
      const ext = file.name.split('.').pop();
      const path = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;

      try {
        const url = await uploadMedia(bucket, path, file);
        onUploaded(url);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setUploading(false);
      }
    },
    [bucket, onUploaded],
  );

  return (
    <>
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => {
          const f = e.target.files?.[0];
          if (f) uploadFile(f);
        }}
      />
      <div
        onClick={() => inputRef.current?.click()}
        onDragOver={(e) => {
          e.preventDefault();
          setDragging(true);
        }}
        onDragLeave={() => setDragging(false)}
        onDrop={(e) => {
          e.preventDefault();
          setDragging(false);
          const f = e.dataTransfer.files[0];
          if (f) uploadFile(f);
        }}
        className={`absolute inset-0 z-10 flex flex-col items-center justify-center gap-2 transition-all duration-200 cursor-pointer ${
          dragging
            ? "bg-[#912A55]/50 opacity-100"
            : "bg-black/0 opacity-0 hover:bg-black/40 hover:opacity-100"
        }`}
      >
        {uploading ? (
          <div className="w-8 h-8 border-2 border-white/20 border-t-white rounded-full animate-spin" />
        ) : (
          <>
            <div className="w-8 h-8 rounded-full bg-white/90 flex items-center justify-center shadow-lg">
              <ImageIcon className="w-4 h-4 text-[#912A55]" />
            </div>
            <span className="font-sans text-[10px] text-white font-medium uppercase tracking-wider text-center px-2 drop-shadow-md">
              {dragging ? "Drop image" : "Change Image"}
            </span>
          </>
        )}
      </div>
      {error && (
        <div className="absolute bottom-2 left-2 right-2 bg-red-500/90 text-white text-[10px] px-2 py-1 rounded shadow-lg z-20">
          {error}
        </div>
      )}
    </>
  );
}
