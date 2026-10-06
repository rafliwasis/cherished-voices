// Event videos get a poster image stored next to them: `<name>.mp4` -> `<name>-poster.jpg`.
// Keeping it a naming convention means media_urls (a plain text[]) doesn't need to change.
export function getVideoPosterUrl(videoUrl: string): string {
  return videoUrl.replace(/\.[^./]+$/, '-poster.jpg');
}

const POSTER_MAX_WIDTH = 960;

// Grabs a frame from a local video file and returns it as a small JPEG.
export function extractVideoPoster(file: File): Promise<Blob> {
  return new Promise((resolve, reject) => {
    const url = URL.createObjectURL(file);
    const video = document.createElement('video');
    video.muted = true;
    video.playsInline = true;
    video.preload = 'auto';

    const cleanup = () => URL.revokeObjectURL(url);
    const fail = (message: string) => {
      cleanup();
      reject(new Error(message));
    };

    video.onerror = () => fail('Could not read video to create poster');
    video.onloadedmetadata = () => {
      // Skip the very first frame, which is often black.
      video.currentTime = Math.min(0.5, (video.duration || 1) / 2);
    };
    video.onseeked = () => {
      const scale = Math.min(1, POSTER_MAX_WIDTH / video.videoWidth);
      const canvas = document.createElement('canvas');
      canvas.width = Math.round(video.videoWidth * scale);
      canvas.height = Math.round(video.videoHeight * scale);
      canvas.getContext('2d')?.drawImage(video, 0, 0, canvas.width, canvas.height);
      canvas.toBlob(
        (blob) => {
          cleanup();
          if (blob) resolve(blob);
          else reject(new Error('Could not encode poster'));
        },
        'image/jpeg',
        0.8
      );
    };

    video.src = url;
  });
}
