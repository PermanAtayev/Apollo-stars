<template>
  <div class="text-center">
    <v-dialog v-model="dialog" max-width="500px">
      <template v-slot:activator="{ on }">
        <v-btn small rounded outlined class="my-3" color="primary" v-on="on">Create Exam</v-btn>
      </template>
      <v-card color="grey lighten-3">
        <v-container>
          <v-layout row wrap pa-3 justify-space-around>
            <h5 class="title">Creating Exam For {{ this.courseCode }}</h5>
          </v-layout>
          <v-layout row wrap px-3 justify-space-around>
            <v-text-field label="Exam Name" v-model="exam_name1"></v-text-field>
          </v-layout>
          <v-layout row wrap px-3 justify-space-around>
            <v-text-field label="Course ID" v-model="course_id"></v-text-field>
          </v-layout>
          <v-layout row wrap px-3 justify-space-around>
            <v-text-field label="Start Date" v-model="start_date"></v-text-field>
          </v-layout>
          <v-layout row wrap px-3 justify-space-around>
            <v-text-field label="End Date" v-model="end_date"></v-text-field>
          </v-layout>
          <v-layout row wrap px-3 justify-space-around>
            <v-col cols="12" sm="6" md="4">

            </v-col>
          </v-layout>
        </v-container>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn large text color="primary" @click="dialog = false, createAnExam()">Create</v-btn>
          <v-btn large text color="error" @click="dialog = false;">Close</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  props: {
    courseCode: String
  },
  data() {
    return {
      course_id: -1,
      exam_name1: "",
      start_date: "",
      end_date: "",
      dialog: false,
      date: new Date().toISOString().substr(0, 10),
      menu: false,
      score: 0
    };
  },
    computed: {
      //use the fixed date
    fixedDate: function(){
      let newDate ="";
      newDate += this.date.substr(8,10) + '/';
      newDate += this.date.substr(5,2) + '/';
      newDate += this.date.substr(0,4);
      return newDate;
    },

  },
  methods: {
    createAnExam: async function(){
      let exam_id = Math.ceil(Math.random() * 100000);
      let data = {exam_id, exam_name: this.exam_name1, start_time: this.start_date, end_time: this.end_date, course_id: this.course_id}

      // console.log(this.exam_name1, this.start_date, this.end_date, this.myId)

      console.log(JSON.stringify(data))

      let settings = {
        method: "post",
        headers: {
          "content-Type": "text/plain"
        },
        body: JSON.stringify(data)
      };

      let url =
              "http://localhost:8079/instructor/" +
              this.myId.toString(10) +
              "/create/exam";

      let res = await fetch(url, settings)
              .then(response => response.json())
              .then(async function(text) {
                return text;
              })
              .catch(e => {
                return e;
              });

      console.log(res)
      // console.log(res + "why am I not getting anything at all")
    }
  },
  created: function(){
    this.myId = this.$route.params.id;
  }
};
</script>