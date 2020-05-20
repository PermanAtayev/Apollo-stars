<template>
    <v-container>
      <v-card flat>
        <v-layout column align-center pa-3>
          <v-avatar size="80" color="primary">
            <span class="white--text">{{initials}}</span>
          </v-avatar>
        </v-layout>

        <v-layout row wrap align-center justify-space-around pa-3>
          <v-flex md4>
            <div class="heading black--text">Name</div>
          </v-flex>
          <v-flex md4>
            <div class="heading black--text text-end">{{details.name}}</div>
          </v-flex>
        </v-layout>
        <v-layout row wrap align-center justify-space-around pa-3>
          <v-flex md4>
            <div class="heading black--text">ID</div>
          </v-flex>
          <v-flex md4>
            <div class="heading black--text text-end">{{details.id}}</div>
          </v-flex>
        </v-layout>
        <v-layout row wrap align-center justify-space-around pa-3>
          <v-flex md4>
            <div class="heading black--text">GPA</div>
          </v-flex>
          <v-flex md4>
            <div class="heading black--text text-end">{{details.gpa}}</div>
          </v-flex>
        </v-layout>
        <v-layout row wrap align-center justify-space-around px-2>
          <v-flex md4>
            <div class="heading black--text">Email</div>
          </v-flex>
          <v-flex md4>
            <v-text-field :value="details.email" solo rounded append-icon="create"></v-text-field>
          </v-flex>
        </v-layout>
        <v-layout row wrap align-center justify-space-around px-2>
          <v-flex md4>
            <div class="heading black--text">Passowrd</div>
          </v-flex>
          <v-flex md4>
            <v-text-field v-on:input="updateDetails()" :value="details.password" type="password" solo rounded append-icon="create"></v-text-field>
          </v-flex>
        </v-layout>
        <v-layout row wrap align-center justify-space-around px-2>
          <v-flex md4>
            <div class="heading black--text">Phone Number(s)</div>
          </v-flex>
          <v-flex md4>
            <v-text-field v-for="phone in details.phone" :key="phone" :value="phone" solo rounded append-icon="create"></v-text-field>
          </v-flex>
        </v-layout>
        <v-layout row wrap align-center justify-space-around pa-3>
          <v-flex md4>
            <div class="heading black--text">Year</div>
          </v-flex>
          <v-flex md4>
            <div class="heading black--text text-end">{{details.year}}</div>
          </v-flex>
        </v-layout>
        <v-layout row wrap align-center justify-space-around pa-3>
          <v-flex md4>
            <div class="heading black--text">Dorm</div>
          </v-flex>
          <v-flex md4>
            <div class="heading black--text text-end">{{details.dorm}}</div>
          </v-flex>
        </v-layout>
      </v-card>
    </v-container>
</template>

<script>
export default {
  props: {
    details: Object
  },

  computed: {
    initials: function() {
      return this.details.name
        .split(" ")
        .map(n => n[0])
        .join(" "); //Just shows the initials of a Name
    },
    totalPhoneNumbers: function(){
      return this.details.phone.length;
    },
  },

  methods: {
    updateDetails: function(){
      console.log("Number updated: ");

    }
    
  }
};
</script>