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
        <VToolbarTitle text="Clubs" />
        <VSpacer />
        <VTextField
          v-model="search"
          append-inner-icon="mdi-magnify"
          density="compact"
          variant="solo"
          label="Search"
          single-line
          hide-details
        />
        <VBtn
          :text="$vuetify.display.xs ? '' : 'Add Club'"
          prependIcon="mdi-plus"
          color="green"
          class="mx-2 text-white"
          variant="flat"
          @click="openAddDialog"
        />
      </VToolbar>
    </template>
    <template v-slot:item.action="{ item }">
      <VIcon
        icon="mdi-pencil"
        size="small"
        class="me-2"
        @click="openUpdateDialog(item)"
        color="primary"
      />
      <!-- <VIcon
        icon="mdi-trash-can"
        size="small"
        @click="openDeleteDialog(item.id)"
        color="red"
      /> -->
    </template>
    <template v-slot:item.form_filling="{ item }">
      <VSwitch
        v-model="item.form_filling"
        hideDetails
        :trueValue="1"
        :falseValue="0"
        inset
        color="green"
        @update:modelValue="toggleFormFilling(item.id)"
      />
    </template>
  </VDataTable>

  <CDialog
    v-model="itemDialog"
    title="Add/Edit Status"
    @onCancel="resetAndCloseDialogs"
    @onSave="handleSubmit"
    :disabled="loading"
    :loading="loading"
  >
    <VForm ref="itemForm">
      <VRow class="ma-0">
        <VCol cols="12" sm="6" md="6">
          <CTF
            label="Club Name"
            v-model.trim="itemObj.name"
            :rules="rules.name"
          />
        </VCol>
        <VCol cols="12" sm="6" md="6">
          <CTF
            label="Email"
            type="email"
            v-model.trim="itemObj.email"
            :rules="rules.email"
          />
        </VCol>
      </VRow>
      <VRow class="ma-0">
        <VCol cols="12" sm="6" md="6">
          <CTF
            label="Password"
            v-model.trim="itemObj.password"
            :rules="[passwordRule]"
          />
        </VCol>
      </VRow>
    </VForm>
  </CDialog>

  <CDialog
    saveTitle="Delete"
    title="Delete Club"
    v-model="deleteDialog"
    @onCancel="resetAndCloseDialogs"
    @onSave="handleDelete"
  >
    Are you sure you want to delete this item?
  </CDialog>
</template>

<script>
export default {
  data: () => ({
    items: [],

    loading: false,
    itemDialog: false,
    deleteDialog: false,
    search: null,

    selectedItemId: 0,
    itemObj: {
      password: null,
    },
    rules: {
      name: [
        (v) => !!v || "Required",
        (v) => v.length <= 60 || "Max length exceeded",
      ],
      email: [(v) => !!v || "Required"],
      password: [
        // (v) => !!v || "Required",
        (v) => !v || v.length > 3 || "Minimum length is 4",
      ],
    },
    headers: [
      { title: "Club Name", key: "name" },
      { title: "Email", key: "email" },
      { title: "Form Filling", key: "form_filling" },
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
      this.itemDialog = true;
    },
    resetAndCloseDialogs(p) {
      this.selectedItemId = 0;
      this.itemObj = {};
      this.itemDialog = false;
      this.deleteDialog = false;
    },
    handleDelete(id) {
      if (id < 1) return;
      apiDelete(`/admins/clubOwners/${this.selectedItemId}`).then((res) => {
        this.resetAndCloseDialogs();
        apiGet("/clubOwners").then((res) => {
          this.feeses = res.data.data;
        });
        alert("Record deleted successfully");
      });
    },
    toggleFormFilling(clubId) {
      if (clubId < 1) return;
      apiPost(`/admins/toggleFormFilling`, { club_id: clubId }).then((res) => {
        // this.resetAndCloseDialogs();
        console.log("Toggled form filling");
      });
    },
    async handleSubmit() {
      const { valid } = await this.$refs.itemForm.validate();
      if (valid) {
        this.loading = true;
        if (this.selectedItemId > 0) {
          // Update an existing model
          apiPut(
            `/admins/clubOwners/${this.selectedItemId}`,
            this.itemObj
          ).then((res) => {
            this.resetAndCloseDialogs();
            this.loadItems();
            alert("Record Updated successfully");
            setTimeout(() => (this.loading = false), 3000);
          });
          return;
        } // Add a new model
        apiPost(`/admins/clubOwners`, this.itemObj).then(() => {
          this.resetAndCloseDialogs();
          this.loadItems();
          alert("New Club Created successfully");
          setTimeout(() => (this.loading = false), 3000);
        });
      }
    },
    loadItems() {
      apiGet("/admins/clubOwners").then((res) => {
        this.items = res.data.data;
      });
    },
    passwordRule() {
      if (this.selectedItemId == 0 && !this.itemObj.password) {
        return "Password Required";
      }
      if (!!this.itemObj.password && this.itemObj.password.length < 5) {
        return "Minimum length is 5";
      }
      return true;
    },
  },
  created() {
    // definePageMeta({ middleware: 'admin' });
    this.loadItems();
  },
};
</script>