
'use client';

import { useEffect, useRef } from 'react';
import Hls from 'hls.js';

type StreamingVideoProps = {
  src: string;
  poster?: string;
  autoplay?: boolean;
  muted?: boolean;
  loop?: boolean;
  maxLoops?: number;
  controls?: boolean;
  className?: string;
};

const StreamingVideo = ({
  src,
  poster,
  autoplay = false,
  muted = false,
  loop = false,
  maxLoops,
  controls = false,
  className,
}: StreamingVideoProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const loopCountRef = useRef(0);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    let hls: Hls | null = null;
    if (Hls.isSupported()) {
      hls = new Hls({
        enableWorker: true,
        lowLatencyMode: true,
        backBufferLength: 90,
      });
      hls.loadSource(src);
      hls.attachMedia(video);
      
      if (autoplay) {
        hls.on(Hls.Events.MANIFEST_PARSED, () => {
          video.play().catch(e => console.log("Autoplay prevented:", e));
        });
      }
    } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
      video.src = src;
    }

    return () => {
      hls?.destroy();
    };
  }, [src, autoplay]);

  const handleEnded = () => {
    const video = videoRef.current;
    if (!video) return;

    if (maxLoops && maxLoops > 0) {
      loopCountRef.current += 1;
      if (loopCountRef.current < maxLoops) {
        video.currentTime = 0;
        video.play().catch(e => console.log("Loop play prevented:", e));
      }
    }
  };

  return (
    <video
      ref={videoRef}
      poster={poster}
      autoPlay={autoplay}
      muted={muted}
      loop={maxLoops ? false : loop}
      onEnded={handleEnded}
      playsInline
      controls={controls}
      preload="metadata"
      className={className}
    />
  );
};

export default StreamingVideo;
