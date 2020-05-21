<template>
  <v-container class="my-2">
    <v-card flat>
      <v-layout row wrap>
        <v-flex s12 md6 v-for="career in careers" :key="career.career_id" pa-2> 
          <v-card raised="3">
            <v-card-text>
              <p class="display-1 text--primary">{{ career.career_desc  }}</p>
              <p class="headline text--secondary">ID: {{ career.career_id }}</p>
              <p class="title font-weight-light text--primary font-italic">Open to: {{ career.career_type }}  </p>
              <p class="text--primary font-italic">Salary: {{ career.salary }}  </p>
            </v-card-text>
            <v-card-actions>
              <v-btn href="https://miro.medium.com/max/1248/1*FAzumPnvzKUDolMG7SNcHw.png" target="_blank" text color="primary">Apply</v-btn>
              <v-btn href="https://miro.medium.com/max/1248/1*FAzumPnvzKUDolMG7SNcHw.png" target="_blank" text color="primary">Learn More</v-btn>
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