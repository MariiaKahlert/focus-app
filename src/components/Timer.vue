<template>
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
          @blur="validateTimeInput"
          pattern="[0-9]*"
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
      @click="stopTimer"
    >
      Cancel ({{ cancelTimeCountdown }})
    </Button>
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
    };
  },
  mounted: function () {
    this.timerStarted;
  },
  watch: {
    timePassed(newValue) {
      if (newValue === this.timeLimitInMin * 60) {
        this.stopTimer();
      }
    },
  },
  methods: {
    startTimer: function () {
      if (this.timeLimitInMin) {
        this.timerStarted = true;
        this.setTimeLimitInMin = this.timeLimitInMin;
        this.timerInterval = setInterval(() => (this.timePassed += 1), 1000);
        this.$emit("startTimer", this.setTimeLimitInMin);
      }
    },
    stopTimer: function () {
      if (!this.timerStarted) {
        return;
      }
      clearInterval(this.timerInterval);
      this.timerStarted = false;
      if (this.timeLimitInMin * 60 === this.timePassed) {
        this.$emit("timerUp", this.setTimeLimitInMin);
      } else {
        this.$emit("timerCancelled");
      }
      this.timeLimitInMin = null;
      this.timePassed = 0;
    },
    validateTimeInput: function () {
      if (this.timeLimitInMin > 60) {
        this.timeLimitInMin = 60;
      }
      if (this.timeLimitInMin && this.timeLimitInMin < 1) {
        this.timeLimitInMin = 1;
      }
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
