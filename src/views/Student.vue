<template>
    <v-app dark>

        <v-card height="650px">
            <v-navigation-drawer fixed v-model="drawer" app color="teal">

                <v-list dense>

                    <v-list-item
                            v-for="item in items"
                            :key="item.title"
                            link
                    >
                        <v-list-item-content>
                            <v-list-item-title>{{ item.title }}</v-list-item-title>
                        </v-list-item-content>


                    </v-list-item>
                </v-list>

            </v-navigation-drawer>

            <v-app-bar dense color="teal" height="50px" >
                <v-app-bar-nav-icon
                        @click.stop="drawer = !drawer"
                >

                </v-app-bar-nav-icon>

                <v-toolbar-title>Apollo Stars</v-toolbar-title>

                <v-spacer></v-spacer>

                <v-btn text color="black">Log out</v-btn>
            </v-app-bar>

            <v-footer
                    absolute="absolute"
                    class="font-weight-medium"
                    color="teal"
                    padless="padless"
            >
                <v-col
                        class="text-center"
                        cols="12"
                >
                    {{ new Date().getFullYear() }} — <strong>Apollo Stars</strong>
                </v-col>
            </v-footer>


        </v-card>
    </v-app>
</template>

<script>
    export default {
        name: "Student",
        data: function(){
            return {
                drawer: false,
                items: [
                    {title: 'Courses', type: 'Instructor'},
                    {title: 'Teaching Assistants'}
                ],
            }
        },
    }
</script>

<style scoped>

</style>