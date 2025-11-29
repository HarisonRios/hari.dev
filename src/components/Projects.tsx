'use client';

interface Project {
  title: string;
  description: string;
  image?: string;
  tags: string[];
  links: {
    website?: string;
    github?: string;
  };
}

interface ProjectCardProps {
  project: Project;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  return (
    <div className="bg-slate-800/50 hover:bg-slate-800 border border-slate-700/50 hover:border-cyan-500/50 rounded-lg p-6 transition-all duration-300 backdrop-blur-sm flex gap-4">
      {project.image && (
        <div className="w-20 h-20 rounded-lg bg-linear-to-br from-cyan-500/10 to-blue-500/10 flex items-center justify-center shrink-0 overflow-hidden">
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover"
          />
        </div>
      )}

      <div className="flex-1">
        <h3 className="text-lg font-bold text-white mb-1">{project.title}</h3>
        <p className="text-gray-400 text-sm mb-3">{project.description}</p>

        <div className="flex gap-2">
          {project.links.website && (
            <a
              href={project.links.website}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-1 bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-500/30 text-cyan-400 text-xs rounded transition-all duration-300"
            >
              Website
            </a>
          )}
          {project.links.github && (
            <a
              href={project.links.github}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-1 bg-slate-700/50 hover:bg-slate-700 border border-slate-600/50 text-gray-300 text-xs rounded transition-all duration-300"
            >
              GitHub
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

export const Projects = () => {
  const projects: Project[] = [
    {
      title: "PresenceDB",
      description:
        "A web app that displays the playtime of your Discord activities. Built with Next.js & PostgreSQL.",
      tags: ["Next.js", "PostgreSQL", "TypeScript"],
      links: {
        website: "#",
        github: "https://github.com/HarisonRios",
      },
    },
    {
      title: "VShop for Gaming",
      description:
        "A mobile app that displays your favorite in-game shop. Built with Expo & React Native Paper.",
      tags: ["React Native", "Expo", "TypeScript"],
      links: {
        website: "#",
        github: "https://github.com/HarisonRios",
      },
    },
    {
      title: "WoBahn",
      description:
        "A web app that displays the approximate locations of all metro lines in Vienna. Built with Astro, Maplibre & SSE",
      tags: ["Astro", "Maplibre", "SSE"],
      links: {
        website: "#",
        github: "https://github.com/HarisonRios",
      },
    },
  ];

  return (
    <div className="w-full max-w-6xl mx-auto px-4 py-20">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-white mb-2 flex items-center gap-2">
          What I Built <span className="text-2xl">🔨</span>
        </h2>
        <p className="text-gray-400 text-sm">
          These are the top projects I am currently working on. You can see the
          rest on my{" "}
          <a href="https://github.com/HarisonRios" className="text-cyan-400 hover:underline">
            GitHub profile
          </a>
          .
        </p>
      </div>

      <div className="space-y-4">
        {projects.map((project) => (
          <ProjectCard key={project.title} project={project} />
        ))}
      </div>
    </div>
  );
};
