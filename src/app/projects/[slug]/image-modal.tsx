"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import Image from "next/image";

type Images = {
  id: string;
  image_url: string;
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
  const [cursor, setCursor] = useState<"grab" | "grabbing">("grab");


  const [index, setIndex] = useState(startIndex);
  const [showDesc, setShowDesc] = useState(false);

  const startX = useRef(0);
  const startTime = useRef(0);
  const currentTranslate = useRef(0);
  const prevTranslate = useRef(0);
  const isDragging = useRef(false);

  const slideWidth = useRef(0);
  const totalSlides = album.images.length;

  /* ---------------- INIT + RESPONSIVE WIDTH ---------------- */
  useEffect(() => {
    const setWidth = () => {
      slideWidth.current = Math.min(window.innerWidth * 0.9, 1200);
    };

    setWidth();
    window.addEventListener("resize", setWidth);

    gsap.fromTo(
      overlayRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 0.35, ease: "power2.out" }
    );

    return () => window.removeEventListener("resize", setWidth);
  }, []);

  /* ---------------- TOUCH (MOBILE) ---------------- */
  const touchStart = (e: React.TouchEvent) => {
    startX.current = e.touches[0].clientX;
    startTime.current = Date.now();
    isDragging.current = true;
  };

  const touchMove = (e: React.TouchEvent) => {
    if (!isDragging.current) return;

    const dx = e.touches[0].clientX - startX.current;
    handleDrag(dx);
  };

  const touchEnd = () => {
    handleRelease();
  };

  /* ---------------- MOUSE (DESKTOP) ---------------- */
  const mouseStart = (e: React.MouseEvent) => {
  e.preventDefault();
  startX.current = e.clientX;
  startTime.current = Date.now();
  isDragging.current = true;
  setCursor("grabbing");
};

  const mouseMove = (e: React.MouseEvent) => {
    if (!isDragging.current) return;

    const dx = e.clientX - startX.current;
    handleDrag(dx);
  };

const mouseEnd = () => {
  if (!isDragging.current) return;
  isDragging.current = false;
  setCursor("grab");
  handleRelease();
};


  /* ---------------- SHARED DRAG LOGIC ---------------- */
  const handleDrag = (dx: number) => {
    let move = prevTranslate.current + dx;

    // Edge resistance
    if (index === 0 && dx > 0) move = prevTranslate.current + dx / 3;
    if (index === totalSlides - 1 && dx < 0) move = prevTranslate.current + dx / 3;

    currentTranslate.current = move;

    if (sliderRef.current) {
      gsap.set(sliderRef.current, { x: move });
    }

    // Liquid pagination
    if (paginationRef.current && activeDotRef.current) {
      const dots = paginationRef.current.querySelectorAll<HTMLDivElement>(
        "div:not(.active-dot)"
      );
      if (!dots.length) return;

      const gap = parseFloat(
        getComputedStyle(paginationRef.current).columnGap || "12"
      );
      const dotWidth = dots[0].offsetWidth;

      const ratio =
        -currentTranslate.current / (slideWidth.current * (totalSlides - 1));
      const exactPos = ratio * (totalSlides - 1) * (dotWidth + gap);

      gsap.set(activeDotRef.current, {
        x: exactPos,
        scaleX: 1 + ((exactPos / (dotWidth + gap)) % 1) * 1.5,
      });
    }
  };

  const handleRelease = () => {
    if (!isDragging.current) return;
    isDragging.current = false;

    const dx = currentTranslate.current - prevTranslate.current;
    const dt = (Date.now() - startTime.current) / 1000;
    const velocity = dx / dt;

    const threshold = slideWidth.current / 4;
    let newIndex = index;

    if (velocity < -1000 && index < totalSlides - 1) newIndex++;
    else if (velocity > 1000 && index > 0) newIndex--;
    else {
      if (dx < -threshold && index < totalSlides - 1) newIndex++;
      if (dx > threshold && index > 0) newIndex--;
    }

    setIndex(newIndex);
  };

  /* ---------------- SNAP ANIMATION ---------------- */
  useEffect(() => {
    const offset = -index * slideWidth.current;
    prevTranslate.current = offset;

    if (sliderRef.current) {
      gsap.to(sliderRef.current, {
        x: offset,
        duration: 0.45,
        ease: "power3.out",
      });
    }

    if (paginationRef.current && activeDotRef.current) {
      const dots = paginationRef.current.querySelectorAll<HTMLDivElement>(
        "div:not(.active-dot)"
      );
      if (!dots.length) return;

      const gap = parseFloat(
        getComputedStyle(paginationRef.current).columnGap || "12"
      );
      const dotWidth = dots[0].offsetWidth;

      gsap.to(activeDotRef.current, {
        x: index * (dotWidth + gap),
        scaleX: 1,
        duration: 0.35,
        ease: "power3.out",
      });
    }
  }, [index, totalSlides]);

  /* ---------------- RENDER ---------------- */
  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-50 bg-black/90 flex flex-col items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        className="relative w-[90vw] max-w-[1200px] h-[80vh] bg-black rounded-lg overflow-hidden"
        onClick={(e) => e.stopPropagation()}
        onTouchStart={touchStart}
        onTouchMove={touchMove}
        onTouchEnd={touchEnd}
        onMouseDown={mouseStart}
        onMouseMove={mouseMove}
        onMouseUp={mouseEnd}
        onMouseLeave={mouseEnd}
        style={{ cursor }}
      >
        <div
          ref={sliderRef}
          className="flex h-full"
          style={{ width: `${totalSlides * 100}%` }}
        >
          {album.images.map((img) => (
            <div key={img.id} className="relative shrink-0 w-[90vw] h-full">
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

        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-white/60 z-10"
        >
          ✕
        </button>
      </div>

      {/* Pagination */}
      <div ref={paginationRef} className="relative flex gap-3 mt-4">
        {album.images.map((_, i) => (
          <div key={i} className="w-2 h-2 rounded-full bg-white/30" />
        ))}
        <div
          ref={activeDotRef}
          className="active-dot absolute top-0 left-0 w-2 h-2 rounded-full bg-white origin-center"
        />
      </div>

      {/* Description */}
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
