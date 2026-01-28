# Precious Metals Calculator (Gold & Silver)

A Vue.js app for computing gold and silver values using Philippine rates, purity, making/design charges, and 12% VAT. **Registration is required** before using the calculator.

## Reference rates

Gold and silver reference rates are taken from [LivePriceOfGold.com](https://www.livepriceofgold.com/):

- **Gold (PHP/gram):** [Philippines Gold Price](https://www.livepriceofgold.com/philippines-gold-price.html) — 24K, 22K, 21K, 18K, 14K, 10K, 6K.
- **Silver (PHP/gram):** [Philippines Silver Price](https://www.livepriceofgold.com/silver-price/philippines.html) — 999, 925, 900, 800.

In the app, the “Reference rates” section links to these pages and lets you apply a rate with one click. Market prices change; the source site has the latest figures.

## Formula

**Total = ((Amount in grams × Purity × Philippine rate) + Making/design charge) × 1.12**

- **Metal value** = amount (g) × purity (%) × Philippine rate (₱/gram pure)
- **Subtotal** = metal value + making/design charge
- **12% tax** applied to subtotal
- **Total** = subtotal + 12% VAT

Purities are applied so the Philippine rate is interpreted as **price per gram of pure metal** (e.g. per 24K gold gram or per 999 silver gram).

## Gold purities

- 24K (99.9%), 22K (91.6%), 18K (75%), 14K (58.5%), 10K (41.7%)

## Silver purities

- 999 Fine (99.9%), 925 Sterling (92.5%), 900 (90%), 800 (80%)

## Setup

```bash
npm install
npm run dev
```

Then open the URL shown (e.g. `http://localhost:5173`).

## Build

```bash
npm run build
npm run preview   # optional: preview production build
```

## Deploy on Vercel

1. Push the project to GitHub (or GitLab / Bitbucket).
2. Go to [vercel.com](https://vercel.com) and sign in.
3. Click **Add New…** → **Project** and import your repo.
4. Vercel will detect Vite; leave **Build Command** as `npm run build` and **Output Directory** as `dist`.
5. Click **Deploy**. The `vercel.json` in this repo configures SPA rewrites so routes like `/login`, `/register`, `/calculator` work on refresh.

To deploy from the CLI instead:

```bash
npm i -g vercel
vercel
```

Follow the prompts and deploy.

## Tech stack

- Vue 3 (Composition API)
- Vue Router
- Vite 5

## Flow

1. **Landing** → Create account or Sign in  
2. **Register** → Name, email, password (stored in `localStorage` for demo)  
3. **Login** → Email + password  
4. **Calculator** → Choose Gold or Silver, enter grams, purity, Philippine rate, making charge; see breakdown and total. Sign out returns to landing.

Auth is in-memory only (session + localStorage); no backend.
