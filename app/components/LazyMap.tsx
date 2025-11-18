'use client';

interface LazyMapProps {
  src: string;
  width?: string | number;
  height?: string | number;
  className?: string;
  style?: React.CSSProperties;
}

export default function LazyMap({ src, width = "640", height = "480", className = "", style = {} }: LazyMapProps) {
  return (
    <div className={className} style={style}>
      <iframe
        src={src}
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
