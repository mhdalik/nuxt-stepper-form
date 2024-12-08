<template>
  <VDataTable
    :headers="headers"
    :items="items"
    hover
    :search="search"
    class="elevation-1"
  >
    <template v-slot:top>
      <v-toolbar flat>
        <v-toolbar-title text="Candidates" />
        <v-spacer />
        <v-text-field
          v-model="search"
          append-inner-icon="mdi-magnify"
          density="compact"
          variant="solo"
          label="Search"
          single-line
          hide-details
          class="mr-2"
        />
        <VBtn
          v-if="formFillable"
          :text="$vuetify.display.xs ? '' : 'Add Candidate'"
          prependIcon="mdi-plus"
          color="green"
          class="mx-2 text-white"
          variant="flat"
          @click="openAddDialog"
        />
      </v-toolbar>
    </template>
    <template v-slot:item.photo="{ item }">
      <VImg
        height="40"
        :src="$config.public.IMAGE_URL_PREFIX + '/photos/' + item.photo"
      />
    </template>
    <template v-slot:item.adhar_img="{ item }">
      <VImg
        height="40"
        :src="$config.public.IMAGE_URL_PREFIX + '/adhrs/' + item.adhar_img"
      />
    </template>
    <template v-slot:item.action="{ item }">
      <VIcon
        v-if="formFillable"
        icon="mdi-pencil"
        size="small"
        class="me-2"
        @click="openUpdateDialog(item)"
        color="primary"
      />
      <VIcon
        v-if="formFillable"
        icon="mdi-trash-can"
        size="small"
        @click="openDeleteDialog(item.id)"
        color="red"
      />
    </template>
  </VDataTable>

  <CDialog
    v-model="itemDialog"
    title="Add/Edit Candidate"
    @onCancel="resetAndCloseDialogs"
    @onSave="handleSubmit"
    :disabled="loading"
    :loading="loading"
  >
    <VForm ref="itemForm">
      <v-row class="ma-0">
        <v-col cols="12" sm="6" md="6">
          <CTF label="Name*" v-model.trim="itemObj.name" :rules="rules.name" />
        </v-col>
        <v-col cols="12" sm="6" md="6">
          <CTF
            label="Dob*"
            type="date"
            v-model.trim="itemObj.dob"
            :rules="rules.dob"
          />
        </v-col>
        <v-col cols="12" sm="6" md="6">
          <CSelect
            label="Gender*"
            :items="['Male', 'Female']"
            v-model="itemObj.gender"
            :rules="rules.gender"
          />
        </v-col>
      </v-row>
      <VRow>
        <v-col cols="12" sm="6" md="6">
          <VFileInput
            label="Profile Photo"
            type="file"
            accept="image/*"
            variant="outlined"
            density="compact"
            v-model="itemObj.photo"
            :rules="rules.photo"
          />
        </v-col>
        <v-col cols="12" sm="6" md="6">
          <VFileInput
            label="Adhar Image"
            type="file"
            variant="outlined"
            density="compact"
            accept="image/*"
            v-model="itemObj.adhar_img"
            :rules="rules.adhar_img"
          />
        </v-col>
      </VRow>
      <VRow>
        <v-col cols="12" sm="6" md="6"
          ><img
            width="160"
            :src="$config.public.IMAGE_URL_PREFIX + '/photos/' + uploadedPhoto"
        /></v-col>
        <v-col cols="12" sm="6" md="6"
          ><img
            width="160"
            :src="
              $config.public.IMAGE_URL_PREFIX + '/adhrs/' + uploadedAdharImg
            "
        /></v-col>
      </VRow>
    </VForm>
  </CDialog>

  <CDialog
    saveTitle="Delete"
    title="Delete Candidate"
    v-model="deleteDialog"
    @onCancel="resetAndCloseDialogs"
    @onSave="handleDelete"
  >
    <p style="color: red">
      Are you sure want to delete the candidate? this will also remove the
      candidate from all associated competitions
    </p>
  </CDialog>
</template>

<script>
export default {
  data: () => ({
    formFillable: false,
    items: [],
    itemDialog: false,
    deleteDialog: false,
    loading: false,
    search: null,
    selectedItemId: 0,
    uploadedAdharImg: null,
    uploadedPhoto: null,
    itemObj: {
      photo: null,
      adhar_img: null,
    },
    rules: {
      name: [
        (v) => !!v || "Required",
        (v) => v.length <= 255 || "Max length exceeded",
      ],
      gender: [(v) => !!v || "Required"],
      dob: [(v) => !!v || "Required"],
      photo: [(v) => !!v || "Required"],
      adhar_img: [(v) => !!v || "Required"],
    },
    headers: [
      { title: "Photo", key: "photo", sortable: false },
      { title: "Name", key: "name" },
      { title: "Gender", key: "gender" },
      { title: "Dob", key: "dob", sortable: false },
      { title: "Age", key: "age", sortable: false },
      { title: "Adhar", key: "adhar_img", sortable: false },
      { title: "", key: "action" },
    ],
  }),
  methods: {
    openDeleteDialog(itemId) {
      this.selectedItemId = itemId;
      this.deleteDialog = true;
    },
    openAddDialog() {
      this.itemDialog = true;
    },
    openUpdateDialog(item) {
      this.selectedItemId = item.id;
      this.itemObj = { ...item };

      this.uploadedPhoto = this.itemObj.photo; // to display img
      this.uploadedAdharImg = this.itemObj.adhar_img; // to display img
      this.itemObj.photo = null;
      this.itemObj.adhar_img = null;
      this.itemDialog = true;
    },
    resetAndCloseDialogs() {
      this.selectedItemId = 0;
      this.itemObj = {
        title: null,
      };
      this.itemDialog = false;
      this.deleteDialog = false;
      this.itemObj.photo = null;
      this.itemObj.adhar_img = null;
      this.uploadedPhoto = null;
      this.uploadedAdharImg = null;
    },
    handleDelete() {
      if (this.selectedItemId < 1) return;
      apiDelete(`/clubs/candidates/${this.selectedItemId}`).then((res) => {
        this.resetAndCloseDialogs();
        this.loadItems();
        alert("Item deleted successfully");
      });
    },
    async handleSubmit() {
      const { valid } = await this.$refs.itemForm.validate();
      if (!valid) return;
      const formData = objToFormData(this.itemObj);
      this.loading = true;

      if (this.selectedItemId > 0) {
        // Update an existing model
        if (this.itemObj.photo) {
          formData.set("photo", this.itemObj.photo);
        } else {
          formData.delete("photo");
        }
        if (this.itemObj.adhar_img) {
          formData.set("adhar_img", this.itemObj.adhar_img);
        } else {
          formData.delete("adhar_img");
        }

        formData.append("_method", "put");
        apiPost(`/clubs/candidates/${this.selectedItemId}`, formData).then(
          (res) => {
            this.resetAndCloseDialogs();
            this.loadItems();
            alert("Record Updated successfully");
            setTimeout(() => (this.loading = false), 1000);
          }
        );
        return;
      } // Add a new item
      apiPost(`/clubs/candidates`, formData).then(() => {
        this.resetAndCloseDialogs();
        this.loadItems();
        alert("New candidate Created successfully");
        setTimeout(() => (this.loading = false), 1000);
      });
    },
    loadItems() {
      apiGet("/clubs/candidates").then((res) => {
        this.items = res.data.data;
      });
    },
  },
  created() {
    checkAndGetAuthUser().then(({ isLoggedIn, user }) => {
      this.formFillable = user?.form_filling ?? false;
    });
    this.loadItems();
  },
};
</script>
