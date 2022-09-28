<template>
  <div>
        <Appbar :nav.sync="nav" @ToggleNavbar="ToggleNavbar"/>
        <Navbar :nav.sync="nav" @ToggleNavbar="ToggleNavbar"/>
  </div>
</template>

<script>
import Appbar from './Appbar';
import Navbar from './Navbar';
export default {
    components:{Appbar,Navbar},
    data(){
        return{
            nav: false
        }
    },
    methods:{
            ToggleNavbar(){
                this.nav = !this.nav
            }
        }
}
</script>

<style>

</style>