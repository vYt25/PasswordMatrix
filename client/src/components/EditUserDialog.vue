<template>
<v-dialog v-model="editDialog" transition="dialog-bottom-transition" max-width="400">
    <template>
        <v-card>
            <v-toolbar :color="$themeColor" dark dense>
                <v-toolbar-title>
                    Edit User
                </v-toolbar-title>
                <v-spacer></v-spacer>
                <v-btn icon small color="red lighten-2" @click="$emit('close')">
                    <v-icon>mdi-close</v-icon>
                </v-btn>
            </v-toolbar>
            <v-card-text>
                <v-container fluid>
                    <v-text-field class="my-2" label="User ID" outlined dense hide-details :color="$themeColor" disabled :value="$pad(editObj.UserID)"></v-text-field>
                    <v-text-field class="my-2" label="First Name" outlined dense hide-details :color="$themeColor"  v-model="editObj.FirstName"></v-text-field>
                    <v-text-field class="my-2" label="Middle Name" outlined dense hide-details :color="$themeColor"  v-model="editObj.MiddleName"></v-text-field>
                    <v-text-field class="my-2" label="Last Name" outlined dense hide-details :color="$themeColor"  v-model="editObj.LastName"></v-text-field>
                    <v-select class="my-2" label="Gender" outlined dense hide-details :color="$themeColor" :item-color="$themeColor" :items="genders" item-text="GenderName" item-value="GenderID"  v-model="editObj.Gender"></v-select>
                    <v-btn dense block color="green lighten-2" :disabled="checkFields" @click="Update(editObj)">Update</v-btn>
                </v-container>
            </v-card-text>
        </v-card>
    </template>
</v-dialog>
</template>

<script>
export default {
    props: ['editDialog', 'editObj'],
    computed:{
        checkFields(){
            return !this.editObj.FirstName || !this.editObj.FirstName || !this.editObj.MiddleName || !this.editObj.LastName || !this.editObj.Gender 
        }
    },
    data() {
        return {
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
        Update(editObj){            
            this.$set(this.editObj,'UpdatedDate',this.$now)
            this.$axios.patch(`${this.$api}/users`,editObj)
            .then(()=>{
                this.$emit('close',true)
            })
        }
    }

}
</script>

<style>

</style>
