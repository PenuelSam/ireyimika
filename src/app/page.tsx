
import { getProjectsWithMedia } from "../lib/data/getProject";
import HomeClient from "./home-client";

type Video = {
  id: string;
  title?: string;
  video_url: string;
};

export default async function Home() {
  const projects = await getProjectsWithMedia();

  const videos = projects.flatMap((project) =>
    project.videos?.map((video: Video) => ({
      ...video,
      title: project.title,
    })) || []
  );

  return <HomeClient projects={projects} videos={videos} />;
}
