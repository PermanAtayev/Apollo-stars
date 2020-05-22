<template>
    <v-container class="my5">
      <v-card flat>
        <v-expansion-panels>
          <v-expansion-panel focusable v-for="course in courses" :key="course.id + course.course_name">
            <v-expansion-panel-header>
              <v-layout row wrap>
                <v-flex xs12 md4>
                  <div class="caption grey--text">Name</div>
                  <div>{{ course.course_name }}</div>
                </v-flex>
                <v-flex xs6 sm3 md2>
                  <div class="caption grey--text">Instructor ID</div>
                  <div>{{ course.id }}</div>
                </v-flex>
                <v-flex xs6 sm3 md4>
                  <div class="caption grey--text">Instructor</div>
                  <div>{{ course.instructor_name }} {{ course.surname }}</div>
                </v-flex>
              </v-layout>
            </v-expansion-panel-header>
            <v-expansion-panel-content>
              <v-layout row wrap  v-for="task in tasksForCourse(course.id)" :key="task.task_desc">
                <v-flex xs6 sm3 md8>
                  <div class="caption grey--text">Task</div>
                  <div>{{ task.task_desc }}</div>
                </v-flex>
                <!-- <v-flex xs6 sm3 md2 >
                  <div class="caption grey--text">Deadline</div>
                  <div>{{ task.deadline }}</div>
                </v-flex> -->
                <v-flex xs6 sm3 md4>
                    <div>
                      <v-btn small rounded @click="completeTask(course.id)" outlined class="my-3" color="success">Complete Task</v-btn>
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
//import TaskPopup from "@/components/TaskPopup"
export default {
  props: {
    courses: Array,
    tasks: Array
  },
  
  components: { //TaskPopup,
  
  },

  methods: {
    //only of all tasks return the tasks for this course
    tasksForCourse: function (courseCode){
      var tasks = [];
      for(var task in this.tasks){
        if(this.tasks[task].instructor_id == courseCode  ){
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

    },

    completeTask: async function(instructorID){
      let data = { instructor_id: instructorID};
      console.log("Id of the instructor is: " + instructorID);
      const settings = {
        method: "post",
        headers: {
          "content-Type": "application/json"
        },
        body: JSON.stringify(data)
      };
      //const recievedJson = await res.json;
       var url = 'http://localhost:8079/ta/' + this.$route.params.id.toString(10) + '/course/task/complete'
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

  mounted(){
    // console.log("SHOWING");
    // console.log(this.tasks);
    // console.log("SHOWING AGAIN");
    // console.log(this.courses);


  }

};
</script>