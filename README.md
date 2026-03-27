# DAITIN - Bitzer E-commerce

Commercial website and internal admin system for DAITIN, focused on Bitzer compressor products and services.

## Live Website

- Production: [https://bitzer-e-commerce.vercel.app/](https://bitzer-e-commerce.vercel.app/)

## Project Overview

- **Frontend:** Next.js App Router (`src/app`) + React 19
- **UI system:** Panda CSS + module-based component architecture
- **Database:** MongoDB + Mongoose
- **Admin auth:** NextAuth Credentials (JWT session)
- **Data fetching/client state:** TanStack Query
- **Contact email:** Nodemailer (SMTP)
- **Internationalization:** Lokalise integration + i18n hooks

## Key Features

- **Commercial website**
  - Dynamic homepage based on `layoutKey`
  - Product listing with filtering, sorting, search, and infinite scroll
  - Product detail pages with cart support and quick consultation CTA
  - Service listing/detail pages with registration CTA
  - Cart flow and contact form for purchase inquiries
  - About page, contact page, and product suggestion chatbot
- **Admin dashboard**
  - Credentials-based admin login
  - Overview statistics (products, categories, services, out-of-stock)
  - Product management (create/edit/delete, pagination, search)
  - Category management (create/delete with product relationship checks)
  - Service management (create/edit/delete)
  - Automatic route revalidation after data updates

## Directory Structure

```text
src/
  app/
    (web)/           # Public commercial pages
    (manage)/        # Admin pages
    api/             # API routes
  modules/           # Feature modules (products, services, admin, layout, ...)
  lib/               # Server actions, auth, db, integrations
  models/            # Mongoose models
docs/
  LOKALISE-WORKFLOW.md
```

## Local Setup

### 1) Install dependencies

```bash
npm install
```

### 2) Configure environment variables

Create `.env.local` and define the required variables:

```bash
NEXT_PUBLIC_APP_URL=
PORT=

SMTP_HOST=
SMTP_PORT=
SMTP_USER=
SMTP_PASSWORD=
ADMIN_EMAIL=

MONGODB_URI=

CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=
CLOUDINARY_URL=

AUTH_SECRET=
ADMIN_USERNAME=
ADMIN_PASSWORD=

LOKALISE_PROJECT_ID=
LOKALISE_API_TOKEN=
```

### 3) Run development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Scripts

- `npm run dev` - run local development server
- `npm run build` - build production
- `npm run start` - run production build
- `npm run lint` - run ESLint
- `npm run storybook` - run Storybook
- `npm run build-storybook` - build Storybook
- `npm run test:db` - test database connection
- `npm run seed:db` - seed sample data

## Security

- Do not commit `.env.local` to git.
- Protect all sensitive values: SMTP, MongoDB, Cloudinary, Auth, Lokalise.
- Admin routes are protected by middleware + server-side auth checks.

## Documentation

- Admin guide (EN): `docs/admin-user-guide.md`
- Commercial pages (EN): `docs/commercial-pages.md`
- Customer-facing admin usage guide (VI): `docs/huong-dan-van-hanh-gui-khach-hang.vi.md`
- Lokalise workflow: `docs/LOKALISE-WORKFLOW.md`
