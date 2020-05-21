<template>
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
            </v-layout>
          </v-expansion-panel-header>
          <v-expansion-panel-content>
            <v-layout row wrap v-for="task in tasksForCourse(course.code)" :key="task.code + task.task">
              <!-- Do not use these V-ifs on deployment, this is a quickfix -->
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
                  <v-select :items="taForCourse(course.code)" label="Available TAs"></v-select>
                </div>
              </v-flex>
              <v-flex xs6 sm3 md2>
                <div>
                  <v-btn outlined class="ma-3" color="primary"> Authorize </v-btn>
                </div>
              </v-flex>
            </v-layout>
            <v-layout row wrap>
              <CreateTaskPopup :courseCode = course.code />
            </v-layout>
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panels>
    </v-card>
  </v-container>
</template>


<script>
import CreateTaskPopup from "@/components/CreateTaskPopup"
export default {
  props: {
    courses: Array,
    tasks: Array,
    availableTAs: Array,
  },

    data() {
    return {
    };
  },

  computed: {
    taNames: function(){
      var names =[] ;
      for(var ta in this.availableTAs){
        names.push(this.availableTAs[ta].name);
      }
      return names;
    },

  },

  methods: {
    taForCourse: function(courseCode) {
       var names = [];
      for(var ta in this.availableTAs){
        if(courseCode == (this.availableTAs[ta].ta)  ){
          names.push(this.availableTAs[ta].name);
        }
      }
      return names;
    },
    tasksForCourse: function (courseCode){
      var tasks = [];
      for(var task in this.tasks){
        if(this.tasks[task].code == courseCode  ){
          tasks.push(this.tasks[task]);
        }
      }
      return tasks;
    }
  },

  components: { CreateTaskPopup },

};
</script>