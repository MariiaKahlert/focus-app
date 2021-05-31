<template>
  <button
    :class="{
      'bg-yellow-800 text-yellow-50 shadow-lg focus:bg-yellow-700':
        design === 'filled',
      'text-yellow-800 border border-yellow-800 focus:text-opacity-50 focus:border-opacity-50':
        design === 'outlined',
    }"
    class="w-full px-8 py-4 rounded-full font-bold focus:outline-none text-xl"
  >
    <slot></slot>
  </button>
</template>

<script>
export default {
  props: {
    design: {
      type: String,
      default: "filled",
    },
  },
};
</script>
