 <template>
  <v-app class="primary">
    <v-content>
      <v-container class="fill-height" fluid>
        <v-row align="center" justify="center">
          <v-col cols="12" sm="8" md="8">
            <v-card class="elevation-12">
              <v-window v-model="step">
                <v-window-item :value="1">
                  <v-row>
                    <v-col cols="12" md="8">
                      <v-card-text class="mt12">
                        <h2
                          class="text-center display-1 teal--text text--accent-3"
                        >Welcome back to ApolloStars!</h2>
                        <h4 class="text-center mlt-4">Please Sign In with your credentials</h4>
                        <v-form>
                          <v-text-field
                            label="id"
                            name="id"
                            v-model="id"
                            prepend-icon="email"
                            type="text"
                            color="teal accent-3"
                          ></v-text-field>
                          <v-text-field
                            label="Password"
                            name="Passowrd"
                            v-model="password"
                            prepend-icon="lock"
                            type="password"
                            color="teal accent-3"
                          ></v-text-field>
                        </v-form>
                      </v-card-text>
                      <v-layout justify-center>
                        <v-card-actions>
                          <v-radio-group row v-model="role" class="justify-center">
                            <v-radio label="Teacher" color="teal"></v-radio>
                            <v-radio label="Student" color="teal"></v-radio>
                            <v-radio label="Teaching Assistant" color="teal"></v-radio>
                          </v-radio-group>
                        </v-card-actions>
                      </v-layout>

                      <div class="text-center mt-3">
                        <v-btn class="mt-3" rounded color="teal accent-3" dark large @click="login()">Sign In</v-btn>
                      </div>
                    </v-col>
                    <v-col cols="12" md="4" class="teal accent-3">
                      <v-card-text class="white--text mt-12">
                        <h1 class="text-center display-1">Not registered?</h1>
                        <h5 class="text-center mt-4">Provide your details, and sign up!</h5>
                      </v-card-text>
                      <div class="text-center">
                        <v-btn rounded outlined dark @click="step++">Sign Up</v-btn>
                        <h5 class="white--text text-center pa-4">View ApolloStars Reports!</h5>
                        <v-btn rounded outlined dark router to="/reports">Reports</v-btn>
                      </div>
                    </v-col>
                  </v-row>
                </v-window-item>
                <v-window-item :value="2">
                  <v-row class="fill-heigh">
                    <v-col cols="12" md="4" class="teal accent-3">
                      <v-card-text class="white--text mt-12">
                        <h1 class="text-center display-1">Already registered?</h1>
                        <h5 class="text-center mt-6">Use your given credentials to log in</h5>
                      </v-card-text>
                      <div class="text-center">
                        <v-btn class="mt-3" rounded outlined dark @click="step--">Sign In</v-btn>
                      </div>
                    </v-col>
                    <v-col cols="12" md="8">
                      <v-card-text class="mt-12">
                        <h1 class="text-center display-2 teal--text text--accent-3">Create Account</h1>
                        <h4 class="text-center mt-4">Enter the following details please</h4>
                        <v-from>
                          <v-text-field
                            label="Full Name"
                            name="Full Name"
                            prepend-icon="person"
                            type="text"
                            color="teal accent-3"
                          ></v-text-field>
                          <v-text-field
                            label="ID"
                            name="ID"
                            
                            prepend-icon="email"
                            type="text"
                            color="teal accent-3"
                          ></v-text-field>
                          <v-text-field
                            label="Password"
                            name="Password"

                            prepend-icon="lock"
                            type="password"
                            color="teal accent-3"
                          ></v-text-field>
                        </v-from>
                        <v-layout justify-center>
                          <v-card-actions>
                            <v-radio-group row v-model="role" class="justify-center">
                              <v-radio label="Teacher"  color="teal"></v-radio>
                              <v-radio label="Student" color="teal"></v-radio>
                              <v-radio label="Teaching Assistant" color="teal"></v-radio>
                            </v-radio-group>
                          </v-card-actions>
                        </v-layout>
                        <div class="text-center mt-3">
                          <v-btn rounded color="teal accent-3" dark large>Sign UP</v-btn>
                        </div>
                      </v-card-text>
                    </v-col>
                  </v-row>
                </v-window-item>
              </v-window>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-content>
  </v-app>
</template>
<script>
export default {
  data: () => ({
    step: 1,
    role: "",
    id: "",
    password: "",

    //baseUrl: "https://intense-river-78098.herokuapp.com/"
    baseUrl: "http://localhost:8079"

  }),
  props: {
    source: String
  },
  methods: {
    login: async function() {
      var userIsValid = true;
      console.log("logging in with id: " + parseInt(this.id), " pass:" +  this.password);
      let data = { id: parseInt(this.id), password: this.password };

      const settings = {
        method: "post",
        headers: {
          "content-Type": "application/json"
        },
        body: JSON.stringify(data)
      };


      //const recievedJson = await res.json;

      const res = await fetch(this.baseUrl+"/login", settings)
        .then(response => response.json())
        .then(async function(text){
          return text;
        })
        .catch(e => {
           userIsValid = false;
          return e;
        });
      console.log(res)
      //take them to the route
      if(userIsValid){
      console.log(this.role)
        let person_id = res.id;

        if(person_id.toString().substr(0,1) == "2" && this.role == '0'){
          this.$router.push( {name: 'Instructor', params:{id: person_id} } )
        }

        else if(person_id.toString().substr(0,1) == "1" && this.role == '1'){
          console.log("IM IN")
          this.$router.push({name: 'Student', params:{id: person_id} })
        }

        else if(person_id.toString().substr(0,1) == "1" && this.role == '2'){
          this.$router.push({name: 'TA', params:{id: person_id} })
        }
        else{
          alert("Please enter valid details");
        }


      }

      //teacher
      //2217034

    }

  }
};


</script>
