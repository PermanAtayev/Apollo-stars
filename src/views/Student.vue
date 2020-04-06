<template>
  <v-app>
    <Navbar :drawerItems="items" />
    <h3 class="subheading grey--text ma-5">Courses</h3>
        <v-container class="my5">
            <v-layout row class="mb-3">
                <v-btn color="black" outlined="" class="mr-3" @click="sortBy('name')">
                    <v-icon left small>sort_by_alpha</v-icon>
                    <span class="caption text-lowercase">sort by Name</span>
                </v-btn>
                <v-btn color="black" outlined="" class="mx-3" @click="sortBy('code')">
                    <v-icon left small>sort</v-icon>
                    <span class="caption text-lowercase">sort by Code</span>
                </v-btn>
                <v-btn color="black" outlined="" class="mx-3" @click="sortBy('credits')">
                    <v-icon left small>filter_list</v-icon>
                    <span class="caption text-lowercase">sort by Credits</span>
                </v-btn>
            </v-layout>
            <v-card flat>
                <v-layout row wrap v-for="course in courses" :key="course.code">
                    <v-flex xs12 md4>
                        <div class="caption grey--text">Name</div>
                        <div>{{ course.name }}</div>
                    </v-flex>
                    <v-divider></v-divider>
                    <v-flex xs6 sm3 md2>
                        <div class="caption grey--text">Code</div>
                        <div>{{ course.code }}</div>
                    </v-flex>
                    <v-divider></v-divider>
                    <v-flex xs6 sm3 md4>
                        <div class="caption grey--text">Instructor</div>
                        <div>{{ course.instructor }}</div>
                    </v-flex>
                    <v-divider></v-divider>
                    <v-flex xs6 sm3 md1>
                        <div class="caption grey--text">Section</div>
                        <div>{{ course.section }}</div>
                    </v-flex>
                    <v-divider></v-divider>
                    <v-flex xs6 sm3 md1>
                        <div class="caption grey--text">Credits</div>
                        <div>{{ course.credits }}</div>
                    </v-flex>
                    <v-divider></v-divider>
                    <v-flex xs6 sm3 md2>
                        <div>
                            <v-btn small rounded outlined class="my-3" color="warning">Withdraw</v-btn>
                        </div>
                    </v-flex>
                    <v-flex xs6 sm3 md2>
                        <div>
                            <v-btn small rounded outlined class="my-3" color="teal">Grades</v-btn>
                        </div>
                    </v-flex>
                </v-layout>
            </v-card>
        </v-container>
    <v-spacer></v-spacer>
    <Foot />
  </v-app>
</template>

<script>
import Navbar from "@/components/Navbar";
import Foot from "@/components/Foot";
    export default {
        name: "Student",
        data: function(){
            return {
                drawer: false,
                items: [
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
            }
        },
        components: { Navbar, Foot },

        methods: {
            sortBy(prop){
                this.courses.sort((a,b) => a[prop] < b[prop] ? -1 : 1)
            }
        }
    }
</script>

<style scoped>

</style>