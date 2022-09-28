<template>
<div>
    <v-app-bar app dense clipped dark color="#208895" style="z-index: 10 !important;">
        <v-app-bar-nav-icon @click="toggle()"></v-app-bar-nav-icon>
        <v-toolbar-title>Password Matrix</v-toolbar-title>
        <v-spacer> </v-spacer>
    </v-app-bar>
</div>
</template>

<script>
export default {
    props: ['nav'],
    data() {
        return {}
    },
    created() {},
    computed: {
        navToggle() {
            return this.nav
        }
    },
    methods: {
        openSettingsDialog(){
            this.$bus.$emit('OpenSettingsDialog')
        },
        openFilterDialog(){
            this.$bus.$emit('openFilterDialog')
        },
        toggle() {
            this.$emit('ToggleNavbar', !this.navToggle)
        },
    }
}
</script>

<style>
.v-navigation-drawer {
    top: 0px !important;
    max-height: calc(100% - 0px) !important;
}
</style>
