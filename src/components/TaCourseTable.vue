<template>
    <v-container class="my5">
      <v-card flat>
        <v-expansion-panels>
          <v-expansion-panel focusable v-for="course in courses" :key="course.name">
            <v-expansion-panel-header>
              <v-layout row wrap>
                <v-flex xs12 md4>
                  <div class="caption grey--text">Name</div>
                  <div>{{ course.name }}</div>
                </v-flex>
                <!-- <v-flex xs6 sm3 md2>
                  <div class="caption grey--text">Code</div>
                  <div>{{ course.code }}</div>
                </v-flex>
                <v-flex xs6 sm3 md4>
                  <div class="caption grey--text">Instructor</div>
                  <div>{{ course.instructor }}</div>
                </v-flex> -->
              </v-layout>
            </v-expansion-panel-header>
            <v-expansion-panel-content>
              <v-layout row wrap  v-for="task in tasksForCourse(course.code)" :key="task.code + task.task">
                <v-flex xs6 sm3 md4>
                  <div class="caption grey--text">Task</div>
                  <div>{{ task.task }}</div>
                </v-flex>
                <v-flex xs6 sm3 md2 >
                  <div class="caption grey--text">Deadline</div>
                  <div>{{ task.deadline }}</div>
                </v-flex>
                <v-flex xs6 sm3 md2 >
                    <div>
                      <TaskPopup label="Complete Task" :isAttendance = checkTaskType(task.task) />
                    </div>
                </v-flex>
              </v-layout>
            </v-expansion-panel-content>
          </v-expansion-panel>
        </v-expansion-panels>
      </v-card>
    </v-container>
</template>

<script>
import TaskPopup from "@/components/TaskPopup"
export default {
  props: {
    courses: Array,
    tasks: Array
  },
  
  components: { TaskPopup,
  
  },

  methods: {
    //only of all tasks return the tasks for this course
    tasksForCourse: function (courseCode){
      var tasks = [];
      for(var task in this.tasks){
        if(this.tasks[task].code == courseCode  ){
          tasks.push(this.tasks[task]);
        }
      }
      return tasks;
    },
    
    checkTaskType: function(task){

      if(task.toUpperCase().includes("ATTEND")){
        return true;
      }
      else{
        return false;
      }

    } 


  }

};
</script>