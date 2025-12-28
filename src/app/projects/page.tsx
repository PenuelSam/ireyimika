import { getProjectsWithMedia } from "@/src/lib/data/getProject";
import { MdArrowBackIosNew } from "react-icons/md";
import Link from "next/link";

export default async function ProjectsPage() {
  const projects = await getProjectsWithMedia();

  // Sort projects alphabetically by title (case-insensitive)
  const sortedProjects = projects.sort((a, b) =>
    a.title.toLowerCase().localeCompare(b.title.toLowerCase())
  );

  return (
    <main className="min-h-screen bg-black px-6 pt-24 pb-32">
      <div className="mb-12 flex items-center  justify-between">
  <Link
    href="/"
    className="text-gray-400 hover:text-white transition flex items-center gap-2"
    aria-label="Back to home"
  >
    <MdArrowBackIosNew size={20} /> Back
  </Link>

  <h1 className="text-white text-3xl font-bold">All Projects</h1>
</div>

      <div className="grid grid-cols-3 sm:grid-cols-4 gap-6">
        {sortedProjects.map((project) => (
          <Link
            key={project.id}
            href={`/projects/${project.slug}`}
            className="group flex flex-col items-center gap-2"
          >
            {/* macOS-style Folder */}
            <div className="relative w-24 h-20 sm:w-50 sm:h-50 rounded-xl bg-gradient-to-b from-neutral-800 to-neutral-900 border border-white/10 shadow-lg flex flex-col justify-start transition-transform group-active:scale-95 group-hover:scale-105 overflow-hidden">
              
              {/* Top tab */}
              <div className="absolute -top-2 left-1/4 w-1/2 h-4 rounded-t-lg bg-gradient-to-b from-neutral-700 to-neutral-800 shadow-inner"></div>

              {/* Inner fold shadow for 3D effect */}
              <div className="absolute bottom-0 left-0 w-full h-1 bg-white/10 backdrop-blur-sm"></div>
            </div>

            {/* Title */}
            <p className="text-sm tracking-tight text-gray-400 text-center leading-tight mt-1">
              {project.title}
            </p>
          </Link>
        ))}
      </div>
    </main>
  );
}
