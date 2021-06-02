<template>
  <div class="h-full flex flex-col items-center mt-10">
    <img
      style="width: 200px; height: 200px"
      class="-mt-10"
      src="../assets/focus-2.png"
      alt=""
    />
    <span class="mt-4 text-xl font-bold">Your total focus time reaches</span>
    <span
      class="mt-4 p-2 border-2 border-yellow-800 rounded-lg font-bold text-xl"
      >{{ this.totalFocusTime }}
      {{ this.totalFocusTime === 1 ? "minute" : "minutes" }}</span
    >
    <div class="w-full mt-12 flex flex-col items-center">
      <h1 class="text-xl font-bold">Your achievements</h1>
      <div
        v-for="label in labels"
        :key="label.name"
        class="w-full flex items-center justify-between mt-6 text-lg"
      >
        <span class="bg-yellow-800 text-yellow-50 px-4 py-2 rounded-lg ml-5">{{
          label.name
        }}</span>
        <div class="flex items-center mr-5">
          <img
            src="../assets/focus-4.png"
            alt=""
            style="width: 35px; height: 35px"
          />
          <span class="ml-4"
            ><strong>{{ label.total_minutes }}</strong>
            {{ label.total_minutes === 1 ? "minute" : "minutes" }}</span
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { db, currentUser } from "../main";
export default {
  data: function () {
    return {
      stopAuthStateChanged: null,
      totalFocusTime: null,
      labels: [],
    };
  },
  mounted: async function () {
    try {
      const loggedInUser = await db
        .collection("users")
        .doc(currentUser.value.uid)
        .get();
      this.totalFocusTime = loggedInUser.data().total_focus_time;
      const loggedInUserLabels = await db
        .collection("labels")
        .where("user_id", "==", currentUser.value.uid)
        .get();
      this.labels = loggedInUserLabels.docs.map((label) => label.data());
    } catch (err) {
      console.log("Error in Statistics mounted: ", err);
    }
  },
};
</script>
