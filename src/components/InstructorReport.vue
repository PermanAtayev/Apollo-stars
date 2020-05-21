<template>
  <v-container class="my-0">
    <v-card flat>
      <v-layout row wrap v-for="instructor in instructors" :key="instructor.email" class="py-2">
        <v-flex xs12 md3>
          <div class="caption grey--text pl-2">Name</div>
          <div> <v-chip color="primary">{{ instructor.name }}</v-chip>  </div>
        </v-flex>
        <v-flex xs6 sm3 md3>
          <div class="caption grey--text pl-2">Email</div>
          <div><v-chip color="primary">{{ instructor.email }}</v-chip></div>
        </v-flex>
        <v-flex xs6 sm3 md3>
          <div class="caption grey--text pl-2">Date Joined</div>
          <div><v-chip color="primary">{{ instructor.dateJoined }}</v-chip></div>
        </v-flex>
        <v-flex xs6 sm3 md3>
          <div class="caption grey--text pl-2">Grant</div>
          <div><v-chip color="primary">{{ instructor.grant }}$</v-chip></div>
        </v-flex>
      </v-layout>
    </v-card>
  </v-container>
</template>

<script>

export default {
  props: {
    instructors: Object
  },

  components: {  }
};
</script>