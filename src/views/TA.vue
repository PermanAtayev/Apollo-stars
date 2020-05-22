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
import CourseTable from "@/components/CourseTable";
import RegisterTable from "@/components/RegisterTable";
import TaCourseTable from "@/components/TaCourseTable";
import PersonDetails from "@/components/PersonDetails";

export default {
  name: "TA",
  data() {
    return {
      currentPage: "Courses",
      myId: "",

      actions: [
        //will add the route later
        { title: "Courses", icon: "class" },
        { title: "Register", icon: "add_box" },
        { title: "Information", icon: "person" },
        { title: "TA Courses", icon: "chrome_reader_mode" }
      ],

      courses: [
        // {name: "Algorithms and Programming I", code: "CS 101", instructor: "David Davenport", section: "2", credits: "4"},
        // {name: "Calculus II", code: "MATH 102", instructor: "Tekno Tekman", section: "9", credits: "3"},
        // {name: "Fundamental Structures of Computer Science I", code: "CS 201", instructor: "Tugrul Dayar", section: "1", credits: "4"},
        // {name: "Computer Organization", code: "CS 224", instructor: "Albert Einstein", section: "10", credits: "6"},
        // {name: "Operating Systems", code: "CS 342", instructor: "Selim Aksoy", section: "1", credits: "1"},
      ],

      registerableCourses: [
        // {name: "Algorithms and Programming II", code: "CS 102", instructor: "David Mavenhoarde", section: "5", credits: "3"},
        // {name: "Linear Math", code: "MATH 225", instructor: "Bilgen Milgen", section: "1", credits: "2"},
        // {name: "Data Science", code: "CS 555", instructor: "Alan Turing", section: "3", credits: "6"},
        // {name: "Creative Writing", code: "CS 224", instructor: "J. K. Rowling", section: "1", credits: "2"},
      ],

      exams: [
        // { name: "Midterm I", dueDate: "20/5/2020" , course: "CS 101" },
        // { name: "Final", dueDate: "25/5/2020" , course: "MATH 102" },
        // { name: "Midterm II", dueDate: "30/5/2020" , course: "CS 342" },
        // { name: "Midterm II", dueDate: "5/6/2020" , course: "CS 224" },
        // { name: "Final", dueDate: "20/6/2020" , course: "CS 201" },
      ],

      assignments: [
        // { name: "Lab 1", dueDate: "20/5/2020", course: "CS 101" },
        // { name: "Quiz 1", dueDate: "25/5/2020", course: "MATH 102" },
        // { name: "Homework 3", dueDate: "30/5/2020", course: "CS 342" },
        // { name: "Project 2", dueDate: "5/6/2020", course: "CS 224" },
        // { name: "Demo", dueDate: "8/6/2020", course: "CS 201" }
      ],

      taCourses: [
        // {
        //   name: "Algorithms and Programming I",
        //   code: "CS 101",
        //   instructor: "David Davenport"
        // },
        // { name: "Calculus III", code: "MATH 103", instructor: "Tekno Tekman" },
        // {
        //   name: "Programming Languages",
        //   code: "CS 315",
        //   instructor: "Karani Kardas"
        // }
      ],
      taTasks: [
        // { code: "CS 101", task: "Mark Attendence", deadline: "10/4/2020" },
        // { code: "CS 101", task: "Grade Homework", deadline: "15/4/2020" },
        // { code: "CS 101", task: "Grade Lab", deadline: "20/4/2020" },
        // { code: "CS 315", task: "Mark Attendence", deadline: "25/4/2020" },
        // { code: "CS 315", task: "Grade Quiz", deadline: "22/4/2020" },
        // { code: "MATH 103", task: "Grade Midterm", deadline: "1/5/2020" }
      ],
      details: {
        // name: "Balaj Saleem",
        // id: this.myId,
        // gpa: 3.2,
        // email: "balaj.saleem@ug.bilkent.edu.tr",
        // password: "12345678",
        // year: "Third Year",
        // dorm: "77",
        // phone: ["+90 553 169 5037", "+90 500 100 5000"]
      }
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
      } else if (this.currentPage === "TA Courses") {
        return { courses: this.taCourses, tasks: this.taTasks };
      } else if (this.currentPage === "Information") {
        return { details: this.details };
      } else if (this.currentPage === "Register") {
        return { courses: this.courses, regCourses: this.registerableCourses };
      }
      //No career option since TA is already an EMPLOYEE!
      else return {};
    }
  },

  components: {
    Navbar,
    Foot,
    Courses: CourseTable,
    "TA Courses": TaCourseTable,
    Information: PersonDetails,
    Register: RegisterTable
  },

  methods: {
    onNavBarSelect(value) {
      this.currentPage = value;
    },

    fetchCourses: async function() {
      //var student_id = this.$route.params.id;
      //console.log("getting courses");
      const settings = {
        method: "get",
        headers: {
          "content-Type": "application/json"
        }
      };

      var url =
        "http://localhost:8079/student/" +
        this.myId.toString(10) +
        "/regCourseView";

      const res = await fetch(url, settings)
        .then(response => response.json())
        .then(async function(text) {
          return text;
        })
        .catch(e => {
          return e;
        });

      console.log("taken courses: " + res.rows);
      this.courses = res.rows;
    },

    fetchRegCourses: async function() {
      //console.log("getting registerable courses");
      //var student_id = 1217017

      const settings = {
        method: "get",
        headers: {
          "content-Type": "application/json"
        }
        // body: JSON.stringify(data)
      };

      var url =
        "http://localhost:8079/student/" +
        this.myId.toString(10) +
        "/regCourseApply";

      const res = await fetch(url, settings)
        .then(response => response.json())
        .then(async function(text) {
          return text;
        })
        .catch(e => {
          return e;
        });

      console.log("registered courses: " +res.rows);
      this.registerableCourses = res.rows;
    },

    fetchAssignments: async function() {
      const settings = {
        method: "get",
        headers: {
          "content-Type": "application/json"
        }
      };

      var url =
        "http://localhost:8079/student/" +
        this.myId.toString(10) +
        "/assignments/display";

      const res = await fetch(url, settings)
        .then(response => response.json())
        .then(async function(text) {
          return text;
        })
        .catch(e => {
          return e;
        });
      console.log("fetchedAssignments");
      console.log(res.rows);
      this.assignments = res.rows;
    },

    fetchAvailableCareers: async function() {
      const settings = {
        method: "get",
        headers: {
          "content-Type": "application/json"
        }
      };

      var url =
        "http://localhost:8079/student/" +
        this.myId.toString(10) +
        "/careers/display";

      const res = await fetch(url, settings)
        .then(response => response.json())
        .then(async function(text) {
          return text;
        })
        .catch(e => {
          return e;
        });

      console.log("careers:" + res.rows);
      this.availableCareers = res.rows;
    },
    fethDetails: async function() {
      const settings = {
        method: "get",
        headers: {
          "content-Type": "application/json"
        }
      };

      var url =
        "http://localhost:8079/student/" +
        this.myId.toString(10) +
        "/details/display";

      const res = await fetch(url, settings)
        .then(response => response.json())
        .then(async function(text) {
          return text;
        })
        .catch(e => {
          return e;
        });
      console.log("taTasks");
      console.log(res.rows[0]);
      this.details = res.rows[0];

    },
    fetchTaTasks: async function() {
      const settings = {
        method: "get",
        headers: {
          "content-Type": "application/json"
        }
      };

      var url =
        "http://localhost:8079/ta/" +
        this.myId.toString(10) +
        "/course/tasks";
        //console.log("ta query url is: "  + url);

      const res = await fetch(url, settings)
        .then(response => response.json())
        .then(async function(text) {
          return text;
        })
        .catch(e => {
          return e;
        });
      console.log("taTasks: ");
      console.log( res.rows);
      this.taTasks = res.rows;
    },
    fetchTaCourses: async function() {
      const settings = {
        method: "get",
        headers: {
          "content-Type": "application/json"
        }
      };

      var url =
        "http://localhost:8079/ta/" +
        this.myId.toString(10) +
        "/courses";
        //console.log("ta query url is: "  + url);

      const res = await fetch(url, settings)
        .then(response => response.json())
        .then(async function(text) {
          return text;
        })
        .catch(e => {
          return e;
        });
      console.log("taCourses: ");
      console.log( res.rows);
      this.taCourses = res.rows;
    },
  },
  created: function() {
    this.myId = this.$route.params.id;
    this.fetchCourses();
    this.fetchRegCourses();
    this.fetchAssignments();
    //this.fetchAvailableCareers();
    this.fethDetails();
    this.fetchTaTasks();
    this.fetchTaCourses();
  }

  //life cycle hooks
};
</script>

<style scoped>
</style>