<template>
  <div
    class="p-4 h-screen w-screen relative"
    style="height: -webkit-fill-available"
  >
    <router-view />
    <button v-if="currentUser" @click="showMenu" class="absolute top-4">
      <img src="./assets/menu.png" alt="menu" class="h-7 w-7" />
    </button>
  </div>
  <nav
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
  ></nav>
  <transition name="slide">
    <Menu
      v-if="menuShowed"
      @closeMenu="closeMenu"
      class="z-20 absolute top-0 left-0"
    />
  </transition>
</template>

<script>
import { currentUser } from "./main";
export default {
  data: function () {
    return {
      currentUser,
      menuShowed: false,
    };
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

<style scoped>
.slide-enter-active {
  animation: slide-in 0.25s;
}
.slide-leave-active {
  animation: slide-in 0.25s reverse;
}
@keyframes slide-in {
  0% {
    transform: translateX(-200px);
  }
  100% {
    transform: translateX(0);
  }
}
</style>
