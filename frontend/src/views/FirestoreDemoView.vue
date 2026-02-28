<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useHead } from '@unhead/vue'
import { getFirestoreConfig } from '@/config'
import { initializeApp } from 'firebase/app'
import {
  getFirestore,
  collection,
  addDoc,
  query,
  orderBy,
  onSnapshot,
  serverTimestamp,
  type Unsubscribe,
} from 'firebase/firestore'

useHead({
  title: 'Firestore Demo',
  meta: [
    { name: 'description', content: 'Read and write demo items in Firestore.' },
  ],
})

const config = getFirestoreConfig()
const app = config ? initializeApp(config) : null
const db = app ? getFirestore(app) : null

const items = ref<Array<{ id: string; text: string; createdAt: unknown }>>([])
const newText = ref('')
const loading = ref(false)
const error = ref<string | null>(null)
let unsubscribe: Unsubscribe | null = null

onMounted(() => {
  if (!db) {
    error.value = 'Firebase config missing. Set VITE_FIREBASE_* env vars.'
    return
  }
  const q = query(
    collection(db, 'demoItems'),
    orderBy('createdAt', 'desc')
  )
  unsubscribe = onSnapshot(
    q,
    (snap) => {
      items.value = snap.docs.map((d) => ({
        id: d.id,
        text: d.data().text ?? '',
        createdAt: d.data().createdAt,
      }))
    },
    (err) => {
      error.value = err.message
    }
  )
})

function stopListener() {
  if (unsubscribe) {
    unsubscribe()
    unsubscribe = null
  }
}

async function addItem() {
  if (!db || !newText.value.trim()) return
  loading.value = true
  error.value = null
  try {
    await addDoc(collection(db, 'demoItems'), {
      text: newText.value.trim(),
      createdAt: serverTimestamp(),
    })
    newText.value = ''
  } catch (e) {
    error.value = e instanceof Error ? e.message : String(e)
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div class="firestore-demo">
    <h1>Firestore Demo</h1>
    <p>List and add documents in the <code>demoItems</code> collection (Firebase client SDK).</p>
    <div v-if="error" class="error">{{ error }}</div>
    <div v-if="!db" class="notice">Configure Firebase (see .env.example) to use this demo.</div>
    <template v-else>
      <form class="add-form" @submit.prevent="addItem">
        <input v-model="newText" type="text" placeholder="New item text" required />
        <button type="submit" class="btn" :disabled="loading">
          {{ loading ? 'Adding…' : 'Add' }}
        </button>
      </form>
      <ul class="list">
        <li v-for="item in items" :key="item.id" class="list-item">
          {{ item.text }}
        </li>
      </ul>
      <p v-if="items.length === 0 && !error" class="empty">No items yet. Add one above.</p>
    </template>
  </div>
</template>

<style scoped>
.firestore-demo {
  max-width: 480px;
  margin: 0 auto;
  padding: 1.5rem;
}
.firestore-demo p {
  margin-bottom: 1rem;
  color: var(--color-text-soft, #555);
}
.notice,
.error {
  padding: 0.75rem;
  border-radius: 4px;
  margin-bottom: 1rem;
}
.notice {
  background: #fff3cd;
  color: #856404;
}
.error {
  background: #fee;
  color: #c00;
}
.add-form {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 1rem;
}
.add-form input {
  flex: 1;
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 4px;
}
.btn {
  padding: 0.5rem 1rem;
  background: #0d6efd;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-weight: 500;
}
.btn:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}
.list {
  list-style: none;
  padding: 0;
  margin: 0;
}
.list-item {
  padding: 0.5rem 0;
  border-bottom: 1px solid #eee;
}
.empty {
  color: #888;
  font-style: italic;
}
</style>
