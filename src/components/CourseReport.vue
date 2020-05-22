<template>
  <v-container class="my-0">
    <v-card flat>
       <v-text-field v-model="searchKey" label="Search Key"></v-text-field>
        <v-btn small rounded @click="fetchRange()" outlined class="my-3" color="success">Search</v-btn>
      <v-layout row wrap v-for="course in ranges" :key="course.name" class="py-2">
        <v-flex xs12 md6>
          <div class="caption grey--text pl-2">Course Name</div>
          <div> <v-chip color="primary">{{ course.name }}</v-chip>  </div>
        </v-flex>
        <v-flex xs6 sm3 md6>
          <div class="caption grey--text pl-2">Credits</div>
          <div><v-chip color="primary">{{ course.credits }}</v-chip></div>
        </v-flex>
        <!-- <v-flex xs6 sm3 md3>
          <div class="caption grey--text pl-2">Date Joined</div>
          <div><v-chip color="primary">{{ instructor.date_joined }}</v-chip></div>
        </v-flex>
        <v-flex xs6 sm3 md3>
          <div class="caption grey--text pl-2">Salary</div>
          <div><v-chip color="primary">{{ instructor.salary }}$</v-chip></div>
        </v-flex> -->
      </v-layout>
    </v-card>
  </v-container>
</template>

<script>

export default {
  
data() {
    return {
      ranges: [],
      searchKey: "",
    }

    },

  props: {
    rankings: Array
  },


  components: {  },

  methods: {

    fetchRange: async function() {
      const settings = {
        method: "get",
        headers: {
          "content-Type": "application/json"
        }
      };

      var url =
        "http://localhost:8079/student/search/course/" + this.searchKey ;
      const res = await fetch(url, settings)
        .then(response => response.json())
        .then(async function(text) {
          return text;
        })
        .catch(e => {
          return e;
        });

      console.log(res.rows);
      this.ranges = res.rows;
    },


  },

  created: function(){
    this.fetchRange();
  }
};
</script>