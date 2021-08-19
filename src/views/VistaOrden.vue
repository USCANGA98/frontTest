<template>
  <v-card class="ma-auto" max-width="500">
    <v-card-title> Order Name {{ orderSelected.name }} </v-card-title>
    <v-card-text>
      <v-row>
        <v-col cols="6">
          <p class="title">General Information</p>
          <span class="font-weight-bold">Name: </span>
          {{ orderSelected.billingAddress.firstName }} <br />
          <span class="font-weight-bold">Last Name: </span>
          {{ orderSelected.billingAddress.lastName }}
          <br />
          <span class="font-weight-bold">Phone: </span>
          {{ orderSelected.billingAddress.phone }} <br />
          <span class="font-weight-bold">Street: </span>
          {{ orderSelected.billingAddress.address1 }} <br />
          <span class="font-weight-bold">City: </span>
          {{ orderSelected.billingAddress.city }}
          <br />
          <span class="font-weight-bold">Company: </span>
          {{ orderSelected.billingAddress.company }}
        </v-col>
        <v-col cols="6">
          <p class="title">Shopping Information</p>
          <span class="font-weight-bold">Products Name: </span> <br>
          {{ orderSelected.items[0].name }} <br />
          {{ orderSelected.items[1].name }}
          <br />
          <span class="font-weight-bold">Product Id: </span>
          {{ orderSelected.id }}
          <br />
          <span class="font-weight-bold">Currency: </span>
          {{ orderSelected.currency }} <br />
          <span class="font-weight-bold">Payment: </span>
          {{ orderSelected.payment.status }}
          <br />
          <span class="font-weight-bold">Subtotal: </span>
          {{ orderSelected.totals.subtotal }} <br />
          <span class="font-weight-bold">Total: </span>
          {{ orderSelected.totals.total }}
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script>
import { mapState } from "vuex";
export default {
  data() {
    return {};
  },
  computed: {
    ...mapState(["orderSelected"]),
  },
};
</script>

<style lang="scss" scoped>
</style>