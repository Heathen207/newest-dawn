/**
 * DawnlandImage Component
 * Production-ready image renderer with:
 * - Direct image record / ID lookup from CMS
 * - Focal point positioning ('center', 'top', 'bottom', 'left', 'right')
 * - Layout shift prevention with aspect ratios and fill mode
 * - Graceful fallback on broken image URLs
 * - Loading placeholder
 * - Full accessibility and alt tagging
 */
import React, { useState, useEffect, useRef } from 'react';
import { ImageRecord, FocalPoint } from '../types';
import { AlertCircle, Image as ImageIcon } from 'lucide-react';

interface DawnlandImageProps {
  image?: ImageRecord | null;
  src?: string;
  alt?: string;
  className?: string;
  fill?: boolean;
  priority?: boolean;
  aspectRatio?: '16/9' | '4/3' | '1/1' | '3/2' | '21/9' | 'auto';
  focalPoint?: FocalPoint;
  objectFit?: 'cover' | 'contain';
  onClick?: () => void;
  id?: string;
}

const focalPointClassMap: Record<FocalPoint, string> = {
  center: 'object-center',
  top: 'object-top',
  bottom: 'object-bottom',
  left: 'object-left',
  right: 'object-right',
};

export const DawnlandImage: React.FC<DawnlandImageProps> = ({
  image,
  src,
  alt,
  className = '',
  fill = false,
  priority = false,
  aspectRatio = 'auto',
  focalPoint,
  objectFit = 'cover',
  onClick,
  id,
}) => {
  let effectiveSrc = src || image?.blobUrl || '';
  if (effectiveSrc.startsWith('data:image/svg+xml;utf8,')) {
    effectiveSrc = effectiveSrc.replace('data:image/svg+xml;utf8,', 'data:image/svg+xml;charset=utf-8,');
  }

  const isDataUri = effectiveSrc.startsWith('data:');
  const [hasError, setHasError] = useState(false);
  const [isLoaded, setIsLoaded] = useState(() => isDataUri);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    setHasError(false);
    if (isDataUri) {
      setIsLoaded(true);
    } else {
      setIsLoaded(false);
    }
    if (imgRef.current && imgRef.current.complete && imgRef.current.naturalWidth > 0) {
      setIsLoaded(true);
    }
  }, [effectiveSrc, isDataUri]);

  const effectiveAlt = alt || image?.alt || image?.title || 'Dawnland architectural asset';
  const effectiveFocal = focalPoint || image?.focalPoint || 'center';
  const focalClass = focalPointClassMap[effectiveFocal] || 'object-center';

  // Calculate container aspect ratio style if not fill
  const aspectStyle: React.CSSProperties =
    aspectRatio !== 'auto'
      ? { aspectRatio: aspectRatio.replace('/', ' / ') }
      : !fill && image?.width && image?.height
      ? { aspectRatio: `${image.width} / ${image.height}` }
      : {};

  if (!effectiveSrc || hasError) {
    return (
      <div
        id={id}
        style={aspectStyle}
        className={`relative flex flex-col items-center justify-center bg-[#141820] border border-[#232a36] text-[#8e95a0] p-6 text-center select-none ${
          fill ? 'w-full h-full min-h-[180px]' : 'w-full min-h-[200px]'
        } ${className}`}
      >
        <div className="w-10 h-10 rounded-full bg-[#1b212c] flex items-center justify-center mb-2.5 text-[#c48255]">
          {hasError ? <AlertCircle className="w-5 h-5 text-amber-500/80" /> : <ImageIcon className="w-5 h-5" />}
        </div>
        <span className="text-xs uppercase tracking-widest font-sans font-semibold text-[#a3abb8]">
          {image?.filename || 'Image Not Found'}
        </span>
        <span className="text-[11px] text-[#6d7582] mt-1 max-w-[200px] truncate">
          {image?.role || 'ARCHITECTURAL ASSET'} • {image?.width || '1600'}x{image?.height || '1000'}
        </span>
      </div>
    );
  }

  return (
    <div
      id={id ? `${id}-container` : undefined}
      style={aspectStyle}
      className={`relative overflow-hidden ${fill ? 'w-full h-full' : 'w-full'} ${className}`}
      onClick={onClick}
    >
      {/* Subtle skeleton shimmer while loading */}
      {!isLoaded && (
        <div className="absolute inset-0 bg-[#161a22] animate-pulse pointer-events-none z-0" />
      )}

      <img
        ref={imgRef}
        id={id}
        src={effectiveSrc}
        alt={effectiveAlt}
        loading={priority ? 'eager' : 'lazy'}
        decoding={priority ? 'sync' : 'async'}
        onLoad={() => setIsLoaded(true)}
        onError={() => setHasError(true)}
        className={`w-full h-full transition-opacity duration-500 ease-out ${
          objectFit === 'contain' ? 'object-contain' : 'object-cover'
        } ${focalClass} ${isLoaded ? 'opacity-100' : 'opacity-0'} ${
          fill ? 'absolute inset-0' : 'block'
        }`}
      />
    </div>
  );
};
