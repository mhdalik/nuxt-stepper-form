<template>
  <VLayout>
    <VNavigationDrawer v-model="drawer">
      <!-- <VList density="compact" item-props :items="items" nav /> -->

      <VList density="compact" v-model:opened="open">
        <VListItem prepend-icon="mdi-home" title="Home" to="/" link />
        <VListItem
          prepend-icon="mdi-view-dashboard-outline"
          title="Dashboard"
          to="/dashboard"
          link
        />
        <VListGroup value="Admin2">
          <template v-slot:activator="{ props }">
            <VListItem
              v-bind="props"
              title="Admin"
              prependIcon="mdi-cog-outline"
            />
          </template>
          <VListItem
            v-for="([title, icon], i) in admins"
            :key="i * 6"
            :prepend-icon="icon"
            :title="title"
            :value="title"
          />
        </VListGroup>
        <VListGroup value="Users">
          <template v-slot:activator="{ props }">
            <VListItem
              v-bind="props"
              prepend-icon="mdi-account-circle"
              title="Users"
            />
          </template>

          <VListGroup value="Actions">
            <template v-slot:activator="{ props }">
              <VListItem v-bind="props" title="Actions" />
            </template>
            <VListItem
              v-for="([title, icon], i) in cruds"
              :key="i"
              :prepend-icon="icon"
              :title="title"
              :value="title"
            />
          </VListGroup>
        </VListGroup>
      </VList>

      <template #append>
        <VListItem
          class="ma-2"
          link
          nav
          to="/"
          prepend-icon="mdi-cog-outline"
          title="Settings"
        />
      </template>
    </VNavigationDrawer>

    <v-app-bar border="b" class="ps-4" flat>
      <v-app-bar-nav-icon
        v-if="$vuetify.display.smAndDown"
        @click="drawer = !drawer"
      />

      <v-app-bar-title>Application</v-app-bar-title>

      <template #append>
        <v-btn class="text-none me-2" height="48" icon slim>
          <v-avatar
            color="surface-light"
            image="https://cdn.vuetifyjs.com/images/john.png"
            size="32"
          />

          <v-menu activator="parent">
            <VList density="compact" nav>
              <VListItem append-icon="mdi-cog-outline" link title="Settings" />
              <VListItem append-icon="mdi-logout" link title="Logout" />
            </VList>
          </v-menu>
        </v-btn>
      </template>
    </v-app-bar>
    <v-main>
      <div class="pa-4">
        <slot />
      </div>
    </v-main>
  </VLayout>
</template>
<script>
export default {
  data: () => ({
    drawer: true,
    open: ["Users"],
    admins: [
      ["Management", "mdi-account-multiple-outline"],
      ["Settings", "mdi-cog-outline"],
    ],
    cruds: [
      ["Create", "mdi-plus-outline"],
      ["Read", "mdi-file-outline"],
      ["Update", "mdi-update"],
      ["Delete", "mdi-delete"],
    ],
  }),
};
</script>