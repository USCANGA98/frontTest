<template>
  <div>
    <v-app-bar
      class="pl-3 rounded-xl"
      color="blue darken-2"
      elevation="0"
      fixed
      height="60"
      app
    >
      <v-btn
        active-class="yellow white--text"
        v-for="(item, i) in items"
        :key="i"
        text
        class="white--text pa-3 text-capitalize font-weight-light rounded-xl"
        ><v-icon left>{{ item.icon }}</v-icon>
        {{ item.title }}
      </v-btn>
      <v-spacer></v-spacer>
      <v-btn icon>
        <v-icon color="white"> mdi-bell </v-icon>
      </v-btn>
      <v-btn icon>
        <v-icon color="white"> mdi-chat-processing </v-icon>
      </v-btn>
      <v-btn icon>
        <v-avatar size="34">
          <v-img src="https://cdn.vuetifyjs.com/images/john.png"></v-img>
        </v-avatar>
      </v-btn>
      <v-app-bar-nav-icon color="white" />
    </v-app-bar>
  </div>
</template>

<script>
export default {
  data() {
    return {
      items: [
        {
          icon: "mdi-view-dashboard",
          title: "Inicio",
        },
        {
          icon: "mdi-clock-fast",
          title: "Hoy",
        },
        {
          icon: "mdi-account-multiple-check",
          title: "Siguiendo",
        },
      ],
    };
  },
};
</script>

<style lang="scss" scoped>
</style>