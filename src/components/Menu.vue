<template>
  <div class="h-full w-1/2 bg-yellow-800 p-4">
    <router-link
      to="/welcome"
      @click="handleLogout"
      class="text-yellow-50 focus:outline-none focus:text-opacity-75"
      >Log out</router-link
    >
  </div>
</template>

<script>
import { auth } from "../main";
export default {
  methods: {
    handleLogout: function () {
      auth.signOut();
      this.$emit("closeMenu");
    },
  },
};
</script>
