<template>
  <v-app>
    <Navbar :drawerItems="actions" v-on:navBarSelection="onNavBarSelect" :hasGroups="false" />
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
import InstructorReport from "@/components/InstructorReport";
import SalaryInstructorReport from "@/components/SalaryInstructorReport";
import RangeReport from "@/components/RangeReport";
import CourseReport from "@/components/CourseReport";
import GradeReport from "@/components/GradeReport";

export default {
  name: "Reports",
  data() {
    return {
      //<-------------------CHANGE THESE VARIABLES USING FETCH REQUESTS------------------->
      currentPage: "Instructor Report",
      actions: [
        //will add the route later
        { title: "Instructor Report", icon: "assignment_ind" },
        { title: "Grade Report", icon: "assessment" },
        { title: "Salary Report", icon: "money" },
        { title: "Salary Range", icon: "attach_money" },
        { title: "Course Search", icon: "book" },

      ],

      instructorData: [
        //will add the route later
        // {
        //   name: "David Davenport",
        //   email: "DavidD@bilkent.com",
        //   dateJoined: "10/10/2010",
        //   grant: "10000"
        // },
        // {
        //   name: "Albert MavenPoart",
        //   email: "Albert@bilkent.com",
        //   dateJoined: "11/11/2011",
        //   grant: "66000"
        // },
        // {
        //   name: "Srinivasan GamenBoard",
        //   email: "Srinivasan@bilkent.com",
        //   dateJoined: "10/10/2010",
        //   grant: "69000"
        // },
        // {
        //   name: "Singh LavenMort",
        //   email: "Singh@bilkent.com",
        //   dateJoined: "12/12/2012",
        //   grant: "96000"
        // },
        // {
        //   name: "Hans HagenHorde",
        //   email: "Hans@bilkent.com",
        //   dateJoined: "10/10/2010",
        //   grant: "66000"
        // },
        // {
        //   name: "Mans ChakenLord",
        //   email: "Mans@bilkent.com",
        //   dateJoined: "10/10/2010",
        //   grant: "67000"
        // },
        // {
        //   name: "Dans BakenPort",
        //   email: "Dans@bilkent.com",
        //   dateJoined: "01/10/2001",
        //   grant: "68000"
        // },
        // {
        //   name: "Cans AsianSword",
        //   email: "Cans@bilkent.com",
        //   dateJoined: "02/02/2002",
        //   grant: "62000"
        // },
        // {
        //   name: "Bandana RamenPot",
        //   email: "Bandana@bilkent.com",
        //   dateJoined: "09/09/2009",
        //   grant: "64000"
        // }
      ],

      exams: [
        //will add the route later
        // { name: "CS 224 Mid 1", avgGrade: 24 },
        // { name: "CS 224 Mid 2", avgGrade: 16 },
        // { name: "CS 321 Mid 1", avgGrade: 22 },
        // { name: "CS 552 Final", avgGrade: 90 },
        // { name: "CS 445 Final", avgGrade: 12 },
        // { name: "CS 112 Mid 2", avgGrade: 66 },
        // { name: "CS 101 Mid 1", avgGrade: 87 },
        // { name: "CS 101 Mid 2", avgGrade: 6 }
      ],
      rankings: [],
    };
  },

  components: {
    Navbar,
    Foot,
    "Instructor Report": InstructorReport,
    "Grade Report": GradeReport, "Salary Report": SalaryInstructorReport, "Salary Range": RangeReport, "Course Search": CourseReport,
  },

  computed: {
    currentProperties: function() {
      if (this.currentPage === "Instructor Report") {
        return { instructors: this.instructorData };
      } 
      else if (this.currentPage === "Grade Report") {
        return { exams: this.exams };
      }
      else if (this.currentPage === "Salary Report") {
        return { rankings: this.rankings };
      }
      else if (this.currentPage === "Salary Range") {
        return {  };
      }
      else if (this.currentPage === "Course Search") {
        return {  };
      }
       
      else return {};
    }
  },

  methods: {
    onNavBarSelect(value) {
      this.currentPage = value;
    },

    fethchInstructorReport: async function() {
      const settings = {
        method: "get",
        headers: {
          "content-Type": "application/json"
        }
      };

      var url =
        "http://localhost:8079/report/one";
      const res = await fetch(url, settings)
        .then(response => response.json())
        .then(async function(text) {
          return text;
        })
        .catch(e => {
          return e;
        });

      console.log(res.rows);
      this.instructorData = res.rows;
    },
    fetchGradeReport: async function() {
      const settings = {
        method: "get",
        headers: {
          "content-Type": "application/json"
        }
      };

      var url =
        "http://localhost:8079/report/second";
      const res = await fetch(url, settings)
        .then(response => response.json())
        .then(async function(text) {
          return text;
        })
        .catch(e => {
          return e;
        });

      console.log(res.rows);
      this.exams = res.rows;
    },
     fetchRankings: async function() {
      const settings = {
        method: "get",
        headers: {
          "content-Type": "application/json"
        }
      };

      var url =
        "http://localhost:8079/rankings/view/";
      const res = await fetch(url, settings)
        .then(response => response.json())
        .then(async function(text) {
          return text;
        })
        .catch(e => {
          return e;
        });

      console.log(res.rows);
      this.rankings = res.rows;
    },
    
    

  },
  created: function(){
    this.fethchInstructorReport();
    this.fetchGradeReport();
    this.fetchRankings();

    
  },
  //life cycle hooks
};
</script>