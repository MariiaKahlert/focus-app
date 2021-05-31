<template>
  <div class="h-full flex flex-col items-center justify-evenly">
    <template v-if="!timerStarted">
      <h1 v-if="!congrats" class="text-center text-xl w-2/3">
        Try setting your own timer up to 60 minutes and focus on your task
      </h1>
      <h1 v-else class="text-center text-xl w-2/3">
        Congrats! You've managed to focus during
        <strong>{{ setTimeLimitInMin }}</strong>
        {{ setTimeLimitInMin === "1" ? "minute" : "minutes" }}!
      </h1>
    </template>
    <Timer
      @startTimer="startTimer"
      @timerUp="timerUp"
      @timerCancelled="timerCancelled"
    />

    <router-link v-if="!timerStarted" to="/welcome" class="text-xl"
      >Back</router-link
    >
  </div>
</template>

<script>
export default {
  data: function () {
    return {
      setTimeLimitInMin: null,
      timerStarted: false,
      congrats: false,
    };
  },
  methods: {
    startTimer: function (setTimeLimitInMin) {
      this.timerStarted = true;
      this.setTimeLimitInMin = setTimeLimitInMin;
    },
    timerUp: function () {
      this.timerStarted = false;
      this.congrats = true;
    },
    timerCancelled: function () {
      this.timerStarted = false;
      this.congrats = false;
    },
  },
};
</script>

<style scoped>
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

::placeholder {
  color: #92410d;
  opacity: 0.5;
  font-weight: bold;
}
</style>
