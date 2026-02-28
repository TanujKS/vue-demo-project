# demo-project

This instruction manual explains how to create a **Vue.js** app using my current stack. My current workflow uses **Cursor** for an integrated AI IDE, **Git/GitHub** for version control, **Cloudflare Pages** for deploying static pages, **Vue.js** for frontend, **Firebase** for BaaS (authentication, database, bucket storage).

---

## Table of contents

- [Frontend](#frontend)
- [Backend](#backend)
- [Deployment](#deployment)
- [Further Reading](#further-reading)

---

## Frontend

We start by using the [Vue.js quickstart](https://vuejs.org/guide/quick-start):

```bash
npm create vue@latest
```

From there, use Cursor's plan mode to plan out a sketch for the app. Include any key features from the client but provide guidance as to what tools to use. For example, if the client needs payment integrations, pick between Stripe and Square, and include this in the prompt. Read over the documentation, or ideate with ChatGPT, to understand which endpoints we will need for the project at hand. Include links to documentation regarding this framework in your prompt. If the API has an MCP Documentation Server, be sure to add that as well.

Read over the plan and build.

### Custom Integrations

I've built out a few open-source alternatives to common features that usually require a monthly fee. The first is **Form Handling**, handled by [**FormRelay**](https://github.com/TanujKS/FormRelay/).

> Instruct Cursor to use this Cloudflare worker endpoint. Provide this as an example:

```html
<form
  action="https://forms.tanuj.xyz/thedraperylady/submit"
  method="post"
  enctype="application/x-www-form-urlencoded"
  target="_self"
  class="consultation-form"
>
  <div class="form-group animate-on-scroll fade-in-delay">
    <label for="name">Full Name</label>
    <input type="text" id="name" name="name" required @blur="validateField" />
  </div>

  <div class="form-group animate-on-scroll fade-in-delay" style="animation-delay: 0.1s">
    <label for="email">Email Address</label>
    <input type="email" id="email" name="email" required @blur="validateField" />
  </div>

  <div class="form-group animate-on-scroll fade-in-delay" style="animation-delay: 0.2s">
    <label for="phone">Phone Number</label>
    <input type="tel" id="phone" name="phone" required @blur="validateField" />
  </div>

  <div class="form-group animate-on-scroll fade-in-delay" style="animation-delay: 0.3s">
    <label for="street-address">Street Address</label>
    <input
      type="text"
      id="street-address"
      name="street-address"
      autocomplete="street-address"
      required
      @blur="validateField"
    />
  </div>

  <div class="form-row animate-on-scroll fade-in-delay" style="animation-delay: 0.35s">
    <div class="form-group">
      <label for="city">City</label>
      <input
        type="text"
        id="city"
        name="city"
        autocomplete="address-level2"
        required
        @blur="validateField"
      />
    </div>
    <div class="form-group">
      <label for="state">State</label>
      <input
        type="text"
        id="state"
        name="state"
        maxlength="2"
        autocomplete="address-level1"
        required
        @blur="validateField"
      />
    </div>
  </div>

  <div class="form-group animate-on-scroll fade-in-delay" style="animation-delay: 0.4s">
    <label for="zip">Zip Code</label>
    <input
      type="text"
      id="zip"
      name="zip"
      inputmode="numeric"
      autocomplete="postal-code"
      required
      @blur="validateField"
    />
  </div>

  <div class="form-group animate-on-scroll fade-in-delay" style="animation-delay: 0.45s">
    <label for="project">Tell Us About Your Project</label>
    <textarea id="project" name="project" rows="4" required @blur="validateField"></textarea>
  </div>

  <div class="form-group animate-on-scroll fade-in-delay" style="animation-delay: 0.5s">
    <label for="preferred-time">Preferred Consultation Time</label>
    <select id="preferred-time" name="preferred-time" required @blur="validateField">
      <option value="">Select a time...</option>
      <option value="morning">Morning (9 AM - 12 PM)</option>
      <option value="afternoon">Afternoon (12 PM - 3 PM)</option>
      <option value="evening">Evening (3 PM - 6 PM)</option>
    </select>
  </div>

  <!-- Honeypot field - hidden from users -->
  <input type="text" name="_hp" class="honeypot" tabindex="-1" autocomplete="off" />

  <!-- Form identifier -->
  <input type="hidden" name="_form" value="consultation" />

  <!-- reCAPTCHA v2 widget -->
  <div class="form-group animate-on-scroll fade-in-delay" style="animation-delay: 0.55s">
    <div id="recaptcha-container" class="recaptcha-container"></div>
  </div>

  <button
    type="submit"
    class="primary-btn animate-on-scroll fade-in-delay"
    style="animation-delay: 0.6s"
    @click.prevent="handleSubmit"
  >
    Submit Request
  </button>
</form>
```

### Iteration

Examine every page carefully on all device sizes using Chrome DevTools, fix any styling issues (e.g text flowing out of boxes, bad positioning, etc). If a first shot at fixing a styling issue fails, REDO the checkpoint and provide additional context such as a screenshot, copy-paste HTML from DevTools, etc. Spamming Cursor repeatedly with "it still doesn't work, it still doesn't work etc." will lead to overlapping code, divergence in frameworks, not following DRY principles, and is unlikely to actually fix the issue. Ensure you are reading code that Cursor is generating to follow best practices such as DRY principles.

### SEO

To optimize the site for SEO, you need to understand the difference between SSR, SSG, and CSR as well as their benefits and drawbacks for SEO.

https://www.geeksforgeeks.org/javascript/server-side-rendering-vs-client-side-rendering-vs-server-side-generation/

You also need to understand meta keywords and OpenGraph:

https://www.wordstream.com/meta-keyword
https://seosetups.com/blog/open-graph/

We optimize for SSG using **vite-ssg**. Instruct Cursor to enhance the site with **vite-ssg** while using SSR on dynamic pages that require SSR (e.g. login pages).

```javascript
import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'
import Sitemap from 'vite-plugin-sitemap'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueDevTools(),
    // TODO: Make this dynamically load from productDetails.js
    Sitemap({
      hostname: 'https://draperylady.net',
      dynamicRoutes: [
        '/product/drapery',
        '/product/shades',
        '/product/blinds',
        '/product/shutters',
        '/product/valances',
        '/product/accessories',
      ],
    }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      '@assets': fileURLToPath(new URL('./src/assets', import.meta.url)),
    },
  },
  ssgOptions: {
    script: 'async',
    formatting: 'minify',
    crittersOptions: {
      reduceInlineStyles: false,
    },
  },
})
```

For SEO meta/keywords, instruct Cursor to add the useHead header to all Vue.js pages imported from `@unhead/vue`.

```javascript
useHead({
  title: 'The Drapery Lady | Custom Window Treatments & Drapery | San Jose, CA',
  meta: [
    {
      name: 'description',
      content:
        'The Drapery Lady offers custom drapery, blinds, shades, and shutters in San Jose, CA. 35+ years of experience creating elegant window treatments for your home.',
    },
    {
      name: 'keywords',
      content:
        'custom drapery, window treatments, blinds, shades, shutters, San Jose, CA, The Drapery Lady, Christine St. Clair',
    },
    {
      property: 'og:title',
      content: 'The Drapery Lady | Custom Window Treatments & Drapery',
    },
    {
      property: 'og:description',
      content:
        'Custom drapery, blinds, shades, and shutters in San Jose, CA. 35+ years of experience creating elegant window treatments for your home.',
    },
    {
      property: 'og:type',
      content: 'website',
    },
    {
      property: 'og:url',
      content: 'https://draperylady.net',
    },
    {
      property: 'og:image',
      content: 'https://draperylady.net/src/assets/TDL_logo.png',
    },
    {
      property: 'og:site_name',
      content: 'The Drapery Lady',
    },
    {
      name: 'twitter:card',
      content: 'summary_large_image',
    },
    {
      name: 'twitter:title',
      content: 'The Drapery Lady | Custom Window Treatments',
    },
    {
      name: 'twitter:description',
      content: 'Custom drapery and window treatments in San Jose, CA. 35+ years of experience.',
    },
    {
      name: 'twitter:image',
      content: 'https://draperylady.net/src/assets/TDL_logo.png',
    },
  ],
  script: [
    {
      src: 'https://www.googletagmanager.com/gtag/js?id=G-XL29Z0GCWW',
      async: true,
    },
    {
      innerHTML: `
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', 'G-XL29Z0GCWW');
      `,
    },
  ],
})
```

Test OpenGraph implementation using [OpenGraph.xyz](https://www.opengraph.xyz/).

---

## Backend

For more complex apps that require a backend, we use **Firebase** as it provides a great, cheap BaaS. See the [backend README](../backend/README.md) for init, run, and deploy instructions.

### Initialize

We use the `firebase init` command to initialize a backend. This can either be in a separate repository and then you add both repositories to an organization for the client (this is what I usually do) or you can just have a `frontend` and `backend` directory in one repo.

Select which firebase features you need (usually **Functions** & **Firestore**).

Example: export an HTTP function with CORS so the frontend can call it via `fetch()`:

```javascript
const { onRequest } = require('firebase-functions/v2/https')

exports.demo = onRequest(
  { cors: true },
  (request, response) => {
    response.set('Access-Control-Allow-Origin', '*')
    response.status(200).json({
      message: 'Hello from Firebase!',
      timestamp: new Date().toISOString(),
    })
  }
)
```

## Iteration

Cursor is very proficient in JavaScript so writing functions is a breeze. If both frontend and backend are in the Cursor workspace, just instruct it to hook them up and it should do so using the **Fetch API**. Example from a Vue component:

```javascript
const functionsUrl = import.meta.env.VITE_FUNCTIONS_URL
const res = await fetch(functionsUrl)
const data = await res.json()
// use data (e.g. message, timestamp)
```

---

## Deployment

I use **Cloudflare Pages** for deployment as they allow free unlimited static page hosting and have incredible automatic deployment integration with GitHub. Setup a project, connect it to a repo and each deployment is automatically deployed to production.

I will handle the DNS and domain management stuff but if you are interested play around it with it, I host my portfolio website `tanuj.xyz` on it with a custom domain pointing to `personal-website.pages.dev`

Understand how to setup specific branches such as `dev`, `test`, `prod`, etc.

---

## Further Reading

This is a stack I have been using for a while. Recently some new frameworks have come out to make full-stack development easier with [Nuxt.js](https://nuxt.com/) (Vue.js frontend + Nitro backend) instead of Firebase Functions (which uses Express.js under the hood). Cloudflare Pages specifically supports Nitro deployments as well. If you want to play around with this and see if it easier, be my guest.
