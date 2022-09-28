<template>
<v-dialog v-model="dialog" transition="dialog-bottom-transition" max-width="400">
    <template>
        <v-card>
            <v-toolbar :color="$themeColor" dark dense>
                <v-toolbar-title>
                    Update Account
                </v-toolbar-title>
                <v-spacer></v-spacer>
                <v-btn icon small color="red lighten-2" @click="$emit('close')">
                    <v-icon>mdi-close</v-icon>
                </v-btn>
            </v-toolbar>
            <v-card-text>
                <v-container fluid>
                    <v-text-field class="my-2" label="First Name" outlined dense hide-details :color="$themeColor"  v-model="updateObj.FirstName"></v-text-field>
                    <v-text-field class="my-2" label="Middle Name" outlined dense hide-details :color="$themeColor"  v-model="updateObj.MiddleName"></v-text-field>
                    <v-text-field class="my-2" label="Last Name" outlined dense hide-details :color="$themeColor"  v-model="updateObj.LastName"></v-text-field>
                    <v-select class="my-2" label="Gender" outlined dense hide-details :color="$themeColor" :item-color="$themeColor" :items="genders" item-text="GenderName" item-value="GenderID"  v-model="updateObj.Gender"></v-select>
                    <v-divider></v-divider>
                    <v-text-field class="my-2" label="Username" outlined dense :color="$themeColor" :error="error" :error-messages="errorMsg" v-model="updateObj.Username"></v-text-field>
                    <v-text-field class="my-2" label="Password" outlined dense :color="$themeColor" type="password"  v-model="updateObj.Password"></v-text-field>
                    <v-btn dense block color="green lighten-2" :disabled="checkFields" @click="Update(updateObj)">Save</v-btn>
                </v-container>
            </v-card-text>
        </v-card>
    </template>
</v-dialog>
</template>

<script>
export default {
    props: ['dialog'],
    computed:{
        checkFields(){
            return (!this.updateObj.FirstName || !this.updateObj.FirstName || !this.updateObj.MiddleName || !this.updateObj.LastName || !this.updateObj.Gender || !this.updateObj.Password || !this.updateObj.Username) 
        }
    },
    watch:{
        dialog(){
            this.updateObj = this.$store.state.userInfoLiveChat 
        }
    },
    data() {
        return {
            updateObj: {},
            error: false,
            errorMsg:null,
            genders: [
                {
                    GenderID: 1,
                    GenderName: 'Male'
                },
                {
                    GenderID: 2,
                    GenderName: 'Female'
                },
            ]
        }
    },
    methods:{
        Update(updateObj){  
            let obj = JSON.parse(JSON.stringify(updateObj))          
            this.$set(obj,'UpdatedDate',this.$now)
            this.$set(obj, 'Password' , this.$md5(updateObj.Password))
            this.$axios.patch(`${this.$api}/users`,obj)
            .then(()=>{
                this.updateObj = {}
                delete obj.Password
                this.$toast.success('Updated!', 'Success')                
                this.$store.commit('SET_USERDATA', obj)
                this.$emit('close',true)
            })
        }
    }

}
</script>

<style>

</style>
