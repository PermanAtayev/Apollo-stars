<template>
  <v-app>
    <Navbar :drawerItems="actions" v-on:navBarSelection="onNavBarSelect" />
    <h3 class="headline Primary ma-5 font-italic font-weight-light">{{ currentPage }}</h3>
    <keep-alive>
      <component :is="currentPage" v-bind="currentProperties"></component>
    </keep-alive>
    <v-spacer></v-spacer>
    <Foot />
  </v-app>
</template>

<script>
import Navbar from "@/components/Navbar";
import Foot from "@/components/Foot";
import InstructorTable from "@/components/InstructorTable";
import InstructorTA from "@/components/InstructorTA";

export default {
  name: "Instructor",
  data: function() {
    return {
      drawer: false,
      currentPage: "Courses",
      myId: "",

      actions: [
        { title: "Courses", icon: "class", owner: "instructor" },
        { title: "Teaching Assistants", icon: "people", owner: "instructor" }
      ],

      courses: [
        // { name: "Algorithms and Programming I", code: "CS 101", section: "2" },
        // { name: "Machine Learning", code: "CS 408", section: "1" },
        // { name: "Programming Languages", code: "CS 315", section: "5" }
      ],

      taTasks: [
        { code: "CS 101", task: "Mark Attendence", deadline: "10/4/2020" },
        { code: "CS 101", task: "Grade Homework", deadline: "15/4/2020" },
        { code: "CS 408", task: "Grade Lab", deadline: "20/4/2020" },
        { code: "CS 408", task: "Mark Attendence", deadline: "25/4/2020" },
        { code: "CS 315", task: "Grade Quiz", deadline: "22/4/2020" },
        { code: "CS 315", task: "Grade Midterm", deadline: "1/5/2020" }
      ],

      exams: [
        // { name: "Midterm I", dueDate: "20/5/2020", course: "CS 101" },
        // { name: "Final", dueDate: "25/5/2020", course: "MATH 102" },
        // { name: "Midterm II", dueDate: "30/5/2020", course: "CS 342" },
        // { name: "Midterm II", dueDate: "5/6/2020", course: "CS 224" },
        // { name: "Final", dueDate: "20/6/2020", course: "CS 201" }
      ],

      assignments: [
        // { name: "Lab 1", dueDate: "20/5/2020", course: "CS 101" },
        // { name: "Quiz 1", dueDate: "25/5/2020", course: "MATH 102" },
        // { name: "Homework 3", dueDate: "30/5/2020", course: "CS 342" },
        // { name: "Project 2", dueDate: "5/6/2020", course: "CS 224" },
        // { name: "Demo", dueDate: "8/6/2020", course: "CS 201" }
      ],

      availableTAs: [
        { name: "Balaj Saleem", id: 21701041, gpa: 3.2, ta: "CS 408" },
        { name: "Perman Atayev", id: 21701111, gpa: 3.99, ta: "CS 315" },
        { name: "Hanzlah Burney", id: 21701111, gpa: 3.99, ta: "CS 315" },
        { name: "Perman Atayev", id: 21701111, gpa: 3.99, ta: "CS 408" },
        { name: "Abdul Hamid", id: 21701111, gpa: 3.99, ta: "CS 101" }
      ]
    };
  },

  computed: {
    currentProperties: function() {
      if (this.currentPage === "Courses") {
        return {
          courses: this.courses,
          exams: this.exams,
          assignments: this.assignments
        };
      } else if (this.currentPage === "Teaching Assistants") {
        return {
          courses: this.courses,
          tasks: this.taTasks,
          availableTAs: this.availableTAs
        };
      } else return {};
    }
  },

  components: {
    Navbar,
    Foot,
    Courses: InstructorTable,
    "Teaching Assistants": InstructorTA
  },

  methods: {
    onNavBarSelect(value) {
      this.currentPage = value;
    },

    fetchInstructorCourses: async function() {
      let settings = {
        method: "get",
        headers: {
          "content-Type": "application/json"
        }
      };
      let url =
              "http://localhost:8079/instructor/" +
              this.myId.toString(10) +
              "/courses/display";

      let res = await fetch(url, settings)
              .then(response => response.json())
              .then(async function(text) {
                return text;
              })
              .catch(e => {
                return e;
              });
    this.courses = res.rows
    //FETCH METHODS
  },
    fetchAllExams: async function(){
      let settings = {
        method: "get",
        headers: {
          "content-Type": "application/json"
        }
      };

      let url =
              "http://localhost:8079/instructor/" +
              this.myId.toString(10) +
              "/exams/display";

      let res = await fetch(url, settings)
              .then(response => response.json())
              .then(async function(text) {
                return text;
              })
              .catch(e => {
                return e;
              });

      console.log(res.rows)
      this.exams = res.rows
    },

    fetchAllAssignments: async function(){
      let settings = {
        method: "get",
        headers: {
          "content-Type": "application/json"
        }
      };
      let url =
              "http://localhost:8079/instructor/" +
              this.myId.toString(10) +
              "/assignments";

      let res = await fetch(url, settings)
              .then(response => response.json())
              .then(async function(text) {
                return text;
              })
              .catch(e => {
                return e;
              });

      console.log(res.rows)
      this.assignments = res.rows
    },


  beforeCreate: function() {
    this.myId = this.$route.params.id;
  },
  },
  created: function(){
    this.myId = this.$route.params.id;
    this.fetchInstructorCourses();
    this.fetchAllExams();
    this.fetchAllAssignments();
  }
};
</script>

<style scoped>
</style>