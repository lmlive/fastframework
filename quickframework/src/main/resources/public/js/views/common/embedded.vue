<template>
<span>
    <div v-if="columnMeta.subColumns && columnMeta.subColumns.length>0" v-for="item in columnMeta.subColumns" :key="item.dataKey">
       {{item['title']}}: {{entity[columnMeta.dataKey][item.dataKey]}} 
    </div>
 </span>
</template>
<script>
define([
    'require',
    'vue'
], function(require, Vue) {
    'use strict';
    return Vue.component('l-embedded',{
        template:template,
        props:['columnMeta','entity','readonly'],
        data(){
            return {
                
            }
        }
    })
});
</script>
