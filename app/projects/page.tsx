import { ProjectsClient } from "@/app/projects/ProjectsClient";
import { getProjectCards } from "@/content/case-studies";

export default function ProjectsPage() {
  return <ProjectsClient projects={getProjectCards()} />;
}
