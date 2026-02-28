<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useHead } from '@unhead/vue'
import { functionsUrl } from '@/config'

useHead({
  title: 'Backend Demo | Firebase Functions',
  meta: [
    { name: 'description', content: 'Call Firebase HTTP function via fetch().' },
  ],
})

const loading = ref(false)
const result = ref<string | null>(null)
const error = ref<string | null>(null)

async function callBackend() {
  loading.value = true
  result.value = null
  error.value = null
  try {
    const res = await fetch(functionsUrl)
    const data = await res.json()
    result.value = JSON.stringify(data, null, 2)
  } catch (e) {
    error.value = e instanceof Error ? e.message : String(e)
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div class="backend-demo">
    <h1>Backend Demo (Firebase Functions)</h1>
    <p>Call the deployed <code>demo</code> HTTP function via <code>fetch()</code>.</p>
    <button type="button" class="btn" :disabled="loading" @click="callBackend">
      {{ loading ? 'Calling…' : 'Call backend' }}
    </button>
    <div v-if="result" class="result">
      <pre>{{ result }}</pre>
    </div>
    <div v-if="error" class="error">
      {{ error }}
    </div>
  </div>
</template>

<style scoped>
.backend-demo {
  max-width: 560px;
  margin: 0 auto;
  padding: 1.5rem;
}
.backend-demo p {
  margin-bottom: 1rem;
  color: var(--color-text-soft, #555);
}
.btn {
  padding: 0.6rem 1rem;
  background: #0d6efd;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-weight: 500;
}
.btn:hover:not(:disabled) {
  background: #0b5ed7;
}
.btn:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}
.result,
.error {
  margin-top: 1rem;
  padding: 1rem;
  border-radius: 4px;
}
.result {
  background: #f0f0f0;
  overflow: auto;
}
.result pre {
  margin: 0;
  font-size: 0.9rem;
}
.error {
  background: #fee;
  color: #c00;
}
</style>
