<template>
  <div class="h-full flex flex-col items-center justify-evenly">
    <h1 class="text-2xl font-bold">Welcome!</h1>
    <div class="flex w-full justify-evenly">
      <button
        v-for="label in labels"
        :key="label.name"
        class="
          text-lg
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
    <div v-if="false">
      <p>Create your own label</p>
      <form @submit.prevent="handleCreate">
        <input type="text" placeholder="name" v-model="labelName" />
        <input type="text" placeholder="color" v-model="labelColor" />
        <button type="submit">Create</button>
      </form>
    </div>
    <Timer />
  </div>
</template>

<script>
import { db } from "../main";
export default {
  name: "About",
  data: function () {
    return { labels: [], labelName: null, labelColor: null };
  },
  props: {},
  mounted: async function () {
    try {
      const labelsQuery = db.collection("labels").where("user_id", "==", "1");
      labelsQuery.onSnapshot((snapshot) => {
        this.labels = snapshot.docs.map((doc) => doc.data());
      });
    } catch (err) {
      console.log("Error is About mounted: ", err);
    }
  },
  methods: {
    async handleCreate() {
      try {
        await db.collection("labels").add({
          name: this.labelName,
          color: this.labelColor,
          total_minutes: 0,
          user_id: "1",
        });
      } catch (err) {
        console.log("Error in handleCreate: ", err);
      }
    },
  },
};
</script>
