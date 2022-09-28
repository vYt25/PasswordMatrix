<template>
<div class="overflow-hidden" >  
  <v-app id="inspire" class="foreground-color">
    <router-view  name="header" />    
    <v-main app>
      <router-view/>
    </v-main>  
  </v-app>
  </div>
</template>
<script>
    export default {
      created(){
        this.$bus.$on('Notification',(val)=>{
          this.Notification(val)
        })
      },
      methods:{
        Notification({msg,from}){
          this.$toast.success(msg, `${from} :`, {
                    position: 'topRight',
                    color: '#FFFFFF',
                    icon: 'mdi mdi-chat-processing',
                    progressBar: false,
                    baloon: true
                });
        }
      }
    }
</script>
<style scoped>
.foreground-color{
  background-color: #c9c7c7;
}
</style>