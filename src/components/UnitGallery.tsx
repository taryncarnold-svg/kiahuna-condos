"use client";
import { useState, useEffect, useCallback, useRef } from "react";
import Image from "next/image";

interface Props {
  photos: string[];
  unitName: string;
}

export default function UnitGallery({ photos, unitName }: Props) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const touchStartX = useRef<number | null>(null);

  const open = (i: number) => setLightboxIndex(i);
  const close = () => setLightboxIndex(null);

  const prev = useCallback(() => {
    setLightboxIndex((i) => (i === null ? null : (i - 1 + photos.length) % photos.length));
  }, [photos.length]);

  const next = useCallback(() => {
    setLightboxIndex((i) => (i === null ? null : (i + 1) % photos.length));
  }, [photos.length]);

  useEffect(() => {
    if (lightboxIndex === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") prev();
      else if (e.key === "ArrowRight") next();
      else if (e.key === "Escape") close();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [lightboxIndex, prev, next]);

  useEffect(() => {
    document.body.style.overflow = lightboxIndex !== null ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [lightboxIndex]);

  return (
    <>
      {/* Gallery grid */}
      <div className="grid grid-cols-3 gap-2 mb-8 rounded-2xl overflow-hidden">
        {photos.map((src, i) => (
          <button
            key={i}
            onClick={() => open(i)}
            className={`relative bg-stone-100 cursor-pointer group focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 ${
              i === 0 ? "col-span-2 row-span-2 h-72" : "h-[138px]"
            }`}
          >
            <Image
              src={src}
              alt={`${unitName} photo ${i + 1}`}
              fill
              className="object-cover group-hover:brightness-90 transition-[filter] duration-200"
              unoptimized
              priority={i === 0}
            />
            {i === 0 && (
              <span className="absolute bottom-3 right-3 bg-black/55 text-white text-xs px-2.5 py-1 rounded-lg pointer-events-none">
                View all {photos.length} photos
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Lightbox */}
      {lightboxIndex !== null && (
        <div
          className="fixed inset-0 z-50 bg-black/92 flex items-center justify-center"
          onClick={close}
          onTouchStart={(e) => { touchStartX.current = e.touches[0].clientX; }}
          onTouchEnd={(e) => {
            if (touchStartX.current === null) return;
            const diff = touchStartX.current - e.changedTouches[0].clientX;
            if (Math.abs(diff) > 48) diff > 0 ? next() : prev();
            touchStartX.current = null;
          }}
        >
          {/* Close */}
          <button
            onClick={close}
            className="absolute top-4 right-4 text-white/70 hover:text-white text-4xl leading-none z-10 px-2"
            aria-label="Close lightbox"
          >
            ×
          </button>

          {/* Counter */}
          <p className="absolute top-5 left-1/2 -translate-x-1/2 text-white/60 text-sm select-none pointer-events-none">
            {lightboxIndex + 1} / {photos.length}
          </p>

          {/* Prev */}
          {photos.length > 1 && (
            <button
              onClick={(e) => { e.stopPropagation(); prev(); }}
              className="absolute left-2 sm:left-5 text-white/70 hover:text-white text-5xl leading-none z-10 p-3 select-none"
              aria-label="Previous photo"
            >
              ‹
            </button>
          )}

          {/* Image */}
          <div
            className="relative w-full max-w-4xl mx-16 sm:mx-20"
            style={{ height: "72vh" }}
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={photos[lightboxIndex]}
              alt={`${unitName} photo ${lightboxIndex + 1}`}
              fill
              className="object-contain"
              unoptimized
            />
          </div>

          {/* Next */}
          {photos.length > 1 && (
            <button
              onClick={(e) => { e.stopPropagation(); next(); }}
              className="absolute right-2 sm:right-5 text-white/70 hover:text-white text-5xl leading-none z-10 p-3 select-none"
              aria-label="Next photo"
            >
              ›
            </button>
          )}
        </div>
      )}
    </>
  );
}
