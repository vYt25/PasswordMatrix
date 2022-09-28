<template>
<v-container fluid>
    <Banner bannerName="Users" />
    <v-container fluid>
        <v-card>
            <v-simple-table id="users-table" dense fixed-header>
                <thead>
                    <tr>
                        <th>UserID</th>
                        <th>First Name</th>
                        <th>Middle Name</th>
                        <th>Last Name</th>
                        <th>Gender</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(user,index) in users" :key="index" :class="!user.DeletedDate ? '': 'bg-red'">
                        <td>{{$pad(user.UserID)}}</td>
                        <td>{{user.FirstName}}</td>
                        <td>{{user.MiddleName}}</td>
                        <td>{{user.LastName}}</td>
                        <td>{{user.GenderName}}</td>
                        <td>
                            <v-row no-gutters>
                                <v-btn small icon color="grey darken-2" v-show="IsActive(user)" @click="Edit(user)">
                                    <v-icon>mdi-pencil</v-icon>
                                </v-btn>
                                <v-btn small icon color="red lighten-2" v-show="IsActive(user)" @click="Confirmation(user)">
                                    <v-icon>mdi-delete</v-icon>
                                </v-btn>
                                <v-btn small icon color="green lighten-2" v-show="!IsActive(user)" @click="Restore(user)">
                                    <v-icon>
                                        mdi-recycle
                                    </v-icon>
                                </v-btn>
                            </v-row>
                        </td>
                    </tr>
                </tbody>
            </v-simple-table>
        </v-card>
    </v-container>
    <EditUserDialog :editObj="editObj" :editDialog="editDialog" @close="CloseEditDialog($event)" />
    <Confirmation :dialog="confirmDialog" @SoftDelete="SoftDelete($event)" />
</v-container>
</template>

<script>
import Banner from '../components/Banner.vue'
import EditUserDialog from '../components/EditUserDialog.vue'
import Confirmation from '../components/Confirm.vue'
export default {
    components: {
        Banner,
        EditUserDialog,
        Confirmation
    },
    data() {
        return {
            users: [],
            confirmDialog: false,
            editDialog: false,
            editObj: {}
        }
    },
    computed: {
        url() {
            return `${this.$api}/users`
        }
    },
    created() {
        this.Initialize()
    },
    methods: {
        Restore(user){
            this.$axios.put(`${this.url}/${user.UserID}`)
            .then(()=>{
                alert('Restored SuccessFully')
                this.Initialize()
            })
        },
        IsActive(val) {
            return !val.DeletedDate
        },
        Confirmation(user) {
            this.editObj = JSON.parse(JSON.stringify(user))
            this.confirmDialog = true
        },
        SoftDelete(bool) {
            if (bool) {
                this.$axios.delete(`${this.url}/${this.editObj.UserID}`,{DeletedDate: this.$now})
                    .then(() => {
                        alert('Deleted SuccessFully')
                        this.Initialize()
                    })
            }
            this.confirmDialog = false
        },
        CloseEditDialog(success = false) {
            if (success)
                alert('User Successfully Updated')
            this.Initialize()
            this.editDialog = false
        },
        Edit(user) {
            this.editObj = JSON.parse(JSON.stringify(user))
            this.editDialog = true
        },
        Initialize() {
            this.$axios.get(this.url)
                .then(res => {
                    this.users = res.data
                })
        }
    }
}
</script>

<style>
#users-table .v-data-table__wrapper {
    height: calc(100vh - 170px) !important;
}
.bg-red{
    background-color: rgb(250, 218, 218);
}
</style>
