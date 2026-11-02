import { Injectable, signal } from "@angular/core";
import {
  GitHubCommit,
  GitHubRepository,
  ModrinthProject,
  ProjectDataState,
} from "../data/projects.models";

const githubUser = "pxdritz1";
const cacheDuration = 10 * 60 * 1000;

@Injectable({ providedIn: "root" })
export class ProjectDataService {
  readonly state = signal<ProjectDataState>({
    modrinth: [],
    github: [],
    loading: false,
    error: false,
  });

  private started = false;
  private readonly requests = new Map<string, Promise<unknown>>();

  async load(force = false): Promise<void> {
    if (this.started && !force) return;
    this.started = true;
    this.state.update((current) => ({ ...current, loading: true, error: false }));

    const [modrinthResult, profileResult, githubResult] = await Promise.allSettled([
      this.fetchJson<ModrinthProject[]>("https://api.modrinth.com/v2/user/pxotitas/projects"),
      this.fetchGitHub<{ avatar_url?: string }>(`/users/${githubUser}`),
      this.fetchGitHub<GitHubRepository[]>(`/users/${githubUser}/repos?sort=updated&per_page=100`),
    ]);

    const modrinth = modrinthResult.status === "fulfilled" ? modrinthResult.value : [];
    const repositories = githubResult.status === "fulfilled" ? githubResult.value : [];
    const github = repositories.map((repository) => ({ ...repository, commits: [] }));
    this.state.set({
      modrinth,
      github,
      loading: false,
      error: [modrinthResult, profileResult, githubResult].some((result) => result.status === "rejected"),
    });

    if (repositories.length === 0) return;
    const commitResults = await Promise.all(
      repositories.slice(0, 10).map((repository) =>
        this.fetchGitHub<GitHubCommit[]>(`/repos/${githubUser}/${repository.name}/commits?per_page=3`).catch(() => []),
      ),
    );
    this.state.update((current) => ({
      ...current,
      github: current.github.map((repository, index) => ({
        ...repository,
        commits: commitResults[index] ?? [],
      })),
    }));
  }

  private async fetchJson<T>(url: string): Promise<T> {
    const controller = new AbortController();
    const timeout = window.setTimeout(() => controller.abort(), 10000);
    try {
      const response = await fetch(url, { signal: controller.signal });
      if (!response.ok) throw new Error(`Request failed: ${response.status}`);
      return (await response.json()) as T;
    } finally {
      window.clearTimeout(timeout);
    }
  }

  private async fetchGitHub<T>(path: string): Promise<T> {
    const cacheKey = `github-api:${path}`;
    const cached = sessionStorage.getItem(cacheKey);
    if (cached) {
      try {
        const entry = JSON.parse(cached) as { timestamp: number; data: T };
        if (Date.now() - entry.timestamp < cacheDuration) return entry.data;
      } catch {
        sessionStorage.removeItem(cacheKey);
      }
    }

    const pending = this.requests.get(path) as Promise<T> | undefined;
    if (pending) return pending;
    const request = this.fetchJson<T>(`https://api.github.com${path}`).then((data) => {
      sessionStorage.setItem(cacheKey, JSON.stringify({ timestamp: Date.now(), data }));
      return data;
    });
    this.requests.set(path, request);
    try {
      return await request;
    } finally {
      this.requests.delete(path);
    }
  }
}