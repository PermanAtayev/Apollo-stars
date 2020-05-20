<template>
  <div class="text-center">
    <v-dialog v-model="dialog" max-width="600px" >
      <template v-slot:activator="{ on }">
        <v-btn small rounded outlined dark class="my-3" color="teal" v-on="on"> {{label}} </v-btn>
      </template>
      <v-card color="grey lighten-3">
      <v-col v-for="item in students" :key="item.id" cols="12">
        <v-card>
          <div class="d-flex flex-no-wrap justify-space-around">
            <div>
              <v-card-title class="headline" v-text="item.name"></v-card-title>
              <v-card-subtitle class="subheading" v-text="item.id"></v-card-subtitle>
            </div>
            <v-checkbox v-if="isAttendance" :label="`Present`"></v-checkbox>
            <v-text-field v-else solo rounded append-icon="create" label="Marks Obtained" suffix=" / 100" class="px-3 mt-3"></v-text-field>
          </div>
        </v-card>
      </v-col>
      <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn large text color="primary" @click="dialog = false">Close</v-btn>
      <v-btn large text color="primary" @click="dialog = false">Save</v-btn>
      </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  props: {
    label: String,
    isAttendance: {default: true, type: Boolean} //there may be different entry types not just marks or attendence, provided by the parent
    //to be provided, by parent
  },
  data() {
    return {
      dialog: false,
      //isAttendance: false, //there may be different entry types not just marks or attendence, provided by the parent
      //right now dummy students are used, in reality these would be passed from parent component

      //GET STUDENTS FOR THAT COURSE USING AN API CALL
      students: [
        { name: "Balaj Saleem", id: 21701041 },
        { name: "Perman Atayev", id: 21701111 },
        { name: "Abdul Hameed", id: 21701050 },
        { name: "Hanzalah Burney", id: 21706969 },
        { name: "Micheal Jakson", id: 21300000 },
        { name: "Willy Wonka", id: 21709999 },
        { name: "Djikstra Mjikstra", id: 21702222 }
      ]
    };
  }
};
</script>