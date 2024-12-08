<template>
  <ResourseCompetitions />
</template>

<script>
export default {
  created() {
    definePageMeta({ middleware: "clubowner", layout: "club" });
  },
};
</script>
