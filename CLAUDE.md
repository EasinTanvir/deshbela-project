@AGENTS.md

# DESHBELA News Portal - project conventions

Practicum project (BCSE) for Real Capita Group. The SRS is the source of truth:
`D:\cse\requirement_and_diagram\DeshBela_News_Portal_Requirements_Engineering_Document.docx`
(13 feature groups, sections 4.1 to 4.13). Build only what the SRS asks for. Must first, Could last.
`README.md` lists every planned page with its route, SRS section and priority.

The student must explain every file to university faculty. The work must look human-made, not AI-made:
- Keep things separate, simple and easy to find.
- Use no code comments.
- Keep a plain newspaper look.

## Stack
- Next.js 16 (App Router), React 19, JavaScript (no TypeScript), Tailwind CSS 4.
- Prisma + MongoDB planned, not installed yet. Pages use sample data from `src/data/` for now.
- This Next.js version differs from older ones. Read `node_modules/next/dist/docs/` before using a Next API.
- `next.config.mjs` has `cacheComponents: true`:
  - No `new Date()`, `Date.now()` or `Math.random()` in server components (the build fails). Use a client
    component (see `src/components/common/TodayDate.jsx`).
  - Database data will later need `"use cache"` or `<Suspense>`.
- `next/image`: use `preload`, not the deprecated `priority`. Static imports support `placeholder="blur"`.

## Folder structure
```
src/
  app/<route>/page.js          route file: only imports the page component and returns it
  assets/images/<group>/       image files (kebab-case names that say what the photo shows)
  constants/images.js          imports every image and exports it with a camelCase label (NEWS_IMAGES)
  components/
    pages/<page>/<Page>.jsx    page component, gets the data and places the sections in order
    pages/<page>/*.jsx         sections used only by that page
    common/                    small parts reused by many pages (NewsCard, SectionTitle, AdSlot ...)
    layout/                    Header, Footer, MobileMenu, NewsletterForm (shown on every page)
  data/                        sample data (replaced by Prisma later)
  lib/<page>Data.js            data functions for one page; the only code that reads src/data
  lib/*.js                     small helpers (formatDate, formatTime)
  styles/
    globals.css                entry file: imports tailwindcss, theme.css and every pages/*.css
    theme.css                  shared colours and fonts
    pages/<page>.css           colours and animations for one page
```

Example (home page): `src/app/page.js` -> `src/components/pages/home/Home.jsx` -> sections in the same
folder (`NewsTicker.jsx`, `BreakingSlider.jsx` ...) -> data from `src/lib/homeData.js` -> colours in
`src/styles/pages/home.css`.

## Adding a new page
1. `src/components/pages/<page>/<Page>.jsx` and its sections in the same folder.
2. `src/app/<route>/page.js` that imports and returns `<Page />`.
3. `src/lib/<page>Data.js` for its data.
4. `src/styles/pages/<page>.css` for its colours, then add `@import "./pages/<page>.css";` to `globals.css`.
5. Reuse `components/common/` parts before writing new ones.

## Images
- Never put images in `public/`. Put them in `src/assets/images/<group>/`.
- Every image is imported once in `src/constants/images.js`, for example
  `import cityStreetSunset from "@/assets/images/news/city-street-sunset.jpg"`, and exported in a
  named object (`NEWS_IMAGES`). Data and components use `NEWS_IMAGES.cityStreetSunset`.

## Look and styling
- Light theme only. No dark backgrounds and no `dark:` variants.
- Newspaper style:
  - serif headlines,
  - thin grey rules between items,
  - a 2px black rule above each section title,
  - column rules between columns,
  - captions under photos.
- Do not use gradients, rounded icon buttons, coloured bars on titles, hover zoom or shadows. A link
  hover is a plain underline.
- Fonts: Source Serif 4 (`font-serif`) for the logo, headlines and section titles. Source Sans 3
  (`font-sans`) for body text. Both are loaded in `src/app/layout.js`.
- Write Tailwind classes directly in `className`. No `@apply`. No separate files of class strings.
- Never hard-code a colour (`bg-red-600`, `text-[#333]`, `bg-white`, `bg-black`). Add a variable to
  `@theme` and use its class:
  - shared colour: `theme.css`, for example `--color-brand` gives `bg-brand`, `text-brand` and `border-brand`.
  - page-only colour: `pages/<page>.css`, named with the page prefix. For example
    `--color-home-breaking` gives `text-home-breaking`.
  - Opacity works on any of them: `bg-ink/40`.
- Animations also go in the page CSS file as `--animate-<page>-<name>` plus `@keyframes`.
- Mobile first: the plain class is for phones. Then add `sm:` (640px), `md:` (768px), `lg:` (1024px)
  and `xl:` (1280px).
- Check every page at 375px, 768px and 1280px. There must be no sideways scroll and no overlap.

## Code rules
- No comments in any file in `src/` (JS, JSX, CSS). Clear names instead.
- One component per file. PascalCase `.jsx` file, default export, named the same as the file.
- Data and helper files: camelCase `.js`.
- Server components by default. Add `"use client"` only when a component needs state, effects or browser
  events (BreakingSlider, MobileMenu, NewsletterForm, TodayDate).
- Page components get the data and pass it down as props. Sections only display what they get.
- Data functions are `async` now, so swapping to Prisma later does not change the components.
- Components never import from `src/data/` directly. They go through `src/lib/`.
- Sample data uses the field names of the ER diagram (`id`, `slug`, `categoryId`, `isBreaking`,
  `breakingPriority`, `isFeatured`, `viewCount`, `publishedAt`, `metaDescription`).
- Use simple, clear English in page text.
- Accessibility: `alt` on images, `aria-label` on icon-only buttons, a single `h1` per page, and
  `motion-reduce:` on animations.

## Commands
- `npm run dev`: development server on http://localhost:3000
- `npm run lint`: must show no errors
- `npm run build`: must pass before a page is called done
