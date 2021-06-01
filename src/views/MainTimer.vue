<template>
  <div class="h-full flex flex-col items-center mt-10">
    <h1 v-if="!timerStarted" class="text-xl font-bold w-2/3 text-center">
      Set up a timer up to 60 min and start focusing
    </h1>

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
          class="text-yellow-800 ml-1"
          @click.prevent="deleteLabel(label.id)"
          >X</span
        >
      </button>
    </div>
    <div v-else class="flex w-full justify-evenly flex-wrap mt-4">
      <p
        class="
          text-lg
          mt-3
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
      </p>
    </div>

    <div
      v-if="!timerStarted && !createLabelShowed"
      class="flex text-lg items-center mt-6"
    >
      <p class="text-yellow-800 text-opacity-50">Make your own label</p>
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
      v-else-if="!timerStarted && createLabelShowed"
      @submit.prevent="handleCreate"
      class="flex items-center mt-6"
    >
      <button
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

    <Timer
      class="mb-12"
      @startTimer="startTimer"
      @timerUp="timerUp"
      @timerCancelled="timerCancelled"
    />
  </div>
</template>

<script>
import { db, auth } from "../main";
import firebase from "firebase/app";
export default {
  name: "MainTimer",
  data: function () {
    return {
      currentUser: null,
      labels: [],
      labelName: null,
      labelColor: null,
      createLabelShowed: false,
      selectedLabel: null,
      selectedLabelId: null,
      stopAuthStateChanged: null,
      totalFocusTime: null,
      timerStarted: false,
    };
  },
  props: {},
  mounted: async function () {
    this.stopAuthStateChanged = auth.onAuthStateChanged(async (user) => {
      this.currentUser = user;
      if (!this.currentUser) {
        return;
      }
      try {
        // Add new user to Firestore
        const user = await db
          .collection("users")
          .doc(this.currentUser.uid)
          .get();
        if (!user.exists) {
          await db.collection("users").doc(this.currentUser.uid).set({
            name: this.currentUser.displayName,
            total_focus_time: 0,
          });
        }

        // Get and/or add labels
        const labelsQuery = db
          .collection("labels")
          .where("user_id", "==", this.currentUser.uid);
        const allLabels = await labelsQuery.get();
        const defaultLabels = ["Work", "Study"];
        if (allLabels.docs.length === 0) {
          for (let label of defaultLabels) {
            await db.collection("labels").add({
              name: label,
              default: true,
              total_minutes: 0,
              user_id: this.currentUser.uid,
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
    });
  },
  unmounted: function () {
    this.stopAuthStateChanged();
  },
  methods: {
    async handleCreate() {
      try {
        await db.collection("labels").add({
          name: this.labelName,
          total_minutes: 0,
          user_id: this.currentUser.uid,
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
    timerUp: async function (setTimeLimitInMin) {
      this.timerStarted = false;
      this.totalFocusTime = setTimeLimitInMin;
      await db
        .collection("users")
        .doc(this.currentUser.uid)
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
    },
    timerCancelled: function () {
      this.timerStarted = false;
    },
    deleteLabel: async function (labelId) {
      await db.collection("labels").doc(labelId).delete();
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
