<template>
  <nav>
    <v-app-bar flat color="primary" app>
      <v-app-bar-nav-icon dark @click="drawer = !drawer" ></v-app-bar-nav-icon>
      <v-toolbar-title class="text uppercase white--text">
        <span class="font-weight-light">Apollo</span>
        <span>Stars</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn router to="/" text color="white">
        <span>Log out</span>
        <v-icon right>exit_to_app</v-icon>
      </v-btn>
    </v-app-bar>

    <v-navigation-drawer v-model="drawer" app color="grey lighten-3">
      <v-list-item>
        <v-list-item-content class="align-items-center">
          <v-list-item-title class="title">Actions</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
      <v-divider></v-divider>
      <v-list-item v-if="hasGroups">
          <GroupPopup v-if="isStudent" />
          <RGroupPopup v-else />
      </v-list-item>
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
import GroupPopup from '@/components/GroupPopup'
import RGroupPopup from '@/components/RGroupPopup'


export default {
  name: "Navbar",
  props: {
    drawerItems: Array,
    isStudent: { default: false, type: Boolean},
    hasGroups: { default: true, type: Boolean}
  },

  data() {
    return {
      drawer: false,
      selected: 'Courses'
    };
  },
  
  components: {
    GroupPopup, RGroupPopup 
  },

  methods: {
    navBarSelection () {
      this.$emit('navBarSelection', this.selected)
    }
  }
};
</script>