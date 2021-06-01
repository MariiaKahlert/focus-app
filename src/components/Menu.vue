<template>
  <div
    v-if="!loading"
    class="
      h-full
      w-1/2
      bg-yellow-800
      px-4
      py-6
      text-yellow-50
      flex flex-col
      justify-between
    "
  >
    <div class="text-xl">
      <p>Welcome,</p>
      <p class="font-bold">{{ currentUser.displayName }}</p>
    </div>

    <router-link
      to="/main-timer"
      class="
        text-yellow-50
        focus:outline-none
        focus:text-opacity-75
        text-xl
        self-start
      "
      >Timer</router-link
    >

    <router-link
      to="/statistics"
      class="
        text-yellow-50
        focus:outline-none
        focus:text-opacity-75
        text-xl
        self-start
      "
      >Statistics</router-link
    >
    <button
      @click="handleLogout"
      class="
        text-yellow-50
        focus:outline-none
        focus:text-opacity-75
        text-xl
        self-start
      "
    >
      Log out
    </button>
  </div>
</template>

<script>
import { auth } from "../main";
export default {
  data: function () {
    return {
      currentUser: null,
      loading: true,
    };
  },
  mounted: function () {
    auth.onAuthStateChanged((user) => {
      this.currentUser = user;
      this.loading = false;
    });
  },
  methods: {
    handleLogout: async function () {
      auth.signOut();
      this.$emit("closeMenu");
    },
  },
};
</script>
