<script setup lang="ts"></script>

<template>
  <div class="app">
    <header class="nav-header">
      <router-link to="/" class="brand">Stack Demo</router-link>
      <nav class="nav-links">
        <router-link to="/">Home</router-link>
        <router-link to="/form">Form</router-link>
        <router-link to="/backend">Backend</router-link>
        <router-link to="/firestore">Firestore</router-link>
      </nav>
    </header>
    <main class="main">
      <RouterView />
    </main>
  </div>
</template>

<style scoped>
.app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}
.nav-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 1rem;
  padding: 0.75rem 1.5rem;
  background: var(--nav-bg, #1a1a1a);
  color: #fff;
}
.brand {
  font-weight: 700;
  color: inherit;
  text-decoration: none;
}
.brand:hover {
  text-decoration: underline;
}
.nav-links {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
}
.nav-links a {
  color: #ccc;
  text-decoration: none;
}
.nav-links a:hover,
.nav-links a.router-link-active {
  color: #fff;
}
.main {
  flex: 1;
  padding: 0 0 2rem;
}
</style>

<style>
* {
  box-sizing: border-box;
}
body {
  margin: 0;
  font-family: system-ui, -apple-system, sans-serif;
  line-height: 1.5;
}
#app {
  min-height: 100vh;
}
</style>
