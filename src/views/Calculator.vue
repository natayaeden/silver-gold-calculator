<template>
  <div class="calculator-page">
    <header class="calc-header">
      <div class="header-inner">
        <div class="brand">
          <span class="icon-gold">◆</span>
          <span class="icon-silver">◇</span>
          <h1>Precious Metals Calculator</h1>
        </div>
        <div class="user-row">
          <span class="user-name">Hello, {{ user?.name || 'User' }}</span>
          <button type="button" class="btn-logout" @click="logout">Sign out</button>
        </div>
      </div>
    </header>

    <main class="calc-main">
      <div class="tabs">
        <button
          type="button"
          class="tab"
          :class="{ active: metal === 'gold' }"
          @click="metal = 'gold'"
        >
          <span class="tab-icon">◆</span>
          Gold
        </button>
        <button
          type="button"
          class="tab"
          :class="{ active: metal === 'silver' }"
          @click="metal = 'silver'"
        >
          <span class="tab-icon">◇</span>
          Silver
        </button>
      </div>

      <div class="calc-card" :data-metal="metal">

        <div class="reference-rates" :data-metal="metal">
          <div class="reference-header">
            <span className="text-muted">Philippine Rates</span>
            <a
              :href="metal === 'gold' ? 'https://www.livepriceofgold.com/philippines-gold-price.html' : 'https://www.livepriceofgold.com/silver-price/philippines.html'"
              target="_blank"
              rel="noopener noreferrer"
              class="source-link"
            >
              LivePriceOfGold Philippines
            </a>
          </div>
          <div class="reference-list">
            <button
              v-for="ref in referenceRates"
              :key="ref.label"
              type="button"
              class="ref-chip"
              :class="{ match: currentRefLabel === ref.label }"
              @click="applyReferenceRate(ref)"
            >
              ( {{ ref.label }} ) ₱{{ ref.ratePerGram.toLocaleString('en-PH', { maximumFractionDigits: 2 }) }}/g
            </button>
          </div>
          <p class="reference-note">Click a rate to use it. Prices update on the source site.</p>
        </div>

        <div class="form-grid">
          <div class="field">
            <label>Amount (grams)</label>
            <input
              v-model.number="form.grams"
              type="number"
              min="0"
              step="0.01"
              placeholder="e.g. 5.5"
            />
          </div>
          <div class="field">
            <label>Purity</label>
            <select v-model="form.purity" :key="metal">
              <option
                v-for="opt in purities"
                :key="opt.value"
                :value="opt.value"
              >
                {{ opt.label }} ({{ opt.pct }}%)
              </option>
            </select>
          </div>
          <div class="field">
            <label>Philippine rate (₱/per gram)</label>
            <input
              v-model.number="form.rate"
              type="number"
              min="0"
              step="1"
              placeholder="e.g. 3500"
            />
          </div>
          <div class="field">
            <label>Making / design charge (₱)</label>
            <input
              v-model.number="form.making"
              type="number"
              min="0"
              step="1"
              placeholder="e.g. 500"
            />
          </div>
        </div>

        <div class="result-panel">
          <div class="result-row">
            <span>Metal value (grams × purity × rate)</span>
            <span class="num">₱ {{ metalValue.toLocaleString('en-PH', { minimumFractionDigits: 2 }) }}</span>
          </div>
          <div class="result-row">
            <span>Making / design charge</span>
            <span class="num">₱ {{ form.making.toLocaleString('en-PH', { minimumFractionDigits: 2 }) }}</span>
          </div>
          <div class="result-row subtotal">
            <span>Subtotal</span>
            <span class="num">₱ {{ subtotal.toLocaleString('en-PH', { minimumFractionDigits: 2 }) }}</span>
          </div>
          <div class="result-row tax">
            <span>VAT (12%)</span>
            <span class="num">₱ {{ taxAmount.toLocaleString('en-PH', { minimumFractionDigits: 2 }) }}</span>
          </div>
          <div class="result-row total" :data-metal="metal">
            <span>Total</span>
            <span class="num">₱ {{ total.toLocaleString('en-PH', { minimumFractionDigits: 2 }) }}</span>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, reactive, computed, onMounted, watch } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const user = ref(null)
const metal = ref('gold')

const GOLD_PURITIES = [
  { value: 0.999, label: '24K', pct: 99.9 },
  { value: 0.916, label: '22K', pct: 91.6 },
  { value: 0.875, label: '21K', pct: 87.5 },
  { value: 0.75, label: '18K', pct: 75 },
  { value: 0.585, label: '14K', pct: 58.5 },
  { value: 0.417, label: '10K', pct: 41.7 },
  { value: 0.25, label: '6K', pct: 25 }
]

const SILVER_PURITIES = [
  { value: 0.999, label: '999 Fine', pct: 99.9 },
  { value: 0.925, label: '925 Sterling', pct: 92.5 },
  { value: 0.9, label: '900', pct: 90 },
  { value: 0.8, label: '800', pct: 80 }
]

// Reference: https://www.livepriceofgold.com/philippines-gold-price.html (Gram/PHP)
const GOLD_REFERENCE_RATES = [
  { label: '24K', purity: 0.999, ratePerGram: 9924.98 },
  { label: '22K', purity: 0.916, ratePerGram: 9111.13 },
  { label: '21K', purity: 0.875, ratePerGram: 8684.35 },
  { label: '18K', purity: 0.75, ratePerGram: 7443.73 },
  { label: '14K', purity: 0.585, ratePerGram: 5806.11 },
  { label: '10K', purity: 0.417, ratePerGram: 4138.72 },
  { label: '6K', purity: 0.25, ratePerGram: 2481.24 }
]

// Reference: https://www.livepriceofgold.com/silver-price/philippines.html (PHP per gram)
const SILVER_REFERENCE_RATES = [
  { label: '999', purity: 0.999, ratePerGram: 143 },
  { label: '925', purity: 0.925, ratePerGram: 132 },
  { label: '900', purity: 0.9, ratePerGram: 126 },
  { label: '800', purity: 0.8, ratePerGram: 114 }
]

const form = reactive({
  grams: 0,
  purity: 0.999,
  rate: 0,
  making: 0
})

const purities = computed(() =>
  metal.value === 'gold' ? GOLD_PURITIES : SILVER_PURITIES
)

const referenceRates = computed(() =>
  metal.value === 'gold' ? GOLD_REFERENCE_RATES : SILVER_REFERENCE_RATES
)

const currentRefLabel = computed(() => {
  const ref = referenceRates.value.find(
    r => Math.abs(r.purity - form.purity) < 0.001
  )
  return ref ? ref.label : null
})

function applyReferenceRate(ref) {
  form.purity = ref.purity
  form.rate = Math.round((ref.ratePerGram / ref.purity) * 100) / 100
}

const metalValue = computed(() => {
  const g = Number(form.grams) || 0
  const p = Number(form.purity) || 0
  const r = Number(form.rate) || 0
  return g * p * r
})

const subtotal = computed(() => metalValue.value + (Number(form.making) || 0))
const taxAmount = computed(() => subtotal.value * 0.12)
const total = computed(() => subtotal.value + taxAmount.value)

watch(metal, (m) => {
  form.grams = 0
  form.rate = 0
  form.making = 0
  form.purity = m === 'gold' ? GOLD_PURITIES[0].value : SILVER_PURITIES[0].value
})

onMounted(() => {
  try {
    const raw = sessionStorage.getItem('goldCalcUser')
    if (!raw) {
      router.replace('/login')
      return
    }
    user.value = JSON.parse(raw)
    form.purity = metal.value === 'gold' ? GOLD_PURITIES[0].value : SILVER_PURITIES[0].value
  } catch {
    router.replace('/login')
  }
})

function logout() {
  sessionStorage.removeItem('goldCalcUser')
  router.replace('/')
}
</script>

<style scoped>
.calculator-page {
  min-height: 100vh;
  padding-bottom: 3rem;
}

.calc-header {
  background: var(--bg-card);
  border-bottom: 1px solid var(--border-gold);
  padding: 1rem 1.5rem;
  position: sticky;
  top: 0;
  z-index: 10;
}

.header-inner {
  max-width: 900px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 1rem;
}

.brand {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.brand .icon-gold {
  color: var(--gold-400);
  font-size: 1.25rem;
}

.brand .icon-silver {
  color: var(--silver-400);
  font-size: 1rem;
  opacity: 0.9;
}

.brand h1 {
  font-size: 1.35rem;
  font-weight: 600;
}

.user-row {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.user-name {
  color: var(--text-primary);
  font-size: 0.9rem;
  opacity: 0.9;
}

.btn-logout {
  padding: 0.5rem 1rem;
  background: transparent;
  border: 1px solid var(--border-silver);
  border-radius: var(--radius);
  color: var(--silver-700);
  font-size: 0.9rem;
  font-weight: 600;
  cursor: pointer;
}

.btn-logout:hover {
  background: rgba(184, 193, 202, 0.1);
}

.calc-main {
  max-width: 900px;
  margin: 0 auto;
  padding: 2rem 1.5rem;
}

.tabs {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
}

.tab {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  background: var(--bg-card);
  border: 1px solid var(--border-gold);
  border-radius: var(--radius);
  color: var(--text-primary);
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
  opacity: 0.85;
}

.tab .tab-icon {
  font-size: 1.1rem;
}

.tab:hover {
  color: var(--text-primary);
  border-color: var(--gold-500);
}

.tab.active {
  background: linear-gradient(135deg, rgba(232, 185, 35, 0.2), rgba(232, 185, 35, 0.08));
  border-color: var(--gold-500);
  color: var(--gold-800);
  opacity: 1;
}

.calc-card[data-metal="silver"] .tab.active {
  background: linear-gradient(135deg, rgba(184, 193, 202, 0.2), rgba(184, 193, 202, 0.08));
  border-color: var(--silver-500);
  color: var(--silver-800);
  opacity: 1;
}

.calc-card {
  background: var(--bg-card);
  border: 1px solid var(--border-gold);
  border-radius: var(--radius-lg);
  padding: 2rem;
  box-shadow: var(--shadow-glow);
}

.formula-note {
  font-size: 0.9rem;
  color: var(--text-primary);
  margin-bottom: 1.5rem;
  padding: 0.75rem 1rem;
  background: var(--bg-dark);
  border-radius: var(--radius);
  border-left: 3px solid var(--gold-500);
  opacity: 0.92;
}

.formula-note[data-metal="silver"] {
  border-left-color: var(--silver-400);
}

.reference-rates {
  margin-bottom: 1.5rem;
  padding: 1rem;
  background: var(--bg-dark);
  border-radius: var(--radius);
  border: 1px solid var(--border-gold);
}

.reference-rates[data-metal="silver"] {
  border-color: var(--border-silver);
}

.reference-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 0.75rem;
  font-size: 0.9rem;
  color: var(--text-primary);
  font-weight: 600;
  opacity: 0.9;
}

.source-link {
  color: var(--gold-700);
  text-decoration: none;
  font-weight: 600;
}

.source-link:hover {
  text-decoration: underline;
  color: var(--gold-800);
}

.reference-rates[data-metal="silver"] .source-link {
  color: var(--silver-700);
}

.reference-rates[data-metal="silver"] .source-link:hover {
  color: var(--silver-800);
}

.reference-list {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 0.5rem;
}

.ref-chip {
  padding: 0.4rem 0.75rem;
  background: var(--bg-card);
  border: 1px solid var(--border-gold);
  border-radius: 999px;
  color: var(--text-primary);
  font-size: 0.85rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
  opacity: 0.9;
}

.ref-chip:hover {
  border-color: var(--gold-500);
  color: var(--gold-800);
  opacity: 1;
}

.ref-chip.match {
  border-color: var(--gold-500);
  color: var(--gold-800);
  background: rgba(232, 185, 35, 0.12);
  opacity: 1;
}

.reference-rates[data-metal="silver"] .ref-chip:hover,
.reference-rates[data-metal="silver"] .ref-chip.match {
  border-color: var(--silver-500);
  color: var(--silver-800);
  background: rgba(184, 193, 202, 0.12);
}

.reference-note {
  font-size: 0.8rem;
  color: var(--text-primary);
  opacity: 0.75;
}

.form-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1.25rem;
  margin-bottom: 2rem;
}

.field label {
  display: block;
  margin-bottom: 0.4rem;
  font-size: 0.9rem;
  color: var(--text-muted);
}

.field input,
.field select {
  width: 100%;
  padding: 0.75rem 1rem;
  background: var(--bg-dark);
  border: 1px solid var(--border-gold);
  border-radius: var(--radius);
  color: var(--text-primary);
  font-size: 1rem;
}

.field input::placeholder {
  color: var(--text-primary);
  opacity: 0.45;
}

.result-panel {
  border-top: 1px solid var(--border-gold);
  padding-top: 1.5rem;
}

.result-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem 0;
  font-size: 0.95rem;
  color: var(--text-primary);
  opacity: 0.9;
}

.result-row .num {
  color: var(--text-primary);
  font-weight: 600;
  font-variant-numeric: tabular-nums;
}

.result-row.subtotal {
  border-top: 1px dashed var(--border-gold);
  margin-top: 0.25rem;
  padding-top: 0.75rem;
  color: var(--text-primary);
  opacity: 1;
}

.result-row.tax {
  color: var(--text-primary);
  opacity: 0.85;
}

.result-row.total {
  margin-top: 0.5rem;
  padding: 1rem;
  background: linear-gradient(135deg, rgba(232, 185, 35, 0.15), rgba(232, 185, 35, 0.05));
  border-radius: var(--radius);
  font-size: 1.2rem;
  font-weight: 700;
  color: var(--gold-800);
}

.result-row.total .num {
  font-size: 1.35rem;
  color: var(--gold-800);
}

.result-row.total[data-metal="silver"] {
  background: linear-gradient(135deg, rgba(184, 193, 202, 0.15), rgba(184, 193, 202, 0.05));
  color: var(--silver-800);
}

.result-row.total[data-metal="silver"] .num {
  color: var(--silver-800);
}

.calc-card[data-metal="silver"] {
  border-color: var(--border-silver);
  box-shadow: 0 0 24px rgba(184, 193, 202, 0.08);
}
</style>
