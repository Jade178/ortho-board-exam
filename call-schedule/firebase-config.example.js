/*
 * Copy this file to `firebase-config.js` and paste your Firebase web app config.
 * When firebase-config.js exists and defines window.firebaseConfig, the app
 * switches from demo (mock) mode to live Google Auth + Firestore.
 *
 * Where to get these values:
 *   Firebase console → Project settings → General → "Your apps" → Web app → SDK setup → Config
 *
 * firebase-config.js is git-ignored so your keys are never committed. (These web
 * keys are not secrets per se, but keep them out of the repo anyway.)
 */
window.firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT.firebaseapp.com",
  projectId: "YOUR_PROJECT",
  storageBucket: "YOUR_PROJECT.appspot.com",
  messagingSenderId: "YOUR_SENDER_ID",
  appId: "YOUR_APP_ID",
};
