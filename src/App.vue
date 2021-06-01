<template>
  <div class="p-4 h-screen w-screen relative">
    <router-view />
    <img
      v-if="currentUser"
      @click="showMenu"
      src="./assets/menu.png"
      alt="menu"
      class="h-7 w-7 absolute top-4"
    />
    <div
      v-if="menuShowed"
      @click="closeMenu"
      class="
        z-10
        absolute
        top-0
        left-0
        h-full
        w-full
        backdrop-filter backdrop-blur-sm
      "
    ></div>
    <Menu
      v-if="menuShowed"
      @closeMenu="closeMenu"
      class="z-20 absolute top-0 left-0"
    />
  </div>
</template>

<script>
import { auth } from "./main";
export default {
  data: function () {
    return {
      currentUser: null,
      menuShowed: false,
    };
  },
  mounted: function () {
    auth.onAuthStateChanged((user) => {
      this.currentUser = user;
    });
  },
  methods: {
    showMenu: function () {
      this.menuShowed = true;
    },
    closeMenu: function () {
      this.menuShowed = false;
    },
  },
};
</script>
