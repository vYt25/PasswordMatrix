<template>
  <v-container>
    <template>
      <v-tabs color="#009688">
        <v-tab> SID </v-tab>
        <v-tab> Client </v-tab>
        <v-tab-item>
          <v-data-table
            :search="search"
            :headers="sidHeaders"
            :items="sids"
            class="elevation-1"
          >
            <template v-slot:top>
              <v-toolbar flat>
                <v-toolbar-title>List of Systems</v-toolbar-title>
                <v-divider class="mx-4" inset vertical></v-divider>
                <v-spacer></v-spacer>
                <v-text-field
                  v-model="search"
                  label="Search"
                  class="ma-6 mt-10"
                  outlined
                  rounded
                  dense
                  append-icon="mdi-magnify"
                >
                </v-text-field>
                <v-dialog v-model="sidDialog" max-width="500px">
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn
                      color="#208895"
                      dark
                      class="mb-2"
                      v-bind="attrs"
                      v-on="on"
                    >
                      New System
                      <v-icon>mdi-plus</v-icon>
                    </v-btn>
                  </template>
                  <v-card>
                    <v-card-title>
                      <span class="text-h5">{{ formTitle }}</span>
                    </v-card-title>

                    <v-card-text>
                      <v-container>
                        <v-row>
                          <v-col cols="12" sm="6" md="4">
                            <v-text-field
                              v-model="editedItem.sid"
                              label="SID"
                            ></v-text-field>
                          </v-col>
                        </v-row>
                      </v-container>
                    </v-card-text>

                    <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn color="blue darken-1" text @click="close">
                        Cancel
                      </v-btn>
                      <v-btn
                        color="blue darken-1"
                        text
                        @click="addOrEditEntrySid(editedItem)"
                      >
                        Save
                      </v-btn>
                    </v-card-actions>
                  </v-card>
                </v-dialog>
                <v-dialog v-model="dialogDeleteSid" max-width="500px">
                  <v-card>
                    <v-card-title class="text-h5"
                      >Are you sure you want to delete this item?</v-card-title
                    >
                    <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn color="blue darken-1" text @click="closeDelete"
                        >Cancel</v-btn
                      >
                      <v-btn
                        color="blue darken-1"
                        text
                        @click="deleteItemConfirmSid(editedItem)"
                        >OK</v-btn
                      >
                      <v-spacer></v-spacer>
                    </v-card-actions>
                  </v-card>
                </v-dialog>
              </v-toolbar>
            </template>
            <template v-slot:[`item.actions`]="{ item }">
              <!-- <v-icon small class="mr-2" @click="editItem(item)">
                mdi-pencil
              </v-icon> -->
              <v-icon small @click="deleteSid(item)"> mdi-delete </v-icon>
            </template>
            <template v-slot:no-data>
              <v-btn color="primary"> Reset </v-btn>
            </template>
          </v-data-table>
        </v-tab-item>
        <v-tab-item>
          <v-data-table
            :search="search"
            :headers="clientHeaders"
            :items="clients"
            class="elevation-1"
          >
            <template v-slot:top>
              <v-toolbar flat>
                <v-toolbar-title>List of Clients</v-toolbar-title>
                <v-divider class="mx-4" inset vertical></v-divider>
                <v-spacer></v-spacer>
                <v-text-field
                  v-model="search"
                  label="Search"
                  class="ma-6 mt-10"
                  outlined
                  rounded
                  dense
                  append-icon="mdi-magnify"
                >
                </v-text-field>
                <v-dialog v-model="clientDialog" max-width="500px">
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn
                      color="#208895"
                      dark
                      class="mb-2"
                      v-bind="attrs"
                      v-on="on"
                    >
                      New Client
                      <v-icon>mdi-plus</v-icon>
                    </v-btn>
                 
                  </template>
                  <v-card>
                    <v-card-title>
                      <span class="text-h5">{{ formTitle }}</span>
                    </v-card-title>

                    <v-card-text>
                      <v-container>
                        <v-row>
                          <v-col cols="12" sm="6" md="4">
                            <v-text-field
                              v-model="editedItem.client"
                              label="CLIENT"
                            ></v-text-field>
                          </v-col>
                        </v-row>
                      </v-container>
                    </v-card-text>

                    <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn color="blue darken-1" text @click="close">
                        Cancel
                      </v-btn>
                      <v-btn
                        color="blue darken-1"
                        text
                        @click="addOrEditEntryClient(editedItem)"
                      >
                        Save
                      </v-btn>
                    </v-card-actions>
                  </v-card>
                </v-dialog>
                <v-dialog v-model="dialogDeleteClient" max-width="500px">
                  <v-card>
                    <v-card-title class="text-h5"
                      >Are you sure you want to delete this item?</v-card-title
                    >
                    <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn color="blue darken-1" text @click="closeDelete"
                        >Cancel</v-btn
                      >
                      <v-btn
                        color="blue darken-1"
                        text
                        @click="deleteItemConfirmClient(editedItem)"
                        >OK</v-btn
                      >
                      <v-spacer></v-spacer>
                    </v-card-actions>
                  </v-card>
                </v-dialog>
              </v-toolbar>
            </template>
            <template v-slot:[`item.actions`]="{ item }">
              <!-- <v-icon small class="mr-2" @click="editItem(item)">
                mdi-pencil
              </v-icon> -->
              <v-icon small @click="deleteClient(item)"> mdi-delete </v-icon>
            </template>
            <template v-slot:no-data>
              <v-btn color="primary"> Reset </v-btn>
            </template>
          </v-data-table>
        </v-tab-item>
      </v-tabs>
    </template>
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
    <!-- <template>
            {{pwc}}
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
          <v-toolbar-title>Systems</v-toolbar-title>
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
                color="#009688"
                dark
                class="mb-2"
                v-bind="attrs"
                v-on="on"
              >
                New Item
              </v-btn>
            </template>
            <v-card>
              <v-card-title>
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
                   
                    <v-text-field
                        v-model="editedItem.sid"
                        label="SID"
                      ></v-text-field>
                    </v-col>

  
                    <v-col
                      cols="12"
                      sm="6"
                      md="4"
                    >
                      <v-text-field
                        v-model="editedItem.client"
                        label="CLIENT"
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
        </v-toolbar>
      </template>
      <template v-slot:[`item.actions`]="{ item }">
        <v-icon
          small
          class="mr-2"
          @click="editItem(item)"
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
        </template>  -->
  </v-container>

  <!------------------------------------------------------------------------------------------------------------------------------->
  <!------------------------------------------------------D I A L O G S------------------------------------------------------------>
  <!------------------------------------------------------------------------------------------------------------------------------->
</template>
  
  <script>
export default {
  name: "HelloWorld",
  created() {
    this.onLoad();
  },
  data: () => ({
    editedIndex: -1,
    sids: [],
    clients: [],
    editedItem: {
      client: "",
      sid: "",
    },
    sidDialog: false,
    clientDialog: false,
    dialogDelete: false,
    dialogDeleteSid:false,
    dialogDeleteClient:false,
    search: "",
    pwc: [],
    users: [],
    sidHeaders: [
      { text: "SID", value: "sid", align: "start" },
      { text: "Actions", value: "actions", align: "start" },
    ],
    clientHeaders: [
      { text: "Client", value: "client", align: "start" },
      { text: "Actions", value: "actions", align: "start" },
    ],
  }),
  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "New Item" : "Edit Item";
    },
  },

  watch: {
    dialog(val) {
      val || this.close();
    },
    dialogDelete(val) {
      val || this.closeDelete();
    },
  },
  methods: {
    onLoad() {
      this.sid()
      this.client()
    },
    client(){
      this.$axios.get(`${this.$api}/test/client`).then((res) => {
        this.clients = res.data;        
        this.clientDialog = false
        this.editItem.client = ''
      });
    },
    sid(){
      this.$axios.get(`${this.$api}/test/sid`).then((res) => {
        this.sids = res.data;
        this.sidDialog = false
        this.editItem.sid = ''
      });

    },
    addOrEditEntrySid(item) {
      this.editedIndex === -1
        ? this.toAddEntrySid(item)
        : this.toUpdateEntrySid(item);
    },
    toAddEntrySid(item) {
      this.$axios.post(`${this.$api}/test/addSystem`, item).then(() => {
        this.sid();
      });
    },
    toUpdateEntrySid(item) {
      this.$axios.patch(`${this.$api}/test`, item).then(() => {
        this.onLoad();
      });
    },
    addOrEditEntryClient(item) {
      this.editedIndex === -1
        ? this.toAddEntryClient(item)
        : this.toUpdateEntryClient(item);
    },
    toAddEntryClient(item) {
      this.$axios.post(`${this.$api}/test/addClient`, item).then(() => {
        this.client();
      });
    },
    toUpdateEntryClient(item) {
      this.$axios.patch(`${this.$api}/test/updateClient`, item).then(() => {
        this.onLoad();
      });
    },
    editItem(item) {
      this.editedIndex = this.pwc.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.sidDialog = true;
      this.clientDialog = true;
    },

    deleteSid(item) {
      this.editedIndex = this.sids.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialogDeleteSid = true;
    },
    deleteClient(item) {
      this.editedIndex = this.pwc.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialogDeleteClient = true;
    },

    deleteItemConfirmSid(editedItem) {
      this.$axios.delete(`${this.$api}/test/sid/${editedItem.id}`).then(() => {
        this.onLoad();
      });
      this.closeDelete();
    },
    deleteItemConfirmClient(editedItem) {
      this.$axios.delete(`${this.$api}/test/client/${editedItem.id}`).then(() => {
        this.onLoad();
      });
      this.closeDelete();
    },

    close() {
      this.clientDialog = false;
      this.sidDialog = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },

    closeDelete() {
      this.dialogDeleteSid = false
      this.dialogDeleteClient = false
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },

    save() {
      if (this.editedIndex > -1) {
        Object.assign(this.pwc[this.editedIndex], this.editedItem);
      } else {
        this.pwc.push(this.editedItem);
      }
      this.close();
    },
  },
};
</script>
  