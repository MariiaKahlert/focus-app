<template>
  <div
    v-if="currentUser"
    class="
      h-full
      bg-yellow-800
      px-4
      py-6
      text-yellow-50
      flex flex-col
      justify-between
    "
    style="width: 200px"
  >
    <div>
      <div class="text-xl flex flex-col items-center">
        <img
          style="width: 100px; height: 100px"
          class=""
          src="../assets/focus-3.png"
          alt=""
        />
        <p class="mt-2">Welcome</p>
        <p class="font-bold">{{ currentUser.displayName }}</p>
      </div>
      <div class="flex flex-col p-4 mt-16">
        <router-link
          to="/main-timer"
          @click="$emit('closeMenu')"
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
          @click="$emit('closeMenu')"
          class="
            text-yellow-50
            focus:outline-none
            focus:text-opacity-75
            text-xl
            self-start
            mt-4
          "
          >Statistics</router-link
        >
      </div>
    </div>
    <button
      @click="handleLogout"
      class="
        text-yellow-50
        focus:outline-none
        focus:text-opacity-75
        text-xl
        self-start
        mt-48
        pl-4
      "
    >
      Log out
    </button>
    <p class="text-yellow-50 text-opacity-75 text-center">
      Illustrations designed by Freepik Storyset
    </p>
  </div>
</template>

<script>
import { auth, currentUser } from "../main";
export default {
  data: function () {
    return {
      currentUser,
    };
  },
  methods: {
    handleLogout: function () {
      auth.signOut();
      this.$emit("closeMenu");
    },
  },
};
</script>
