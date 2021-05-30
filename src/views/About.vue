<template>
  <div class="about">
    <h1>This is an about page</h1>
  </div>
  <div>
    <ul v-for="label in labels" :key="label.name">
      <li>{{ label.name }}</li>
    </ul>
  </div>
  <p>Create your own label</p>
  <form @submit.prevent="handleCreate">
    <input type="text" placeholder="name" v-model="labelName" />
    <input type="text" placeholder="color" v-model="labelColor" />
    <button type="submit">Create</button>
  </form>
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
