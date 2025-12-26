"use client";
import { useEffect, useRef } from "react";
import { albums } from "../lib/data";
import Image from "next/image";

type Album = {
  id: string;
  title: string;
  images: { id: string; image_url: string }[];
};

// AlbumSlider Component
export default function AlbumSlider({
  albums,
  onSelect,
}: {
  albums: Album[];
  onSelect: (id: string) => void;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const track = trackRef.current;
    if (!container || !track) return;

    let ticking = false;

    const updateHorizontalScroll = () => {
      const rect = container.getBoundingClientRect();
      const scrollDistance = track.scrollWidth - window.innerWidth;
      
      const startScroll = -rect.top;
      const endScroll = container.offsetHeight - window.innerHeight;
      const progress = Math.max(0, Math.min(1, startScroll / endScroll));
      
      const translateX = -progress * scrollDistance;
      track.style.transform = `translate3d(${translateX}px, 0, 0)`;
      
      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(updateHorizontalScroll);
        ticking = true;
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    updateHorizontalScroll();

    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <div 
      ref={containerRef} 
      className="relative bg-black md:px-16"
      style={{ height: "300vh" }}
    >
      <div className="sticky top-0 h-screen overflow-hidden">
        {/* Dark faded edges */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-32 md:w-48 bg-gradient-to-r from-black via-black/50 to-transparent z-20"></div>
        <div className="pointer-events-none absolute inset-y-0 right-0 w-32 md:w-48 bg-gradient-to-l from-black via-black/50 to-transparent z-20"></div>
        
       <div className="absolute top-20 left-6 md:left-12 text-white z-20">
          <h2 className="text-[18px] font-bold mb-2 uppercase">Photo series</h2>
          <p className="text-sm  leading-relaxed">
           Series of Captured Moments
          </p>
         <p className="text-gray-400 text-sm">Scroll driven sequence</p>
        </div>
        <div className="h-full flex items-center">
          <div
            ref={trackRef}
            className="flex gap-6 pl-6 md:pl-12 pr-6 md:pr-12 will-change-transform"
          >
             {albums.slice(0, 14).map((album) => (
              <div
                key={album.id}
                onClick={() => onSelect(album.id)}
                className="relative shrink-0 w-[250px] sm:w-[250px] h-[300px] rounded-lg cursor-pointer group overflow-hidden transition-transform hover:scale-105 bg-[#1f1e1e] flex items-center justify-center"
              >
                {album.images[0] && (
                  <Image
                    src={album.images[0].image_url}
                    alt={album.title}
                    width={300}
                    height={300}
                    quality={100}
                    className="w-full h-full object-cover"
                  />
                )}
                <div className="absolute bottom-0 left-0 w-full bg-black/60 text-white text-sm p-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-b-lg">
                  {album.title}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}