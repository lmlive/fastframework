<template>
    <el-input  autosize type="textarea" v-model="cvalue" :rows="2"></el-input>
</template>

<script>
     define(['vue'],function (Vue) {
         Vue.component('l-map',{
             template:template,
             props:{
                 cmeta: { required: true },
                 value: { required: true }
             },
             data(){
                 return {
                     cvalue:this.$JSON.stringify( this.value)
                 }
             },
             watch:{
                 value: function(v) {
                         this.cvalue=this.$JSON.stringify(v)
                 },
                 cvalue: function(v) {
                         try{
                             var d=this.$JSON.parse(v);
                             this.$emit('input',d);
                         }catch (e) {

                         }

                 }
             }
         })
     })
</script>

<style scoped>

</style>