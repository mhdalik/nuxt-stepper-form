<template>
  <div>Dashboard</div>
</template>

<script>
export default {
  components: {
    VStepperVertical,
    VStepperVerticalItem,
  },
  created() {
    definePageMeta({ layout: "guest" });
  },
};
</script>
