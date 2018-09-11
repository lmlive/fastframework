<template>
    <el-dialog :visible="show" @close="()=>{this.$emit('close')}">
        <el-form size="mini" >
            <el-row v-for="item in columnMetas" :key="item.dataKey" v-if="isSearchAble(item)">
                <el-col :span="3">{{item.title}}</el-col>
                <el-col :span="5">
                 <el-select  v-model="searchEntity[item.dataKey+'_operation']" size="mini" placeholder="操作">
                    <el-option v-for="item in getPropOperations(item)" :key="item" :label="item" :value="item">
                    </el-option>
                </el-select>
                </el-col>
                 <template v-if="showUserInput(searchEntity[item.dataKey+'_operation'])"> 
                <el-col :span="8">
                <l-autoformitem v-model="searchEntity[item.dataKey]" :cmeta="item" :showLabel="false"></l-autoformitem>
                </el-col>
               <el-col :span="8">
                <template v-if="searchEntity[item.dataKey+'_operation']==='between'">
                    <l-autoformitem :showLabel="false" v-model="searchEntity[item.dataKey+'_bw2']" :cmeta="item"></l-autoformitem>
                </template>
               </el-col>
                </template>  
            </el-row>
            <el-form-item>
                <p>{{getSearchDesc()}}</p>
            </el-form-item>
            <el-form-item>
                <el-button @click="search" type="primary" icon="el-icon-search">搜索 </el-button>
                <el-button @click="clear" type="primary" icon="el-icon-clear">清空 </el-button>
            </el-form-item>
        </el-form>
    </el-dialog>
</template>
<script>
define(["vue", "v!views/common/autoformitem"], function(Vue) {
  return Vue.component("l-searchbox", {
    template: template,
    props: {
      columnMetas: { required: true, type: Array },
      value: { required: true },
      show: { type: Boolean, default: false }
    },
    data() {
      return { searchEntity: {} };
    },

    methods: {
      search() {
         console.info('-----------serarch object='+JSON.stringify(this.searchEntity))
        this.$emit("search", this.searchEntity,this.getSearchDesc());
      },
      clear(){
          this.searchEntity={}
      },
      getSearchDesc(){
          var self=this;
         var desc= Object.getOwnPropertyNames( this.searchEntity).map(function(d){
             var index=d.indexOf('_operation');
              if(index>-1 ){
                  var operation=self.searchEntity[index];
                  if(operation==='')return '';
                  var key=d.substring(0,index)
                  var str= key+'    '+self.searchEntity[d]+'    ';
                  if(self.searchEntity[key])
                  str+='"'+self.searchEntity[key]+'"'
                  var btw=self.searchEntity[d+'_between'];
                  if(btw){
                      str+=',"'+btw+'"';
                  }
                  return str;
              }
          })
          var v=[]
           desc.forEach(d=>{
            if(d!=null && d!='')
            v.push(d)
           })
          return v.join(' and ');
      },
      getPropOperations(cmeta) {
        var strs = ['',"==", "like", "is null", "is not null"];
        var numbrs = ['',">", "<", "==", "between", "is null", "is not null"];
        var booleans = ['',"==", "is null", "is not null"];
        switch (cmeta.uiMeta.uiType) {
          case "RichContext":
            return strs;
          case "Boolean":
            return booleans;
          case "Number":
            return numbrs;
          case "Date":
            return numbrs;
          case "DateTime":
            return numbrs;
          case "Dictionary":
            return booleans;
          case "Text":
            return strs;

          default:
            return strs;
        }
      },
      showUserInput(operation) {
        if (
          operation == undefined ||
          operation === "is null" ||
          operation === "is not null"||
          operation===''
        )
          return false;
        return true;
      },
      isSearchAble(meta) {
        return (
          meta.uiMeta.uiType === "RichContext" ||
          meta.uiMeta.uiType === "Boolean" ||
          meta.uiMeta.uiType === "Number" ||
          meta.uiMeta.uiType === "Date" ||
          meta.uiMeta.uiType === "DateTime" ||
          meta.uiMeta.uiType === "Dictionary" ||
          meta.uiMeta.uiType === "Text"
        );
      }
    }
  });
});
</script>


