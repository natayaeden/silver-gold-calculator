<template>
  <div class="landing">
    <div class="landing-shell">
      <header class="landing-header">
        <div class="topbar">
          <div class="brandline">
            <div class="mark" aria-hidden="true">
              <span class="icon-gold">◆</span>
              <span class="icon-silver">◇</span>
            </div>
            <div class="brandtext">
              <h1>Precious Metals</h1>
              <p class="tagline">Gold & Silver Calculator</p>
            </div>
          </div>
          <div class="top-right">
            <div class="metal-badges" aria-hidden="true">
              <span class="badge badge-gold">Gold</span>
              <span class="badge badge-silver">Silver</span>
            </div>
          </div>
        </div>
      </header>

      <main class="landing-main">
        <div class="hero-card">
          <div class="hero-glow" aria-hidden="true"></div>
          <div class="hero-copy">
            <div class="kicker">
              <span class="kicker-pill">Purity-aware</span>
              <span class="kicker-pill kicker-pill-silver">Gold & Silver</span>
              <span class="kicker-pill">Fast & simple</span>
            </div>
            <h2>Elegant, purity‑aware pricing</h2>
            <p class="intro">
              Compute gold and silver totals with Philippine rates with a clear breakdown.
            </p>

            <div class="feature-grid">
              <div class="feature">
                <div class="dot dot-gold"></div>
                <div>
                  <strong>Purity built-in</strong>
                  <p>24K–6K and common silver fineness.</p>
                </div>
              </div>
              <div class="feature">
                <div class="dot dot-silver"></div>
                <div>
                  <strong>Gold & Silver modes</strong>
                  <p>Switch between metals with a clean, guided form.</p>
                </div>
              </div>
              <div class="feature">
                <div class="dot dot-ink"></div>
                <div>
                  <strong>Transparency</strong>
                  <p>With breakdown and references.</p>
                </div>
              </div>
            </div>

            <div class="cta-row">
              <router-link to="/register" class="btn btn-gold">Create account</router-link>
              <router-link to="/login" class="btn btn-silver">Sign in</router-link>
            </div>
          </div>

          <div class="hero-art" aria-hidden="true">
            <div class="art-frame">
              <img class="art-img" :src="authHero" alt="" />
            </div>
            <p class="art-note">A clean workflow: register → sign in → calculate.</p>
          </div>
        </div>
      </main>
    </div>
  </div>
</template>

<script setup>
import authHero from '../assets/auth-hero.svg'
</script>

<style scoped>
.landing {
  min-height: 100vh;
  padding: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
}

.landing-shell {
  width: 100%;
  max-width: 980px;
}

.landing-header {
  margin-bottom: 1rem;
}

.topbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  padding: 0.9rem 1rem;
  border-radius: var(--radius-lg);
  background: rgba(255, 255, 255, 0.68);
  border: 1px solid rgba(26, 24, 20, 0.08);
  box-shadow: 0 10px 24px rgba(26, 24, 20, 0.06);
  backdrop-filter: blur(10px);
}

.brandline {
  display: flex;
  align-items: center;
  gap: 0.85rem;
}

.mark {
  width: 40px;
  height: 40px;
  border-radius: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.25rem;
  background:
    radial-gradient(ellipse 70% 60% at 30% 25%, rgba(232, 185, 35, 0.26), transparent 60%),
    radial-gradient(ellipse 70% 60% at 80% 80%, rgba(143, 156, 169, 0.20), transparent 60%),
    rgba(255, 255, 255, 0.8);
  border: 1px solid rgba(26, 24, 20, 0.08);
}

.brandtext h1 {
  font-family: var(--font-display);
  font-size: 1.5rem;
  line-height: 1.05;
  color: var(--text-primary);
  letter-spacing: 0.03em;
}

.tagline {
  font-size: 0.9rem;
  color: var(--text-muted);
}

.icon-gold {
  font-size: 1.15rem;
  color: var(--gold-400);
  text-shadow: 0 0 20px rgba(232, 185, 35, 0.4);
}

.icon-silver {
  font-size: 1rem;
  color: var(--silver-400);
  opacity: 0.9;
}

.top-right {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.metal-badges {
  display: flex;
  gap: 0.4rem;
  flex-wrap: wrap;
}

.badge {
  font-size: 0.8rem;
  font-weight: 800;
  padding: 0.5rem 1rem;
  border-radius: 999px;
  border: 1px solid rgba(26, 24, 20, 0.08);
  background: rgba(255, 255, 255, 0.7);
  color: rgba(26, 24, 20, 0.72);
}

.badge-gold {
  border-color: rgba(232, 185, 35, 0.26);
  background: rgba(232, 185, 35, 0.12);
  color: var(--gold-800);
}

.badge-silver {
  border-color: rgba(143, 156, 169, 0.26);
  background: rgba(143, 156, 169, 0.12);
  color: var(--silver-800);
}

.quick-actions {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
  justify-content: flex-end;
}

.mini-btn {
  text-decoration: none;
  font-weight: 800;
  font-size: 0.85rem;
  padding: 0.5rem 0.75rem;
  border-radius: 999px;
  border: 1px solid rgba(26, 24, 20, 0.12);
  transition: transform 0.2s ease, box-shadow 0.2s ease, background 0.2s ease;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  line-height: 1;
  white-space: nowrap;
}

.mini-btn:hover {
  transform: translateY(-1px);
}

.mini-btn-ghost {
  background: rgba(255, 255, 255, 0.7);
  color: rgba(26, 24, 20, 0.78);
}

.mini-btn-ghost:hover {
  background: rgba(255, 255, 255, 0.9);
  box-shadow: 0 10px 18px rgba(26, 24, 20, 0.08);
}

.mini-btn-gold {
  background: linear-gradient(135deg, var(--gold-500), var(--gold-600));
  border-color: rgba(232, 185, 35, 0.35);
  color: #1a1814;
  box-shadow: 0 10px 18px rgba(232, 185, 35, 0.18);
}

.mini-btn-gold:hover {
  box-shadow: 0 12px 22px rgba(232, 185, 35, 0.22);
}

.hero-card {
  display: grid;
  grid-template-columns: 1.1fr 0.9fr;
  gap: 1.5rem;
  padding: 1.5rem;
  background: var(--bg-card);
  border: 1px solid rgba(26, 24, 20, 0.08);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-glow);
  backdrop-filter: blur(10px);
  position: relative;
  overflow: hidden;
}

.hero-glow {
  position: absolute;
  inset: -120px -160px auto auto;
  width: 520px;
  height: 520px;
  border-radius: 999px;
  background:
    radial-gradient(circle at 35% 30%, rgba(232, 185, 35, 0.28), transparent 55%),
    radial-gradient(circle at 70% 60%, rgba(143, 156, 169, 0.20), transparent 58%);
  filter: blur(12px);
  animation: floatGlow 10s ease-in-out infinite;
  pointer-events: none;
}

@keyframes floatGlow {
  0%, 100% { transform: translate(0, 0) scale(1); }
  50% { transform: translate(-18px, 14px) scale(1.03); }
}

.kicker {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
  margin-bottom: 0.75rem;
}

.kicker-pill {
  font-size: 0.8rem;
  font-weight: 800;
  padding: 0.3rem 0.6rem;
  border-radius: 999px;
  background: rgba(232, 185, 35, 0.14);
  border: 1px solid rgba(232, 185, 35, 0.22);
  color: var(--gold-800);
}

.kicker-pill-silver {
  background: rgba(143, 156, 169, 0.12);
  border-color: rgba(143, 156, 169, 0.22);
  color: var(--silver-800);
}

.hero-copy h2 {
  font-family: var(--font-display);
  font-size: 2.15rem;
  line-height: 1.1;
  letter-spacing: 0.02em;
  margin-bottom: 0.5rem;
}

.intro {
  color: var(--text-muted);
  margin-bottom: 1.25rem;
  line-height: 1.7;
  max-width: 60ch;
}

.feature-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 0.9rem;
  margin-bottom: 1.25rem;
}

.feature {
  display: grid;
  grid-template-columns: 14px 1fr;
  gap: 0.65rem;
  align-items: start;
  padding: 0.75rem 0.85rem;
  border-radius: var(--radius);
  background: rgba(255, 255, 255, 0.55);
  border: 1px solid rgba(26, 24, 20, 0.07);
}

.feature strong {
  display: block;
  font-weight: 700;
  margin-bottom: 0.1rem;
}

.feature p {
  color: var(--text-muted);
  font-size: 0.9rem;
}

.dot {
  width: 10px;
  height: 10px;
  border-radius: 999px;
  margin-top: 0.35rem;
}
.dot-gold {
  background: var(--gold-500);
  box-shadow: 0 0 0 3px rgba(232, 185, 35, 0.18);
}
.dot-silver {
  background: var(--silver-500);
  box-shadow: 0 0 0 3px rgba(143, 156, 169, 0.16);
}
.dot-ink {
  background: #1a1814;
  opacity: 0.65;
  box-shadow: 0 0 0 3px rgba(26, 24, 20, 0.10);
}

.cta-row {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
}

.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.85rem 1.75rem;
  border-radius: var(--radius);
  font-weight: 600;
  text-decoration: none;
  transition: transform 0.2s, box-shadow 0.2s;
}

.btn-gold {
  background: linear-gradient(135deg, var(--gold-500), var(--gold-600));
  color: #1a1814;
  border: none;
  box-shadow: 0 4px 14px rgba(232, 185, 35, 0.35);
}

.btn-gold:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(232, 185, 35, 0.45);
}

.btn-silver {
  background: transparent;
  color: var(--silver-800);
  border: 2px solid rgba(143, 156, 169, 0.35);
}

.btn-silver:hover {
  background: rgba(143, 156, 169, 0.10);
  transform: translateY(-2px);
}

.hero-art {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  align-items: center;
  justify-content: center;
}

.art-frame {
  width: 100%;
  border-radius: var(--radius-lg);
  overflow: hidden;
  border: 1px solid rgba(26, 24, 20, 0.08);
  background:
    radial-gradient(ellipse 70% 60% at 30% 20%, rgba(232, 185, 35, 0.18), transparent 60%),
    radial-gradient(ellipse 60% 50% at 80% 70%, rgba(143, 156, 169, 0.12), transparent 60%),
    rgba(255, 255, 255, 0.65);
}

.art-img {
  width: 100%;
  height: auto;
  display: block;
  padding: 0.5rem;
}

.art-note {
  color: var(--text-muted);
  font-size: 0.85rem;
  text-align: center;
  max-width: 100ch;
}

@media (max-width: 900px) {
  .topbar {
    flex-direction: column;
    align-items: flex-start;
  }
  .top-right {
    width: 100%;
    justify-content: space-between;
  }
  .hero-card {
    grid-template-columns: 1fr;
  }
  .cta-row {
    justify-content: center;
  }
}
</style>
