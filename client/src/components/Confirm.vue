<template>
<v-dialog v-model="dialog" persistent max-width="350">
    <v-card>
        <v-card-title class="text-h5">
            Confirmation
        </v-card-title>
        <v-card-text>
            <v-spacer>
                <v-icon x-large color="yellow">mdi-alert-cirlce</v-icon>
            </v-spacer>
            Are you suse you want to proceed?
        </v-card-text>
        <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="green darken-1" text @click="$emit('SoftDelete')">
                Cancel
            </v-btn>
            <v-btn color="green darken-1" text @click="$emit('SoftDelete',true)">
                OK
            </v-btn>
        </v-card-actions>
    </v-card>
</v-dialog>
</template>

<script>
export default {
    props: ['dialog']

}
</script>

<style>

</style>
