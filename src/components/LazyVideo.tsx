import { useEffect, useRef, useState, type VideoHTMLAttributes } from 'react';

type LazyVideoProps = Omit<VideoHTMLAttributes<HTMLVideoElement>, 'src'> & { src: string };

// Only sets `src` once the element is near the viewport, so off-screen videos
// are never downloaded (and never count towards Supabase egress).
export default function LazyVideo({ src, ...props }: LazyVideoProps) {
  const ref = useRef<HTMLVideoElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || visible) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: '200px' }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [visible]);

  return <video ref={ref} src={visible ? src : undefined} preload="none" {...props} />;
}
