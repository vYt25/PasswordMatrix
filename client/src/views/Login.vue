<template>
<v-container fluid fill-height>
    <v-layout align-center justify-center>
        <v-card class="mx-auto elevation-20 " style="border-radius: 10px; background-color:white;" width="700px">
            <v-row no-gutters>
                <v-col cols="12" md="6" sm="6" style="background-color:white; border-radius: 10px 0px 0px 10px; border-bottom: 20px solid white; border-top: 20px solid white;">
                    <v-col class="mt-10 ">
                        <v-img src="img/pw.png" alt="Import Process"></v-img>
                    </v-col>

                   
                </v-col>
                <v-col cols="12" md="6" sm="6" class="px-5">
                 <!-- <v-img src="img/pw.png" alt="Import Process"></v-img> -->
                 <!-- <v-img src="img/password.gif" alt="Import Process"></v-img> -->
                    <v-card-title class="mt-8 text-center" style="display:inherit; font-size: 20px; font-weight: bold;">

                        Login
                    </v-card-title>
                    <v-card-text class="text--primary mt-5">
                        <v-text-field outlined dense type="text" label="Username" prepend-icon="mdi-account" :error="error" :error-messages="errorMsg" v-model="user.username" @keyup.enter="login()"></v-text-field>
                        <v-text-field outlined dense type="password" label="Password" prepend-icon="mdi-lock" :error="error" :error-messages="errorMsg" v-model="user.password" @keyup.enter="login()"></v-text-field>
                    </v-card-text>
                   
                    <v-card-actions>
                        <v-row no-gutters>
                            <v-btn raised block :disabled="!user.username || !user.password" @click="login()" color="#81cfcf" :loading="loading">Submit</v-btn>
                        <!-- <v-btn raised block @click="registerDialog = true">Register</v-btn> -->
                        </v-row>
                        
                    </v-card-actions>
                    <v-card-text>
                        Don't have an account?
                        <a style="color:#009688" @click="registerDialog=true" >Register here</a>
                    </v-card-text>
                </v-col>
            </v-row>
        </v-card>
    </v-layout>
    <Register :dialog="registerDialog" @close="registerDialog = false" />
</v-container>
</template>

<script>

import Register from '../components/RegisterDialog.vue'
export default {
    components: {Register},
    data() {
        return {
            registerDialog: false,
            error: false,
            errorMsg: null,
            user: {},
            loading: false
        }
    },
    methods: {
        login() {
            this.loading = true
            let user = {
                ...this.user,
                password: this.$md5(this.user.password)
            }
            this.$axios.post(`${this.$api}/login`, user)
                .then(res => {                    
                    this.loading = false
                    this.error = false
                    this.$store.commit('SET_USERDATA', res.data)
                    this.$router.push('/Home')
                }).catch(({response }) => {
                    if (response) {
                        this.errorMsg = response.data.errorMsg
                        this.error = true
                    }
                    this.loading = false
                })

        }
    }
}
</script>

<style>

</style>
