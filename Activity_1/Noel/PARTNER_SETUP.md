# STASH partner setup

This guide starts the project on another computer without sharing secrets or local database files.

## 1. Get the code

```bash
git clone https://github.com/AshenDary/Web-Application-Development.git
cd Web-Application-Development
git checkout feature/backend-mongodb
```

## 2. Install packages

```bash
npm --prefix Activity_1/Noel/Frontend install
npm --prefix Activity_1/Noel/Backend/Server install
```

## 3. Install or connect MongoDB

### Option A: MongoDB Atlas (recommended for sharing)

1. Create a free MongoDB Atlas project and database deployment.
2. Create a database user with a strong password.
3. Add the computer IP address in Atlas Network Access (for class work, `0.0.0.0/0` is simple but less secure).
4. Copy the Node.js connection string. Replace the username, password, and database name.

### Option B: local MongoDB

Install MongoDB Community Server, start it, then use:

```text
mongodb://127.0.0.1:27017/stash_marketplace
```

Local MongoDB is only on that computer. Use Atlas if you both need the same products, accounts, orders, and activity logs.

## 4. Create local environment files

Copy the examples. These files are ignored by Git and must never be committed or sent in chat.

```bash
cp Activity_1/Noel/Frontend/.env.example Activity_1/Noel/Frontend/.env
cp Activity_1/Noel/Backend/Server/.env.example Activity_1/Noel/Backend/Server/.env
```

Set `Activity_1/Noel/Frontend/.env`:

```env
VITE_API_URL=http://127.0.0.1:5055/api
```

Set `Activity_1/Noel/Backend/Server/.env`:

```env
PORT=5055
MONGODB_URI=your_connection_string
JWT_SECRET=generate_a_long_random_secret
JWT_EXPIRES_IN=7d
CLIENT_ORIGIN=http://127.0.0.1:5175
NODE_ENV=development
SEED_ADMIN_EMAIL=your_admin_email
SEED_ADMIN_PASSWORD=your_strong_admin_password
```

Generate a JWT secret with:

```bash
openssl rand -hex 48
```

## 5. Seed the database

The seed creates an admin account, 42 products, active hot drops, and rewards. It is safe to run more than once.

```bash
npm --prefix Activity_1/Noel/Backend/Server run seed
```

Log in with the `SEED_ADMIN_EMAIL` and `SEED_ADMIN_PASSWORD` values you chose.

## 6. Run the app

Open two terminals.

Terminal 1:

```bash
npm --prefix Activity_1/Noel/Backend/Server start
```

Terminal 2:

```bash
npm --prefix Activity_1/Noel/Frontend run dev -- --host 127.0.0.1 --port 5175
```

Open http://127.0.0.1:5175.

## Troubleshooting

- **Connection refused:** confirm both terminals show they are running and the URLs/ports match the `.env` files.
- **CORS error:** `CLIENT_ORIGIN` must exactly match the Vite URL, including port.
- **Database connection failed:** check Atlas network access, credentials, and the connection string.
- **bcrypt module error:** run `npm --prefix Activity_1/Noel/Backend/Server rebuild bcrypt`.
- **Port already in use:** select unused ports and update `PORT`, `VITE_API_URL`, and `CLIENT_ORIGIN` to match.

## Before submission

- Verify `.env`, `node_modules`, `dist`, logs, and database data are not committed.
- Take screenshots of the marketplace, hot drops, cart, login/register, rewards, orders, admin pages, and Atlas collections.
- Run `npm --prefix Activity_1/Noel/Frontend run build`.
