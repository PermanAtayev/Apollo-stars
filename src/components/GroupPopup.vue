<template>
  <div class="text-center">
    <v-dialog v-model="dialog" max-width="800px">
      <template v-slot:activator="{ on }">
        <v-btn small rounded text class="my-3" color="grey darken-2" v-on="on">
          <v-icon left>group_work</v-icon>
          <span>Study Groups</span>
        </v-btn>
      </template>
      <v-card color="grey lighten-3">
        <v-container>
          <v-layout row wrap pa-3 justify-space-around>
            <v-flex xs12 md3 pa-1>
              <v-text-field name="name" required v-model = "group_name" label="Group Name"></v-text-field>
            </v-flex>
            <v-flex xs12 md7 pa-1>
              <v-text-field required name="desc" v-model = "group_purpose" label="Group Description"></v-text-field>
            </v-flex>
             <v-flex xs12 md2 px-2 pt-7>
                  <v-btn small @click="createStudyGroup()" rounded outlined color="primary">Create Group</v-btn>
              </v-flex>
          </v-layout>
          <v-layout row wrap justify-center>
                 <h5 class="title"> Avaialble Groups </h5>
          </v-layout>
          <v-layout row wrap pa-3 justify-center v-for="group in groups" :key="group.id">
                    <v-flex xs12 md3 px-1>
                        <div class="caption grey--text">Name</div>
                        <div>{{ group.group_name }}</div>
                    </v-flex>
                    <v-flex xs12 md5>
                        <div class="caption grey--text">Purpose</div>
                        <div>{{ group.purpose }}</div>
                    </v-flex>
                    <v-flex xs12 md2 px-1>
                        <div class="caption grey--text">ID</div>
                        <div>{{ group.group_id }}</div>
                    </v-flex>
                    <v-flex xs12 md2 px-2 py-3>
                        <v-btn small rounded outlined color="primary">Join Group</v-btn>
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
    groupName: String
  },
  data() {
    return {
      dialog: false,
      group_name: '',
      group_purpose: '',
      //right now dummy scores are used later on we can fetch this from the API
      groups: [

        // { name: "CS 101 Midterm Preperation", purpose: "Just to prepare for the midterms" , id:1011},
        // { name: "CS 224 Project Help Group", purpose: "Helping section 2 with projects" , id: 2241},
        // { name: "CS 342 Quiz Preperation", purpose: "Revision of chapters 2,3,4 for the quiz",  id:3421},

      ]
    };
  },

  methods: {

    createStudyGroup: async function() {
      var group_id = Math.ceil(Math.random() * 100000000);
      console.log("creating group for: "+ this.$route.params.id.toString(10)+ " with id: " + group_id, " name:" +  this.group_name + "purpose " + this.group_purpose);
      let data = { group_id: group_id, group_name: this.group_name, purpose: this.group_purpose };

      const settings = {
        method: "post",
        headers: {
          "content-Type": "application/json"
        },
        body: JSON.stringify(data)
      };
      //const recievedJson = await res.json;
       var url = 'http://localhost:8079/student/' + this.$route.params.id.toString(10) + '/study/create'
      const res = await fetch(url, settings)
        .then(response => {response.text;  console.log(response); })
        .then(async function(text){
          return text;
        })
        .catch(e => {
          return e;
        });

      console.log(res);

    },
    //A really boring group
    fetchStudyGroups: async function (){

        const settings = {
            method: "get",
            headers: {
                "content-Type": "application/json"
            },
        };

        var url = 'http://localhost:8079/student/' + this.$route.params.id.toString(10) + '/study_group/'

        const res = await fetch(url, settings)
            .then(response => response.json())
            .then(async function(text){
                return text;
            })
            .catch(e => {
                return e;
            });

        console.log(res.rows)
        this.groups = res.rows;
    },
    
  },
  created: function(){
    this.fetchStudyGroups();
  }

};
</script>