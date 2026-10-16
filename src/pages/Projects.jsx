import { BriefcaseBusiness, Code2 } from "lucide-react";
import { githubUser } from "../data/site.js";
import PageIntro from "../components/PageIntro.jsx";
import ProjectCard from "../components/ProjectCard.jsx";
import SmallProject from "../components/SmallProject.jsx";

export default function Projects({ data }) {
  if (data.loading)
    return (
        <main className="mx-auto max-w-6xl px-4 pb-4 pt-20">
        <PageIntro
          title="projects, but make them useful."
          copy="loading projects and recent commits..."
        />
        <div className="grid gap-4 lg:grid-cols-3">
          {Array.from({ length: 6 }, (_, index) => (
            <div
              key={index}
              className="h-64 animate-pulse rounded-3xl bg-ink/5"
            />
          ))}
        </div>
      </main>
    );
  return (
    <main className="mx-auto max-w-6xl px-4 pb-4 pt-20">
      <PageIntro
        title="projects, but make them useful."
        copy="everything published on modrinth and github."
      />
      {data.error && (
        <p className="mb-6 rounded-2xl bg-coral/10 p-4 text-sm text-ink/60">
          some live project data could not be loaded right now.
        </p>
      )}
      <section>
        <h2 className="mb-4 font-display text-2xl font-bold text-ink">
          modrinth
        </h2>
        <div className="grid gap-4 lg:grid-cols-3">
          {data.modrinth.map((project, index) => (
            <ProjectCard
              key={project.id}
              project={project}
              type="modrinth"
              index={index}
            />
          ))}
        </div>
      </section>
      <section className="mt-12">
        <h2 className="mb-4 font-display text-2xl font-bold text-ink">
          github
        </h2>
        <div className="grid gap-4 lg:grid-cols-3">
          {data.github.map((project, index) => (
            <ProjectCard
              key={project.id}
              project={project}
              type="github"
              index={index}
            />
          ))}
        </div>
      </section>
      <div className="mt-4 grid gap-4 md:grid-cols-2">
        <SmallProject
          icon={<BriefcaseBusiness size={20} />}
          index={0}
          title="edonme studios"
          copy="coordination, process, and digital project delivery."
          link="https://edonme.dev"
        />
        <SmallProject
          icon={<Code2 size={20} />}
          index={1}
          title="tools & scripts"
          copy="python utilities and automation for better workflows."
          link={`https://github.com/${githubUser}`}
        />
      </div>
    </main>
  );
}
