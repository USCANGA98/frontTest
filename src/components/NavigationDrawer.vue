<template>
  <div>
    <v-navigation-drawer
      floating
      color="blue darken-2"
      permanent
      height="575"
      width="200"
      class="mt-10 ml-5 rounded-xl"
      app
    >
      <div class="d-flex mt-5 justify-center">
        <v-badge avatar bordered overlap>
          <template v-slot:badge>
            <v-avatar color="white">
              <v-icon color="blue darken-2">mdi-check-decagram</v-icon>
            </v-avatar>
          </template>
          <v-hover v-slot:default="{ hover }">
            <v-avatar
              color="white"
              class="transition-swing"
              :class="`elevation-${hover ? 8 : 2}`"
              size="90"
            >
              <v-img
                max-height="86"
                max-width="86"
                src="https://cdn.vuetifyjs.com/images/john.png"
              ></v-img>
            </v-avatar>
          </v-hover>
        </v-badge>
      </div>
      <p class="title text-center pt-3 white--text font-weight-black">
        Jaycon Mill
      </p>
      <v-list color="blue darken-2" dense rounded class="mx-n1">
        <v-list-item v-for="item in items" :to="item.path" :key="item.title" link exact>
          <v-list-item-icon>
            <v-icon color="white">{{ item.icon }}</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title
              class="white--text font-weight-light"
              v-text="item.title"
            />
          </v-list-item-content>
        </v-list-item>
      </v-list>
      <div class="subtitle-2 font-weight-light white--text mx-4">insights</div>
      <v-list dense rounded class="mx-n1">
        <v-list-item link>
          <v-list-item-icon>
            <v-icon color="white">mdi-mail</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title class="font-weight-light white--text"
              >Messages</v-list-item-title
            >
          </v-list-item-content>

          <v-list-item-avatar
            color="red"
            size="20"
            class="white--text justify-center"
          >
            1
          </v-list-item-avatar>
        </v-list-item>
        <v-list-item link>
          <v-list-item-icon>
            <v-icon color="white">mdi-bell</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title class="font-weight-light white--text">
              Notifications
            </v-list-item-title></v-list-item-content
          >

          <v-list-item-avatar
            size="20"
            color="red"
            class="white--text justify-center"
          >
            6
          </v-list-item-avatar>
        </v-list-item>
      </v-list>
      <template v-slot:append>
        <div>
          <v-btn block color="white" class="font-weight-medium text-capitalize">
            <v-icon color="red" left>mdi-account-arrow-left</v-icon> Cerrar
            sesión
          </v-btn>
        </div>
      </template>
    </v-navigation-drawer>
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
          path: "/"
        },
        {
          icon: "mdi-clock-fast",
          title: "Hoy",
          path: "path"
        },
        {
          icon: "mdi-account-multiple-check",
          title: "Siguiendo",
          path: "comerdo"
        },
      ],
    };
  },
};
</script>

<style lang="scss" scoped>
</style>