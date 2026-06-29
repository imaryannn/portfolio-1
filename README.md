# Portfolio — Aryan

A full-stack developer portfolio with a glass-morphism design, smooth scroll animations, and a minimal admin panel.

## Tech Stack

- **Frontend** — React 19, Vite 8, Tailwind v4, Framer Motion
- **Backend** — Node.js (raw HTTP server, no framework), JWT auth
- **Video** — H.264 hero background with mouse-driven seeking
- **Deploy** — Frontend on Vercel, Backend on Vercel (serverless)

## Features

- Smooth Lenis scroll (desktop only)
- Slide-in/out scroll-triggered animations
- Glass-card UI with backdrop blur
- Hero video background seeking on mouse move
- Admin panel (dashboard, projects, skills, profile CRUD)
- Web3Forms contact form
- Responsive with hamburger nav on mobile

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
    App.jsx         # Main app, Lenis init, context
    Nav.jsx         # Desktop pill + mobile hamburger
    SlideIn.jsx     # Scroll-triggered slide/fade
    HeroSection.jsx # Hero with video bg
    About.jsx
    Projects.jsx
    Skills.jsx
    Contact.jsx
    Footer.jsx
    PageBackground.jsx
  public/
    hero.mp4
    favicon.svg

backend/            # Node.js backend
  server.js         # HTTP server, routing, auth
  api/
    auth/login.js   # Rate-limited login
    admin/index.js  # Admin file server + JWT check
    projects.js     # CRUD
    skills.js
    profile.js
  admin/            # Static admin HTML/JS/CSS
  lib/
    auth.js         # JWT, password hash
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
