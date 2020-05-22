<template>
  <div class="text-center">
    <v-dialog v-model="dialog" max-width="500px">
      <template v-slot:activator="{ on }">
        <v-btn small rounded outlined class="my-3" color="primary" v-on="on" > Assess Instructor</v-btn>
      </template>
      <v-card color="grey lighten-3">
        <v-container>
          <v-layout row wrap pa-3 justify-space-around>
               <h5 class="title"> Assesing {{ this.instructorName }} {{ this.instructorSurname }}</h5>
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
          <v-btn large text color="primary" @click="dialog = false; submitAssesment()">Submit</v-btn>
          <v-btn large text color="error" @click="dialog = false">Close</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  props: {
      instructorName: String, instructorSurname: String, courseCode: String,
    },
  data() {
    return {
      dialog: false,
      score: 0,
      comment: "",
      instructorID: "",
    };
  },

  methods: {
    submitAssesment: async function(){
      let data = { name: this.instructorName, surname: this.instructorSurname, points: this.score, comments: this.comment };
      console.log("ID of the instructor IS: " + this.instructorName);
      const settings = {
        method: "post",
        headers: {
          "content-Type": "application/json"
        },
        body: JSON.stringify(data)
      };
      //const recievedJson = await res.json;
       var url = 'http://localhost:8079/student/' + this.$route.params.id.toString(10) + '/assess/instructor'
      const res = await fetch(url, settings)
        .then(response => {response.text;  console.log(response); })
        .then(async function(text){
          return text;
        })
        .catch(e => {
          return e;
        });

      console.log(res);
    },
  },
  mounted: function(){
    //this.fetchInstructorID();
  }
};
</script>