import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Sobre mim & como funciona — harison.dev',
  description: 'A história de Harison Rios — da ETEC à Stefanini Brasil, e como o portfólio exibe músicas em tempo real via Last.fm.',
};

export default function ComoFunciona() {
  return (
    <main className="min-h-screen bg-slate-950 text-slate-200">
      <div className="max-w-2xl mx-auto px-6 py-16">
        {/* Back link */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-slate-400 hover:text-white text-sm mb-10 transition-colors group"
        >
          <svg className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Voltar
        </Link>

        {/* Header */}
        <div className="mb-12">
          <span className="text-slate-500 text-sm font-mono">21 mar 2026</span>
          <h1 className="text-3xl font-bold text-white leading-snug mt-3 mb-3">
            Quem sou eu — e como esse portfólio funciona
          </h1>
          <p className="text-slate-400 text-base leading-relaxed">
            Um pouco da minha trajetória na tecnologia e como o site sabe o que estou
            ouvindo no Spotify em tempo real.
          </p>
        </div>

        <article className="space-y-10 text-slate-300 leading-relaxed text-sm md:text-base">

          {/* === HISTÓRIA === */}
          <section>
            <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
              <span className="text-purple-400">01.</span> Minha história
            </h2>
            <p>
              Meu nome é <strong className="text-white">Harison Rios</strong>, tenho 20 anos e sou de São Paulo.
              Entrei nesse mundo da tecnologia na <strong className="text-white">ETEC</strong>, onde fiz o técnico em
              Desenvolvimento de Sistemas — e foi ali que eu travei. Me apaixonei de vez e não parei mais.
            </p>
            <p className="mt-4">
              Hoje curso <strong className="text-white">Análise e Desenvolvimento de Sistemas</strong> na{' '}
              <strong className="text-white">SPTech</strong> (São Paulo Tech School) e estou estagiando como
              Desenvolvedor na <strong className="text-white">Stefanini Brasil</strong> — uma das maiores consultorias
              de tecnologia da América Latina. Cada sprint é um aprendizado novo.
            </p>
            <p className="mt-4">
              No tempo livre desenvolvo projetos por conta própria, jogo, e fico imerso na cena do rap e trap.
              Sempre tentando misturar tecnologia com criatividade — acho que as melhores ideias nascem nessa
              interseção.
            </p>
          </section>

          {/* === PORTFÓLIO === */}
          <section>
            <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
              <span className="text-purple-400">02.</span> Por que fiz esse portfólio
            </h2>
            <p>
              Queria algo além de uma lista de projetos. Um espaço que mostrasse{' '}
              <strong className="text-white">quem eu sou de verdade</strong> — o que estou ouvindo, o clima em SP,
              as techs do dia a dia. Um reflexo atual de mim.
            </p>
            <p className="mt-4">
              Mas não nasceu assim. Comecei com algo bem mais simples — um portfólio básico sem muita integração.
              Conforme fui aprendendo na faculdade e nas experiências de trabalho, fui me desafiando a ir além.
              Cada versão nova reflete um nível novo de entendimento. Você pode ver como era a versão anterior aqui:
            </p>
            <a
              href="https://github.com/HarisonRios/hari"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 mt-4 px-4 py-2 rounded-lg bg-slate-800 border border-slate-700 hover:border-purple-500/50 transition-colors text-sm text-gray-300 hover:text-white"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
              </svg>
              HarisonRios/hari — versão anterior
            </a>
            <p className="mt-4">
              A versão atual construí do zero com <strong className="text-white">Next.js</strong> e{' '}
              <strong className="text-white">Tailwind CSS</strong>, integrando APIs reais do GitHub, Last.fm e
              Open-Meteo. Nada de template — cada componente foi pensado e escrito à mão.
            </p>
          </section>

          {/* === COMO FUNCIONA === */}
          <section>
            <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
              <span className="text-purple-400">03.</span> Como funciona o &quot;Now Playing&quot;
            </h2>
            <p>
              Antes eu usava o <strong className="text-white">Lanyard</strong> — uma API de presença do Discord que
              detecta o que você está ouvindo quando o Spotify está conectado. Funcionava, mas dependia do Discord
              aberto. Queria evoluir: mostrar a música mesmo sem o Discord rodando.
            </p>
            <p className="mt-4">
              A solução foi o{' '}
              <a href="https://www.last.fm" target="_blank" rel="noopener noreferrer" className="text-green-400 hover:text-green-300 underline underline-offset-2">
                Last.fm
              </a>
              . Conectei minha conta do Spotify nele e agora ele registra cada música que ouço — isso se chama{' '}
              <strong className="text-white">scrobbling</strong>. A API do Last.fm é pública, só precisa de uma
              API key gratuita. Sem OAuth, sem token do usuário, sem complexidade.
            </p>

            <div className="my-6 bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-3 font-mono text-sm">
              <div className="flex items-start gap-3">
                <span className="text-slate-500 select-none">1.</span>
                <span><span className="text-green-400">Spotify</span><span className="text-slate-400"> → scrobble → </span><span className="text-red-400">Last.fm</span></span>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-slate-500 select-none">2.</span>
                <span><span className="text-slate-400">Site chama </span><span className="text-purple-400">user.getrecenttracks</span><span className="text-slate-400"> a cada 10s</span></span>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-slate-500 select-none">3.</span>
                <span><span className="text-slate-400">Se </span><span className="text-yellow-400">{`@attr.nowplaying == "true"`}</span><span className="text-slate-400"> → exibe a música</span></span>
              </div>
            </div>

            <p>
              As chamadas acontecem em <strong className="text-white">rotas de servidor</strong> do Next.js —
              a API key nunca chega ao browser. Os <strong className="text-white">Top Álbuns</strong> vêm do{' '}
              <code className="bg-slate-800 text-green-400 px-1.5 py-0.5 rounded text-xs">user.gettopalbums?period=1month</code>{' '}
              e atualizam a cada 5 minutos.
            </p>
          </section>

          {/* === STACK === */}
          <section>
            <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
              <span className="text-purple-400">04.</span> Resumo técnico
            </h2>
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-5">
              <ul className="space-y-2 text-sm">
                {[
                  'Next.js 14 (App Router) + TypeScript',
                  'Tailwind CSS + componentes próprios',
                  'Last.fm API — Now Playing & Top Albums',
                  'GitHub GraphQL API — Pinned Repos',
                  'Open-Meteo API — clima em tempo real',
                  'EmailJS — formulário de contato',
                  'WebGL via OGL — background animado',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <span className="text-purple-400 mt-0.5">✦</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </section>

        </article>

        {/* Footer */}
        <div className="mt-16 pt-8 border-t border-slate-800 flex items-center justify-between text-slate-500 text-xs">
          <Link href="/" className="hover:text-white transition-colors">← harison.dev</Link>
          <span>@harisonrios</span>
        </div>
      </div>
    </main>
  );
}
