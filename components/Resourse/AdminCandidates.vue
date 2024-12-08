<template>
  <VDataTable
    :headers="headers"
    :items="items"
    hover
    :search="search"
    class="elevation-1"
  >
    <template v-slot:top>
      <VToolbar flat>
        <VToolbarTitle text="Candidates" />
        <VSpacer />
        <VTextField
          v-model="search"
          class="mr-2"
          append-inner-icon="mdi-magnify"
          density="compact"
          variant="solo"
          label="Search"
          single-line
          hide-details
        />
        <!-- <v-btn
          :text="$vuetify.display.xs ? '' : 'Add Candidate'"
          prepend-icon="mdi-plus"
          color="green"
          class="mx-2 text-white"
          variant="flat"
          @click="openAddDialog"
        /> -->
      </VToolbar>
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
  </VDataTable>
</template>

<script>
export default {
  data: () => ({
    items: [],
    itemDialog: false,
    deleteDialog: false,
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
      { title: "Club", key: "club.name" },
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
    // openDeleteDialog(itemId) {
    //   this.selectedItemId = itemId;
    //   this.deleteDialog = true;
    // },
    // openAddDialog() {
    //   this.itemDialog = true;
    // },
    // openUpdateDialog(item) {
    //   this.selectedItemId = item.id;
    //   this.itemObj = { ...item };

    //   this.uploadedPhoto = this.itemObj.photo; // to display img
    //   this.uploadedAdharImg = this.itemObj.adhar_img; // to display img
    //   this.itemObj.photo = null;
    //   this.itemObj.adhar_img = null;
    //   this.itemDialog = true;
    // },
    // resetAndCloseDialogs() {
    //   this.selectedItemId = 0;
    //   this.itemObj = {
    //     title: null,
    //   };
    //   this.itemDialog = false;
    //   this.deleteDialog = false;
    //   this.itemObj.photo = null;
    //   this.itemObj.adhar_img = null;
    //   this.uploadedPhoto = null;
    //   this.uploadedAdharImg = null;
    // },
    // handleDelete() {
    //   if (this.selectedItemId < 1) return;
    //   apiDelete(`/admins/getCandidates/${this.selectedItemId}`).then((res) => {
    //     this.resetAndCloseDialogs();
    //     this.loadItems();
    //     alert("Item deleted successfully");
    //   });
    // },
    // async handleSubmit() {
    //   const { valid } = await this.$refs.itemForm.validate();
    //   if (!valid) return;

    //   const formData = objToFormData(this.itemObj);

    //   this.loading = true;
    //   if (this.selectedItemId > 0) {
    //     // Update an existing model
    //     if (this.itemObj.photo) {
    //       formData.set("photo", this.itemObj.photo);
    //     } else {
    //       formData.delete("photo");
    //     }
    //     if (this.itemObj.adhar_img) {
    //       formData.set("adhar_img", this.itemObj.adhar_img);
    //     } else {
    //       formData.delete("adhar_img");
    //     }

    //     formData.append("_method", "put");
    //     apiPost(`/admins/getCandidates/${this.selectedItemId}`, formData).then(
    //       (res) => {
    //         this.resetAndCloseDialogs();
    //         this.loadItems();
    //         alert("Record Updated successfully");
    //       }
    //     );
    //     return;
    //   } // Add a new item
    //   apiPost(`/admins/getCandidates`, formData).then(() => {
    //     this.resetAndCloseDialogs();
    //     this.loadItems();
    //     alert("New candidate Created successfully");
    //   });

    //   setTimeout(() => (this.loading = false), 3000);
    // },
    loadItems() {
      apiGet("/admins/getCandidates").then((res) => {
        this.items = res.data.data;
      });
    },
  },
  created() {
    // definePageMeta({ middleware: 'admin' });
    this.loadItems();
  },
};
</script>
