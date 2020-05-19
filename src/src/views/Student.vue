<template>
  <v-app>
    <Navbar :isStudent="true" :drawerItems="actions" v-on:navBarSelection="onNavBarSelect" />
    <h3 class="headline Primary ma-5 font-italic">{{ currentPage }}</h3>
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

                availableCareers: [
                    {id: "Java Developer", description: "Do nothing", type: "Full-Time", salary: "2000"},
                    {id: "Vue Developer", description: "Develop Cool UIs", type: "Internship", salary: "500"},
                    {id: "Undergrad Researcher", description: "Research Corona Virus and find a cure", type: "Part-Time", salary: "20000"},
                    {id: "Animator", description: "Animate some characters for Pixar", type: "Full-Time", salary: "9999"},
                    {id: "Game Developer", description: "Develop cool games with Unity", type: "Full-Time", salary: "200"},
                    {id: "Office Assistant", description: "Help with the office in Sports International", type: "Internship", salary: "0"},

                ],

                details: {name: "Balaj Saleem", id: 21701041, gpa: 3.2, email:"balaj.saleem@ug.bilkent.edu.tr", password: "12345678", year: "Third Year", dorm: "77", phone: "+90 553 169 5037"},

            };
        },
        computed: {
            currentProperties: function() {
                if (this.currentPage === 'Courses') {
                    return {courses: this.courses}
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

<style scoped>
</style>