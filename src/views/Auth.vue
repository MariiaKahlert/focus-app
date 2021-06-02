<template>
  <div class="h-full flex flex-col items-center">
    <div class="flex flex-col items-center text-center">
      <h1 class="font-bold text-4xl">Focus</h1>
      <p class="mt-4 w-2/3 text-xl text-yellow-800">
        Stay in focus whenever you need
      </p>
      <img
        style="width: 200px; height: 200px"
        class="mt-4"
        src="../assets/focus-1.png"
        alt=""
      />
    </div>
    <div class="flex flex-col items-center mt-10">
      <Button @click.prevent="handleTryNow">Try now</Button>
      <p class="mt-6 text-xl text-yellow-800 text-opacity-75">or</p>
      <div
        :key="new Date().getTime()"
        id="firebaseui-auth-container"
        class="mt-2 mb-4"
      ></div>
    </div>
    <p class="text-yellow-800 text-opacity-75 text-center">
      Illustrations designed by Freepik Storyset
    </p>
  </div>
</template>

<script>
import router from "../router";
import { authUi } from "../main";
import firebase from "firebase/app";
import "firebaseui/dist/firebaseui.css";
export default {
  data: function () {
    return {
      user: null,
    };
  },
  methods: {
    handleTryNow: function () {
      router.push("/trial-timer");
    },
    handleSignIn: function () {
      authUi.start("#firebaseui-auth-container", {
        callbacks: {
          // Do not redirect after signing in
          signInSuccessWithAuthResult: () => {
            router.push("/main-timer");
            return false;
          },
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
    this.handleSignIn();
  },
};
</script>

<style>
#firebaseui-auth-container .firebaseui-card-content {
  padding: 0;
}
#firebaseui-auth-container .firebaseui-idp-button[data-provider-id="password"] {
  background-color: #92410d !important;
  font-family: "Work Sans", sans-serif !important;
  padding: 1rem 2rem;
  max-width: 500px;
  font-weight: bold;
  border-radius: 9999px;
  --tw-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1),
    0 4px 6px -2px rgba(0, 0, 0, 0.05);
  box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000),
    var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);
  display: flex;
  justify-content: center;
}
#firebaseui-auth-container
  .firebaseui-idp-button[data-provider-id="password"]
  .firebaseui-idp-text {
  color: #fffbeb !important;
  font-size: 20px !important;
  padding-left: 0;
}

#firebaseui-auth-container
  .firebaseui-idp-button[data-provider-id="password"]
  .firebaseui-idp-icon {
  display: none;
}

#firebaseui-auth-container
  .firebaseui-idp-button[data-provider-id="google.com"] {
  padding: 1rem 2rem;
  max-width: 500px;
  border-radius: 9999px;
  font-weight: bold;
  --tw-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1),
    0 4px 6px -2px rgba(0, 0, 0, 0.05);
  box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000),
    var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);
}

#firebaseui-auth-container
  .firebaseui-idp-button[data-provider-id="google.com"]
  .firebaseui-idp-text {
  font-size: 20px !important;
}

#firebaseui-auth-container {
  font-family: "Work Sans", sans-serif !important;
}

#firebaseui-auth-container .mdl-card {
  background-color: #fffbeb !important;
}
</style>
