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