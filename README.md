# TechCore

Marketing website and lead-management system for TechCore, a software development agency. The public site shows services, solutions, case studies, a blog and engagement plans, and it collects leads through contact, appointment and partnership forms. A private admin dashboard lets the team manage those leads and publish content.

## Tech stack

| Layer    | Technology                                                        |
| -------- | ----------------------------------------------------------------- |
| Frontend | React 19, Vite 7, React Router 7, Tailwind CSS 4, lucide-react, react-helmet-async (SEO) |
| Backend  | Node.js 22, Express 5                                             |
| Database | PostgreSQL, accessed through Prisma ORM 5                        |
| Auth     | JWT stored in an HttpOnly cookie, passwords hashed with bcrypt    |
| Email    | Resend                                                            |
| Jobs     | node-cron (automatic follow-up emails)                            |
| Hosting  | Docker (Nginx serves the frontend and proxies `/api` to the backend) |

## Project structure

```
TechCore/
├── client/                     # React frontend
│   ├── src/
│   │   ├── App.jsx             # All page routes
│   │   ├── Navbar/             # Site navigation
│   │   ├── components/         # AdminGuard, LeadModal, SEO
│   │   ├── hooks/useLeadCapture.js  # Sends leads with page + UTM tracking
│   │   ├── lib/api.js          # API base URL
│   │   ├── utils/validate.js   # Form validation
│   │   └── pages/
│   │       ├── services/       # Home + 9 service pages
│   │       ├── solutions/      # Startup, Enterprise, White Label
│   │       ├── Company/        # About, Partnership, How We Work, Why Choose Us
│   │       ├── resources/      # Blog, BlogPost, Appointment
│   │       ├── admin/          # Login, Dashboard, Blog editor
│   │       ├── Contact.jsx, Work.jsx, NotFound.jsx
│   ├── public/                 # robots.txt, sitemap.xml
│   ├── nginx.conf              # Production web server + API proxy
│   └── Dockerfile
│
└── server/                     # Express API
    ├── server.js               # App entry: middleware, rate limits, routes
    ├── prisma/
    │   ├── schema.prisma       # Database models
    │   └── migrations/         # SQL migrations
    ├── scripts/create-admin.js # Creates an admin account from the terminal
    ├── src/
    │   ├── routes/             # URL → controller mapping
    │   ├── controllers/        # Request handling and business logic
    │   ├── middleware/auth.js  # requireAuth / requireSuperAdmin
    │   ├── jobs/followUpCron.js
    │   └── lib/prisma.js       # Shared Prisma client
    └── Dockerfile
```

## Getting started (local development)

### Prerequisites

- Node.js 22+
- PostgreSQL 14+ running locally
- A [Resend](https://resend.com) API key, for sending emails

### 1. Backend

```bash
cd server
npm install
createdb techcore                 # create the database
```

Create `server/.env`:

```env
DATABASE_URL="postgresql://<user>@localhost:5432/techcore?schema=public"
JWT_SECRET="<long random string>"
RESEND_API_KEY="<your Resend key>"
RECEIVER_EMAIL="<inbox that gets new-submission alerts>"
# Optional
ALLOWED_ORIGIN="http://localhost:5173"   # frontend URL allowed by CORS
NODE_ENV="development"                   # "production" makes the auth cookie secure-only
```

Set up the database and start the server:

```bash
npx prisma migrate dev            # creates tables and generates the Prisma client
npm run create-admin              # create your first admin login
npm run dev                       # http://localhost:3000
```

### 2. Frontend

```bash
cd client
npm install
npm run dev                       # http://localhost:5173
```

The frontend calls `http://localhost:3000/api` by default. Set `VITE_API_URL` to point it somewhere else.

### Useful scripts

| Where  | Command                | What it does                        |
| ------ | ---------------------- | ----------------------------------- |
| server | `npm run dev`          | Start API with `.env` loaded        |
| server | `npm start`            | Start API (env vars from the system) |
| server | `npm run create-admin` | Create an admin account             |
| server | `npx prisma migrate dev --name <change>` | Apply a schema change |
| server | `npx prisma studio`    | Browse the database in the browser  |
| client | `npm run dev`          | Start the dev server                |
| client | `npm run build`        | Production build into `dist/`       |
| client | `npm run lint`         | Run ESLint                          |

## Frontend pages

**Public** (shown with the navbar)

| Path | Page |
| ---- | ---- |
| `/` | Home |
| `/services/web-development`, `app-development`, `software-development`, `ai-automation`, `cloud-devops`, `security-managed-it`, `blockchain-development`, `growth-marketing`, `dedicated-team` | Service pages |
| `/solutions/startup`, `enterprise`, `white-label` | Solution pages |
| `/company/about`, `partnership`, `how-we-work`, `why-choose-us` | Company pages |
| `/resources/blog`, `/resources/blog/:slug` | Blog list and post |
| `/resources/appointment` | Book a call |
| `/work` | Case studies |
| `/contact` | Contact form |

**Admin** (no navbar; everything except the login page is protected by `AdminGuard`)

| Path | Page |
| ---- | ---- |
| `/admin` | Login |
| `/admin/dashboard` | Dashboard with tabs: Overview, Contacts, Leads, Appointments, Partners, Blog, Case Studies, Engagement Plans |
| `/admin/blog/new`, `/admin/blog/:id` | Create or edit a blog post |

## API reference

Base URL: `/api`. 🔒 means you must be logged in (the admin cookie is required).

| Method | Endpoint | Auth | Purpose |
| ------ | -------- | ---- | ------- |
| POST | `/admin/login` | | Log in and set the `admin_token` cookie (valid 30 days) |
| POST | `/admin/logout` | | Clear the cookie |
| GET | `/admin/me` | 🔒 | Current admin |
| POST | `/contact` | | Submit the contact form |
| GET | `/contact` | 🔒 | List contacts |
| PATCH | `/contact/:id/status` | 🔒 | Update status (`new` / `read` / `replied`) |
| POST | `/leads` | | Capture a lead (with source page + UTM tags) |
| GET | `/leads` | 🔒 | List leads |
| PATCH | `/leads/:id/status` | 🔒 | Update lead status |
| POST | `/appointments` | | Book an appointment |
| GET | `/appointments` | 🔒 | List appointments |
| PATCH | `/appointments/:id/status` | 🔒 | Update status |
| POST | `/partners` | | Submit a partnership application |
| GET | `/partners` | 🔒 | List applications |
| PATCH | `/partners/:id/status` | 🔒 | Update status |
| GET | `/blog` | | Published posts |
| GET | `/blog/:slug` | | One post |
| GET | `/blog/admin/all` | 🔒 | All posts, including drafts |
| POST / PATCH / DELETE | `/blog`, `/blog/:id` | 🔒 | Create / edit / delete a post |
| GET | `/case-studies`, `/case-studies/:id` | | Published case studies |
| GET | `/case-studies/admin/all` | 🔒 | All case studies |
| POST / PATCH / DELETE | `/case-studies`, `/case-studies/:id` | 🔒 | Manage case studies |
| GET | `/engagement-plans` | | Active plans (the 3 default plans are created automatically if the table is empty) |
| GET | `/engagement-plans/admin/all` | 🔒 | All plans |
| POST / PATCH / DELETE | `/engagement-plans`, `/engagement-plans/:id` | 🔒 | Manage plans |
| GET | `/analytics` | 🔒 | Dashboard stats: totals, status breakdowns, top services and sources, leads over the last 7 days |

**Rate limits** (per IP, per 15 minutes): 30 requests on the public form routes (contact, leads, appointments, partners) and 10 on `/admin`.

## Database models

Defined in `server/prisma/schema.prisma`. All IDs are string CUIDs.

| Model | Stores | Notes |
| ----- | ------ | ----- |
| `Contact` | Contact form messages | status: `new` / `read` / `replied` |
| `Lead` | Leads captured across the site | Tracks `sourcePage`, UTM fields, `followUpSentAt` |
| `Appointment` | Booked calls | Optionally linked to a `Lead` (the link is cleared if the lead is deleted) |
| `Admin` | Dashboard users | Unique email, bcrypt `passwordHash`, `role` (`editor` / `super_admin`) |
| `BlogPost` | Blog articles | Unique `slug`, `draft` / published status, belongs to an `Admin` |
| `PartnerApplication` | Partnership requests | |
| `Subscriber` | Newsletter subscribers | Unique email (no API route yet) |
| `CaseStudy` | Portfolio items | `published`, `featured`, sort `order` |
| `EngagementPlan` | Pricing/engagement models | `features`, `notIncluded`, `popular`, sort `order` |

## Emails and background jobs

- **On form submission** the backend emails a confirmation to the visitor and an alert to `RECEIVER_EMAIL` (for contact, leads, appointments and partner applications).
- **Follow-up cron** (`src/jobs/followUpCron.js`) runs every hour. It finds leads that are 3 or more days old, have status `new` or `contacted`, and haven't been followed up yet. It sends each one a "Book a Free Call" email and records `followUpSentAt`. It handles at most 50 leads per run.
- Emails are currently sent from `onboarding@resend.dev` (Resend's test sender). Before going live, verify your own domain in Resend and change the `from` address.

## Authentication

1. `POST /api/admin/login` checks the email and bcrypt password, then sets a signed JWT in the HttpOnly `admin_token` cookie.
2. `requireAuth` middleware verifies that cookie on protected routes.
3. On the frontend, `AdminGuard` calls `/api/admin/me` and redirects to `/admin` if the session is missing.
4. New admins are created only from the terminal with `npm run create-admin`. There is no public sign-up route.

## Deployment (Docker)

- **`client/Dockerfile`** builds the Vite app (`VITE_API_URL` defaults to `/api`) and serves it with Nginx on port 80. `nginx.conf` proxies `/api/*` to `http://server:3000`, so the backend container must be named `server`.
- **`server/Dockerfile`** installs dependencies, generates the Prisma client, then on start runs `prisma migrate deploy` and `node server.js` on port 3000.
- Provide all backend env vars to the container. `DATABASE_URL` must point to a Postgres instance the container can reach (inside Docker, `localhost` means the container itself).

## Known issues / to-do

- `@prisma/client` is listed under `devDependencies`, but the server image installs with `npm ci --omit=dev`. Move it to `dependencies` so the production image can run.
- Emails use the Resend test sender (see above).
- The server port is hard-coded to `3000` in `server.js`.
- The `Subscriber` model has no API routes yet.
- The `requireSuperAdmin` middleware exists but no route uses it, so every admin has the same permissions.
- There are no automated tests.
