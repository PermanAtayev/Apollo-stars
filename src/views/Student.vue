<template>
  <v-app>
    <Navbar :isStudent="true" :drawerItems="actions" v-on:navBarSelection="onNavBarSelect" />
    <h3 class="headline Primary ma-5 font-italic font-weight-light">{{ currentPage }}</h3>
    <keep-alive>
      <component :is="currentPage" v-bind="currentProperties"></component>
    </keep-alive>
    <v-spacer></v-spacer>
    <Foot />
  </v-app>
</template>

<script>
    import Navbar from '@/components/Navbar' 
    import Foot from "@/components/Foot";
    import CourseTable from "@/components/CourseTable";
    import Career from "@/components/Career";
    import RegisterTable from "@/components/RegisterTable";
    import PersonDetails from "@/components/PersonDetails";

    export default {
        name: "Student",
        data() {
            return {
                //<-------------------CHANGE THESE VARIABLES USING FETCH REQUESTS------------------->
                currentPage: "Courses",
                
                actions: [ //will add the route later
                    {title: "Courses", icon: "class"},
                    {title: "Register", icon: "add_box"},
                    {title: "Information", icon: "person"},
                    {title: "Career", icon: "work"},
                ],

                courses: [
                    {name: "Algorithms and Programming I", code: "CS 101", instructor: "David Davenport", section: "2", credits: "4"},
                    {name: "Calculus II", code: "MATH 102", instructor: "Tekno Tekman", section: "9", credits: "3"},
                    {name: "Fundamental Structures of Computer Science I", code: "CS 201", instructor: "Tugrul Dayar", section: "1", credits: "4"},
                    {name: "Computer Organization", code: "CS 224", instructor: "Albert Einstein", section: "10", credits: "6"},
                    {name: "Operating Systems", code: "CS 342", instructor: "Selim Aksoy", section: "1", credits: "1"},
                ],
                registerableCourses: [
                    {name: "Algorithms and Programming II", code: "CS 102", instructor: "David Mavenhoarde", section: "5", credits: "3"},
                    {name: "Linear Math", code: "MATH 225", instructor: "Bilgen Milgen", section: "1", credits: "2"},
                    {name: "Data Science", code: "CS 555", instructor: "Alan Turing", section: "3", credits: "6"},
                    {name: "Creative Writing", code: "CS 224", instructor: "J. K. Rowling", section: "1", credits: "2"},
                ],

                exams: [
                    { name: "Midterm I", dueDate: "20/5/2020" , course: "CS 101" },
                    { name: "Final", dueDate: "25/5/2020" , course: "MATH 102" },
                    { name: "Midterm II", dueDate: "30/5/2020" , course: "CS 342" },
                    { name: "Midterm II", dueDate: "5/6/2020" , course: "CS 224" },
                    { name: "Final", dueDate: "20/6/2020" , course: "CS 201" },

                ],

                assignments: [
                    { name: "Lab 1", dueDate: "20/5/2020", course: "CS 101" },
                    { name: "Quiz 1", dueDate: "25/5/2020", course: "MATH 102" },
                    { name: "Homework 3", dueDate: "30/5/2020", course: "CS 342" },
                    { name: "Project 2", dueDate: "5/6/2020", course: "CS 224" },
                    { name: "Demo", dueDate: "8/6/2020", course: "CS 201" }
                ],

                availableCareers: [
                    {id: "Java Developer", description: "Do nothing", type: "Full-Time", salary: "2000"},
                    {id: "Vue Developer", description: "Develop Cool UIs", type: "Internship", salary: "500"},
                    {id: "Undergrad Researcher", description: "Research Corona Virus and find a cure", type: "Part-Time", salary: "20000"},
                    {id: "Animator", description: "Animate some characters for Pixar", type: "Full-Time", salary: "9999"},
                    {id: "Game Developer", description: "Develop cool games with Unity", type: "Full-Time", salary: "200"},
                    {id: "Office Assistant", description: "Help with the office in Sports International", type: "Internship", salary: "0"},

                ],

                details: {name: "Balaj Saleem", id: 21701041, gpa: 3.2, email:"balaj.saleem@ug.bilkent.edu.tr", password: "12345678", year: "Third Year", dorm: "77", phone: ["+90 553 169 5037", "+90 500 100 5000"]},

            };
        },
        computed: {
            currentProperties: function() {
                if (this.currentPage === 'Courses') {
                    return {courses: this.courses, exams: this.exams, assignments: this.assignments}
                }
                else if(this.currentPage === 'Information'){
                    return {details: this.details}
                }
                else if(this.currentPage === 'Career'){
                    return {careers: this.availableCareers}
                }
                else if(this.currentPage === 'Register'){
                    return {courses: this.courses, regCourses: this.registerableCourses}
                }
                else 
                    return {}
            }
        },

        components: { Navbar, Foot, "Courses": CourseTable, 
         "Information": PersonDetails, "Career": Career, "Register": RegisterTable, 
        },

        methods: {
            onNavBarSelect(value){
                this.currentPage = value
            }




        }
        //life cycle hooks
    }



</script>
