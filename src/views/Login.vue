<template>
  <div class="auth-page">
    <div class="auth-shell">
      <section class="auth-visual" aria-hidden="true">
        <div class="visual-top">
          <div class="visual-badge">
            <span class="badge-gold">◆</span>
            <span class="badge-silver">◇</span>
            <span class="badge-text">Welcome back</span>
          </div>
          <h2>Your rates, your purity, your total</h2>
          <p>Quick sign-in to continue calculating gold and silver values.</p>
        </div>
        <img class="visual-img" :src="authHero" alt="" />
        <div class="visual-bottom">
          <div class="pill">Reference rates</div>
          <div class="pill pill-silver">Purity</div>
        </div>
      </section>

      <section class="auth-card">
        <div class="auth-header">
          <router-link to="/" class="back">← Back</router-link>
          <h1>Sign in</h1>
          <p>Access your calculator</p>
        </div>
        <form @submit.prevent="handleLogin" class="auth-form">
          <div class="field">
            <label for="username">Username</label>
            <input
              id="username"
              v-model="form.username"
              type="text"
              placeholder="juan.delacruz"
              required
              autocomplete="username"
            />
          </div>
          <div class="field">
            <label for="password">Password</label>
            <input
              id="password"
              v-model="form.password"
              type="password"
              placeholder="••••••••"
              required
              autocomplete="current-password"
            />
          </div>
          <p v-if="error" class="error">{{ error }}</p>
          <button type="submit" class="btn btn-gold" :disabled="loading">
            {{ loading ? 'Signing in…' : 'Sign in' }}
          </button>
        </form>
        <p class="auth-footer">
          Don't have an account?
          <router-link to="/register">Register</router-link>
        </p>
      </section>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import authHero from '../assets/auth-hero.svg'

const router = useRouter()
const route = useRoute()
const loading = ref(false)
const error = ref('')

const form = reactive({
  username: '',
  password: ''
})

function getUsers() {
  try {
    const raw = localStorage.getItem('goldCalcUsers')
    const parsed = raw ? JSON.parse(raw) : {}
    // Backward compatibility: migrate email-keyed users to username-keyed (best-effort)
    if (parsed && typeof parsed === 'object') {
      const keys = Object.keys(parsed)
      const looksEmailKeyed = keys.some(k => k.includes('@'))
      if (looksEmailKeyed) {
        const migrated = {}
        for (const k of keys) {
          const u = parsed[k]
          const candidate = String(k).split('@')[0].toLowerCase().replace(/[^a-z0-9._-]/g, '')
          const uname = candidate || `user${Math.floor(Math.random() * 10000)}`
          migrated[uname] = u
        }
        localStorage.setItem('goldCalcUsers', JSON.stringify(migrated))
        return migrated
      }
    }
    return parsed
  } catch {
    return {}
  }
}

function handleLogin() {
  error.value = ''
  loading.value = true
  const users = getUsers()
  const username = form.username.trim().toLowerCase()
  const user = users[username]
  if (!user || user.password !== form.password) {
    error.value = 'Invalid username or password.'
    loading.value = false
    return
  }
  sessionStorage.setItem('goldCalcUser', JSON.stringify({ username, name: user.name }))
  loading.value = false
  const redirect = route.query.redirect || '/calculator'
  router.push(redirect)
}
</script>

<style scoped>
.auth-page {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
}

.auth-shell {
  width: 100%;
  max-width: 920px;
  display: grid;
  grid-template-columns: 1.05fr 0.95fr;
  border-radius: var(--radius-lg);
  overflow: hidden;
  background: var(--bg-card);
  border: 1px solid rgba(26, 24, 20, 0.08);
  box-shadow: var(--shadow-glow);
  backdrop-filter: blur(10px);
}

.auth-visual {
  padding: 2rem 2rem 1.25rem;
  background:
    radial-gradient(ellipse 80% 60% at 30% 10%, rgba(232, 185, 35, 0.20), transparent 60%),
    radial-gradient(ellipse 70% 60% at 80% 70%, rgba(143, 156, 169, 0.18), transparent 60%),
    linear-gradient(180deg, rgba(255, 255, 255, 0.75) 0%, rgba(255, 255, 255, 0.35) 100%);
  border-right: 1px solid rgba(26, 24, 20, 0.06);
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.visual-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  padding: 0.35rem 0.6rem;
  border-radius: 999px;
  border: 1px solid rgba(26, 24, 20, 0.08);
  background: rgba(255, 255, 255, 0.72);
  width: fit-content;
}

.badge-gold {
  color: var(--gold-600);
}
.badge-silver {
  color: var(--silver-600);
}
.badge-text {
  color: rgba(26, 24, 20, 0.72);
  font-weight: 700;
  font-size: 0.85rem;
}

.visual-top h2 {
  font-family: var(--font-display);
  font-size: 1.85rem;
  line-height: 1.12;
  letter-spacing: 0.02em;
  margin-top: 0.75rem;
}

.visual-top p {
  color: var(--text-muted);
  max-width: 50ch;
  margin-top: 0.5rem;
}

.visual-img {
  width: 100%;
  height: auto;
  max-height: 330px;
  object-fit: contain;
  margin-top: auto;
  filter: drop-shadow(0 18px 25px rgba(26, 24, 20, 0.10));
}

.visual-bottom {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
}

.pill {
  font-size: 0.8rem;
  font-weight: 700;
  padding: 0.35rem 0.6rem;
  border-radius: 999px;
  background: rgba(232, 185, 35, 0.16);
  color: var(--gold-800);
  border: 1px solid rgba(232, 185, 35, 0.25);
}

.pill-silver {
  background: rgba(143, 156, 169, 0.14);
  color: var(--silver-700);
  border-color: rgba(143, 156, 169, 0.22);
}

.auth-card {
  padding: 2rem;
  background: rgba(255, 255, 255, 0.72);
}

.auth-header {
  margin-bottom: 1.75rem;
}

.back {
  display: inline-block;
  color: var(--text-muted);
  text-decoration: none;
  font-size: 0.9rem;
  margin-bottom: 1rem;
}

.back:hover {
  color: var(--gold-700);
}

.auth-header h1 {
  font-size: 1.75rem;
  margin-bottom: 0.35rem;
}

.auth-header p {
  color: var(--text-muted);
  font-size: 0.9rem;
}

.auth-form .field {
  margin-bottom: 1.25rem;
}

.auth-form label {
  display: block;
  margin-bottom: 0.4rem;
  font-size: 0.9rem;
  color: var(--text-muted);
}

.auth-form input {
  width: 100%;
  padding: 0.75rem 1rem;
  background: rgba(255, 255, 255, 0.86);
  border: 1px solid rgba(26, 24, 20, 0.14);
  border-radius: var(--radius);
  color: var(--text-primary);
  font-size: 1rem;
}

.auth-form input::placeholder {
  color: var(--text-muted);
  opacity: 0.6;
}

.error {
  color: #c62828;
  font-size: 0.9rem;
  margin-bottom: 1rem;
}

.auth-form .btn {
  width: 100%;
  padding: 0.9rem;
  border: none;
  border-radius: var(--radius);
  font-weight: 600;
  font-size: 1rem;
  cursor: pointer;
  background: linear-gradient(135deg, var(--gold-500), var(--gold-600));
  color: #1a1814;
  margin-top: 0.5rem;
  box-shadow: 0 10px 22px rgba(232, 185, 35, 0.22);
}

.auth-form .btn:hover:not(:disabled) {
  filter: brightness(1.1);
}

.auth-form .btn:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

.auth-footer {
  margin-top: 1.5rem;
  text-align: center;
  color: var(--text-muted);
  font-size: 0.9rem;
}

.auth-footer a {
  color: var(--gold-700);
  text-decoration: none;
  font-weight: 600;
}

.auth-footer a:hover {
  text-decoration: underline;
}

@media (max-width: 860px) {
  .auth-shell {
    grid-template-columns: 1fr;
  }
  .auth-visual {
    border-right: none;
    border-bottom: 1px solid rgba(26, 24, 20, 0.06);
  }
  .visual-img {
    max-height: 260px;
  }
}
</style>
