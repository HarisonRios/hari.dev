export const runtime = 'nodejs';

interface GraphQLResponse<T> {
  data?: T;
  errors?: Array<{ message: string }>;
}

interface GitHubPinnedResponse {
  user: {
    name: string | null;
    pinnedItems: {
      edges: Array<{
        node: {
          name: string;
          description: string | null;
          url: string;
          languages: { nodes: Array<{ name: string }> };
          stargazerCount: number;
          defaultBranchRef: {
            target: {
              history: { totalCount: number };
            } | null;
          } | null;
        };
      }>;
    };
  } | null;
}

interface PinnedRepo {
  name: string;
  description: string;
  url: string;
  languages: string[];
  stars: number;
  commits: number;
}

const getEnv = () => {
  const token = process.env.GITHUB_TOKEN ?? process.env.GITHUB_PAT;
  const username =
    process.env.GITHUB_USERNAME ?? process.env.NEXT_PUBLIC_GITHUB_USERNAME;

  return { token, username };
};

export async function GET() {
  try {
    const { token, username } = getEnv();

    if (!token || !username) {
      return Response.json(
        { repos: [], userName: '', error: 'GitHub not configured' },
        { status: 200 }
      );
    }

    const query = `
      query($login: String!) {
        user(login: $login) {
          name
          pinnedItems(first: 6, types: REPOSITORY) {
            edges {
              node {
                ... on Repository {
                  name
                  description
                  url
                  languages(first: 5) {
                    nodes { name }
                  }
                  stargazerCount
                  defaultBranchRef {
                    target {
                      ... on Commit {
                        history(first: 1) { totalCount }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    `;

    const response = await fetch('https://api.github.com/graphql', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ query, variables: { login: username } }),
      next: { revalidate: 3600 },
    });

    if (!response.ok) {
      const details = await response.text();
      console.error('GitHub API error:', details);
      return Response.json(
        { repos: [], userName: '', error: 'GitHub API error' },
        { status: 200 }
      );
    }

    const data = (await response.json()) as GraphQLResponse<GitHubPinnedResponse>;
    if (data.errors?.length) {
      console.error('GitHub GraphQL errors:', data.errors);
    }

    const user = data.data?.user;
    const edges = user?.pinnedItems.edges ?? [];

    const repos: PinnedRepo[] = edges.map((edge) => ({
      name: edge.node.name,
      description: edge.node.description ?? '',
      url: edge.node.url,
      languages: edge.node.languages.nodes.map((lang) => lang.name).slice(0, 5),
      stars: edge.node.stargazerCount,
      commits: edge.node.defaultBranchRef?.target?.history.totalCount ?? 0,
    }));

    return Response.json({ repos, userName: user?.name ?? '' });
  } catch (error) {
    console.error('Error fetching GitHub pinned repos:', error);
    return Response.json(
      { repos: [], userName: '', error: 'Unexpected GitHub error' },
      { status: 200 }
    );
  }
}
