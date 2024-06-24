<template>
  <div
    class="custom-card"
    :style="customStyle"
  >
    <slot/>
  </div>
</template>

<script lang="ts">

export default {
  data() {
    return {
      
    }
  },

  props: {
    customStyle: {
      type: Object,
      default: () => null,
    },
  },
}
</script>