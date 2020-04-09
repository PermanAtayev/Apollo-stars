<template>
  <div class="text-center">
    <v-dialog v-model="dialog" max-width="800px">
      <template v-slot:activator="{ on }">
        <v-btn small rounded text class="my-3" color="grey darken-2" v-on="on">
          <v-icon left>group_work</v-icon>
          <span>Research Groups</span>
        </v-btn>
      </template>
      <v-card color="grey lighten-3">
        <v-container>
          <v-layout row wrap pa-3 justify-space-around>
            <v-flex xs12 md9 pa-1>
              <v-text-field label="Research Topic"></v-text-field>
            </v-flex>
             <v-flex xs12 md2 pt-7>
                  <v-btn small rounded outlined color="primary">Create Group</v-btn>
              </v-flex>
          </v-layout>
          <v-layout row wrap justify-center>
                 <h5 class="title"> Avaialble Groups </h5>
          </v-layout>
          <v-layout row wrap pa-3 justify-center v-for="group in groups" :key="group.id">
                    <v-flex xs12 md6 px-1>
                        <div class="caption grey--text">Research Topic</div>
                        <div>{{ group.topic }}</div>
                    </v-flex>
                    <v-flex xs12 md2 px-1>
                        <div class="caption grey--text">ID</div>
                        <div>{{ group.id }}</div>
                    </v-flex>
                    <v-flex xs12 md2 px-2 py-3>
                        <v-btn small rounded outlined color="primary">Request to Join</v-btn>
                    </v-flex>
          </v-layout>
        </v-container>
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
    scores: Object,
  },
  data() {
    return {
      dialog: false,
      //right now dummy groups are used
      //NOTE: You should recycle the GroupPopup, with different props, do not use a new component
      groups: [

        { topic: "Genetic Research on GATAKA", id:1011},
        { topic: "Corona is bad, how will we fix it" , id: 2241},
        { topic: "Making masks affordable",  id:3421},

      ]
    };
  }
};
</script>