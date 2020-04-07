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
    import TaCourseTable from "@/components/TaCourseTable";

    export default {
        name: "TA",
        data() {
            return {
                
                currentPage: "Courses",
                
                actions: [ //will add the route later
                    {title: "Courses", icon: "class"},
                    {title: "Register", icon: "add_box"},
                    {title: "Information", icon: "person"},
                    {title: "TA Courses", icon: "chrome_reader_mode"},
                ],

                courses: [
                    {name: "Algorithms and Programming I", code: "CS 101", instructor: "David Davenport", section: "2", credits: "4"},
                    {name: "Calculus II", code: "MATH 102", instructor: "Tekno Tekman", section: "9", credits: "3"},
                    {name: "Fundamental Structures of Computer Science I", code: "CS 201", instructor: "Tugrul Dayar", section: "1", credits: "4"},
                    {name: "Computer Organization", code: "CS 224", instructor: "Albert Einstein", section: "10", credits: "6"},
                    {name: "Operating Systems", code: "CS 342", instructor: "Selim Aksoy", section: "1", credits: "1"},
                ],
                
                taCourses: [
                    {name: "Algorithms and Programming I", code: "CS 101", instructor: "David Davenport"},
                    {name: "Calculus III", code: "MATH 103", instructor: "Tekno Tekman"},
                    {name: "Programming Languages", code: "CS 315", instructor: "Karani Kardas"},
                ],
                taTasks: [
                    {code: "CS 101", task: "Mark Attendence", deadline: '10/4/2020' },
                    {code: "CS 101", task: "Grade Homework", deadline: '15/4/2020' },
                    {code: "CS 101", task: "Grade Lab", deadline: '20/4/2020' },
                    {code: "CS 315", task: "Mark Attendence", deadline: '25/4/2020' },
                    {code: "CS 315", task: "Grade Quiz", deadline: '22/4/2020' },
                    {code: "MATH 103", task: "Grade Midterm", deadline: '1/5/2020' },

                ],


            };
        },
        computed: {
            currentProperties: function() {
                if (this.currentPage === 'Courses') {
                    return {courses: this.courses}
                }
                else if(this.currentPage === 'TA Courses'){
                    return {courses: this.taCourses, tasks: this.taTasks}
                }
                else 
                    return {}
            }
        },

        components: { Navbar, Foot, "Courses": CourseTable, 
        "TA Courses": TaCourseTable
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