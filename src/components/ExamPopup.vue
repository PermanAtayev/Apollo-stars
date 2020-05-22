<template>
  <div class="text-center">
    <v-dialog v-model="dialog" max-width="500px">
      <template v-slot:activator="{ on }">
        <v-btn small text color="success" v-on="on">
          <v-icon left small>event</v-icon>
          <span class="caption text">Exams</span>
        </v-btn>
      </template>
    <v-card color="grey lighten-3">
      <p class="headline text--secondary pa-5">{{ label  }}</p>
    <v-col v-for="item in items" :key="item.exam_name" cols="12">
      <v-card >
        <div class="d-flex flex-no-wrap justify-space-between">
          <div>
            <v-card-title class="headline" v-text="item.exam_name"></v-card-title>
<!--            <v-card-subtitle class="subheading" v-text="item.dueDate"></v-card-subtitle>-->
          </div>
        </div>
      </v-card>
    </v-col>
     <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn large text color="primary" @click="dialog = false">Close</v-btn>
     </v-card-actions>
    </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  props: {
    items: Array,
    label: String, 
  },
  data() {
    return {
      dialog: false,
      //right now dummy exams are used
      //NOTE: Recycle the assignments popup with different props, since these are the same code
      // items: [
      //   { name: "Midterm I", dueDate: "20/5/2020" , course: "CS 101" },
      //   { name: "Final", dueDate: "25/5/2020" , course: "MATH 102" },
      //   { name: "Midterm II", dueDate: "30/5/2020" , course: "CS 342" },
      //   { name: "Midterm II", dueDate: "5/6/2020" , course: "CS 224" },
      //   { name: "Final", dueDate: "20/6/2020" , course: "CS 201" },
      // ],
    };
  }
};
</script>