<template>
  <!-- <VThemeProvider :theme="isDark ? 'dark' : 'light'" with-background> -->
  <VThemeProvider theme="light" withBackground>
    <VApp id="inspire">
      <VAppBar
        class="noprint"
        v-if="!drawer || $vuetify.display.xs"
        density="comfortable"
      >
        <VIcon
          v-if="!drawer"
          vRipple
          @click="drawer = !drawer"
          size="45"
          class="toggleUpDownrotate mt-1 ml-4"
          color="green"
          icon="mdi-math-norm"
        />
        <VIcon
          v-if="drawer"
          vRipple
          @click="drawer = !drawer"
          size="45"
          class="toggleUpDownrotate mt-1 ml-4"
          color="green"
          icon="mdi-close"
        />
        <VSpacer />
        <VListItem title="Keralolsavam'24" />
        <!-- <VListItem
          :title="instituteName"
          :subtitle="'Batch: ' + batchName ?? 'Plese Select Batch'"
        /> -->
      </VAppBar>
      <VNavigationDrawer
        class="navigation-drawer noprint"
        v-model="drawer"
        :disableResizeWatcher="true"
      >
        <VDivider />
        <VList>
          <!-- <VListItem v-for="[icon, text, url] in sideBarItems" :key="icon" link color="light" :value="text" -->
          <VListItem
            v-for="item in sideBarItems"
            link
            color="light"
            :to="item.link"
            :active="isActive(item.link.slice(1))"
          >
            <template v-slot:prepend>
              <VIcon :icon="item.icon" color="black" />
            </template>
            <VListItem-title>{{ item.displayText }}</VListItem-title>
          </VListItem>
          <VSpacer />
          <VList lines="one">
            <VListItem />
          </VList>
        </VList>
        <!-- user info  -->

        <!-- user info  -->
        <!-- current rout: {{ route.name.split("___")[0] }} -->
        <template v-slot:append>
          <VBtn
            text="Logout"
            class="mx-2 text-titlecase"
            variant="text"
            color="red"
            @click="confirmLogout"
          />
          <!-- <VBtn text="Logout" variant="text" color="red" @click="logout" /> -->
          <VRow class="ma-1">
            <!-- <CSelect hideDetails label="Batch" :items="batches" item-title="name" item-value="id"
                            v-model="batchId" @update:modelValue="updateBatch" /> -->
            <!-- <v-autocomplete eager v-model="batchId" :items="batches" label="Batch" itemTitle="name"
                            itemValue="id" @update:modelValue="updateBatch" /> -->
            <VListItem title="Keralolsavam'24" />
            <!-- <v-switch v-model="isDark" style="float: right;" hide-details inset color="green" /> -->
          </VRow>
        </template>
      </VNavigationDrawer>
      <VMain>
        <VContainer class="py-8 px-6" fluid>
          <slot />
        </VContainer>
      </VMain>
    </VApp>
  </VThemeProvider>
</template>

<script>
// const { currentRoute } = useRouter();
// const routeName = currentRoute.value.name;
const route = useRoute();
// const isDark = (!!localStorage.getItem('isDark'));

export default {
  data: () => ({
    batchName: null,
    instituteName: null,
    cards: ["Today"],
    batches: [],
    batchId: null,
    drawer: true,
    isDark: null,
    sideBarItems: [
      {
        icon: "mdi-account-multiple-plus",
        displayText: "Candidates",
        link: "/admins/candidates",
      },
      {
        icon: "mdi-soccer",
        displayText: "competitions",
        link: "/admins/competitions",
      },
      {
        icon: "mdi-account-key",
        displayText: "clubs",
        link: "/admins/clubs",
      },
    ],
  }),
  methods: {
    isActive(route_name) {
      // route_name = route_name.slice(3); // removing starting 'bo/' string
      // return (
      //   route.name.startsWith("bo-" + route_name) ||
      //   route.name.split("___")[0] == route_name
      // );
    },
    confirmLogout() {
      if (confirm("Are you sure want to logout?") == true) {
        logout();
      }
    },
    updateBatch() {
      // alert(this.batchId)
      localStorage.setItem("batchId", this.batchId);
      navigateTo("/");
    },
  },
  created() {
    checkAndGetAuthUser()
      .then(({ isLoggedIn, user }) => {
        if (isLoggedIn && user?.role == "admin") {
          return; //continue
        }
        if (isLoggedIn && user?.role == "club_owner") {
          return navigateTo("/clubs/candidates");
        }
        navigateTo("/");
      })
      .catch(() => {
        this.isLoggedIn = false;
        navigateTo("/");
      });
  },
};
</script>

<style>
.navigation-drawer {
  border-right: 1px solid #ccc;
}

.toggleUpDownrotate {
  transform: rotate(90deg);
}

@media print {
  .noprint {
    visibility: hidden;
  }
}
</style>