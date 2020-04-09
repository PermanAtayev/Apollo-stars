<template>
  <div class="text-center">
    <v-dialog v-model="dialog" max-width="500px">
      <template v-slot:activator="{ on }">
        <v-btn small rounded outlined class="my-3" color="success" v-on="on">Grades</v-btn>
      </template>
    <v-card color="grey lighten-3">
    <v-col v-for="item in items" :key="item.name" cols="12">
      <v-card >
        <div class="d-flex flex-no-wrap justify-space-between">
          <div>
            <v-card-title class="headline" v-text="item.name"></v-card-title>
            <v-card-subtitle class="subheading" v-text="item.score + ' / ' + item.totalScore"></v-card-subtitle>
          </div>
        </div>
      </v-card>
    </v-col>
     <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn large text color="primary" @click="dialog = false">Close</v-btn>
     </v-card-actions>
    </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  props: {
    scores: Object
  },
  data() {
    return {
      dialog: false,
      //right now dummy scores are used
      items: [
        { name: "Quiz 1", score: 5, totalScore: 10 },
        { name: "Quiz 2", score: 9, totalScore: 10 },
        { name: "Attendence", score: 10, totalScore: 10 },
        { name: "Midterm", score: 25, totalScore: 100 },
        { name: "Final", score: 95, totalScore: 100 }
      ]
    };
  }
};
</script>