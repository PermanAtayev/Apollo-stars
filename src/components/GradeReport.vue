<template>
  <v-container class="my-2">
    <h3 class="title Primary ma-5 font-italic font-weight-light">Average Grades for Exams</h3>
    <v-card flat>
      <v-layout row wrap>
        <v-flex s12 md6 v-for="exam in exams" :key="exam.exam_name" pa-2> 
          <v-card raised="3">
            <v-card-text>
              <p class="display-1 text--primary ">{{ exam.exam_name  }}</p>
              <p class="headline text--secondary ">Average: {{ parseInt(exam.avg).toFixed(0)  }}</p>
              <!-- <p class="title font-weight-light text--primary font-italic">{{ exam.description }}  </p>
              <p class="text--primary font-italic">Salary: {{ exam.salary }}  </p> -->
            </v-card-text>
            <v-card-actions>
              <!-- <v-btn small text color="primary">Apply</v-btn>
              <v-btn small text color="primary">Learn More</v-btn> -->
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
    exams: Object
  },

  components: {},

  methods: {

  }

};
</script>