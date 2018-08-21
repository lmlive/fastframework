<template>
     <el-select @change="onchange" v-model="dvalue" placeholder="请选择" :disabled="readonly" >
    <el-option
      v-for="item in options"
      :key="item.value"
      :label="item.label"
      :value="item.value">
    </el-option>
  </el-select>
</template>
<script>
define([ "vue"], function( Vue) {
  "use strict";
  return Vue.component("l-dictionary", {
    template: template,
    props: ["group", "dkey", "value", "source", "readonly"],
    data() {
      return { dvalue:null, options: [] };
    },
   methods:{
     onchange(){
       this.$emit('change',this.dvalue)
     }
   },
    mounted() {
      var self = this;
      if(this.value!=undefined){
        this.dvalue=this.value+""
      }
      if (typeof source == Array) {
        self.options = source;
      } else {
        self
          .$http({ url: self.source })
          .then(({ data }) => {
            if (data.code == 0) {
              var dict=data.data.value
              self.options=  Object.getOwnPropertyNames(dict).map(d=>{
                 return {value:d,label:dict[d]}
              })
              console.info(self.options)
              console.log(self.dvalue)
            } else {
              self.$message("加载字典出错");
            }
          })
          .catch(ex => {
            self.$message("load dictionary data failed" + ex);
          });
      }  
    }  
  });
});
</script>

