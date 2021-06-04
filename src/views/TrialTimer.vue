<template>
  <div class="h-full flex flex-col items-center">
    <template v-if="!timerStarted">
      <h1 class="font-bold text-4xl">Focus</h1>
      <h2 v-if="!congrats" class="text-center text-xl w-2/3 mt-4">
        Try setting a timer up to 60 minutes and start focusing
      </h2>
      <h2 v-else class="text-center text-xl w-2/3 mt-4">
        Congrats! You've managed to focus during
        <strong>{{ initialTimeLimitInMin }}</strong>
        {{ initialTimeLimitInMin === "1" ? "minute" : "minutes" }}!
      </h2>
    </template>
    <img
      v-else
      style="width: 200px; height: 200px"
      class=""
      src="../assets/focus-trial.png"
      alt=""
    />
    <Timer
      @startTimer="startTimer"
      @timerUp="timerUp"
      @timerCancelled="timerCancelled"
      :trialTimerMode="true"
      class="mt-12"
    />

    <router-link v-if="!timerStarted" to="/welcome" class="text-xl mt-8"
      >Back</router-link
    >
  </div>
</template>

<script>
export default {
  data: function () {
    return {
      initialTimeLimitInMin: null,
      timerStarted: false,
      congrats: false,
    };
  },
  methods: {
    startTimer: function (initialTimeLimitInMin) {
      this.timerStarted = true;
      this.initialTimeLimitInMin = initialTimeLimitInMin;
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
