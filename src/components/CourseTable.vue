<template>
    <v-container class="my-5">
        <v-layout row wrap mb-3>
            <ExamPopup :items = this.exams label="Upcoming Exams"  />
            <AssignmentsPopup :items = this.assignments label="Upcoming Assignments" />
        </v-layout>
            <v-card flat >
                <v-layout row wrap v-for="course in courses" :key="course.course_id" class="py-3">
                    <v-flex xs12 md3>
                        <div class="caption grey--text">Name</div>
                        <div>{{ course.course_id }}</div>
                    </v-flex>
                    <!-- <v-flex xs6 sm3 md2>
                        <div class="caption grey--text">Code</div>
                        <div>{{ course.code }}</div>
                    </v-flex> -->
                    <v-flex xs6 sm3 md2>
                        <div class="caption grey--text">Instructor</div>
                        <div>{{ course.instructor_name }} {{ course.instructor_surname }}</div>
                    </v-flex>
                    <v-flex xs6 sm3 md1>
                        <div class="caption grey--text">Section</div>
                        <div>{{ course.section_id }}</div>
                    </v-flex>
                    <v-flex xs6 sm3 md1>
                        <div class="caption grey--text">Credits</div>
                        <div>{{ course.credits }}</div>
                    </v-flex>
                    <v-flex xs6 sm3 md1>
                        <div>
                            <!-- onClick: Delete course from the courses of student -->
                            <v-btn small rounded outlined class="my-3" color="warning">Withdraw</v-btn>
                        </div>
                    </v-flex>
                    <v-flex xs6 sm3 md2>
                        <div>
                            <!-- <v-btn small rounded outlined class="my-3" color="teal">Grades</v-btn> -->
                            <GradesPopup :label = course.course_id />
                        </div>
                    </v-flex>
                    <v-flex xs6 sm3 md1>
                        <div>
                            <!-- onClick: Show the assesment popup -->
                            <!-- <v-btn small rounded outlined class="my-3" color="primary">Assess Instructor</v-btn> -->
                            <AssessPopup :instructorName ="course.instructor_name" :instructorSurname="course.instructor_surname"   />
                        </div>
                    </v-flex>
                </v-layout>
            </v-card>
        </v-container>
</template>

<script>
import GradesPopup from "@/components/GradesPopup"
import AssessPopup from "@/components/AssessPopup"
import AssignmentsPopup from "@/components/AssignmentsPopup"
import ExamPopup from "@/components/ExamPopup"
export default {
    props: {
        courses: Array,
        exams: Array,
        assignments: Array,
    },

    components: { GradesPopup, AssignmentsPopup, ExamPopup, AssessPopup,
    }

}
</script>