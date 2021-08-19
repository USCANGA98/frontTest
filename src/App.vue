<template>
  <v-app>
    <NavigationDrawer />
    <AppBar />
    <v-main class="blue darken-2">
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
import NavigationDrawer from "./components/NavigationDrawer.vue";
import AppBar from "./components/AppBar.vue";

export default {
  name: "App",
  components: {
    NavigationDrawer,
    AppBar,
  },
  data: () => ({
    //
  }),
};
</script>
