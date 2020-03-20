<template>
  <v-app>
    <v-card width="400" class="mx-auto mt-5">
      <v-card-title class="pb-5 justify-center">
        <h1>Login</h1>
<!--        <h3>Continue to stars 2.0</h3>-->
      </v-card-title>
      <v-card-text>
        <v-form>
          <v-text-field
                  label="Bilkent ID"
                  prepend-icon="mdi-account-circle"
          />
          <v-text-field
                  :type="showPassword ? 'text' : 'password'"
                  label="Password"
                  prepend-icon="mdi-lock"
                  :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                  @click:append="showPassword = !showPassword"
          />
        </v-form>
      </v-card-text>
      <v-divider></v-divider>
      <v-card-actions>
        <v-btn text="true" color="info">Register</v-btn>
        <v-spacer></v-spacer>
        <v-btn color="#1976D2">Login</v-btn>
      </v-card-actions>
    </v-card>
  </v-app>
</template>

<script>
  export default {
    name: 'App',
    data () {
      return {
        showPassword: false
      }
    }
  }
</script>