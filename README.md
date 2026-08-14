# Portfolio — Aryan

A full-stack developer portfolio with an editorial, cream-and-ink visual system, oversized grotesk typography, a case-study-style project showcase, and a minimal admin panel.

## Tech Stack

- **Frontend** — React 19, Vite 8, Tailwind v4, Framer Motion
- **Scroll** — Lenis smooth scrolling (desktop, disabled for `prefers-reduced-motion`)
- **Backend** — Node.js (raw HTTP server, no framework), JWT auth, MongoDB
- **Deploy** — Frontend on Vercel, Backend on Vercel (serverless)

## Features

- Editorial design system — cream `#F5EDC9` / ink `#111111`, 1px hairlines, Archivo display type + Space Mono labels
- Art-directed hero with staggered masked type reveals and geometric accents
- Case-study style project showcase with hand-drawn line-art wireframes per project
- Editorial capabilities list, statement-driven intro and about sections
- Full-screen black navigation menu
- Custom cursor (desktop only, respects reduced motion + touch devices)
- Horizontal marquee rhythm strips
- Web3Forms contact form
- Admin panel (dashboard, projects, skills, profile CRUD)
- Responsive at every breakpoint, `prefers-reduced-motion` support throughout

## Getting Started

```bash
# frontend
cd portfolio
npm install
npm run dev

# backend (separate terminal)
cd backend
npm install
cp .env.example .env   # fill in your secrets
npm run dev
```

## Project Structure

```
portfolio/          # React frontend (Vite)
  src/
    App.jsx         # Main app, Lenis init, skip-link
    api.js          # Backend API helpers
    data.js         # Fallback projects, capabilities, socials
    lib/
      scroll.js     # Lenis lifecycle + anchor scrolling
    components/
      Nav.jsx       # Wordmark + full-screen menu overlay
      Hero.jsx      # Oversized type, rotating badge, geometric accents
      Intro.jsx     # Personal statement + marquee
      Projects.jsx  # Editorial case-study showcase
      ProjectVisual.jsx # Inline SVG line-art wireframes
      Capabilities.jsx  # Editorial capability rows
      About.jsx     # Statement + metadata
      Contact.jsx   # Web3Forms contact form
      Footer.jsx    # Black finale CTA + socials
      Marquee.jsx   # Horizontal running text
      Reveal.jsx    # Scroll-triggered reveal wrapper
      Cursor.jsx    # Custom cursor
  public/
    favicon.svg

backend/            # Node.js backend
  server.js         # HTTP server, routing, auth
  api/              # auth, projects, skills, profile, ai
  admin/            # Static admin HTML/JS/CSS
  lib/              # JWT auth, MongoDB connection
```

## Admin Panel

| Route | Auth Required |
|---|---|
| `/admin/login` | No |
| `/admin/dashboard` | Yes |
| `/admin/projects` | Yes |
| `/admin/skills` | Yes |
| `/admin/profile` | Yes |

Login with the credentials set in `backend/.env`.

## Environment Variables

```env
JWT_SECRET=random256bithex
SETUP_KEY=random256bithex
ADMIN_EMAIL=admin@example.com
ADMIN_PASSWORD=yourpassword
MONGODB_URI=mongodb+srv://<user>:<password>@cluster.xxxxx.mongodb.net/
GEMINI_API_KEY=your_gemini_api_key_here
```

### MongoDB Setup (Required)

The backend stores projects, skills, profile, and admin data in MongoDB.

1. Go to [mongodb.com/atlas](https://www.mongodb.com/atlas) and create a free cluster
2. In your cluster, click **Connect** → **Drivers**
3. Copy the connection string (looks like `mongodb+srv://<user>:<password>@cluster.xxxxx.mongodb.net/`)
4. Set it as `MONGODB_URI` in your `.env`
5. The backend auto-creates a database called `myfolio` with collections:
   - `users` — admin accounts
   - `projects` — portfolio projects
   - `skills` — skill categories
   - `profile` — site profile data

### Gemini API Setup (Optional)

Used by the admin panel's AI project draft feature.

1. Go to [aistudio.google.com/apikey](https://aistudio.google.com/apikey)
2. Click **Create API Key** (free tier available)
3. Copy the key and set it as `GEMINI_API_KEY` in your `.env`

The integration uses the `gemini-2.5-flash` model for generating project descriptions from prompts.

## Deployment

Both frontend and backend deploy to Vercel. Push to `main` to auto-deploy.

The backend `vercel.json` rewrites `/admin/*` and `/api/*` to the serverless function.
