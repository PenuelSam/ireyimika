"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { MdArrowBackIosNew } from "react-icons/md";
import ImageModal from "./image-modal";
import VideoModal from "./video-modal";

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


export default function ProjectMedia({ project }: {project: Project}) {
  const [activeAlbum, setActiveAlbum] = useState<Album | null>(null);
  const [imageIndex, setImageIndex] = useState(0);
  const [activeVideo, setActiveVideo] = useState<Videos | null>(null);
  const [expandedDesc, setExpandedDesc] = useState(false);
  const [loadingImages, setLoadingImages] = useState(true);
  const [loadingVideos, setLoadingVideos] = useState(true);

  const router = useRouter();
  const descRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    gsap.fromTo(
      ".fade-in",
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.5, stagger: 0.05 }
    );
  }, []);

  // Filter valid media
  const validImages = (project.images || []).filter((img: { image_url: string }) => img?.image_url);
  const hasVideos = project.videos?.length > 0;
  const hasImages = validImages.length > 0;
  const hasMedia = hasVideos || hasImages;

  const toggleDescription = () => {
    if (!descRef.current) return;

    const targetHeight = expandedDesc ? "3rem" : descRef.current.scrollHeight;
    gsap.to(descRef.current, { height: targetHeight, duration: 0.4, ease: "power2.out" });
    setExpandedDesc(!expandedDesc);
  };

  return (
    <main className="min-h-screen bg-black px-6 pt-24 pb-32">
      {/* Back Button */}
      <div className="fixed top-0 border-b cursor-pointer border-white/20 w-full left-0 bg-black/80 z-50">
        <button
          onClick={() => router.push("/projects")}
          className="text-gray-400 my-4 ml-5 flex items-center gap-2 font-bold"
        >
          <MdArrowBackIosNew /> Back to Projects
        </button>
      </div>

      {/* Title */}
      <h1 className="text-white text-2xl mb-4 fade-in font-bold">{project.title}</h1>

      {/* Description */}
      {project.description && (
        <div className="mb-6 max-w-xl">
          <p
            ref={descRef}
            className="text-gray-400 fade-in overflow-hidden text-md md:text-lg"
            style={{ height: "3rem" }}
          >
            {project.description}
          </p>
          <button onClick={toggleDescription} className="mt-1 text-sm text-gray-200">
            {expandedDesc ? "See Less" : "See More"}
          </button>
        </div>
      )}

      {/* VIDEOS */}
      {hasVideos && (
        <section className={`space-y-6 ${hasImages ? "mb-16" : "mb-0"}`}>
          {project.videos.map((video) => (
            <div
              key={video.id}
              className="relative w-full h-64 sm:h-80 sm:w-[500px] rounded-lg bg-black cursor-pointer fade-in overflow-hidden"
              onClick={() => setActiveVideo(video)}
            >
              {/* Skeleton Loader */}
              {loadingVideos && (
                <div className="absolute inset-0 bg-gray-800 animate-pulse rounded-lg" />
              )}

              <video
                src={video.video_url}
                className="w-full h-full object-cover rounded-lg"
                muted
                playsInline
                preload="metadata"
                onLoadedData={() => setLoadingVideos(false)}
              />

              {/* Play Icon */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-8 h-8 text-white"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>
              </div>
            </div>
          ))}
        </section>
      )}

      {/* IMAGE ALBUMS */}
      {hasImages && (
        <div className={`grid grid-cols-2 sm:grid-cols-3 gap-4 ${hasVideos ? "" : "mt-6"}`}>
          {validImages.map((img, index: number) => (
            <button
              key={img.id}
              onClick={() => {
                setActiveAlbum({ images: validImages });
                setImageIndex(index);
              }}
              className="relative w-full aspect-[4/5] overflow-hidden rounded-lg fade-in"
            >
              {/* Skeleton Loader */}
              {loadingImages && (
                <div className="absolute inset-0 bg-gray-800 animate-pulse rounded-lg" />
              )}
              <Image
                src={img.image_url}
                alt={project.title}
                fill
                className="object-cover"
                onLoadingComplete={() => setLoadingImages(false)}
              />
            </button>
          ))}
        </div>
      )}

      {/* Fallback if no media */}
      {!hasMedia && (
        <p className="text-white/60 mt-6 text-sm">
          This project currently has no media to display.
        </p>
      )}

      {/* Modals */}
      {activeAlbum && (
        <ImageModal album={activeAlbum} startIndex={imageIndex} onClose={() => setActiveAlbum(null)} />
      )}
      {activeVideo && <VideoModal video={activeVideo} onClose={() => setActiveVideo(null)} />}
    </main>
  );
}
