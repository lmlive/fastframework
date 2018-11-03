<template>
    <el-button @click="save" icon="el-icon-circle-check-outline">TEST</el-button>
    <l-4></l-4>

</template>

<script>
   define(['vue','v!views/common/404'],function (Vue) {
       return Vue.component('l-test',{
           template:template,
           data(){
               return {}
           },
           methods:{
               save(){
                   this.$message('remote vue component loaded')
               }
           }
       })
   })
</script>

<style scoped>

</style>