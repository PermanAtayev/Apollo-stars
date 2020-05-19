<template>
    <v-container class="my-5">
        <v-layout row wrap mb-3>
            <ExamPopup label= "Assigned Exams" />
            <AssignmentsPopup label= "Given Assignments" />
        </v-layout>
            <v-card flat >
                <v-layout row wrap v-for="course in courses" :key="course.code" class="py-2">
                    <v-flex xs12 md2>
                        <div class="caption grey--text">Name</div>
                        <div>{{ course.name }}</div>
                    </v-flex>
                    <v-flex xs6 sm3 md2>
                        <div class="caption grey--text">Code</div>
                        <div>{{ course.code }}</div>
                    </v-flex>
                    <v-flex xs6 sm3 md1>
                        <div class="caption grey--text">Section</div>
                        <div>{{ course.section }}</div>
                    </v-flex>
                    <v-flex xs6 sm3 md2>
                        <div>
                            <!-- onClick: Delete course from the courses of student -->
                            <!-- <v-btn small rounded outlined class="my-3" color="warning">Withdraw</v-btn> -->
                            <TaskPopup label="Grade Students"/>
                        </div>
                    </v-flex>
                    <v-flex xs6 sm3 md2>
                        <div>
                            <!-- onClick: Delete course from the courses of student -->
                            <!-- <v-btn small rounded outlined class="my-3" color="warning">Withdraw</v-btn> -->
                            <CreateExamPopup :courseCode= course.code />
                        </div>
                    </v-flex>
                    <v-flex xs6 sm3 md2>
                        <div>
                            <!-- onClick: Delete course from the courses of student -->
                            <!-- <v-btn small rounded outlined class="my-3" color="warning">Withdraw</v-btn> -->
                            <CreateAssignmentPopup :courseCode= course.code />
                        </div>
                    </v-flex>
                </v-layout>
            </v-card>
        </v-container>
</template>

<script>
import AssignmentsPopup from "@/components/AssignmentsPopup"
import ExamPopup from "@/components/ExamPopup"
import TaskPopup from "@/components/TaskPopup"
import CreateExamPopup from "@/components/CreateExamPopup"
import CreateAssignmentPopup from "@/components/CreateAssignmentPopup"



export default {
    props: {
        courses: Array
    },

    components: { ExamPopup, AssignmentsPopup, TaskPopup, CreateExamPopup, CreateAssignmentPopup
    }

}
</script>