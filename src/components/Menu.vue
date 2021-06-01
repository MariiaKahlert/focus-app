<template>
  <div class="h-full w-1/2 bg-yellow-800 p-4">
    <button
      @click="handleLogout"
      class="text-yellow-50 focus:outline-none focus:text-opacity-75"
    >
      Log out
    </button>
  </div>
</template>

<script>
import { auth } from "../main";
import router from "../router";
export default {
  methods: {
    handleLogout: function () {
      auth.signOut();
      router.push("/welcome");
      this.$emit("closeMenu");
    },
  },
};
</script>
