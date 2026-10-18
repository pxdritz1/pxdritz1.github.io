import { useEffect, useState } from "react";
import { fallbackAvatar, githubUser } from "../data/site.js";

const githubRequests = new Map();

async function fetchJson(url) {
  const response = await fetch(url);
  if (!response.ok) throw new Error(`request failed: ${response.status}`);
  return response.json();
}

async function fetchGithubJson(path) {
  const cacheKey = `github-api:${path}`;
  const cached = sessionStorage.getItem(cacheKey);
  if (cached) {
    try {
      const { timestamp, data } = JSON.parse(cached);
      if (Date.now() - timestamp < 10 * 60 * 1000) return data;
    } catch {
      sessionStorage.removeItem(cacheKey);
    }
  }

  if (githubRequests.has(path)) return githubRequests.get(path);

  const request = (async () => {
    const controller = new AbortController();
    const timeout = window.setTimeout(() => controller.abort(), 10000);
    try {
      const response = await fetch(`https://api.github.com${path}`, {
        headers: {
          Accept: "application/vnd.github+json",
          "X-GitHub-Api-Version": "2022-11-28",
        },
        signal: controller.signal,
      });
      if (!response.ok) {
        throw new Error(`github request failed: ${response.status}`);
      }
      const data = await response.json();
      sessionStorage.setItem(
        cacheKey,
        JSON.stringify({ timestamp: Date.now(), data }),
      );
      return data;
    } finally {
      window.clearTimeout(timeout);
    }
  })();
  githubRequests.set(path, request);
  try {
    return await request;
  } finally {
    githubRequests.delete(path);
  }
}

export function useProjectData() {
  const [data, setData] = useState({
    modrinth: [],
    github: [],
    avatar: fallbackAvatar,
    loading: true,
    error: false,
  });
  useEffect(() => {
    let active = true;
    async function loadProjects() {
      const [modrinthResult, profileResult, githubResult] =
        await Promise.allSettled([
          fetchJson("https://api.modrinth.com/v2/user/pxotitas/projects"),
          fetchGithubJson(`/users/${githubUser}`),
          fetchGithubJson(
            `/users/${githubUser}/repos?sort=updated&per_page=100`,
          ),
        ]);

      const modrinth =
        modrinthResult.status === "fulfilled" ? modrinthResult.value : [];
      const profile =
        profileResult.status === "fulfilled" ? profileResult.value : null;
      const repositories =
        githubResult.status === "fulfilled" ? githubResult.value : [];
      const github = repositories.map((repository) => ({
        ...repository,
        commits: [],
      }));

      if (!active) return;
      setData({
        modrinth,
        github,
        avatar: profile?.avatar_url || fallbackAvatar,
        loading: false,
        error:
          modrinthResult.status === "rejected" ||
          profileResult.status === "rejected" ||
          githubResult.status === "rejected",
      });

      const commitResults = await Promise.all(
        repositories.slice(0, 10).map((repository) =>
          fetchGithubJson(
            `/repos/${githubUser}/${repository.name}/commits?per_page=3`,
          ).catch(() => []),
        ),
      );

      if (active) {
        setData((current) => ({
          ...current,
          github: current.github.map((repository, index) => ({
            ...repository,
            commits: commitResults[index] || [],
          })),
        }));
      }
    }

    loadProjects().catch(() => {
      if (active) {
        setData((current) => ({
          ...current,
          loading: false,
          error: true,
        }));
      }
    });
    return () => {
      active = false;
    };
  }, []);
  return data;
}
