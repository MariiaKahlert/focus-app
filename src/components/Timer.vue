<template>
  <div class="h-full flex flex-col items-center justify-evenly">
    <template v-if="!timerStarted"
      ><h1 v-if="!congrats" class="text-center text-xl w-2/3">
        Try setting your own timer up to 60 minutes and focus on your task
      </h1>
      <h1 v-else class="text-center text-xl w-2/3">
        Congrats! You've managed to focus during
        <strong>{{ setTimeLimitInMin }}</strong>
        {{ setTimeLimitInMin === "1" ? "minute" : "minutes" }}!
      </h1>
    </template>

    <div class="flex flex-col items-center">
      <div
        class="
          border-8 border-yellow-800
          rounded-full
          flex
          justify-center
          items-center
          bg-yellow-100
          shadow-lg
          mt-12
        "
        style="height: 250px; width: 250px"
      >
        <div v-if="!timerStarted" class="font-bold text-4xl text-yellow-800">
          <input
            v-model="timeLimitInMin"
            type="number"
            placeholder="00"
            class="
              bg-yellow-100
              focus:outline-none
              w-16
              border-2 border-yellow-800
              rounded-lg
              px-2
              mr-2
              font-bold
            "
            min="1"
            max="60"
          />
          <span>:00</span>
        </div>

        <span v-else class="font-bold text-4xl">
          {{ formattedTimeLeft }}
        </span>
      </div>

      <Button v-if="!timerStarted" class="mt-12" @click="startTimer"
        >Focus</Button
      >

      <Button
        design="outlined"
        class="mt-12 text-lg"
        v-else-if="cancelTimeCountdown"
        @click="onTimesUp"
      >
        Cancel ({{ cancelTimeCountdown }})
      </Button>
    </div>
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
      timeLimitInMin: null,
      timePassed: 0,
      timerInterval: null,
      timerStarted: false,
      cancelTimeInSec: 10,
      congrats: false,
    };
  },
  mounted: function () {
    this.timerStarted;
  },
  watch: {
    timePassed(newValue) {
      if (newValue === this.timeLimitInMin * 60) {
        this.onTimesUp();
      }
    },
  },
  methods: {
    startTimer: function () {
      if (this.timeLimitInMin) {
        this.timerStarted = true;
        this.setTimeLimitInMin = this.timeLimitInMin;
        this.timerInterval = setInterval(() => (this.timePassed += 1), 1000);
      }
    },
    onTimesUp: function () {
      clearInterval(this.timerInterval);
      this.timerStarted = false;
      if (this.timeLimitInMin * 60 === this.timePassed) {
        this.congrats = true;
      }
      this.timeLimitInMin = null;
    },
  },
  computed: {
    calculateTimeLeft: function () {
      return this.timeLimitInMin * 60 - this.timePassed;
    },
    formattedTimeLeft: function () {
      const timeLeft = this.calculateTimeLeft;
      const minutes = Math.floor(timeLeft / 60);
      let seconds = timeLeft % 60;
      if (seconds < 10) {
        seconds = `0${seconds}`;
      }
      return `${minutes}:${seconds}`;
    },
    cancelTimeCountdown: function () {
      return 10 - this.timePassed >= 0 ? 10 - this.timePassed : null;
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
