<template>
  <div class="auth-page">
    <div class="auth-shell">
      <section class="auth-visual" aria-hidden="true">
        <div class="visual-top">
          <div class="visual-badge">
            <span class="badge-gold">◆</span>
            <span class="badge-silver">◇</span>
            <span class="badge-text">Precious Metals</span>
          </div>
          <h2>Start calculating with confidence</h2>
          <p>Precious metals pricing with purity awareness.</p>
        </div>

        <img class="visual-img" :src="authHero" alt="" />

        <div class="visual-bottom">
          <div class="pill">Gold</div>
          <div class="pill pill-silver">Silver</div>
          <div class="pill">PHP</div>
        </div>
      </section>

      <section class="auth-card">
        <div class="auth-header">
          <router-link to="/" class="back">← Back</router-link>
          <h1>Create account</h1>
          <p>Register to access the calculator</p>
        </div>

        <form @submit.prevent="handleRegister" class="auth-form">
          <div class="field">
            <label for="name">Full name</label>
            <input
              id="name"
              v-model="form.name"
              type="text"
              placeholder="Juan Dela Cruz"
              required
              autocomplete="name"
            />
          </div>
          <div class="field">
            <label for="email">Email</label>
            <input
              id="email"
              v-model="form.email"
              type="email"
              placeholder="juan@example.com"
              required
              autocomplete="email"
            />
          </div>
          <div class="field">
            <label for="username">Username</label>
            <input
              id="username"
              v-model="form.username"
              type="text"
              placeholder="at least 5 characters (ex. juan.delacruz)"
              required
              minlength="5"
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
              minlength="8"
              autocomplete="new-password"
            />
            <span class="hint">At least 8 characters</span>
          </div>

          <div class="field">
            <label for="confirmPassword">Confirm password</label>
            <input
              id="confirmPassword"
              v-model="form.confirmPassword"
              type="password"
              placeholder="••••••••"
              required
              minlength="8"
              autocomplete="new-password"
            />
          </div>

          <p v-if="error" class="error">{{ error }}</p>
          <button type="submit" class="btn btn-gold" :disabled="loading">
            {{ loading ? 'Creating…' : 'Register' }}
          </button>
        </form>

        <p class="auth-footer">
          Already have an account?
          <router-link to="/login">Sign in</router-link>
        </p>
      </section>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import authHero from '../assets/auth-hero.svg'

const router = useRouter()
const loading = ref(false)
const error = ref('')

const form = reactive({
  name: '',
  username: '',
  email: '',
  password: '',
  confirmPassword: ''
})

function getUsers() {
  try {
    const raw = localStorage.getItem('goldCalcUsers')
    const parsed = raw ? JSON.parse(raw) : {}
    // Backward compatibility: migrate email-keyed users to username-keyed (best-effort)
    // Old shape: { [email]: { name, password } }
    // New shape: { [username]: { name, password } }
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

function setUsers(users) {
  localStorage.setItem('goldCalcUsers', JSON.stringify(users))
}

function handleRegister() {
  error.value = ''
  loading.value = true
  const users = getUsers()
  const username = form.username.trim().toLowerCase()
  const email = form.email.trim().toLowerCase()
  if (username.length < 5) {
    error.value = 'Username must be at least 5 characters.'
    loading.value = false
    return
  }
  if (form.password !== form.confirmPassword) {
    error.value = 'Passwords do not match.'
    loading.value = false
    return
  }
  if (users[username]) {
    error.value = 'That username is already taken.'
    loading.value = false
    return
  }
  // Ensure email is unique (even though username is the login key)
  const emailTaken = Object.values(users).some(u => (u?.email || '').toLowerCase() === email)
  if (emailTaken) {
    error.value = 'An account with this email already exists.'
    loading.value = false
    return
  }
  users[username] = {
    name: form.name.trim(),
    email,
    password: form.password
  }
  setUsers(users)
  sessionStorage.setItem('goldCalcUser', JSON.stringify({ username, name: form.name.trim() }))
  loading.value = false
  router.push('/calculator')
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
    radial-gradient(ellipse 80% 60% at 30% 10%, rgba(232, 185, 35, 0.22), transparent 60%),
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
  font-weight: 600;
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
  line-height: 1.1rem;
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
  font-weight: 600;
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
  padding: 1rem;
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
  margin-bottom: 0.1rem;
}

.auth-header p {
  color: var(--text-muted);
  font-size: 0.85rem;
  font-style: italic;
}

.auth-form .field {
  margin-bottom: 1rem;
}

.auth-form label {
  display: block;
  margin-bottom: 0;
  font-size: 0.9rem;
  color: var(--text-muted);
}

.auth-form input {
  width: 100%;
  padding: 0.3rem 1rem;
  background: rgba(255, 255, 255, 0.86);
  border: 1px solid rgba(26, 24, 20, 0.14);
  border-radius: var(--radius);
  color: var(--text-primary);
  font-size: 1rem;
}

.auth-form input::placeholder {
  color: var(--text-muted);
  opacity: 0.7;
}

.hint {
  font-size: 0.8rem;
  color: var(--text-muted);
  margin-top: 0.3rem;
  display: block;
}

.error {
  color: #c62828;
  font-size: 0.9rem;
  margin-bottom: 0.9rem;
}

.auth-form .btn {
  width: 100%;
  padding: 0.9rem;
  border: none;
  border-radius: var(--radius);
  font-weight: 700;
  font-size: 1rem;
  cursor: pointer;
  background: linear-gradient(135deg, var(--gold-500), var(--gold-600));
  color: #1a1814;
  margin-top: 0.5rem;
  box-shadow: 0 10px 22px rgba(232, 185, 35, 0.22);
}

.auth-form .btn:hover:not(:disabled) {
  filter: brightness(1.03);
  transform: translateY(-1px);
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
