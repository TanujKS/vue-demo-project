<script setup lang="ts">
import { useHead } from '@unhead/vue'

useHead({
  title: 'Form Demo | FormRelay',
  meta: [
    { name: 'description', content: 'Form submission demo via FormRelay.' },
  ],
})
</script>

<template>
  <div class="form-demo">
    <h1>Form Demo (FormRelay)</h1>
    <p>Submit to the FormRelay endpoint. Fields: name, email, message + honeypot and <code>_form</code>.</p>
    <form
      action="https://forms.tanuj.xyz/demo-project/submit"
      method="post"
      enctype="application/x-www-form-urlencoded"
      target="_self"
      class="demo-form"
    >
      <div class="form-group">
        <label for="name">Name</label>
        <input type="text" id="name" name="name" required />
      </div>
      <div class="form-group">
        <label for="email">Email</label>
        <input type="email" id="email" name="email" required />
      </div>
      <div class="form-group">
        <label for="message">Message</label>
        <textarea id="message" name="message" rows="3" required></textarea>
      </div>
      <input type="hidden" name="_form" value="demo" />
      <input type="text" name="_hp" class="honeypot" tabindex="-1" autocomplete="off" aria-hidden="true" />
      <button type="submit" class="btn">Submit</button>
    </form>
  </div>
</template>

<style scoped>
.form-demo {
  max-width: 420px;
  margin: 0 auto;
  padding: 1.5rem;
}
.form-demo p {
  margin-bottom: 1rem;
  color: var(--color-text-soft, #555);
}
.demo-form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}
.form-group label {
  font-weight: 500;
}
.form-group input,
.form-group textarea {
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 4px;
}
.honeypot {
  position: absolute;
  left: -9999px;
  width: 1px;
  height: 1px;
  overflow: hidden;
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
.btn:hover {
  background: #0b5ed7;
}
</style>
