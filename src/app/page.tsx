
import { getProjectsWithMedia } from "../lib/data/getProject";
import HomeClient from "./home-client";


export default async function Home() {
  const projects = await getProjectsWithMedia();

  return <HomeClient projects={projects} />;
}
