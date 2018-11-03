<template>
<span v-if="readonly">
    <div  v-for="item in columnMeta.subColumns" :key="item.dataKey">
       {{item['title']}}:
      
       <l-field :readonly="true" :cmeta="item" v-model="cvalue[item.dataKey]"></l-field>
    </div>
 </span>
 <span v-else>
      <div  v-if="item.uiMeta.visiable"  v-for="item in columnMeta.subColumns" :key="item.dataKey">
       {{item['title']}}:
       <l-field  :readonly="false" :cmeta="item" v-model="cvalue[item.dataKey]"></l-field>
    </div>
 </span>
</template>
<script>
define([
    'require',
    'vue',
    'v!views/common/field'
], function(require, Vue) {
    'use strict';
    return Vue.component('l-embedded',{
        template:template,
        props:['columnMeta','value','readonly'],
        data(){
            return {
                cvalue:{}
            }
        },
        watch:{
            value:function(v){
                this.cvalue=v
                
            },
            cvalue:function(v){
                this.$emit('input',v)
            }
        },
     
        
    })
});
</script>
