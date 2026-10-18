import { Code2, ExternalLink } from "lucide-react";
import RevealImage from "./RevealImage.jsx";
import RevealItem from "./RevealItem.jsx";

export default function ProjectCard({ project, type, index = 0 }) {
  const isGithub = type === "github";
  const title = isGithub ? project.name : project.title;
  const description = isGithub
    ? project.description || "a github project by pxdritz1."
    : project.description || "a project published on modrinth.";
  const link = isGithub
    ? project.html_url
    : `https://modrinth.com/project/${project.slug}`;
  const icon = isGithub ? null : project.icon_url;
  return (
    <RevealItem
      as="article"
      index={index}
      className="project-card group flex flex-col rounded-3xl border border-ink/10 bg-white/60 p-5 shadow-soft"
    >
      <div className="mb-8 flex items-start justify-between">
        <a
          href={link}
          target="_blank"
          rel="noreferrer"
          aria-label={`open ${title}`}
          className="grid h-14 w-14 place-items-center overflow-hidden rounded-2xl bg-mint/20 text-lavender"
        >
          {icon ? (
            <RevealImage src={icon} alt="" className="h-full w-full object-cover" />
          ) : (
            <Code2 size={25} />
          )}
        </a>
        <span className="rounded-full bg-mint/20 px-2.5 py-1 font-mono text-xs text-ink/50">
          {isGithub ? "github" : "modrinth"}
        </span>
      </div>
      <h2 className="font-display text-2xl font-bold tracking-tight text-ink">
        <a href={link} target="_blank" rel="noreferrer">
          {title}
        </a>
      </h2>
      <p className="mt-3 flex-1 text-sm leading-6 text-ink/55">{description}</p>
      {isGithub && project.commits?.length > 0 && (
        <div className="mt-5 border-t border-ink/10 pt-4">
          <ul className="space-y-1.5">
            {project.commits.map((commit) => (
              <li key={commit.sha} className="truncate text-xs text-ink/50">
                {commit.commit.message.split("\n")[0]}
              </li>
            ))}
          </ul>
        </div>
      )}
      <div className="mt-7 flex items-center justify-between border-t border-ink/10 pt-4 text-xs">
        <span className="text-ink/45">
          {isGithub
            ? `${project.stargazers_count} stars`
            : project.downloads
              ? `${project.downloads.toLocaleString()} downloads`
              : "published project"}
        </span>
        <a
          href={link}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-1 font-semibold text-lavender"
        >
          open <ExternalLink size={13} />
        </a>
      </div>
    </RevealItem>
  );
}
