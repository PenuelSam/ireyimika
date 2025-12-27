"use client"
import { useState } from "react";
import Link from "next/link";
import Hero from "../components/hero";
import About from "../components/about";
import VideoModal from "../components/video-modal";
import ImageModal from "../components/image-modal";
import { useSmoothScroll } from "../hooks/useSmoothScroll";
import InquirySection from "../components/inquiry-section";

export type ProjectItem = { id: string; title: string; slug?: string; description?: string; videos: { id: string; video_url: string }[]; images: { id: string; image_url: string }[]; }

export default function HomeClient({ projects}: { projects: ProjectItem[]}) {
  useSmoothScroll();

  // const [activeVideo, setActiveVideo] = useState<VideoItem | null>(null);
  // const [activeAlbum, setActiveAlbum] = useState<ProjectItem | null>(null);

  // Sort projects alphabetically and get first 4 for preview
  const previewProjects = [...projects]
    .sort((a, b) => a.title.toLowerCase().localeCompare(b.title.toLowerCase()))
    .slice(0, 4);

  return (
    <main className="bg-black">
      <section className="section overflow-hidden flex-col items-center justify-center px-6 md:px-24">
        <Hero />
      </section>

      <section className="section px-6 md:px-24">
        <About />
      </section>

      {/* Project Preview Section */}
<section className="section flex-col justify-center px-6 md:px-24 mt-12">
  <div className="mb-12">
    <h1 className="text-white text-[18px] font-bold mb-2 uppercase">Projects</h1>
    <p className="text-gray-400 text-sm">Click on a project folder to explore</p>
  </div>
  <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
    {previewProjects.map((project) => (
      <Link
        key={project.id}
        href={`/projects/${project.slug}`}
        className="group flex flex-col items-center gap-2"
      >
        {/* macOS-style Folder */}
        <div className="relative w-40 h-40 sm:w-28 sm:h-24 rounded-xl bg-gradient-to-b from-neutral-800 to-neutral-900 border border-white/10 shadow-lg flex flex-col justify-start transition-transform group-hover:scale-105 overflow-hidden">
          
          {/* Top tab */}
          <div className="absolute -top-2 left-1/4 w-1/2 h-5 sm:h-4 rounded-t-lg bg-gradient-to-b from-neutral-700 to-neutral-800 shadow-inner"></div>

          {/* Inner fold shadow for 3D effect */}
          <div className="absolute bottom-0 left-0 w-full h-1 bg-white/10 backdrop-blur-sm"></div>
        </div>

        <p className="text-sm text-gray-400 text-center leading-tight mt-1">
          {project.title}
        </p>
      </Link>
    ))}
  </div>

  {/* Show More Button */}
  <div className="mt-2 text-center">
    <Link href="/projects">
      <button className="px-6 py-3 text-[14px] bg-[#1f1e1e] text-white rounded-lg font-medium hover:bg-gray-200 transition">
        Show More Projects
      </button>
    </Link>
  </div>
</section>


      {/* Modals */}
      {/* {activeVideo && (() => {
        const project = projects.find(p => p.videos?.some(v => v.id === activeVideo.id));
        return project ? (
          <VideoModal
            video={activeVideo}
            description={project.description}
            onClose={() => setActiveVideo(null)}
          />
        ) : null;
      })()}

      {activeAlbum && (
        <ImageModal
          album={activeAlbum}
          onClose={() => setActiveAlbum(null)}
        />
      )} */}

      <section className="h-screen flex flex-col justify-center items-start bg-black text-white">
        <InquirySection />
      </section>
    </main>
  );
}
