<template>
  <v-container class="pr-10 pl-10 blue darken-2">
    <v-row>
      <v-col cols="6">
        <v-card class="ma-0" rounded="xl">
          <v-card-title>
            Items

            <v-menu
              max-width="250"
              transition="scale-transition"
              bottom
              :close-on-content-click="false"
              min-width="300"
              max-height="400"
              offset-x
            >
              <template v-slot:activator="{ on: menu, attrs }">
                <v-tooltip color="grey darken-3" bottom>
                  <template v-slot:activator="{ on: tooltip }">
                    <v-btn
                      @click="notification = false"
                      class="mx-1"
                      v-bind="attrs"
                      v-on="{ ...tooltip, ...menu }"
                      icon
                    >
                      <v-badge
                        :content="notification"
                        :value="notification"
                        color="error"
                        overlap
                        dot
                        right
                      >
                        <v-icon :class="notification ? 'shake' : ''">
                          mdi-bell
                        </v-icon>
                      </v-badge>
                    </v-btn>
                  </template>
                  <span>Orden de pedidos</span>
                </v-tooltip>
              </template>
              <v-card>
                <v-card-title>Lista de pedidos</v-card-title>
                <v-divider></v-divider>
                <v-list nav>
                  <v-list-item
                    link
                    style="color: grey"
                    class="subtitle-2"
                    v-for="data in data.orders"
                    :key="data.number"
                  >
                    {{ data.number }} &nbsp;
                    <v-list-item-content>
                      <span v-for="(item, index) in data.items" :key="index"
                        >{{ item.name }}
                        <v-icon color="green" right small>mdi-shopping</v-icon>
                      </span>
                    </v-list-item-content>
                  </v-list-item>
                </v-list>
              </v-card>
            </v-menu>

            <v-spacer></v-spacer>
            <v-text-field
              v-model="search"
              append-icon="mdi-magnify"
              label="Search"
              single-line
              hide-details
            ></v-text-field>
          </v-card-title>
          <v-data-table
            class="ma-3"
            :headers="headers"
            :items="items"
            :search="search"
          >
            <template v-slot:item.acciones="{ item }">
              <v-tooltip color="grey darken-3" bottom>
                <template v-slot:activator="{ on: tooltip }">
                  <v-btn
                    v-on="tooltip"
                    icon
                    dark
                    color="blue"
                    @click="verDetalles(item)"
                    ><v-icon> mdi-format-list-text </v-icon></v-btn
                  >
                </template>
                <span>Ver detalles</span>
              </v-tooltip>
            </template>
          </v-data-table>
        </v-card>
      </v-col>
      <v-col cols="6">
        <v-card
          max-width="500"
          style="border: 1px solid white; background-color: #1976d2"
          flat
          class="ml-auto pa-5"
        >
          <p class="white--text font-weight-bold"> Order details </p>
          <v-row>
            <v-col
              md="4"
              lg="4"
              xl="2"
              sm="4"
              cols="5"
              v-for="(item, i) in items"
              :key="i"
            >
              <v-hover v-slot:default="{ hover }" open-delay="0">
                <v-card
                  @click="verOrden(item)"
                  :class="`elevation-${hover ? 10 : 1}`"
                  link
                  ripple
                  dark
                  class="pa-1 transition-swing"
                  :color="hover ? 'white' : 'blue'"
                  outlined
                >
                  <span
                    :class="hover ? 'blue--text' : 'white--text'"
                    class="font-weight-bold"
                    >Order Name:

                    {{ item.name }}
                  </span>
                </v-card>
              </v-hover>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
    </v-row>

    <Dialog :meta="meta" @cerrar="dialog = false" :dialog="dialog" />
  </v-container>
</template>

<script>
import axios from "axios";
import { mapMutations } from "vuex";
import Dialog from "./Dialog.vue";
export default {
  name: "DataTable",
  components: {
    Dialog,
  },
  data: () => ({
    notification: true,
    search: "",
    dialog: false,
    data: [],
    meta: [],
    items: [],
    headers: [
      {
        text: "Id",
        value: "id",
      },
      {
        text: "Number",
        value: "number",
      },
      {
        text: "Orden",
        value: "name",
      },
      {
        text: "Acciones",
        value: "acciones",
      },
    ],
  }),
  async mounted() {
    await this.getData();
  },
  methods: {
    ...mapMutations(["setOrderSelected"]),
    verDetalles(meta) {
      this.meta = Object.assign({}, meta);
      this.dialog = true;
    },
    verOrden(item) {
      this.$router.push("/detalles");
      this.setOrderSelected(item);
    },
    async getData() {
      try {
        const headers = {
          Authorization: `eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJwUGFINU55VXRxTUkzMDZtajdZVHdHV3JIZE81cWxmaCIsImlhdCI6MTYyMDY2Mjk4NjIwM30.lhfzSXW9_TC67SdDKyDbMOYiYsKuSk6bG6XDE1wz2OL4Tq0Og9NbLMhb0LUtmrgzfWiTrqAFfnPldd8QzWvgVQ`,
        };

        const { data } = await axios.get(
          `https://eshop-deve.herokuapp.com/api/v2/orders`,
          { headers }
        );
        if (data.success) {
          data.orders.forEach((e) => {
            this.items.push(e);
          });
          data.orders.forEach((e) => {
            this.meta.push(e.items[0]);
          });
        }
        this.data = data;
        console.log(data);
      } catch (error) {
        console.warn(error);
      }
    },
  },
};
</script>
<style lang="scss">
.shake {
  animation: shake 2s ease infinite;
}
@keyframes shake {
  5% {
    transform: rotate(15deg);
  }
  10% {
    transform: rotate(-15deg);
  }
  15% {
    transform: rotate(15deg);
  }
  20% {
    transform: rotate(-15deg);
  }
  30% {
    transform: rotate(0deg);
  }
}
</style>
