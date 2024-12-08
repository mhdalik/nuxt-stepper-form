<template>
  <VDataTable
    :headers="headers"
    :items="items"
    hover
    :search="search"
    class="elevation-1"
    showExpand
    :expanded="expanded"
  >
    <template v-slot:top>
      <v-toolbar flat>
        <v-toolbar-title text="Competitions" />
        <v-spacer />
        <v-text-field
          v-model="search"
          appendInnerIcon="mdi-magnify"
          density="compact"
          variant="solo"
          label="Search"
          singleLine
          hideDetails
          class="mr-2"
        />
      </v-toolbar>
    </template>
    <template v-slot:expanded-row="{ columns, item }">
      <tr>
        <td :colspan="columns.length">
          <VTable
            v-if="item.candidates && item.candidates.length > 0"
            density="compact"
          >
            <tbody>
              <tr v-for="candidate in item.candidates">
                <td>
                  <VImg
                    height="35"
                    :src="
                      $config.public.IMAGE_URL_PREFIX +
                      '/photos/' +
                      candidate.photo
                    "
                  />
                </td>
                <td>{{ candidate.club.name }}</td>
                <td>{{ candidate.name }}</td>
                <td>{{ candidate.gender }}</td>
                <td>{{ candidate.dob }}</td>
                <td>
                  <CSelect
                    v-if="$config.public.APP_ENV == 'local'"
                    width="100"
                    v-model="candidate.pivot.grade"
                    :items="['A', 'B', 'C']"
                    placeholder="Grade"
                    density="compact"
                    @update:modelValue="
                      setCompetitionGrade(
                        item.id,
                        candidate.pivot.id,
                        candidate.club_id,
                        candidate.pivot.grade
                      )
                    "
                  />
                </td>
              </tr>
            </tbody>
          </VTable>
          <p v-else>No Candidates addded for this competition</p>
        </td>
      </tr>
    </template>
    <template v-slot:item.name="{ item }">
      <b>{{ item.name }}</b>
    </template>
    <!-- <template v-slot:item.action="{ item }">
      <VBtn
        v-if="item.max_candidates > item.candidates.length"
        text="Add Candidate"
        @click="openUpdateDialog(item)"
        color="green"
        variant="flat"
      />
    </template> -->
  </VDataTable>

  <CDialog
    v-model="itemDialog"
    :title="'Assign Candidates for ' + itemObj.name"
    @onCancel="resetAndCloseDialogs"
    @onSave="handleSubmit"
  >
    <VForm ref="itemForm">
      <v-row class="ma-0">
        <VAutocomplete
          :items="candidates"
          v-model="itemObj.candidate_id"
          :rules="rules.candidates"
          variant="outlined"
          itemTitle="name"
          itemValue="id"
          label="Select"
          chips
          closableChips
        >
          <template v-slot:chip="{ props, item }">
            <v-chip
              v-bind="props"
              :prepend-avatar="
                $config.public.IMAGE_URL_PREFIX + '/photos/' + item.raw.photo
              "
              :text="item.raw.name"
            />
          </template>
          <template v-slot:item="{ props, item }">
            <v-list-item
              v-bind="props"
              :prependAvatar="
                $config.public.IMAGE_URL_PREFIX + '/photos/' + item.raw.photo
              "
              :subtitle="item.raw.gender"
              :title="item.raw.name"
            />
          </template>
        </VAutocomplete>
      </v-row>
    </VForm>
  </CDialog>

  <CDialog
    saveTitle="Delete"
    title="Delete Candidate"
    v-model="deleteDialog"
    @onCancel="resetAndCloseDialogs"
    @onSave="handleDelete"
  >
    Are you sure you want remove the candidate from the competition?
  </CDialog>
</template>

<script>
export default {
  data: () => ({
    expanded: [],
    items: [], // competitions list
    candidates: [],
    itemDialog: false,
    deleteDialog: false,
    search: null,
    selectedItemId: 0, // competition id
    itemObj: {},
    rules: {
      candidates: [(v) => !!v || "Required"],
    },
    headers: [
      { title: "Name", key: "name", sortable: false },
      // { title: "For", key: "for" },
      { title: "Category", key: "category", sortable: false },
      { title: "Max Candidates", key: "max_candidates", sortable: false },
      { title: "", key: "action", sortable: false },
    ],
  }),
  methods: {
    openDeleteDialog(competitionId, candidateId) {
      this.selectedItemId = 0;
      this.itemObj.competition_id = competitionId;
      this.itemObj.candidate_id = candidateId;
      this.deleteDialog = true;
    },
    openUpdateDialog(item) {
      this.selectedItemId = item.id;
      this.itemObj = { ...item.id };
      this.itemObj.competition_id = item.id;
      this.itemObj.candidate_id = null;
      this.itemDialog = true;
    },
    resetAndCloseDialogs() {
      this.selectedItemId = 0;
      this.itemObj = {};
      this.itemDialog = false;
      this.deleteDialog = false;
    },
    async setCompetitionGrade(competitionId, pivotId, clubId, grade) {
      this.loading = true;
      apiPost(`/admins/setCompetitionGrade`, {
        competitionId: competitionId,
        pivotId: pivotId,
        clubId: clubId,
        grade: grade,
      }).then((res) => {
        this.resetAndCloseDialogs();
        this.loadItems();
        alert("Grade Updated success");
      });
      setTimeout(() => (this.loading = false), 2000);
    },
    async handleSubmit() {
      // const { valid } = await this.$refs.itemForm.validate();
      // if (!valid) return;
      // this.loading = true;
      // apiPost(`/admins/assignCandidate`, this.itemObj).then((res) => {
      //   this.resetAndCloseDialogs();
      //   this.loadItems();
      //   alert("Record Updated successfully");
      // });
      // setTimeout(() => (this.loading = false), 2000);
    },
    async handleDelete() {
      this.loading = true;
      apiPost(`/admins/detachCandidate`, this.itemObj).then((res) => {
        this.resetAndCloseDialogs();
        this.loadItems();
        alert("Candidate removed from competition has been success");
      });
      setTimeout(() => (this.loading = false), 2000);
    },
    loadItems() {
      apiGet("/admins/getCompetitions").then((res) => {
        this.items = res.data.data;
        this.expanded = this.items.map((_, index) => index + 1);
      });
    },
    loadCandidates() {
      apiGet("/admins/getCandidates").then((res) => {
        this.candidates = res.data.data;
      });
    },
  },
  created() {
    // definePageMeta({ middleware: 'admin' });
    this.loadItems();
    this.loadCandidates();
  },
};
</script>
