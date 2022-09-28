<template>
  <v-container>
    <!--
          <v-btn small elevation="2">ADD<v-icon color="dark" @click="toAddEntry()">mdi-plus</v-icon>
          </v-btn>
      <v-card>
        <v-card-title>
          <v-spacer></v-spacer>
            <v-text-field
              v-model="search"
              append-icon="mdi-magnify"
              label="Search"
              single-line
              hide-details
            ></v-text-field>
        </v-card-title>
            <v-data-table
             class="elevation-1"
              :items="pwc"
              :headers="headers"
              :search="search"
            ></v-data-table>

            <template v-slot:activator="{ on, attrs }">
            <v-btn
              color="primary"
              dark
              class="mb-2"
              v-bind="attrs"
              v-on="on"
            >
              New Item
            </v-btn>
          </template>
        </v-card>
        -->
       <template>
  <v-data-table
  :search="search"
    :headers="headers"
    :items="pwc"
    class="elevation-1"
  >
    <template v-slot:top>
      <v-toolbar
        flat
      >
        <v-toolbar-title>PWC</v-toolbar-title>
        <v-divider
          class="mx-4"
          inset
          vertical
        ></v-divider>
        <v-spacer></v-spacer>
        <v-text-field   v-model="search"  label="Search" class="ma-4" outlined rounded dense append-icon="mdi-magnify"> 
          
        </v-text-field>
        <v-dialog
          v-model="dialog"
          max-width="500px"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              dark
              color="#208895"
              class="mb-2"
              v-bind="attrs"
              v-on="on"
            >
              New Item
            </v-btn>
          </template>
          <v-card>
            <v-card-title >
              <span class="text-h5">{{ formTitle }}</span>
            </v-card-title>

            <v-card-text>
              <v-container>
                <v-row>
                  <v-col
                    cols="12"
                    sm="6"
                    md="4"
                  >
                  <v-select
                    v-if="formTitle === 'Update Password'"
                    readonly
                    v-model="editedItem.sid_id"
                    :items="sids"
                    item-text="sid"
                    item-value="sid_id"
                    label="SID"
                    dense
                    outlined
                  ></v-select>
                  <v-select
                    v-else
                    dense
                    outlined  
                    v-model="editedItem.sid_id"
                    :items="sids"
                    item-text="sid"
                    item-value="sid_id"
                    label="SID"
                  ></v-select>
                  </v-col>

                  <v-col
                    cols="12"
                    sm="6"
                    md="4"
                  >
                  <v-select
                    dense
                    outlined  
                    v-if="formTitle === 'Update Password'"
                    readonly
                    v-model="editedItem.client_id"
                    :items="clients"
                    item-text="client"
                    item-value="client_id"
                    label="CLIENT"
                  ></v-select>
                  <v-select
                    v-else
                    dense
                    outlined  
                    v-model="editedItem.client_id"
                    :items="clients"
                    item-text="client"
                    item-value="client_id"
                    label="CLIENT"
                  ></v-select>
                  </v-col>

                  <v-col
                    cols="12"
                    sm="6"
                    md="4"
                  >
                    <v-text-field
                      dense
                      outlined  
                      v-if="formTitle === 'Update Password'"
                      readonly
                      v-model="editedItem.suid"
                      label="SUID"
                    ></v-text-field>
                    <v-text-field
                      v-else
                      dense
                      outlined  
                      v-model="editedItem.suid"
                      label="SUID"
                    ></v-text-field>
                  </v-col>
                  <v-col
                    cols="12"
                    sm="6"
                    md="4"
                  >
                  <v-text-field
                      dense
                      outlined  
                      v-model="editedItem.password"
                      label="PASSWORD"
                    ></v-text-field>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                color="blue darken-1"
                text
                @click="close"
              >
                Cancel
              </v-btn>
              <v-btn
                color="blue darken-1"
                text
                @click="addOrEditEntry(editedItem)"
              >
                Save
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <v-dialog v-model="dialogDelete" max-width="500px">
          <v-card>
            <v-card-title class="text-h5">Are you sure you want to delete this item?</v-card-title>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="closeDelete">Cancel</v-btn>
              <v-btn color="blue darken-1" text @click="deleteItemConfirm(editedItem)">OK</v-btn>
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-dialog>
<!-------------------------- is existing -------------------------------------->
        <v-dialog v-model="existingDialog" max-width="500px">
          <v-card>
            <v-card-title class="text-h5">Already Existing</v-card-title>
            <v-card-actions>
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-dialog>

      </v-toolbar>
    </template>
    <template v-slot:[`item.actions`]="{ item }">
      <v-icon
        small
        class="mr-2"
        @click="editItem(item)"
        v-show="item.is_editable"
      >
        mdi-pencil
      </v-icon>
      <v-icon
        small
        @click="deleteItem(item)"
      >
        mdi-delete
      </v-icon>
    </template>
    <template v-slot:no-data>
      <v-btn
        color="primary"
      >
        Reset
      </v-btn>
    </template>
  </v-data-table>
</template> 
  </v-container>
   
  <!------------------------------------------------------------------------------------------------------------------------------->
  <!------------------------------------------------------D I A L O G S------------------------------------------------------------>
  <!------------------------------------------------------------------------------------------------------------------------------->


</template>

<script>
  export default {
    name: 'HelloWorld',
    created(){
      this.onLoad()

      this.$axios.get(`${this.$api}/test/sid`)
      .then((res)=>{
        this.sids = res.data
      })

      this.$axios.get(`${this.$api}/test/client`)
      .then((res)=>{
        this.clients = res.data
      })
    },
    data: () => ({
      editedIndex: -1,
      sids:[],
      clients:[],
      editedItem: {
        sid_id: '',
        client_id: '',
        suid: '',
        password: ''
      },
      dialog: false,
      dialogDelete: false,
      existingDialog:false,
      search:'',
      pwc:[],
      users:[],
      headers:[
          { text: 'SID', value: 'sap_sid',align: 'start'},
          { text: 'SUID', value: 'suid',align: 'start' },
          { text: 'Unique ID', value: 'uid',align: 'start'},
          { text: 'New Password', value: 'password',align: 'start'},
          { text: 'Actions', value: 'actions',align: 'start'},
        ],
    }),
     computed: {
      formTitle () {
        return this.editedIndex === -1 ? 'New Item' : 'Update Password'
      },
    },

    watch: {
      dialog (val) {
        val || this.close()
      },
      dialogDelete (val) {
        val || this.closeDelete()
      },
    },
    methods:{
      onLoad(){
        this.$axios.get(`${this.$api}/test`)
        .then(res=>{
        this.pwc = res.data
        // console.log(res.data,"test")
      })
      },
      addOrEditEntry(item){
        this.editedIndex === -1 ? this.checkIfExists(item) : this.toUpdateEntry(item)
      },
      checkIfExists(item){
        this.$axios.get(`${this.$api}/test/${item.sid_id}/${item.client_id}/${item.suid}`)
        .then(({data})=>{
          if(data.length === 0){
            this.toAddEntry(item)
          }else{
            this.existingDialog = true
            this.dialog = false
          }
        })
      },
      toAddEntry(item){

        this.$axios.post(`${this.$api}/test`,item)
        .then(()=>{
          this.close()
          this.onLoad()
        })          
      },
      toUpdateEntry(item){
        this.$axios.patch(`${this.$api}/test`,item)
        .then(()=>{
          this.close()
          this.onLoad()
        })          
      },
      editItem (item) {
        this.editedIndex = this.pwc.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialog = true
      },

      deleteItem (item) {
        this.editedIndex = this.pwc.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialogDelete = true
      },

      deleteItemConfirm (editedItem) {
        this.$axios.delete(`${this.$api}/test/${editedItem.id}`)
        .then(()=>{
          this.onLoad()
        })         
        this.closeDelete()

      },

      close () {
        this.dialog = false
        this.$nextTick(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        })
      },

      closeDelete () {
        this.dialogDelete = false
        this.$nextTick(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        })
      },

      save () {
        if (this.editedIndex > -1) {
          Object.assign(this.pwc[this.editedIndex], this.editedItem)
        } else {
          this.pwc.push(this.editedItem)
        }
        this.close()
      },
    }

     
    
  }
</script>
