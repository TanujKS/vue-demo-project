<script setup lang="ts">
import { useHead } from '@unhead/vue'

useHead({
  title: 'Stack Demo | Vue, Firebase, FormRelay',
  meta: [
    { name: 'description', content: 'Demo site for the Vue + Firebase + Cloudflare stack.' },
    { property: 'og:title', content: 'Stack Demo' },
    { property: 'og:description', content: 'Demo site for the Vue + Firebase + Cloudflare stack.' },
  ],
})
</script>

<template>
  <div class="home">
    <h1>Stack Demo</h1>
    <p class="lead">
      This site demos the stack: <strong>Vue.js</strong>, <strong>vite-ssg</strong>, <strong>FormRelay</strong>,
      <strong>Firebase</strong> (Functions + Firestore), and responsive layout.
    </p>
    <nav class="demo-links">
      <router-link to="/form" class="card">Form Demo (FormRelay)</router-link>
      <router-link to="/backend" class="card">Backend Demo (Firebase Functions)</router-link>
      <router-link to="/firestore" class="card">Firestore Demo</router-link>
    </nav>
  </div>
</template>

<style scoped>
.home {
  max-width: 640px;
  margin: 0 auto;
  padding: 1.5rem;
}
.lead {
  margin-bottom: 1.5rem;
  color: var(--color-text-soft, #333);
}
.demo-links {
  display: grid;
  gap: 1rem;
  grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
}
.card {
  display: block;
  padding: 1rem 1.25rem;
  background: var(--card-bg, #f5f5f5);
  border-radius: 8px;
  color: inherit;
  text-decoration: none;
  font-weight: 500;
  transition: background 0.2s;
}
.card:hover {
  background: var(--card-hover, #eee);
}
@media (max-width: 480px) {
  .demo-links {
    grid-template-columns: 1fr;
  }
}
</style>
