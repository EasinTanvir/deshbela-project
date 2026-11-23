# DESHBELA News Portal

DESHBELA is an online news portal for Real Capita Group. It has three parts:

- a public website for readers,
- an admin panel (CMS) for editors and administrators,
- a dashboard for reporters.

This project is my practicum (internship) work for the BCSE degree. All features come from the
Software Requirements Specification (SRS), *DESHBELA News Portal Requirements Engineering Document*.
No feature is added that the SRS does not ask for. Section numbers such as 4.1 below refer to that document.

## Tech stack

- Next.js 16 (App Router) with React 19
- Tailwind CSS 4
- Prisma with MongoDB (planned)

## Getting started

```bash
npm install
npm run dev
```

Open http://localhost:3000 in the browser.

## Folder structure

```
src/
  app/                       routes (each page.js only imports its page component; dynamic routes also list their slugs and metadata)
  assets/images/news/        sample news photos
  constants/images.js        imports every image and exports it with a label (NEWS_IMAGES)
  components/
    pages/home/              Home.jsx and every section of the home page
    pages/article/           Article.jsx and the parts of the news details page
    pages/category/          Category.jsx and the parts of the category page
    pages/tag/               Tag.jsx and the parts of the tag page
    pages/search/            Search.jsx, the search form and the result list
    pages/author/            Author.jsx and the parts of the reporter page
    pages/notFound/          NotFound.jsx, the 404 page
    common/                  reusable parts: NewsCard, SectionTitle, CategoryBadge, AdSlot, Breadcrumb, RankedNewsList, TagList ...
    layout/                  Header, NavLinks, Footer, MobileMenu, NewsletterForm
  data/                      sample data (until the database is ready)
  lib/                       data functions (homeData.js, articleData.js, categoryData.js, tagData.js, searchData.js, authorData.js, notFoundData.js, siteData.js) and helpers
  styles/
    globals.css              main stylesheet
    theme.css                shared colours and fonts
    pages/home.css           home page colours and ticker animation
    pages/article.css        news details colours (sponsored label, members-only box)
```

Tailwind classes are written directly in each component. Colours are not hard-coded: each one is a named
variable in `theme.css` (shared) or `styles/pages/<page>.css` (one page). For example
`--color-home-breaking` gives the class `text-home-breaking`.

Fonts: Source Serif 4 for headlines and Source Sans 3 for body text. The site uses a light theme only.
The full set of conventions is in `CLAUDE.md`.

## Pages built so far

| Route | Page | Sections |
|---|---|---|
| `/` | Home (SRS 4.1) | Live news ticker, Top Stories, breaking news slider, Trending, banner ad, Featured, news by category, Video, Popular, Latest Updates |
| `/news/[slug]` | News details (SRS 4.3, 4.6, 4.8, 4.9) | Breadcrumb, headline, authors, sponsored label, members-only notice, share links, save button, photo with caption, body, tags, reactions, comments, related news, Latest and Most Read sidebar, ads, NewsArticle schema markup |
| `/category/[slug]` | Category (SRS 4.3) | Breadcrumb, sub-category links, lead story, more news list, Most Read in the category, ad |
| `/tag/[slug]` | Tag (SRS 4.2) | Breadcrumb, topic name and story count, lead story, list of the other stories, Other Topics, Most Read, ad |
| `/search` | Search (SRS 4.4) | Keyword box, category, author and date filters, result count and list, Popular Topics, ad |

| `/author/[slug]` | Author (SRS 4.4) | Breadcrumb, reporter name, designation and bio, story count, list of their news, Other Reporters, ad |
| (any wrong URL) | Not found (404) | Message, search box, links to the front page and sections, Latest News |

Next pages to build: `/about` (About Us, #15) and `/contact` (Contact Us, #16). Both are Must.
After them, the rest of the public pages in the order of the table below.

## Users

| User | What they can do |
|---|---|
| Visitor | Reads news, searches, shares and watches media without an account. |
| Registered Reader | Everything a visitor can do. Also comments, reacts, bookmarks, subscribes and gets a personal feed and notifications. |
| Subscriber / Member | A registered reader with a paid membership. |
| Reporter | Submits articles and sees own dashboard and performance. |
| Editor | Reviews, approves, schedules and publishes articles. Sets breaking news priority. Moderates comments. |
| Administrator | Manages users, roles, categories, ads, memberships, SEO, backups and reports. |

Reporter, Editor and Administrator are staff. Staff log in with two-factor authentication (4.10).

## Frontend pages

Priority follows the SRS: **Must** = first release, **Should** = if time allows, **Could** = optional or later.
When a page covers several requirements, it takes the highest priority among them.

### 1. Public website

| # | Route | Page | What it contains | SRS | Priority |
|---|---|---|---|---|---|
| 1 | `/` | Home | Breaking news slider, live news ticker, Top Stories, Trending News, Featured News, news by category, Video News, Popular Articles, Latest Updates, ad slots | 4.1, 4.3, 4.6 | Must |
| 2 | `/news/[slug]` | Article details | Full article, authors, sponsored label, social share buttons, bookmark, reactions, comments, related news, ad slots, schema markup, AI summary and translation (Could) | 4.3, 4.8, 4.9, 4.12 | Must |
| 3 | `/category/[slug]` | Category | Articles of one category, with its sub-categories | 4.3 | Must |
| 4 | `/tag/[slug]` | Tag | Articles with one tag | 4.2 | Must |
| 5 | `/author/[slug]` | Author | Articles written by one author | 4.4 | Should |
| 6 | `/search` | Search | Keyword search with category, date range and author filters, voice search button (Could) | 4.4 | Must |
| 7 | `/videos` | Video news | List of video news | 4.7 | Should |
| 8 | `/videos/[slug]` | Video details | Video player (YouTube embed) and description | 4.7 | Should |
| 9 | `/live` | Live stream | Current live stream | 4.7 | Should |
| 10 | `/gallery` | Photo gallery | List of photo galleries | 4.7 | Should |
| 11 | `/gallery/[slug]` | Gallery details | Photos of one gallery | 4.7 | Should |
| 12 | `/podcasts` | Podcasts | Podcast episodes with audio player | 4.7 | Could |
| 13 | `/membership` | Membership plans | Plans and prices, buy button that goes to the payment gateway | 4.6 | Should |
| 14 | `/membership/result` | Payment result | Success or failure message after payment | 4.6 | Should |
| 15 | `/about` | About Us | Static page | 4.13 | Must |
| 16 | `/contact` | Contact Us | Contact details and contact form with spam protection | 4.13, 4.10 | Must |
| 17 | `/privacy-policy` | Privacy Policy | Static page | 4.13 | Must |
| 18 | `/terms` | Terms and Conditions | Static page | 4.13 | Must |
| 19 | `/advertise` | Advertise With Us | Ad information and advertiser inquiry form | 4.13 | Should |
| 20 | `/editorial-policy` | Editorial Policy | Static page | 4.13 | Should |
| 21 | `/career` | Career | Static page | 4.13 | Could |
| 22 | (any wrong URL) | Not found (404) | Message and links back to the site | - | Must |

### 2. Login and registration

| # | Route | Page | What it contains | SRS | Priority |
|---|---|---|---|---|---|
| 23 | `/register` | Register | Registration form for readers | 4.8 | Must |
| 24 | `/login` | Log in | Login form for readers and staff | 4.8 | Must |
| 25 | `/login/verify` | Two-factor code | Code sent by email, for staff accounts only | 4.10 | Must |

### 3. Reader account (logged-in readers)

| # | Route | Page | What it contains | SRS | Priority |
|---|---|---|---|---|---|
| 26 | `/account` | My profile | Name, email, password change | 4.8 | Must |
| 27 | `/account/bookmarks` | Bookmarks | Saved articles | 4.3 | Should |
| 28 | `/account/notifications` | Notifications | Newsletter and push notification settings | 4.8 | Should |
| 29 | `/account/membership` | My membership | Current plan, expiry date, payment history | 4.6 | Should |
| 30 | `/account/feed` | My news feed | Personalised feed and favourite categories | 4.8, 4.12 | Could |

### 4. Reporter dashboard (Reporter role)

| # | Route | Page | What it contains | SRS | Priority |
|---|---|---|---|---|---|
| 31 | `/reporter` | Dashboard | Summary of own articles by status | 4.5 | Must |
| 32 | `/reporter/articles` | My articles | Own articles with status (Draft, In review, Rejected, Scheduled, Published) | 4.5 | Must |
| 33 | `/reporter/articles/new` | Submit article | Article form, save as draft or submit for review | 4.5 | Must |
| 34 | `/reporter/articles/[id]` | Edit article | Edit a draft or rejected article, see editor feedback, submit again | 4.2, 4.5 | Must |
| 35 | `/reporter/media` | My media | Upload images and files for own articles | 4.2 | Must |
| 36 | `/reporter/profile` | My profile | Reporter profile (photo, bio) | 4.5 | Must |
| 37 | `/reporter/performance` | Performance | Own published articles, views and approval rate | 4.5 | Should |

### 5. Admin panel / CMS (Editor and Administrator roles)

The menu shows only the pages allowed for the user's role (role-based access control, 4.10).
E = Editor, A = Administrator.

| # | Route | Page | What it contains | Role | SRS | Priority |
|---|---|---|---|---|---|---|
| 38 | `/admin` | Dashboard | Overview of content, reviews waiting, latest comments and messages | E, A | 4.2 | Must |
| 39 | `/admin/articles` | Articles | All articles with filters by status, category and author | E, A | 4.2 | Must |
| 40 | `/admin/articles/new` | New article | Article form: content, authors, category, tags, slug, featured image, meta title and description, featured, breaking, schedule date | E, A | 4.2, 4.3, 4.9 | Must |
| 41 | `/admin/articles/[id]` | Edit article | Same form as above, delete button | E, A | 4.2 | Must |
| 42 | `/admin/reviews` | Review queue | Articles waiting for review | E, A | 4.2, 4.5 | Must |
| 43 | `/admin/reviews/[id]` | Review article | Read the article, approve or reject with feedback, publish now or schedule | E, A | 4.2, 4.5 | Must |
| 44 | `/admin/breaking-news` | Breaking news | Set the order of breaking news in the slider and ticker | E, A | 4.3 | Must |
| 45 | `/admin/categories` | Categories | Create, edit and delete categories and sub-categories | A | 4.2, 4.3 | Must |
| 46 | `/admin/tags` | Tags | Create, edit and delete tags | E, A | 4.2 | Must |
| 47 | `/admin/media` | Media library | Upload, organise and reuse images and files | E, A | 4.2 | Must |
| 48 | `/admin/comments` | Comments | Approve, hide or delete comments, spam list | E, A | 4.8, 4.10 | Should |
| 49 | `/admin/videos` | Video news | Add and edit video news (YouTube links) | E, A | 4.7 | Should |
| 50 | `/admin/live` | Live stream | Set the live stream link and status | E, A | 4.7 | Should |
| 51 | `/admin/galleries` | Photo galleries | Create galleries and add photos | E, A | 4.7 | Should |
| 52 | `/admin/podcasts` | Podcasts | Add and edit podcast episodes | E, A | 4.7 | Could |
| 53 | `/admin/users` | Users and roles | All users, assign roles, block users, manage author accounts | A | 4.2, 4.10 | Must |
| 54 | `/admin/reporters` | Reporters | Create and edit reporter profiles | A | 4.5 | Must |
| 55 | `/admin/reporters/[id]` | Reporter performance | Articles, views and approval rate of one reporter | A | 4.5 | Should |
| 56 | `/admin/ads` | Banner ads | Create, place, schedule and remove banner ads | A | 4.6 | Must |
| 57 | `/admin/ads/[id]` | Ad statistics | Views and clicks of one ad by day | A | 4.6 | Should |
| 58 | `/admin/sponsored` | Sponsored content | Mark articles as sponsored, sponsor name and period | A | 4.6 | Should |
| 59 | `/admin/memberships` | Memberships | Membership plans, members and payments | A | 4.6 | Should |
| 60 | `/admin/newsletter` | Newsletter | Newsletter subscribers | A | 4.8 | Should |
| 61 | `/admin/notifications` | Push notifications | Send a push notification to subscribed readers, sent list | E, A | 4.8 | Should |
| 62 | `/admin/messages` | Messages | Contact messages and advertiser inquiries | A | 4.13 | Must |
| 63 | `/admin/pages` | Website pages | Edit content and meta tags of About, Contact, Privacy and other pages | A | 4.9, 4.13 | Must |
| 64 | `/admin/seo` | SEO settings | Site title, default meta tags, social preview image, Google News settings | A | 4.9 | Must |
| 65 | `/admin/reports` | Reports | Most read news, real-time visitors, user behaviour, revenue, ad analytics (data from Google Analytics and the portal) | A | 4.11, 4.6 | Should |
| 66 | `/admin/backups` | Backups | Backup history and run a backup now | A | 4.10 | Must |
| 67 | `/admin/settings` | Site settings | Site name, logo, social media links, Google AdSense and Google Analytics IDs | A | 4.6, 4.7, 4.11 | Must |

### 6. Generated files (no visible page)

| Route | What it is | SRS | Priority |
|---|---|---|---|
| `/sitemap.xml` | XML sitemap, built automatically | 4.9 | Must |
| `/news-sitemap.xml` | Google News sitemap | 4.9 | Should |
| `/robots.txt` | Rules for search engine crawlers | 4.9 | Must |
| `/manifest.webmanifest` | PWA manifest so the site can be installed | 4.12 | Should |

### Shared parts used on many pages

These are components, not separate pages:

- Header with menu, categories and search box; footer with links to the essential pages (4.13).
- Live news ticker and breaking news slider (4.1).
- Social share buttons and Open Graph preview tags (4.3, 4.9).
- Newsletter subscribe form in the footer (4.8).
- Ad slots for banner ads and Google AdSense (4.6).
- Push notification permission prompt (4.8).

### Requirements that need no frontend page

- SSL (HTTPS) and firewall protection (4.10): set up on the server and hosting.
- Scheduled publishing: the system publishes scheduled articles automatically.
- Android and iOS app integration (4.12, Could): served by the backend API.
- Google Analytics tracking (4.11): a script added to every public page.

### Page count

| Area | Pages |
|---|---|
| Public website | 22 |
| Login and registration | 3 |
| Reader account | 5 |
| Reporter dashboard | 7 |
| Admin panel | 30 |
| **Total** | **67** |
