"use client";

import { useState } from "react";
import About from "../components/about";
import Hero from "../components/hero";
import AlbumSlider from "../components/image-grid";
import VideoSlider from "../components/video-grid";
import VideoModal from "../components/video-modal";
import ImageModal from "../components/image-modal";
import { useSmoothScroll } from "../hooks/useSmoothScroll";
import InquirySection from "../components/inquiry-section";

type VideoItem = {
  id: string;
  title: string;
  video_url: string;
};

type AlbumItem = {
  id: string;
  title: string;
  description?: string;
  images: { id: string; image_url: string }[];
};

type ProjectItem = {
    id: string;
  title: string;
  slug?: string;
  description?: string;
  videos: { id: string; video_url: string }[];
  images: { id: string; image_url: string }[];
}


export default function HomeClient({  projects, videos }: { projects: ProjectItem[]; videos: VideoItem[]; }) {
  useSmoothScroll();

  const [activeVideo, setActiveVideo] = useState<VideoItem | null>(null);
  const [activeAlbum, setActiveAlbum] = useState<string | null>(null);

  return (
    <main className="bg-black">
      <section className="section overflow-hidden flex-col items-center justify-center px-6 md:px-24">
        <Hero />
      </section>

      <section className="section px-6 md:px-24">
        <About />
      </section>

      <VideoSlider
        videos={videos}
        onSelect={(video) => setActiveVideo(video)}
      />

      {activeVideo && (() => {
  const project = projects.find(p => p.videos?.some(v => v.id === activeVideo.id));
  return project ? (
    <VideoModal
      video={activeVideo}
      description={project.description}
      onClose={() => setActiveVideo(null)}
    />
  ) : null;
})()}

      <AlbumSlider albums={projects} onSelect={setActiveAlbum}  />

      {activeAlbum && (
        <ImageModal
         album={projects.find((p) => p.id === activeAlbum)!}
          onClose={() => setActiveAlbum(null)}
        />
      )}

      <section className="h-screen flex flex-col justify-center items-start bg-black text-white  md:px-12">
        <InquirySection />
      </section>
    </main>
  );
}
