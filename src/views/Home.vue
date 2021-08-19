<template>
  <v-app>
    <DataTable />
  </v-app>
</template>

<script>
import DataTable from "../components/DataTable.vue";

export default {
  name: "App",

  components: {
    DataTable,
  },

  data: () => ({}),
};
</script>

