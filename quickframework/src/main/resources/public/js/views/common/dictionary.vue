<template>
     <el-select v-model="value" placeholder="请选择">
    <el-option
      v-for="item in options"
      :key="item.value"
      :label="item.label"
      :value="item.value">
    </el-option>
  </el-select>
</template>
<script>
define([
    'require',
    'vue'
], function(require, vue) {
    'use strict';
    return Vue.component('l-dictionary',{
        template:template,
        props:['group','key','value','source'],
        data(){
            return {options:[]}
        },
        mounted(){
            var self=this
            if(typeof source==Array){
                self.options=source
            }else{
                self.$http({url:self.$http.addUrl(self.source)}).then(({data})=>{
                    if(data.code==0){
                        self.options=data.data
                    }else{
                        self.$message('加载字典出错')
                    }
                }).catch((ex)=>{
                    self.$message('load dictionary data failed'+ex)
                })
            }
        }
    })
    
});
</script>

