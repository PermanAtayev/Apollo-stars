<template>
  <v-container class="my-5">
    <v-card flat>
      <v-row justify-space-between>
        <v-col cols="6" class="px-5">
					<h4 class="headline text--primary font-italic font-weight-medium pb-5">Registered Courses</h4>
					<v-card raised="2">
          <v-layout row wrap v-for="course in courses" :key="course.code" px-5>
            <v-flex xs12 md4>
              <div class="caption grey--text">Name</div>
              <div>{{ course.name }}</div>
            </v-flex>
            <v-flex xs6 sm3 md2>
              <div class="caption grey--text">Code</div>
              <div>{{ course.code }}</div>
            </v-flex>
            <v-divider></v-divider>
            <v-flex xs6 sm3 md3>
              <div class="caption grey--text">Instructor</div>
              <div>{{ course.instructor }}</div>
            </v-flex>
            <v-divider></v-divider>
            <v-flex xs6 sm3 md1>
              <div class="caption grey--text">Section</div>
              <div>{{ course.section }}</div>
            </v-flex>
            <v-divider></v-divider>
            <v-flex xs6 sm3 md1>
              <div class="caption grey--text">Credits</div>
              <div>{{ course.credits }}</div>
            </v-flex>
            <v-divider></v-divider>
            <v-flex xs6 sm3 md2>
              <div>
                <!-- onClick: Delete course from the courses of student -->
                <v-btn small rounded outlined class="my-3" color="warning">Drop</v-btn>
              </div>
            </v-flex>
          </v-layout>
					</v-card >
        </v-col>

        <v-col cols="6" class="px-5">

					<h4 class="headline text--primary font-italic font-weight-medium pb-5" >Available Courses</h4>
          <v-card raised="3">
					<v-layout row wrap v-for="regCourse in regCourses" :key="regCourse.code" px-5>
            <v-flex xs12 md4>
              <div class="caption grey--text">Name</div>
              <div>{{ regCourse.name }}</div>
            </v-flex>
            <v-flex xs6 sm3 md2>
              <div class="caption grey--text">Code</div>
              <div>{{ regCourse.code }}</div>
            </v-flex>
            <v-divider></v-divider>
            <v-flex xs6 sm3 md3>
              <div class="caption grey--text">Instructor</div>
              <div>{{ regCourse.instructor }}</div>
            </v-flex>
            <v-divider></v-divider>
            <v-flex xs6 sm3 md1>
              <div class="caption grey--text">Section</div>
              <div>{{ regCourse.section }}</div>
            </v-flex>
            <v-divider></v-divider>
            <v-flex xs6 sm3 md1>
              <div class="caption grey--text">Credits</div>
              <div>{{ regCourse.credits }}</div>
            </v-flex>
            <v-divider></v-divider>
            <v-flex xs6 sm3 md2>
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
  props: {
    courses: Object,
    regCourses: Object
  },

  components: {}
};
</script>