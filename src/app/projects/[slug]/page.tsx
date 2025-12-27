import { notFound } from "next/navigation";
import { getProjectsWithMedia } from "@/src/lib/data/getProject";
import ProjectMedia from "./project-media";

export const dynamic = "force-dynamic";

type Props = {
  params: Promise<{ slug: string }>;
};

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;

  if (!slug) {
    return notFound();
  }

  const normalizedSlug = slug.toLowerCase();

  const projects = await getProjectsWithMedia();

  const project = projects.find(
    (p) => typeof p.slug === "string" && p.slug === normalizedSlug
  );

  if (!project) return notFound();

  return <ProjectMedia project={project} />;
}
