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
import InstructorTable from '@/components/InstructorTable';
import InstructorTA from '@/components/InstructorTA';


export default {
  name: "Instructor",
  data: function() {
    return {
      drawer: false,
      currentPage: "Courses",

      
      actions: [
        { title: "Courses", icon: "class", owner: "instructor" },
        { title: "Teaching Assistants", icon: "people", owner: "instructor" }
      ],

      courses: [
        {name: "Algorithms and Programming I", code: "CS 101", section: '2'},
        {name: "Machine Learning", code: "CS 408", section: '1'},
        {name: "Programming Languages", code: "CS 315", section: '5'},
      ],

      taTasks: [
        {code: "CS 101", task: "Mark Attendence", deadline: '10/4/2020' },
        {code: "CS 101", task: "Grade Homework", deadline: '15/4/2020' },
        {code: "CS 408", task: "Grade Lab", deadline: '20/4/2020' },
        {code: "CS 408", task: "Mark Attendence", deadline: '25/4/2020' },
        {code: "CS 315", task: "Grade Quiz", deadline: '22/4/2020' },
        {code: "CS 315", task: "Grade Midterm", deadline: '1/5/2020' },
      ],

      availableTAs: [
        {name: "Balaj Saleem", id: 21701041, gpa: 3.2, ta:"CS 408"},
        {name: "Perman Atayev", id: 21701111, gpa: 3.99, ta:"CS 315"},
        {name: "Hanzlah Burney", id: 21701111, gpa: 3.99, ta:"CS 315"},
        {name: "Perman Atayev", id: 21701111, gpa: 3.99, ta:"CS 408"},
        {name: "Abdul Hamid", id: 21701111, gpa: 3.99, ta:"CS 101"}


      ], 



    };
  },

    computed: {
            currentProperties: function() {
                if (this.currentPage === 'Courses') {
                    return {courses: this.courses}
                }
                else if(this.currentPage === 'Teaching Assistants'){
                    return {courses: this.courses, tasks: this.taTasks, availableTAs: this.availableTAs}
                }
                else 
                  return {}
            }
        },

  components: { Navbar, Foot, 'Courses': InstructorTable, 'Teaching Assistants': InstructorTA },

   methods: {
            onNavBarSelect(value){
                this.currentPage = value
            }

        },




};
</script>

<style scoped>
</style>