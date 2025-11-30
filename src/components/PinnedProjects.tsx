'use client';

import { useEffect, useState } from 'react';
import { SiGithub } from 'react-icons/si';
import { ExternalLink } from 'lucide-react';

interface Repository {
  name: string;
  description: string;
  url: string;
  languages: string[];
  stars: number;
  commits: number;
  userName: string;
}

export const PinnedProjects = () => {
  const [repos, setRepos] = useState<Repository[]>([]);
  const [loading, setLoading] = useState(true);
  const [userName, setUserName] = useState<string>('');

  useEffect(() => {
    const fetchRepos = async () => {
      try {
        const query = `
          query {
            user(login: "${process.env.NEXT_PUBLIC_GITHUB_USERNAME}") {
              name
              pinnedItems(first: 6, types: REPOSITORY) {
                edges {
                  node {
                    ... on Repository {
                      name
                      description
                      url
                      languages(first: 5) {
                        nodes {
                          name
                        }
                      }
                      stargazerCount
                      defaultBranchRef {
                        target {
                          ... on Commit {
                            history(first: 1) {
                              totalCount
                            }
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
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_GITHUB_TOKEN}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ query }),
        });

        if (response.ok) {
          const data = await response.json();
          setUserName(data.data.user.name || 'Developer');
          const pinnedRepos = data.data.user.pinnedItems.edges.map((edge: any) => ({
            name: edge.node.name,
            description: edge.node.description || 'Sem descrição',
            url: edge.node.url,
            languages: edge.node.languages.nodes.map((lang: any) => lang.name).slice(0, 5),
            stars: edge.node.stargazerCount,
            commits: edge.node.defaultBranchRef?.target?.history?.totalCount || 0,
            userName: data.data.user.name || 'Developer',
          }));
          setRepos(pinnedRepos);
        }
      } catch (error) {
        console.error('Erro ao buscar repositórios:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchRepos();
  }, []);

  return (
    <div className="w-full max-w-4xl mx-auto">
      <h2 className="text-2xl md:text-3xl font-bold text-white mb-8">My Projects</h2>

      <a
        href="https://github.com/HarisonRios"
        target="_blank"
        rel="noopener noreferrer"
        className="mb-8 block"
      >
        <div className="bg-slate-800/50 border border-slate-700 hover:border-purple-500/50 p-4 rounded-lg hover:bg-slate-700/50 transition-all duration-300 cursor-pointer">
          <div className="flex items-center gap-3">
            <SiGithub size={32} className="text-purple-400" />
            <div>
              <h3 className="text-lg font-bold text-white">{userName || 'GitHub Profile'}</h3>
              <p className="text-xs md:text-sm text-gray-400">View all repositories</p>
            </div>
          </div>
        </div>
      </a>

      {loading ? (
        <div className="space-y-4">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="bg-slate-800/50 border border-slate-700 p-6 rounded-lg animate-pulse">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 min-w-0 w-full">
                  <div className="h-6 bg-slate-700 rounded w-1/3 mb-3" />
                  <div className="space-y-2 mb-4">
                    <div className="h-4 bg-slate-700 rounded w-full" />
                    <div className="h-4 bg-slate-700 rounded w-5/6" />
                  </div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <div className="h-6 bg-slate-700 rounded-full w-20" />
                    <div className="h-6 bg-slate-700 rounded-full w-16" />
                    <div className="h-6 bg-slate-700 rounded-full w-16" />
                  </div>
                </div>
                <div className="w-5 h-5 bg-slate-700 rounded shrink-0 mt-1" />
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="space-y-4">
          {repos.map((repo) => (
            <a
              key={repo.name}
              href={repo.url}
              target="_blank"
              rel="noopener noreferrer"
              className="block"
            >
              <div className="bg-slate-800/50 hover:bg-slate-700/50 border border-slate-700 hover:border-purple-500/50 p-6 rounded-lg transition-all duration-300 cursor-pointer group">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <h3 className="text-lg md:text-xl font-bold text-white group-hover:text-purple-400 transition-colors mb-2">
                      {repo.name}
                    </h3>
                    <p className="text-sm md:text-base text-gray-300 mb-3 line-clamp-2">
                      {repo.description}
                    </p>
                    <div className="flex items-center gap-2 flex-wrap">
                      {repo.languages.length > 0 && repo.languages.slice(0, 3).map((lang, idx) => (
                        <span key={idx} className="text-xs md:text-sm px-2 py-1 bg-purple-500/20 text-purple-300 rounded-full">
                          {lang}
                        </span>
                      ))}
                      {repo.stars > 0 && (
                        <span className="text-xs md:text-sm text-gray-400">
                          ⭐ {repo.stars}
                        </span>
                      )}
                      {repo.commits > 0 && (
                        <span className="text-xs md:text-sm text-gray-400">
                          📦 {repo.commits}
                        </span>
                      )}
                    </div>
                  </div>
                  <ExternalLink className="w-5 h-5 text-gray-400 group-hover:text-purple-400 transition-colors shrink-0 mt-1" />
                </div>
              </div>
            </a>
          ))}
        </div>
      )}
    </div>
  );
};
