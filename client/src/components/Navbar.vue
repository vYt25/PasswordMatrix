<template>
<div>
    <v-navigation-drawer app clipped v-model="nav" @click="$emit('ToggleNavbar')">
        <v-list-item>
            <v-list-item-content>
                <v-list-item-title class="title text-center">
                    <v-avatar size="150">
                        <img :src="`/img/${userInfo.gender_name}.png`" :alt="userInfo.gender_name" onerror="this.onerror=null;this.src='img/nopic.png';">
                    </v-avatar>
                </v-list-item-title>
                <v-list-item-subtitle class="my-3 text-center">
                    <span style="font-weight:bold;">{{userInfo.first_name.toUpperCase()}} {{userInfo.last_name.toUpperCase()}}</span>
                </v-list-item-subtitle>
            </v-list-item-content>
        </v-list-item>
        <v-divider></v-divider>
        <v-list dense nav>
            <template v-for="item in filteredItems">
                <v-list-item v-if="!item.sub" :key="item.title" link :to="item.to" color="#208895">
                    <template>
                        <v-list-item-icon>
                            <v-icon>{{ item.icon }}</v-icon>
                        </v-list-item-icon>

                        <v-list-item-content>
                            <v-list-item-title>{{ item.title }}</v-list-item-title>
                        </v-list-item-content>
                    </template>

                </v-list-item>
                <v-list-group v-else :key="item.title" v-model="item.active" :prepend-icon="item.action" no-action color="#208895">
                    <template v-slot:activator>
                        <v-list-item-icon>
                            <v-icon>{{ item.icon }}</v-icon>
                        </v-list-item-icon>
                        <v-list-item-content>
                            <v-list-item-title v-text="item.title"></v-list-item-title>
                        </v-list-item-content>
                    </template>

                    <v-list-item v-for="Sub in item.sub" :key="Sub.title" link :to="Sub.to">
                        <v-list-item-icon>
                            <v-icon>{{ Sub.icon }}</v-icon>
                        </v-list-item-icon>
                        <v-list-item-content>
                            <v-list-item-title v-text="Sub.name"></v-list-item-title>
                        </v-list-item-content>
                    </v-list-item>
                </v-list-group>
            </template>
        </v-list>
        <template v-slot:append>
            <div class="pa-2">
                <v-btn dark block color="#208895" @click="logout()"> Logout </v-btn>
            </div>
        </template>
    </v-navigation-drawer>
    <UpdateAccount :dialog="accountDialog" :obj.sync="updateObj" @close="accountDialog = false"/>
</div>
</template>

<script>
import UpdateAccount from './UpdateAccountDialog.vue'

export default {
    components: {UpdateAccount},
    props: ['nav'],
    data() {
        return {
            accountDialog: false,
            updateObj: {},
            test: [],
            clickIncrement: 0,
            right: null,
            items: [
                {
                    title: 'Home',
                    to: '/Home',
                    path: '/Home',
                    name: 'Home',
                    icon: 'mdi-home',
                },
                {
                    title: 'SID Settings',
                    to: '/sidSettings',
                    path: '/sidSettings',
                    name: 'sidSettings',
                    icon: 'mdi-cog',
                },
                // {
                //     title: 'Settings',
                //     permission: [1],
                //     icon: 'mdi-cog',
                //     sub: [{
                //         title: 'Users',
                //         to: '/Settings/Users',
                //         path: '/Settings/Users',
                //         name: 'Users',
                //         icon: 'mdi-account',
                //     }]
                // },
            ],
        }
    },
    computed: {
        userInfo() {
            return this.$store.state.userInfoPwc
        },
        filteredItems(){
            return this.items.filter(rec=>{return !rec.permission ? rec :  rec.permission.includes(this.$store.state.userInfoPwc.is_admin)})
        }
    },
    created() {

    },
    methods: {
        Edit(){
            this.accountDialog = true
            this.updateObj = this.userInfoPwc
        },
        checkPrependZero() {
            return `http://adminsql1/photos/037758.jpg`
        },
        logout() {
            this.$socket.emit('offline',this.userInfo.UserID);
            this.$store.commit('SET_USERDATA', {})
            this.$router.push('/')
        },
    }
}
</script>

<style scoped>
.v-list-item__icon {
    margin-right: 10px !important;
}

.v-list>a,
a {
    text-decoration: none;
}

.v-application--is-ltr .v-list--dense.v-list--nav .v-list-group--no-action>.v-list-group__items>.v-list-item {
    padding-left: 30px;
}
</style>
