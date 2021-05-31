<template>
  <div class="h-full flex flex-col items-center justify-center">
    <div
      class="
        border-8 border-yellow-800
        rounded-full
        flex
        justify-center
        items-center
        bg-yellow-100
        shadow-lg
      "
      style="height: 250px; width: 250px"
    >
      <span class="font-bold text-4xl">
        <!-- Remaining time label -->
        {{ formattedTimeLeft }}
      </span>
    </div>
    <Button class="mt-12 text-xl" @click.prevent="startTimer">Focus</Button>
  </div>
</template>

<script>
export default {
  data: function () {
    return {
      timeLimit: 15,
      timePassed: 0,
      timerInterval: null,
    };
  },
  watch: {
    timePassed(newValue) {
      if (newValue === this.timeLimit) {
        this.onTimesUp();
      }
    },
  },
  methods: {
    startTimer: function () {
      this.timerInterval = setInterval(() => (this.timePassed += 1), 1000);
    },
    onTimesUp: function () {
      clearInterval(this.timerInterval);
    },
  },
  computed: {
    calculateTimeLeft: function () {
      return this.timeLimit - this.timePassed;
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
  },
};
</script>
