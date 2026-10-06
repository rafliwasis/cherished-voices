import { FFmpeg } from '@ffmpeg/ffmpeg';
import { fetchFile, toBlobURL } from '@ffmpeg/util';

export async function compressVideoFile(
  videoFile: File,
  ffmpegRef: React.MutableRefObject<FFmpeg>,
  onProgress: (progress: number) => void
): Promise<File> {
  const ffmpeg = ffmpegRef.current;
  
  ffmpeg.on('progress', ({ progress }) => {
    onProgress(Math.round(progress * 100));
  });

  if (!ffmpeg.loaded) {
    const baseURL = 'https://unpkg.com/@ffmpeg/core@0.12.6/dist/esm';
    await ffmpeg.load({
      coreURL: await toBlobURL(`${baseURL}/ffmpeg-core.js`, 'text/javascript'),
      wasmURL: await toBlobURL(`${baseURL}/ffmpeg-core.wasm`, 'application/wasm'),
    });
  }

  const inputName = 'input.mp4';
  const outputName = 'output.mp4';
  
  await ffmpeg.writeFile(inputName, await fetchFile(videoFile));
  
  await ffmpeg.exec([
    '-i', inputName,
    // Cap width at 1280px (never upscale); these videos are muted background loops.
    '-vf', 'scale=min(1280\\,iw):-2',
    '-c:v', 'libx264',
    '-preset', 'veryfast',
    '-crf', '30',
    '-pix_fmt', 'yuv420p',
    '-an',
    '-movflags', '+faststart',
    outputName
  ]);

  const data = await ffmpeg.readFile(outputName);
  return new File([data as BlobPart], 'optimized-video.mp4', { type: 'video/mp4' });
}
