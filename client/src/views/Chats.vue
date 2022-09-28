<template>
<v-container fluid>
    <v-row no-gutters>
        <v-col cols="12" sm="3" md="3" lg="3" class="px-1">
            <v-card id="contacts-panel">
                <v-list dense>
                    <v-subheader>Contacts</v-subheader>
                    <v-list-item-group v-model="selected" color="primary" @change="Conversation()">
                        <v-list-item v-for="(user, i) in users" :key="i">
                            <v-avatar size="35">
                                <v-img :src="`/img/${user.GenderName.toString().toLowerCase()}.png`"></v-img>
                            </v-avatar>
                            <v-list-item-content class="ml-3">
                                <v-list-item-title class="text-bold" v-text="FullName(user)"></v-list-item-title>
                            </v-list-item-content>
                            <v-list-item-icon>
                                <v-icon x-small :color="user.Online ? 'green lighten-2' : ''">mdi-checkbox-blank-circle</v-icon>
                            </v-list-item-icon>
                        </v-list-item>
                    </v-list-item-group>
                </v-list>
            </v-card>
        </v-col>
        <v-col cols="12" sm="9" md="9" lg="9" class="px-1">
            <v-card id="chat-panel" class="" v-if="selectedUser">
                <v-toolbar dense>
                    <v-row no-gutters>
                        <span> {{FullName(selectedUser)}}'s Conversation</span>
                        <v-spacer></v-spacer>
                        <v-menu offset-y dense>
                            <template v-slot:activator="{ on, attrs }">
                                <v-btn small icon :color="$themeColor" dark v-bind="attrs" v-on="on">
                                    <v-icon>mdi-dots-vertical</v-icon>
                                </v-btn>
                            </template>
                            <v-list>
                                <v-list-item v-for="(item, index) in items" :key="index" link @click="DeleteConversation()">
                                    <v-list-item-title>{{ item.title }}</v-list-item-title>
                                </v-list-item>
                            </v-list>
                        </v-menu>
                    </v-row>
                </v-toolbar>
                <v-card-text class="bg-conversation scroll" id="scrolldown">
                    <ul class="messages clearfix">
                        <li :class="FormatMessages(msg)" v-for="(msg,index) in messages" :key="index">
                            <template v-if="msg.Sender == userInfo.UserID">
                                <v-row no-gutters>
                                    <v-spacer></v-spacer>
                                    <span class="mt-2 mr-1">{{msg.Message}}</span>
                                    <v-avatar size="35">
                                        <v-img :src="`/img/${userInfo.GenderName}.png`"></v-img>
                                    </v-avatar>
                                </v-row>
                            </template>
                            <template v-else>
                                <v-avatar size="35">
                                    <v-img :src="`/img/${users[selected].GenderName}.png`"></v-img>
                                </v-avatar>
                                {{msg.Message}}
                                <br>
                            </template>
                            <v-row no-gutters>
                                <v-spacer v-show="msg.Sender == userInfo.UserID"></v-spacer>
                                <span style="font-size: 8px;color:grey;">{{ConvertDate(msg.CreatedDate)}}</span>
                                <v-spacer v-show="msg.Sender != userInfo.UserID"></v-spacer>
                            </v-row>
                        </li>
                    </ul>
                </v-card-text>
                <v-card-actions>
                    <v-row no-gutters>
                        <v-text-field dense hide-details outlined rounded v-model="msg" @keyup.enter="SendMsg(msg)"></v-text-field>
                        <v-btn icon large color="primary" @click="SendMsg(msg)">
                            <v-icon>mdi-send</v-icon>
                        </v-btn>
                    </v-row>
                </v-card-actions>
            </v-card>
        </v-col>
    </v-row>
</v-container>
</template>

<script>
export default {
    data() {
        return {
            msg: null,
            selected: null,
            users: [],
            online: [],
            sockets: [],
            messages: [],
            items:[
                {title: 'Delete Conversation'}
            ]
        }
    },
    computed: {
        selectedUser() {
            return this.filteredUsers[this.selected]
        },
        url() {
            return `${this.$api}/chats`
        },
        userInfo() {
            return this.$store.state.userInfoLiveChat
        },
        filteredUsers() {
            return this.users.filter(rec => {
                return (!this.userInfo.UserID ? rec : rec.UserID != this.userInfo.UserID)
            })
        }
    },
    created() {
        this.ConvertDate()
        this.Initialize()

        this.$socket.on('online', (data) => {
            this.SetOnline(data)
        });

        this.$socket.on('offline', (socket) => {
            let index = this.users.findIndex(rec => rec.Socket == socket)
            this.users[index].Socket = null
            this.users[index].Online = 0
        });
        this.$socket.on('privateMsg', ({ msg, from, data }) => {
            let index = this.users.findIndex(rec => rec.Socket == from)
            if (parseInt(this.selected) >= 0 && this.userInfo.UserID == data.Reciever && data.Sender == this.users[this.selected].UserID) {
                this.messages.push(data)
                this.ScrollDown()
            } else {                
                this.$bus.$emit('Notification', {
                    msg,
                    from: this.users[index].FirstName
                })
            }
        });
    },
    methods: {
        ConvertDate(val){
            var date = new Date(val);
            let converted = date.getDate()+ "/"+(date.getMonth()+1)+"/"+date.getFullYear()+" "+date.getHours()+":"+date.getMinutes()
            return converted

        },
        DeleteConversation(){
            this.$axios.delete(`${this.url}/${this.userInfo.UserID}/${this.users[this.selected].UserID}`)
            .then(()=>{
                this.messages = []
            })
        },
        ScrollDown() {
            setTimeout(() => {
                const container = this.$el.querySelector("#scrolldown");
                container.scrollTop = container.scrollHeight;
            }, 100)
        },
        FormatMessages(msg) {
            return this.userInfo.UserID == msg.Sender ? "right from" : "to"
        },
        async Conversation() {
            if (this.selected >= 0 && this.selected !== undefined) {
                await this.$axios.get(`${this.$api}/chats?users=${this.userInfo.UserID},${this.users[this.selected].UserID}`)
                    .then(res => {
                        this.messages = res.data
                        this.ScrollDown()
                    })
            }
        },
        async SendMsg(msg) {
            if (msg) {
                await this.$axios.post(`${this.url}`, {
                        msg: msg,
                        to: this.users[this.selected].UserID,
                        from: this.userInfo.UserID,
                    })
                    .then(res => {
                        if (this.users[this.selected].Socket != null) {
                            this.$socket.emit('privateMsg', {
                                msg: msg,
                                to: this.users[this.selected].Socket,
                                data: res.data[0]
                            })
                        }
                        this.messages.push(res.data[0])
                        this.ScrollDown()
                        this.msg = null
                    })
            }
        },

        SetOnline(data) {
            let keys = Object.keys(data)
            keys.forEach(key => {
                let userID = data[key]
                if (userID != this.userInfo.UserID) {
                    let index = this.users.findIndex(rec => rec.UserID == userID)
                    this.users[index].Online = 1
                    this.users[index].Socket = key
                }
            })
        },
        FullName(user) {
            return `${user.FirstName} ${user.LastName}`
        },
        Initialize() {
            this.$axios.get(`${this.$api}/users/details?userid=${this.userInfo.UserID}`)
                .then(res => {
                    this.users = res.data
                    this.$socket.emit('online', this.userInfo.UserID);
                })
        }
    }
}
</script>

<style>
.to {
    color: black;
    background-color: #ECEFF1;
}

.from {
    color: white;
    background-color: #263238;
}

.scroll {
    overflow-y: scroll
}

li {
    display: block;
    clear: both;
}

.clearfix:after {
    content: ".";
    display: block;
    height: 0;
    clear: both;
    visibility: hidden;
}

.clearfix {
    display: inline-block;
}

* html .clearfix {
    height: 1%;
}

.clearfix {
    display: block;
}

section#chat-box {
    background: #fff;
    padding: 10px;
    margin: 0 auto;
}

ul.messages {
    padding: 10px;
    list-style-type: none;
}

ul.messages li {
    display: block;
    position: relative;
    float: left;
    min-width: 25px;
    border-radius: 15px;
    padding: 8px;
    margin-bottom: 8px;
}

ul.messages li:after,
ul.messages li:before {
    right: 100%;
    top: 50%;
    border: solid transparent;
    content: " ";
    height: 0;
    width: 0;
    position: absolute;
    pointer-events: none;
}

ul.messages li:after {
    border-color: rgba(166, 172, 186, 0);
    margin-top: -16px;
}

ul.messages li:before {
    border-color: rgba(0, 0, 0, 0);
    border-right-color: transparent;
    border-width: 26px;
    margin-top: -26px;
}

ul.messages>.right {
    float: right;
}

ul.messages li:nth-child(2n):after,
ul.messages li:nth-child(2n):before {
    border-right-color: transparent;
    left: 90%;
}

ul.messages li:nth-child(2n):before {
    border-left-color: transparent;
}

#contacts-panel,
#chat-panel {
    height: calc(100vh - 75px) !important;
}

.text-bold {
    font-weight: bold;
}

.bg-conversation {
    background-color: rgb(228, 224, 224);
    height: calc(100vh - 180px) !important;
}
</style>
