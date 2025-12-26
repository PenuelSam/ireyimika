"use client";

import { useEffect, useRef } from "react";

import { FaPlay } from "react-icons/fa6";
import { IoPlayCircleOutline } from "react-icons/io5";

type Video = {
  id: string;
  title: string;
  video_url: string;
};


// VideoSlider Component
export default function VideoSlider({
  videos,
  onSelect,
}: {
  videos: {
    id: string;
    title: string;
    video_url: string;
  }[];
  onSelect: (video: Video) => void;
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
      
      // Calculate progress based on container position
      const startScroll = -rect.top;
      const endScroll = container.offsetHeight - window.innerHeight;
      const progress = Math.max(0, Math.min(1, startScroll / endScroll));
      
      // Apply horizontal translation
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
        
        <div className="absolute top-24 left-6 md:left-12 text-white z-20">
          <h2 className="text-[18px] font-bold mb-2 uppercase">Stories in Motion</h2>
          <p className="text-sm w-[80%] md:w-full leading-relaxed">
    A selection of visual narratives crafted for brands, spaces, and culture.
  </p>
          <p className="text-gray-400 text-sm">Scroll driven sequence</p>
        </div>
        <div className="h-full flex items-center">
          <div
            ref={trackRef}
            className="flex gap-6 pl-6 md:pl-12 pr-6 md:pr-12 will-change-transform"
          >
            {videos.map((video) => (
  <div
    key={video.id}
    onClick={() => onSelect(video)}
    className="relative shrink-0 md:w-[300px] md:h-[200px] w-[250px] h-[150px] bg-[#1f1e1e] rounded-lg flex items-center justify-center cursor-pointer group transition-transform hover:scale-105 overflow-hidden"
  >
    {/* Video cover */}
    <video
      src={video.video_url}
      className="absolute inset-0 w-full h-full object-cover"
      muted
      playsInline
      preload="metadata"
    />
    
    {/* Play icon */}
    <IoPlayCircleOutline fontSize={40} color="#ededed" className="z-10" />
    
    {/* Title overlay */}
    <div className="absolute bottom-0 left-0 w-full bg-black/60 text-white text-sm p-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-b-lg z-10">
      {video.title}
    </div>
  </div>
))}

          </div>
        </div>
      </div>
    </div>
  );
}