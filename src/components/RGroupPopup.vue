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
              <v-text-field label="Research Topic" v-model="researchTopicInput"></v-text-field>
            </v-flex>
             <v-flex xs12 md2 pt-7>
                  <v-btn small rounded outlined color="primary" @click="createResearchGroup()">Create Group</v-btn>
              </v-flex>
          </v-layout>
          <v-layout row wrap justify-center>
                 <h5 class="title"> Avaialble Groups </h5>
          </v-layout>
          <v-layout row wrap pa-3 justify-center v-for="group in groups" :key="group.research_topic">
                    <v-flex xs12 md8 px-1>
                        <div class="caption grey--text">Research Topic</div>
                        <div>{{ group.research_topic }}</div>
                    </v-flex>
<!--                    <v-flex xs12 md2 px-1>-->
<!--                        <div class="caption grey&#45;&#45;text">ID</div>-->
<!--                        <div>{{ group.id }}</div>-->
<!--                    </v-flex>-->
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
        researchTopicInput: "",
      dialog: false,
      //right now dummy groups are used
      groups: [
        { topic: "Genetic Research on GATAKA", id:1011},
        { topic: "Corona is bad, how will we fix it" , id: 2241},
        { topic: "Making masks affordable",  id:3421},

      ]
    };
  },
    methods:{
        fetchAllResearchGroups: async function (){
            let settings = {
                method: "get",
                headers: {
                    "content-Type": "application/json"
                }
            };

            let url =
                "http://localhost:8079/instructor/" +
                this.myId.toString(10) +
                "/research_group/display";

            let res = await fetch(url, settings)
                .then(response => response.json())
                .then(async function(text) {
                    return text;
                })
                .catch(e => {
                    return e;
                });

            console.log(res.rows)
            this.groups = res.rows
        },
        createResearchGroup: async function(){
            let group_id = Math.ceil(Math.random() * 100000000);
            let research_topic = this.researchTopicInput
            this.researchTopicInput = ""
            let data = {group_id, research_topic}

            let settings = {
                method: "post",
                headers: {
                    "content-Type": "application/json"
                },
                body: JSON.stringify(data)
            };


            let url =
                "http://localhost:8079/instructor/" +
                this.myId.toString(10) +
                "/research/create";

            let res = await fetch(url, settings)
                .then(response => response.json())
                .then(async function(text) {
                    return text;
                })
                .catch(e => {
                    return e;
                });

            this.groups.push({research_topic})
            console.log(res)
        }
    },

    created(){
        this.myId = this.$route.params.id;
        this.fetchAllResearchGroups();
    }
};
</script>