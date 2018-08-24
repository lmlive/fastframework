<template>
<span v-if="readonly">
    <div v-if="columnMeta.subColumns && columnMeta.subColumns.length>0" v-for="item in columnMeta.subColumns" :key="item.dataKey">
       {{item['title']}}:
       <template v-if="entity[columnMeta.dataKey]!=undefined">
           {{value[columnMeta.dataKey][item.dataKey]}} 
       </template> 
    </div>
 </span>
 <span v-else>
     <div v-if="columnMeta.subColumns && columnMeta.subColumns.length>0" v-for="item in columnMeta.subColumns" 
         :key="item.dataKey">
       {{item['title']}}:<l-column :readonly="false" :cmeta="item" v-model="value[item.dataKey]"></l-column>
      
    </div>
 </span>
</template>
<script>
define([
    'require',
    'vue',
    'v!views/common/column'
], function(require, Vue) {
    'use strict';
    return Vue.component('l-embedded',{
        template:template,
        props:['columnMeta','value','readonly'],
        data(){
            return {
                
            }
        }
    })
});
</script>
