"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import Image from "next/image";

type Videos = {
  id: string;
  video_url: string;
};

type Images = {
  id: string;
  image_url: string;
};

type Project = {
  id: string;
  title: string;
  description?: string;
  images: Images[];
  videos: Videos[];
};

type Album = {
  images: Images[];
  title?: string;
  description?: string;
};

export default function ImageModal({
  album,
  startIndex,
  onClose,
}: {
  album: Album;
  startIndex: number;
  onClose: () => void;
}) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const sliderRef = useRef<HTMLDivElement>(null);
  const paginationRef = useRef<HTMLDivElement>(null);
  const activeDotRef = useRef<HTMLDivElement>(null);

  const [index, setIndex] = useState(startIndex);
  const [showDesc, setShowDesc] = useState(false);

  const startX = useRef(0);
  const startTime = useRef(0);
  const currentTranslate = useRef(0);
  const prevTranslate = useRef(0);
  const isDragging = useRef(false);

  const slideWidth = useRef(0);
  const totalSlides = album.images.length;

  useEffect(() => {
    gsap.fromTo(
      overlayRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 0.35, ease: "power2.out" }
    );
    slideWidth.current = window.innerWidth * 0.9;
  }, []);

  const touchStart = (e: React.TouchEvent) => {
    startX.current = e.touches[0].clientX;
    startTime.current = Date.now();
    isDragging.current = true;
  };

  const touchMove = (e: React.TouchEvent) => {
    if (!isDragging.current) return;
    const dx = e.touches[0].clientX - startX.current;
    let move = prevTranslate.current + dx;

    // Edge resistance
    if (index === 0 && dx > 0) move = prevTranslate.current + dx / 3;
    if (index === totalSlides - 1 && dx < 0) move = prevTranslate.current + dx / 3;

    currentTranslate.current = move;

    if (sliderRef.current) gsap.set(sliderRef.current, { x: currentTranslate.current });

    // Liquid active dot
    if (paginationRef.current && activeDotRef.current) {
      const dots = paginationRef.current.querySelectorAll<HTMLDivElement>("div:not(.active-dot)");
      if (dots.length === 0) return;

      const firstDot = dots[0];
      const gap = parseFloat(getComputedStyle(paginationRef.current).columnGap || "12");
      const dotWidth = firstDot.offsetWidth;

      // Ratio between 0 and 1 for current swipe progress
      const ratio = -currentTranslate.current / (slideWidth.current * (totalSlides - 1));
      const exactPos = ratio * (totalSlides - 1) * (dotWidth + gap);

      gsap.set(activeDotRef.current, { x: exactPos });

      // Stretch effect
      const fractional = (exactPos / (dotWidth + gap)) % 1; // progress between two dots
      const scaleX = 1 + fractional * 1.5; // stretch up to 2.5x
      gsap.set(activeDotRef.current, { scaleX });
    }
  };

  const touchEnd = () => {
    isDragging.current = false;
    const dx = currentTranslate.current - prevTranslate.current;
    const dt = (Date.now() - startTime.current) / 1000; // seconds
    const velocity = dx / dt; // px/sec

    const threshold = slideWidth.current / 4;
    let newIndex = index;

    if (velocity < -1000 && index < totalSlides - 1) {
      newIndex = Math.min(totalSlides - 1, index + Math.ceil(Math.abs(velocity) / 1000));
    } else if (velocity > 1000 && index > 0) {
      newIndex = Math.max(0, index - Math.ceil(Math.abs(velocity) / 1000));
    } else {
      if (dx < -threshold && index < totalSlides - 1) newIndex = index + 1;
      else if (dx > threshold && index > 0) newIndex = index - 1;
    }

    setIndex(newIndex);
  };

  useEffect(() => {
    const offset = -index * slideWidth.current;
    prevTranslate.current = offset;

    // Animate slider
    if (sliderRef.current) {
      gsap.to(sliderRef.current, {
        x: offset,
        duration: 0.45,
        ease: "power3.out",
      });
    }

    // Animate active dot snap
    if (paginationRef.current && activeDotRef.current) {
      const dots = paginationRef.current.querySelectorAll<HTMLDivElement>("div:not(.active-dot)");
      if (dots.length === 0) return;

      const firstDot = dots[0];
      const gap = parseFloat(getComputedStyle(paginationRef.current).columnGap || "12");
      const dotWidth = firstDot.offsetWidth;
      const distance = index * (dotWidth + gap);

      gsap.to(activeDotRef.current, {
        x: distance,
        scaleX: 1, // shrink back after stretch
        duration: 0.35,
        ease: "power3.out",
      });
    }
  }, [index, totalSlides]);

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-50 bg-black/90 flex flex-col items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        className="relative w-[90vw] h-[80vh] bg-black rounded-lg overflow-hidden"
        onClick={(e) => e.stopPropagation()}
        onTouchStart={touchStart}
        onTouchMove={touchMove}
        onTouchEnd={touchEnd}
      >
        <div
          ref={sliderRef}
          className="flex h-full w-full"
          style={{ width: `${totalSlides * 100}%` }}
        >
          {album.images.map((img) => (
            <div key={img.id} className="relative flex-shrink-0 w-[90vw] h-full">
              <Image
                src={img.image_url}
                alt={album.title || "Project image"}
                fill
                priority
                className="object-contain"
              />
            </div>
          ))}
        </div>

        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-white/60 z-10"
        >
          ✕
        </button>
      </div>

      {/* Pagination Dots */}
      <div
        className="relative flex gap-3  w-max"
        ref={paginationRef}
        style={{ height: 6 }}
      >
        {album.images.map((_, i) => (
          <div key={i} className="w-2 h-2 rounded-full bg-white/30" />
        ))}
        {/* Active indicator */}
        <div
          ref={activeDotRef}
          className="active-dot absolute top-0 left-0 w-2 h-2 rounded-full bg-white origin-center"
        />
      </div>

      {/* Description Toggle */}
      {album.description && (
        <>
          <button
            onClick={(e) => {
              e.stopPropagation();
              setShowDesc((p) => !p);
            }}
            className="mt-4 text-white/70 text-sm"
          >
            {showDesc ? "Hide description" : "Show description"}
          </button>

          {showDesc && (
            <p className="mt-2 text-white/80 max-w-xl text-center text-sm">
              {album.description}
            </p>
          )}
        </>
      )}
    </div>
  );
}
