<template>
  <v-container class="my-2">
    <v-card flat>
      <v-layout row wrap>
        <v-flex s12 md6 v-for="career in careers" :key="career.id" pa-2> 
          <v-card raised="3">
            <v-card-text>
              <p class="display-1 text--primary">{{ career.id  }}</p>
              <p class="headline text--secondary">{{ career.type }}</p>
              <p class="title font-weight-light text--primary font-italic">{{ career.description }}  </p>
              <p class="text--primary font-italic">Salary: {{ career.salary }}  </p>
            </v-card-text>
            <v-card-actions>
              <v-btn small text color="primary">Apply</v-btn>
              <v-btn small text color="primary">Learn More</v-btn>
            </v-card-actions>
          </v-card>
        </v-flex>
        <v-divider></v-divider>
      </v-layout>
    </v-card>
  </v-container>
</template>

<script>
export default {
  props: {
    careers: Object
  },

  components: {}
};
</script>