export interface ModrinthProject {
  id: string;
  title: string;
  description: string;
  slug: string;
  icon_url: string | null;
  downloads: number;
}

export interface GitHubCommit {
  sha: string;
  commit: {
    message: string;
  };
}

export interface GitHubRepository {
  id: number;
  name: string;
  description: string | null;
  html_url: string;
  stargazers_count: number;
  updated_at: string;
  commits: GitHubCommit[];
}

export interface ProjectDataState {
  modrinth: ModrinthProject[];
  github: GitHubRepository[];
  loading: boolean;
  error: boolean;
}