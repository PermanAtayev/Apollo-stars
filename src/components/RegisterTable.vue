<template>
  <v-container class="my-5">
    <v-card flat>
      <v-row justify-space-between>
        <v-col cols="6" class="px-5">
					<h4 class="headline text--primary font-italic font-weight-light pb-5">Registered Courses</h4>
					<v-card raised>
          <v-layout row wrap v-for="course in courses" :key="course.course_id" px-5>
            <v-flex xs12 md3>
              <div class="caption grey--text">Name</div>
              <div>{{ course.course_id }}</div>
            </v-flex>
            <!-- <v-flex xs6 sm3 md2>
              <div class="caption grey--text">Code</div>
              <div>{{ course.code }}</div>
            </v-flex> -->
            <!-- <v-divider></v-divider> -->
            <v-flex xs6 sm3 md3>
              <div class="caption grey--text">Instructor</div>
              <div>{{ course.instructor_name }} {{ course.instructor_surname }}</div>
            </v-flex>
            <v-divider></v-divider>
            <v-flex xs6 sm3 md2>
              <div class="caption grey--text">Section</div>
              <div>{{ course.section_id }}</div>
            </v-flex>
            <v-divider></v-divider>
            <v-flex xs6 sm3 md2>
              <div class="caption grey--text">Credits</div>
              <div>{{ course.credits }}</div>
            </v-flex>
            <v-divider></v-divider>
            <v-flex xs6 sm3 md3>
              <div>
                <!-- onClick: Delete course from the courses of student -->
                <v-btn small rounded outlined class="my-3" color="warning">Drop</v-btn>
              </div>
            </v-flex>
          </v-layout>
					</v-card >
        </v-col>

        <v-col cols="6" class="px-5">

					<h4 class="headline text--primary font-italic font-weight-light pb-5" >Available Courses</h4>
          <v-card raised>
					<v-layout row wrap v-for="regCourse in regCourses" :key="regCourse.code" px-5>
            <v-flex xs12 md3>
              <div class="caption grey--text">Name</div>
              <div>{{ regCourse.course_id }}</div>
            </v-flex>
            <!-- <v-flex xs6 sm3 md2>
              <div class="caption grey--text">Code</div>
              <div>{{ regCourse.code }}</div>
            </v-flex> -->
            <v-divider></v-divider>
            <v-flex xs6 sm3 md3>
              <div class="caption grey--text">Instructor</div>
              <div>{{ regCourse.instructor_name }} {{ regCourse.instructor_surname }} </div>
            </v-flex>
            <v-divider></v-divider>
            <v-flex xs6 sm3 md2>
              <div class="caption grey--text">Section</div>
              <div>{{ regCourse.section_id }}</div>
            </v-flex>
            <v-divider></v-divider>
            <v-flex xs6 sm3 md2>
              <div class="caption grey--text">Credits</div>
              <div>{{ regCourse.credits }}</div>
            </v-flex>
            <v-divider></v-divider>
            <v-flex xs6 sm3 md3>
              <div>
                <!-- onClick: Delete course from the courses of student -->
                <v-btn small rounded outlined class="my-3" color="success">Pick</v-btn>
              </div>
            </v-flex>
          </v-layout>
					</v-card>
        </v-col>
      </v-row>
    </v-card>
  </v-container>
</template>

<script>
export default {
    data() {
    return {
      //registerableCourses: [],
    };
    },

  props: {
    courses: Array,
    regCourses: Array
  },

  components: {},

  // methods: {

  //   fetchRegCourses: async function (){
  //   //console.log("getting registerable courses");
  //   var student_id = this.$route.params.id;

  //   const settings = {
  //       method: "get",
  //       headers: {
  //           "content-Type": "application/json"
  //       },
  //   };

  //   var url = 'http://localhost:8079/student/' + student_id.toString(10) + '/regCourseApply'

  //   const res = await fetch(url, settings)
  //       .then(response => response.json())
  //       .then(async function(text){
  //           return text;
  //       })
  //       .catch(e => {
  //           return e;
  //       });
  //   this.registerableCourses = res.rows;
  //   //console.log(res.rows)
  //   return 
  //   }

  // },


  // mounted: function(){
  //   console.log("reg_coures:" + this.regCourses);
  // },
  //   created: function(){
  //   this.fetchRegCourses();
  //   console.log("reg_coures:" + this.registerableCourses);
  // }

};
</script>