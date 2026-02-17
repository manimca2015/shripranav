
'use client';

import { useEffect, useRef } from 'react';
import Hls from 'hls.js';

type StreamingVideoProps = {
  src: string;
  poster?: string;
  autoplay?: boolean;
  muted?: boolean;
  loop?: boolean;
  controls?: boolean;
  className?: string;
};

const StreamingVideo = ({
  src,
  poster,
  autoplay = false,
  muted = false,
  loop = false,
  controls = false,
  className,
}: StreamingVideoProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);

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
    } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
      video.src = src;
    }

    return () => {
      hls?.destroy();
    };
  }, [src]);

  return (
    <video
      ref={videoRef}
      poster={poster}
      autoPlay={autoplay}
      muted={muted}
      loop={loop}
      playsInline
      controls={controls}
      preload="metadata"
      className={className}
    />
  );
};

export default StreamingVideo;
