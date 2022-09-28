<template>
<v-alert border="left" dense color="#208895" elevation="2" style="font-size: 0.8rem; font-weight: bold; color: white;" id="page-banner">
    {{bannerName}}
</v-alert>
</template>

<script>
export default {
    props: ['bannerName']
}
</script>

<style>
#page-banner{
    margin-bottom: 0px !important;
}
</style>
