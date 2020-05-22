<template>
  <v-container class="my-0">
    <v-card flat>
      <v-layout row wrap v-for="instructor in rankings" :key="instructor.email" class="py-2">
        <v-flex xs12 md4>
          <div class="caption grey--text pl-2">Name</div>
          <div> <v-chip color="primary">{{ instructor.name }} {{ instructor.surname }} </v-chip>  </div>
        </v-flex>
        <!-- <v-flex xs6 sm3 md3>
          <div class="caption grey--text pl-2">Email</div>
          <div><v-chip color="primary">{{ instructor.email }}</v-chip></div>
        </v-flex> -->
        <v-flex xs6 sm3 md4>
          <div class="caption grey--text pl-2">Date Joined</div>
          <div><v-chip color="primary">{{ instructor.date_joined.substring(0,10) }}</v-chip></div>
        </v-flex>
        <v-flex xs6 sm3 md4>
          <div class="caption grey--text pl-2">Grant</div>
          <div><v-chip color="primary">{{ instructor.salary }}$</v-chip></div>
        </v-flex>
      </v-layout>
    </v-card>
  </v-container>
</template>

<script>

export default {
  props: {
    rankings: Array
  },

  components: {  }
};
</script>