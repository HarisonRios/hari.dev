# Hari 🚀

Um portfólio web moderno e responsivo construído com tecnologias cutting-edge. Apresenta integração em tempo real com Discord (Lanyard), exibição de música ao vivo do Spotify, previsão do tempo e muito mais.

## 🎯 Sobre o Projeto

Este é um portfólio pessoal interativo que funciona como vitrine profissional. O site apresenta:

- **Home Page**: Introdução com informações pessoais, stack de tecnologias e cards interativos
- **Now Playing**: Exibe a música que está sendo tocada no Spotify em tempo real com barra de progresso
- **Last Songs**: Mostra os últimos 6 álbuns ouvidos no Spotify (persistidos localmente)
- **Weather Card**: Exibe a temperatura em tempo real de São Paulo
- **Language Toggle**: Botão para alternar entre bandeiras (Brasil/USA) com suporte a tradução no currículo
- **Resume Page**: Currículo profissional responsivo com tradução dinâmica
- **Coming Soon Pages**: Páginas de Projetos e Contato com placeholder

## 🛠️ Tecnologias Utilizadas

### Frontend
- **Next.js 16.0.3** - Framework React com renderização otimizada
- **TypeScript** - Tipagem estática para maior segurança
- **Tailwind CSS v4** - Framework de CSS utilitário com sintaxe moderna
- **React 19** - Biblioteca de UI com hooks avançados

### Integrations & APIs
- **Lanyard API** - Integração com Discord para exibir presença e Spotify
  - `NEXT_PUBLIC_LANYARD_USER_ID` - ID único do usuário Discord
  - `NEXT_PUBLIC_LANYARD_API` - URL base da API Lanyard
- **Open-Meteo API** - API livre de previsão do tempo (sem autenticação)
- **Spotify Web API** (via Lanyard) - Dados de música em tempo real

### Bibliotecas & Ferramentas
- **axios** - Cliente HTTP para requisições
- **react-icons** - Ícones SVG (SiPython, SiTypescript, SiReact, etc)
- **lucide-react** - Ícones modernos (Cloud, Sun, CloudRain)
- **ogl** - Biblioteca WebGL para animações de fundo
- **localStorage** - Armazenamento local para persistência de dados

### Build & Development
- **ESLint** - Linter de código
- **PostCSS** - Processador CSS
- **TypeScript Config** - Configuração TypeScript stricta

## 📦 Estrutura do Projeto

```
src/
├── app/
│   ├── page.tsx                    # Home page
│   ├── layout.tsx                  # Layout raiz
│   ├── global.css                  # Estilos globais
│   ├── contact/
│   │   └── page.tsx               # Página de contato (coming soon)
│   ├── projects/
│   │   └── page.tsx               # Página de projetos (coming soon)
│   └── Resume/
│       ├── layout.tsx             # Layout do currículo
│       └── page.tsx               # Página do currículo
├── components/
│   ├── Hero.tsx                   # Seção introdutória
│   ├── TechStack.tsx              # Grade de tecnologias (16 ícones)
│   ├── NowPlaying.tsx             # Música atual do Spotify em tempo real
│   ├── SpotifyCard.tsx            # Últimos 6 álbuns ouvidos
│   ├── WeatherCard.tsx            # Card do clima
│   ├── LanguageToggle.tsx         # Botão para trocar bandeira/linguagem
│   ├── NavigationMenuDemo.tsx     # Navegação principal
│   ├── HomeContent.tsx            # Wrapper do conteúdo home
│   ├── ResumeContent.tsx          # Conteúdo do currículo
│   ├── Background.tsx             # Fundo animado com WebGL
│   └── ui/
│       ├── button.tsx
│       └── navigation-menu.tsx
├── context/
│   └── LanguageContext.tsx        # (Removido - não em uso)
├── hooks/
│   └── use-mobile.ts              # Hook para detectar dispositivo móvel
└── lib/
    ├── translations.ts            # (Removido - não em uso)
    └── utils.ts                   # Utilitários
```

## 🚀 Funcionalidades Principais

### 1. Spotify em Tempo Real
- Exibe música atual com album art
- Barra de progresso animada (atualiza a cada segundo)
- Último 6 álbuns com histórico persistido em localStorage
- Atualiza a cada 30 segundos

### 2. Discord Presence
- Integração com Lanyard API
- Exibe dados do Spotify quando conectado
- Fallback para histórico local quando offline

### 3. Previsão do Tempo
- Temperatura em tempo real de São Paulo
- Ícone dinâmico baseado na condição (chuva, nublado, ensolarado)
- Atualiza a cada 30 minutos
- Sem necessidade de chave API

### 4. Design Responsivo
- Totalmente responsivo para mobile, tablet e desktop
- Fundo animado com WebGL
- Navegação adaptada para cada tamanho de tela
- Padding e espaçamento responsivos

### 5. Internacionalização
- Botão de bandeira (USA/Brasil) no canto superior direito
- Currículo traduzido dinamicamente (EN/PT)
- Suporte a localStorage para persistência de preferência

## 📱 Cores e Design

- **Fundo**: Gradiente dinâmico com WebGL (#170329 base)
- **Primária**: Roxo e Rosa (from-purple-400 to-pink-500)
- **Secundária**: Verde Spotify (#10b981)
- **Texto**: Branco e cinza (text-gray-400)
- **Hover**: Roxo (#purple-400) com transição suave

## 🔧 Como Executar

### Pré-requisitos
- Node.js 18+ instalado
- npm ou yarn

### Setup Inicial

1. **Clone o repositório:**
   ```bash
   git clone https://github.com/HarisonRios/hari.dev.git
   cd my-app
   ```

2. **Instale as dependências:**
   ```bash
   npm install
   ```

3. **Configure as variáveis de ambiente:**
   ```bash
   cp .env.example .env.local
   ```
   Preencha com:
   - `NEXT_PUBLIC_LANYARD_USER_ID` - Seu Discord User ID
   - `NEXT_PUBLIC_LANYARD_API` - https://api.lanyard.rest/v1/users/

4. **Execute o servidor de desenvolvimento:**
   ```bash
   npm run dev
   ```

5. **Acesse em seu navegador:**
   ```
   http://localhost:3000
   ```

### Build para Produção
```bash
npm run build
npm start
```

## 📊 Performance

- **Imagens otimizadas** com Next.js Image
- **CSS-in-JS** com Tailwind para menor bundle size
- **Lazy loading** de componentes
- **localStorage** para cache de dados
- **WebGL** renderizado eficientemente

## 🔐 Segurança

- Variáveis de ambiente não expostas no repositório
- `.env.local` incluído no `.gitignore`
- Nenhuma chave sensível em código
- HTTPS recomendado para produção

## 📝 Páginas Disponíveis

| Rota | Status | Descrição |
|------|--------|-----------|
| `/` | ✅ Ativo | Home com Spotify, clima e stack |
| `/Resume` | ✅ Ativo | Currículo responsivo com tradução |
| `/projects` | 🔄 Em breve | Página de projetos |
| `/contact` | 🔄 Em breve | Página de contato |

## 🎨 Componentes Principais

### Hero
Seção introdutória com nome, título profissional, localização e descrição.

### NowPlaying
Exibe a música atual do Spotify com:
- Album art
- Nome da música e artista
- Barra de progresso em tempo real (MM:SS)
- Mensagem "Enjoying the silence?" quando inativo

### SpotifyCard
Mostra os 6 últimos álbuns ouvidos em grid responsivo.

### TechStack
Exibe 16 tecnologias em grid com ícones e efeito hover.

### WeatherCard
Card com temperatura, descrição do clima e ícone dinâmico.

### LanguageToggle
Botão no canto superior direito para:
- Alternar entre bandeiras USA/Brasil
- Controlar tradução do currículo
- Persistir preferência em localStorage

## 📄 Licença

Este projeto é pessoal e de código aberto.

## 👤 Autor

**Harison Rios**
- 🔗 [GitHub](https://github.com/HarisonRios)
- 💼 [LinkedIn](https://linkedin.com/in/harisonrios)
- 📧 [Email](mailto:hharison562@gmail.com)
- 📍 São Paulo, Brasil

---

**Desenvolvido com ❤️ usando Next.js e Tailwind CSS**
