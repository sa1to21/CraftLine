'use client';

import { useEffect, useRef, useState } from 'react';

interface LazyMapProps {
  src: string;
  width?: string | number;
  height?: string | number;
  className?: string;
  style?: React.CSSProperties;
}

export default function LazyMap({ src, width = "640", height = "480", className = "", style = {} }: LazyMapProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const iframeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsLoaded(true);
          }
        });
      },
      {
        rootMargin: '2000px', // Start loading 2000px before the map is visible
      }
    );

    const currentRef = iframeRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, []);

  return (
    <div ref={iframeRef} className={className} style={style}>
      <iframe
        src={isLoaded ? src : 'about:blank'}
        width={width}
        height={height}
        className="w-full h-full"
        style={{ border: 0, ...style }}
        loading="lazy"
        title="Service Area Map"
      />
    </div>
  );
}
