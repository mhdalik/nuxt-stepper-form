<template>
  <ResourseAdminCompetitions />
</template>

<script>
export default {
  created() {
    definePageMeta({ layout: "admin", middleware: "admin" });
  },
};
</script>
