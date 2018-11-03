<template>
      <l-fileinput v-model="list" ></l-fileinput> 
   
</template>
<script>
 define([
     'vue',
     'v!views/common/fileinput'
 ], function(Vue) {
     return Vue.component('l-test',{
         template:template,
         data(){
             return {
                 list:['/upload/1.jpg','/upload/2.jpg']
             }
         },
         mounted(){
             console.info('static.test ')
         }
     })
     
 });
</script>
