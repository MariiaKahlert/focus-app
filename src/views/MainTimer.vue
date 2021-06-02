<template>
  <!-- Player -->
  <button
    type="button"
    @click="showPlayer"
    class="absolute right-4 focus:outline-none"
  >
    <img
      v-if="!playerShowed"
      src="../assets/music-player.png"
      alt=""
      class="h-8 w-8"
    />
    <img v-else src="../assets/stop-button.png" alt="" class="h-8 w-8" />
  </button>
  <audio
    class="hidden"
    v-if="playerShowed"
    autoplay
    controls
    src="https://live.radioart.com/fAmbient.mp3"
  ></audio>
  <!-- Main Timer -->
  <div class="h-full flex flex-col items-center mt-12">
    <h1 v-if="!timerStarted" class="text-xl font-bold w-2/3 text-center">
      Set a timer up to 60 minutes and stay focused
    </h1>
    <!-- All labels -->
    <div v-if="!timerStarted" class="flex w-full justify-evenly flex-wrap mt-4">
      <button
        v-for="label in labels"
        :key="label.name"
        @click="selectLabel(label.id)"
        :class="{
          'bg-yellow-800 text-yellow-50': selectedLabelId === label.id,
          'text-yellow-800 text-opacity-50': selectedLabelId !== label.id,
        }"
        class="
          text-lg
          mt-3
          py-2
          px-4
          rounded-full
          font-bold
          focus:outline-none
          border-2 border-yellow-800 border-opacity-50
        "
      >
        {{ label.name }}
        <span
          v-if="!label.default"
          :class="{
            hidden: selectedLabelId === label.id,
          }"
          class="text-yellow-800 ml-1"
          @click.prevent="deleteLabel(label.id)"
          >X</span
        >
      </button>
    </div>
    <!-- Selected label after the timer has been started -->
    <div
      v-else
      class="flex flex-col items-center w-full justify-evenly flex-wrap mt-4"
    >
      <img
        style="width: 200px; height: 200px"
        class="-mt-10"
        src="../assets/focus.png"
        alt=""
      />
      <span
        v-if="selectedLabel"
        class="
          text-lg
          mt-4
          py-2
          px-4
          rounded-full
          font-bold
          focus:outline-none
          bg-yellow-800
          text-yellow-50
        "
      >
        {{ selectedLabel.name }}
      </span>
    </div>
    <!-- Create label -->
    <div
      v-if="!timerStarted && !createLabelShowed"
      class="flex text-lg items-center mt-6"
    >
      <p @click="showCreateLabel" class="text-yellow-800 text-opacity-50">
        Make your own label
      </p>
      <button
        class="
          ml-4
          text-4xl
          font-bold
          focus:text-yellow-800 focus:text-opacity-50
          focus:outline-none
        "
        @click="showCreateLabel"
      >
        +
      </button>
    </div>
    <form
      v-show="!timerStarted && createLabelShowed"
      @submit.prevent="handleCreate"
      class="flex items-center mt-6"
    >
      <button
        type="button"
        @click="closeCreateLabel"
        class="
          mr-4
          text-2xl text-yellow-800 text-opacity-50
          font-bold
          focus:text-yellow-800
          focus:outline-none
        "
      >
        X
      </button>
      <input
        type="text"
        placeholder="name"
        v-model="labelName"
        class="
          bg-yellow-50
          border-2 border-yellow-800 border-opacity-50
          rounded-full
          py-1
          px-2
          focus:border-yellow-800
          focus:outline-none
        "
      />
      <button
        type="submit"
        class="
          ml-4
          text-4xl
          font-bold
          focus:text-yellow-800 focus:text-opacity-50
          focus:outline-none
        "
      >
        +
      </button>
    </form>
    <!-- Timer itself -->
    <Timer
      class="mb-12"
      @startTimer="startTimer"
      @timerUp="timerUp"
      @timerCancelled="timerCancelled"
    />
  </div>
</template>

<script>
import { db, currentUser } from "../main";
import firebase from "firebase/app";
export default {
  name: "MainTimer",
  data: function () {
    return {
      // currentUser: null,
      labels: [],
      labelName: null,
      labelColor: null,
      createLabelShowed: false,
      selectedLabel: null,
      selectedLabelId: null,
      stopAuthStateChanged: null,
      totalFocusTime: null,
      timerStarted: false,
      playerShowed: false,
    };
  },
  props: {},
  mounted: async function () {
    try {
      // Add new user to Firestore
      const user = await db
        .collection("users")
        .doc(currentUser.value.uid)
        .get();
      if (!user.exists) {
        await db.collection("users").doc(currentUser.value.uid).set({
          name: currentUser.value.displayName,
          total_focus_time: 0,
        });
      }

      // Get and/or add labels
      const labelsQuery = db
        .collection("labels")
        .where("user_id", "==", currentUser.value.uid);
      const allLabels = await labelsQuery.get();
      const defaultLabels = ["Work", "Study"];
      if (allLabels.docs.length === 0) {
        for (let label of defaultLabels) {
          await db.collection("labels").add({
            name: label,
            default: true,
            total_minutes: 0,
            user_id: currentUser.value.uid,
          });
        }
      }
      labelsQuery.onSnapshot(async (snapshot) => {
        this.labels = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
      });
    } catch (err) {
      console.log("Error is MainTimer mounted: ", err);
    }
  },

  methods: {
    async handleCreate() {
      try {
        await db.collection("labels").add({
          name: this.labelName,
          total_minutes: 0,
          user_id: currentUser.value.uid,
        });
        this.closeCreateLabel();
      } catch (err) {
        console.log("Error in handleCreate: ", err);
      }
    },
    selectLabel: function (labelId) {
      if (!this.selectedLabelId || this.selectedLabelId !== labelId) {
        this.selectedLabelId = labelId;
      } else {
        this.selectedLabelId = null;
      }
    },
    showCreateLabel: function () {
      this.createLabelShowed = true;
    },
    closeCreateLabel: function () {
      this.createLabelShowed = false;
      this.labelName = null;
    },
    startTimer: function () {
      const label = this.labels.find(
        (label) => label.id === this.selectedLabelId
      );
      this.selectedLabel = label;
      this.timerStarted = true;
    },
    timerUp: async function (initialTimeLimitInMin) {
      this.timerStarted = false;
      this.totalFocusTime = initialTimeLimitInMin;
      try {
        await db
          .collection("users")
          .doc(currentUser.value.uid)
          .update({
            total_focus_time: firebase.firestore.FieldValue.increment(
              parseInt(this.totalFocusTime)
            ),
          });
        if (this.selectedLabelId) {
          await db
            .collection("labels")
            .doc(this.selectedLabelId)
            .update({
              total_minutes: firebase.firestore.FieldValue.increment(
                parseInt(this.totalFocusTime)
              ),
            });
        }
      } catch (err) {
        console.log("Error in MainTimer timerUp method: ", err);
      }
    },
    timerCancelled: function () {
      this.timerStarted = false;
    },
    deleteLabel: async function (labelId) {
      try {
        await db.collection("labels").doc(labelId).delete();
      } catch (err) {
        console.log("Error in MainTimer deleteLabel method: ", err);
      }
    },
    showPlayer: function () {
      this.playerShowed = !this.playerShowed;
    },
  },
};
</script>

<style scoped>
::placeholder {
  color: #92410d;
  opacity: 0.5;
}
</style>
