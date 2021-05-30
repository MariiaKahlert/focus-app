<template>
  <div id="nav">
    <router-link to="/">Home</router-link> |
    <router-link to="/about">About</router-link>
  </div>
  <section v-if="!user" id="firebaseui-auth-container"></section>
  <button v-else @click="handleLogout">Log out</button>
  <router-view />
</template>

<script>
import { auth, authUi } from "./main";
import firebase from "firebase/app";
import "firebaseui/dist/firebaseui.css";
export default {
  data: function () {
    return {
      user: null,
    };
  },
  methods: {
    handleLogout: function () {
      auth.signOut();
    },
    handleSignIn: function () {
      authUi.start("#firebaseui-auth-container", {
        callbacks: {
          // Do not redirect after signing in
          signInSuccessWithAuthResult: () => false,
        },
        signInFlow: "popup",
        signInOptions: [
          firebase.auth.EmailAuthProvider.PROVIDER_ID,
          firebase.auth.GoogleAuthProvider.PROVIDER_ID,
        ],
      });
    },
  },
  mounted: function () {
    auth.onAuthStateChanged(async (user) => {
      this.user = user;
      await this.$nextTick();
      if (!user) {
        this.handleSignIn();
      }
    });
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
