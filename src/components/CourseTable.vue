<template>
    <v-container class="my-5">
        <v-layout row wrap mb-3>
            <ExamPopup />
            <AssignmentsPopup />
        </v-layout>
            <v-card flat >
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
                            <!-- <v-btn small rounded outlined class="my-3" color="teal">Grades</v-btn> -->
                            <Popup />
                        </div>
                    </v-flex>
                    <v-flex xs6 sm3 md2>
                        <div>
                            <v-btn small rounded outlined class="my-3" color="primary">Assess Instructor</v-btn>
                        </div>
                    </v-flex>
                </v-layout>
            </v-card>
        </v-container>
</template>

<script>
import Popup from "@/components/Popup"
import AssignmentsPopup from "@/components/AssignmentsPopup"
import ExamPopup from "@/components/ExamPopup"
export default {
    props: {
        courses: Object
    },

    components: { Popup, AssignmentsPopup, ExamPopup
    }

}
</script>