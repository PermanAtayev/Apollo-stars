<template>
  <v-app>
    <Navbar :drawerItems="actions" v-on:navBarSelection="onNavBarSelect" />
    <h3 class="subheading grey--text ma-5">{{ currentPage }}</h3>
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
                ],

                courses: [
                    {name: "Algorithms and Programming I", code: "CS 101", instructor: "David Davenport", section: "2", credits: "4"},
                    {name: "Calculus II", code: "MATH 102", instructor: "Tekno Tekman", section: "9", credits: "3"},
                    {name: "Fundamental Structures of Computer Science I", code: "CS 201", instructor: "Tugrul Dayar", section: "1", credits: "4"},
                    {name: "Computer Organization", code: "CS 224", instructor: "Albert Einstein", section: "10", credits: "6"},
                    {name: "Operating Systems", code: "CS 342", instructor: "Selim Aksoy", section: "1", credits: "1"},
                ],

                details: {name: "Balaj Saleem", id: 21701041, gpa: 3.2, email:"balaj.saleem@ug.bilkent.edu.tr", password: "12345678", year: "Third Year", dorm: "77"},

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
                else 
                    return {}
            }
        },

        components: { Navbar, Foot, "Courses": CourseTable, 
         "Information": PersonDetails,
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