import { useEffect, useRef, useState } from 'react';
import { Play } from 'lucide-react';
import { getVideoPosterUrl } from '../lib/videoPoster';

// Shows only the poster until the visitor taps play, so the video file is never
// downloaded (and never counts towards Supabase egress) unless someone actually watches it.
export default function EventVideo({ src }: { src: string }) {
  const ref = useRef<HTMLVideoElement>(null);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    if (started) ref.current?.play().catch(() => {});
  }, [started]);

  return (
    <div className="relative w-full h-full">
      <video
        ref={ref}
        src={started ? src : undefined}
        poster={getVideoPosterUrl(src)}
        preload="none"
        muted
        loop
        playsInline
        controls={started}
        className="w-full h-full object-cover"
      />
      {!started && (
        <button
          onClick={() => setStarted(true)}
          className="absolute inset-0 flex items-center justify-center bg-black/10 hover:bg-black/20 transition-colors cursor-pointer"
          aria-label="Play video"
        >
          <span className="p-4 rounded-full bg-black/50 text-white backdrop-blur-sm">
            <Play className="w-6 h-6" fill="currentColor" />
          </span>
        </button>
      )}
    </div>
  );
}
