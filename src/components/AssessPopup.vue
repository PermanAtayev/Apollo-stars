<template>
  <div class="text-center">
    <v-dialog v-model="dialog" max-width="500px">
      <template v-slot:activator="{ on }">
        <v-btn small rounded outlined class="my-3" color="primary" v-on="on">Assess Instructor</v-btn>
      </template>
      <v-card color="grey lighten-3">
        <v-container>
          <v-layout row wrap pa-3 justify-space-around>
               <h5 class="title"> Assesing {{ this.instructorName }} </h5>
          </v-layout>
          <v-layout row wrap px-3 justify-space-around>
              <v-slider v-model="score" label="Instructor Score" min="0" max="5" thumb-label class="pa-1"></v-slider>
          </v-layout>
          <v-layout row wrap px-3 justify-space-around>
              <v-text-field v-model="comment" label="Comment"></v-text-field>
          </v-layout>    
        </v-container>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn large text color="primary" @click="dialog = false">Submit</v-btn>
          <v-btn large text color="error" @click="dialog = false">Close</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  props: {
      instructorName: String, courseCode: String,
    },
  data() {
    return {
      dialog: false,
      score: 0,
      comment: "",
    };
  },

  methods: {
    submitAssesment: function(){
      //SAVE THE COMMENT AND THE SCORE FOR THIS INSTRUCTOR

    } 


  }
};
</script>