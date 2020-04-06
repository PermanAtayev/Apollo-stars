<template>
  <v-app>
    <Navbar :drawerItems="items" />
    <v-spacer></v-spacer>
    <Foot />
  </v-app>
</template>

<script>
import Navbar from "@/components/Navbar";
import Foot from "@/components/Foot";
export default {
  name: "Instructor",
  data: function() {
    return {
      drawer: false,
      items: [
        { title: "Courses", icon: "class", owner: "instructor" },
        { title: "Teaching Assistants", icon: "people", owner: "instructor" }
      ]
    };
  },
  components: { Navbar, Foot }
};
</script>

<style scoped>
</style>