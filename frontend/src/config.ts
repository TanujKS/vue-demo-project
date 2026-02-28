/**
 * App config from env. Set in .env or .env.local:
 * - VITE_FUNCTIONS_URL: full URL of the demo HTTP function (e.g. https://us-central1-PROJECT.cloudfunctions.net/demo)
 * - VITE_FIREBASE_API_KEY, VITE_FIREBASE_PROJECT_ID, etc. for Firestore
 */
const env = import.meta.env

export const functionsUrl: string =
  (env.VITE_FUNCTIONS_URL as string) || ''

export interface FirebaseConfig {
  apiKey: string
  authDomain?: string
  projectId: string
  storageBucket?: string
  messagingSenderId?: string
  appId?: string
}

export function getFirestoreConfig(): FirebaseConfig | null {
  const apiKey = env.VITE_FIREBASE_API_KEY as string | undefined
  const projectId = env.VITE_FIREBASE_PROJECT_ID as string | undefined
  if (!apiKey || !projectId) return null
  return {
    apiKey,
    projectId,
    authDomain: env.VITE_FIREBASE_AUTH_DOMAIN as string | undefined,
    storageBucket: env.VITE_FIREBASE_STORAGE_BUCKET as string | undefined,
    messagingSenderId: env.VITE_FIREBASE_MESSAGING_SENDER_ID as string | undefined,
    appId: env.VITE_FIREBASE_APP_ID as string | undefined,
  }
}
