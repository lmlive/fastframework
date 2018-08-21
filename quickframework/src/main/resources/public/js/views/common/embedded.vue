<template>
<span v-if="readonly">
    <div v-if="columnMeta.subColumns && columnMeta.subColumns.length>0" v-for="item in columnMeta.subColumns" :key="item.dataKey">
       {{item['title']}}:
       <template v-if="entity[columnMeta.dataKey]!=undefined">
           {{entity[columnMeta.dataKey][item.dataKey]}} 
       </template> 
    </div>
 </span>
 <span v-else>
     <div v-if="columnMeta.subColumns && columnMeta.subColumns.length>0" v-for="item in columnMeta.subColumns" :key="item.dataKey">
       {{item['title']}}:
       <template v-if="entity[columnMeta.dataKey]!=undefined">
           {{entity[columnMeta.dataKey][item.dataKey]}} 
       </template> 
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
