<template>
  <div class="h-full flex flex-col items-center justify-evenly">
    <h1 class="text-2xl font-bold">Welcome!</h1>
    <div class="flex w-full justify-evenly flex-wrap">
      <button
        v-for="label in labels"
        :key="label.name"
        @click="selectLabel"
        class="
          text-lg
          mt-3
          py-2
          px-4
          rounded-full
          font-bold
          focus:outline-none
          border-2 border-yellow-800 border-opacity-50
          text-yellow-800 text-opacity-50
          focus:bg-yellow-800
          focus:text-yellow-50
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
        @click="createLabelShowed = false"
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
import { db } from "../main";
export default {
  name: "MainTimer",
  data: function () {
    return {
      labels: [],
      labelName: null,
      labelColor: null,
      createLabelShowed: false,
    };
  },
  props: {},
  mounted: async function () {
    try {
      const labelsQuery = db.collection("labels").where("user_id", "==", "1");
      labelsQuery.onSnapshot((snapshot) => {
        this.labels = snapshot.docs.map((doc) => doc.data());
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
          user_id: "1",
        });
      } catch (err) {
        console.log("Error in handleCreate: ", err);
      }
    },
    // selectLabel: function () {},
    showCreateLabel: function () {
      this.createLabelShowed = true;
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
