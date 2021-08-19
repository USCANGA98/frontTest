<template>
  <div>
    <v-dialog scrollable persistent max-width="600" v-model="dialog">
      <v-card style="overflow-y: hidden">
        <v-toolbar dense flat color="blue" dark>
          <v-toolbar-title>Item data </v-toolbar-title>
          <v-spacer></v-spacer>
          <v-btn color="white" text @click="cerrar">Cerrar</v-btn>
          <v-btn color="white" text @click="dialog2 = true">Agregar</v-btn>
        </v-toolbar>

        <div style="overflow-y: scroll">
          <v-col cols="12">
            <v-card
              v-for="(items, i) in data.items"
              :key="i"
              class="rounded-lg ma-6"
              elevation="4"
            >
              <v-container>
                <h2 class="mb-5">Data</h2>
                <v-row>
                  <v-col cols="12" class="ma-0 pt-0 pb-0">
                    <v-text-field
                      outlined
                      color="green"
                      label="Name"
                      placeholder="Ingresa tu calle"
                      dense
                      v-model="items.name"
                      readonly
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" class="ma-0 pt-0 pb-0">
                    <v-text-field
                      outlined
                      color="green"
                      label="Price"
                      placeholder="Ingresa el número exterior"
                      type="number"
                      min="0"
                      max="99999"
                      dense
                      readonly
                      v-model="items.price"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" class="ma-0 pt-0 pb-0">
                    <v-text-field
                      outlined
                      color="green"
                      label="Sku"
                      placeholder="Ingresa número interior"
                      type="text"
                      min="0"
                      max="99999"
                      dense
                      readonly
                      v-model="items.sku"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" class="ma-0 pt-0 pb-0">
                    <v-text-field
                      outlined
                      color="green"
                      label="Quantity"
                      placeholder="Ingresa tu colonia"
                      dense
                      readonly
                      v-model="items.quantity"
                    ></v-text-field>
                  </v-col>
                </v-row>
              </v-container>
            </v-card>
            <div
              style="position: sticky; bottom: 10px"
              class="pa-5 text-right mb-5"
            >
              <v-btn @click="pagar" color="red" outlined> Pagar </v-btn>
            </div>
          </v-col>
        </div>
      </v-card>
    </v-dialog>
    <v-dialog persistent max-width="600" v-model="dialog2">
      <v-card>
        <v-toolbar dense flat color="blue" dark>
          <v-toolbar-title>Item data </v-toolbar-title>
          <v-spacer></v-spacer>
        </v-toolbar>
        <v-col cols="12">
          <v-card class="rounded-lg ma-6" elevation="10">
            <v-container>
              <h2 class="mb-5">Data</h2>
              <v-form ref="form" v-model="valid" lazy-validation>
                <v-row>
                  <v-col cols="12" class="ma-0 pt-0 pb-0">
                    <v-text-field
                      outlined
                      color="green"
                      label="Name"
                      placeholder="Ingresa tu calle"
                      dense
                      :rules="required"
                      v-model="item.name"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" class="ma-0 pt-0 pb-0">
                    <v-text-field
                      outlined
                      color="green"
                      label="Price"
                      placeholder="Ingresa el número exterior"
                      type="number"
                      min="0"
                      max="99999"
                      dense
                      :rules="required"
                      v-model="item.price"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" class="ma-0 pt-0 pb-0">
                    <v-text-field
                      outlined
                      color="green"
                      label="Sku"
                      placeholder="Ingresa número interior"
                      type="text"
                      min="0"
                      max="99999"
                      dense
                      :rules="required"
                      v-model="item.sku"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" class="ma-0 pt-0 pb-0">
                    <v-text-field
                      outlined
                      color="green"
                      label="Quantity"
                      placeholder="Ingresa tu colonia"
                      dense
                      :rules="required"
                      v-model="item.quantity"
                    ></v-text-field>
                  </v-col>
                </v-row>
              </v-form>
            </v-container>
            <v-card-actions class="pt-0">
              <v-spacer></v-spacer>
              <v-btn color="red" text @click="cancelar">Cancelar</v-btn>
              <v-btn
                color="green darken-1"
                depressed
                class="white--text"
                @click="init"
                :loading="loading"
                >Guardar</v-btn
              >
            </v-card-actions>
          </v-card>
        </v-col>
      </v-card>
    </v-dialog>
    <v-snackbar :value="snackbar">
      {{ text }}
    </v-snackbar>
  </div>
</template>

<script>
export default {
  name: "DialogComponent",
  data() {
    return {
      valid: true,
      snackbar: false,
      text: "",
      loading: false,
      dialog2: false,
      item: {
        name: "",
        price: "",
        sku: "",
        quantity: "",
      },
      data: {},
      required: [(v) => !!v || "Campo requerido"],
    };
  },
  methods: {
    async init() {
      if (!this.$refs.form.validate()) {
        this.text = "Faltan campos por llenar.";
        this.snackbar = true;
      }

      if (this.$refs.form.validate()) {
        this.loading = true;
        await this.agregarItem();
        this.loading = false;
        this.dialog2 = false;
        this.$emit("cerrar");
      }
    },
    async agregarItem() {
      try {
        await this.data.items.push({
          name: this.item.name,
          price: this.item.price,
          sku: this.item.sku,
          quantity: this.item.quantity,
        });
        console.log("items de push", this.data.items);
        this.$swal({
          icon: "success",
          title: `<h2 style="font-family: Segoe UI">Producto agregado correctamente</h2>`,
          confirmButtonText: `<span style="font-family: Segoe UI">Ok!</span>`,
        });
      } catch (error) {
        console.log(error);
      } finally {
        this.$refs.form.reset();
      }
    },
    pagar() {
      this.$swal({
        icon: "success",
        title: `<h2 style="font-family: Segoe UI">Gracias por su compra</h2>`,
        confirmButtonText: `<span style="font-family: Segoe UI">Ok!</span>`,
      });
      this.$emit("cerrar");
    },
    cerrar() {
      this.$emit("cerrar");
    },
    cancelar() {
      this.dialog2 = false;
      this.$refs.form.reset();
    },
  },
  props: {
    dialog: {
      type: Boolean,
      required: true,
    },
    meta: {
      type: "",
      default: function () {
        return {};
      },
    },
  },
  watch: {
    meta: function () {
      this.data = Object.assign({}, this.meta);
    },
  },
};
</script>

<style lang="scss" scoped>
</style>