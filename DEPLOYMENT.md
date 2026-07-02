# Deploying the MSP website to production (www.msp.sa)

This puts the site live on the internet so the admin can be updated from any computer.
Stack: Docker Compose → Postgres + NestJS backend + Angular/nginx frontend + Caddy (automatic HTTPS).

---

## 0. What you need before starting
- A DigitalOcean droplet running **Ubuntu 24.04** and its **IP address** (e.g. `164.92.10.20`).
- Access to your **domain DNS** settings (where msp.sa is managed).
- The file `.env.production` from this project (contains the production secrets).

---

## 1. Point the domain at the server (DNS)
In your domain registrar / DNS panel for **msp.sa**, add two records pointing at the droplet IP:

| Type | Name  | Value (your droplet IP) |
|------|-------|--------------------------|
| A    | `www` | `164.92.10.20`           |
| A    | `@`   | `164.92.10.20`           |

> DNS can take a few minutes to a couple of hours to propagate. HTTPS will not
> work until `www.msp.sa` actually resolves to the server, so do this first.

---

## 2. Log into the server
From your PC's terminal:
```bash
ssh root@164.92.10.20
```
Enter the root password you set when creating the droplet.

---

## 3. Install Docker (one time)
Paste this on the server:
```bash
curl -fsSL https://get.docker.com | sh
```

---

## 4. Copy the project up to the server
**Easiest option — clone or upload the project**, then from the project folder copy the
production secrets file into place as `.env`:

```bash
# (inside the project folder on the server)
cp .env.production .env
```

> If you prefer, upload the whole `14_MSP_Website` folder with `scp` or any SFTP
> tool (e.g. WinSCP) into `/root/msp` on the server.

---

## 5. Build and start everything
From the project folder on the server:
```bash
docker compose -f docker-compose.prod.yml up -d --build
```
First build takes a few minutes. Check it's running:
```bash
docker compose -f docker-compose.prod.yml ps
```

---

## 6. Seed the database (one time only)
Creates the admin account + starter content:
```bash
docker compose -f docker-compose.prod.yml exec backend node dist/database/seeds/seed.js
```

---

## 7. Done — visit the site
- Public site: **https://www.msp.sa**
- Admin login: **https://www.msp.sa/admin**
  - Email: `admin@msp.sa`
  - Password: *(the SEED_ADMIN_PASSWORD in your `.env`)*

Caddy fetches the HTTPS certificate automatically the first time someone visits —
allow a few seconds on the very first load.

---

## Everyday operations

**Update the site after code changes** (re-upload code, then):
```bash
docker compose -f docker-compose.prod.yml up -d --build
```

**View logs:**
```bash
docker compose -f docker-compose.prod.yml logs -f backend
```

**Back up the database:**
```bash
docker compose -f docker-compose.prod.yml exec db pg_dump -U msp msp_db > backup_$(date +%F).sql
```

**Stop / start:**
```bash
docker compose -f docker-compose.prod.yml down     # stop
docker compose -f docker-compose.prod.yml up -d     # start
```

---

## Security notes (already handled in the prod config)
- Database and backend are **not** exposed to the internet — only Caddy's ports 80/443 are.
- Strong random DB password, JWT secrets, and admin password are set in `.env`.
- HTTPS is automatic and auto-renews via Caddy/Let's Encrypt.
- **After first login, change the admin password** in the admin UI if you want one you'll remember.
- Keep `.env` private; never commit it to git.
