import { createApp, ref } from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import "./index.css";
import BigButton from "./components/BigButton";
import Timer from "./components/Timer";
import Menu from "./components/Menu";

// Firebase App (the core Firebase SDK) is always required and must be listed first
import firebase from "firebase/app";
// If you are using v7 or any earlier version of the JS SDK, you should import firebase using namespace import
// import * as firebase from "firebase/app"

import * as firebaseui from "firebaseui";

// If you enabled Analytics in your project, add the Firebase SDK for Analytics
import "firebase/analytics";

// Add the Firebase products that you want to use
import "firebase/auth";
import "firebase/firestore";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAmPg8_sVFmh_WR5wdOMLsIid5B_3N-nrk",
  authDomain: "focus-app-spiced.firebaseapp.com",
  projectId: "focus-app-spiced",
  storageBucket: "focus-app-spiced.appspot.com",
  messagingSenderId: "878915209438",
  appId: "1:878915209438:web:c2cc16edcb75e17c085a4f",
  measurementId: "G-G8LPWCXGHR",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

// Firestore
export const db = firebase.firestore();

// Firebase auth
export const auth = firebase.auth();

// Initialize the FirebaseUI Widget using Firebase.
export const authUi = new firebaseui.auth.AuthUI(auth);

export let currentUser = ref(null);
let appMounted = false;

const app = createApp(App);

app.component("BigButton", BigButton);
app.component("Timer", Timer);
app.component("Menu", Menu);

const mountApp = () => {
  if (!appMounted) {
    app.use(router);
    app.mount("#app");
    appMounted = true;
  }
};

auth.onAuthStateChanged((user) => {
  currentUser.value = user;
  if (!user) {
    router.push("/welcome");
  }
  mountApp();
});
