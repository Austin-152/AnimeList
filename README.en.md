# AnimeList

A modern Next.js 16 application for discovering and watching anime and videos. It features fast search with suggestions, trending charts, an episode player with progress memory, and secure authentication via Logto. The UI is responsive and animated with Tailwind CSS, Ant Design, and GSAP.

- Live search with suggestions (debounced)
- Trending rankings by period (day/week/month/all) and type (movies/series/variety/anime)
- Video player with episode list, keyboard shortcuts, and progress saved in cookies
- Authentication via Logto (@logto/next) and protected API routes
- Request encryption to backend with RSA public key for selected endpoints
- Next.js Images remote patterns for external covers
- Built with Next.js 16, React 19, TypeScript, Tailwind CSS, Ant Design, GSAP, Embla Carousel, Axios

## Tech Stack

- Framework: Next.js 16 (Pages Router) + React 19 + TypeScript
- UI: Tailwind CSS, Ant Design, Embla Carousel, GSAP animations
- Auth: Logto (@logto/next)
- Data: Axios, SWR (optional), custom API layer with request encryption

## Quick Start

Prerequisites:
- Node.js 18+
- One of npm, pnpm, yarn, or bun

Install dependencies and start dev server:

```bash
# install
npm install
# or
pnpm install
# or
yarn
# or
bun install

# dev
npm run dev
# or
pnpm dev
# or
yarn dev
# or
bun dev
```

Open http://localhost:3000.

## Environment Variables

Create a .env.local file in the project root:

```bash
# Backend API base (used on client and server)
NEXT_PUBLIC_BASE_URL=https://animeapi.rypro.me

# Logto (OIDC) settings
LOGTO_ENDPOINT=https://your-logto.example.com
LOGTO_APP_ID=your-app-id
LOGTO_APP_SECRET=your-app-secret
LOGTO_CALLBACK_URL=http://localhost:3000

# Cookie/session secret (random 32+ bytes)
COOKIE_SECRET=replace_with_a_strong_random_string
```

Notes:
- next.config.mjs maps these values into Next.js runtime env (BaseURL, Logto*). Prefer .env.local for local dev.
- Make sure your Logto app has the following redirect/callback URLs:
  - http://localhost:3000/api/logto/callback
  - Sign-in and sign-out use the handler under /api/logto/[action].ts managed by @logto/next.

## NPM Scripts

- dev: next dev
- build: next build
- start: next start
- lint: eslint .

## Project Structure (highlights)

- src/pages
  - index.tsx: Home (animated hero + search)
  - trending.tsx: Rankings by period and type
  - movies.tsx, series.tsx: Content landing pages
  - search/[keyword].tsx: Search results
  - video-page/[id].tsx: Player page with episodes and cookies tracking
  - api/
    - logto/[action].ts: Logto auth routes (sign-in, callback, sign-out)
    - getUserInfo.ts: Returns filtered Logto claims; 401 if not authenticated
    - token.ts: Returns RSA-encrypted user claims when authenticated
- src/app/api/api.tsx: Axios client, search/keyword/detail/trending helpers
- src/middlewares/cryptoMiddleware.ts: Encrypts request payloads for selected endpoints
- src/lib/logto.js: Logto client configuration
- src/lib/crypto.tsx: RSA encryption utility via node-forge
- src/components: Navbar, Footer, SearchBox, Carousel, TrendingList, etc.
- public/: Static assets and placeholders

## Key Flows

- Authentication
  - The route /api/logto/[action] is handled by @logto/next: sign-in, callback, sign-out.
  - Use /api/getUserInfo to check auth (returns 401 if not signed in).

- Search and Suggestions
  - SearchBox debounces input and queries the backend via fetchKeywordSuggestions; requires authentication.

- Video Playback
  - /video-page/[id] fetches details and renders an iframe player (m3u8). Episode selection supports keyboard arrows and persists last watched episode in cookies.

- Request Encryption
  - For routes /api/query/ole/search, /api/query/ole/keyword, /api/query/ole/detail: the cryptoMiddleware fetches the server public key and encrypts payloads with RSA (OAEP), sending timestamp + encrypted data.

## Development Notes

- This project currently uses the Pages Router for routing. The app/ directory is used for colocated utilities; it does not define routes.
- Remote images from olevod.tv and selected avatar hosts are allowed in next.config.mjs.
- Axios baseURL is driven by process.env.BaseURL which is mapped from NEXT_PUBLIC_BASE_URL.

## Deployment

- Build: `npm run build`
- Start: `npm start`
- Suitable for deployment on Vercel or any Node hosting environment.

## Troubleshooting

- 401 when searching: Ensure you are signed in via Logto and your Logto configuration is correct.
- Env not taking effect: Check .env.local and that you restarted the dev server after changes.
- Images not loading: Verify remotePatterns in next.config.mjs allow the host.

## License

Add your preferred license. If unsure, keep the repository private until a license is chosen.
