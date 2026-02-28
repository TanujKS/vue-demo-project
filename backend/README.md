# Backend (Firebase)

This backend uses **Firebase** as BaaS: **Cloud Functions** (HTTP API) and **Firestore** (database) for the demo project.

---

## Prerequisites

- **Node.js** (v20+; see `functions/package.json` `engines`)
- **Firebase CLI**: `npm install -g firebase-tools`
- A Firebase project: create one at [Firebase Console](https://console.firebase.google.com/) and note the project ID

---

## Initialize (first-time setup)

From the repo root:

```bash
cd backend
firebase init
```

When prompted:

1. Select **Functions** and **Firestore** (use space to toggle, enter to confirm).
2. Use an existing Firebase project or create one.
3. For Functions: choose **JavaScript** (or TypeScript if you prefer), accept default `functions` directory, install dependencies with npm when asked.
4. For Firestore: accept default `firestore.rules` and `firestore.indexes.json`.

If the repo already has `firebase.json` and `functions/`, you only need to install dependencies:

```bash
cd backend/functions
npm install
```

---

## Local development

Run the Functions emulator (and optionally Firestore):

```bash
cd backend
firebase emulators:start --only functions
```

With Firestore:

```bash
firebase emulators:start --only functions,firestore
```

The HTTP function will be available at a URL like:

`http://127.0.0.1:5001/<project-id>/us-central1/demo`

Use this URL as `VITE_FUNCTIONS_URL` in the frontend when testing locally.

---

## Deploy

Deploy Functions:

```bash
cd backend
firebase deploy --only functions
```

Deploy Firestore rules (if you changed them):

```bash
firebase deploy --only firestore:rules
```

After deploy, the demo function URL will be:

`https://us-central1-<project-id>.cloudfunctions.net/demo`

Set this (or your project’s URL) as `VITE_FUNCTIONS_URL` in the frontend for production.

---

## Frontend configuration

The frontend needs:

- **Functions URL**: `VITE_FUNCTIONS_URL` — base URL of the deployed (or emulator) demo function, e.g. `https://us-central1-<project-id>.cloudfunctions.net/demo` or `http://127.0.0.1:5001/<project-id>/us-central1/demo`.
- **Firebase config** (for Firestore): `VITE_FIREBASE_API_KEY`, `VITE_FIREBASE_PROJECT_ID`, etc., from the Firebase project settings (Project settings → General → Your apps).

See the [frontend README](../README.md) for env and config details.
