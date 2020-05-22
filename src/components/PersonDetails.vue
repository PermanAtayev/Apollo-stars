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
            <div class="heading black--text text-end">{{details.name}} {{details.surname}}</div>
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
            <v-text-field v-model="emailInput" :value="details.email" solo rounded append-icon="create"></v-text-field>
          </v-flex>
        </v-layout>
        <v-layout row wrap align-center justify-space-around px-2>
          <v-flex md4>
            <div class="heading black--text">Password</div>
          </v-flex>
          <v-flex md4>
            <v-text-field v-model="passwordInput" :value="details.password" type="password" solo rounded append-icon="create"></v-text-field>
          </v-flex>
        </v-layout>
        <v-layout row wrap align-center justify-space-around px-2>
          <v-flex md4>
            <div class="heading black--text pb-2">Phone Number</div>
          </v-flex>
          <v-flex md4>
            <v-text-field v-model="phoneNumberInput" :value="details.phone_no" solo rounded append-icon="create"></v-text-field>
          </v-flex>
        </v-layout>
        <v-layout row wrap align-center justify-space-around pa-3>
          <v-flex md4>
            <div class="heading black--text">Enrolled On</div>
          </v-flex>
          <v-flex md4>
            <div class="heading black--text text-end">{{refinedEnrollDate}}</div>
          </v-flex>
        </v-layout>
        <v-layout row wrap align-center justify-space-around pa-3>
          <v-flex md4>
            <div class="heading black--text">Tution Fee</div>
          </v-flex>
          <v-flex md4>
            <div class="heading black--text text-end">{{details.tuition_fee}}</div>
          </v-flex>
        </v-layout>
      </v-card>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn rounded large outlined @click="updateDetails()" color="success">UPDATE DETAILS</v-btn>
        <v-spacer></v-spacer>
      </v-card-actions>
    </v-container>
</template>

<script>
export default {
  data(){
    return{
      emailInput: this.details.email,
      passwordInput: this.details.password,
      phoneNumberInput: this.details.phone_no,

      
    };
  },
  props: {
    details: Object
  },

  computed: {

    refinedEnrollDate: function(){

      var newDate = this.details.date_enrolled.substr(0,10);
      var outDate = '';
      outDate += newDate.substr(8,10) + '/';
      outDate += newDate.substr(5,2) + '/';
      outDate += newDate.substr(0,4);
      return outDate;
    },

    initials: function() {
      return (this.details.name + this.details.surname)
        .split(" ")
        .map(n => n[0])
        .join(" "); //Just shows the initials of a Name
    },
    // totalPhoneNumbers: function(){
    //   return this.details.phone.length;
    // },
  },

  methods: {
    updateDetails: async function(){
      let data = { email: this.emailInput, password: this.passwordInput, phone_no: this.phoneNumberInput};
      console.log("Updating details: ");
      const settings = {
        method: "post",
        headers: {
          "content-Type": "application/json"
        },
        body: JSON.stringify(data)
      };
      //const recievedJson = await res.json;
       var url = 'http://localhost:8079/student/' + this.$route.params.id.toString(10) + '/details/update'
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
    
  }
};
</script>