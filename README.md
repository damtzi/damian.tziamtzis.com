# damian.tziamtzis.com

Interactive 3D contact card. Vite + Solid 2 + Tailwind v4 + Three.js, static build.

```bash
pnpm install
pnpm dev        # http://localhost:3000
pnpm build      # static site in dist/client
pnpm lint       # oxlint + tsc + oxfmt check
```

Contact details live in `src/contact.ts`; the 3D scene in `src/card-3d.tsx`. See `AGENTS.md` for conventions.
