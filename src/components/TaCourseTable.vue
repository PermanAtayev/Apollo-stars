<template>
  <v-content>
    <v-container class="my5">
      <v-card flat>
        <v-expansion-panels>
          <v-expansion-panel focusable v-for="course in courses" :key="course.code">
            <v-expansion-panel-header>
              <v-layout row wrap>
                <v-flex xs12 md4>
                  <div class="caption grey--text">Name</div>
                  <div>{{ course.name }}</div>
                </v-flex>
                <v-flex xs6 sm3 md2>
                  <div class="caption grey--text">Code</div>
                  <div>{{ course.code }}</div>
                </v-flex>
                <v-flex xs6 sm3 md4>
                  <div class="caption grey--text">Instructor</div>
                  <div>{{ course.instructor }}</div>
                </v-flex>
              </v-layout>
            </v-expansion-panel-header>
            <v-expansion-panel-content>
              <v-layout row wrap  v-for="task in tasks" :key="task.code + task.task">
                  <!-- Do not use these V-ifs on deployment, this is a quickfix -->
                <v-flex xs6 sm3 md4 v-if="task.code == course.code">
                  <div class="caption grey--text">Task</div>
                  <div>{{ task.task }}</div>
                </v-flex>
                <v-flex xs6 sm3 md2 v-if="task.code == course.code">
                  <div class="caption grey--text">Deadline</div>
                  <div>{{ task.deadline }}</div>
                </v-flex>
                <v-flex xs6 sm3 md2 v-if="task.code == course.code">
                    <div>
                        <v-btn small rounded dark class="my-3" color="teal">Complete Now</v-btn>
                    </div>
                </v-flex>
              </v-layout>
            </v-expansion-panel-content>
          </v-expansion-panel>
        </v-expansion-panels>
      </v-card>
    </v-container>
  </v-content>
</template>

<script>
export default {
  props: {
    courses: Object,
    tasks: Object
  },
  
//   computed: {
//       tasksForCourses: function(){
//           courseTasks = {}
//           for(course in courses){
//               courseTasks.
//               for(task in tasks){
//                   if(task.code == course.code){

//                   }
//               }

//           }
//       }
//   }

};
</script>