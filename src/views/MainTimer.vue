<template>
  <div class="h-full flex flex-col items-center justify-evenly">
    <h1 class="text-2xl font-bold">Welcome!</h1>
    <div class="flex w-full justify-evenly flex-wrap">
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
      </button>
    </div>

    <div v-if="!createLabelShowed" class="flex text-lg items-center">
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

    <form v-else @submit.prevent="handleCreate" class="flex items-center">
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

    <Timer />
  </div>
</template>

<script>
import { db, auth } from "../main";

export default {
  name: "MainTimer",
  data: function () {
    return {
      currentUser: null,
      labels: [],
      labelName: null,
      labelColor: null,
      createLabelShowed: false,
      selectedLabelId: null,
    };
  },
  props: {},
  mounted: async function () {
    auth.onAuthStateChanged((user) => {
      this.currentUser = user;
      // console.log(this.currentUser.uid);
      try {
        const labelsQuery = db
          .collection("labels")
          .where("user_id", "in", ["1", this.currentUser.uid]);

        labelsQuery.onSnapshot((snapshot) => {
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
  },
};
</script>

<style scoped>
::placeholder {
  color: #92410d;
  opacity: 0.5;
}
</style>
