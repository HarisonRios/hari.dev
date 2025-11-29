'use client';

import { FaLinkedin, FaGithub, FaEnvelope } from 'react-icons/fa';

export const About = () => {
  return (
    <div className="bg-slate-800/50 border border-slate-700/50 rounded-lg p-6 backdrop-blur-sm h-full flex flex-col">
      <div className="mb-4 flex items-start gap-4">
        <div className="w-20 h-20 rounded-lg bg-linear-to-br from-cyan-400 to-blue-500 p-1 shrink-0">
          <div className="w-full h-full rounded-lg bg-slate-900 flex items-center justify-center text-2xl font-bold">
            HR
          </div>
        </div>

        <div className="flex-1">
          <h3 className="text-xl font-bold text-white mb-1">
            Hey, I'm Harison
          </h3>
          <p className="text-cyan-400 font-semibold text-sm mb-2">
            Data Engineer • 20 anos
          </p>
          <p className="text-gray-400 text-xs leading-relaxed">
            Developer from São Paulo, Brazil 🇧🇷. I develop both frontend and backend software.
          </p>
        </div>
      </div>

      <div className="flex gap-2 mb-4">
        <a
          href="https://linkedin.com/in/harisonrios"
          target="_blank"
          rel="noopener noreferrer"
          className="p-2 bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 rounded hover:bg-cyan-500/20 transition-all duration-300"
          title="LinkedIn"
        >
          <FaLinkedin size={16} />
        </a>
        <a
          href="https://github.com/HarisonRios"
          target="_blank"
          rel="noopener noreferrer"
          className="p-2 bg-slate-700/50 border border-slate-600/50 text-gray-300 rounded hover:bg-slate-700 transition-all duration-300"
          title="GitHub"
        >
          <FaGithub size={16} />
        </a>
        <a
          href="mailto:hharison562@gmail.com"
          className="p-2 bg-slate-700/50 border border-slate-600/50 text-gray-300 rounded hover:bg-slate-700 transition-all duration-300"
          title="Email"
        >
          <FaEnvelope size={16} />
        </a>
      </div>

      <div>
        <p className="text-white text-xs font-semibold mb-2">Skills</p>
        <div className="flex flex-wrap gap-2">
          {[
            "React",
            "Node.js",
            "Python",
            "TypeScript",
            "PostgreSQL",
            "MongoDB",
            "Docker",
            "Git",
          ].map((skill) => (
            <span
              key={skill}
              className="px-2 py-1 bg-cyan-500/10 border border-cyan-500/30 rounded text-cyan-400 text-xs"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};
