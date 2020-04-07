<template>
  <nav>
    <v-toolbar flat color="primary" app>
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title class="text uppercase white--text">
        <span class="font-weight-light">Apollo</span>
        <span>Stars</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn flat color="white">
        <span>Log out</span>
        <v-icon right>exit_to_app</v-icon>
      </v-btn>
    </v-toolbar>

    <v-navigation-drawer v-model="drawer" app color="secondary">
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title class="title">Actions</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
      <v-divider></v-divider>
      <v-list dense nav>
        <v-list-item v-for="item in drawerItems" :key="item.title" @click="selected = item.title; navBarSelection()" link >
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
  </nav>
</template>

<script>
export default {
  name: "Navbar",
  props: {
    drawerItems: Object
  },

  data() {
    return {
      drawer: false,
      selected: 'Courses'
    };
  },

  methods: {
    navBarSelection () {
      this.$emit('navBarSelection', this.selected)
    }
  }
};
</script>