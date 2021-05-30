<template>
  <div class="about">
    <h1>This is an about page</h1>
  </div>
  <div>
    <ul v-for="label in labels" :key="label.name">
      <li>{{ label.name }}</li>
    </ul>
  </div>
</template>

<script>
import { db } from "../main";
export default {
  name: "About",
  data: function () {
    return { labels: [] };
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
};
</script>
