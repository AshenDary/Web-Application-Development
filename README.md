# STASH marketplace

A MERN school project for a small premium-goods store. Visitors can browse products; registered users can place orders and earn points; administrators manage the catalog, orders, inventory, and activity history.

## Stack

React, Vite, Tailwind CSS, Express, MongoDB/Mongoose, JWT cookies, bcrypt, Zod, Helmet, and express-rate-limit.

## Setup

1. Copy `Activity_1/Noel/.env.example` to `.env` and set `VITE_API_URL`.
2. Copy `Activity_1/Noel/server/.env.example` to `.env`, then set `MONGODB_URI`, `JWT_SECRET`, `SEED_ADMIN_EMAIL`, and `SEED_ADMIN_PASSWORD`.
3. Run `npm install` in `Activity_1/Noel` and `Activity_1/Noel/server`.
4. Run `npm run seed` in `server`, then start `npm run dev` in both folders.

| Variable | Purpose |
| --- | --- |
| MONGODB_URI | MongoDB Atlas connection string |
| JWT_SECRET | 48-byte random hex secret |
| CLIENT_ORIGIN | Frontend origin |
| SEED_ADMIN_EMAIL / SEED_ADMIN_PASSWORD | Initial admin credentials |
| VITE_API_URL | Frontend API base URL |

## Scripts

Frontend: `npm run dev`, `npm run build`. Server: `npm run dev`, `npm start`, `npm run seed`, `npm test`.

## API

| Area | Endpoints |
| --- | --- |
| Auth | `/api/auth/register`, `/login`, `/logout`, `/me` |
| Products | `GET /api/products`, `/hot-drops`, `/:id`; admin POST/PUT/DELETE and stock PATCH |
| Orders | `POST /api/orders`, `GET /api/orders/mine` |
| Admin | `/api/admin/orders`, `/activity`, `/stats` |
| Other | `GET /api/rewards`, `POST /api/activity` |

## Data model

| Collection | Main fields | Relation |
| --- | --- | --- |
| User | name, email, passwordHash, role, points | — |
| Product | name, slug, category, rarity, price, stock | createdBy → User |
| Order | items, total, status, pointsEarned | user → User; items.product → Product |
| Reward | name, description, pointsRequired | — |
| ActivityLog | action, metadata, IP, userAgent, createdAt | user → User |

## Security

Passwords are bcrypt-hashed. JWTs are httpOnly, SameSite=Lax cookies. The API uses Helmet, origin-limited CORS, request-size limits, rate limiting, NoSQL sanitization, Zod validation, centralized error handling, server-enforced roles, atomic stock updates, and non-blocking activity logging that excludes secrets.

## Manual checks

- Register, log in, and log out.
- Browse, search, filter, and add a product to cart.
- Place an order and verify stock/points update.
- Sign in as the seeded admin and inspect product, order, and activity pages.
- Verify Atlas collections: users, products, orders, rewards, activitylogs.
