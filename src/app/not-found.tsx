import Link from 'next/link';

export default function NotFound() {
  return (
    <main className="min-h-screen bg-slate-950 flex items-center justify-center px-6">
      <div className="text-center">
        {/* Big 404 */}
        <div className="relative mb-8">
          <p className="text-[8rem] md:text-[12rem] font-bold leading-none text-transparent bg-clip-text bg-gradient-to-br from-purple-400 to-pink-500 select-none">
            404
          </p>
          <div className="absolute inset-0 text-[8rem] md:text-[12rem] font-bold leading-none text-purple-500/10 blur-2xl select-none pointer-events-none">
            404
          </div>
        </div>

        <h1 className="text-2xl md:text-3xl font-bold text-white mb-3">
          Página não encontrada
        </h1>
        <p className="text-gray-400 text-sm md:text-base mb-10 max-w-sm mx-auto">
          Essa página não existe ou foi movida. Mas o portfólio inteiro está aqui:
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            href="/"
            className="px-6 py-2.5 bg-purple-500 hover:bg-purple-600 text-white text-sm font-semibold rounded-lg transition-colors"
          >
            Ir para o início
          </Link>
          <Link
            href="/Projects"
            className="px-6 py-2.5 bg-slate-800 hover:bg-slate-700 border border-slate-700 text-gray-300 text-sm font-semibold rounded-lg transition-colors"
          >
            Ver projetos
          </Link>
        </div>

        <p className="mt-12 text-slate-600 text-xs">harison.dev · @harisonrios</p>
      </div>
    </main>
  );
}
