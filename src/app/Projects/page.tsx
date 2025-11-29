import Background from '@/components/Background';
import NavigationMenuDemo from '@/components/NavigationMenuDemo';
import { LanguageToggle } from '@/components/LanguageToggle';

export default function Projects() {
  return (
    <main className="min-h-screen relative font-poppins">
      <Background />
      <LanguageToggle />
      
      <div className="fixed top-6 md:top-10 lg:top-16 left-1/2 transform -translate-x-1/2 z-50">
        <div className="bg-slate-900/90 px-6 md:px-8 py-2 md:py-3 rounded-md shadow-lg ring-1 ring-white/10">
          <NavigationMenuDemo />
        </div>
      </div>

      <div className="relative z-10 flex items-center justify-center min-h-screen p-4">
        <div className="flex flex-col items-center justify-center gap-6">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
              My Projects
            </h1>
            <p className="text-gray-400 text-lg md:text-xl">
              This page is coming soon...
            </p>
          </div>
          
          <div className="text-5xl md:text-7xl animate-pulse">
            🚀
          </div>
        </div>
      </div>
    </main>
  );
}
